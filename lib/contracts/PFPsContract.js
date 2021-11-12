"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
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
    async getAddrCount() {
        return ethers_1.BigNumber.from(await this.runMethod("addrCount"));
    }
    async addrs(index) {
        return await this.runMethod("addrs", index);
    }
    async extras(addr) {
        return await this.runMethod("extras", addr);
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
    async setExtra(addr, manager) {
        await this.runWalletMethod("setExtra", addr, manager);
    }
    async existsManager(addr, manager) {
        return await this.runMethod("existsManager", addr, manager);
    }
    async addManager(addr, manager) {
        await this.runWalletMethod("addManager", addr, manager);
    }
    async removeManager(addr, manager) {
        await this.runWalletMethod("removeManager", addr, manager);
    }
    async getManagerCount(addr) {
        return ethers_1.BigNumber.from(await this.runMethod("managerCount", addr));
    }
    async managers(addr, index) {
        return await this.runMethod("managers", addr, index);
    }
}
exports.default = new PFPsContract();
//# sourceMappingURL=PFPsContract.js.map