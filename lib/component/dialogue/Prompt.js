"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Prompt extends skynode_1.Popup {
    constructor(title, message, confirmTitle, confirm) {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".dialogue.prompt", (0, skynode_1.el)("h4", title), (0, skynode_1.el)("hr.divider"), (0, skynode_1.el)("p", message), this.input = (0, skynode_1.el)("input.input"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button.button-text", "취소", {
            click: () => this.delete(),
        }), (0, skynode_1.el)("button.button-text", confirmTitle, {
            click: () => {
                confirm(this.input.domElement.value);
                this.delete();
            },
        }))));
    }
}
exports.default = Prompt;
//# sourceMappingURL=Prompt.js.map