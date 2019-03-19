import * as ohm from "ohm-js"
import { FormGroup, AbstractControl } from "@angular/forms";
import { Field } from "../models/model";
import { Util } from "./util.helper";

export class Conditional {
    grammar = ohm.grammar(logicGrammar)
    semantics = this.grammar.createSemantics()
    form:FormGroup
    formcontrol: AbstractControl
    question:any
    purpose:string
    setForm(form) {
        this.form = form
    }
    operationeval() {
        var self = this
        this.semantics.addOperation("eval", {
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
              return left.eval() === right.eval();
            },
            MulExp_des: function(left, op, right) {
                return left.eval() !== right.eval();
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
              var control = self.form.get(e.sourceString)
              if(control) return control.value
              else Util.TE("No se encontró el nombre del campo")
              
            },
            PriExp_paren: function(open, exp, close) {
              return exp.eval();
            },
            PriExp_quote: function(open, exp, close) {
              return exp.sourceString
            },
            booltrue: function(e) {
              return true
            },
            boolfalse: function(e) {
              return false
            }
          }).addOperation("subscribers", {
            PriExp_vari: function(e) {
                console.log("el nombre del campo dependiente es", e.sourceString)
                var control = self.form.get(e.sourceString)
                if(control) self.setSubscriber(control)
                else Util.TE("No se encontró el nombre del campo")
              },
            _terminal: function () { },
            _nonterminal: function (a) {
                var vars = []
                this.children.forEach((child) => {
                    child.subscribers()
                });
            }
          })
          
    }
    setSubscriber(formcontrol:AbstractControl) {
        
        formcontrol.valueChanges.subscribe(value => {
            this.runfuntion(this.match())
            console.log("El resultado del match fue %s", this.match());
            console.log("Cambió el valor a %s", value);
            
            //Hay que obtener el campo en el cual se aplica la condición, correr la operación de lógica
            //y ver si se cumple o no
        })
    }
    runfuntion(pass: boolean) {
        var self = this
        this.question[this.purpose + "d"] = pass
        switch (this.purpose) {
            case "disable":
            console.log("Entra al caso disable");
            
            var control = self.form.get(self.question.key)
            if (control) {
                pass ? control.disable() : control.enable()
                console.log("hay control", control.disabled)
            }
            else Util.TE("No se encontró el nombre del campo")
                

                break;
            case "exist":
            console.log(self.formcontrol);
                self.form.removeControl(self.question.key)
                pass ? self.form.addControl(self.question.key, self.formcontrol): 
                self.form.removeControl(self.question.key);
                

            default:
                break;
        }
    }
    activateSubs() {
        this.runfuntion(this.match())
        var m =this.grammar.match(this.question[this.purpose])
        // console.log(m.message)
        if (m.succeeded()) {
          this.semantics(m).subscribers()
          // pass = 
        }
        else Util.TE("Hubo un problema parseando la subscripción")
    }
    match() {
        var m =this.grammar.match(this.question[this.purpose])
        // console.log(m.message)
        if (m.succeeded()) {
            
          return this.semantics(m).eval()
          // pass = 
        }
        else {
            var errorstring = `No se pudo parsear la condición ${this.purpose}, 
            con valor ${this.question[this.purpose]}`
            Util.TE(errorstring)
            return false
        }
    }
    constructor(form, question,  purpose) {
        this.form = form
        this.question = question
        this.purpose = purpose
        this.formcontrol = this.form.get(question.key)
        this.operationeval()
    }
        
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
      | PriExp "!=" PriExp --des
      | alnum+ ">" alnum+ --mayor
      | alnum+ "<" alnum+ --menor
      | booltrue | boolfalse
  
    PriExp
      = "(" Exp ")"  -- paren
      | alnum+ --vari 
      | "'" alnum+ "'" --quote

    booltrue
    = "true"

    boolfalse
    = "false"
  }
  `