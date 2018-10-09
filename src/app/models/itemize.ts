import { Model } from "./model";

export abstract class Itemize {
    static displayInfo(): string[] {
        return []
    }
    static listType: string = ""
    abstract getKeys(): string[]
    getModel(): Model {
        
        var keys = this.getKeys()
        var modelForm: Model = {}
        keys.forEach((val) => {
            modelForm[val] = this['_' + val]
        })
        return modelForm
    }
}