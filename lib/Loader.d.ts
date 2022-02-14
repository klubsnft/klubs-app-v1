declare class Loader {
    loadPFPMetadata(addr: string, id: number): Promise<any>;
    cachePFPMetadata(addr: string, id: number): Promise<any>;
    loadPFPRarity(addr: string): Promise<any>;
    loadMetaverseItemMetadata(addr: string, id: number): Promise<any>;
    cacheMetaverseItemMetadata(addr: string, id: number): Promise<any>;
}
declare const _default: Loader;
export default _default;
//# sourceMappingURL=Loader.d.ts.map