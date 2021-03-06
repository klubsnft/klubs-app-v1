"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const ItemStoreSaleContract_1 = __importDefault(require("../contracts/ItemStoreSaleContract"));
const Loader_1 = __importDefault(require("../Loader"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
const NFTDisplay_1 = __importDefault(require("./NFTDisplay"));
class ItemNFTCard extends skynode_1.DomNode {
    constructor(metaverseId, addr, id, selecting, showingOffer) {
        super(".metaverse-item-nft-card");
        this.metaverseId = metaverseId;
        this.addr = addr;
        this.id = id;
        this.selecting = selecting;
        this._mode = "view";
        this.onDom("click", () => {
            if (this.mode === "view") {
                ViewUtil_1.default.go(`/metaverse/${metaverseId}/item/${addr}/${id}`);
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
            const data = await Loader_1.default.loadMetaverseItemMetadata(this.addr, this.id);
            const saleInfo = await ItemStoreSaleContract_1.default.sales(this.addr, this.id);
            if (this.deleted !== true) {
                this.append(data.image === undefined ? undefined : new NFTDisplay_1.default(data.image, true), (0, skynode_1.el)(".info", (0, skynode_1.el)(".name", data.name), saleInfo.price.eq(0) === true ? undefined : (0, skynode_1.el)(".price", (0, skynode_1.el)("img", { src: "/images/mix.png", height: "24" }), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(saleInfo.price))))));
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
        this.rarityDisplay = (0, skynode_1.el)(".rarity", rarity.scores[this.id] === undefined ?
            (0, msg_js_1.default)("CALCULATED_YET_DESCRIPTION") :
            CommonUtil_1.default.numberWithCommas(String(rarity.scores[this.id])), rarity.scores[this.id] === undefined ? undefined :
            (0, skynode_1.el)("span.rank", `Rank #${rarity.rankings[this.id] + 1}`)).appendTo(this);
    }
    hideRarity() {
        this.deleteClass("showing-rarity");
        this.rarityDisplay?.delete();
        this.rarityDisplay = undefined;
    }
}
exports.default = ItemNFTCard;
//# sourceMappingURL=ItemNFTCard%20copy.js.map