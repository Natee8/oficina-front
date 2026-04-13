import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { RegisterFormService } from '../../../model/state/stateForm';
import { NgIf } from '@angular/common';
  import { CepService, ViaCepResponse } from '../../../../../../core/services/cep.service';

@Component({
  selector: 'form-steptwo',
  standalone: true,
  templateUrl: './stepTwo.component.html',
  styleUrls: ['./stepTwo.component.scss'],
  imports: [FormsModule, InputFieldComponent, NgIf],
})
export class FormStepTwo {
  @Input() stepTwoErrors: Record<string, string> = {};
  loadingCep = false;

  constructor(public formService: RegisterFormService, private cepService: CepService) {}

  onCepChange(cep: string) {
    this.formService.stepTwoData.cep = cep;
    if (cep && cep.replace(/\D/g, '').length === 8) {
      this.loadingCep = true;
      this.cepService.getAddressByCep(cep).subscribe({
        next: (res: ViaCepResponse) => {
          this.loadingCep = false;
          if (!res.erro) {
            this.formService.stepTwoData.state = res.uf || '';
            this.formService.stepTwoData.city = res.localidade || '';
            this.formService.stepTwoData.district = res.bairro || '';
            this.formService.stepTwoData.street = res.logradouro || '';
          }
        },
        error: () => {
          this.loadingCep = false;
        }
      });
    }
  }
}
