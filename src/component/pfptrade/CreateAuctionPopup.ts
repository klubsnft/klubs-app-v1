import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import Config from "../../Config";
import PFPsContract from "../../contracts/PFPsContract";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import Klaytn from "../../klaytn/Klaytn";
import Loader from "../../Loader";
import ViewUtil from "../../view/ViewUtil";
import Alert from "../dialogue/Alert";
import Loading from "../loading/Loading";
import NFTDisplay from "../NFTDisplay";

export default class CreateAuctionPopup extends Popup {

    public content: DomNode;

    private loading: DomNode;
    private info: DomNode;
    private startPriceInput: DomNode<HTMLInputElement> | undefined;
    private endBlockInput: DomNode<HTMLInputElement> | undefined;

    constructor(private addr: string, private id: number) {
        super(".popup-background");
        this.append(this.content = el(".popup.pfp-create-auction-popup",
            el("h2", "경매 시작하기"),
            el("p", "보유중인 NFT의 경매를 시작합니다. 최초 경매 시작시에는 2번의 트랜잭션이 발생합니다. 한번은 NFT 사용 허락을 위한 것이며, 다른 하나는 실제 경매 시작을 위한 것입니다."),
            this.loading = new Loading(),
            this.info = el(".info"),
            el(".button-container",
                el("button", "경매 시작", {
                    click: async () => {
                        if (this.startPriceInput !== undefined && this.endBlockInput !== undefined) {
                            const startPrice = utils.parseEther(this.startPriceInput.domElement.value);
                            const endBlock = this.endBlockInput.domElement.value;
                            const currentBlock = await Klaytn.loadBlockNumber();
                            if (parseInt(endBlock) < currentBlock) {
                                new Alert("오류", "경매 종료 블록은 현재 블록보다 커야합니다.");
                            } else {
                                await PFPStoreContract.createAuction(addr, id, startPrice, endBlock);
                                this.delete();
                                ViewUtil.waitTransactionAndRefresh();
                            }
                        }
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
        const data = await Loader.loadMetadata(this.addr, this.id);
        const royalty = await PFPsContract.royalties(this.addr);
        const currentBlock = await Klaytn.loadBlockNumber();
        const img = data.image;
        this.info.append(
            el(".name", data.name),
            img === undefined ? undefined : new NFTDisplay(img),
            el("label",
                el("span", `경매 시작 가격 (원작자 2차 판매 수수료: ${royalty.royalty / 100}%, Klubs 수수료 ${Config.fee}% 포함)`),
                this.startPriceInput = el("input", { placeholder: "경매 시작 가격 (MIX)" }),
            ),
            el("label",
                el("span", `경매 종료 블록 (현재 블록: ${currentBlock})`),
                el("p.warning",
                    el("i.fas.fa-exclamation-triangle"),
                    "클레이튼의 블록 타임은 대략 1초입니다. 종료 시간 계산에 유의해주시기 바랍니다.",
                ),
                this.endBlockInput = el("input", { placeholder: "경매 종료 블록" }),
            ),
        );
        this.loading.delete();
    }
}
