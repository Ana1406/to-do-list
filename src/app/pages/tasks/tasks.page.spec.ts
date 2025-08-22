import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { TasksPage } from './tasks.page';
import { TaskService } from 'src/app/services/taskService/task-service';
import { CategoryService } from 'src/app/services/categoryService/category-service';
import { FeatureFlagService } from 'src/app/services/featureFlagService/feature-flag-service';
import { TaskModel } from 'src/app/core/models/task.model';
import { Category } from 'src/app/core/models/categories.model';

class MockTaskService {
  tasks: TaskModel[] = [{ title: 'Demo', completed: false, category: '' }];
  getTasks = jasmine.createSpy('getTasks').and.callFake(async () => this.tasks);
  addTask = jasmine.createSpy('addTask').and.callFake(async (task: TaskModel) => this.tasks.push(task));
  deleteTask = jasmine.createSpy('deleteTask').and.callFake(async (i: number) => this.tasks.splice(i, 1));
  deleteAllTasks = jasmine.createSpy('deleteAllTasks').and.callFake(async () => this.tasks = []);
  updateTask = jasmine.createSpy('updateTask').and.callFake(async (i: number, t: TaskModel) => this.tasks[i] = t);
}

class MockCategoryService {
  categories: Category[] = [{ id: 1, name: 'Work', description: '' }];
  getCategories = jasmine.createSpy('getCategories').and.callFake(async () => this.categories);
  addCategory = jasmine.createSpy('addCategory');
  deleteCategory = jasmine.createSpy('deleteCategory');
  updateCategory = jasmine.createSpy('updateCategory');
}

class MockFeatureFlagService {
  loadFlags = jasmine.createSpy('loadFlags').and.callFake(async () => { });
  isCategoriesEnabled = jasmine.createSpy('isCategoriesEnabled').and.returnValue(true);
  getItemBackgroundColor = jasmine.createSpy('getItemBackgroundColor').and.returnValue('#abcdef');
}

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let taskService: MockTaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TaskService, useClass: MockTaskService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: FeatureFlagService, useClass: MockFeatureFlagService },
        ModalController
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as unknown as MockTaskService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load flags, categories and tasks', fakeAsync(async () => {
    await component.ngOnInit();
    tick();
    expect(component.showCategories).toBeTrue();
    expect(component.itemBackgroundColor).toBe('#abcdef');
    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.tasks.length).toBeGreaterThan(0);
  }));

  it('should add a new task', fakeAsync(async () => {
    component.newTaskTitle = 'Nueva tarea';
    await component.addTask();
    tick();
    expect(taskService.addTask).toHaveBeenCalled();
    expect(component.tasks.some(t => t.title === 'Nueva tarea')).toBeTrue();
  }));

  it('should delete a task', fakeAsync(async () => {
    await component.deleteTask(0);
    tick();
    expect(taskService.deleteTask).toHaveBeenCalledWith(0);
  }));

  it('should delete all tasks', fakeAsync(async () => {
    await component.deleteAllTask();
    tick();
    expect(taskService.deleteAllTasks).toHaveBeenCalled();
    expect(component.tasks.length).toBe(0);
  }));

  it('should toggle task completion', fakeAsync(() => {
    const task = { title: 'Demo', completed: false, category: '' };
    component.tasks = [task];
    component.changeStateTask(task);
    expect(task.completed).toBeTrue();
    expect(taskService.updateTask).toHaveBeenCalled();
  }));
});
