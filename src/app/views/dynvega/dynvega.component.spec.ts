import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynvegaComponent } from './dynvega.component';

describe('DynvegaComponent', () => {
  let component: DynvegaComponent;
  let fixture: ComponentFixture<DynvegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynvegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynvegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
