import { BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import Config from "../../Config";
import ArtsContract from "../../contracts/ArtsContract";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class AcceptOfferPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private list: DomNode;

    constructor(private id: number, private offerId: BigNumberish) {
        super(".popup-background");
        this.append(this.content = el(".popup.art-accept-offer-popup",
            el("h2", "제안 수락하기"),
            el("p", "보유중인 NFT에 제안된 가격을 수락합니다. 최초 수락시에는 2번의 트랜잭션이 발생합니다. 한번은 NFT 사용 허락을 위한 것이며, 다른 하나는 실제 수락을 위한 것입니다. 수락하는 즉시 거래가 완료됩니다."),
            this.loading = new Loading(),
            this.list = el(".list"),
            el(".button-container",
                el("button", "제안 수락", {
                    click: async () => {
                        await ArtStoreContract.acceptOffer(id, offerId);
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
        const result = await superagent.get(`https://api.klu.bs/arts/${this.id}`);
        const data = result.body;
        const img = data.image;
        const offerInfo = await ArtStoreContract.offers(this.id, this.offerId);
        const royalty = await ArtsContract.royalties(this.id);
        this.list.append(el("section",
            img === undefined ? undefined : new NFTDisplay(img),
            el(".info",
                el(".name", data.name),
                el("label",
                    el("span", `제안 가격 (원작자 2차 판매 수수료: ${royalty.toNumber() / 100}%, Klubs 수수료 ${Config.fee}% 포함)`),
                    offerInfo.price.eq(0) === true ? undefined : el(".price",
                        el("img", { src: "/images/mix.png", height: "24" }),
                        el("span", CommonUtil.numberWithCommas(utils.formatEther(offerInfo.price))),
                    ),
                ),
            ),
        ));
        this.loading.delete();
    }
}
