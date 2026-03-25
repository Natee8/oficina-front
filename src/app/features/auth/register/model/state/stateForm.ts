import { Injectable } from '@angular/core';
import { StepOneData, StepTwoData, StepThreeData } from '../dto/IFormData.dto';

@Injectable({ providedIn: 'root' })
export class RegisterFormService {
  stepOneData: StepOneData = { cnpj: '', name: '', storeName: '' };
  stepTwoData: StepTwoData = {
    name: '',
    cep: '',
    state: '',
    city: '',
    district: '',
    street: '',
    number: '',
  };
  stepThreeData: StepThreeData = {
    adminName: '',
    adminEmail: '',
    adminPhoneNumber: '',
    adminPassword: '',
  };
}
