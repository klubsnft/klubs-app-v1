import { DomNode } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import KIP17Contract from "../../../contracts/standard/KIP17Contract";
import KIP37Contract from "../../../contracts/standard/KIP37Contract";
import RarityInfo from "../../../RarityInfo";
export default class ItemPageLayout implements View {
    static current: ItemPageLayout;
    private static rarities;
    static loadRarity(addr: string): Promise<RarityInfo | undefined>;
    private currentMetaverseId;
    private currentAddr;
    contract: KIP17Contract | KIP37Contract;
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
//# sourceMappingURL=ItemPageLayout.d.ts.map