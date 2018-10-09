import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDialog } from './question-dialog.component';

describe('QuestionDialog', () => {
  let component: QuestionDialog;
  let fixture: ComponentFixture<QuestionDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
