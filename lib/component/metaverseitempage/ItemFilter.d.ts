import { DomNode } from "@hanul/skynode";
import RarityInfo from "../../RarityInfo";
import ItemPage from "../../view/metaverse/item-page/ItemPage";
export default class ItemFilter extends DomNode {
    private pageView;
    private idInput;
    private filterData;
    private filtered;
    private store;
    constructor(pageView: ItemPage);
    createFilters(rarity: RarityInfo): void;
    get filteredIds(): number[] | undefined;
}
//# sourceMappingURL=ItemFilter.d.ts.map