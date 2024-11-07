import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripspageComponent } from './tripspage.component';

describe('TripspageComponent', () => {
  let component: TripspageComponent;
  let fixture: ComponentFixture<TripspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
