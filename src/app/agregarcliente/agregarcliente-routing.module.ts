import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarclientePage } from './agregarcliente.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarclientePageRoutingModule {}
