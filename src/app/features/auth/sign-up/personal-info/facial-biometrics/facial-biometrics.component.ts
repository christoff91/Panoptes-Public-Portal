import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-facial-biometrics',
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
  templateUrl: './facial-biometrics.component.html',
  styleUrl: './facial-biometrics.component.scss',
})
export class FacialBiometricsComponent {
  hidePassword = true;
  language: string = '';

  constructor(private router: Router, private translate: TranslateService) {
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

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
