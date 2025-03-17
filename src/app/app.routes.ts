import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

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
    ],
  },
];
