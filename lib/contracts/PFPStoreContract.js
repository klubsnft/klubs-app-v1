"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const PFPStore_json_1 = __importDefault(require("./abi/artifacts/contracts/PFPStore.sol/PFPStore.json"));
const Contract_1 = __importDefault(require("./Contract"));
class PFPStoreContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.PFPStore, PFPStore_json_1.default.abi);
    }
}
exports.default = new PFPStoreContract();
//# sourceMappingURL=PFPStoreContract.js.map