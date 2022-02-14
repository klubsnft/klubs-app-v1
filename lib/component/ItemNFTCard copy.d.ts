import { DomNode } from "@hanul/skynode";
import RarityInfo from "../RarityInfo";
export default class ItemNFTCard extends DomNode {
    private metaverseId;
    private addr;
    private id;
    private selecting?;
    private _mode;
    private rarityDisplay;
    constructor(metaverseId: number, addr: string, id: number, selecting?: boolean | undefined, showingOffer?: boolean);
    set mode(mode: "view" | "select");
    get mode(): "view" | "select";
    private update;
    private load;
    private loadOffers;
    showRarity(rarity: RarityInfo): void;
    hideRarity(): void;
}
//# sourceMappingURL=ItemNFTCard%20copy.d.ts.map