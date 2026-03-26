import { Injectable } from '@angular/core';
import { StepOneData, StepThreeData, StepTwoData } from '../dto/IFormData.dto';

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

  getFormData() {
    return {
      ...this.stepOneData,
      ...this.stepTwoData,
      ...this.stepThreeData,
    };
  }

  reset() {
    this.stepOneData = { cnpj: '', name: '', storeName: '' };
    this.stepTwoData = {
      name: '',
      cep: '',
      state: '',
      city: '',
      district: '',
      street: '',
      number: '',
    };
    this.stepThreeData = {
      adminName: '',
      adminEmail: '',
      adminPhoneNumber: '',
      adminPassword: '',
    };
  }
}
