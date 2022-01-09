import msg from "msg.js";
import { SkyRouter } from "skyrouter";
import superagent from "superagent";
import BrowserInfo from "./BrowserInfo";
import PFPProposals from "./view/admin/PFPProposals";
import PFPs from "./view/admin/PFPs";
import AddArtist from "./view/arts/AddArtist";
import ArtDetail from "./view/arts/ArtDetail";
import ArtsPageAll from "./view/arts/page/PageAll";
import PageLayout from "./view/arts/page/PageLayout";
import ArtsPageMine from "./view/arts/page/PageMine";
import ArtsPageSelling from "./view/arts/page/PageSelling";
import ArtsPageAuctions from "./view/arts/page/PageAuctions";
import UpdateArt from "./view/arts/UpdateArt";
import UpdateArtist from "./view/arts/UpdateArtist";
import Home from "./view/Home";
import Item from "./view/Item";
import Layout from "./view/Layout";
import Meme from "./view/Meme";
import Mix from "./view/Mix";
import PFP from "./view/PFP";
import Add from "./view/pfp/Add";
import AddByMinter from "./view/pfp/AddByMinter";
import AddByOwner from "./view/pfp/AddByOwner";
import AddByPFPOwner from "./view/pfp/AddByPFPOwner";
import NFTDetail from "./view/pfp/NFTDetail";
import PFPPageAll from "./view/pfp/page/PageAll";
import PFPPageLayout from "./view/pfp/page/PageLayout";
import PFPPageMine from "./view/pfp/page/PageMine";
import PFPPageSelling from "./view/pfp/page/PageSelling";
import PFPPageAuctions from "./view/pfp/page/PageAuctions";
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

    SkyRouter.route("item", Item);
    SkyRouter.route("meme", Meme);

    SkyRouter.route("mix", Mix);

    SkyRouter.route("admin/pfp-proposals", PFPProposals);
    SkyRouter.route("admin/pfps", PFPs);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
