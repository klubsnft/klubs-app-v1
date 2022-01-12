import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import PFPPage from "../../view/pfp/page/PFPPage";
import Alert from "../dialogue/Alert";

export default class PFPPagination extends DomNode {

    private firstButton: DomNode;
    private prevButton: DomNode;
    private pageDisplay: DomNode;
    private nextButton: DomNode;
    private lastButton: DomNode;

    private lastPage: number = 1;
    private page: number = 1;

    constructor(pageView: PFPPage, page: number) {
        super(".pfp-pagination");
        this.append(
            this.firstButton = el("a.first-button", el("i.fas.fa-backward"), {
                click: () => {
                    if (this.page > 1) {
                        this.page = 1;
                        pageView.goPage(this.page);
                    } else {
                        new Alert(msg("ANNOUNCEMENT_TITLE"), msg("FIRST_PAGE_DESCRIPTION"));
                    }
                },
            }),
            this.prevButton = el("a.prev-button", el("i.fas.fa-arrow-left"), {
                click: () => {
                    if (this.page > 1) {
                        this.page -= 1;
                        pageView.goPage(this.page);
                    } else {
                        new Alert(msg("ANNOUNCEMENT_TITLE"), msg("FIRST_PAGE_DESCRIPTION"));
                    }
                },
            }),
            this.pageDisplay = el("a.page-display"),
            this.nextButton = el("a.next-button", el("i.fas.fa-arrow-right"), {
                click: () => {
                    if (this.page < this.lastPage) {
                        this.page += 1;
                        pageView.goPage(this.page);
                    } else {
                        new Alert(msg("ANNOUNCEMENT_TITLE"), msg("LAST_PAGE_DESCRIPTION"));
                    }
                },
            }),
            this.lastButton = el("a.last-button", el("i.fas.fa-forward"), {
                click: () => {
                    if (this.page < this.lastPage) {
                        this.page = this.lastPage;
                        pageView.goPage(this.page);
                    } else {
                        new Alert(msg("ANNOUNCEMENT_TITLE"), msg("LAST_PAGE_DESCRIPTION"));
                    }
                },
            }),
        );
        this.page = page;
    }

    public update(page: number, lastPage: number) {

        this.page = page;
        this.lastPage = lastPage;

        this.pageDisplay.empty().appendText(`${page} / ${lastPage}`);
        if (this.page === 1) {
            this.firstButton.addClass("disable");
            this.prevButton.addClass("disable");
        } else {
            this.firstButton.deleteClass("disable");
            this.prevButton.deleteClass("disable");
        }
        if (this.page === this.lastPage) {
            this.nextButton.addClass("disable");
            this.lastButton.addClass("disable");
        } else {
            this.nextButton.deleteClass("disable");
            this.lastButton.deleteClass("disable");
        }
    }
}
