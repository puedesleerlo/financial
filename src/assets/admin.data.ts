export const FormSample = {
    forms: {
    name:"form",
    endpoint:"",
    displayinfo:"",
    idname: "name",
    company: "",
    version:"",
    questions: [
        {
            key:"name",
            label:"Name",
            value:"",
            type:"string",
            controltype: "input",
            validation: {
                required: "required"
            }
        },
        {
            key:"company",
            label:"Company",
            value:"",
            type:"string",
            controltype: "input",
            validation: {
                required: "required"
            }
        },
        {
            key:"questions",
            label:"Questions",
            value: [],
            type:"array",
            controltype: "autocompleteArray",
            options: ["hola", "que", "mas"],
            validation: {
                required: "required"
            }
        }
    ]

}}