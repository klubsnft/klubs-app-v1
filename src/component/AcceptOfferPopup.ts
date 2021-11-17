import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import PFPsContract from "../contracts/PFPsContract";
import PFPStoreContract from "../contracts/PFPStoreContract";
import ViewUtil from "../view/ViewUtil";

export default class AcceptOfferPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private inputs: DomNode<HTMLInputElement>[] = [];

    constructor(private addr: string[], private ids: BigNumberish[]) {
        super(".popup-background");
        this.append(this.content = el(".popup.accept-offer-popup",
            el("h2", "판매하기"),
            el("p", "보유중인 NFT를 판매합니다. 최초 판매시에는 2번의 트랜잭션이 발생합니다. 한번은 NFT 사용 허락을 위한 것이며, 다른 하나는 실제 판매를 위한 것입니다."),
            this.loading = el(".loading", "Loading..."),
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
            const result = await superagent.get(`https://api.klu.bs/pfp/${addr}/${this.ids[index]}/proxy`);
            const royalty = await PFPsContract.royalties(addr);
            const img = result.body.image;
            this.list.append(el("section",
                img === undefined ? undefined : el("img", {
                    src: img.indexOf("ipfs://") === 0 ? `https://api.klu.bs/ipfsimage/${img.substring(7)}` : img,
                }),
                el(".info",
                    el(".name", result.body.name),
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
