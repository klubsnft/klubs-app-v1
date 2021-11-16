"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MobileMenu_1 = __importDefault(require("../component/menu/MobileMenu"));
const PCMenu_1 = __importDefault(require("../component/menu/PCMenu"));
const UserMenu_1 = __importDefault(require("../component/menu/UserMenu"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append((this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header", (0, skynode_1.el)("a", (0, skynode_1.el)(".logo", (0, skynode_1.el)("img", { src: "/images/logo.svg", height: "28" })), { click: () => ViewUtil_1.default.go("/") }), new PCMenu_1.default(), (0, skynode_1.el)(".right", new UserMenu_1.default(), (0, skynode_1.el)("a.menu-button", (0, skynode_1.el)("i.fas.fa-bars"), {
            click: (event, button) => {
                const rect = button.rect;
                new MobileMenu_1.default({ left: rect.right - 170, top: rect.bottom }).appendTo(skynode_1.BodyNode);
            },
        }))), (0, skynode_1.el)("main", (this.content = (0, skynode_1.el)(".content"))), (0, skynode_1.el)("footer", "Copyright © 2021 Klubs. All rights reserved."))));
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