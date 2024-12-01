import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListDialogComponent } from './select-list-dialog.component';

describe('SelectListDialogComponent', () => {
  let component: SelectListDialogComponent;
  let fixture: ComponentFixture<SelectListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectListDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
