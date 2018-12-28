import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemOverviewComponent } from './food-item-overview.component';

describe('FoodItemOverviewComponent', () => {
  let component: FoodItemOverviewComponent;
  let fixture: ComponentFixture<FoodItemOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodItemOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
