import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

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

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  loginError = false;
  language: string = 'en'; // Default language
  isLoading = false;
  isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    // Check if we're in a browser environment before using browser APIs
    if (this.isBrowser) {
      // Initialize the language
      this.language = sessionStorage.getItem('language') || 'en';
      this.translate.use(this.language);

      // Check if already logged in
      if (this.authService.getCurrentLoginStatus()) {
        this.router.navigate(['/dashboard']);
      }
    } else {
      // Set default language when not in browser
      this.translate.use('en');
    }
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

  signInWithGoogle() {
    if (!this.isBrowser) {
      console.error('Google sign-in requires browser environment');
      return;
    }

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
    if (!this.isBrowser) return;

    const target = event.target as HTMLSelectElement;
    const language = target.value;
    this.translate.use(language);
    sessionStorage.setItem('language', language);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
