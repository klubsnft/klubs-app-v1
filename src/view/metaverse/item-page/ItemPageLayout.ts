import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import xss from "xss";
import MetaversesContract, { ItemType } from "../../../contracts/MetaversesContract";
import KIP17Contract from "../../../contracts/standard/KIP17Contract";
import KIP37Contract from "../../../contracts/standard/KIP37Contract";
import Wallet from "../../../klaytn/Wallet";
import Loader from "../../../Loader";
import RarityInfo from "../../../RarityInfo";
import Layout from "../../Layout";
import ViewUtil from "../../ViewUtil";

export default class ItemPageLayout implements View {

    public static current: ItemPageLayout;
    private static rarities: { [addr: string]: RarityInfo } = {};

    public static async loadRarity(addr: string): Promise<RarityInfo | undefined> {
        if (this.rarities[addr] === undefined) {
            const rarity = await Loader.loadPFPRarity(addr);
            if (rarity !== null) {
                rarity.rankings = {};
                const all = Object.entries(rarity.scores);
                all.sort((a: any, b: any) => b[1] - a[1]);
                for (const [index, [id]] of all.entries()) {
                    rarity.rankings[parseInt(id, 10)] = index;
                }
                this.rarities[addr] = rarity;
            }
        }
        return this.rarities[addr];
    }

    private currentMetaverseId: number | undefined;
    private currentAddr: string | undefined;
    public contract!: KIP17Contract | KIP37Contract;

    private container: DomNode;
    public content: DomNode;

    private header: DomNode;
    private iconDisplay: DomNode<HTMLImageElement>;
    private nameDisplay: DomNode;
    private descriptionDisplay: DomNode;
    private miningInfoDisplay: DomNode;
    private socialList: DomNode;

    constructor(params: ViewParams) {
        ItemPageLayout.current = this;
        Layout.current.title = msg("METAVERSE_ITEM_DETAIL_INFO_TITLE");
        Layout.current.content.append(this.container = el(".metaverse-item-page-layout",
            this.header = el("header",
                this.iconDisplay = el("img"),
                el(".body",
                    this.nameDisplay = el("h1"),
                    this.descriptionDisplay = el("p"),
                    this.miningInfoDisplay = el("p"),
                    this.socialList = el(".social"),
                ),
            ),
            this.content = el("main"),
        ));
        this.load(parseInt(params.metaverseId, 10), params.addr);
    }

    private async load(metaverseId: number, addr: string) {
        if (metaverseId !== this.currentMetaverseId || addr !== this.currentAddr) {
            const itemType = await MetaversesContract.itemTypes(metaverseId, addr);
            this.contract = itemType === ItemType.ERC721 ? new KIP17Contract(addr) : new KIP37Contract(addr);
            this.loadInfo(metaverseId, addr);
            this.loadUpdateButton(metaverseId, addr);
            this.currentMetaverseId = metaverseId;
            this.currentAddr = addr;
        }
    }

    private async loadInfo(metaverseId: number, addr: string) {
        const extras = await MetaversesContract.itemExtras(metaverseId, addr);
        try {
            const data: any = JSON.parse(extras);
            if (data.icon === undefined || data.icon.trim() === "") {
                this.iconDisplay.domElement.src = "/images/placeholder.svg";
            } else {
                this.iconDisplay.domElement.src = data.icon;
            }
            if (data.name !== undefined) {
                Layout.current.title = data.name;
                this.nameDisplay.empty().appendText(data.name);
            }
            if (data.description !== undefined) {
                this.descriptionDisplay.domElement.innerHTML = xss(marked(data.description));
            }
            if (data.mineable === true) {
                this.miningInfoDisplay.empty().append(
                    el("a.mining",
                        el("img", { src: "/images/icon/mining.png", height: "14" }),
                        el("span", msg("MINING_METAVERSE_ITEM")),
                        {
                            title: msg("MINING_METAVERSE_ITEM_DESCRIPTION"),
                            href: data.miningInfoURL,
                            target: "_blank",
                            click: (event: MouseEvent) => event.stopPropagation(),
                        },
                    ),
                );
            }
            this.socialList.empty();
            if (data.twitter !== undefined && data.twitter.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/twitter.svg", height: 24 }),
                        { href: data.twitter, target: "_blank" },
                    ),
                );
            }
            if (data.linktree !== undefined && data.linktree.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/linktree.svg", height: 24 }),
                        { href: data.linktree, target: "_blank" },
                    ),
                );
            }
            if (data.homepage !== undefined && data.homepage.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/homepage.svg", height: 24 }),
                        { href: data.homepage, target: "_blank" },
                    ),
                );
            }
            if (data.discord !== undefined && data.discord.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/discord.svg", height: 24 }),
                        { href: data.discord, target: "_blank" },
                    ),
                );
            }
            if (data.telegram !== undefined && data.telegram.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/telegram.svg", height: 24 }),
                        { href: data.telegram, target: "_blank" },
                    ),
                );
            }
            if (data.kakaotalk !== undefined && data.kakaotalk.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/kakao-talk.svg", height: 24 }),
                        { href: data.kakaotalk, target: "_blank" },
                    ),
                );
            }
            if (data.kakaotalk2 !== undefined && data.kakaotalk2.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/kakao-talk.svg", height: 24 }),
                        { href: data.kakaotalk2, target: "_blank" },
                    ),
                );
            }
            if (data.kakaotalk3 !== undefined && data.kakaotalk3.trim() !== "") {
                this.socialList.append(
                    el("a",
                        el("img", { src: "/images/icon/kakao-talk.svg", height: 24 }),
                        { href: data.kakaotalk3, target: "_blank" },
                    ),
                );
            }

        } catch (e) {
            console.log(e);
        }
    }

    private async loadUpdateButton(metaverseId: number, addr: string) {
        try {
            const address = await Wallet.loadAddress();
            if (address !== undefined && await MetaversesContract.existsManager(metaverseId, address) === true) {
                el("button.update-button", msg("UPDATE_METAVERSE_ITEM_INFO_BUTTON"), {
                    click: () => ViewUtil.go(`/metaverse/${metaverseId}/item/${addr}/update`),
                }).appendTo(this.header);
            }
        } catch (e) {
            console.log(e);
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(parseInt(params.metaverseId, 10), params.addr);
    }

    public close(): void {
        this.container.delete();
    }
}
