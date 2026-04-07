import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';
import { ClientData } from '../../../model/dtos/client.data';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from '../../../service/client.service';

@Component({
  selector: 'app-step-two-client',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, HttpClientModule],
  templateUrl: './stepTwo.component.html',
})
export class StepTwoClientComponent {
  @Input() data!: ClientData;
  @Input() errors: Record<string, string> = {};

  @Input() ngModel: string | undefined;
  @Output() ngModelChange = new EventEmitter<string>();
  constructor(private clientService: ClientService) {}
  searchCep(value: string) {
    const cep = value.replace(/\D/g, '');
    if (!cep || cep.length !== 8) return; // só chama se tiver 8 dígitos

    this.clientService.getAddressByCep(cep).subscribe({
      next: (res: any) => {
        console.log('ViaCEP:', res);
        if (!res.erro) {
          this.data.addressStreet = res.logradouro;
          this.data.addressDistrict = res.bairro;
          this.data.addressCity = res.localidade;
          this.data.addressState = res.uf;
        } else {
          console.log('CEP não encontrado');
        }
      },
      error: (err) => console.error('Erro ViaCEP:', err),
    });
  }
}
