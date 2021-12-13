import { DomNode, el, Popup } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class BuyPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;
    private prices: BigNumber[] = [];
    private mileages: BigNumber[] = [];

    constructor(private ids: number[]) {
        super(".popup-background");
        this.append(this.content = el(".popup.art-buy-popup",
            el("h2", "구매하기"),
            el("p", "NFT를 구매합니다. 최초 구매시에는 2번의 트랜잭션이 발생합니다. 한번은 MIX 사용 허락을 위한 것이며, 다른 하나는 실제 구매를 위한 것입니다."),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", "구매 진행", {
                    click: async () => {
                        await ArtStoreContract.buy(ids, this.prices, this.mileages);
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
        for (const id of this.ids) {
            const result = await superagent.get(`https://api.klu.bs/arts/${id}`);
            const data = result.body;
            const img = data.image;
            const saleInfo = await ArtStoreContract.sales(id);
            this.list.append(el("section",
                img === undefined ? undefined : new NFTDisplay(img),
                el(".info",
                    el(".name", data.name),
                    el("label",
                        el("span", "판매 가격"),
                        saleInfo.price.eq(0) === true ? undefined : el(".price",
                            el("img", { src: "/images/mix.png", height: "24" }),
                            el("span", CommonUtil.numberWithCommas(utils.formatEther(saleInfo.price))),
                        ),
                    ),
                ),
            ));
            this.prices.push(saleInfo.price);
            this.mileages.push(BigNumber.from(0));
        }
        this.loading.delete();
    }
}
