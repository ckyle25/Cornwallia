import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWishesComponent } from './all-wishes.component';

describe('AllWishesComponent', () => {
  let component: AllWishesComponent;
  let fixture: ComponentFixture<AllWishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllWishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
