export const FormSample = {
    forms: {
        name: "group",
        endpoint: "",
        company: "",
        forms: [
            {
            name:"information",
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
                }
            ]
        
        },
        {
            name: "questions",
            endpoint:"",
            displayinfo:"",
            idname: "name",
            company: "",
            version:"",
            questions: [
                {
                    key:"questions",
                    label:"Questions",
                    value: [], //dos preguntas por ejemplo
                    type:"array",
                    arrayschema: [
                        {
                            key:"key",
                            label:"Key",
                            value:"",
                            type:"string",
                            controltype: "input",
                            validation: {
                                required: "required"
                            }
                        },
                        {
                            key:"label",
                            label:"Label",
                            value:"",
                            type:"string",
                            controltype: "input",
                            validation: {
                                required: "required"
                            }
                        },
                        // {
                        //     key:"validation",
                        //     label:"Validators",
                        //     value:[],
                        //     type:"array",
                        //     controltype: "autocompleteArray",
                        //     validation: {
                        //         required: "required"
                        //     },
                        //     arrayschema: [
                        //         {
                        //             key: "validator",
                        //             label: ""
                        //         }
                        //     ]
                        // }
                    ],
                    controltype: "autocompleteArray",
                    options: ["hola", "que", "mas"],
                    validation: {
                        required: "required"
                    }
                }
            ]
        }
    ]
    }
    }