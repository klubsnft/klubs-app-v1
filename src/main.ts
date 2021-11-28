import { SkyRouter } from "skyrouter";
import PFPProposals from "./view/admin/PFPProposals";
import PFPs from "./view/admin/PFPs";
import Art from "./view/Art";
import Home from "./view/Home";
import Item from "./view/Item";
import Layout from "./view/Layout";
import Mix from "./view/Mix";
import PFP from "./view/PFP";
import Add from "./view/pfp/Add";
import AddByMinter from "./view/pfp/AddByMinter";
import AddByOwner from "./view/pfp/AddByOwner";
import AddByPFPOwner from "./view/pfp/AddByPFPOwner";
import Detail from "./view/pfp/Detail";
import NFTDetail from "./view/pfp/NFTDetail";
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
    SkyRouter.route("user/my-pfps", MyPFPs);

    SkyRouter.route("pfp", PFP);
    SkyRouter.route("pfp/add", Add);
    SkyRouter.route("pfp/add-by-owner", AddByOwner);
    SkyRouter.route("pfp/add-by-minter", AddByMinter);
    SkyRouter.route("pfp/add-by-pfp-owner", AddByPFPOwner);
    SkyRouter.route("pfp/propose", Propose);
    SkyRouter.route("pfp/sell", Sell);
    SkyRouter.route("pfp/rankings", Rankings);
    SkyRouter.route("pfp/{addr}", Detail, [
        "pfp/add",
        "pfp/add-by-owner",
        "pfp/add-by-minter",
        "pfp/add-by-pfp-owner",
        "pfp/propose",
        "pfp/sell",
        "pfp/rankings",
    ]);
    SkyRouter.route("pfp/{addr}/{id}", NFTDetail, [
        "pfp/{addr}/update",
        "pfp/proposal/{proposalId}",
    ]);
    SkyRouter.route("pfp/{addr}/update", Update);
    SkyRouter.route("pfp/proposal/{proposalId}", Proposal);

    SkyRouter.route("art", Art);
    SkyRouter.route("item", Item);
    SkyRouter.route("mix", Mix);

    SkyRouter.route("admin/pfp-proposals", PFPProposals);
    SkyRouter.route("admin/pfps", PFPs);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
