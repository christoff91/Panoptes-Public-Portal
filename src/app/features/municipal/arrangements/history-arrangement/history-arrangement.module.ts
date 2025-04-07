// features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryArrangementComponent } from './history-arrangement.component';

const routes: Routes = [{ path: '', component: HistoryArrangementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HistoryArrangementModule {}
