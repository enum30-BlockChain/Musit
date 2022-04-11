/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MusitNFT, MusitNFTInterface } from "../MusitNFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "Minted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintPrice",
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
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "minting",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintPrice",
        type: "uint256",
      },
    ],
    name: "setMintPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenCount",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupplied",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600981526020017f4d75736974204e465400000000000000000000000000000000000000000000008152506040518060400160405280600581526020017f4d55534954000000000000000000000000000000000000000000000000000000815250816000908051906020019062000096929190620001b4565b508060019080519060200190620000af929190620001b4565b505050620000d2620000c6620000e660201b60201c565b620000ee60201b60201c565b66038d7ea4c68000600881905550620002c9565b600033905090565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001c29062000264565b90600052602060002090601f016020900481019282620001e6576000855562000232565b82601f106200020157805160ff191683800117855562000232565b8280016001018555821562000232579182015b828111156200023157825182559160200191906001019062000214565b5b50905062000241919062000245565b5090565b5b808211156200026057600081600090555060010162000246565b5090565b600060028204905060018216806200027d57607f821691505b602082108114156200029457620002936200029a565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61334080620002d96000396000f3fe60806040526004361061012a5760003560e01c806370a08231116100ab578063a22cb4651161006f578063a22cb465146103e7578063b88d4fde14610410578063c87b56dd14610439578063e985e9c514610476578063f2fde38b146104b3578063f4a0a528146104dc5761012a565b806370a0823114610312578063715018a61461034f5780638da5cb5b1461036657806395d89b41146103915780639f181b5e146103bc5761012a565b806323b872dd116100f257806323b872dd1461022d57806342842e0e14610256578063630fd0ac1461027f5780636352211e146102aa5780636817c76c146102e75761012a565b806301ffc9a71461012f57806306fdde031461016c578063081812fc14610197578063095ea7b3146101d45780630bdc9008146101fd575b600080fd5b34801561013b57600080fd5b5061015660048036038101906101519190612212565b610505565b60405161016391906126c2565b60405180910390f35b34801561017857600080fd5b506101816105e7565b60405161018e91906126dd565b60405180910390f35b3480156101a357600080fd5b506101be60048036038101906101b991906122a5565b610679565b6040516101cb919061265b565b60405180910390f35b3480156101e057600080fd5b506101fb60048036038101906101f691906121d6565b6106fe565b005b61021760048036038101906102129190612264565b610816565b604051610224919061295f565b60405180910390f35b34801561023957600080fd5b50610254600480360381019061024f91906120d0565b6108e8565b005b34801561026257600080fd5b5061027d600480360381019061027891906120d0565b610948565b005b34801561028b57600080fd5b50610294610968565b6040516102a1919061295f565b60405180910390f35b3480156102b657600080fd5b506102d160048036038101906102cc91906122a5565b61096e565b6040516102de919061265b565b60405180910390f35b3480156102f357600080fd5b506102fc610a20565b604051610309919061295f565b60405180910390f35b34801561031e57600080fd5b506103396004803603810190610334919061206b565b610a26565b604051610346919061295f565b60405180910390f35b34801561035b57600080fd5b50610364610ade565b005b34801561037257600080fd5b5061037b610b66565b604051610388919061265b565b60405180910390f35b34801561039d57600080fd5b506103a6610b90565b6040516103b391906126dd565b60405180910390f35b3480156103c857600080fd5b506103d1610c22565b6040516103de919061295f565b60405180910390f35b3480156103f357600080fd5b5061040e6004803603810190610409919061219a565b610c2e565b005b34801561041c57600080fd5b506104376004803603810190610432919061211f565b610c44565b005b34801561044557600080fd5b50610460600480360381019061045b91906122a5565b610ca6565b60405161046d91906126dd565b60405180910390f35b34801561048257600080fd5b5061049d60048036038101906104989190612094565b610df8565b6040516104aa91906126c2565b60405180910390f35b3480156104bf57600080fd5b506104da60048036038101906104d5919061206b565b610e8c565b005b3480156104e857600080fd5b5061050360048036038101906104fe91906122a5565b610f84565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806105d057507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806105e057506105df8261100a565b5b9050919050565b6060600080546105f690612be5565b80601f016020809104026020016040519081016040528092919081815260200182805461062290612be5565b801561066f5780601f106106445761010080835404028352916020019161066f565b820191906000526020600020905b81548152906001019060200180831161065257829003601f168201915b5050505050905090565b600061068482611074565b6106c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ba9061289f565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006107098261096e565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561077a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610771906128ff565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166107996110e0565b73ffffffffffffffffffffffffffffffffffffffff1614806107c857506107c7816107c26110e0565b610df8565b5b610807576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107fe906127df565b60405180910390fd5b61081183836110e8565b505050565b6000600854341461085c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108539061293f565b60405180910390fd5b610866600a6111a1565b6000610872600a6111b7565b905061087e33826111c5565b61088881846111e3565b3373ffffffffffffffffffffffffffffffffffffffff167fc1177815a22ab58cdf6e40a80dfe322e9d00b7977bd78634869752fed8082f5682856040516108d092919061297a565b60405180910390a28060098190555080915050919050565b6108f96108f36110e0565b82611257565b610938576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092f9061291f565b60405180910390fd5b610943838383611335565b505050565b61096383838360405180602001604052806000815250610c44565b505050565b60095481565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610a17576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0e9061281f565b60405180910390fd5b80915050919050565b60085481565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a97576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8e906127ff565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610ae66110e0565b73ffffffffffffffffffffffffffffffffffffffff16610b04610b66565b73ffffffffffffffffffffffffffffffffffffffff1614610b5a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b51906128bf565b60405180910390fd5b610b64600061159c565b565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060018054610b9f90612be5565b80601f0160208091040260200160405190810160405280929190818152602001828054610bcb90612be5565b8015610c185780601f10610bed57610100808354040283529160200191610c18565b820191906000526020600020905b815481529060010190602001808311610bfb57829003601f168201915b5050505050905090565b600a8060000154905081565b610c40610c396110e0565b8383611662565b5050565b610c55610c4f6110e0565b83611257565b610c94576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8b9061291f565b60405180910390fd5b610ca0848484846117cf565b50505050565b6060610cb182611074565b610cf0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ce79061287f565b60405180910390fd5b6000600660008481526020019081526020016000208054610d1090612be5565b80601f0160208091040260200160405190810160405280929190818152602001828054610d3c90612be5565b8015610d895780601f10610d5e57610100808354040283529160200191610d89565b820191906000526020600020905b815481529060010190602001808311610d6c57829003601f168201915b505050505090506000610d9a61182b565b9050600081511415610db0578192505050610df3565b600082511115610de5578082604051602001610dcd929190612637565b60405160208183030381529060405292505050610df3565b610dee84611842565b925050505b919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610e946110e0565b73ffffffffffffffffffffffffffffffffffffffff16610eb2610b66565b73ffffffffffffffffffffffffffffffffffffffff1614610f08576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eff906128bf565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610f78576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f6f9061271f565b60405180910390fd5b610f818161159c565b50565b610f8c6110e0565b73ffffffffffffffffffffffffffffffffffffffff16610faa610b66565b73ffffffffffffffffffffffffffffffffffffffff1614611000576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ff7906128bf565b60405180910390fd5b8060088190555050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff1661115b8361096e565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6001816000016000828254019250508190555050565b600081600001549050919050565b6111df8282604051806020016040528060008152506118e9565b5050565b6111ec82611074565b61122b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112229061283f565b60405180910390fd5b80600660008481526020019081526020016000209080519060200190611252929190611e8f565b505050565b600061126282611074565b6112a1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611298906127bf565b60405180910390fd5b60006112ac8361096e565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061131b57508373ffffffffffffffffffffffffffffffffffffffff1661130384610679565b73ffffffffffffffffffffffffffffffffffffffff16145b8061132c575061132b8185610df8565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff166113558261096e565b73ffffffffffffffffffffffffffffffffffffffff16146113ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113a29061273f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561141b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114129061277f565b60405180910390fd5b611426838383611944565b6114316000826110e8565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546114819190612afb565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546114d89190612a74565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611597838383611949565b505050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156116d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116c89061279f565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516117c291906126c2565b60405180910390a3505050565b6117da848484611335565b6117e68484848461194e565b611825576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161181c906126ff565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b606061184d82611074565b61188c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611883906128df565b60405180910390fd5b600061189661182b565b905060008151116118b657604051806020016040528060008152506118e1565b806118c084611ae5565b6040516020016118d1929190612637565b6040516020818303038152906040525b915050919050565b6118f38383611c92565b611900600084848461194e565b61193f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611936906126ff565b60405180910390fd5b505050565b505050565b505050565b600061196f8473ffffffffffffffffffffffffffffffffffffffff16611e6c565b15611ad8578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026119986110e0565b8786866040518563ffffffff1660e01b81526004016119ba9493929190612676565b602060405180830381600087803b1580156119d457600080fd5b505af1925050508015611a0557506040513d601f19601f82011682018060405250810190611a02919061223b565b60015b611a88573d8060008114611a35576040519150601f19603f3d011682016040523d82523d6000602084013e611a3a565b606091505b50600081511415611a80576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a77906126ff565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611add565b600190505b949350505050565b60606000821415611b2d576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611c8d565b600082905060005b60008214611b5f578080611b4890612c48565b915050600a82611b589190612aca565b9150611b35565b60008167ffffffffffffffff811115611ba1577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611bd35781602001600182028036833780820191505090505b5090505b60008514611c8657600182611bec9190612afb565b9150600a85611bfb9190612c91565b6030611c079190612a74565b60f81b818381518110611c43577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a85611c7f9190612aca565b9450611bd7565b8093505050505b919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611d02576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cf99061285f565b60405180910390fd5b611d0b81611074565b15611d4b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d429061275f565b60405180910390fd5b611d5760008383611944565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611da79190612a74565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611e6860008383611949565b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b828054611e9b90612be5565b90600052602060002090601f016020900481019282611ebd5760008555611f04565b82601f10611ed657805160ff1916838001178555611f04565b82800160010185558215611f04579182015b82811115611f03578251825591602001919060010190611ee8565b5b509050611f119190611f15565b5090565b5b80821115611f2e576000816000905550600101611f16565b5090565b6000611f45611f40846129cf565b6129aa565b905082815260208101848484011115611f5d57600080fd5b611f68848285612ba3565b509392505050565b6000611f83611f7e84612a00565b6129aa565b905082815260208101848484011115611f9b57600080fd5b611fa6848285612ba3565b509392505050565b600081359050611fbd816132ae565b92915050565b600081359050611fd2816132c5565b92915050565b600081359050611fe7816132dc565b92915050565b600081519050611ffc816132dc565b92915050565b600082601f83011261201357600080fd5b8135612023848260208601611f32565b91505092915050565b600082601f83011261203d57600080fd5b813561204d848260208601611f70565b91505092915050565b600081359050612065816132f3565b92915050565b60006020828403121561207d57600080fd5b600061208b84828501611fae565b91505092915050565b600080604083850312156120a757600080fd5b60006120b585828601611fae565b92505060206120c685828601611fae565b9150509250929050565b6000806000606084860312156120e557600080fd5b60006120f386828701611fae565b935050602061210486828701611fae565b925050604061211586828701612056565b9150509250925092565b6000806000806080858703121561213557600080fd5b600061214387828801611fae565b945050602061215487828801611fae565b935050604061216587828801612056565b925050606085013567ffffffffffffffff81111561218257600080fd5b61218e87828801612002565b91505092959194509250565b600080604083850312156121ad57600080fd5b60006121bb85828601611fae565b92505060206121cc85828601611fc3565b9150509250929050565b600080604083850312156121e957600080fd5b60006121f785828601611fae565b925050602061220885828601612056565b9150509250929050565b60006020828403121561222457600080fd5b600061223284828501611fd8565b91505092915050565b60006020828403121561224d57600080fd5b600061225b84828501611fed565b91505092915050565b60006020828403121561227657600080fd5b600082013567ffffffffffffffff81111561229057600080fd5b61229c8482850161202c565b91505092915050565b6000602082840312156122b757600080fd5b60006122c584828501612056565b91505092915050565b6122d781612b2f565b82525050565b6122e681612b41565b82525050565b60006122f782612a31565b6123018185612a47565b9350612311818560208601612bb2565b61231a81612d7e565b840191505092915050565b600061233082612a3c565b61233a8185612a58565b935061234a818560208601612bb2565b61235381612d7e565b840191505092915050565b600061236982612a3c565b6123738185612a69565b9350612383818560208601612bb2565b80840191505092915050565b600061239c603283612a58565b91506123a782612d8f565b604082019050919050565b60006123bf602683612a58565b91506123ca82612dde565b604082019050919050565b60006123e2602583612a58565b91506123ed82612e2d565b604082019050919050565b6000612405601c83612a58565b915061241082612e7c565b602082019050919050565b6000612428602483612a58565b915061243382612ea5565b604082019050919050565b600061244b601983612a58565b915061245682612ef4565b602082019050919050565b600061246e602c83612a58565b915061247982612f1d565b604082019050919050565b6000612491603883612a58565b915061249c82612f6c565b604082019050919050565b60006124b4602a83612a58565b91506124bf82612fbb565b604082019050919050565b60006124d7602983612a58565b91506124e28261300a565b604082019050919050565b60006124fa602e83612a58565b915061250582613059565b604082019050919050565b600061251d602083612a58565b9150612528826130a8565b602082019050919050565b6000612540603183612a58565b915061254b826130d1565b604082019050919050565b6000612563602c83612a58565b915061256e82613120565b604082019050919050565b6000612586602083612a58565b91506125918261316f565b602082019050919050565b60006125a9602f83612a58565b91506125b482613198565b604082019050919050565b60006125cc602183612a58565b91506125d7826131e7565b604082019050919050565b60006125ef603183612a58565b91506125fa82613236565b604082019050919050565b6000612612601183612a58565b915061261d82613285565b602082019050919050565b61263181612b99565b82525050565b6000612643828561235e565b915061264f828461235e565b91508190509392505050565b600060208201905061267060008301846122ce565b92915050565b600060808201905061268b60008301876122ce565b61269860208301866122ce565b6126a56040830185612628565b81810360608301526126b781846122ec565b905095945050505050565b60006020820190506126d760008301846122dd565b92915050565b600060208201905081810360008301526126f78184612325565b905092915050565b600060208201905081810360008301526127188161238f565b9050919050565b60006020820190508181036000830152612738816123b2565b9050919050565b60006020820190508181036000830152612758816123d5565b9050919050565b60006020820190508181036000830152612778816123f8565b9050919050565b600060208201905081810360008301526127988161241b565b9050919050565b600060208201905081810360008301526127b88161243e565b9050919050565b600060208201905081810360008301526127d881612461565b9050919050565b600060208201905081810360008301526127f881612484565b9050919050565b60006020820190508181036000830152612818816124a7565b9050919050565b60006020820190508181036000830152612838816124ca565b9050919050565b60006020820190508181036000830152612858816124ed565b9050919050565b6000602082019050818103600083015261287881612510565b9050919050565b6000602082019050818103600083015261289881612533565b9050919050565b600060208201905081810360008301526128b881612556565b9050919050565b600060208201905081810360008301526128d881612579565b9050919050565b600060208201905081810360008301526128f88161259c565b9050919050565b60006020820190508181036000830152612918816125bf565b9050919050565b60006020820190508181036000830152612938816125e2565b9050919050565b6000602082019050818103600083015261295881612605565b9050919050565b60006020820190506129746000830184612628565b92915050565b600060408201905061298f6000830185612628565b81810360208301526129a18184612325565b90509392505050565b60006129b46129c5565b90506129c08282612c17565b919050565b6000604051905090565b600067ffffffffffffffff8211156129ea576129e9612d4f565b5b6129f382612d7e565b9050602081019050919050565b600067ffffffffffffffff821115612a1b57612a1a612d4f565b5b612a2482612d7e565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b6000612a7f82612b99565b9150612a8a83612b99565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612abf57612abe612cc2565b5b828201905092915050565b6000612ad582612b99565b9150612ae083612b99565b925082612af057612aef612cf1565b5b828204905092915050565b6000612b0682612b99565b9150612b1183612b99565b925082821015612b2457612b23612cc2565b5b828203905092915050565b6000612b3a82612b79565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612bd0578082015181840152602081019050612bb5565b83811115612bdf576000848401525b50505050565b60006002820490506001821680612bfd57607f821691505b60208210811415612c1157612c10612d20565b5b50919050565b612c2082612d7e565b810181811067ffffffffffffffff82111715612c3f57612c3e612d4f565b5b80604052505050565b6000612c5382612b99565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612c8657612c85612cc2565b5b600182019050919050565b6000612c9c82612b99565b9150612ca783612b99565b925082612cb757612cb6612cf1565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b7f45524337323155524953746f726167653a2055524920717565727920666f722060008201527f6e6f6e6578697374656e7420746f6b656e000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b7f57726f6e672076616c75652073656e742e000000000000000000000000000000600082015250565b6132b781612b2f565b81146132c257600080fd5b50565b6132ce81612b41565b81146132d957600080fd5b50565b6132e581612b4d565b81146132f057600080fd5b50565b6132fc81612b99565b811461330757600080fd5b5056fea264697066735822122093e78f20168043a3f55e3576bfd3f28c4a188b72e1e41a1517086b3370c1df0564736f6c63430008040033";

export class MusitNFT__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MusitNFT> {
    return super.deploy(overrides || {}) as Promise<MusitNFT>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MusitNFT {
    return super.attach(address) as MusitNFT;
  }
  connect(signer: Signer): MusitNFT__factory {
    return super.connect(signer) as MusitNFT__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MusitNFTInterface {
    return new utils.Interface(_abi) as MusitNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MusitNFT {
    return new Contract(address, _abi, signerOrProvider) as MusitNFT;
  }
}