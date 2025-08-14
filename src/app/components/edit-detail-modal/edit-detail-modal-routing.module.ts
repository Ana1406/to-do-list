import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDetailModalPage } from './edit-detail-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditDetailModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDetailModalPageRoutingModule {}
