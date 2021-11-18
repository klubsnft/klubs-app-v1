import { DomNode, el } from "@hanul/skynode";
import CommonUtil from "../../CommonUtil";
import Klip from "../../klaytn/Klip";
import Wallet from "../../klaytn/Wallet";
import ViewUtil from "../../view/ViewUtil";

export default class UserInfo extends DomNode {

    private connectWalletButton: DomNode;
    private addressDisplay: DomNode;

    constructor(private mobile?: boolean) {
        super(".user-menu");
        this.append(
            this.connectWalletButton = el("a.connect-wallet", "CONNECT WALLET", {
                click: () => Wallet.connect(),
            }),
            this.addressDisplay = el(".wallet-address"),
        );
        this.addressDisplay.style({ display: "none" });
        Wallet.on("connect", this.connectHandler);
        this.loadAddress();
    }

    private connectHandler = () => {
        this.loadAddress();
    };

    private async loadAddress() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            if (this.connectWalletButton.deleted !== true) {
                this.connectWalletButton.delete();
            }
            this.addressDisplay.style({ display: "block" });
            this.addressDisplay.empty().appendText(CommonUtil.shortenAddress(address));
            (this.mobile === true ? this : this.addressDisplay).append(el("ul",
                el("li", el("a", "내 PFP", {
                    click: () => ViewUtil.go("/user/my-pfps"),
                })),
                Klip.connected !== true ? undefined : el("li", el("a", "로그아웃", {
                    click: () => Klip.disconnect(),
                })),
            ));
        }
    }

    public delete() {
        Wallet.off("connect", this.connectHandler);
        super.delete();
    }
}
