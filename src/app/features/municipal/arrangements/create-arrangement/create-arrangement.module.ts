// features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArrangementComponent } from './create-arrangement.component';

const routes: Routes = [{ path: '', component: CreateArrangementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CreateArrangementModule {}
