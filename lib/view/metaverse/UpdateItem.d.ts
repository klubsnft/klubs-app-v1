import { View, ViewParams } from "skyrouter";
export default class UpdateItem implements View {
    private container;
    private changeTypeButton;
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
    private enumarableForm;
    private enumerableCheckbox;
    private totalSupplyLabel;
    private totalSupplyInput;
    constructor(params: ViewParams);
    private load;
    private loadTotalSupply;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=UpdateItem.d.ts.map