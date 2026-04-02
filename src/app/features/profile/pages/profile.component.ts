import { Component, OnInit } from '@angular/core';
import { InputFieldComponent } from './../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { ProfileDto } from '../model/profile.dto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [InputFieldComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService],
})
export class ProfileComponent implements OnInit {
  // Perfil original, usado no "Bem vindo!"
  profile: Partial<ProfileDto> = {
    name: '',
    email: '',
    role: '',
  };

  // Perfil usado no formulário de edição
  editProfile: Partial<ProfileDto> = {
    name: '',
    email: '',
  };

  loading = false;
  error = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = {
          name: data.name,
          email: data.email,
          role: data.role,
        };
        this.editProfile = {
          name: data.name,
          email: data.email,
        };
      },
      error: () => {
        this.error = 'Erro ao carregar perfil';
      },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.error = '';

    this.profileService.patchProfile(this.editProfile).subscribe({
      next: (data) => {
        this.profile = {
          name: data.name,
          email: data.email,
          role: data.role,
        };
        this.editProfile = {
          name: data.name,
          email: data.email,
        };
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao atualizar perfil';
        this.loading = false;
      },
    });
  }
}
