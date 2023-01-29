import { ALL_ROLES, assertEnabled, detectContractFeature } from "../common";
import { FEATURE_TOKEN } from "../constants/erc20-features";
import { FEATURE_NFT } from "../constants/erc721-features";
import { FEATURE_EDITION } from "../constants/erc1155-features";
import {
  FEATURE_OWNER,
  FEATURE_PERMISSIONS,
  FEATURE_PLATFORM_FEE,
  FEATURE_PRIMARY_SALE,
  FEATURE_ROYALTY,
} from "../constants/thirdweb-features";
import {
  ContractEncoder,
  ContractOwner,
  NetworkOrSignerOrProvider,
} from "../core";
import { ContractAppURI } from "../core/classes/contract-appuri";
import { ContractEvents } from "../core/classes/contract-events";
import { ContractInterceptor } from "../core/classes/contract-interceptor";
import { ContractMetadata } from "../core/classes/contract-metadata";
import { ContractPlatformFee } from "../core/classes/contract-platform-fee";
import { ContractPublishedMetadata } from "../core/classes/contract-published-metadata";
import { ContractRoles } from "../core/classes/contract-roles";
import { ContractRoyalty } from "../core/classes/contract-royalty";
import { ContractPrimarySale } from "../core/classes/contract-sales";
import { ContractWrapper } from "../core/classes/contract-wrapper";
import { Erc20 } from "../core/classes/erc-20";
import { Erc721 } from "../core/classes/erc-721";
import { Erc1155 } from "../core/classes/erc-1155";
import { GasCostEstimator } from "../core/classes/gas-cost-estimator";
import { UpdateableNetwork } from "../core/interfaces/contract";
import {
  Abi,
  CustomContractSchema,
  GetArgs,
  GetFunctionName,
} from "../schema/contracts/custom";
import { SDKOptions } from "../schema/sdk-options";
import { BaseERC1155, BaseERC20, BaseERC721 } from "../types/eips";
import type {
  IPermissions,
  IPlatformFee,
  IPrimarySale,
  IRoyalty,
  Ownable,
} from "@thirdweb-dev/contracts-js";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BaseContract, CallOverrides } from "ethers";

/**
 * Custom contract dynamic class with feature detection
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 *
 * const sdk = new ThirdwebSDK(provider);
 * const contract = await sdk.getContract("{{contract_address}}");
 *
 * // call any function in your contract
 * await contract.call("myCustomFunction", param1, param2);
 *
 * // if your contract follows the ERC721 standard, contract.nft will be present
 * const allNFTs = await contract.erc721.query.all()
 *
 * // if your contract extends IMintableERC721, contract.nft.mint() will be available
 * const tx = await contract.erc721.mint({
 *     name: "Cool NFT",
 *     image: readFileSync("some_image.png"),
 *   });
 * ```
 *
 * @beta
 */
export class SmartContract<
  TContract extends BaseContract = BaseContract,
  TAbi extends Abi | readonly unknown[] = Abi,
