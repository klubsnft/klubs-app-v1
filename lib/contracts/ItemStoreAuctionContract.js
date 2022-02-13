"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const ItemStoreAuction_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/ItemStoreAuction.sol/ItemStoreAuction.json"));
const Contract_1 = __importDefault(require("./Contract"));
class ItemStoreAuctionContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.ItemStoreAuction, ItemStoreAuction_json_1.default.abi);
    }
}
exports.default = new ItemStoreAuctionContract();
//# sourceMappingURL=ItemStoreAuctionContract.js.map