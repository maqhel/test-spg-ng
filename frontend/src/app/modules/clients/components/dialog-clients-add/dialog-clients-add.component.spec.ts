import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClientsAddComponent } from './dialog-clients-add.component';

describe('DialogClientsAddComponent', () => {
  let component: DialogClientsAddComponent;
  let fixture: ComponentFixture<DialogClientsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogClientsAddComponent]
    });
    fixture = TestBed.createComponent(DialogClientsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
