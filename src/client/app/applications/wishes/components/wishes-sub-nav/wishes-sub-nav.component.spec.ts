import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesSubNavComponent } from './wishes-sub-nav.component';

describe('WishesSubNavComponent', () => {
  let component: WishesSubNavComponent;
  let fixture: ComponentFixture<WishesSubNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishesSubNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishesSubNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
