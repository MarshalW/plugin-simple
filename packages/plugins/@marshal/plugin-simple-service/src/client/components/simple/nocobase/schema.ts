import { ISchema } from "@nocobase/client";
import { settings } from "./settings";
import { BlockName } from "./constant";

export const schema: ISchema = {
    type: 'void',
    'x-decorator': 'BlockItem',
    'x-settings': settings.name,
    "x-component": BlockName,
    "x-component-props": {
        "heightMode": "fullHeight",
        "height": null,
    },
}
