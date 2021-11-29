import superagent from "superagent";

class Loader {

    public async loadMetadata(addr: string, id: number) {
        let result = await superagent.get(`https://api.klu.bs/v2/pfp/${addr}/${id}/metadata`);
        return result.body;
    }

    public async cacheMetadata(addr: string, id: number) {
        let result = await superagent.get(`https://api.klu.bs/v2/pfp/${addr}/${id}/metadata/cache`);
        return result.body;
    }

    public async loadRarity(addr: string) {
        let result = await superagent.get(`https://api.klu.bs/v2/pfp/${addr}/rarity`);
        return result.body;
    }
}

export default new Loader();
