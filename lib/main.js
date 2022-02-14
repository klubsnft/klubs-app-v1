"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
const superagent_1 = __importDefault(require("superagent"));
const BrowserInfo_1 = __importDefault(require("./BrowserInfo"));
const PFPProposals_1 = __importDefault(require("./view/admin/PFPProposals"));
const PFPs_1 = __importDefault(require("./view/admin/PFPs"));
const AddArtist_1 = __importDefault(require("./view/arts/AddArtist"));
const ArtDetail_1 = __importDefault(require("./view/arts/ArtDetail"));
const Artist_1 = __importDefault(require("./view/arts/Artist"));
const PageAll_1 = __importDefault(require("./view/arts/page/PageAll"));
const PageAuctions_1 = __importDefault(require("./view/arts/page/PageAuctions"));
const PageLayout_1 = __importDefault(require("./view/arts/page/PageLayout"));
const PageMine_1 = __importDefault(require("./view/arts/page/PageMine"));
const PageSelling_1 = __importDefault(require("./view/arts/page/PageSelling"));
const UpdateArt_1 = __importDefault(require("./view/arts/UpdateArt"));
const UpdateArtist_1 = __importDefault(require("./view/arts/UpdateArtist"));
const Home_1 = __importDefault(require("./view/Home"));
const Layout_1 = __importDefault(require("./view/Layout"));
const Meme_1 = __importDefault(require("./view/Meme"));
const AddItem_1 = __importDefault(require("./view/metaverse/AddItem"));
const AddMetaverse_1 = __importDefault(require("./view/metaverse/AddMetaverse"));
const ItemPageAll_1 = __importDefault(require("./view/metaverse/item-page/ItemPageAll"));
const ItemPageLayout_1 = __importDefault(require("./view/metaverse/item-page/ItemPageLayout"));
const ItemPageMine_1 = __importDefault(require("./view/metaverse/item-page/ItemPageMine"));
const ItemProposal_1 = __importDefault(require("./view/metaverse/ItemProposal"));
const Metaverse_1 = __importDefault(require("./view/metaverse/Metaverse"));
const Metaverses_1 = __importDefault(require("./view/metaverse/Metaverses"));
const UpdateItem_1 = __importDefault(require("./view/metaverse/UpdateItem"));
const UpdateMetaverse_1 = __importDefault(require("./view/metaverse/UpdateMetaverse"));
const Mix_1 = __importDefault(require("./view/Mix"));
const Add_1 = __importDefault(require("./view/pfp/Add"));
const AddByMinter_1 = __importDefault(require("./view/pfp/AddByMinter"));
const AddByOwner_1 = __importDefault(require("./view/pfp/AddByOwner"));
const AddByPFPOwner_1 = __importDefault(require("./view/pfp/AddByPFPOwner"));
const NFTDetail_1 = __importDefault(require("./view/pfp/NFTDetail"));
const PageAll_2 = __importDefault(require("./view/pfp/page/PageAll"));
const PageAuctions_2 = __importDefault(require("./view/pfp/page/PageAuctions"));
const PageLayout_2 = __importDefault(require("./view/pfp/page/PageLayout"));
const PageMine_2 = __importDefault(require("./view/pfp/page/PageMine"));
const PageSelling_2 = __importDefault(require("./view/pfp/page/PageSelling"));
const PFP_1 = __importDefault(require("./view/pfp/PFP"));
const Proposal_1 = __importDefault(require("./view/pfp/Proposal"));
const Propose_1 = __importDefault(require("./view/pfp/Propose"));
const Rankings_1 = __importDefault(require("./view/pfp/Rankings"));
const Update_1 = __importDefault(require("./view/pfp/Update"));
const Me_1 = __importDefault(require("./view/user/Me"));
const MyArts_1 = __importDefault(require("./view/user/MyArts"));
const MyPFPs_1 = __importDefault(require("./view/user/MyPFPs"));
const User_1 = __importDefault(require("./view/user/User"));
(async () => {
    msg_js_1.default.language = BrowserInfo_1.default.language;
    msg_js_1.default.parseCSV((await superagent_1.default.get("/msg.csv")).text);
    skyrouter_1.SkyRouter.route("**", Layout_1.default);
    skyrouter_1.SkyRouter.route("", Home_1.default);
    skyrouter_1.SkyRouter.route("user/me", Me_1.default);
    skyrouter_1.SkyRouter.route("user/my-arts", MyArts_1.default);
    skyrouter_1.SkyRouter.route([
        "user/my-pfps",
        "user/my-pfps/{page}",
    ], MyPFPs_1.default);
    skyrouter_1.SkyRouter.route("user/{address}", User_1.default, [
        "user/me",
        "user/my-arts",
        "user/my-pfps",
    ]);
    skyrouter_1.SkyRouter.route("pfp", PFP_1.default);
    skyrouter_1.SkyRouter.route("pfp/add", Add_1.default);
    skyrouter_1.SkyRouter.route("pfp/add-by-owner", AddByOwner_1.default);
    skyrouter_1.SkyRouter.route("pfp/add-by-minter", AddByMinter_1.default);
    skyrouter_1.SkyRouter.route("pfp/add-by-pfp-owner", AddByPFPOwner_1.default);
    skyrouter_1.SkyRouter.route("pfp/propose", Propose_1.default);
    skyrouter_1.SkyRouter.route("pfp/rankings", Rankings_1.default);
    skyrouter_1.SkyRouter.route([
        "pfp/{addr}",
        "pfp/{addr}/page/{page}",
        "pfp/{addr}/mine",
        "pfp/{addr}/mine/{page}",
        "pfp/{addr}/selling",
        "pfp/{addr}/selling/{page}",
        "pfp/{addr}/auctions",
        "pfp/{addr}/auctions/{page}",
    ], PageLayout_2.default, [
        "pfp/add",
        "pfp/add-by-owner",
        "pfp/add-by-minter",
        "pfp/add-by-pfp-owner",
        "pfp/propose",
        "pfp/rankings",
    ]);
    skyrouter_1.SkyRouter.route([
        "pfp/{addr}",
        "pfp/{addr}/page/{page}",
    ], PageAll_2.default, [
        "pfp/add",
        "pfp/add-by-owner",
        "pfp/add-by-minter",
        "pfp/add-by-pfp-owner",
        "pfp/propose",
        "pfp/rankings",
    ]);
    skyrouter_1.SkyRouter.route([
        "pfp/{addr}/mine",
        "pfp/{addr}/mine/{page}",
    ], PageMine_2.default);
    skyrouter_1.SkyRouter.route([
        "pfp/{addr}/selling",
        "pfp/{addr}/selling/{page}",
    ], PageSelling_2.default);
    skyrouter_1.SkyRouter.route([
        "pfp/{addr}/auctions",
        "pfp/{addr}/auctions/{page}",
    ], PageAuctions_2.default);
    skyrouter_1.SkyRouter.route("pfp/{addr}/{id}", NFTDetail_1.default, [
        "pfp/{addr}/mine",
        "pfp/{addr}/selling",
        "pfp/{addr}/auctions",
        "pfp/{addr}/update",
        "pfp/proposal/{proposalId}",
    ]);
    skyrouter_1.SkyRouter.route("pfp/{addr}/update", Update_1.default);
    skyrouter_1.SkyRouter.route("pfp/proposal/{proposalId}", Proposal_1.default);
    skyrouter_1.SkyRouter.route([
        "arts",
        "arts/mine",
        "arts/selling",
        "arts/auctions",
    ], PageLayout_1.default);
    skyrouter_1.SkyRouter.route("arts", PageAll_1.default);
    skyrouter_1.SkyRouter.route("arts/mine", PageMine_1.default);
    skyrouter_1.SkyRouter.route("arts/selling", PageSelling_1.default);
    skyrouter_1.SkyRouter.route("arts/auctions", PageAuctions_1.default);
    skyrouter_1.SkyRouter.route("arts/artists/add", AddArtist_1.default);
    skyrouter_1.SkyRouter.route("arts/artists/update", UpdateArtist_1.default);
    skyrouter_1.SkyRouter.route("arts/{id}", ArtDetail_1.default, [
        "arts/mine",
        "arts/selling",
        "arts/auctions",
    ]);
    skyrouter_1.SkyRouter.route("arts/{id}/update", UpdateArt_1.default, [
        "arts/artists/update",
    ]);
    skyrouter_1.SkyRouter.route("artists/{address}", Artist_1.default);
    skyrouter_1.SkyRouter.route("metaverses", Metaverses_1.default);
    skyrouter_1.SkyRouter.route("metaverse/{id}", Metaverse_1.default, ["metaverse/add"]);
    skyrouter_1.SkyRouter.route("metaverse/add", AddMetaverse_1.default);
    skyrouter_1.SkyRouter.route("metaverse/{id}/additem", AddItem_1.default);
    skyrouter_1.SkyRouter.route("metaverse/{id}/update", UpdateMetaverse_1.default);
    skyrouter_1.SkyRouter.route([
        "metaverse/{metaverseId}/item/{addr}",
        "metaverse/{metaverseId}/item/{addr}/page/{page}",
        "metaverse/{metaverseId}/item/{addr}/mine",
        "metaverse/{metaverseId}/item/{addr}/mine/{page}",
        "metaverse/{metaverseId}/item/{addr}/selling",
        "metaverse/{metaverseId}/item/{addr}/selling/{page}",
        "metaverse/{metaverseId}/item/{addr}/auctions",
        "metaverse/{metaverseId}/item/{addr}/auctions/{page}",
    ], ItemPageLayout_1.default, [
        "metaverse/{metaverseId}/item/propose",
    ]);
    skyrouter_1.SkyRouter.route([
        "metaverse/{metaverseId}/item/{addr}",
        "metaverse/{metaverseId}/item/{addr}/page/{page}",
    ], ItemPageAll_1.default, [
        "metaverse/{metaverseId}/item/propose",
    ]);
    skyrouter_1.SkyRouter.route([
        "metaverse/{metaverseId}/item/{addr}/mine",
        "metaverse/{metaverseId}/item/{addr}/mine/{page}",
    ], ItemPageMine_1.default);
    skyrouter_1.SkyRouter.route("metaverse/{metaverseId}/item/{addr}/update", UpdateItem_1.default);
    skyrouter_1.SkyRouter.route("metaverse/{metaverseId}/item/proposal/{proposalId}", ItemProposal_1.default);
    skyrouter_1.SkyRouter.route("meme", Meme_1.default);
    skyrouter_1.SkyRouter.route("mix", Mix_1.default);
    skyrouter_1.SkyRouter.route("admin/pfp-proposals", PFPProposals_1.default);
    skyrouter_1.SkyRouter.route("admin/pfps", PFPs_1.default);
    if (sessionStorage.__spa_path) {
        skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
//# sourceMappingURL=main.js.map