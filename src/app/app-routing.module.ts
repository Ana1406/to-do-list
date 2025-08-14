import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteAppEnum } from './core/enums/route.enum';

const routes: Routes = [
  { path: '', redirectTo: RouteAppEnum.HOME, pathMatch: 'full' },
  {
    path: RouteAppEnum.HOME,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: RouteAppEnum.TASKS,
    loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksPageModule)
  },
  {
    path: RouteAppEnum.CATEGORIES,
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
