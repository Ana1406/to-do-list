import { TestBed } from '@angular/core/testing';
import { TaskService } from './task-service';
import { StorageService } from '../storageService/storage-service';
import { TaskModel } from 'src/app/core/models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  const mockTasks: TaskModel[] = [
    { title: 'Tarea 1', completed: false, category: '' },
    { title: 'Tarea 2', completed: true, category: '' }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StorageService', ['getValue', 'setValue', 'removeValue']);

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: StorageService, useValue: spy }
      ]
    });

    service = TestBed.inject(TaskService);
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener las tareas almacenadas', async () => {
    storageServiceSpy.getValue.and.returnValue(Promise.resolve(mockTasks));

    const tasks = await service.getTasks();

    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe('Tarea 1');
    expect(storageServiceSpy.getValue).toHaveBeenCalledWith('tasks');
  });

  it('debería adicionar una tarea', async () => {
    storageServiceSpy.getValue.and.returnValue(Promise.resolve([...mockTasks]));
    storageServiceSpy.setValue.and.returnValue(Promise.resolve());

    const newTask: TaskModel = { title: 'Tarea 3', completed: false, category: '' };
    await service.addTask(newTask);

    expect(storageServiceSpy.setValue).toHaveBeenCalledWith('tasks', [...mockTasks, newTask]);
  });

  it('debería eliminar una tarea por índice', async () => {
    storageServiceSpy.getValue.and.returnValue(Promise.resolve([...mockTasks]));
    storageServiceSpy.setValue.and.returnValue(Promise.resolve());

    await service.deleteTask(0);

    expect(storageServiceSpy.setValue).toHaveBeenCalledWith('tasks', [mockTasks[1]]);
  });

  it('debería actualizar una tarea por índice', async () => {
    storageServiceSpy.getValue.and.returnValue(Promise.resolve([...mockTasks]));
    storageServiceSpy.setValue.and.returnValue(Promise.resolve());

    const updatedTask: TaskModel = { title: 'Tarea 1 editada', completed: true, category: '' };
    await service.updateTask(0, updatedTask);

    expect(storageServiceSpy.setValue).toHaveBeenCalledWith('tasks', [updatedTask, mockTasks[1]]);
  });

  it('debería eliminar todas las tareas', async () => {
    storageServiceSpy.removeValue.and.returnValue(await Promise.resolve());

    await service.deleteAllTasks();

    expect(storageServiceSpy.removeValue).toHaveBeenCalledWith('tasks');
  });
});
