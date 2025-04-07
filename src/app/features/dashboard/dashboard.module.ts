// features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { label: 'Dashboard' } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }