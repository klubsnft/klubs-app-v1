"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const ItemStoreSale_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/ItemStoreSale.sol/ItemStoreSale.json"));
const Contract_1 = __importDefault(require("./Contract"));
class ItemStoreSaleContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.ItemStoreSale, ItemStoreSale_json_1.default.abi);
    }
}
exports.default = new ItemStoreSaleContract();
//# sourceMappingURL=ItemStoreSaleContract.js.map