"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Prompt extends skynode_1.Popup {
    constructor(title, message, confirmTitle, confirm) {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".dialogue.prompt", (0, skynode_1.el)("h3", title), (0, skynode_1.el)("p", message), this.input = (0, skynode_1.el)("input.input"), (0, skynode_1.el)("a.cancel-button", "취소", {
            click: () => this.delete(),
        }), (0, skynode_1.el)("a.confirm-button", confirmTitle, {
            click: () => {
                confirm(this.input.domElement.value);
                this.delete();
            },
        })));
    }
}
exports.default = Prompt;
//# sourceMappingURL=Prompt.js.map