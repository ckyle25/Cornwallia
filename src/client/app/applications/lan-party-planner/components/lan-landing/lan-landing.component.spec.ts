import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanLandingComponent } from './lan-landing.component';

describe('LanLandingComponent', () => {
  let component: LanLandingComponent;
  let fixture: ComponentFixture<LanLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
