import { Injectable } from '@angular/core';
import { StorageService } from '../storageService/storage-service';
import { TaskModel } from 'src/app/core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly TASKS_KEY = 'tasks';

  constructor(private storageService: StorageService) { }

  async getTasks(): Promise<TaskModel[]> {
    return (await this.storageService.getValue(this.TASKS_KEY)) || [];
  }

  async addTask(task: TaskModel): Promise<void> {
    const tasks = await this.getTasks();
    tasks.push(task);
    this.storageService.setValue(this.TASKS_KEY, tasks);
  }
  async deleteTask(index: number): Promise<void> {
    const tasks = await this.getTasks();
    if (index > -1 && index < tasks.length) {
      tasks.splice(index, 1);
      this.storageService.setValue(this.TASKS_KEY, tasks);
    }
  }
  async updateTask(index: number, updatedTask: TaskModel): Promise<void> {
    const tasks = await this.getTasks();
    if (index > -1 && index < tasks.length) {
      tasks[index] = updatedTask;
      this.storageService.setValue(this.TASKS_KEY, tasks);
    }
  }
  async deleteAllTasks(): Promise<void> {
    await this.storageService.removeValue(this.TASKS_KEY);
  }
}
