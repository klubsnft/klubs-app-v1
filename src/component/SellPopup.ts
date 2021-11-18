import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import PFPsContract from "../contracts/PFPsContract";
import PFPStoreContract from "../contracts/PFPStoreContract";
import KIP17Contract from "../contracts/standard/KIP17Contract";
import ProxyUtil from "../ProxyUtil";
import ViewUtil from "../view/ViewUtil";
import Loading from "./loading/Loading";

export default class SellPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private inputs: DomNode<HTMLInputElement>[] = [];

    constructor(private addr: string[], private ids: BigNumberish[]) {
        super(".popup-background");
        this.append(this.content = el(".popup.sell-popup",
            el("h2", "판매하기"),
            el("p", "보유중인 NFT를 판매합니다. 최초 판매시에는 2번의 트랜잭션이 발생합니다. 한번은 NFT 사용 허락을 위한 것이며, 다른 하나는 실제 판매를 위한 것입니다."),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", "판매 시작", {
                    click: async () => {
                        const prices: BigNumberish[] = [];
                        for (const input of this.inputs) {
                            prices.push(utils.parseEther(input.domElement.value));
                        }
                        await PFPStoreContract.sell(addr, ids, prices);
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
        for (const [index, addr] of this.addr.entries()) {
            let input: DomNode<HTMLInputElement>;
            const url = await new KIP17Contract(addr).tokenURI(this.ids[index]);
            const data = await ProxyUtil.loadURL(url);
            const royalty = await PFPsContract.royalties(addr);
            const img = data.image;
            this.list.append(el("section",
                img === undefined ? undefined : el("img", { src: ProxyUtil.imageSRC(img) }),
                el(".info",
                    el(".name", data.name),
                    el("label",
                        el("span", `판매 가격 (원작자 2차 판매 수수료: ${royalty.royalty / 100}%, Klubs 수수료 2.5% 포함)`),
                        input = el("input", { placeholder: "판매 가격 (MIX)" }),
                    ),
                ),
            ));
            this.inputs.push(input);
        }
        this.loading.delete();
    }
}
