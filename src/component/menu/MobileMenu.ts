import { ClosableFloatingDomNode, Position } from "@hanul/skynode";
import menu from "./menu.json";
import MenuTreeBuilder from "./MenuTreeBuilder";
import UserInfo from "./UserInfo";

export default class MobileMenu extends ClosableFloatingDomNode {

    constructor(position: Position) {
        super(position, ".mobile-menu");
        this.append(
            MenuTreeBuilder.build(menu.menu),
            new UserInfo(true),
        );
        this.onDom("click", () => this.delete());
    }
}
