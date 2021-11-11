"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TESTNET = false;
exports.default = {
    chainId: TESTNET ? 1001 : 8217,
    contracts: TESTNET ? {
        PFPs: "",
    } : {
        PFPs: "0xe2f53F258D05416F34bE28b7623194e3b6Ed6A4D",
    },
};
//# sourceMappingURL=Config.js.map