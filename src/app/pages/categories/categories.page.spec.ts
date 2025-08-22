import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoriesPage } from './categories.page';
import { CategoryService } from 'src/app/services/categoryService/category-service';
import { ModalController, IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// ------------------------
// Mock de CategoryService
// ------------------------
class MockCategoryService {
  categories = [{ id: 1, name: 'Test Cat', description: 'Desc' }];
  getCategories = jasmine.createSpy('getCategories').and.returnValue(Promise.resolve(this.categories));
  addCategory = jasmine.createSpy('addCategory').and.returnValue(Promise.resolve());
  deleteCategory = jasmine.createSpy('deleteCategory').and.returnValue(Promise.resolve());
}

// ------------------------
// Mock de ModalController
// ------------------------
class MockModalController {
  create = jasmine.createSpy('create').and.callFake(() => {
    return Promise.resolve({
      present: jasmine.createSpy('present'),
      onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve({ data: null }))
    });
  });
}

describe('CategoriesPage', () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;
  let categoryService: MockCategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: ModalController, useClass: MockModalController }
      ],
      schemas: [ /* Esto evita errores por componentes Ionic no declarados */
        // CUSTOM_ELEMENTS_SCHEMA permite ignorar tags como <ion-fab>, <ion-icon>, etc.
        // Así no necesitas declarar mocks manuales.
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as any;

    // Evitar ejecución real de loadMore() durante la creación inicial
    spyOn(component, 'loadMore').and.callFake(() => { });

    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', fakeAsync(async () => {
    await component.ngOnInit();
    tick();
    expect(categoryService.getCategories).toHaveBeenCalled();
  }));

  it('should open modal and refresh categories if data.updated', fakeAsync(async () => {
    const modalCtrl = TestBed.inject(ModalController) as any;
    modalCtrl.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
      onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve({ data: { updated: true } }))
    }));

    await component.openModal();
    tick();
    expect(categoryService.getCategories).toHaveBeenCalledTimes(2); // init + refresh after modal
  }));
});
