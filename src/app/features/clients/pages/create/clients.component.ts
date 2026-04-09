import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { Router } from '@angular/router';
import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { StepOneClientComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoClientComponent } from '../../components/steps/two/stepTwo.component';
import { StepThreeClientComponent } from '../../components/steps/three/stepThree.component';
import { ClientService } from '../../service/client.service';
import { stepsConfigCreateClients } from '../../../../core/config/stepsCreate.config';
import { ClientData, createClientData } from '../../model/dtos/client.data';
import { stepOneClientSchema } from '../../schemas/stepOne.schema';
import { stepTwoClientSchema } from '../../schemas/stepTwo.schema';
import { stepThreeClientSchema } from '../../schemas/stepThree.schema';
import { buildClientPayload } from '../../shared/functionCreatePayload';
import { UnitAccessService } from '../../../../core/services/unit-access.service';
import { detectClientLegalTypeId } from '../../shared/legalType';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';
import { ClientDto } from '../../model/dtos/client.dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-client',
  standalone: true,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    BackButtonComponent,
    RegisterCardComponent,
    StepOneClientComponent,
    StepTwoClientComponent,
    StepThreeClientComponent,
  ],
})
export class CreateClientComponent implements OnInit {
  stepIndex = 0;
  areNonDocumentFieldsDisabled = true;
  isLoadingCustomerByDocument = false;
  private lastDocumentLookup = '';

  steps = stepsConfigCreateClients;
  clientData: ClientData = createClientData();
  errors: Record<string, string> = {};

  lojas: { label: string; value: number }[] = [];
  tiposLegais: { label: string; value: number }[] = [
    { label: 'Cliente Físico', value: 1 },
    { label: 'Cliente Empresa', value: 2 },
  ];

  constructor(
    private router: Router,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private unitAccessService: UnitAccessService,
  ) {}

  ngOnInit() {
    this.clientService.getLojas().subscribe((res) => {
      this.lojas = res.map((l) => ({ label: l.name, value: l.id }));
    });
  }
  async nextStep() {
    this.errors = {};

    let schema;
    let values = {};

    if (this.stepIndex === 0) {
      schema = stepOneClientSchema;
      values = {
        nome: this.clientData.nome,
        cpfCnpj: this.clientData.cpfCnpj.replace(/\D/g, ''),
        phone: this.clientData.phone.replace(/\D/g, ''),
        email: this.clientData.email,
      };
    } else if (this.stepIndex === 1) {
      schema = stepTwoClientSchema;
      values = {
        addressZip: this.clientData.addressZip,
        addressNumber: this.clientData.addressNumber,
        addressStreet: this.clientData.addressStreet,
        addressDistrict: this.clientData.addressDistrict,
        addressCity: this.clientData.addressCity,
        addressState: this.clientData.addressState,
      };
    } else if (this.stepIndex === 2) {
      this.updateLegalTypeFromDocument();
      schema = stepThreeClientSchema;
      values = {
        loja: this.clientData.loja,
        tipoLegal: this.clientData.tipoLegal,
      };
    }

    try {
      if (!schema) return;
      await schema.validate(values, { abortEarly: false });

      if (this.stepIndex < this.steps.length - 1) {
        this.stepIndex++;
      } else {
        this.submit();
      }
    } catch (err: any) {
      this.errors = {};
      err.inner.forEach((e: any) => {
        if (e.path) this.errors[e.path] = e.message;
      });
    }
  }

  previousStep() {
    if (this.stepIndex > 0) this.stepIndex--;
  }

  goBackList() {
    this.router.navigate(['/clients-list']);
  }

