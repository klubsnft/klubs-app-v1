import { DomNode } from "@hanul/skynode";
import RarityInfo from "../RarityInfo";
export default class PFPNFTCard extends DomNode {
    private addr;
    private id;
    private selecting?;
    private _mode;
    private rarityDisplay;
    constructor(addr: string, id: number, selecting?: boolean | undefined, showingOffer?: boolean);
    set mode(mode: "view" | "select");
    get mode(): "view" | "select";
    private update;
    private load;
    private loadOffers;
    showRarity(rarity: RarityInfo): void;
    hideRarity(): void;
}
//# sourceMappingURL=PFPNFTCard.d.ts.map