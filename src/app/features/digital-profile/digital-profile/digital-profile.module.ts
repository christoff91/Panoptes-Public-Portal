// features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigitalProfileComponent } from './digital-profile.component';

const routes: Routes = [{ path: '', component: DigitalProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DigitalProfileModule {}
