import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditDetailModalPage } from 'src/app/components/edit-detail-modal/edit-detail-modal.page';
import { ModalsEnum } from 'src/app/core/enums/modals.enum';
import { TaskModel } from 'src/app/core/models/task.model';
import { TaskService } from 'src/app/services/taskService/task-service';

@Component({
  selector: 'app-tasks', standalone: false,
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: TaskModel[] = [];
  allTasks: TaskModel[] = [];
  newTaskTitle: string = '';
  loadBatchSize = 10;   // Cantidad a cargar por scroll
  loadedCount = 0;
  dateToday: string;
  modalsEnum = ModalsEnum;
  constructor(private taskService: TaskService, private modalCtrl: ModalController, private cd: ChangeDetectorRef) {
    const today = new Date();
    this.dateToday = today.toLocaleDateString();
  }

  async ngOnInit() {
    this.allTasks = await this.taskService.getTasks();
    //this.newTaskTitle = 'prueba1';
    //this.addTask()
    this.loadMore();
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  async addTask() {
    console.log('Adding task:', this.newTaskTitle);
    if (this.newTaskTitle.trim().length > 0) {
      const newTask: TaskModel = {
        title: this.newTaskTitle,
        completed: false,
        category: ''
      };

      await this.taskService.addTask(newTask);
      this.tasks = await this.taskService.getTasks();
      this.newTaskTitle = '';
    }
  }

  async deleteTask(index: number) {
    await this.taskService.deleteTask(index);
    this.tasks = await this.taskService.getTasks();
  }
  async deleteAllTask() {
    await this.taskService.deleteAllTasks();
    this.allTasks = await this.taskService.getTasks();
    this.tasks = [];
    this.loadedCount = 0;
    this.loadMore();
  }

  changeStateTask(task: TaskModel) {
    task.completed = !task.completed;
    console.log('Cambio de estado de tarea');
    this.taskService.updateTask(this.tasks.indexOf(task), task)

  }
  async openModal(task?: TaskModel, indexTask?: number) {
    const modal = await this.modalCtrl.create({
      component: EditDetailModalPage,
      componentProps: { typeModal: this.modalsEnum.TASK_DETAIL_MODAL, data: task, index: indexTask },

    });

    await modal.present();

    // Esperar hasta que se cierre el modal
    const { data } = await modal.onDidDismiss();

    if (data?.updated) {
      this.allTasks = await this.taskService.getTasks();
      this.tasks = [];
      this.loadedCount = 0;
      this.loadMore();
      this.cd.detectChanges();
    }

  }
  loadMore(event?: any) {
    const nextBatch = this.allTasks.slice(this.loadedCount, this.loadedCount + this.loadBatchSize);
    this.tasks = [...this.tasks, ...nextBatch];
    this.loadedCount += nextBatch.length;

    if (event) {
      event.target.complete();
    }

    if (this.loadedCount >= this.allTasks.length && event) {
      event.target.disabled = true;
    }
  }

}
