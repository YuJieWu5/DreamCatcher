import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenelistComponent } from './scenelist.component';

describe('ScenelistComponent', () => {
  let component: ScenelistComponent;
  let fixture: ComponentFixture<ScenelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
