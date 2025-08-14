// src/app/components/task-detail-modal/task-detail-modal.page.ts
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task/task-service';

@Component({
  selector: 'app-task-detail-modal',
  standalone: false,
  templateUrl: './task-detail-modal.page.html',
  styleUrls: ['./task-detail-modal.page.scss'],
})
export class TaskDetailModalPage implements OnInit {
  @Input() task!: TaskModel;
  @Input() indexTask: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    // Si no se pasa una tarea, inicializamos para creación
    if (!this.task) {
      this.task = {
        title: '',
        category: 0,
        completed: false
      } as TaskModel;
    } else {
      console.log('No viene nada', this.task);
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async deleteTask() {
    await this.taskService.deleteTask(this.indexTask);
    this.modalCtrl.dismiss({ updated: true });
  }

  async updateTask() {
    await this.taskService.updateTask(this.indexTask, this.task);
    this.modalCtrl.dismiss({ updated: true });
  }
  async saveTask() {
    await this.taskService.addTask(this.task);
    this.modalCtrl.dismiss({ updated: true });
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.indexTask != null) {
      this.updateTask();
    } else {
      this.saveTask()
    }
  }
}
