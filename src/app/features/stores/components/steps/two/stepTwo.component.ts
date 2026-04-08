import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';
import { CepService, ViaCepResponse } from '../../../../../core/services/cep.service';

@Component({
  selector: 'app-step-two-stores',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepTwo.component.html',
  styleUrls: ['./stepTwo.component.scss'],
})
export class StepTwoStoresComponent {
  @Input() data!: any;
  @Input() errors!: Record<string, string>;

  constructor(private cepService: CepService) {}

  searchCep(value: string): void {
    const cep = value.replace(/\D/g, '');
    if (!cep || cep.length !== 8) return;

    this.cepService.getAddressByCep(cep).subscribe({
      next: (res: ViaCepResponse) => {
        if (res.erro) {
          return;
        }

        this.data.addressStreet = res.logradouro ?? '';
        this.data.addressDistrict = res.bairro ?? '';
        this.data.addressCity = res.localidade ?? '';
        this.data.addressState = res.uf ?? '';
      },
      error: () => undefined,
    });
  }
}
