import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskDetailModalPage } from './task-detail-modal.page';

@NgModule({
  declarations: [TaskDetailModalPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [TaskDetailModalPage] // ✅ exportamos el componente para usarlo fuera
})
export class TaskDetailModalPageModule { }