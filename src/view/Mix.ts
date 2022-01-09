import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import msg from "msg.js";
import CommonUtil from "../CommonUtil";
import Prompt from "../component/dialogue/Prompt";
import KlayswapContract from "../contracts/KlayswapContract";
import Layout from "./Layout";

export default class Mix implements View {

    private container: DomNode;
    private priceDisplay: DomNode;

    constructor() {
        Layout.current.title = msg("MIX");
        Layout.current.content.append(this.container = el(".mix-view",
            el("h1", msg("MIX")),
            el("img", { src: "/images/mix.png", height: "200" }),
            el(".price",
                el("span", "1 MIX = "),
                this.priceDisplay = el("span"),
                el("span", "원"),
            ),
            el("a.buy-mix-button", msg("BUYING_MIX"), {
                click: () => new Prompt(msg("BUY_MIX"), msg("HOW_TO_BUY_MIX"), msg("BUY_MIX"),
                    async (amount) => {
                        const mix = utils.parseEther(amount);
                        await KlayswapContract.buyMix(mix);
                    }),
            }),
            el("p", msg("MIX_DESC1")),
            el("a.whitepaper-button", msg("MIX_WHITEPAPER_BUTTON"), { href: "https://medium.com/dogesoundclub/dsc-mix-nft-%ED%97%88%EB%B8%8C%EB%A5%BC-%EC%9C%84%ED%95%9C-%ED%86%A0%ED%81%B0-3299dd3a8d1d", target: "_blank" }),
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
