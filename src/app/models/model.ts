import { FormModel } from "./form.model";

export class Field {
    value: any
    validation: Option[]
    subform?: any
    exist?: string
    disable?:string
    active?: boolean
    key: string
    label: string
    controltype: string
    type?: string
    options?: Option[]
    arrayschema?: Field[]

    constructor(...object) {
        for(let a in object[0]) {
            this[a] = object[0][a]
        }
    }
}

export interface Model {
    [key: string]: Field
}


export interface Option {
    key?: string
    name?:string
    // existopt?: string
    optdisable?: string
    value: any
    optdisabled?:boolean
    // disabled?:boolean
}