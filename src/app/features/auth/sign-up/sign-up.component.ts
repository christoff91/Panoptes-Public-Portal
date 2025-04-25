import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    TranslateModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  loginForm: FormGroup;
  hidePassword = true;
  language: string = '';
  loginError = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    if (this.authService.getCurrentLoginStatus()) {
      this.router.navigate(['/dashboard']);
    }
  }

  async signInWithGoogle() {
    this.isLoading = true;

    // Google sign-in now just redirects to Google's auth page
    // The actual authentication will happen in the callback component
    try {
      this.authService.loginWithGoogle();
      // No need to check for success or navigate here, as redirect will happen
    } catch (error) {
      console.error('Google sign-in error:', error);
      this.loginError = true;
      this.isLoading = false;
    }
  }

  changeLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const language = target.value;
    this.translate.use(language);
    sessionStorage.setItem('language', language);
  }

  routeToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const success = this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      if (success) this.router.navigate(['/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
