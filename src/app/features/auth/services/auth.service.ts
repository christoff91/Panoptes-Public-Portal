import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private clientId =
    '754883446528-25uejhng8n2g9hesfhrbsmt9jb996dd7.apps.googleusercontent.com';
  private tokenClient: any;
  private googleApiLoaded = false;

  constructor() {
    // Check if Google API is already loaded
    this.waitForGoogleApi();
  }

  private waitForGoogleApi() {
    // Check if the Google API is already loaded
    if (typeof google !== 'undefined' && google.accounts) {
      this.googleApiLoaded = true;
      this.initializeGoogleAuth();
      return;
    }

    // If not loaded, wait for it to load
    const checkGoogleApiInterval = setInterval(() => {
      if (typeof google !== 'undefined' && google.accounts) {
        clearInterval(checkGoogleApiInterval);
        this.googleApiLoaded = true;
        this.initializeGoogleAuth();
      }
    }, 100);

    // Set a timeout to stop checking after 10 seconds
    setTimeout(() => {
      clearInterval(checkGoogleApiInterval);
      if (!this.googleApiLoaded) {
        console.error('Google API failed to load within timeout');
      }
    }, 10000);
  }

  // Traditional username/password login (unchanged from your original)
  login(username: string, password: string): boolean {
    if (username === 'demo' && password === 'password') {
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  // Initialize Google OAuth (called after API loads)
  private initializeGoogleAuth() {
    try {
      // Load Google Identity Services
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: (response: any) => this.handleGoogleLogin(response),
      });

      // For OAuth 2.0 token flow (if needed)
      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: this.clientId,
        scope: 'email profile',
        callback: (tokenResponse: any) =>
          this.handleTokenResponse(tokenResponse),
      });
    } catch (error) {
      console.error('Error initializing Google Auth:', error);
    }
  }

  // Handle Google login response (decodes JWT)
  private handleGoogleLogin(response: any) {
    if (response.credential) {
      const userInfo = this.decodeJWT(response.credential);
      console.log('Google user:', userInfo);
      this.isLoggedInSubject.next(true); // Update login state
    }
  }

  // Handle OAuth 2.0 token response (fetches user info)
  private handleTokenResponse(tokenResponse: any) {
    if (tokenResponse.error) {
      console.error('Google OAuth error:', tokenResponse.error);
      return;
    }
    // Fetch user profile using the access token
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
    })
      .then((res) => res.json())
      .then((profile) => {
        console.log('User profile:', profile);
        this.isLoggedInSubject.next(true);
      });
  }

  // Decode JWT token (for Google One-Tap)
  private decodeJWT(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }

  loginWithGoogle(): void {
    if (!this.googleApiLoaded) {
      console.error('Cannot login with Google: API not loaded');
      return;
    }
    this.tokenClient.requestAccessToken();
  }

  // Logout (clears Google session if exists)
  logout(): void {
    if (this.googleApiLoaded) {
      const email = localStorage.getItem('email');
      if (email) {
        google.accounts.id.revoke(email, () => {
          this.isLoggedInSubject.next(false);
        });
      } else {
        this.isLoggedInSubject.next(false);
      }
    } else {
      this.isLoggedInSubject.next(false);
    }
  }

  // Helper methods (unchanged from your original)
  getCurrentLoginStatus(): boolean {
    return this.isLoggedInSubject.value;
  }
}
