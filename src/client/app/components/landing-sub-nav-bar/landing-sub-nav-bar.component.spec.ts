import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSubNavBarComponent } from './landing-sub-nav-bar.component';

describe('LandingSubNavBarComponent', () => {
  let component: LandingSubNavBarComponent;
  let fixture: ComponentFixture<LandingSubNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingSubNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingSubNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
