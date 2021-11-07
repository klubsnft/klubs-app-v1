import { SkyRouter } from "skyrouter";
import Art from "./view/Art";
import Home from "./view/Home";
import Layout from "./view/Layout";
import PFP from "./view/PFP";
import AddByMinter from "./view/pfp/AddByMinter";
import AddByOwner from "./view/pfp/AddByOwner";
import AddByPFPOwner from "./view/pfp/AddByPFPOwner";
import Detail from "./view/pfp/Detail";
import Proposal from "./view/pfp/Proposal";
import Propose from "./view/pfp/Propose";
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
    SkyRouter.route("pfp/add-by-owner", AddByOwner);
    SkyRouter.route("pfp/add-by-minter", AddByMinter);
    SkyRouter.route("pfp/add-by-pfp-owner", AddByPFPOwner);
    SkyRouter.route("pfp/propose", Propose);
    SkyRouter.route("pfp/{addr}", Detail, [
        "pfp/add-by-owner",
        "pfp/add-by-minter",
        "pfp/add-by-pfp-owner",
        "pfp/propose",
    ]);
    SkyRouter.route("pfp/{addr}/update", Update);
    SkyRouter.route("pfp/proposal/{proposalId}", Proposal);

    SkyRouter.route("art", Art);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
