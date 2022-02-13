import { View, ViewParams } from "skyrouter";
export default class Metaverse implements View {
    private container;
    private currentId;
    private header;
    private iconDisplay;
    private nameDisplay;
    private descriptionDisplay;
    private socialList;
    private itemLoading;
    private itemList;
    constructor(params: ViewParams);
    private load;
    private loadInfo;
    private loadUpdateButton;
    private loadItems;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Metaverse.d.ts.map