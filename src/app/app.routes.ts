import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NavigationComponent } from './layout/navigation/navigation/navigation.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // Wraps routed components
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./features/auth/login/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./features/auth/sign-up/sign-up.module').then(
            (m) => m.SignupModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'municipal',
        loadChildren: () =>
          import('./features/dashboard/municipal/municipal.module').then(
            (m) => m.MunicipalModule
          ),
      },
      {
        path: 'navigation',
        component: NavigationComponent,
      },
    ],
  },
];
