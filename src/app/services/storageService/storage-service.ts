import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _storageReady: Promise<void> | null = null;

  constructor(private storage: Storage) {
    this._storageReady = this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async setValue(key: string, value: any) {
    await this._storageReady;
    if (this._storage) {
      await this._storage.set(key, value);
    }
  }
  async getValue(key: string) {
    await this._storageReady;
    if (this._storage) {
      return await this._storage.get(key);
    }
    return null;

  }

  removeValue(key: string) {
    if (this._storage) {
      this._storage.remove(key);
    }
  }

  clearStorage() {
    if (this._storage) {
      this._storage.clear();
    }
  }
}
