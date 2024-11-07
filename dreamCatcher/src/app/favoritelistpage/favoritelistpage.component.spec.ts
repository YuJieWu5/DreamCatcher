import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritelistpageComponent } from './favoritelistpage.component';

describe('FavoritelistpageComponent', () => {
  let component: FavoritelistpageComponent;
  let fixture: ComponentFixture<FavoritelistpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritelistpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritelistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
