"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
class Klaytn {
    constructor() {
        this.caver = window.caver !== undefined ? undefined :
            new window.Caver("https://api.dogesound.club:9013/");
    }
    createContract(address, abi) {
        return this.caver === undefined ?
            new window.caver.klay.Contract(abi, address) :
            this.caver.contract.create(abi, address);
    }
    async balanceOf(address) {
        return this.caver === undefined ?
            bignumber_1.BigNumber.from(await window.caver.klay.getBalance(address)) :
            bignumber_1.BigNumber.from(await this.caver.klay.getBalance(address));
    }
}
exports.default = new Klaytn();
//# sourceMappingURL=Klaytn.js.map