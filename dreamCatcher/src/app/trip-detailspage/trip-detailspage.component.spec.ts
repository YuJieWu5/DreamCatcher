import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailspageComponent } from './trip-detailspage.component';

describe('TripDetailspageComponent', () => {
  let component: TripDetailspageComponent;
  let fixture: ComponentFixture<TripDetailspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripDetailspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetailspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
