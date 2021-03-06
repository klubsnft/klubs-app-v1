import { View, ViewParams } from "skyrouter";
export default class Update implements View {
    private container;
    private bannerPreview;
    private bannerInput;
    private iconPreview;
    private iconInput;
    private nameInput;
    private descriptionTextarea;
    private twitterInput;
    private kakaotalkInput;
    private kakaotalkInput2;
    private kakaotalkInput3;
    private linktreeInput;
    private homepageInput;
    private discordInput;
    private telegramInput;
    private hidingCheckbox;
    private enumerableCheckbox;
    private totalSupplyLabel;
    private totalSupplyInput;
    private mineableCheckbox;
    private miningInfoURLLabel;
    private miningInfoURLInput;
    private royaltyInput;
    private royaltyReceiverInput;
    private managerList;
    constructor(params: ViewParams);
    private load;
    private loadTotalSupply;
    private loadRoyalty;
    private loadManagers;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Update.d.ts.map