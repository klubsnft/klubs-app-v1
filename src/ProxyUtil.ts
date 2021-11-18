import superagent from "superagent";

class ProxyUtil {

    public imageSRC(src: string) {
        return src.indexOf("ipfs://") === 0 ? `https://api.klu.bs/ipfsimage/${src.substring(7)}` : src;
    }

    public async loadURL(url: string) {
        let result: any;
        try {
            result = await superagent.get(url);
        } catch (e) {
            result = await superagent.get("https://api.klu.bs/pfp/proxy").query({ url });
        }
        return result.body;
    }
}

export default new ProxyUtil();
