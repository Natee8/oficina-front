import { Injectable } from '@angular/core';
import { StepOneData, StepTwoData, StepThreeData } from '../../model/dto/IFormData.dto';

@Injectable({ providedIn: 'root' })
export class RegisterFormService {
  stepOneData: StepOneData = { cnpj: '', name: '' };
  stepTwoData: StepTwoData = {
    name: '',
    cep: '',
    state: '',
    city: '',
    district: '',
    street: '',
    number: '',
  };
  stepThreeData: StepThreeData = { address: '', phone: '' };
}
