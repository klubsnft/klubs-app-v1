"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TESTNET = false;
exports.default = {
    chainId: TESTNET ? 1001 : 8217,
    adminAddress: "0x5d3C6E36538f485C3483B1C0d3e27a3416E16217",
    contracts: TESTNET ? {
        PFPs: "",
        PFPStore: "",
    } : {
        PFPs: "0xFaBf9031e21Ae41eF82Ee812C1F1DD4BE952BFf0",
        PFPStore: "0xeF50df13f88070662459863D05cCD9581dfB1085",
    },
};
//# sourceMappingURL=Config.js.map