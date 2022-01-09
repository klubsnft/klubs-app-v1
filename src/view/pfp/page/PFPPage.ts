export default interface PFPPage {
    get addr(): string;
    loadNFTs(): void;
    goPage(page: number): void;
    toggleRarityMode(): void;
}