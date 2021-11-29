declare class Loader {
    loadMetadata(addr: string, id: number): Promise<any>;
    cacheMetadata(addr: string, id: number): Promise<any>;
    loadRarity(addr: string): Promise<any>;
}
declare const _default: Loader;
export default _default;
//# sourceMappingURL=Loader.d.ts.map