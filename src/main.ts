import msg from "msg.js";
import { SkyRouter } from "skyrouter";
import superagent from "superagent";
import BrowserInfo from "./BrowserInfo";
import PFPProposals from "./view/admin/PFPProposals";
import PFPs from "./view/admin/PFPs";
import AddArtist from "./view/arts/AddArtist";
import ArtDetail from "./view/arts/ArtDetail";
import Artist from "./view/arts/Artist";
import ArtsPageAll from "./view/arts/page/PageAll";
import ArtsPageAuctions from "./view/arts/page/PageAuctions";
import PageLayout from "./view/arts/page/PageLayout";
import ArtsPageMine from "./view/arts/page/PageMine";
import ArtsPageSelling from "./view/arts/page/PageSelling";
import UpdateArt from "./view/arts/UpdateArt";
import UpdateArtist from "./view/arts/UpdateArtist";
import Home from "./view/Home";
import Layout from "./view/Layout";
import LinkWalletToDiscord from "./view/LinkWalletToDiscord";
import Meme from "./view/Meme";
import AddItem from "./view/metaverse/AddItem";
import AddMetaverse from "./view/metaverse/AddMetaverse";
import ItemPageAll from "./view/metaverse/item-page/ItemPageAll";
import ItemPageLayout from "./view/metaverse/item-page/ItemPageLayout";
import ItemPageMine from "./view/metaverse/item-page/ItemPageMine";
import ItemProposal from "./view/metaverse/ItemProposal";
import Metaverse from "./view/metaverse/Metaverse";
import Metaverses from "./view/metaverse/Metaverses";
import UpdateItem from "./view/metaverse/UpdateItem";
import UpdateMetaverse from "./view/metaverse/UpdateMetaverse";
import Mix from "./view/Mix";
import Add from "./view/pfp/Add";
import AddByMinter from "./view/pfp/AddByMinter";
import AddByOwner from "./view/pfp/AddByOwner";
import AddByPFPOwner from "./view/pfp/AddByPFPOwner";
import NFTDetail from "./view/pfp/NFTDetail";
import PFPPageAll from "./view/pfp/page/PageAll";
import PFPPageAuctions from "./view/pfp/page/PageAuctions";
import PFPPageLayout from "./view/pfp/page/PageLayout";
import PFPPageMine from "./view/pfp/page/PageMine";
import PFPPageSelling from "./view/pfp/page/PageSelling";
import PFP from "./view/pfp/PFP";
import Proposal from "./view/pfp/Proposal";
import Propose from "./view/pfp/Propose";
import Rankings from "./view/pfp/Rankings";
import Update from "./view/pfp/Update";
import Me from "./view/user/Me";
import MyArts from "./view/user/MyArts";
import MyPFPs from "./view/user/MyPFPs";
import User from "./view/user/User";

