import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesLandingComponent } from './wishes-landing.component';

describe('WishesLandingComponent', () => {
  let component: WishesLandingComponent;
  let fixture: ComponentFixture<WishesLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishesLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
