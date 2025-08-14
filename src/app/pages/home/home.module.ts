import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TaskDetailModalPageModule   } from '../../components/task-detail-modal/task-detail-modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TaskDetailModalPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
