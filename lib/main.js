"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyrouter_1 = require("skyrouter");
const PFPProposals_1 = __importDefault(require("./view/admin/PFPProposals"));
const Art_1 = __importDefault(require("./view/Art"));
const Home_1 = __importDefault(require("./view/Home"));
const Layout_1 = __importDefault(require("./view/Layout"));
const PFP_1 = __importDefault(require("./view/PFP"));
const Add_1 = __importDefault(require("./view/pfp/Add"));
const AddByMinter_1 = __importDefault(require("./view/pfp/AddByMinter"));
const AddByOwner_1 = __importDefault(require("./view/pfp/AddByOwner"));
const AddByPFPOwner_1 = __importDefault(require("./view/pfp/AddByPFPOwner"));
const Detail_1 = __importDefault(require("./view/pfp/Detail"));
const NFTDetail_1 = __importDefault(require("./view/pfp/NFTDetail"));
const Proposal_1 = __importDefault(require("./view/pfp/Proposal"));
const Propose_1 = __importDefault(require("./view/pfp/Propose"));
const Rankings_1 = __importDefault(require("./view/pfp/Rankings"));
const Sell_1 = __importDefault(require("./view/pfp/Sell"));
const Update_1 = __importDefault(require("./view/pfp/Update"));
const Me_1 = __importDefault(require("./view/user/Me"));
const MyArts_1 = __importDefault(require("./view/user/MyArts"));
const MyPFPs_1 = __importDefault(require("./view/user/MyPFPs"));
(async () => {
    skyrouter_1.SkyRouter.route("**", Layout_1.default);
    skyrouter_1.SkyRouter.route("", Home_1.default);
    skyrouter_1.SkyRouter.route("user/me", Me_1.default);
    skyrouter_1.SkyRouter.route("user/my-arts", MyArts_1.default);
    skyrouter_1.SkyRouter.route("user/my-pfps", MyPFPs_1.default);
    skyrouter_1.SkyRouter.route("pfp", PFP_1.default);
    skyrouter_1.SkyRouter.route("pfp/add", Add_1.default);
    skyrouter_1.SkyRouter.route("pfp/add-by-owner", AddByOwner_1.default);
    skyrouter_1.SkyRouter.route("pfp/add-by-minter", AddByMinter_1.default);
    skyrouter_1.SkyRouter.route("pfp/add-by-pfp-owner", AddByPFPOwner_1.default);
    skyrouter_1.SkyRouter.route("pfp/propose", Propose_1.default);
    skyrouter_1.SkyRouter.route("pfp/sell", Sell_1.default);
    skyrouter_1.SkyRouter.route("pfp/rankings", Rankings_1.default);
    skyrouter_1.SkyRouter.route("pfp/{addr}", Detail_1.default, [
        "pfp/add",
        "pfp/add-by-owner",
        "pfp/add-by-minter",
        "pfp/add-by-pfp-owner",
        "pfp/propose",
        "pfp/sell",
        "pfp/rankings",
    ]);
    skyrouter_1.SkyRouter.route("pfp/{addr}/{id}", NFTDetail_1.default, [
        "pfp/{addr}/update",
        "pfp/proposal/{proposalId}",
    ]);
    skyrouter_1.SkyRouter.route("pfp/{addr}/update", Update_1.default);
    skyrouter_1.SkyRouter.route("pfp/proposal/{proposalId}", Proposal_1.default);
    skyrouter_1.SkyRouter.route("art", Art_1.default);
    skyrouter_1.SkyRouter.route("admin/pfp-proposals", PFPProposals_1.default);
    if (sessionStorage.__spa_path) {
        skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
//# sourceMappingURL=main.js.map