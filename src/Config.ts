
const TESTNET = false;

export default {

    chainId: TESTNET ? 1001 : 8217,

    contracts: TESTNET ? {
        // Testnet
        PFPs: "",
    } : {
        // Mainnet
        PFPs: "0xF92D38Dc8bda0D6A8f8dD66E958E49742B943405",
    },
};