(async () => {
    msg.language = BrowserInfo.language;
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);

    SkyRouter.route("user/me", Me);
    SkyRouter.route("user/my-arts", MyArts);
    SkyRouter.route([
        "user/my-pfps",
        "user/my-pfps/{page}",
    ], MyPFPs);
    SkyRouter.route("user/{address}", User, [
        "user/me",
        "user/my-arts",
        "user/my-pfps",
    ]);

    // PFPs
    SkyRouter.route("pfp", PFP);
    SkyRouter.route("pfp/add", Add);
    SkyRouter.route("pfp/add-by-owner", AddByOwner);
    SkyRouter.route("pfp/add-by-minter", AddByMinter);
    SkyRouter.route("pfp/add-by-pfp-owner", AddByPFPOwner);
    SkyRouter.route("pfp/propose", Propose);
    SkyRouter.route("pfp/rankings", Rankings);

    SkyRouter.route([
        "pfp/{addr}",
        "pfp/{addr}/page/{page}",
        "pfp/{addr}/mine",
        "pfp/{addr}/mine/{page}",
        "pfp/{addr}/selling",
        "pfp/{addr}/selling/{page}",
        "pfp/{addr}/auctions",
        "pfp/{addr}/auctions/{page}",
    ], PFPPageLayout, [
        "pfp/add",
        "pfp/add-by-owner",
        "pfp/add-by-minter",
        "pfp/add-by-pfp-owner",
        "pfp/propose",
        "pfp/rankings",
    ]);

    SkyRouter.route([
        "pfp/{addr}",
        "pfp/{addr}/page/{page}",
    ], PFPPageAll, [
        "pfp/add",
        "pfp/add-by-owner",
        "pfp/add-by-minter",
        "pfp/add-by-pfp-owner",
        "pfp/propose",
        "pfp/rankings",
    ]);

    SkyRouter.route([
        "pfp/{addr}/mine",
        "pfp/{addr}/mine/{page}",
    ], PFPPageMine);

    SkyRouter.route([
        "pfp/{addr}/selling",
        "pfp/{addr}/selling/{page}",
    ], PFPPageSelling);

    SkyRouter.route([
        "pfp/{addr}/auctions",
        "pfp/{addr}/auctions/{page}",
    ], PFPPageAuctions);

    SkyRouter.route("pfp/{addr}/{id}", NFTDetail, [
        "pfp/{addr}/mine",
        "pfp/{addr}/selling",
        "pfp/{addr}/auctions",
        "pfp/{addr}/update",
        "pfp/proposal/{proposalId}",
    ]);
    SkyRouter.route("pfp/{addr}/update", Update);
    SkyRouter.route("pfp/proposal/{proposalId}", Proposal);

    // Arts
    SkyRouter.route([
        "arts",
        "arts/mine",
        "arts/selling",
        "arts/auctions",
    ], PageLayout);

    SkyRouter.route("arts", ArtsPageAll);
    SkyRouter.route("arts/mine", ArtsPageMine);
    SkyRouter.route("arts/selling", ArtsPageSelling);
    SkyRouter.route("arts/auctions", ArtsPageAuctions);

    SkyRouter.route("arts/artists/add", AddArtist);
    SkyRouter.route("arts/artists/update", UpdateArtist);
    SkyRouter.route("arts/{id}", ArtDetail, [
        "arts/mine",
        "arts/selling",
        "arts/auctions",
    ]);
    SkyRouter.route("arts/{id}/update", UpdateArt, [
        "arts/artists/update",
    ]);

    SkyRouter.route("artists/{address}", Artist);

    // Metaverse
    SkyRouter.route("metaverses", Metaverses);
    SkyRouter.route("metaverse/{id}", Metaverse, ["metaverse/add"]);
    SkyRouter.route("metaverse/add", AddMetaverse);
    SkyRouter.route("metaverse/{id}/additem", AddItem);
    SkyRouter.route("metaverse/{id}/update", UpdateMetaverse);

    SkyRouter.route([
        "metaverse/{metaverseId}/item/{addr}",
        "metaverse/{metaverseId}/item/{addr}/page/{page}",
        "metaverse/{metaverseId}/item/{addr}/mine",
        "metaverse/{metaverseId}/item/{addr}/mine/{page}",
        "metaverse/{metaverseId}/item/{addr}/selling",
        "metaverse/{metaverseId}/item/{addr}/selling/{page}",
        "metaverse/{metaverseId}/item/{addr}/auctions",
        "metaverse/{metaverseId}/item/{addr}/auctions/{page}",
    ], ItemPageLayout, [
        "metaverse/{metaverseId}/item/propose",
    ]);

    SkyRouter.route([
        "metaverse/{metaverseId}/item/{addr}",
        "metaverse/{metaverseId}/item/{addr}/page/{page}",
    ], ItemPageAll, [
        "metaverse/{metaverseId}/item/propose",
    ]);

    SkyRouter.route([
        "metaverse/{metaverseId}/item/{addr}/mine",
        "metaverse/{metaverseId}/item/{addr}/mine/{page}",
    ], ItemPageMine);

    SkyRouter.route("metaverse/{metaverseId}/item/{addr}/update", UpdateItem);
    SkyRouter.route("metaverse/{metaverseId}/item/proposal/{proposalId}", ItemProposal);

    SkyRouter.route("meme", Meme);

    SkyRouter.route("mix", Mix);

    SkyRouter.route("admin/pfp-proposals", PFPProposals);
    SkyRouter.route("admin/pfps", PFPs);

    SkyRouter.route("link-wallet-to-discord", LinkWalletToDiscord);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
