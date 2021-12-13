"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const ArtNFTCard_1 = __importDefault(require("../component/ArtNFTCard"));
const Confirm_1 = __importDefault(require("../component/dialogue/Confirm"));
const Loading_1 = __importDefault(require("../component/loading/Loading"));
const ArtistsContract_1 = __importDefault(require("../contracts/ArtistsContract"));
const ArtsContract_1 = __importDefault(require("../contracts/ArtsContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Arts {
    constructor() {
        this.connectHandler = () => {
            this.load();
        };
        Layout_1.default.current.title = "Arts";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".arts-view", (0, skynode_1.el)("header", (0, skynode_1.el)("p", "Klubs Arts는 NFT 작가들과 함께 만들어나가는 공간입니다."), this.controller = (0, skynode_1.el)(".controller")), (0, skynode_1.el)(".content", (0, skynode_1.el)("h2", "Art 목록"), this.artLoading = new Loading_1.default(), this.artList = (0, skynode_1.el)(".art-list"))));
        this.load();
        this.loadArts();
        Wallet_1.default.on("connect", this.connectHandler);
    }
    async load() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const added = await ArtistsContract_1.default.added(address);
            if (added === true) {
                this.controller.empty().append((0, skynode_1.el)("a", "작가 정보 수정", {
                    click: () => ViewUtil_1.default.go("/arts/artists/update"),
                }), (0, skynode_1.el)("a", "작품 등록", {
                    click: async () => {
                        new Confirm_1.default("작품 등록", "작품 정보를 생성하시겠습니까?", "생성하기", async () => {
                            await ArtsContract_1.default.mint();
                            const artCount = await ArtsContract_1.default.artistArtCount(address);
                            const id = await ArtsContract_1.default.artistArts(address, artCount.toNumber() - 1);
                            ViewUtil_1.default.go(`/arts/${id}/update`);
                        });
                    },
                }));
            }
            else {
                this.controller.empty().append((0, skynode_1.el)("a", "작가 등록", {
                    click: () => ViewUtil_1.default.go("/arts/artists/add"),
                }));
            }
        }
    }
    async loadArts() {
        this.artList.empty();
        const count = await ArtsContract_1.default.totalSupply();
        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i).sort(() => Math.random() - 0.5);
        const promises = [];
        for (const id of array) {
            const promise = async (id) => {
                if (await ArtsContract_1.default.exists(id) === true) {
                    const result = await superagent_1.default.get(`https://api.klu.bs/arts/${this.id}`);
                    const data = result.body;
                    if (data.name !== "" && data.hiding !== true && this.container.deleted !== true) {
                        new ArtNFTCard_1.default(id, data).appendTo(this.artList);
                    }
                }
            };
            promises.push(promise(id));
        }
        await Promise.all(promises);
        this.pfpLoading.delete();
    }
    changeParams(params, uri) { }
    close() {
        Wallet_1.default.off("connect", this.connectHandler);
        this.container.delete();
    }
}
exports.default = Arts;
//# sourceMappingURL=Arts.js.map