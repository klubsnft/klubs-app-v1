"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class Proposal {
    constructor() {
        Layout_1.default.current.title = "등록을 기다리는 PFP 정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-proposal-view"));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Proposal;
//# sourceMappingURL=Proposal.js.map