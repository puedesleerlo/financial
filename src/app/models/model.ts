import { FormModel } from "./form.model";

export class Field {
    value: any
    validation: {
        [key: string]: string
    }
    key: string
    label: string
    controltype: string
    type?: string
    options?: keyValue[]
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


interface keyValue {
    key: any
    value: any
}