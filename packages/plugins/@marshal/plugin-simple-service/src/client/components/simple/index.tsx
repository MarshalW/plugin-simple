import { Application } from "@nocobase/client";
import React from "react";
import { settings } from "./nocobase/settings";
import { initializerItems } from "./nocobase/initializer";

export const initSimpleBlock = function (app: Application) {
    app.addComponents({ SimpleBlock });
    app.schemaSettingsManager.add(settings);
    initializerItems.forEach(itemParams => {
        app.schemaInitializerManager.addItem(...itemParams);
    })
}

const SimpleBlock = () => {
    return (
        <div>Simple block ✅✅✅✅❗️❗️😄😄🌺🌺</div>
    )
}
