import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TbnComponent } from './tbn.component';

const routes: Routes = [{ path: '', component: TbnComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TbnModule {}
