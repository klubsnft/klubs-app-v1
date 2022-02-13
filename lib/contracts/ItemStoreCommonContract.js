"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const ItemStoreCommon_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/ItemStoreCommon.sol/ItemStoreCommon.json"));
const Contract_1 = __importDefault(require("./Contract"));
class ItemStoreCommonContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.ItemStoreCommon, ItemStoreCommon_json_1.default.abi);
    }
}
exports.default = new ItemStoreCommonContract();
//# sourceMappingURL=ItemStoreCommonContract.js.map