import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from '../../../../../shared/components/inputs/select/selectField.component';
import { ClientService } from '../../../service/client.service';

@Component({
  selector: 'app-step-three-client',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, SelectFieldComponent],
  templateUrl: './stepThree.component.html',
})
export class StepThreeClientComponent implements OnInit {
  @Input() loja!: number;
  @Output() lojaChange = new EventEmitter<number>();

  @Input() tipoLegal!: number;
  @Output() tipoLegalChange = new EventEmitter<number>();

  @Input() notes!: string;
  @Output() notesChange = new EventEmitter<string>();

  @Input() lojas: { label: string; value: number }[] = [];
  @Input() tiposLegais: { label: string; value: number }[] = [
    { label: 'Cliente Físico', value: 1 },
    { label: 'Cliente Empresa', value: 2 },
  ];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getLojas().subscribe((lojas) => {
      this.lojas = lojas.map((l) => ({ label: l.name, value: l.id }));
    });
  }
}
