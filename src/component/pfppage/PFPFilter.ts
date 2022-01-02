import { DomNode, el } from "@hanul/skynode";
import RarityInfo from "../../RarityInfo";
import PFPPage from "../../view/pfp/page/PFPPage";

export default class PFPFilter extends DomNode {

    private idInput: DomNode<HTMLInputElement>;
    private filtered: { [key: string]: number[] } = {};

    constructor(private pageView: PFPPage) {
        super(".pfp-filter");
        this.append(
            this.idInput = el("input", {
                placeholder: "ID로 검색",
                change: () => pageView.loadNFTs(),
            }),
        );
    }

    public createFilters(rarity: RarityInfo) {
        const selects: DomNode<HTMLSelectElement>[] = [];
        this.append(
            ...Object.entries(rarity.traits).map(([trait, values]) => {
                const none = values[""];
                const select = el("select",
                    {
                        placeholder: trait,
                        change: (event, select) => {
                            const value = (select.domElement as HTMLSelectElement).value;
                            if (value === "All") {
                                delete this.filtered[trait];
                            } else {
                                Object.assign(this.filtered, { [trait]: values[value].ids });
                            }
                            this.pageView.loadNFTs();
                        },
                    },
                    el("option", trait, { value: "All" }),
                    el("option", `None (${none.count})`, { value: "" }),
                    ...Object.entries(values).sort((a, b) => a[1].count - b[1].count).map(([value, r]) => {
                        if (value !== "") {
                            return el("option", `${value} (${r.count})`, { value });
                        }
                    }),
                );
                selects.push(select as any);
                return select;
            }),
            el("a.reset-button", "필터 초기화", {
                click: () => {
                    this.filtered = {};
                    for (const select of selects) {
                        select.domElement.value = "All";
                    }
                    this.pageView.loadNFTs();
                },
            }),
        );
    }

    public get filteredIds() {
        const id = parseInt(this.idInput.domElement.value);
        if (isNaN(id) !== true) {
            return [id];
        } else if (Object.values(this.filtered).length > 0) {
            let result: number[] | undefined = undefined;
            for (const ids of Object.values(this.filtered)) {
                if (result === undefined) {
                    result = ids;
                } else {
                    result = result.filter(x => ids.includes(x));
                }
            }
            return result;
        }
    }
}
