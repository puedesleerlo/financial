import { componentFactoryName } from "@angular/compiler";
import { Model, Field } from "./model";

export interface FormModel {
    name: string
    label: string
    idname?: string
    company?: string
    version?: string
    questions: Field[]
}

export interface FormGroup {
    name: string
    label: string
    forms: FormModel[]
    company: string
}

export interface ReceivedFormGroup {
    informacion: FormGroup,
    forms:FormGroup
}

// export interface Model {
//     [key: string]: Field
//   }
// export interface Field {
//     value: string,
//     controlType: string, 
//     type: string,
//     key: string,
//     label: string
//     validation?: any
//   }