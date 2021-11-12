import { View, ViewParams } from "skyrouter";
export default class Update implements View {
    private container;
    private bannerPreview;
    private bannerInput;
    private iconPreview;
    private iconInput;
    private nameInput;
    private descriptionInput;
    private twitterInput;
    private kakaotalkInput;
    private managerList;
    constructor(params: ViewParams);
    private loadManagers;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Update.d.ts.map