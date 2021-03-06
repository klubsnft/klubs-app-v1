"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const BuyPopup_1 = __importDefault(require("../../component/BuyPopup"));
const OfferPopup_1 = __importDefault(require("../../component/OfferPopup"));
const KIP17Contract_1 = __importDefault(require("../../contracts/standard/KIP17Contract"));
const Layout_1 = __importDefault(require("../Layout"));
class NFTDetail_old {
    constructor(params) {
        const addr = params.addr;
        this.contract = new KIP17Contract_1.default(addr);
        Layout_1.default.current.title = "NFT 상세정보";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".pfp-nft-detail-view", (0, skynode_1.el)(".image-view", (0, skynode_1.el)("img.pfp-image", { src: "/images/galaxies.png" }), (0, skynode_1.el)("button.button-contained", "구매하기", {
            click: () => {
                new BuyPopup_1.default();
            },
        }), (0, skynode_1.el)(".label", "제안 가격"), (0, skynode_1.el)("input", {
            placeholder: '... MIX'
        }), (0, skynode_1.el)("button.button-contained", "제안하기", {
            click: () => {
                new OfferPopup_1.default();
            },
        })), (0, skynode_1.el)(".over-view", (0, skynode_1.el)("a.project", "Doge Sound Clubs"), (0, skynode_1.el)(".pfp", "Robot Hoodie #9748"), (0, skynode_1.el)(".pfp-info", (0, skynode_1.el)(".owner", "소유자는", (0, skynode_1.el)(".owner-by", "dilrong"))), (0, skynode_1.el)(".description", (0, skynode_1.el)(".title", "설명"), (0, skynode_1.el)("hr.divider"), (0, skynode_1.el)("span.body", `DSC MATES가 무엇인가요?
                - dsc mates는 10,000개의 모양이 모두 제각기 다른 캐릭터로 24*24 픽셀 아트입니다.
                - 10,000개의 제각기 다른 모습의 메이트를 생성하기 위해 10개의 얼굴 그리고 80여 개의 특성을 조합했습니다. 똑같은 것은 없습니다. 특성에 따른 메이트 정보는 본 홈페이지의 gallery에서 조회하실 수 있습니다.
                - 10,000개의 메이트 모두 같은 조건 아래에서 무작위로 생성되었습니다. 인위적으로 희귀하게 생성된 것은 없습니다.
                
                소유권 (nft 초보자를 위한 설명)
                메이트에 대한 소유권 정보는 클레이튼 블록체인에 기록되어 있습니다.
                
                원활한 소유권 거래를 위해 10,000개의 암호화폐를 발행을 하였습니다. 쪼개지지 않는 이 10,000개의 암호화폐는 각각 0~9999까지 고유한 번호를 가지고 있습니다. 고유번호를 가지고 있는 한 개의 암호화폐에 메이트 한 개를 연결했습니다. 때문에 귀하의 암호화폐 지갑에 DSC MATES의 정보를 담은 암호화폐 13번이 있다면, 귀하는 13번 메이트의 명백한 주인임이 증명됩니다. 암호화폐와 메이트의 연결은 고정불변으로, 영원히 수정되지 않도록 만들어져 있습니다.
                이러한 방식의 소유권 증명은 암호화폐 기술과 같은 근본을 가지고 있습니다. 누구도 이를 조작할 수 없기에, 제 3자의 중개없이 안전한 거래를 가능케 합니다.`)))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = NFTDetail_old;
//# sourceMappingURL=NFTDetail_old.js.map