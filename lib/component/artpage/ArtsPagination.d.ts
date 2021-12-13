import { DomNode } from "@hanul/skynode";
import PFPPage from "../../view/pfp/page/PFPPage";
export default class ArtsPagination extends DomNode {
    private firstButton;
    private prevButton;
    private pageDisplay;
    private nextButton;
    private lastButton;
    private lastPage;
    private page;
    constructor(pageView: PFPPage, page: number);
    update(page: number, lastPage: number): void;
}
//# sourceMappingURL=ArtsPagination.d.ts.map