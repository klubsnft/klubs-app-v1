import { ViewParams } from "skyrouter";
export default interface View {
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Page.d.ts.map