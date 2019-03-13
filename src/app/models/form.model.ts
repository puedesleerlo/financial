import { componentFactoryName } from "@angular/compiler";
import { Model } from "./model";

export interface FormModel {
    name: string
    endpoint: string
    idname: string
    company?: string
    version?: string
    model: Model
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