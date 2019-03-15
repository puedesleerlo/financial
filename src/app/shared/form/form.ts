import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Model, Field } from '../../models/model';

interface Group {
    [key: string]: [any, any[]]
}
interface AbstractGroup {
    [key:string]: AbstractControl
}
export abstract class Form {
    public form: FormGroup
    private formSub: Subscription
    protected formErrors = {}
    constructor(private formBuilder: FormBuilder) {
        
     }
    buildForm(questions: Field[], globalValidator?) {
        this.form = this.buildGroup(questions, globalValidator);
        if (this.formSub) this.formSub.unsubscribe();
        this.formSub = this.form.valueChanges
            .subscribe(data => this.onValueChanged());
        this.onValueChanged();
    }
    
    buildGroup(questions, validator = null) {
        var group = this.prepareGroup(questions)
        var form = this.formBuilder.group(group, { validator });
        return form
    }
    prepareGroup(questions: Field[]): AbstractGroup {
        //Recibe un arreglo de preguntas
        var controls = {}
        console.log(questions);
        questions.map((field:Field) => {
            let control = {}
            // console.log("field", field);
            let validators = this.getValidators(field.validation) //Busca los validadores
            let formcontrol;
            if(field.type == "array") {
                console.log("entra acá", field.value);
                formcontrol = this.buildArray(field.value, field.arrayschema, validators) //Construye el formulario de arreglos
            }
            else {
                formcontrol = this.formBuilder.control(field.value, validators)
            }
            controls[field.key] = formcontrol
        })
        return controls
    }
    getValidators(validation) {
        let accum = []
        for(let key in validation) {
            var validator = validation[key]
            var custom = CustomValidators[key] 
            accum.push(custom())
        }
        
        return accum
    }
    buildArray(array: any[], schema: any[], validators?) { //Los arrays reciben los valores aparte de los esquemas
        console.log("mostrar array de Form", array)
        console.log("mostrar array de Schema", schema)
        var prosArray = array.map(dato => {
            var toquestion = schema.map(question => {
                console.log("mostrar question", question)
                console.log("mostrar dato", dato)
                question.value = dato[question.key]
                return question
            })
            console.log("toquestion", toquestion);
            var groupForm = this.buildGroup(toquestion)
            return groupForm  
        })
        console.log("mostrar array de Form después", prosArray)
        
        return this.formBuilder.array(prosArray, validators || CustomValidators.lengthArray());
    }
    onValueChanged() {
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