import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDetailModalPageRoutingModule } from './edit-detail-modal-routing.module';

import { EditDetailModalPage } from './edit-detail-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDetailModalPageRoutingModule
  ],
  declarations: [EditDetailModalPage],
  exports: [EditDetailModalPage]
})
export class EditDetailModalPageModule { }
