import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  dateToday: string;
  constructor() {
    const today = new Date();
    this.dateToday = today.toLocaleDateString();
  }
}
