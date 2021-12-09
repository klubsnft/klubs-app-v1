import { DomNode } from "@hanul/skynode";
import RarityInfo from "../RarityInfo";
export default class ArtNFTCard extends DomNode {
    private id;
    private selecting?;
    private _mode;
    private rarityDisplay;
    constructor(id: number, selecting?: boolean | undefined, showingOffer?: boolean);
    set mode(mode: "view" | "select");
    get mode(): "view" | "select";
    private update;
    private load;
    private loadOffers;
    showRarity(rarity: RarityInfo): void;
    hideRarity(): void;
}
//# sourceMappingURL=ArtNFTCard.d.ts.map