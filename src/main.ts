import { SkyRouter } from "skyrouter";
import PFPProposals from "./view/admin/PFPProposals";
import PFPs from "./view/admin/PFPs";
import Arts from "./view/Arts";
import AddArtist from "./view/arts/AddArtist";
import UpdateArt from "./view/arts/UpdateArt";
import UpdateArtist from "./view/arts/UpdateArtist";
import Home from "./view/Home";
import Item from "./view/Item";
import Layout from "./view/Layout";
import Mix from "./view/Mix";
import PFP from "./view/PFP";
import Add from "./view/pfp/Add";
import AddByMinter from "./view/pfp/AddByMinter";
import AddByOwner from "./view/pfp/AddByOwner";
import AddByPFPOwner from "./view/pfp/AddByPFPOwner";
import NFTDetail from "./view/pfp/NFTDetail";
import PageAll from "./view/pfp/page/PageAll";
import PageLayout from "./view/pfp/page/PageLayout";
import PageMine from "./view/pfp/page/PageMine";
import PageSelling from "./view/pfp/page/PageSelling";
import Proposal from "./view/pfp/Proposal";
import Propose from "./view/pfp/Propose";
import Rankings from "./view/pfp/Rankings";
import Sell from "./view/pfp/Sell";
import Update from "./view/pfp/Update";
import Me from "./view/user/Me";
import MyArts from "./view/user/MyArts";
import MyPFPs from "./view/user/MyPFPs";

(async () => {

    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);

    SkyRouter.route("user/me", Me);
    SkyRouter.route("user/my-arts", MyArts);
    SkyRouter.route([
        "user/my-pfps",
        "user/my-pfps/{page}",
    ], MyPFPs);

    SkyRouter.route("pfp", PFP);
    SkyRouter.route("pfp/add", Add);
    SkyRouter.route("pfp/add-by-owner", AddByOwner);
    SkyRouter.route("pfp/add-by-minter", AddByMinter);
    SkyRouter.route("pfp/add-by-pfp-owner", AddByPFPOwner);
    SkyRouter.route("pfp/propose", Propose);
    SkyRouter.route("pfp/sell", Sell);
    SkyRouter.route("pfp/rankings", Rankings);

    SkyRouter.route([
        "pfp/{addr}",
        "pfp/{addr}/page/{page}",
        "pfp/{addr}/mine",
        "pfp/{addr}/mine/{page}",
        "pfp/{addr}/selling",
        "pfp/{addr}/selling/{page}",
    ], PageLayout, [
        "pfp/add",
        "pfp/add-by-owner",
        "pfp/add-by-minter",
        "pfp/add-by-pfp-owner",
        "pfp/propose",
        "pfp/sell",
        "pfp/rankings",
    ]);

    SkyRouter.route([
        "pfp/{addr}",
        "pfp/{addr}/page/{page}",
    ], PageAll, [
        "pfp/add",
        "pfp/add-by-owner",
        "pfp/add-by-minter",
        "pfp/add-by-pfp-owner",
        "pfp/propose",
        "pfp/sell",
        "pfp/rankings",
    ]);

    SkyRouter.route([
        "pfp/{addr}/mine",
        "pfp/{addr}/mine/{page}",
    ], PageMine);

    SkyRouter.route([
        "pfp/{addr}/selling",
        "pfp/{addr}/selling/{page}",
    ], PageSelling);

    SkyRouter.route("pfp/{addr}/{id}", NFTDetail, [
        "pfp/{addr}/mine",
        "pfp/{addr}/selling",
        "pfp/{addr}/update",
        "pfp/proposal/{proposalId}",
    ]);
    SkyRouter.route("pfp/{addr}/update", Update);
    SkyRouter.route("pfp/proposal/{proposalId}", Proposal);

    SkyRouter.route("arts", Arts);
    SkyRouter.route("arts/artists/add", AddArtist);
    SkyRouter.route("arts/artists/update", UpdateArtist);
    SkyRouter.route("arts/{id}/update", UpdateArt, [
        "arts/artists/update",
    ]);

    SkyRouter.route("item", Item);
    SkyRouter.route("mix", Mix);

    SkyRouter.route("admin/pfp-proposals", PFPProposals);
    SkyRouter.route("admin/pfps", PFPs);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
