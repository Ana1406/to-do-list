import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalsEnum } from 'src/app/core/enums/modals.enum';
import { Category } from 'src/app/core/models/categories.model';
import { TaskModel } from 'src/app/core/models/task.model';
import { CategoryService } from 'src/app/services/categoryService/category-service';
import { TaskService } from 'src/app/services/taskService/task-service';

@Component({
  selector: 'app-edit-detail-modal',
  standalone: false,
  templateUrl: './edit-detail-modal.page.html',
  styleUrls: ['./edit-detail-modal.page.scss'],
})
export class EditDetailModalPage implements OnInit {
  @Input() typeModal: number = 0;
  @Input() data!: any;
  @Input() index: number = 0;
  @Input() countCategories: number = 0;
  categories: Category[] = [];

  constructor(private modalCtrl: ModalController, private taskService: TaskService, private categoryService: CategoryService) { }

  async ngOnInit() {
    this.categories = await this.categoryService.getCategories();

    if (this.typeModal === ModalsEnum.TASK_DETAIL_MODAL) {
      if (!this.data) {
        this.data = {
          title: '',
          category: '',
          completed: false
        } as TaskModel;
      }
    } else if (this.typeModal === ModalsEnum.CATEGORY_DETAIL_MODAL) {
      if (!this.data) {
        this.data = {
          id: this.countCategories + 1,
          name: '',
          description: ''
        } as Category;
      }
    }
  }


  get title() {
    if (this.typeModal === ModalsEnum.TASK_DETAIL_MODAL) {
      return this.data?.title ? 'Editar Tarea' : 'Adicionar Tarea';
    } else {
      return this.data?.name ? 'Editar Categoría' : 'Adicionar Categoría';
    }
  }
  get titleButton() {
    return (this.data?.name || this.data?.title) ? 'Actualizar' : 'Guardar';
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }

  async delete() {
    if (this.typeModal === ModalsEnum.TASK_DETAIL_MODAL) {
      await this.taskService.deleteTask(this.index);
    }
    else {
      await this.categoryService.deleteCategory(this.index);
    }
    this.modalCtrl.dismiss({ updated: true });
  }

  async update() {
    if (this.typeModal === ModalsEnum.TASK_DETAIL_MODAL) {
      await this.taskService.updateTask(this.index, this.data);
    }
    else { await this.categoryService.updateCategory(this.index, this.data); }
    this.modalCtrl.dismiss({ updated: true });
  }
  async save() {
    if (this.typeModal === ModalsEnum.TASK_DETAIL_MODAL) {
      await this.taskService.addTask(this.data);
    }
    else { await this.categoryService.addCategory(this.data); };
    this.modalCtrl.dismiss({ updated: true });
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.index != null) {
      this.update();

    } else {
      this.save()
    }
  }

}
