import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeToPrimeDialogComponent } from './upgrade-to-prime-dialog.component';

describe('UpgradeToPrimeDialogComponent', () => {
  let component: UpgradeToPrimeDialogComponent;
  let fixture: ComponentFixture<UpgradeToPrimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpgradeToPrimeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeToPrimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
