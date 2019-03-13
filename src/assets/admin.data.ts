export const FormSample = {
    forms: {
    name:"form",
    endpoint:"",
    displayinfo:"",
    idname: "name",
    company: "",
    version:"",
    model: {
        name: {
            key:"name",
            label:"Name",
            value:"",
            type:"string",
            controltype: "input",
            validation: {
                required: "required"
            }
        },
        company: {
            key:"company",
            label:"Company",
            value:"",
            type:"string",
            controltype: "input",
            validation: {
                required: "required"
            }
        },
        model: {
            key:"model",
            label:"Model",
            value: [],
            type:"array",
            controltype: "autocompleteArray",
            options: ["hola", "que", "mas"],
            validation: {
                required: "required"
            }
        }
    }
}}