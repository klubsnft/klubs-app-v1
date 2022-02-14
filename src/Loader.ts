import superagent from "superagent";

class Loader {

    public async loadPFPMetadata(addr: string, id: number) {
        let result = await superagent.get(`https://api.klu.bs/v2/pfp/${addr}/${id}/metadata`);
        return result.body;
    }

    public async cachePFPMetadata(addr: string, id: number) {
        let result = await superagent.get(`https://api.klu.bs/v2/pfp/${addr}/${id}/metadata/cache`);
        return result.body;
    }

    public async loadPFPRarity(addr: string) {
        let result = await superagent.get(`https://api.klu.bs/v2/pfp/${addr}/rarity`);
        return result.body;
    }

    public async loadMetaverseItemMetadata(addr: string, id: number) {
        let result = await superagent.get(`https://api.klu.bs/metaverseitem/${addr}/${id}/metadata`);
        return result.body;
    }

    public async cacheMetaverseItemMetadata(addr: string, id: number) {
        let result = await superagent.get(`https://api.klu.bs/metaverseitem/${addr}/${id}/metadata/cache`);
        return result.body;
    }
}

export default new Loader();
