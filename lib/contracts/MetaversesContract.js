"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Metaverses_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/Metaverses.sol/Metaverses.json"));
const Contract_1 = __importDefault(require("./Contract"));
var ItemType;
(function (ItemType) {
    ItemType[ItemType["ERC1155"] = 0] = "ERC1155";
    ItemType[ItemType["ERC721"] = 1] = "ERC721";
})(ItemType || (ItemType = {}));
class MetaversesContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Metaverses, Metaverses_json_1.default.abi);
    }
    async addMetaverse(extra) {
        await this.runWalletMethod("addMetaverse", extra);
    }
    async getMetaverseCount() {
        return ethers_1.BigNumber.from(await this.runMethod("metaverseCount"));
    }
    async banned(id) {
        return await this.runMethod("banned", id);
    }
    async extras(id) {
        return await this.runMethod("extras", id);
    }
    async existsManager(id, manager) {
        return await this.runMethod("existsManager", id, manager);
    }
    async addManager(id, manager) {
        await this.runWalletMethod("addManager", id, manager);
    }
    async removeManager(id, manager) {
        await this.runWalletMethod("removeManager", id, manager);
    }
    async getManagerCount(id) {
        return ethers_1.BigNumber.from(await this.runMethod("managerCount", id));
    }
    async addItem(id, item, itemType, extra) {
        await this.runWalletMethod("addItem", id, item, itemType, extra);
    }
    async itemAdded(id, addr) {
        return await this.runMethod("itemAdded", id, addr);
    }
    async itemAddrs(id, index) {
        return await this.runMethod("itemAddrs", id, index);
    }
    async itemExtras(id, addr) {
        return await this.runMethod("itemExtras", id, addr);
    }
    async getItemAddrCount(id) {
        return ethers_1.BigNumber.from(await this.runMethod("itemAddrCount", id));
    }
}
exports.default = new MetaversesContract();
//# sourceMappingURL=MetaversesContract.js.map