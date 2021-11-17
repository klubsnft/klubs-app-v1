import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../CommonUtil";
import PFPStoreContract from "../contracts/PFPStoreContract";
import ViewUtil from "../view/ViewUtil";

export default class BuyPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;

    constructor(private addr: string[], private ids: BigNumberish[]) {
        super(".popup-background");
        this.append(this.content = el(".popup.buy-popup",
            el("h2", "구매하기"),
            el("p", "NFT를 구매합니다. 최초 구매시에는 2번의 트랜잭션이 발생합니다. 한번은 MIX 사용 허락을 위한 것이며, 다른 하나는 실제 구매를 위한 것입니다."),
            this.loading = el(".loading", "Loading..."),
            this.list = el(".list"),
            el(".button-container",
                el("button", "구매 진행", {
                    click: async () => {
                        await PFPStoreContract.buy(addr, ids);
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
            const id = this.ids[index];
            const result = await superagent.get(`https://api.klu.bs/pfp/${addr}/${id}/proxy`);
            const img = result.body.image;
            const saleInfo = await PFPStoreContract.sales(addr, id);
            this.list.append(el("section",
                img === undefined ? undefined : el("img", {
                    src: img.indexOf("ipfs://") === 0 ? `https://api.klu.bs/ipfsimage/${img.substring(7)}` : img,
                }),
                el(".info",
                    el(".name", result.body.name),
                    el("label",
                        el("span", "판매 가격"),
                        saleInfo.price.eq(0) === true ? undefined : el(".price",
                            el("img", { src: "/images/mix.png", height: "24" }),
                            el("span", CommonUtil.numberWithCommas(utils.formatEther(saleInfo.price))),
                        ),
                    ),
                ),
            ));
        }
        this.loading.delete();
    }
}
