// features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArrangementsComponent } from './arrangements.component';

const routes: Routes = [{ path: '', component: ArrangementsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ArrangementsModule {}
