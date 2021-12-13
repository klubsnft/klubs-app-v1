import { DomNode } from "@hanul/skynode";
export default class MultiplePFPSelector extends DomNode {
    private selectedCount;
    private selectedIds;
    constructor(addr: string, multiple: "sell" | "buy");
    select(id: number): void;
    selecting(id: number): boolean;
    deselect(id: number): void;
    private update;
}
//# sourceMappingURL=MultiplePFPSelector.d.ts.map