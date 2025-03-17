// features/auth/login/login.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MunicipalComponent } from './municipal.component';

const routes: Routes = [
  { path: '', component: MunicipalComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MunicipalModule { }