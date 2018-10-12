import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KevinKendalComponent } from './kevin-kendal.component';

describe('KevinKendalComponent', () => {
  let component: KevinKendalComponent;
  let fixture: ComponentFixture<KevinKendalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KevinKendalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KevinKendalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
