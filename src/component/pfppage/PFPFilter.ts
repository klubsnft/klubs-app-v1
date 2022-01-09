import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import RarityInfo from "../../RarityInfo";
import Store from "../../Store";
import PFPPage from "../../view/pfp/page/PFPPage";

export default class PFPFilter extends DomNode {

    private idInput: DomNode<HTMLInputElement>;

    private filterData: { [trait: string]: string } = {};
    private filtered: { [key: string]: number[] } = {};

    private store = new Store("filter-store");

    constructor(private pageView: PFPPage) {
        super(".pfp-filter");
        this.append(
            this.idInput = el("input", {
                placeholder: msg("SEARCH_ID"),
                change: () => pageView.loadNFTs(),
            }),
        );
        const saved = this.store.get<{ [trait: string]: string }>(`${this.pageView.addr}-filter`);
        if (saved !== undefined) {
            this.filterData = saved;
        }
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
                            this.filterData[trait] = value;
                            this.store.set(`${this.pageView.addr}-filter`, this.filterData);
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

                const value = this.filterData[trait];
                if (value !== undefined) {
                    (select.domElement as HTMLSelectElement).value = value;
                    if (value === "All") {
                        delete this.filtered[trait];
                    } else {
                        Object.assign(this.filtered, { [trait]: values[value].ids });
                    }
                }

                selects.push(select as any);
                return select;
            }),
            el("a.reset-button", msg("INIT_FILLETER"), {
                click: () => {

                    this.filterData = {};
                    this.store.set(`${this.pageView.addr}-filter`, this.filterData);

                    this.filtered = {};
                    for (const select of selects) {
                        select.domElement.value = "All";
                    }
                    this.pageView.loadNFTs();
                },
            }),
        );

        if (Object.keys(this.filtered).length > 0) {
            this.pageView.loadNFTs();
        }
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
