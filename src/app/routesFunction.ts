import { Itemize } from "./models/itemize";
import { CoreComponent } from "./shell/core/core.component";
import { ResolverApi } from "./shell/core/resolverApi";
import { environment } from "../environments/environment";
import { FormShellComponent } from "./shell/form-shell/form-shell.component";
import { FormResolver } from "./shell/form-shell/form.resolver";
import { Model } from "./models/model";

export function routesCalculator(elements: RouteInfo[]) {
    var obj = []
    elements.forEach(element => {

        obj.push({
            path: `${element.endpoint}`,
            component: CoreComponent,
            resolve: {
                items: ResolverApi
            },
            data: {
                displayInfo: element.displayInfo,
                api: environment.api + element.endpoint,
                endpoint: element.endpoint,
                listType: element.listType,
                model: element.model,
                idName: element.idName
            },
            children: [
                {
                    path: ":id",
                    component: FormShellComponent,
                    resolve: {
                        values: FormResolver
                    },
                    data: {
                        model: element.model,
                        api: environment.api + element.endpoint,
                        idName: element.idName
                    }
                },
                {
                    path: "",
                    component: FormShellComponent,
                    data: {
                        model: element.model,
                        api: environment.api + element.endpoint
                    }
                }
            ]
        });
    })
return obj;
}

declare interface RouteInfo {
    endpoint: String,
    listType: String,
    displayInfo: String[],
    idName: String,
    model: Model
}