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
import { CreateClientDto } from '../../model/dtos/createClient.dto';
import { stepsConfigCreateClients } from '../../../../core/config/stepsCreate.config';

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

  steps = stepsConfigCreateClients;

  // Campos do cliente
  nome = '';
  cpfCnpj = '';
  email = '';
  phone = '';

  addressZip = '';
  addressStreet = '';
  addressNumber = '';
  addressDistrict = '';
  addressCity = '';
  addressState = '';
  loja!: number; // <-- agora é number
  tipoLegal!: number; // <-- agora é number

  notes = '';

  lojas: { label: string; value: number }[] = [];
  tiposLegais: { label: string; value: number }[] = [
    { label: 'Cliente Físico', value: 1 },
    { label: 'Cliente Empresa', value: 2 },
  ];

  constructor(
    private router: Router,
    private clientService: ClientService,
  ) {}

  ngOnInit() {
    this.clientService.getLojas().subscribe((res) => {
      this.lojas = res.map((l) => ({ label: l.name, value: l.id }));
    });
  }

  nextStep() {
    if (this.stepIndex < this.steps.length - 1) {
      this.stepIndex++;
    } else {
      this.submit();
    }
  }

  previousStep() {
    if (this.stepIndex > 0) this.stepIndex--;
  }

  goBackList() {
    this.router.navigate(['/clients-list']);
  }

  submit() {
    if (!this.loja || !this.tipoLegal) {
      console.error('Loja ou tipo legal não selecionado!');
      return;
    }

    const payload: CreateClientDto = {
      unitId: this.loja,
      legalTypeId: this.tipoLegal,
      name: this.nome,
      cpfCnpj: this.cpfCnpj,
      email: this.email,
      phone: this.phone,
      addressZip: this.addressZip,
      addressStreet: this.addressStreet,
      addressNumber: this.addressNumber,
      addressDistrict: this.addressDistrict,
      addressCity: this.addressCity,
      addressState: this.addressState,
      notes: this.notes,
    };

    this.clientService.createClient(payload).subscribe({
      next: (res) => {
        console.log('Cliente cadastrado!', res);
        this.router.navigate(['/clients-list']);
      },
      error: (err) => console.error('Erro ao cadastrar cliente', err),
    });
  }
}
