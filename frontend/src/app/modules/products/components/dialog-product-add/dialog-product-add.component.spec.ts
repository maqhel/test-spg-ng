import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductAddComponent } from './dialog-product-add.component';

describe('DialogProductAddComponent', () => {
  let component: DialogProductAddComponent;
  let fixture: ComponentFixture<DialogProductAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogProductAddComponent]
    });
    fixture = TestBed.createComponent(DialogProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
