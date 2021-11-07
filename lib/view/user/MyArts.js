"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class MyArts {
    constructor() {
        Layout_1.default.current.title = "내 Arts";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".user-my-arts-view"));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MyArts;
//# sourceMappingURL=MyArts.js.map