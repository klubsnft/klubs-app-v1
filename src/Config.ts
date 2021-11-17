
const TESTNET = false;

export default {

    chainId: TESTNET ? 1001 : 8217,

    contracts: TESTNET ? {
        // Testnet
        PFPs: "",
        PFPStore: "",
    } : {
        // Mainnet
        PFPs: "0xFaBf9031e21Ae41eF82Ee812C1F1DD4BE952BFf0",
        PFPStore: "0xeF50df13f88070662459863D05cCD9581dfB1085",
    },
};
