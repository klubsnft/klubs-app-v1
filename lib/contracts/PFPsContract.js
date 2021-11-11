"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const PFPs_json_1 = __importDefault(require("./abi/artifacts/contracts/PFPs.sol/PFPs.json"));
const Contract_1 = __importDefault(require("./Contract"));
class PFPsContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.PFPs, PFPs_json_1.default.abi);
    }
    async added(addr) {
        return await this.runMethod("added", addr);
    }
    async propose(addr) {
        await this.runWalletMethod("propose", addr);
    }
    async addByPFPOwner(addr) {
        await this.runWalletMethod("addByPFPOwner", addr);
    }
    async addByMinter(addr) {
        await this.runWalletMethod("addByMinter", addr);
    }
}
exports.default = new PFPsContract();
//# sourceMappingURL=PFPsContract.js.map