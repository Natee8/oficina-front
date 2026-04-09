import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterFormService } from '../model/state/stateForm';
import { onlyNumbers } from '../../../../shared/functions/functionRemoveMask';
import { buildApiUrl } from '../../../../core/api/buildApiUrl';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private apiUrl = buildApiUrl('onboarding');

  constructor(
    private http: HttpClient,
    private formService: RegisterFormService,
  ) {}

  register() {
    const stepOne = this.formService.stepOneData;
    const stepTwo = this.formService.stepTwoData;
    const stepThree = this.formService.stepThreeData;

    const payload = {
      tenantName: stepOne.name,

      unit: {
        name: stepOne.storeName,
        cnpj: onlyNumbers(stepOne.cnpj),
        addressZip: stepTwo.cep,
        addressStreet: stepTwo.street,
        addressNumber: stepTwo.number,
        addressDistrict: stepTwo.district,
        addressCity: stepTwo.city,
        addressState: stepTwo.state,
      },

      adminName: stepThree.adminName,
      adminEmail: stepThree.adminEmail,
      adminPhoneNumber: onlyNumbers(stepThree.adminPhoneNumber),
      adminPassword: stepThree.adminPassword,
    };

    return this.http.post(this.apiUrl, payload);
  }
}
