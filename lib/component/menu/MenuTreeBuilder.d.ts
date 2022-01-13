import { DomNode } from "@hanul/skynode";
interface Menu {
    uri?: string;
    href?: string;
    key: string;
    children?: {
        uri?: string;
        href?: string;
        key: string;
    }[];
}
declare class MenuTreeBuilder {
    build(menus: Menu[], parent?: Menu): DomNode<HTMLElement>;
}
declare const _default: MenuTreeBuilder;
export default _default;
//# sourceMappingURL=MenuTreeBuilder.d.ts.map