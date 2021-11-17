"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TESTNET = false;
exports.default = {
    chainId: TESTNET ? 1001 : 8217,
    contracts: TESTNET ? {
        PFPs: "",
        PFPStore: "",
    } : {
        PFPs: "0xFaBf9031e21Ae41eF82Ee812C1F1DD4BE952BFf0",
        PFPStore: "0xFD0326D0cA4cA37D6491E316F1eBCDC7BAAfce51",
    },
};
//# sourceMappingURL=Config.js.map