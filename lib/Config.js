"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TESTNET = false;
exports.default = {
    chainId: TESTNET ? 1001 : 8217,
    adminAddress: "0x5d3C6E36538f485C3483B1C0d3e27a3416E16217",
    contracts: TESTNET ? {
        PFPs: "",
        PFPStore: "",
        Klayswap: "",
        MixPriceEstimator: "",
        Artists: "",
        Arts: "",
    } : {
        PFPs: "0xFaBf9031e21Ae41eF82Ee812C1F1DD4BE952BFf0",
        PFPStore: "0xeF50df13f88070662459863D05cCD9581dfB1085",
        Klayswap: "0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654",
        MixPriceEstimator: "0x637ce9D4B6cb790e81110f1a5D9869E32b8Fbde2",
        Artists: "0x96f8f1c498D863cb5D854b712fA3Be9cB082f59a",
        Arts: "0xB90b9671C1D494b3EC9730466d57432723c1F16D",
    },
};
//# sourceMappingURL=Config.js.map