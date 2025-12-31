import { SchemaInitializerItemType, useSchemaInitializer } from "@nocobase/client";
import { useT } from "../../../locale";
import { BlockName, BlockNameLowercase } from "./constant";
import { schema } from "./schema";

export const initializerItems: [[string, string, SchemaInitializerItemType]] = [
    [
        "page:addBlock",
        `otherBlocks.${BlockNameLowercase}`,
        {
            type: 'item',
            name: BlockNameLowercase,
            icon: 'MessageOutlined',
            useComponentProps() {
                const t = useT()

                const { insert } = useSchemaInitializer();
                return {
                    title: t(BlockName),
                    onClick: () => {
                        insert(schema);
                    },
                };
            }
        }
    ],
]