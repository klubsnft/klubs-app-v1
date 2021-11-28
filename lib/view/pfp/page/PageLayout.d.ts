import { DomNode } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import KIP17Contract from "../../../contracts/standard/KIP17Contract";
export default class PageLayout implements View {
    contract: KIP17Contract;
    static current: PageLayout;
    private container;
    content: DomNode;
    private header;
    private iconDisplay;
    private nameDisplay;
    private descriptionDisplay;
    private miningInfoDisplay;
    private socialList;
    constructor(params: ViewParams);
    private load;
    private loadInfo;
    private loadUpdateButton;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=PageLayout.d.ts.map