"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
const NFTDisplay_1 = __importDefault(require("./NFTDisplay"));
class ArtNFTCard extends skynode_1.DomNode {
    constructor(id, selecting, showingOffer) {
        super(".art-nft-card");
        this.id = id;
        this.selecting = selecting;
        this._mode = "view";
        this.onDom("click", () => {
            if (this.mode === "view") {
                ViewUtil_1.default.go(`/arts/${id}/update`);
            }
            else if (this.selecting !== true) {
                this.selecting = true;
                this.update();
                this.fireEvent("select", id);
            }
            else {
                this.selecting = false;
                this.update();
                this.fireEvent("deselect", id);
            }
        });
        this.load();
        if (showingOffer === true) {
            this.addClass("offers");
            this.loadOffers();
        }
        this.update();
    }
    set mode(mode) {
        this._mode = mode;
        this.selecting = false;
        this.update();
    }
    get mode() {
        return this._mode;
    }
    update() {
        if (this.mode === "select" && this.selecting === true) {
            this.addClass("selecting");
        }
        else {
            this.deleteClass("selecting");
        }
    }
    async load() {
        try {
            const result = await superagent_1.default.get(`https://api.klu.bs/arts/${this.id}/metadata`);
            const data = result.body;
            if (this.deleted !== true) {
                this.append(data.image === undefined ? undefined : new NFTDisplay_1.default(data.image, true), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name === undefined ? "제목 없음" : data.name)));
            }
        }
        catch (e) {
            console.error(e);
            if (this.deleted !== true) {
                this.delete();
            }
        }
    }
    async loadOffers() {
    }
    showRarity(rarity) {
        this.addClass("showing-rarity");
        this.rarityDisplay?.delete();
        this.rarityDisplay = (0, skynode_1.el)(".rarity", CommonUtil_1.default.numberWithCommas(String(rarity.scores[this.id]))).appendTo(this);
    }
    hideRarity() {
        this.deleteClass("showing-rarity");
        this.rarityDisplay?.delete();
        this.rarityDisplay = undefined;
    }
}
exports.default = ArtNFTCard;
//# sourceMappingURL=ArtNFTCard.js.map