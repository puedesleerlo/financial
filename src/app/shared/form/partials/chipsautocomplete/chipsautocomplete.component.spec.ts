import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsautocompleteComponent } from './chipsautocomplete.component';

describe('ChipsautocompleteComponent', () => {
  let component: ChipsautocompleteComponent;
  let fixture: ComponentFixture<ChipsautocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsautocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsautocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
