import { DomNode } from "@hanul/skynode";
import { SaleInfo } from "../contracts/ItemStoreSaleContract";
export default class MyItemCard extends DomNode {
    private metaverseId;
    private addr;
    private id;
    private dataSet;
    constructor(metaverseId: number, addr: string, id: number, dataSet: {
        verificationID: string;
        saleInfo: SaleInfo;
    }[]);
    private load;
}
//# sourceMappingURL=MyItemCard.d.ts.map