import { Injectable } from '@angular/core';
import { StorageService } from '../storageService/storage-service';
import { TaskModel } from 'src/app/core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly TASKS_KEY = 'tasks';

  constructor(private storageService: StorageService) { }
  // Obtiene la lista de tareas almacenadas
  async getTasks(): Promise<TaskModel[]> {
    return (await this.storageService.getValue(this.TASKS_KEY)) || [];
  }

  //Adiciona una nueva tarea a la lista
  async addTask(task: TaskModel): Promise<void> {
    const tasks = await this.getTasks();
    console.log('Adding task:', task);
    tasks.push(task);
    console.log('Updated tasks:', tasks);
    this.storageService.setValue(this.TASKS_KEY, tasks);
  }
  // Elimina una tarea de la lista
  async deleteTask(index: number): Promise<void> {
    const tasks = await this.getTasks();
    if (index > -1 && index < tasks.length) {
      tasks.splice(index, 1);
      this.storageService.setValue(this.TASKS_KEY, tasks);
    }
    console.log('Task deleted at index:', index);
  }
  //Actualiza una tarea existente
  async updateTask(index: number, updatedTask: TaskModel): Promise<void> {
    const tasks = await this.getTasks();
    if (index > -1 && index < tasks.length) {
      tasks[index] = updatedTask;
      this.storageService.setValue(this.TASKS_KEY, tasks);
    }
  }
  async deleteAllTasks(): Promise<void> {
    await this.storageService.removeValue(this.TASKS_KEY);
    console.log('All tasks deleted');
  }
}
