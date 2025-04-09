// features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';

const routes: Routes = [{ path: '', component: AccountsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AccountsModule {}
