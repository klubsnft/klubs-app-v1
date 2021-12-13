"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Alert_1 = __importDefault(require("../dialogue/Alert"));
class PFPPagination extends skynode_1.DomNode {
    constructor(pageView, page) {
        super(".pfp-pagination");
        this.lastPage = 1;
        this.page = 1;
        this.append(this.firstButton = (0, skynode_1.el)("a.first-button", (0, skynode_1.el)("i.fas.fa-backward"), {
            click: () => {
                if (this.page > 1) {
                    this.page = 1;
                    pageView.goPage(this.page);
                }
                else {
                    new Alert_1.default("안내", "첫 페이지입니다.");
                }
            },
        }), this.prevButton = (0, skynode_1.el)("a.prev-button", (0, skynode_1.el)("i.fas.fa-arrow-left"), {
            click: () => {
                if (this.page > 1) {
                    this.page -= 1;
                    pageView.goPage(this.page);
                }
                else {
                    new Alert_1.default("안내", "첫 페이지입니다.");
                }
            },
        }), this.pageDisplay = (0, skynode_1.el)("a.page-display"), this.nextButton = (0, skynode_1.el)("a.next-button", (0, skynode_1.el)("i.fas.fa-arrow-right"), {
            click: () => {
                if (this.page < this.lastPage) {
                    this.page += 1;
                    pageView.goPage(this.page);
                }
                else {
                    new Alert_1.default("안내", "마지막 페이지입니다.");
                }
            },
        }), this.lastButton = (0, skynode_1.el)("a.last-button", (0, skynode_1.el)("i.fas.fa-forward"), {
            click: () => {
                if (this.page < this.lastPage) {
                    this.page = this.lastPage;
                    pageView.goPage(this.page);
                }
                else {
                    new Alert_1.default("안내", "마지막 페이지입니다.");
                }
            },
        }));
        this.page = page;
    }
    update(page, lastPage) {
        this.page = page;
        this.lastPage = lastPage;
        this.pageDisplay.empty().appendText(`${page} / ${lastPage}`);
        if (this.page === 1) {
            this.firstButton.addClass("disable");
            this.prevButton.addClass("disable");
        }
        else {
            this.firstButton.deleteClass("disable");
            this.prevButton.deleteClass("disable");
        }
        if (this.page === this.lastPage) {
            this.nextButton.addClass("disable");
            this.lastButton.addClass("disable");
        }
        else {
            this.nextButton.deleteClass("disable");
            this.lastButton.deleteClass("disable");
        }
    }
}
exports.default = PFPPagination;
//# sourceMappingURL=PFPPagination.js.map