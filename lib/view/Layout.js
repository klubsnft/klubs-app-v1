"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MobileMenu_1 = __importDefault(require("../component/menu/MobileMenu"));
const PCMenu_1 = __importDefault(require("../component/menu/PCMenu"));
const UserInfo_1 = __importDefault(require("../component/menu/UserInfo"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append((this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header", (0, skynode_1.el)("a", { click: () => ViewUtil_1.default.go("/") }, (0, skynode_1.el)(".logo", (0, skynode_1.el)("img", { src: "/images/logo.svg", height: "28" }), (0, skynode_1.el)("span", "0.5"))), new PCMenu_1.default(), (0, skynode_1.el)(".right", new UserInfo_1.default(), (0, skynode_1.el)("a.menu-button", (0, skynode_1.el)("i.fas.fa-bars"), {
            click: (event, button) => {
                const rect = button.rect;
                new MobileMenu_1.default({ left: rect.right - 170, top: rect.bottom }).appendTo(skynode_1.BodyNode);
            },
        }), (0, skynode_1.el)("a.mix-button", (0, skynode_1.el)("img", { src: "/images/mix-with-text.png", height: "28" }), { click: () => ViewUtil_1.default.go("/mix") }))), (0, skynode_1.el)("main", (this.content = (0, skynode_1.el)(".content"))), (0, skynode_1.el)("footer", "Copyright © 2021 Klubs. All rights reserved.", (0, skynode_1.el)(".sns", (0, skynode_1.el)("a", { href: "https://discord.gg/mPanAs3s4w", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/icon/discord-footer.svg" })), (0, skynode_1.el)("a", { href: "https://open.kakao.com/o/gfsahfHd", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/icon/kakao-talk-footer.svg" })))))));
    }
    set title(title) {
        document.title = `Klubs - ${title}`;
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map