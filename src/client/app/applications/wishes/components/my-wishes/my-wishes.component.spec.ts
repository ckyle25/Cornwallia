import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWishesComponent } from './my-wishes.component';

describe('MyWishesComponent', () => {
  let component: MyWishesComponent;
  let fixture: ComponentFixture<MyWishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
