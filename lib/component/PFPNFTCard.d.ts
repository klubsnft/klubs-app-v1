import { DomNode } from "@hanul/skynode";
export default class PFPNFTCard extends DomNode {
    private addr;
    private id;
    private selecting?;
    private _mode;
    constructor(addr: string, id: number, selecting?: boolean | undefined, showingOffer?: boolean);
    set mode(mode: "view" | "select");
    get mode(): "view" | "select";
    private update;
    private load;
    private loadOffers;
}
//# sourceMappingURL=PFPNFTCard.d.ts.map