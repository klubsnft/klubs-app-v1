import { View, ViewParams } from "skyrouter";
export default class UpdateArt implements View {
    private container;
    private imagePreview;
    private imageInput;
    private nameInput;
    private descriptionTextarea;
    private externalURLInput;
    private exceptionalRoyaltiesCheckbox;
    private exceptionalRoyaltyLabel;
    private exceptionalRoyaltyInput;
    constructor(params: ViewParams);
    private load;
    private loadExceptionalRoyalty;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=UpdateArt.d.ts.map