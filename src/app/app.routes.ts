import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // Wraps routed components
    children: [
      { path: '', component: LoginComponent }, // Default route
      { path: 'login', component: LoginComponent },
    ],
  },
];
