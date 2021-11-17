"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TESTNET = false;
exports.default = {
    chainId: TESTNET ? 1001 : 8217,
    contracts: TESTNET ? {
        PFPs: "",
    } : {
        PFPs: "0x1627338797B536276Bd6a91151d038cDB07c155f",
    },
};
//# sourceMappingURL=Config.js.map