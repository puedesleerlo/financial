import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicchildsComponent } from './dynamicchilds.component';

describe('DynamicchildsComponent', () => {
  let component: DynamicchildsComponent;
  let fixture: ComponentFixture<DynamicchildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicchildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicchildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
