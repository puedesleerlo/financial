import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Model, Field, Option } from '../../models/model';
import { ArrayDataSource } from '@angular/cdk/collections';
import { Conditional } from '../logic.analizer';
import { ValidationText } from 'src/assets/validation.text';
import { isDevMode } from '@angular/core';

interface Group {
    [key: string]: [any, any[]]
}
interface AbstractGroup {
    [key:string]: AbstractControl
}
export abstract class Form {
    public form: FormGroup
    public questions: Field[]
    private formSub: Subscription
    protected formErrors = {}
    // public conditionalHandler = new Conditional(this.form)
    constructor(private formBuilder: FormBuilder) {
        
     }
    buildForm(questions: Field[], globalValidator?) {
        this.questions = questions
        this.form = this.buildGroup(questions, globalValidator);
        this.conditionalSubs()
        // this.conditionalHandler.setForm(this.form)
        if (this.formSub) this.formSub.unsubscribe();
        this.formSub = this.form.valueChanges
            .subscribe(data => this.onValueChanged(data));
        // this.onValueChanged();
    }

    conditionalSubs() {
        this.questions.forEach(field => {
            if(isDevMode()) console.log("Empieza a buscar por condiciones", field);
            
            if (field.exist) {
                if(isDevMode()) console.log("Tiene la condición no exist");
                
                new Conditional(this.form, field, "exist").activateSubs()
            }
            if (field.disable) {
                new Conditional(this.form, field, "disable").activateSubs()
            }
            if (field.options && field.options.length > 0) {
                field.options.forEach(option => {
                    if(option.optdisable) {
                        new Conditional(this.form, option, "optdisable").activateSubs()
                    } 
                })
            }
        })
        
    }
    
    buildGroup(questions:Field[], validator = null) {
        var group = this.prepareGroup(questions)
        var form = this.formBuilder.group(group, { validator });
        if(isDevMode()) console.log("verificar si aquí cambió el cero", form)
        return form
    }
    prepareGroup(questions: Field[]): AbstractGroup {
        //Recibe un arreglo de preguntas
        var controls = {}
        if(isDevMode()) console.log(questions);
        questions.map((field:Field) => {
            let control = {}
            // console.log("field", field);
            let validators = this.getValidators(field.validation || []) //Busca los validadores
            let formcontrol:AbstractControl;
            switch (field.type) {
                case "array":
                    if(isDevMode()) console.log("entra acá", field.value);
                    formcontrol = this.buildArray((field.value || []), field.arrayschema, validators)
                    break;
                case "simplearray":
                    if(isDevMode()) console.log("simple array", field.value);
                    formcontrol = this.buildSimpleArray((field.value || []), validators)
                    break;
                case "number":
                    formcontrol = this.formBuilder.control(field.value, validators)
                    if(isDevMode()) console.log("type number", formcontrol)
                    break;
                case "string":
                    formcontrol = this.formBuilder.control(field.value, validators)
                    break;
                // case "subform":
                //     formcontrol = this.formBuilder.group(field.value, validators)
                //     break;
                default:
                    formcontrol = this.formBuilder.control(field.value, validators)
                    break;
            }
            controls[field.key] = formcontrol
        })
        return controls
    }
    getValidators(validators: Option[]):ValidatorFn[] {
        let accum = []
        validators.forEach(validator =>{
            var text = ValidationText[validator.key] 
            var custom = CustomValidators[validator.key]
            accum.push(custom())
        })
        return accum
    }
    buildSimpleArray(array:any[], validators?) { // Es un arreglo de strings o de datos básicos. no son formularios sino controles
        var formArray = []
        array.forEach(dato => {
            if(isDevMode()) console.log("datos", dato)
            var formcontrol = this.formBuilder.group(dato)
            if(isDevMode()) console.log("form array", formcontrol)
            formArray.push(formcontrol)
        })
        return this.formBuilder.array(formArray, validators || CustomValidators.lengthArray())
    }
    buildArray(array: any[] = [], schema: any[] = [], validators?) { //Los arrays reciben los valores aparte de los esquemas
        if(isDevMode()) console.log("mostrar array de Form", array)
        if(isDevMode()) console.log("mostrar array de Schema", schema)
        var arrays=[]
        array.forEach(dato => {
            var prosArray = []
            schema.forEach(question => {
                var toquestion:any = {}
                if(isDevMode()) console.log("mostrar question", question)
                if(isDevMode()) console.log("mostrar dato", dato)
                Object.assign(toquestion, question)
                toquestion.value = dato[question.key]
                if(isDevMode()) console.log("toquestion", toquestion); //Pregunta con el valor del formulario
                prosArray.push(toquestion) //Hace un arreglo de las preguntas
            })
            var groupForm = this.buildGroup(prosArray) //Convierte el arreglo de preguntas en un formulario
            arrays.push(groupForm); //Hace un array de formularios
            
        })
        // var prosArray = array.map()
        if(isDevMode()) console.log("mostrar array de Form después", arrays)
        
        return this.formBuilder.array(arrays, validators || CustomValidators.lengthArray());
    }
    onValueChanged(data) {
        // console.log("hola", data)
        // console.log("value changed", this.form)
        // if (!this.form) { return; }
        // this.formErrors = errorRecursion(this.form, this.validationMessages);
        // if (this.form.errors) {
        //     const messages = this.validationMessages["form"];
        //     var text = '';
        //     this.formErrors["form"] = text;
        //     for (const key in this.form.errors) {
        //         text += messages[key] + ' ';
        //     }
        //     this.formErrors["form"] = text;
        // }
    }
    isFieldInvalid(field: string) {
        return (!this.formErrors[field]) ? "primary" : "warn";
    }
    isFormInvalidOrPristine() {
        return (this.form.invalid || this.form.pristine);
    }
}
// export abstract class Form {
//     //private formBuilder: FormBuilder
//     protected form: FormGroup
//     private formSub: Subscription
//     protected formErrors = {}
//     protected group = {}
//     abstract validationMessages: any
//     abstract validators
//     protected customValidators = CustomValidators;
//     constructor(private formBuilder: FormBuilder) {
//     }

