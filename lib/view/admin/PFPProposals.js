"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const PFPsContract_1 = __importDefault(require("../../contracts/PFPsContract"));
const Layout_1 = __importDefault(require("../Layout"));
class PFPProposals {
    constructor() {
        Layout_1.default.current.title = "등록을 기다리는 PFP 정보들";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".admin-pfp-proposals-view", (0, skynode_1.el)("h1", "등록을 기다리는 PFP 정보들")));
        this.load();
    }
    async load() {
        const count = await PFPsContract_1.default.proposalCount();
        for (let id = count.toNumber() - 1; id >= 0; id -= 1) {
            const proposal = await PFPsContract_1.default.proposals(id);
            const proposalDisplay = (0, skynode_1.el)(".proposal", JSON.stringify(proposal), (0, skynode_1.el)("a", "통과", {
                click: async () => {
                    await PFPsContract_1.default.passProposal(id);
                    proposalDisplay.delete();
                },
            })).appendTo(this.container);
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = PFPProposals;
//# sourceMappingURL=PFPProposals.js.map