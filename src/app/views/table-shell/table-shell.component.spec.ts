import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableShellComponent } from './table-shell.component';

describe('TableShellComponent', () => {
  let component: TableShellComponent;
  let fixture: ComponentFixture<TableShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
