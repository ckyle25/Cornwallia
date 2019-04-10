import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniAppCardComponent } from './mini-app-card.component';

describe('MiniAppCardComponent', () => {
  let component: MiniAppCardComponent;
  let fixture: ComponentFixture<MiniAppCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniAppCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniAppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
