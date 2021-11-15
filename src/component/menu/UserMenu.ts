import { DomNode, el } from "@hanul/skynode";
import CommonUtil from "../../CommonUtil";
import Wallet from "../../klaytn/Wallet";

export default class UserMenu extends DomNode {

    private connectWalletButton: DomNode;
    private addressDisplay: DomNode;

    constructor() {
        super(".user-menu");
        this.append(
            this.connectWalletButton = el("a.connect-wallet", "CONNECT WALLET", {
                click: () => Wallet.connect(),
            }),
            this.addressDisplay = el(".wallet-address"),
        );
        Wallet.on("connect", this.connectHandler);
        this.addressDisplay.style({ display: "none" });
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
        }
    }

    public delete() {
        Wallet.off("connect", this.connectHandler);
        super.delete();
    }
}
