import { Component } from '@angular/core';
import { InputFieldComponent } from './../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [InputFieldComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profile = {
    name: '',
    email: '',
    role: '',
    password: '',
  };
}
