// features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageArrangementComponent } from './manage-arrangement.component';

const routes: Routes = [{ path: '', component: ManageArrangementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ManageArrangementModule {}
