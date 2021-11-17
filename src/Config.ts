
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
        PFPStore: "0x339BB19a7c4B4D2AE3610A4E57FEb553BC57A5E3",
    },
};
