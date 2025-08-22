import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './storage-service';
// Creamos un mock de Storage
class StorageMock {
  private store: Record<string, any> = {};

  create = jasmine.createSpy('create').and.callFake(async () => this);
  set = jasmine.createSpy('set').and.callFake(async (key: string, value: any) => {
    this.store[key] = value;
    return true;
  });
  get = jasmine.createSpy('get').and.callFake(async (key: string) => {
    return this.store[key] ?? null;
  });
  remove = jasmine.createSpy('remove').and.callFake(async (key: string) => {
    delete this.store[key];
    return true;
  });
  clear = jasmine.createSpy('clear').and.callFake(async () => {
    this.store = {};
    return true;
  });
}

describe('StorageService', () => {
  let service: StorageService;
  let storageMock: StorageMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: Storage, useClass: StorageMock }
      ]
    }).compileComponents();

    service = TestBed.inject(StorageService);
    storageMock = TestBed.inject(Storage) as unknown as StorageMock;

    // Forzamos inicialización del storage
    await service['init']();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get a value', async () => {
    await service.setValue('key1', 'value1');
    const result = await service.getValue('key1');
    expect(result).toBe('value1');
    expect(storageMock.set).toHaveBeenCalledWith('key1', 'value1');
    expect(storageMock.get).toHaveBeenCalledWith('key1');
  });

  it('should return null if key does not exist', async () => {
    const result = await service.getValue('non_existing_key');
    expect(result).toBeNull();
  });

  it('should remove a value', async () => {
    await service.setValue('key2', 'value2');
    await service.removeValue('key2');
    const result = await service.getValue('key2');
    expect(result).toBeNull();
    expect(storageMock.remove).toHaveBeenCalledWith('key2');
  });

  it('should clear all values', async () => {
    await service.setValue('k1', 'v1');
    await service.setValue('k2', 'v2');
    await service.clearStorage();

    const result1 = await service.getValue('k1');
    const result2 = await service.getValue('k2');
    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(storageMock.clear).toHaveBeenCalled();
  });
});

