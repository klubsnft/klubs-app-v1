import { BigNumber } from "@ethersproject/bignumber";

class Klaytn {

    private caver = (window as any).caver !== undefined ? undefined :
        new (window as any).Caver("https://api.dogesound.club:9013/");

    public createContract(address: string, abi: any) {
        return this.caver === undefined ?
            new (window as any).caver.klay.Contract(abi, address) :
            this.caver.contract.create(abi, address);
    }

    public async balanceOf(address: string) {
        return this.caver === undefined ?
            BigNumber.from(await (window as any).caver.klay.getBalance(address)) :
            BigNumber.from(await this.caver.klay.getBalance(address));
    }
}

export default new Klaytn();
