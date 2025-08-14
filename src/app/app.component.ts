import { Component } from '@angular/core';
import { RouteAppEnum } from './core/enums/route.enum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  dateToday: string;
  routes = RouteAppEnum
  constructor() {
    const today = new Date();
    this.dateToday = today.toLocaleDateString();
  }
}
