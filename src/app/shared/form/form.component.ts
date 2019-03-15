import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Form } from './form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/models/form.model';
import { Model, Field } from 'src/app/models/model';
import * as ohm from "ohm-js"

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form implements OnInit, OnChanges {
  @Input() questions: Field[] = []
  @Output() up: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  @Output() guardar: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formbuilder: FormBuilder) {
    super(formbuilder);
  }


  ngOnInit() {
    console.log("questions en form.components", this.questions)
    this.buildForm(this.questions)
    console.log("formulario actual", this.form)
    this.form.statusChanges.subscribe(status => this.IsValid(status))
  }

  ngOnChanges() {
    this.buildForm(this.questions)
  }
  save() {
   this.up.emit(this.form)
  }
  guardarForm() {
    this.up.emit(this.form)
  }
  getCondition(question) {
    var pass = true
    
    //This conditional parsing
    //Se obtiene la condición, se parsea, se buscan los controles en el formulario y se devuelve el valor

    if(question.conditional) {
      pass = conditional(question.conditional, this.form)
    }
    
    return pass
  }
  delete() {
    this.remove.emit("hola")
  }
  IsValid(status) {
    status == "VALID" ? this.save(): ""
  }

}
function conditional(chain, form) {
  var grammar = ohm.grammar(logicGrammar)
    var semantics = grammar.createSemantics()
    semantics.addOperation("eval", {
      Exp: function(e) {
        return e.eval();
      },
      AddExp: function(e) {
        return e.eval();
      },
      AddExp_dis: function(left, op, right) {
        return left.eval() || right.eval();
      },
      AddExp_yux: function(left, op, right) {
        return left.eval() && right.eval();
      },
      MulExp: function(e) {
        return e.eval();
      },
      MulExp_igu: function(left, op, right) {
        return left.eval() == right.eval();
      },
      MulExp_mayor: function(left, op, right) {
        return left.eval() > right.eval();
      },
      MulExp_menor: function(left, op, right) {
        return left.eval() < right.eval();
      },
      PriExp: function(e) {
        // console.log(e.sourceString)
        return e.eval()
      },
      PriExp_vari: function(e) {
        // console.log(e.sourceString)
        return form.get(e.sourceString).value
      },
      PriExp_paren: function(open, exp, close) {
        return exp.eval();
      },
      PriExp_quote: function(open, exp, close) {
        return exp.sourceString
      }
    })
      var m =grammar.match(chain)
      // console.log(m.message)
      if (m.succeeded()) {
        return semantics(m).eval()
        // pass = 
      }
      else return false
}
var logicGrammar = `
Logic {
  Exp
    = AddExp

  AddExp
    = AddExp "||" MulExp  -- dis
    | AddExp "&&" MulExp  -- yux
    | MulExp

  MulExp
    = PriExp "==" PriExp --igu
    | alnum+ ">" alnum+ --mayor
    | alnum+ "<" alnum+ --menor

  PriExp
    = "(" Exp ")"  -- paren
    | alnum+ --vari 
    | "'" alnum+ "'" --quote
}
`
