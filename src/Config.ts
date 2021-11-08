
const TESTNET = false;

export default {

    chainId: TESTNET ? 1001 : 8217,

    contracts: TESTNET ? {
        // Testnet
        PFPs: "",
    } : {
        // Mainnet
        PFPs: "0xe2f53F258D05416F34bE28b7623194e3b6Ed6A4D",
    },
};
