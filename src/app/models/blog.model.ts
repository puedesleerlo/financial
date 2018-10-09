import { Itemize } from "./itemize";
import { Field } from "./model";

export class Article extends Itemize{
    title: string = ""
    content: string = ""
    constructor(...object) {
        super()
        for(let a in object[0]) {
            this[a] = object[0][a]
        }
    }

    getKeys() {
        return Object.keys(new Article())
    }

    static displayInfo(): string[] {
        return ["title", "content"]
    }

    get _title(): Field {
        return {
            value: this.title,
            validation: {
                required: "hola title"
            },
            controlType: "input",
            type: "string",
            key: "title",
            label: "title"
        }
    }

    get _content(): Field {
        return {
            value: this.content,
            validation: {
                required: "hola content"
            },
            controlType: "textarea",
            type: "string",
            key: "content",
            label: "content"
        }
    }
}