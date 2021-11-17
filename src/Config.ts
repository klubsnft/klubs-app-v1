
const TESTNET = false;

export default {

    chainId: TESTNET ? 1001 : 8217,

    contracts: TESTNET ? {
        // Testnet
        PFPs: "",
    } : {
        // Mainnet
        PFPs: "0x1627338797B536276Bd6a91151d038cDB07c155f",
    },
};
