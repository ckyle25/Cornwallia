import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroyAlisonComponent } from './troy-alison.component';

describe('TroyAlisonComponent', () => {
  let component: TroyAlisonComponent;
  let fixture: ComponentFixture<TroyAlisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroyAlisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroyAlisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
