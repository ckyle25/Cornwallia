import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KyleJodiComponent } from './kyle-jodi.component';

describe('KyleJodiComponent', () => {
  let component: KyleJodiComponent;
  let fixture: ComponentFixture<KyleJodiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KyleJodiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KyleJodiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