//     buildGroup(group) {
//         var model = {}
//         for (let key in group) {
//             if (group[key] instanceof Array) {
//                 model[key] = this.buildArray(this.validators[key], group[key]);
//             }
//             else {
//                 model[key] = [group[key], this.validators[key]]
//             }

//         }
//         this.group = model;
//     }

//     abstract save(): void;

//     buildForm(group?, globalValidator?) {
//         group ? this.buildGroup(group) : null;

//         this.form = this.initForm(this.group, globalValidator);
//         if (this.formSub) this.formSub.unsubscribe();
//         this.formSub = this.form.valueChanges
//             .subscribe(data => this.onValueChanged());
//         this.onValueChanged();
//     }

//     initForm(group, validator = null) {
//         return this.formBuilder.group(group, { validator });
//     }
//     onValueChanged() {
//         if (!this.form) { return; }
//         this.formErrors = errorRecursion(this.form, this.validationMessages);
//         if (this.form.errors) {
//             const messages = this.validationMessages["form"];
//             var text = '';
//             this.formErrors["form"] = text;
//             for (const key in this.form.errors) {
//                 text += messages[key] + ' ';
//             }
//             this.formErrors["form"] = text;
//         }
//     }
//     isFieldInvalid(field: string) {
//         return (!this.formErrors[field]) ? "primary" : "warn";
//     }
//     isFormInvalidOrPristine() {
//         return (this.form.invalid || this.form.pristine);
//     }
//     canDeactivate(): Promise<boolean> | boolean {
//         if (!this.form || this.form.pristine) return true;
//         var exit = window.confirm("Descartar los cambios?");
//         //if (exit) this.detailAccountForm.reset();
//         return exit;
//     }
//     reset(init = {}) {
//         this.buildForm(init);
//     }
//     help() {

//     }
//     buildArray(validators?, array?: any[]) {
//         return this.formBuilder.array(array || [], validators || CustomValidators.lengthArray());
//     }

// }
function errorRecursion(form, validationMessages, formErrors = {}, pathV = null): Object {

    if (form.invalid && form.dirty) {

        for (const field in form.controls) {
            const pathe = pathV ? pathV + "." + field : field
            const control = form.get(field);
            if (control && control.dirty && control.invalid) {
                const messages = validationMessages[field];

                if (control.errors) {
                    _.set(formErrors, pathe, '')

                    var text = '';
                    for (const key in control.errors) {
                        text += messages[key] + ' ';
                    }
                    _.set(formErrors, pathe, text)
                }
                else if (control.controls) {
                    var fielde = pathV ? pathV + "." + field : field;
                    errorRecursion(control, validationMessages, formErrors, pathe);
                }

            }
        }
    }
    return formErrors
}

export class CustomValidators {
    public static numberIsHigherThanZero(): ValidatorFn {
        return (control: FormControl): { [key: string]: any } => {
            const cantidad = control.value;
            const no = cantidad > 0;
            return no ? null : { negative: false };
        };
    }
    public static dateIsPast(): ValidatorFn {
        return (control: FormControl): { [key: string]: any } => {
            const fecha = control.value;
            const no = moment(fecha).isBefore(new Date);
            return no ? null : { past: false };
        };
    }
    public static lengthArray(): ValidatorFn {
        return (control: FormArray): { [key: string]: any } => {
            const no = control.length > 0;
            return no ? null : { length: false };
        };
    }
    public static compareArrayWithNumber(arrayField, fieldInArray, max: number): ValidatorFn {
        return (control: FormGroup): { [key: string]: any } => {
            const array = control.value[arrayField];
            let amount = 0;
            if (array.length > 0) {
                amount = array.map(i => i[fieldInArray]).reduce((a, b) => a + b, 0);
            }
            const no = amount >= max;
            return no ? null : { maxArray: false };
        };
    }
    public static numberMaxValidator(max: number): ValidatorFn {
        return (control: FormControl): { [key: string]: any } => {
            const cantidad = control.value;
            const no = cantidad >= max;
            return no ? null : { max: false };
        };
    }
    public static required() {
        return Validators.required
    }
    public static compareDates(start, end) {
        return (control: FormGroup): { [key: string]: any } => {
            const no = moment(control.value[start]).isAfter(control.value[end]);
            return no ? null : { dateOrder: false }
        }
    }
}
