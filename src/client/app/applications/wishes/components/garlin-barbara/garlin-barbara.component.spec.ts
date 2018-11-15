import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarlinBarbaraComponent } from './garlin-barbara.component';

describe('GarlinBarbaraComponent', () => {
  let component: GarlinBarbaraComponent;
  let fixture: ComponentFixture<GarlinBarbaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarlinBarbaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarlinBarbaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
