import { DomNode } from "@hanul/skynode";
import Store from "../../Store";
import PFPPage from "../../view/pfp/page/PFPPage";
export default class PFPSortor extends DomNode {
    store: Store;
    private select;
    constructor(pageView: PFPPage, multiple?: "sell" | "buy");
    get sortType(): string;
}
//# sourceMappingURL=PFPSortor.d.ts.map