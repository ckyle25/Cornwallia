import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobShariComponent } from './rob-shari.component';

describe('RobShariComponent', () => {
  let component: RobShariComponent;
  let fixture: ComponentFixture<RobShariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobShariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobShariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
