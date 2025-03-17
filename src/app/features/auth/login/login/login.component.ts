import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  usernameError: string = '';
  passwordError: string = '';
  isFormValid: boolean = false;
  isHovered: boolean = false;
  isPasswordVisible: boolean = false;
  isMobile: boolean = false;

  constructor() {}
}
