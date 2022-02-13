"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPFPStoreV2__factory = void 0;
const ethers_1 = require("ethers");
class IPFPStoreV2__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IPFPStoreV2__factory = IPFPStoreV2__factory;
const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: "addrs",
                type: "address[]",
            },
            {
                name: "ids",
                type: "uint256[]",
            },
            {
                name: "to",
                type: "address[]",
            },
        ],
        name: "batchTransfer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "seller",
                type: "address",
            },
        ],
        name: "userAuctionInfoLength",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "offerId",
                type: "uint256",
            },
        ],
        name: "cancelOffer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "price",
                type: "uint256",
            },
        ],
        name: "bid",
        outputs: [
            {
                name: "biddingId",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "onSalesCount",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "seller",
                type: "address",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "userAuctionInfo",
        outputs: [
            {
                name: "pfp",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "startPrice",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
        ],
        name: "offerCount",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
        ],
        name: "sales",
        outputs: [
            {
                name: "seller",
                type: "address",
            },
            {
                name: "price",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "bidder",
                type: "address",
            },
        ],
        name: "userBiddingInfoLength",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "offerId",
                type: "uint256",
            },
        ],
        name: "acceptOffer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
        ],
        name: "auctions",
        outputs: [
            {
                name: "seller",
                type: "address",
            },
            {
                name: "startPrice",
                type: "uint256",
            },
            {
                name: "endBlock",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "biddings",
        outputs: [
            {
                name: "bidder",
                type: "address",
            },
            {
                name: "price",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "offeror",
                type: "address",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "userOfferInfo",
        outputs: [
            {
                name: "pfp",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "price",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "seller",
                type: "address",
            },
        ],
        name: "userSellInfoLength",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "startPrice",
                type: "uint256",
            },
            {
                name: "endBlock",
                type: "uint256",
            },
        ],
        name: "createAuction",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "price",
                type: "uint256",
            },
        ],
        name: "makeOffer",
        outputs: [
            {
                name: "offerId",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "onAuctions",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
        ],
        name: "cancelAuction",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
        ],
        name: "biddingCount",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
        ],
        name: "checkAuction",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "user",
                type: "address",
            },
        ],
        name: "isBanned",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "offeror",
                type: "address",
            },
        ],
        name: "userOfferInfoLength",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addrs",
                type: "address[]",
            },
            {
                name: "ids",
                type: "uint256[]",
            },
            {
                name: "prices",
                type: "uint256[]",
            },
        ],
        name: "sell",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "auctionExtensionInterval",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
        ],
        name: "claim",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addrs",
                type: "address[]",
            },
            {
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "cancelSale",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addrs",
                type: "address[]",
            },
            {
                name: "ids",
                type: "uint256[]",
            },
            {
                name: "prices",
                type: "uint256[]",
            },
        ],
        name: "changeSellPrice",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "seller",
                type: "address",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "userSellInfo",
        outputs: [
            {
                name: "pfp",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "price",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "onAuctionsCount",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "onSales",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addrs",
                type: "address[]",
            },
            {
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "buy",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "bidder",
                type: "address",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "userBiddingInfo",
        outputs: [
            {
                name: "pfp",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "price",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "offers",
        outputs: [
            {
                name: "offeror",
                type: "address",
            },
            {
                name: "price",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
        ],
        name: "checkSelling",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                name: "price",
                type: "uint256",
            },
        ],
        name: "Sell",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                name: "price",
                type: "uint256",
            },
        ],
        name: "ChangeSellPrice",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "buyer",
                type: "address",
            },
            {
                indexed: false,
                name: "price",
                type: "uint256",
            },
        ],
        name: "Buy",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
        ],
        name: "CancelSale",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "offerId",
                type: "uint256",
            },
            {
                indexed: false,
                name: "offeror",
                type: "address",
            },
            {
                indexed: false,
                name: "price",
                type: "uint256",
            },
        ],
        name: "MakeOffer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "offerId",
                type: "uint256",
            },
            {
                indexed: false,
                name: "offeror",
                type: "address",
            },
        ],
        name: "CancelOffer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "offerId",
                type: "uint256",
            },
            {
                indexed: false,
                name: "acceptor",
                type: "address",
            },
        ],
        name: "AcceptOffer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                name: "startPrice",
                type: "uint256",
            },
            {
                indexed: false,
                name: "endBlock",
                type: "uint256",
            },
        ],
        name: "CreateAuction",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
        ],
        name: "CancelAuction",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "bidder",
                type: "address",
            },
            {
                indexed: false,
                name: "price",
                type: "uint256",
            },
        ],
        name: "Bid",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "bidder",
                type: "address",
            },
            {
                indexed: false,
                name: "price",
                type: "uint256",
            },
        ],
        name: "Claim",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
        ],
        name: "CancelSaleByOwner",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "offerId",
                type: "uint256",
            },
        ],
        name: "CancelOfferByOwner",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "addr",
                type: "address",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
        ],
        name: "CancelAuctionByOwner",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "user",
                type: "address",
            },
        ],
        name: "Ban",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "user",
                type: "address",
            },
        ],
        name: "Unban",
        type: "event",
    },
];
//# sourceMappingURL=IPFPStoreV2__factory.js.map