"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const BrowserInfo_1 = __importDefault(require("../BrowserInfo"));
const MobileMenu_1 = __importDefault(require("../component/menu/MobileMenu"));
const PCMenu_1 = __importDefault(require("../component/menu/PCMenu"));
const UserInfo_1 = __importDefault(require("../component/menu/UserInfo"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Layout {
    constructor() {
        Layout.current = this;
        let select;
        skynode_1.BodyNode.append((this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header", (0, skynode_1.el)("a", { click: () => ViewUtil_1.default.go("/") }, (0, skynode_1.el)(".logo", (0, skynode_1.el)("img", { src: "/images/logo.svg", height: "28" }), (0, skynode_1.el)("span", "0.7"))), new PCMenu_1.default(), (0, skynode_1.el)(".right", new UserInfo_1.default(), (0, skynode_1.el)("a.menu-button", (0, skynode_1.el)("i.fas.fa-bars"), {
            click: (event, button) => {
                const rect = button.rect;
                new MobileMenu_1.default({ left: rect.right - 170, top: rect.bottom }).appendTo(skynode_1.BodyNode);
            },
        }), (0, skynode_1.el)("a.mix-button", (0, skynode_1.el)("img", { src: "/images/mix-with-text.png", height: "28" }), { click: () => ViewUtil_1.default.go("/mix") }), select = (0, skynode_1.el)("select.language-select", (0, skynode_1.el)("option", "KO", { value: "ko" }), (0, skynode_1.el)("option", "EN", { value: "en" }), (0, skynode_1.el)("option", "JP", { value: "ja" }), {
            change: () => {
                BrowserInfo_1.default.changeLanguage(select.domElement.value);
            },
        }))), (0, skynode_1.el)("main", (this.content = (0, skynode_1.el)(".content"))), (0, skynode_1.el)("footer", (0, skynode_1.el)(".sns", (0, skynode_1.el)("a", { href: "https://open.kakao.com/o/gfsahfHd", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/icon/kakao-talk-footer.svg" })), (0, skynode_1.el)("a", { href: "https://twitter.com/klubsnft", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/icon/twitter-footer.svg" })), (0, skynode_1.el)("a", { href: "https://t.me/+wd1LmX2DHjM4MTU1", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/icon/telegram-footer.svg" })), (0, skynode_1.el)("a", { href: "https://discord.gg/mPanAs3s4w", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/icon/discord-footer.svg" }))), "Copyright © 2021 Klubs. All rights reserved."))));
        select.domElement.value = BrowserInfo_1.default.language.substring(0, 2);
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