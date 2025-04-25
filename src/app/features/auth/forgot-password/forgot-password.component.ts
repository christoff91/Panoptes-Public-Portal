import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  resetLinkSent = false;
  errorMessage: string | null = null;
  language = 'en';
  currentYear: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private translateService: TranslateService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Initialize language from localStorage or default to English
    // this.language = localStorage.getItem('language') || 'en';
    this.translateService.use(this.language);
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Replace with your actual API endpoint
    this.http
      .post<any>('/api/auth/forgot-password', {
        email: this.forgotPasswordForm.value.email,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.resetLinkSent = true;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage =
            err.error?.message ||
            this.translateService.instant(
              'An unexpected error occurred. Please try again.'
            );
        },
      });
  }

  changeLanguage(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.language = select.value;
    this.translateService.use(this.language);
    // localStorage.setItem('language', this.language);
  }
}
