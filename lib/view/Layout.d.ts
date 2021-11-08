import { DomNode } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
export default class Layout implements View {
    static current: Layout;
    private container;
    content: DomNode;
    private connectWalletButton;
    private addressDisplay;
    constructor();
    private connectHandler;
    private loadAddress;
    set title(title: string);
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Layout.d.ts.map