> implements UpdateableNetwork
{
  private contractWrapper;
  private storage;

  // utilities
  public events: ContractEvents<TContract, TAbi>;
  public interceptor: ContractInterceptor<TContract, TAbi>;
  public encoder: ContractEncoder<TContract, TAbi>;
  public estimator: GasCostEstimator<TContract, TAbi>;
  public publishedMetadata: ContractPublishedMetadata<TContract, TAbi>;
  public abi: TAbi;
  public metadata: ContractMetadata<BaseContract, any, TAbi>;
  public appURI: ContractAppURI<BaseContract, TAbi>;

  /**
   * Handle royalties
   */
  get royalties(): ContractRoyalty<IRoyalty, any> {
    return assertEnabled(this.detectRoyalties(), FEATURE_ROYALTY);
  }

  /**
   * Handle permissions
   */
  get roles(): ContractRoles<IPermissions, any> {
    return assertEnabled(this.detectRoles(), FEATURE_PERMISSIONS);
  }

  /**
   * Handle primary sales
   */
  get sales(): ContractPrimarySale<IPrimarySale> {
    return assertEnabled(this.detectPrimarySales(), FEATURE_PRIMARY_SALE);
  }

  /**
   * Handle platform fees
   */
  get platformFees(): ContractPlatformFee<IPlatformFee> {
    return assertEnabled(this.detectPlatformFees(), FEATURE_PLATFORM_FEE);
  }

  /**
   * Set and get the owner of the contract
   */
  get owner(): ContractOwner<Ownable> {
    return assertEnabled(this.detectOwnable(), FEATURE_OWNER);
  }

  /**
   * Auto-detects ERC20 standard functions.
   */
  get erc20(): Erc20 {
    return assertEnabled(this.detectErc20(), FEATURE_TOKEN);
  }

  /**
   * Auto-detects ERC721 standard functions.
   */
  get erc721(): Erc721 {
    return assertEnabled(this.detectErc721(), FEATURE_NFT);
  }

  /**
   * Auto-detects ERC1155 standard functions.
   */
  get erc1155(): Erc1155 {
    return assertEnabled(this.detectErc1155(), FEATURE_EDITION);
  }

  private _chainId: number;
  get chainId() {
    return this._chainId;
  }

  constructor(
    network: NetworkOrSignerOrProvider,
    address: string,
    abi: TAbi,
    storage: ThirdwebStorage,
    options: SDKOptions = {},
    chainId: number,
    contractWrapper = new ContractWrapper<TContract>(
      network,
      address,
      abi as Abi, // TODO (abi) - type contract wrapper
      options,
    ),
  ) {
    this._chainId = chainId;
    this.storage = storage;
    this.contractWrapper = contractWrapper;
    this.abi = abi;

    this.events = new ContractEvents(this.contractWrapper);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.interceptor = new ContractInterceptor(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.publishedMetadata = new ContractPublishedMetadata(
      this.contractWrapper,
      this.storage,
    );

    this.metadata = new ContractMetadata(
      this.contractWrapper,
      CustomContractSchema,
      this.storage,
    );

    this.appURI = new ContractAppURI(this.contractWrapper, this.metadata);
  }

  onNetworkUpdated(network: NetworkOrSignerOrProvider): void {
    this.contractWrapper.updateSignerOrProvider(network);
  }

  getAddress(): string {
    return this.contractWrapper.readContract.address;
  }

  /**
   * Call any function on this contract
   * @example
   * ```javascript
   * // read functions will return the data from the contract
   * const myValue = await contract.call("myReadFunction");
   * console.log(myValue);
   *
   * // write functions will return the transaction receipt
   * const tx = await contract.call("myWriteFunction", arg1, arg2);
   * const receipt = tx.receipt;
   *
   * // Optionally override transaction options
   * await contract.call("myWriteFunction", arg1, arg2, {
   *  gasLimit: 1000000, // override default gas limit
   *  value: ethers.utils.parseEther("0.1"), // send 0.1 ether with the contract call
   * };
   * ```
   * @param functionName - the name of the function to call
   * @param args - the arguments of the function
   */
  public async call<TFunctionName extends string = string>(
    functionName: GetFunctionName<TAbi, TFunctionName>,
    args?: GetArgs<TAbi, TFunctionName>,
    txOverrides?: CallOverrides,
  ): Promise<any> {
    return this.contractWrapper.call(
      functionName,
      args ? (args as unknown[]) : [], // TODO (abi) fix types at contract-wrapper level
      txOverrides,
    );
  }

  /** ********************
   * FEATURE DETECTION
   * ********************/

  private detectRoyalties() {
    if (detectContractFeature<IRoyalty>(this.contractWrapper, "Royalty")) {
      // ContractMetadata is stateless, it's fine to create a new one here
      // This also makes it not order dependent in the feature detection process
      const metadata = new ContractMetadata(
        this.contractWrapper,
        CustomContractSchema,
        this.storage,
      );
      return new ContractRoyalty(this.contractWrapper, metadata);
    }
    return undefined;
  }

  private detectRoles() {
    if (
      detectContractFeature<IPermissions>(this.contractWrapper, "Permissions")
    ) {
      return new ContractRoles(this.contractWrapper, ALL_ROLES);
    }
    return undefined;
  }

  private detectPrimarySales() {
    if (
      detectContractFeature<IPrimarySale>(this.contractWrapper, "PrimarySale")
    ) {
      return new ContractPrimarySale(this.contractWrapper);
    }
    return undefined;
  }

  private detectPlatformFees() {
    if (
      detectContractFeature<IPlatformFee>(this.contractWrapper, "PlatformFee")
    ) {
      return new ContractPlatformFee(this.contractWrapper);
    }
    return undefined;
  }

  private detectErc20() {
    if (detectContractFeature<BaseERC20>(this.contractWrapper, "ERC20")) {
      return new Erc20(this.contractWrapper, this.storage, this.chainId);
    }
    return undefined;
  }

  private detectErc721() {
    if (detectContractFeature<BaseERC721>(this.contractWrapper, "ERC721")) {
      return new Erc721(this.contractWrapper, this.storage, this.chainId);
    }
    return undefined;
  }

  private detectErc1155() {
    if (detectContractFeature<BaseERC1155>(this.contractWrapper, "ERC1155")) {
      return new Erc1155(this.contractWrapper, this.storage, this.chainId);
    }
    return undefined;
  }

  private detectOwnable() {
    if (detectContractFeature<Ownable>(this.contractWrapper, "Ownable")) {
      return new ContractOwner(this.contractWrapper);
    }
    return undefined;
  }
}
