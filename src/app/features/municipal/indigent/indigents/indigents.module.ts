// features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndigentsComponent } from './indigents.component';

const routes: Routes = [{ path: '', component: IndigentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class IndigentsModule {}
