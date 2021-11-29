import { DomNode } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import KIP17Contract from "../../../contracts/standard/KIP17Contract";
import RarityInfo from "../../../RarityInfo";
export default class PageLayout implements View {
    static current: PageLayout;
    private static rarities;
    static loadRarity(addr: string): Promise<RarityInfo>;
    private currentAddr;
    contract: KIP17Contract;
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