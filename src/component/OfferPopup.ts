import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import PFPStoreContract from "../contracts/PFPStoreContract";
import ViewUtil from "../view/ViewUtil";

export default class OfferPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private inputs: DomNode<HTMLInputElement>[] = [];

    constructor(private addr: string, private id: BigNumberish) {
        super(".popup-background");
        this.append(this.content = el(".popup.offer-popup",
            el("h2", "가격 제안"),
            el("p", "NFT의 가격을 제안합니다. 최초 제안시에는 2번의 트랜잭션이 발생합니다. 한번은 MIX 사용 허락을 위한 것이며, 다른 하나는 실제 제안를 위한 것입니다. 소유자가 수락하는 즉시 거래가 완료됩니다."),
            this.loading = el(".loading", "Loading..."),
            this.list = el(".list"),
            el(".button-container",
                el("button", "제안하기", {
                    click: async () => {
                        const prices: BigNumberish[] = [];
                        for (const input of this.inputs) {
                            prices.push(utils.parseEther(input.domElement.value));
                        }
                        await PFPStoreContract.makeOffer(addr, id, prices[0]);
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
        const result = await superagent.get(`https://api.klu.bs/pfp/${this.addr}/${this.id}/proxy`);
        const img = result.body.image;
        this.list.append(el("section",
            img === undefined ? undefined : el("img", {
                src: img.indexOf("ipfs://") === 0 ? `https://api.klu.bs/ipfsimage/${img.substring(7)}` : img,
            }),
            el(".info",
                el(".name", result.body.name),
                el("label",
                    el("span", "제안 가격"),
                    input = el("input", { placeholder: "제안 가격 (MIX)" }),
                ),
            ),
        ));
        this.inputs.push(input);
        this.loading.delete();
    }
}
