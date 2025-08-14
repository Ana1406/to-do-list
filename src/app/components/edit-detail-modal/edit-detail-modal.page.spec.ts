import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDetailModalPage } from './edit-detail-modal.page';

describe('EditDetailModalPage', () => {
  let component: EditDetailModalPage;
  let fixture: ComponentFixture<EditDetailModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
