import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyntableComponent } from './dyntable.component';

describe('DyntableComponent', () => {
  let component: DyntableComponent;
  let fixture: ComponentFixture<DyntableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyntableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyntableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
