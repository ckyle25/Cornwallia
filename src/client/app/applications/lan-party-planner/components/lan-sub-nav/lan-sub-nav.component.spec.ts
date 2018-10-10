import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanSubNavComponent } from './lan-sub-nav.component';

describe('LanSubNavComponent', () => {
  let component: LanSubNavComponent;
  let fixture: ComponentFixture<LanSubNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanSubNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanSubNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
