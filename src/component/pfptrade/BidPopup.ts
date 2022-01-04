import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../../CommonUtil";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import Wallet from "../../klaytn/Wallet";
import Loader from "../../Loader";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class BidPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private inputs: DomNode<HTMLInputElement>[] = [];

    constructor(private addr: string, private id: number) {
        super(".popup-background");
        this.append(this.content = el(".popup.pfp-bid-popup",
            el("h2", "입찰하기"),
            el("p", "경매에 입찰합니다. 최초 입찰시에는 2번의 트랜잭션이 발생합니다. 한번은 MIX 사용 허락을 위한 것이며, 다른 하나는 실제 입찰을 위한 것입니다."),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", "입찰하기", {
                    click: async () => {
                        if (await Wallet.connected() !== true) {
                            await Wallet.connect();
                        }
                        const prices: BigNumberish[] = [];
                        for (const input of this.inputs) {
                            prices.push(utils.parseEther(input.domElement.value));
                        }
                        await PFPStoreContract.bid(addr, id, prices[0]);
                        this.delete();
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
                el("button", "취소", {
                    click: () => this.delete(),
                }),
            ),
        ));
        this.load();
    }

    private async load() {
        let input: DomNode<HTMLInputElement>;
        const data = await Loader.loadMetadata(this.addr, this.id);
        const auction = await PFPStoreContract.auctions(this.addr, this.id);
        const img = data.image;
        this.list.append(el("section",
            img === undefined ? undefined : new NFTDisplay(img),
            el(".info",
                el(".name", data.name),
                el("label",
                el("span", "입찰 가격 (최소 입찰 가격: ", CommonUtil.numberWithCommas(utils.formatEther(auction.startPrice)), " MIX)"),
                    input = el("input", { placeholder: "입찰 가격 (MIX)" }),
                ),
            ),
        ));
        this.inputs.push(input);
        this.loading.delete();
    }
}
