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
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-info',
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
    MatSelectModule,
  ],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent {
  personalInfoForm: FormGroup;
  hidePassword = true;
  language: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService
  ) {
    this.personalInfoForm = this.fb.group({
      fullName: ['', [Validators.required]],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]], // South African ID validation
      cellNumber: [
        '',
        [Validators.required, Validators.pattern(/^(\+27|0)[6-8][0-9]{8}$/)],
      ], // SA phone validation
      telephoneNumber: ['', [Validators.pattern(/^(\+27|0)[1-5][0-9]{8}$/)]],
    });
    this.language =
      sessionStorage.getItem('language') || this.translate.currentLang || 'en';
    this.translate.use(this.language);
  }

  changeLanguage(lang: string): void {
    this.language = lang;
    this.translate.use(lang);
    sessionStorage.setItem('language', lang);
  }

  routeToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit(): void {
    if (this.personalInfoForm.valid) {
      console.log('Form submitted:', this.personalInfoForm.value);
      this.routeToDashboard();
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
