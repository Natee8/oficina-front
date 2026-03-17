import { Component } from '@angular/core';
import { InputFieldComponent } from "./../../../shared/components/inputs/field/inputField.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [InputFieldComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
    profileName: string = '';
    profileEmail: string = '';
    profileRole: string = '';
    profilePassword: string = '';
}
