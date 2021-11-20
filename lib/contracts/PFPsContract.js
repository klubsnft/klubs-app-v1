"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const PFPs_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/PFPs.sol/PFPs.json"));
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
    async banned(addr) {
        return await this.runMethod("banned", addr);
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
    async enumerables(addr) {
        return await this.runMethod("enumerables", addr);
    }
    async getManagerCount(addr) {
        return ethers_1.BigNumber.from(await this.runMethod("managerCount", addr));
    }
    async getTotalSupply(addr) {
        return ethers_1.BigNumber.from(await this.runMethod("getTotalSupply", addr));
    }
    async proposalCount() {
        return ethers_1.BigNumber.from(await this.runMethod("proposalCount"));
    }
    async proposals(index) {
        const results = await this.runMethod("proposals", index);
        return {
            addr: results[0],
            manager: results[1],
        };
    }
    async royalties(addr) {
        const results = await this.runMethod("royalties", addr);
        return {
            receiver: results[0],
            royalty: parseInt(results[1], 10),
        };
    }
    async managers(addr, index) {
        return await this.runMethod("managers", addr, index);
    }
    async setEnumerable(addr, enumerable) {
        await this.runWalletMethod("setEnumerable", addr, enumerable);
    }
    async setTotalSupply(addr, totalSupply) {
        await this.runWalletMethod("setTotalSupply", addr, totalSupply);
    }
    async passProposal(proposalId) {
        await this.runWalletMethod("passProposal", proposalId);
    }
    async setRoyalty(addr, receiver, royalty) {
        await this.runWalletMethod("setRoyalty", addr, receiver, royalty);
    }
    async getManagerPFPCount(addr) {
        return ethers_1.BigNumber.from(await this.runMethod("managerPFPCount", addr));
    }
    async managerPFPs(addr, index) {
        return await this.runMethod("managerPFPs", addr, index);
    }
}
exports.default = new PFPsContract();
//# sourceMappingURL=PFPsContract.js.map