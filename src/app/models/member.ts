import { Itemize } from "./itemize";
import { Field } from "./model";

export class Member extends Itemize{
    // name: String = ""
    _id: String = ""
    firstName: String = ""
    lastName: String = ""
    about: String = ""

    constructor(...object) {
        super()
        for(let a in object[0]) {
            this[a] = object[0][a]
        }
    }

    getKeys() {
        return Object.keys(new Member())
    }

    static displayInfo(): string[] {
        return ["firstName", "lastName", "about"]
    }
    get __id(): Field {
        return {
            value: this._id,
            validation: {
                required: "hola _id"
            },
            controlType: "hidden",
            type: "hidden",
            key: "_id",
            label: "_id"
        }  
    }
    get _firstName(): Field {
        return {
            value: this.firstName,
            validation: {
                required: "hola firstName"
            },
            controlType: "input",
            type: "string",
            key: "firstName",
            label: "firstName"
        }
    }
    get _lastName(): Field {
        return {
            value: this.lastName,
            validation: {
                required: "hola lastName"
            },
            controlType: "input",
            type: "string",
            key: "lastName",
            label: "lastName"
        }
    }
    get _about(): Field {
        return {
            value: this.about,
            validation: {
                required: "hola about"
            },
            controlType: "input",
            type: "string",
            key: "about",
            label: "about"
        }
    }
}