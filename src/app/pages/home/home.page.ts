import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  dateToday: Date;
  constructor() {
    this.dateToday = new Date();
  }
  ngOnInit() {
  }
}
