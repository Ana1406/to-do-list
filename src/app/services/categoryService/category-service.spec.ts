import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category-service';
import { StorageService } from '../storageService/storage-service';
import { Category } from 'src/app/core/models/categories.model';

// Creamos un mock del StorageService
class MockStorageService {
  private store: { [key: string]: any } = {};

  async getValue(key: string): Promise<any> {
    return this.store[key] || null;
  }

  async setValue(key: string, value: any): Promise<void> {
    this.store[key] = value;
  }
}

describe('CategoryService', () => {
  let service: CategoryService;
  let storageService: MockStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        { provide: StorageService, useClass: MockStorageService }
      ]
    });
    service = TestBed.inject(CategoryService);
    storageService = TestBed.inject(StorageService) as unknown as MockStorageService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty array if no categories stored', async () => {
    const categories = await service.getCategories();
    expect(categories).toEqual([]);
  });

  it('should add a category', async () => {
    const category: Category = { id: 1, name: 'Test Category' };

    await service.addCategory(category);
    const categories = await service.getCategories();

    expect(categories.length).toBe(1);
    expect(categories[0]).toEqual(category);
  });

  it('should update a category', async () => {
    const category: Category = { id: 1, name: 'Old Name' };
    const updated: Category = { id: 1, name: 'New Name' };

    await service.addCategory(category);
    await service.updateCategory(0, updated);

    const categories = await service.getCategories();
    expect(categories[0].name).toBe('New Name');
  });

  it('should delete a category', async () => {
    const cat1: Category = { id: 1, name: 'Cat1' };
    const cat2: Category = { id: 2, name: 'Cat2' };

    await service.addCategory(cat1);
    await service.addCategory(cat2);

    await service.deleteCategory(0);
    const categories = await service.getCategories();

    expect(categories.length).toBe(1);
    expect(categories[0].name).toBe('Cat2');
  });

  it('should not update if index is out of bounds', async () => {
    const category: Category = { id: 1, name: 'Test' };
    await service.addCategory(category);

    await service.updateCategory(5, { id: 1, name: 'Invalid' });

    const categories = await service.getCategories();
    expect(categories[0].name).toBe('Test');
  });

  it('should not delete if index is out of bounds', async () => {
    const category: Category = { id: 1, name: 'Test' };
    await service.addCategory(category);

    await service.deleteCategory(5);

    const categories = await service.getCategories();
    expect(categories.length).toBe(1);
  });
});
