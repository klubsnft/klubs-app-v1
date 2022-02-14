"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemType = void 0;
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Metaverses_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/Metaverses.sol/Metaverses.json"));
const Contract_1 = __importDefault(require("./Contract"));
var ItemType;
(function (ItemType) {
    ItemType[ItemType["ERC1155"] = 0] = "ERC1155";
    ItemType[ItemType["ERC721"] = 1] = "ERC721";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
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
    async managers(id, index) {
        return await this.runMethod("managers", id, index);
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
    async setExtra(id, extra) {
        await this.runWalletMethod("setExtra", id, extra);
    }
    async setRoyalty(id, receiver, royalty) {
        await this.runWalletMethod("setRoyalty", id, receiver, royalty);
    }
    async royalties(id) {
        const results = await this.runMethod("royalties", id);
        return {
            receiver: results[0],
            royalty: parseInt(results[1], 10),
        };
    }
    async addItem(id, item, itemType, extra) {
        await this.runWalletMethod("addItem", id, item, itemType, extra);
    }
    async itemAdded(id, addr) {
        return await this.runMethod("itemAdded", id, addr);
    }
    async itemTypes(id, addr) {
        return parseInt(await this.runMethod("itemTypes", id, addr), 10);
    }
    async itemAddrs(id, index) {
        return await this.runMethod("itemAddrs", id, index);
    }
    async itemExtras(id, addr) {
        return await this.runMethod("itemExtras", id, addr);
    }
    async itemEnumerables(id, addr) {
        return await this.runMethod("itemEnumerables", id, addr);
    }
    async getItemTotalSupply(id, addr) {
        return ethers_1.BigNumber.from(await this.runMethod("getItemTotalSupply", id, addr));
    }
    async getItemAddrCount(id) {
        return ethers_1.BigNumber.from(await this.runMethod("itemAddrCount", id));
    }
    async setItemEnumerable(id, item, enumerable) {
        await this.runWalletMethod("setItemEnumerable", id, item, enumerable);
    }
    async setItemTotalSupply(id, item, totalSupply) {
        await this.runWalletMethod("setItemTotalSupply", id, item, totalSupply);
    }
    async setItemExtra(id, item, extra) {
        await this.runWalletMethod("setItemExtra", id, item, extra);
    }
    async updateItemType(id, item, itemType) {
        await this.runWalletMethod("updateItemType", id, item, itemType);
    }
}
exports.default = new MetaversesContract();
//# sourceMappingURL=MetaversesContract.js.map