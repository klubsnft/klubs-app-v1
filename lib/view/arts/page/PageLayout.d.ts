import { DomNode } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
export default class PageLayout implements View {
    static current: PageLayout;
    private container;
    private controller;
    content: DomNode;
    constructor();
    private connectHandler;
    private load;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=PageLayout.d.ts.map