  submit() {
    try {
      this.updateLegalTypeFromDocument();
      const allowedUnitIds = this.unitAccessService.getAccessibleUnitIds();
      const payload = buildClientPayload(this.clientData, allowedUnitIds);

      this.clientService.createClient(payload).subscribe({
        next: () => {
          this.snackBar.open('Cliente criado com sucesso!', 'Fechar', snackBarSuccessConfig);
          this.router.navigate(['/clients-list']);
        },
        error: (err) => {
          this.snackBar.open(this.getErrorMessage(err), 'Fechar', snackBarErrorConfig);
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        this.snackBar.open(err.message, 'Fechar', snackBarErrorConfig);
      }
    }
  }

  private getErrorMessage(error: unknown): string {
    if (typeof error === 'string' && error.trim()) {
      return error.trim();
    }

    if (error && typeof error === 'object') {
      const apiError = error as {
        error?: { message?: string; errors?: Record<string, string[]> } | string;
        message?: string;
      };

      if (typeof apiError.error === 'string' && apiError.error.trim()) {
        return apiError.error.trim();
      }

      if (apiError.error && typeof apiError.error === 'object') {
        if (apiError.error.message?.trim()) {
          return apiError.error.message.trim();
        }

        const validationMessage = Object.values(apiError.error.errors ?? {})
          .flat()
          .find((message) => message?.trim());

        if (validationMessage) {
          return validationMessage;
        }
      }

      if (apiError.message?.trim()) {
        return apiError.message.trim();
      }
    }

    return 'Erro ao criar cliente.';
  }

  onCpfCnpjChange(value: string): void {
    this.clientData.cpfCnpj = value;
    this.updateLegalTypeFromDocument();

    const sanitizedDocument = value.replace(/\D/g, '');

    if (!this.isDocumentLookupReady(sanitizedDocument)) {
      this.lastDocumentLookup = '';
      this.areNonDocumentFieldsDisabled = true;
      this.resetFieldsExceptDocument();
      return;
    }

    if (this.lastDocumentLookup === sanitizedDocument) {
      this.areNonDocumentFieldsDisabled = false;
      return;
    }

    this.lastDocumentLookup = sanitizedDocument;
    this.areNonDocumentFieldsDisabled = true;
    this.isLoadingCustomerByDocument = true;
    this.resetFieldsExceptDocument();

    this.clientService.getCustomerByDocument(sanitizedDocument).subscribe({
      next: (customer) => {
        this.fillClientData(customer);
        this.areNonDocumentFieldsDisabled = false;
        this.isLoadingCustomerByDocument = false;
        this.snackBar.open('Cliente encontrado no sistema!', 'Fechar', snackBarSuccessConfig);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoadingCustomerByDocument = false;
        this.areNonDocumentFieldsDisabled = false;

        if (error.status !== 404) {
          this.snackBar.open('Não foi possível buscar os dados do cliente pelo CPF/CNPJ.', 'Fechar', snackBarErrorConfig);
        }
      },
    });
  }

  private updateLegalTypeFromDocument(): void {
    this.clientData.tipoLegal = detectClientLegalTypeId(this.clientData.cpfCnpj);
  }

  private isDocumentLookupReady(document: string): boolean {
    return document.length === 11 || document.length === 14;
  }

  private resetFieldsExceptDocument(): void {
    this.clientData.nome = '';
    this.clientData.email = '';
    this.clientData.phone = '';
    this.clientData.addressZip = '';
    this.clientData.addressNumber = '';
    this.clientData.addressStreet = '';
    this.clientData.addressDistrict = '';
    this.clientData.addressCity = '';
    this.clientData.addressState = '';
    this.clientData.loja = [];
    this.clientData.notes = '';
  }

  private fillClientData(customer: ClientDto): void {
    this.clientData.nome = customer.name ?? '';
    this.clientData.email = customer.email ?? '';
    this.clientData.phone = customer.phone ?? '';
    this.clientData.addressZip = customer.addressZip ?? '';
    this.clientData.addressNumber = customer.addressNumber ?? '';
    this.clientData.addressStreet = customer.addressStreet ?? '';
    this.clientData.addressDistrict = customer.addressDistrict ?? '';
    this.clientData.addressCity = customer.addressCity ?? '';
    this.clientData.addressState = customer.addressState ?? '';
    this.clientData.loja = [...(customer.unitIds ?? [])];
    this.clientData.notes = customer.notes ?? '';
    this.clientData.tipoLegal = detectClientLegalTypeId(this.clientData.cpfCnpj) ?? customer.legalTypeId ?? null;
  }
}
