import { DomNode } from "@hanul/skynode";
import RarityInfo from "../../RarityInfo";
import PFPPage from "../../view/pfp/page/PFPPage";
export default class PFPFilter extends DomNode {
    private pageView;
    private idInput;
    private filtered;
    constructor(pageView: PFPPage);
    createFilters(rarity: RarityInfo): void;
    get filteredIds(): number[] | undefined;
}
//# sourceMappingURL=ArtsFilter.d.ts.map