/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Marketplace, MarketplaceInterface } from "../Marketplace";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_feePercent",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nft",
        type: "address",
      },
    ],
    name: "Bought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nft",
        type: "address",
      },
    ],
    name: "Enrolled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "_nft",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "enroll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feeAccount",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feePercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
    ],
    name: "getTotalPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "itemCount",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "items",
    outputs: [
      {
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "seller",
        type: "address",
      },
      {
        internalType: "contract IERC721",
        name: "nft",
        type: "address",
      },
      {
        internalType: "bool",
        name: "sold",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
    ],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b5060405161133738038061133783398181016040528101906100329190610094565b60016000819055503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b815250508060a08181525050506100de565b60008151905061008e816100c7565b92915050565b6000602082840312156100a657600080fd5b60006100b48482850161007f565b91505092915050565b6000819050919050565b6100d0816100bd565b81146100db57600080fd5b50565b60805160601c60a051611223610114600039600081816101ec01526106600152600081816101bc015261088d01526112236000f3fe6080604052600436106100705760003560e01c8063bc0da2881161004e578063bc0da288146100f6578063bfb231d21461011f578063ca7dd37514610161578063efef39a11461019e57610070565b806365e17c9d146100755780636bfb0d01146100a05780637fd6f15c146100cb575b600080fd5b34801561008157600080fd5b5061008a6101ba565b6040516100979190610cb3565b60405180910390f35b3480156100ac57600080fd5b506100b56101de565b6040516100c29190610dc5565b60405180910390f35b3480156100d757600080fd5b506100e06101ea565b6040516100ed9190610dc5565b60405180910390f35b34801561010257600080fd5b5061011d60048036038101906101189190610b1e565b61020e565b005b34801561012b57600080fd5b5061014660048036038101906101419190610b6d565b6105d1565b60405161015896959493929190610e17565b60405180910390f35b34801561016d57600080fd5b5061018860048036038101906101839190610b6d565b61065a565b6040516101959190610dc5565b60405180910390f35b6101b860048036038101906101b39190610b6d565b6106bd565b005b7f000000000000000000000000000000000000000000000000000000000000000081565b60018060000154905081565b7f000000000000000000000000000000000000000000000000000000000000000081565b60026000541415610254576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161024b90610d85565b60405180910390fd5b60026000819055506000811161029f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029690610d05565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b81526004016102d89190610dc5565b60206040518083038186803b1580156102f057600080fd5b505afa158015610304573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103289190610af5565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610395576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038c90610d25565b60405180910390fd5b61039f6001610a92565b60006103ab6001610aa8565b90508373ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b81526004016103ea93929190610cce565b600060405180830381600087803b15801561040457600080fd5b505af1158015610418573d6000803e3d6000fd5b505050506040518060c001604052808281526020018481526020018381526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff168152602001600015158152506002600083815260200190815260200160002060008201518160000155602082015181600101556040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a08201518160040160146101000a81548160ff0219169083151502179055509050508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f88e7a006baae890b208e60371ee21ec67c56635671c12f5ad27a34a8ee1c6c4d8386866040516105bb93929190610de0565b60405180910390a3506001600081905550505050565b60026020528060005260406000206000915090508060000154908060010154908060020154908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160149054906101000a900460ff16905086565b600060647f0000000000000000000000000000000000000000000000000000000000000000606461068b9190610e89565b60026000858152602001908152602001600020600201546106ac9190610f10565b6106b69190610edf565b9050919050565b60026000541415610703576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fa90610d85565b60405180910390fd5b600260008190555060006107168261065a565b9050600060026000848152602001908152602001600020905060008311801561074857506107446001610aa8565b8311155b610787576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077e90610d65565b60405180910390fd5b813410156107ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c190610d45565b60405180910390fd5b8060040160149054906101000a900460ff161561081c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161081390610da5565b60405180910390fd5b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600201549081150290604051600060405180830381858888f1935050505015801561088a573d6000803e3d6000fd5b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166108fc8260020154846108d59190610f6a565b9081150290604051600060405180830381858888f19350505050158015610900573d6000803e3d6000fd5b5060018160040160146101000a81548160ff0219169083151502179055508060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd303384600101546040518463ffffffff1660e01b815260040161098393929190610cce565b600060405180830381600087803b15801561099d57600080fd5b505af11580156109b1573d6000803e3d6000fd5b505050508060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff168260030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fd37dad59375a554b19479ac1258ea706da4a48fd73d4cc1b395de5c7d2eb47fe8685600101548660020154604051610a7d93929190610de0565b60405180910390a45050600160008190555050565b6001816000016000828254019250508190555050565b600081600001549050919050565b600081519050610ac5816111a8565b92915050565b600081359050610ada816111bf565b92915050565b600081359050610aef816111d6565b92915050565b600060208284031215610b0757600080fd5b6000610b1584828501610ab6565b91505092915050565b600080600060608486031215610b3357600080fd5b6000610b4186828701610acb565b9350506020610b5286828701610ae0565b9250506040610b6386828701610ae0565b9150509250925092565b600060208284031215610b7f57600080fd5b6000610b8d84828501610ae0565b91505092915050565b610b9f81610fb0565b82525050565b610bae81610f9e565b82525050565b610bbd81610fc2565b82525050565b610bcc8161100a565b82525050565b6000610bdf601f83610e78565b9150610bea8261108c565b602082019050919050565b6000610c02601583610e78565b9150610c0d826110b5565b602082019050919050565b6000610c25603383610e78565b9150610c30826110de565b604082019050919050565b6000610c48601283610e78565b9150610c538261112d565b602082019050919050565b6000610c6b601f83610e78565b9150610c7682611156565b602082019050919050565b6000610c8e600983610e78565b9150610c998261117f565b602082019050919050565b610cad81611000565b82525050565b6000602082019050610cc86000830184610b96565b92915050565b6000606082019050610ce36000830186610ba5565b610cf06020830185610ba5565b610cfd6040830184610ca4565b949350505050565b60006020820190508181036000830152610d1e81610bd2565b9050919050565b60006020820190508181036000830152610d3e81610bf5565b9050919050565b60006020820190508181036000830152610d5e81610c18565b9050919050565b60006020820190508181036000830152610d7e81610c3b565b9050919050565b60006020820190508181036000830152610d9e81610c5e565b9050919050565b60006020820190508181036000830152610dbe81610c81565b9050919050565b6000602082019050610dda6000830184610ca4565b92915050565b6000606082019050610df56000830186610ca4565b610e026020830185610ca4565b610e0f6040830184610ca4565b949350505050565b600060c082019050610e2c6000830189610ca4565b610e396020830188610ca4565b610e466040830187610ca4565b610e536060830186610b96565b610e606080830185610bc3565b610e6d60a0830184610bb4565b979650505050505050565b600082825260208201905092915050565b6000610e9482611000565b9150610e9f83611000565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610ed457610ed361102e565b5b828201905092915050565b6000610eea82611000565b9150610ef583611000565b925082610f0557610f0461105d565b5b828204905092915050565b6000610f1b82611000565b9150610f2683611000565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610f5f57610f5e61102e565b5b828202905092915050565b6000610f7582611000565b9150610f8083611000565b925082821015610f9357610f9261102e565b5b828203905092915050565b6000610fa982610fe0565b9050919050565b6000610fbb82610fe0565b9050919050565b60008115159050919050565b6000610fd982610f9e565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006110158261101c565b9050919050565b600061102782610fe0565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f5072696365206d7573742062652067726561746572207468616e207a65726f00600082015250565b7f4f6e6c79206f776e65722063616e20656e726f6c6c0000000000000000000000600082015250565b7f4e6f7420656e6f75676820657468657220746f20636f766572206974656d207060008201527f7269636520616e64206d61726b65742066656500000000000000000000000000602082015250565b7f4974656d20646f65736e27742065786973740000000000000000000000000000600082015250565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b7f536f6c64206f7574210000000000000000000000000000000000000000000000600082015250565b6111b181610f9e565b81146111bc57600080fd5b50565b6111c881610fce565b81146111d357600080fd5b50565b6111df81611000565b81146111ea57600080fd5b5056fea2646970667358221220a6ead7a4efcd83c80fd1c1e0f202c3d764198b163439e768ed6298ae0269aa4764736f6c63430008040033";

export class Marketplace__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _feePercent: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Marketplace> {
    return super.deploy(_feePercent, overrides || {}) as Promise<Marketplace>;
  }
  getDeployTransaction(
    _feePercent: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_feePercent, overrides || {});
  }
  attach(address: string): Marketplace {
    return super.attach(address) as Marketplace;
  }
  connect(signer: Signer): Marketplace__factory {
    return super.connect(signer) as Marketplace__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketplaceInterface {
    return new utils.Interface(_abi) as MarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Marketplace {
    return new Contract(address, _abi, signerOrProvider) as Marketplace;
  }
}
