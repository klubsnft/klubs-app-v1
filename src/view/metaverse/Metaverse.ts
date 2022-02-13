import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import xss from "xss";
import ItemCard from "../../component/ItemCard";
import Loading from "../../component/loading/Loading";
import MetaversesContract from "../../contracts/MetaversesContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Metaverse implements View {

    private container: DomNode;
    private currentId: number | undefined;

    private header: DomNode;
    private iconDisplay: DomNode<HTMLImageElement>;
    private nameDisplay: DomNode;
    private descriptionDisplay: DomNode;
    private socialList: DomNode;

    private itemLoading: DomNode;
    private itemList: DomNode;

    constructor(params: ViewParams) {
        Layout.current.title = msg("METAVERSE_TITLE");
        Layout.current.content.append(
            this.container = el(".metaverse-view",
                this.header = el("header",
                    this.iconDisplay = el("img"),
                    el(".body",
                        this.nameDisplay = el("h1"),
                        this.descriptionDisplay = el("p"),
                        this.socialList = el(".social"),
                    ),
                ),
                el(".content",
                    el("h2", msg("METAVERSE_ITEM_LIST")),
                    this.itemLoading = new Loading(),
                    this.itemList = el(".item-list"),
                ),
            ),
        );
        this.load(parseInt(params.id, 10));
        this.loadItems(parseInt(params.id, 10));
    }

    private load(id: number) {
        if (id !== this.currentId) {
            this.loadInfo(id);
            this.loadUpdateButton(id);
            this.currentId = id;
        }
    }

    private async loadInfo(id: number) {
        const extras = await MetaversesContract.extras(id);
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

    private async loadUpdateButton(id: number) {
        try {
            const address = await Wallet.loadAddress();
            if (address !== undefined && await MetaversesContract.existsManager(id, address) === true) {
                this.header.append(el(".button-container",
                    el("button.update-button", msg("UPDATE_METAVERSE_BUTTON"), {
                        click: () => ViewUtil.go(`/metaverse/${id}/update`),
                    }),
                    el("button", msg("ADD_METAVERSE_ITEM_BUTTON"), {
                        click: () => ViewUtil.go(`/metaverse/${id}/additem`),
                    }),
                ));
            }
        } catch (e) {
            console.log(e);
        }
    }

    private async loadItems(id: number) {

        this.itemList.empty();
        const count = await MetaversesContract.getItemAddrCount(id);

        const array = new Array(count.toNumber()).fill(undefined).map((a, i) => a = i);

        const promises: Promise<void>[] = [];
        for (const i of array) {
            const promise = async (index: number) => {
                const addr = await MetaversesContract.itemAddrs(id, index);
                const extras = await MetaversesContract.itemExtras(id, addr);
                let data: any = {};
                try { data = JSON.parse(extras); } catch (e) { }
                if (data.hiding !== true && this.container.deleted !== true) {
                    new ItemCard(id, addr, data).appendTo(this.itemList);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        this.itemLoading.delete();
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(parseInt(params.id, 10));
    }

    public close(): void {
        this.container.delete();
    }
}
