"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const Config_1 = __importDefault(require("../../Config"));
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const PFPStoreContract_1 = __importDefault(require("../../contracts/PFPStoreContract"));
const Klaytn_1 = __importDefault(require("../../klaytn/Klaytn"));
const Loader_1 = __importDefault(require("../../Loader"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Alert_1 = __importDefault(require("../dialogue/Alert"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const NFTDisplay_1 = __importDefault(require("../NFTDisplay"));
class CreateAuctionPopup extends skynode_1.Popup {
    constructor(addr, id) {
        super(".popup-background");
        this.addr = addr;
        this.id = id;
        this.append(this.content = (0, skynode_1.el)(".popup.pfp-create-auction-popup", (0, skynode_1.el)("h2", (0, msg_js_1.default)("START_AUCTION_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("CREATE_AUCTION_POPUP_DESCRIPTION")), this.loading = new Loading_1.default(), this.info = (0, skynode_1.el)(".info"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", (0, msg_js_1.default)("START_AUCTION_BUTTON"), {
            click: async () => {
                if (this.startPriceInput !== undefined && this.endBlockInput !== undefined) {
                    const startPrice = ethers_1.utils.parseEther(this.startPriceInput.domElement.value);
                    const endBlock = this.endBlockInput.domElement.value;
                    const currentBlock = await Klaytn_1.default.loadBlockNumber();
                    if (parseInt(endBlock) < currentBlock) {
                        new Alert_1.default("오류", "경매 종료 블록은 현재 블록보다 커야합니다.");
                    }
                    else {
                        await PFPStoreContract_1.default.createAuction(addr, id, startPrice, endBlock);
                        this.delete();
                        ViewUtil_1.default.waitTransactionAndRefresh();
                    }
                }
            },
        }), (0, skynode_1.el)("button", (0, msg_js_1.default)("CANCEL_BUTTON"), {
            click: () => this.delete(),
        }))));
        this.load();
    }
    async load() {
        const data = await Loader_1.default.loadMetadata(this.addr, this.id);
        const royalty = await PFPsContract_1.default.royalties(this.addr);
        const currentBlock = await Klaytn_1.default.loadBlockNumber();
        const img = data.image;
        this.info.append((0, skynode_1.el)(".name", data.name), img === undefined ? undefined : new NFTDisplay_1.default(img), (0, skynode_1.el)("label", (0, skynode_1.el)("span", (0, msg_js_1.default)("CREATE_AUCTION_START_PRICE_DESCRIPTION").replace(/{royalty}/, String(royalty.royalty / 100).replace(/{fee}/, String(Config_1.default.fee)))), this.startPriceInput = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("AUCTION_START_PRICE_INPUT") })), (0, skynode_1.el)("label", (0, skynode_1.el)("span", (0, msg_js_1.default)("CREATE_AUCTION_POPUP_DESCRIPTION").replace(/{currentBlock}/, currentBlock)), (0, skynode_1.el)("p.warning", (0, skynode_1.el)("i.fas.fa-exclamation-triangle"), (0, msg_js_1.default)("CREATE_AUCTION_POPUP_WARNING")), this.endBlockInput = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("END_AUCTION_BLOCK_INPUT") })));
        this.loading.delete();
    }
}
exports.default = CreateAuctionPopup;
//# sourceMappingURL=CreateAuctionPopup.js.map