"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TESTNET = false;
exports.default = {
    chainId: TESTNET ? 1001 : 8217,
    adminAddress: "0x5d3C6E36538f485C3483B1C0d3e27a3416E16217",
    fee: 0,
    contracts: TESTNET ? {
        PFPs: "",
        PFPStore: "",
        Klayswap: "",
        MixPriceEstimator: "",
        Artists: "",
        Arts: "",
        ArtStore: "",
        Metaverses: "",
        ItemStoreCommon: "",
        ItemStoreAuction: "",
        ItemStoreSale: "",
    } : {
        PFPs: "0xFaBf9031e21Ae41eF82Ee812C1F1DD4BE952BFf0",
        PFPStore: "0xeF50df13f88070662459863D05cCD9581dfB1085",
        Klayswap: "0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654",
        MixPriceEstimator: "0x637ce9D4B6cb790e81110f1a5D9869E32b8Fbde2",
        Artists: "0x96f8f1c498D863cb5D854b712fA3Be9cB082f59a",
        Arts: "0xD1ab04056cDe0aa92F5b6b3B053c2897944Ce06a",
        ArtStore: "0xc15109d0251942B365A1a2C4deA9db69c35f613e",
        Metaverses: "0xb3c241975D2563ECe698CdA64b6dd06cC51524ac",
        ItemStoreCommon: "0xd62F7B95Ea9712defe32A55BdCA1e8B23dF71119",
        ItemStoreAuction: "0x84fE12ff0A05F3e66a645aED97140E92526B19dD",
        ItemStoreSale: "0x7bea58940De45533e73C725f7C816302bf5bd281",
    },
};
//# sourceMappingURL=Config.js.map