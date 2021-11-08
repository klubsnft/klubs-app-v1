"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TESTNET = false;
exports.default = {
    chainId: TESTNET ? 1001 : 8217,
    contracts: TESTNET ? {
        PFPs: "",
    } : {
        PFPs: "0xF92D38Dc8bda0D6A8f8dD66E958E49742B943405",
    },
};
//# sourceMappingURL=Config.js.map