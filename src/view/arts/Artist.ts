import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../../CommonUtil";
import ArtNFTCard from "../../component/ArtNFTCard";
import Loading from "../../component/loading/Loading";
import ArtistsContract from "../../contracts/ArtistsContract";
import ArtsContract from "../../contracts/ArtsContract";
import Layout from "../Layout";

export default class Artist implements View {

    private container: DomNode;

    private nftLoading!: Loading;
    private nftList!: DomNode;

    constructor(params: ViewParams) {
        Layout.current.content.append(this.container = el(".artist-view"));
        this.load(params.address);
    }

    private async load(address: string) {
        const extras = await ArtistsContract.extras(address);
        let data: any = {};
        try {
            data = JSON.parse(extras);
        } catch (e) {
            console.log(e);
        }

        const artistName = data.name !== undefined ? data.name : CommonUtil.shortenAddress(address);
        Layout.current.title = artistName;
        Layout.current.content.append(this.container = el(".artist-view",
            el("header",
                el(".info",
                    el("p", msg("ARTIST_TITLE")),
                    el("h1", artistName),
                    el(".social",
                        data.twitter === undefined ? undefined : el("a",
                            el("img", { src: "/images/icon/twitter.svg", height: 24 }),
                            { href: data.twitter.indexOf("https://twitter.com") === -1 ? `https://twitter.com/${data.twitter}` : data.twitter, target: "_blank" },
                        ),
                    )
                ),
            ),
            el(".content",
                el("h2", msg("ARTIST_ART_LIST_TITLE")),
                el(".list-container",
                    this.nftLoading = new Loading(),
                    this.nftList = el(".list"),
                ),
            ),
        ));

        this.nftLoading.show();
        this.nftList.empty();

        const ids: number[] = [];

        const totalSupply = (await ArtsContract.artistArtCount(address)).toNumber();
        const promises: Promise<void>[] = [];
        for (let i = 0; i < totalSupply; i += 1) {
            const promise = async (index: number) => {
                try {
                    const id = (await ArtsContract.artistArts(address, index)).toNumber();
                    ids.push(id);
                } catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        for (const id of ids) {
            new ArtNFTCard(id).appendTo(this.nftList);
        }

        this.nftLoading.hide();
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(params.address);
    }

    public close(): void {
        this.container.delete();
    }
}
