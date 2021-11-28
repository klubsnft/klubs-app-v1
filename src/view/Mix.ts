import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import CommonUtil from "../CommonUtil";
import Prompt from "../component/dialogue/Prompt";
import KlayswapContract from "../contracts/KlayswapContract";
import Layout from "./Layout";

export default class Mix implements View {

    private container: DomNode;
    private priceDisplay: DomNode;

    constructor() {
        Layout.current.title = "Mix";
        Layout.current.content.append(this.container = el(".mix-view",
            el("h1", "MIX"),
            el("img", { src: "/images/mix.png", height: "200" }),
            el(".price",
                el("span", "1 MIX = "),
                this.priceDisplay = el("span"),
                el("span", "원"),
            ),
            el("a.buy-mix-button", "MIX 구매하기", {
                click: () => new Prompt("믹스 구매", "몇 MIX를 구매하시겠습니까?", "믹스 구매", async (amount) => {
                    const mix = utils.parseEther(amount);
                    await KlayswapContract.buyMix(mix);
                }),
            }),
            el("p", "MIX는 NFT 프로젝트들의 허브를 위한 토큰입니다."),
            el("a.whitepaper-button", "MIX 백서 보기", { href: "https://medium.com/dogesoundclub/dsc-mix-nft-%ED%97%88%EB%B8%8C%EB%A5%BC-%EC%9C%84%ED%95%9C-%ED%86%A0%ED%81%B0-3299dd3a8d1d", target: "_blank" }),
        ));
        this.loadPrice();
    }
    private async loadPrice() {
        const result = await superagent.get("https://api.klu.bs/mix/price");
        this.priceDisplay.empty().append(CommonUtil.numberWithCommas(result.text));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
