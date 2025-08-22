import { Injectable } from '@angular/core';
import { Category } from 'src/app/core/models/categories.model';
import { StorageService } from '../storageService/storage-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly CATEGORIES_KEY = 'categories';

  constructor(private storageService: StorageService) { }

  // Obtener todas las categorías
  async getCategories(): Promise<Category[]> {
    return (await this.storageService.getValue(this.CATEGORIES_KEY)) || [];
  }

  // Agregar nueva categoría
  async addCategory(category: Category): Promise<void> {
    const categories = await this.getCategories();
    categories.push(category);
    await this.storageService.setValue(this.CATEGORIES_KEY, categories);
  }

  // Actualizar categoría por índice
  async updateCategory(index: number, updatedCategory: Category): Promise<void> {
    const categories = await this.getCategories();
    if (index > -1 && index < categories.length) {
      categories[index] = updatedCategory;
      await this.storageService.setValue(this.CATEGORIES_KEY, categories);
    }
  }

  // Eliminar categoría por índice
  async deleteCategory(index: number): Promise<void> {
    const categories = await this.getCategories();
    if (index > -1 && index < categories.length) {
      categories.splice(index, 1);
      await this.storageService.setValue(this.CATEGORIES_KEY, categories);
    }
  }

}
