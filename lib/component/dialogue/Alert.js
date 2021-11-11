"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Alert extends skynode_1.Popup {
    constructor(title, message, confirmTitle) {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".dialogue.alert", (0, skynode_1.el)("h4", title), (0, skynode_1.el)("hr.divider"), (0, skynode_1.el)("p", message), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button.button-text", confirmTitle, {
            click: () => this.delete(),
        }))));
    }
}
exports.default = Alert;
//# sourceMappingURL=Alert.js.map