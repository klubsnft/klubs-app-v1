import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { utils } from "ethers";
import EventContainer from "eventcontainer";
import QRCode from "qrcode";
import KlipQRPopup from "../component/KlipQRPopup";
import Store from "../Store";

const klipSDK = require("klip-sdk");

class Klip extends EventContainer {

    public store = new Store("klip-store");

    public get address() {
        return this.store.get("address");
    }

    public set address(address: string | undefined) {
        this.store.set("address", address, true);
    }

    private async request(res: any): Promise<any> {

        let qrPopup: KlipQRPopup | undefined;
        klipSDK.request(res.request_key, async () => {
            const qr = await QRCode.toDataURL(`https://klipwallet.com/?target=/a2a?request_key=${res.request_key}`);
            qrPopup = new KlipQRPopup(qr);
        });

        return new Promise((resolve) => {
            const interval = setInterval(async () => {
                const result = await klipSDK.getResult(res.request_key);
                if (result.result !== undefined) {
                    qrPopup?.delete();
                    clearInterval(interval);
                    resolve(result.result);
                }
            }, 1000);
        });
    }

    public get connected() {
        return this.address !== undefined;
    }

    public async connect() {
        const res = await klipSDK.prepare.auth({ bappName: "Klubs" });
        this.address = (await this.request(res)).klaytn_address;
        this.fireEvent("connect");
    }

    public async runContractMethod(address: string, abi: any, _params: any[], value?: BigNumberish) {

        const params: any[] = [];
        for (const param of _params) {
            if (param instanceof BigNumber) {
                params.push(param.toString());
            } else {
                params.push(param);
            }
        }

        const res = await klipSDK.prepare.executeContract({
            bappName: "Klubs",
            to: address,
            abi: JSON.stringify(abi),
            params: JSON.stringify(params),
            value: utils.parseEther((value === undefined ? 0 : value).toString()).toString(),
        });
        await this.request(res);
    }

    public async disconnect() {
        this.address = undefined;
        location.reload();
    }
}

export default new Klip();
