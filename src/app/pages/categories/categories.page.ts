import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditDetailModalPage } from 'src/app/components/edit-detail-modal/edit-detail-modal.page';
import { ModalsEnum } from 'src/app/core/enums/modals.enum';
import { Category } from 'src/app/core/models/categories.model';
import { CategoryService } from 'src/app/services/categoryService/category-service';

@Component({
  selector: 'app-categories', standalone: false,
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [];
  allCategories: Category[] = [];
  newTaskTitle: string = '';
  loadBatchSize = 10;
  loadedCount = 0;
  dateToday: string;
  modalsEnum = ModalsEnum;

  constructor(
    private categoryService: CategoryService,
    private modalCtrl: ModalController,
    private cd: ChangeDetectorRef) {
    const today = new Date();
    this.dateToday = today.toLocaleDateString();
  }

  async ngOnInit() {
    this.allCategories = await this.categoryService.getCategories();
    this.loadMore();
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  async addTask() {
    console.log('Adding task:', this.newTaskTitle);
    if (this.newTaskTitle.trim().length > 0) {
      const newCategory: Category = {
        id: this.allCategories.length + 1,
        name: '',
        description: ''
      };

      await this.categoryService.addCategory(newCategory);
      this.allCategories = await this.categoryService.getCategories();
      this.newTaskTitle = '';
    }
  }

  async deleteTask(index: number) {
    await this.categoryService.deleteCategory(index);
    this.categories = await this.categoryService.getCategories();
  }

  async openModal(category?: Category, indexCategory?: number) {
    const modal = await this.modalCtrl.create({
      component: EditDetailModalPage,
      componentProps: {
        typeModal: this.modalsEnum.CATEGORY_DETAIL_MODAL,
        data: category,
        index: indexCategory,
        countCategories: this.allCategories.length, add: category === undefined
      },

    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data?.updated) {
      this.allCategories = await this.categoryService.getCategories();
      this.categories = [];
      this.loadedCount = 0;
      this.loadMore();
      this.cd.detectChanges();
    }

  }

  loadMore(event?: any) {
    const nextBatch = this.allCategories.slice(this.loadedCount, this.loadedCount + this.loadBatchSize);
    this.categories = [...this.categories, ...nextBatch];
    this.loadedCount += nextBatch.length;

    if (event) {
      event.target.complete();
    }

    if (this.loadedCount >= this.allCategories.length && event) {
      event.target.disabled = true;
    }
  }
}
