import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NavigationComponent } from './layout/navigation/navigation/navigation.component';
import { AuthGuard } from './features/auth/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // Wraps routed components
    // canActivate: [AuthGuard],
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
        path: 'personal-info',
        loadChildren: () =>
          import(
            './features/auth/sign-up/personal-info/personal-info/personal-info.module'
          ).then((m) => m.PersonalInfoModule),
      },
      {
        path: 'facial-biometrics',
        loadChildren: () =>
          import(
            './features/auth/sign-up/personal-info/facial-biometrics/facial-biometrics.module'
          ).then((m) => m.FacialBiometricsModule),
      },
      {
        path: 'digital-profile',
        loadChildren: () =>
          import(
            './features/digital-profile/digital-profile/digital-profile.module'
          ).then((m) => m.DigitalProfileModule),
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
        path: 'arrangements',
        loadChildren: () =>
          import('./features/dashboard/arrangements/arrangements.module').then(
            (m) => m.ArrangementsModule
          ),
      },
      {
        path: 'indigents',
        loadChildren: () =>
          import(
            './features/municipal/indigent/indigents/indigents.module'
          ).then((m) => m.IndigentsModule),
      },
      {
        path: 'create-arrangement',
        loadChildren: () =>
          import(
            './features/municipal/arrangements/create-arrangement/create-arrangement.module'
          ).then((m) => m.CreateArrangementModule),
      },
      {
        path: 'manage-arrangement',
        loadChildren: () =>
          import(
            './features/municipal/arrangements/manage-arrangement/manage-arrangement.module'
          ).then((m) => m.ManageArrangementModule),
      },
      {
        path: 'history-arrangement',
        loadChildren: () =>
          import(
            './features/municipal/arrangements/history-arrangement/history-arrangement.module'
          ).then((m) => m.HistoryArrangementModule),
      },
      {
        path: 'navigation',
        component: NavigationComponent,
      },
    ],
  },
];
