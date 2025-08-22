import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { EditDetailModalPage } from './edit-detail-modal.page';
import { TaskService } from 'src/app/services/taskService/task-service';
import { CategoryService } from 'src/app/services/categoryService/category-service';
import { ModalsEnum } from 'src/app/core/enums/modals.enum';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('EditDetailModalPage', () => {
  let component: EditDetailModalPage;
  let fixture: ComponentFixture<EditDetailModalPage>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

  const mockCategory = { id: 1, name: 'Test', description: 'Desc' };

  class StorageMock {
    create = jasmine.createSpy().and.returnValue(Promise.resolve());
    get = jasmine.createSpy().and.returnValue(Promise.resolve(null));
    set = jasmine.createSpy().and.returnValue(Promise.resolve());
    remove = jasmine.createSpy().and.returnValue(Promise.resolve());
  }

  beforeEach(async () => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['addTask', 'updateTask', 'deleteTask']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories', 'addCategory', 'updateCategory', 'deleteCategory']);

    taskServiceSpy.addTask.and.returnValue(Promise.resolve());
    taskServiceSpy.updateTask.and.returnValue(Promise.resolve());
    taskServiceSpy.deleteTask.and.returnValue(Promise.resolve());

    categoryServiceSpy.getCategories.and.returnValue(Promise.resolve([mockCategory]));
    categoryServiceSpy.addCategory.and.returnValue(Promise.resolve());
    categoryServiceSpy.updateCategory.and.returnValue(Promise.resolve());
    categoryServiceSpy.deleteCategory.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      declarations: [EditDetailModalPage],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: modalCtrlSpy },
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: Storage, useClass: StorageMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDetailModalPage);
    component = fixture.componentInstance;
  });

  describe('TASK_DETAIL_MODAL when data not provided', () => {
    beforeEach(async () => {
      component.typeModal = ModalsEnum.TASK_DETAIL_MODAL;
      component.data = null as any;
      component.index = null as any;
      await component.ngOnInit();
    });

    it('should show "Adicionar Tarea"', () => {
      expect(component.title).toBe('Adicionar Tarea');
    });

    it('button should show "Guardar"', () => {
      expect(component.titleButton).toBe('Guardar');
    });

    it('when confirming, must call addTask and close the modal', async () => {
      await component.confirm();
      expect(taskServiceSpy.addTask).toHaveBeenCalledWith(component.data);
      expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith({ updated: true });
    });
  });

  describe('TASK_DETAIL_MODAL when data provided', () => {
    beforeEach(async () => {
      component.typeModal = ModalsEnum.TASK_DETAIL_MODAL;
      component.index = 1;
      component.data = { title: 'Tarea 1', category: 'General', completed: false } as any;
      await component.ngOnInit();
    });

    it('should show "Editar Tarea"', () => {
      expect(component.title).toBe('Editar Tarea');
    });

    it('button should show "Actualizar"', () => {
      expect(component.titleButton).toBe('Actualizar');
    });

    it('when confirming, must call updateTask and close the modal', async () => {
      await component.confirm();
      expect(taskServiceSpy.updateTask).toHaveBeenCalledWith(1, component.data);
      expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith({ updated: true });
    });
  });

  describe('CATEGORY_MODAL when data not provided', () => {
    beforeEach(async () => {
      component.typeModal = ModalsEnum.CATEGORY_DETAIL_MODAL;
      component.countCategories = 1;
      component.data = null as any;
      component.index = null as any;
      await component.ngOnInit();
    });

    it('should show "Adicionar Categoría"', () => {
      expect(component.title).toBe('Adicionar Categoría');
    });

    it('button should show "Guardar"', () => {
      expect(component.titleButton).toBe('Guardar');
    });

    it('when confirming, must call addCategory and close the modal', async () => {
      await component.confirm();
      expect(categoryServiceSpy.addCategory).toHaveBeenCalledWith(component.data);
      expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith({ updated: true });
    });
  });

  describe('CATEGORY_MODAL when data provided', () => {
    beforeEach(async () => {
      component.typeModal = ModalsEnum.CATEGORY_DETAIL_MODAL;
      component.data = mockCategory;
      component.index = 2;
      component.countCategories = 2;
      await component.ngOnInit();
    });

    it('should show "Editar Categoría"', () => {
      expect(component.title).toBe('Editar Categoría');
    });

    it('button should show "Actualizar"', () => {
      expect(component.titleButton).toBe('Actualizar');
    });

    it('when confirming, must call updateCategory and close the modal', async () => {
      await component.confirm();
      expect(categoryServiceSpy.updateCategory).toHaveBeenCalledWith(2, component.data);
      expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith({ updated: true });
    });
  });
});
