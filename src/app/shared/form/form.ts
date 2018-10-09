import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Model } from '../../models/model';

interface Group {
    [key: string]: [any, any[]]
}
export abstract class Form {
    public form: FormGroup
    private formSub: Subscription
    protected formErrors = {}
    constructor(private formBuilder: FormBuilder) {
        
     }
    buildForm(model: Model, globalValidator?) {
        var group = this.prepareGroup(model)
        this.form = this.buildGroup(group, globalValidator);
        if (this.formSub) this.formSub.unsubscribe();
        this.formSub = this.form.valueChanges
            .subscribe(data => this.onValueChanged());
        this.onValueChanged();
    }
    buildGroup(group, validator = null) {
        return this.formBuilder.group(group, { validator });
    }
    prepareGroup(initModel: Model) {
        
        var model = {}
        
        for (let key in initModel) {
            var it = initModel[key]
            if (it.value instanceof Array) {
                model[key] = this.buildArray(it.value, it.validation);
            }
            else {
                var validators = this.getValidators(it.validation)
                model[key] = [it.value, validators]
            }
        }
        
        return model
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
    buildArray(array?: any[], validators?) {
        var groupForm = array.map(val => {
            var prepare = this.prepareGroup(val)
            return this.buildGroup(prepare)
        })
        return this.formBuilder.array(groupForm || [], validators || CustomValidators.lengthArray());
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