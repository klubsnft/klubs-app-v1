import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TurntableKIP7Listeners, TurntableKIP7ListenersInterface } from "../TurntableKIP7Listeners";
export declare class TurntableKIP7Listeners__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_mixEmitter: string, _pid: BigNumberish, _turntables: string, _token: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TurntableKIP7Listeners>;
    getDeployTransaction(_mixEmitter: string, _pid: BigNumberish, _turntables: string, _token: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TurntableKIP7Listeners;
    connect(signer: Signer): TurntableKIP7Listeners__factory;
    static readonly bytecode = "0x60806040526000600655600060075561012c6009556000600a5534801561002557600080fd5b506040516080806118ba8339810180604052608081101561004557600080fd5b5080516020820151604080840151606090940151600080546001600160a01b031916331780825592519495939491926001600160a01b0316917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3600180546001600160a01b0319166001600160a01b038616908117909155604080517fbe32cf8d000000000000000000000000000000000000000000000000000000008152905163be32cf8d91600480820192602092909190829003018186803b15801561011057600080fd5b505afa158015610124573d6000803e3d6000fd5b505050506040513d602081101561013a57600080fd5b5051600280546001600160a01b03199081166001600160a01b0393841617909155600394909455600480548516938216939093179092556005805490931691161790555061172d8061018d6000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80638f32d59b116100ad578063dffeef4e11610071578063dffeef4e146102f9578063f106845414610301578063f2fde38b14610309578063fab65d161461032f578063fc0c546a1461035b57610121565b80638f32d59b1461026057806397b5795c1461027c5780639e71d4d014610299578063be32cf8d146102c5578063d9c26e46146102cd57610121565b80636ba4c138116100f45780636ba4c13814610191578063715018a61461020157806382481d49146102095780638da5cb5b146102355780638dc74f721461023d57610121565b80630ade3ac11461012657806320ff98ba1461014a5780633a98ef39146101525780634c3538861461016c575b600080fd5b61012e610363565b604080516001600160a01b039092168252519081900360200190f35b61012e610372565b61015a610381565b60408051918252519081900360200190f35b61018f6004803603604081101561018257600080fd5b5080359060200135610387565b005b61018f600480360360208110156101a757600080fd5b8101906020810181356401000000008111156101c257600080fd5b8201836020820111156101d457600080fd5b803590602001918460208302840111640100000000831117156101f657600080fd5b509092509050610587565b61018f610932565b61015a6004803603604081101561021f57600080fd5b50803590602001356001600160a01b03166109d8565b61012e6109f5565b61018f6004803603604081101561025357600080fd5b5080359060200135610a04565b610268610b7c565b604080519115158252519081900360200190f35b61018f6004803603602081101561029257600080fd5b5035610b8d565b61015a600480360360408110156102af57600080fd5b50803590602001356001600160a01b0316610c32565b61012e610ca6565b61015a600480360360408110156102e357600080fd5b50803590602001356001600160a01b0316610cb5565b61015a610e97565b61015a610e9d565b61018f6004803603602081101561031f57600080fd5b50356001600160a01b0316610ea3565b61015a6004803603604081101561034557600080fd5b50803590602001356001600160a01b0316610f0b565b61012e610f33565b6001546001600160a01b031681565b6004546001600160a01b031681565b60075481565b6004805460408051600160e01b634f558e79028152928301859052516001600160a01b0390911691634f558e79916024808301926020929190829003018186803b1580156103d457600080fd5b505afa1580156103e8573d6000803e3d6000fd5b505050506040513d60208110156103fe57600080fd5b505161040957600080fd5b610411610f42565b600754610424908263ffffffff61123b16565b6007556000828152600860209081526040808320338452909152902054610451908263ffffffff61123b16565b6000838152600860209081526040808320338452909152902055600a546104a890610482908363ffffffff61129816565b6000848152600b602090815260408083203384529091529020549063ffffffff6112f416565b6000838152600b6020908152604080832033808552908352818420949094556005548151600160e01b6323b872dd02815260048101959095523060248601526044850186905290516001600160a01b03909116936323b872dd9360648083019493928390030190829087803b15801561052057600080fd5b505af1158015610534573d6000803e3d6000fd5b505050506040513d602081101561054a57600080fd5b5050604080518281529051339184917f73a8b0f752679a82b700ed4a9a7bfad9c5ea1946677221a3d305855c194150249181900360200190a35050565b61058f610f42565b806000805b828110156109155760008585838181106105aa57fe5b90506020020135905060006105bf823361135c565b9050801561090b576000828152600c602090815260408083203384529091529020546105f1908263ffffffff61123b16565b6000838152600c6020908152604080832033808552908352928190209390935582518481529251919285927f3ed1528b0fdc7c5207c1bf935e34a667e13656b9ed165260c522be0bc544f303929181900390910190a360006106706127106106646009548561129890919063ffffffff16565b9063ffffffff61138d16565b6004805460408051600160e01b634f558e79028152928301879052519293506001600160a01b031691634f558e7991602480820192602092909190829003018186803b1580156106bf57600080fd5b505afa1580156106d3573d6000803e3d6000fd5b505050506040513d60208110156106e957600080fd5b5051156107f0576002546004805460408051600160e11b6331a9108f028152928301879052516001600160a01b039384169363a9059cbb93921691636352211e916024808301926020929190829003018186803b15801561074957600080fd5b505afa15801561075d573d6000803e3d6000fd5b505050506040513d602081101561077357600080fd5b50516040805163ffffffff841660e01b81526001600160a01b039092166004830152602482018590525160448083019260209291908290030181600087803b1580156107be57600080fd5b505af11580156107d2573d6000803e3d6000fd5b505050506040513d60208110156107e857600080fd5b506108599050565b60025460408051600160e31b630852cd8d0281526004810184905290516001600160a01b03909216916342966c689160248082019260009290919082900301818387803b15801561084057600080fd5b505af1158015610854573d6000803e3d6000fd5b505050505b6002546001600160a01b031663a9059cbb3361087b858563ffffffff6113cf16565b6040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b0316815260200182815260200192505050602060405180830381600087803b1580156108ca57600080fd5b505af11580156108de573d6000803e3d6000fd5b505050506040513d60208110156108f457600080fd5b506109079050858363ffffffff61123b16565b9450505b5050600101610594565b50600654610929908263ffffffff6113cf16565b60065550505050565b61093a610b7c565b61098e5760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b600860209081526000928352604080842090915290825290205481565b6000546001600160a01b031690565b610a0c610f42565b600754610a1f908263ffffffff6113cf16565b6007556000828152600860209081526040808320338452909152902054610a4c908263ffffffff6113cf16565b6000838152600860209081526040808320338452909152902055600a54610aa390610a7d908363ffffffff61129816565b6000848152600b602090815260408083203384529091529020549063ffffffff61141116565b6000838152600b6020908152604080832033808552908352818420949094556005548151600160e01b63a9059cbb02815260048101959095526024850186905290516001600160a01b039091169363a9059cbb9360448083019493928390030190829087803b158015610b1557600080fd5b505af1158015610b29573d6000803e3d6000fd5b505050506040513d6020811015610b3f57600080fd5b5050604080518281529051339184917fa93819135dfc321df7b15c881ff13bf1c10807a2ac83a5a4f034214fbc72923f9181900360200190a35050565b6000546001600160a01b0316331490565b610b95610b7c565b610be95760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6127108110610bf757600080fd5b60098190556040805182815290517fbb7e6695f653805a4db27ebf977658390b7fcef234bc9e9f9f67ed343b98e52d9181900360200190a150565b6000610c9d612710610664610c546009546127106113cf90919063ffffffff16565b6000878152600c602090815260408083206001600160a01b038a168452909152902054610c9190610c858989610cb5565b9063ffffffff6113cf16565b9063ffffffff61129816565b90505b92915050565b6002546001600160a01b031681565b600a546007546000919015610e8d5760025460408051600160e01b6370a082310281523060048201529051600092610dcf926001600160a01b03909116916370a0823191602480820192602092909190829003018186803b158015610d1957600080fd5b505afa158015610d2d573d6000803e3d6000fd5b505050506040513d6020811015610d4357600080fd5b505160015460035460408051600160e01b63c341a6e50281526004810192909252516001600160a01b039092169163c341a6e591602480820192602092909190829003018186803b158015610d9757600080fd5b505afa158015610dab573d6000803e3d6000fd5b505050506040513d6020811015610dc157600080fd5b50519063ffffffff61123b16565b90506000610de8600654836113cf90919063ffffffff16565b90508015610e1f57600754610e1c90610e0f9061066484600160801b63ffffffff61129816565b849063ffffffff61123b16565b92505b6000868152600b602090815260408083206001600160a01b038916808552908352818420548a855260088452828520918552925290912054610e8391600160801b916106649190610e7790889063ffffffff61129816565b9063ffffffff61141116565b9350505050610ca0565b5060009392505050565b60095481565b60035481565b610eab610b7c565b610eff5760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b610f0881611479565b50565b6000918252600c602090815260408084206001600160a01b0393909316845291905290205490565b6005546001600160a01b031681565b600754156110c45760015460035460408051600160e11b6328f582d30281526004810192909252516001600160a01b03909216916351eb05a69160248082019260009290919082900301818387803b158015610f9d57600080fd5b505af1158015610fb1573d6000803e3d6000fd5b505060025460408051600160e01b6370a082310281523060048201529051600094506001600160a01b0390921692506370a08231916024808301926020929190829003018186803b15801561100557600080fd5b505afa158015611019573d6000803e3d6000fd5b505050506040513d602081101561102f57600080fd5b505160065490915060009061104b90839063ffffffff6113cf16565b905080156110bb57600754611081906110729061066484600160801b63ffffffff61129816565b600a549063ffffffff61123b16565b600a5560408051828152905133917fc1d32ad5cca423e7dda2123dbf8c482f8e77d00b631c06e903a47f2cec1334df919081900360200190a25b50600655611239565b60015460035460408051600160e11b6328f582d30281526004810192909252516001600160a01b03909216916351eb05a69160248082019260009290919082900301818387803b15801561111757600080fd5b505af115801561112b573d6000803e3d6000fd5b505060025460408051600160e01b6370a082310281523060048201529051600094506001600160a01b0390921692506370a08231916024808301926020929190829003018186803b15801561117f57600080fd5b505afa158015611193573d6000803e3d6000fd5b505050506040513d60208110156111a957600080fd5b50516006549091506000906111c590839063ffffffff6113cf16565b905080156112365760025460408051600160e31b630852cd8d0281526004810184905290516001600160a01b03909216916342966c689160248082019260009290919082900301818387803b15801561121d57600080fd5b505af1158015611231573d6000803e3d6000fd5b505050505b50505b565b600082820183811015610c9d5760408051600160e51b62461bcd02815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6000826112a757506000610ca0565b828202828482816112b457fe5b0414610c9d57604051600160e51b62461bcd0281526004018080602001828103825260218152602001806116bd6021913960400191505060405180910390fd5b60008183038183128015906113095750838113155b8061131e575060008312801561131e57508381135b610c9d57604051600160e51b62461bcd0281526004018080602001828103825260248152602001806116de6024913960400191505060405180910390fd5b6000828152600c602090815260408083206001600160a01b0385168452909152812054610c9d90610c85858561151c565b6000610c9d83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250611573565b6000610c9d83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611618565b60008282018183128015906114265750838112155b8061143b575060008312801561143b57508381125b610c9d57604051600160e51b62461bcd02815260040180806020018281038252602181526020018061169c6021913960400191505060405180910390fd5b6001600160a01b0381166114c157604051600160e51b62461bcd0281526004018080602001828103825260268152602001806116766026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000828152600b602090815260408083206001600160a01b03851680855290835281842054868552600884528285209185529252822054600a54610c9d92600160801b9261066492610e779163ffffffff61129816565b6000818361160257604051600160e51b62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b838110156115c75781810151838201526020016115af565b50505050905090810190601f1680156115f45780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600083858161160e57fe5b0495945050505050565b6000818484111561166d57604051600160e51b62461bcd0281526020600482018181528351602484015283519092839260449091019190850190808383600083156115c75781810151838201526020016115af565b50505090039056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573735369676e6564536166654d6174683a206164646974696f6e206f766572666c6f77536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775369676e6564536166654d6174683a207375627472616374696f6e206f766572666c6f77a165627a7a7230582073892e1a089b7d96ae64922de7485fccda22abd87d1b0fd7b68c9f44b309fcd60029";
    static readonly abi: ({
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        inputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        constant?: undefined;
        name?: undefined;
        outputs?: undefined;
        anonymous?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
    })[];
    static createInterface(): TurntableKIP7ListenersInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TurntableKIP7Listeners;
}
//# sourceMappingURL=TurntableKIP7Listeners__factory.d.ts.map