// handle browser vs node global
// eslint-disable-next-line better-tree-shaking/no-top-level-side-effects
globalThis.global = globalThis;

export { StaticJsonRpcBatchProvider } from "./lib/static-batch-rpc";

// export integration things
export * from "./integrations/thirdweb-checkout";

// re-export from functions entry point
export * from "./functions";

//#region @r/packages/sdk/src/evm/contracts/*
export {
  EditionDropInitializer,
  EditionInitializer,
  MarketplaceInitializer,
  MarketplaceV3Initializer,
  MultiwrapInitializer,
  NFTCollectionInitializer,
  NFTDropInitializer,
  PackInitializer,
  SignatureDropInitializer,
  SplitInitializer,
  TokenDropInitializer,
  TokenInitializer,
  VoteInitializer,
  PREBUILT_CONTRACTS_MAP, // @internal
  PREBUILT_CONTRACTS_APPURI_MAP,
  CONTRACTS_MAP,
  getContractTypeForRemoteName, // @internal
  getContractName,
} from "./contracts";
export type {
  PrebuiltContractType,
  PrebuiltContractsMap,
  PrebuiltContractsInstances,
  ContractsMap,
  ValidContractInstance,
  SchemaForPrebuiltContractType,
  ContractForPrebuiltContractType,
  ContractType,
  DeploySchemaForPrebuiltContractType,
} from "./contracts";
export type { Edition } from "./contracts/prebuilt-implementations/edition";
export type { EditionDrop } from "./contracts/prebuilt-implementations/edition-drop";
export type { Marketplace } from "./contracts/prebuilt-implementations/marketplace";
export type { MarketplaceV3 } from "./contracts/prebuilt-implementations/marketplacev3";
export type { Multiwrap } from "./contracts/prebuilt-implementations/multiwrap";
export type { NFTCollection } from "./contracts/prebuilt-implementations/nft-collection";
export type { NFTDrop } from "./contracts/prebuilt-implementations/nft-drop";
export type { Pack } from "./contracts/prebuilt-implementations/pack";
export type { SignatureDrop } from "./contracts/prebuilt-implementations/signature-drop";
export type { Split } from "./contracts/prebuilt-implementations/split";
export type { Token } from "./contracts/prebuilt-implementations/token";
export type { TokenDrop } from "./contracts/prebuilt-implementations/token-drop";
export type { Vote } from "./contracts/prebuilt-implementations/vote";
export type { SmartContract } from "./contracts/smart-contract";
//#endregion @r/packages/sdk/src/evm/contracts/*

//#region @r/packages/sdk/src/evm/core
export type {
  InfraContractsMap,
  InfraContractType,
  ChainOrRpc,
  ChainIdOrNumber,
  ChainIdOrName,
  ChainOrRpcUrl,
  NetworkInput,
  ValueOf,
  SignerOrProvider,
  TransactionResultWithId,
  TransactionResultWithAddress,
  TransactionResult,
  ForwardRequestMessage,
  PermitRequestMessage,
  GaslessTransaction,
} from "./core/types";
export { ContractEncoder } from "./core/classes/contract-encoder";
export {
  type IGenericSchemaType, // @internal
  ContractMetadata,
} from "./core/classes/contract-metadata";
export { ContractRoles } from "./core/classes/contract-roles";
export { ContractRoyalty } from "./core/classes/contract-royalty";
export { ContractPrimarySale } from "./core/classes/contract-sales";
export { DelayedReveal } from "./core/classes/delayed-reveal";
export { DropClaimConditions } from "./core/classes/drop-claim-conditions";
export { DropErc1155ClaimConditions } from "./core/classes/drop-erc1155-claim-conditions";
export { DropErc1155History } from "./core/classes/drop-erc1155-history";
export { Erc20BatchMintable } from "./core/classes/erc-20-batch-mintable";
export { Erc20Burnable } from "./core/classes/erc-20-burnable";
export { Erc20ClaimableWithConditions } from "./core/classes/erc-20-claim-conditions";
export { Erc20Droppable } from "./core/classes/erc-20-droppable";
export { Erc20Mintable } from "./core/classes/erc-20-mintable";
export { Erc20SignatureMintable } from "./core/classes/erc-20-signature-mintable";
export { Erc20 } from "./core/classes/erc-20";
export { TokenERC20History } from "./core/classes/erc-20-history";
export { StandardErc20 } from "./core/classes/erc-20-standard";
export { Erc721BatchMintable } from "./core/classes/erc-721-batch-mintable";
export { Erc721ClaimableWithConditions } from "./core/classes/erc-721-claim-conditions";
export { Erc721Claimable } from "./core/classes/erc-721-claimable";
export { Erc721LazyMintable } from "./core/classes/erc-721-lazy-mintable";
export { Erc721Mintable } from "./core/classes/erc-721-mintable";
export { Erc721Supply } from "./core/classes/erc-721-supply";
export { Erc721Enumerable } from "./core/classes/erc-721-enumerable";
export { Erc721TieredDrop } from "./core/classes/erc-721-tiered-drop";
export { Erc721 } from "./core/classes/erc-721";
export { Erc721WithQuantitySignatureMintable } from "./core/classes/erc-721-with-quantity-signature-mintable";
export { Erc721Burnable } from "./core/classes/erc-721-burnable";
export { StandardErc721 } from "./core/classes/erc-721-standard";
export { Erc1155BatchMintable } from "./core/classes/erc-1155-batch-mintable";
export { Erc1155Burnable } from "./core/classes/erc-1155-burnable";
export { Erc1155Enumerable } from "./core/classes/erc-1155-enumerable";
export { Erc1155LazyMintable } from "./core/classes/erc-1155-lazy-mintable";
export { Erc1155Mintable } from "./core/classes/erc-1155-mintable";
export { Erc1155 } from "./core/classes/erc-1155";
export { Erc1155SignatureMintable } from "./core/classes/erc-1155-signature-mintable";
export { StandardErc1155 } from "./core/classes/erc-1155-standard";
export { MarketplaceDirect } from "./core/classes/marketplace-direct";
export { MarketplaceAuction } from "./core/classes/marketplace-auction";
export { MarketplaceV3DirectListings } from "./core/classes/marketplacev3-direct-listings";
export { MarketplaceV3EnglishAuctions } from "./core/classes/marketplacev3-english-auction";
export { MarketplaceV3Offers } from "./core/classes/marketplacev3-offers";
export { GasCostEstimator } from "./core/classes/gas-cost-estimator";
export { ContractEvents } from "./core/classes/contract-events";
export { ContractInterceptor } from "./core/classes/contract-interceptor";
export { ContractPlatformFee } from "./core/classes/contract-platform-fee";
export { ContractPublishedMetadata } from "./core/classes/contract-published-metadata";
export { ContractOwner } from "./core/classes/contract-owner";
export {
  Transaction,
  DeployTransaction,
  defaultGaslessSendFunction,
  engineSendFunction,
  biconomySendFunction,
  defenderSendFunction,
  prepareGaslessRequest,
} from "./core/classes/transactions";
export { ContractAppURI } from "./core/classes/contract-appuri";
export { Account } from "./core/classes/account";
export { AccountFactory } from "./core/classes/account-factory";
export { UserWallet, type UserWalletEvents } from "./core/wallet/user-wallet";
export { ThirdwebSDK, ContractDeployer } from "./core/sdk";
//#endregion @r/packages/sdk/src/evm/core

//#region @r/packages/sdk/src/evm/common/*
export {
  NotFoundError, // @internal
  InvalidAddressError, // @internal
  MissingRoleError, // @internal
  AssetNotFoundError, // @internal
  UploadError, // @internal
  FileNameMissingError, // @internal
  DuplicateFileNameError, // @internal
  NotEnoughTokensError, // @internal
  MissingOwnerRoleError, // @internal
  QuantityAboveLimitError, // @internal
  FetchError, // @internal
  DuplicateLeafsError, // @internal
  AuctionAlreadyStartedError, // @internal
  FunctionDeprecatedError, // @internal
  ListingNotFoundError, // @internal
  WrongListingTypeError, // @internal
  RestrictedTransferError, // @internal
  AdminRoleMissingError, // @internal
  AuctionHasNotEndedError, // @internal
  ExtensionNotImplementedError, // @internal
  parseRevertReason, // @internal
  includesErrorMessage, // @internal
  TransactionError,
  type FunctionInfo, // @internal
  type TransactionErrorInfo,
} from "./common/error";
export {
  createSnapshot, // @internal
} from "./common/snapshots";
export * from "./common/role";
export {
  type Role,
  ALL_ROLES,
  getRoleHash, // @internal
} from "./common/role";
export {
  getContractMetadataFromCache,
  fetchContractMetadataFromAddress, // @internal
  fetchContractMetadataFromBytecode,
  fetchAbiFromAddress, // @internal
} from "./common/metadata-resolver";
export {
  getDefaultGasOverrides,
  getDynamicFeeData,
  getGasPrice,
  getPolygonGasPriorityFee, // @internal
} from "./common/gas-price";
export {
  fetchContractMetadata, // @internal
  formatCompilerMetadata,
} from "./common/fetchContractMetadata";
export {
  matchesPrebuiltAbi, // @internal
} from "./common/feature-detection/matchesPrebuiltAbi";
export {
  hasMatchingAbi, // @internal
  matchesAbiFromBytecode,
} from "./common/feature-detection/hasMatchingAbi";
export {
  extractConstructorParams, // @internal
} from "./common/feature-detection/extractConstructorParams";
export {
  extractFunctions, // @internal
} from "./common/feature-detection/extractFunctions";
export {
  extractCommentFromMetadata, // @internal
} from "./common/feature-detection/extractCommentFromMetadata";
export {
  extractConstructorParamsFromAbi, // @internal
} from "./common/feature-detection/extractConstructorParamsFromAbi";
export {
  extractFunctionParamsFromAbi, // @internal
} from "./common/feature-detection/extractFunctionParamsFromAbi";
export {
  extractFunctionsFromAbi, // @internal
} from "./common/feature-detection/extractFunctionsFromAbi";
export {
  extractEventsFromAbi, // @internal
} from "./common/feature-detection/extractEventsFromAbi";
export {
  extractMinimalProxyImplementationAddress, // @internal
} from "./common/feature-detection/extractMinimalProxyImplementationAddress";
export {
  resolveContractUriFromAddress, // @internal
  resolveContractUriAndBytecode,
  resolveImplementation,
} from "./common/feature-detection/resolveContractUriFromAddress";
export {
  extractIPFSHashFromBytecode, // @internal
} from "./common/feature-detection/extractIPFSHashFromBytecode";
export {
  fetchRawPredeployMetadata, // @internal
} from "./common/feature-detection/fetchRawPredeployMetadata";
export {
  fetchPreDeployMetadata, // @internal
} from "./common/feature-detection/fetchPreDeployMetadata";
export {
  fetchExtendedReleaseMetadata, // @internal
} from "./common/feature-detection/fetchExtendedReleaseMetadata";
export {
  detectFeatures, // @internal
  detectFeaturesFromBytecode,
} from "./common/feature-detection/detectFeatures";
export {
  getAllDetectedFeatures, // @internal
  getAllDetectedExtensionsFromBytecode,
  constructAbiFromBytecode,
  getAllDetectedExtensions,
} from "./common/feature-detection/getAllDetectedFeatures";
export * from "./common/feature-detection/getAllDetectedFeatureNames";
export * from "./common/feature-detection/isFeatureEnabled";
export * from "./common/feature-detection/assertEnabled";
export * from "./common/feature-detection/detectContractFeature";
export * from "./common/feature-detection/hasFunction";
export * from "./common/plugin/joinABIs";
export * from "./common/plugin/getCompositePluginABI";
export {
  type Semver, // @internal
  toSemver, // @internal
  isIncrementalVersion, // @internal
  isDowngradeVersion,
} from "./common/version-checker";
export {
  fetchSourceFilesFromMetadata, // @internal
} from "./common/fetchSourceFilesFromMetadata";
export { isNativeToken } from "./common/currency/isNativeToken";
export { cleanCurrencyAddress } from "./common/currency/cleanCurrencyAddress";
export { normalizePriceValue } from "./common/currency/normalizePriceValue";
export { fetchCurrencyMetadata } from "./common/currency/fetchCurrencyMetadata";
export { fetchCurrencyValue } from "./common/currency/fetchCurrencyValue";
export { setErc20Allowance } from "./common/currency/setErc20Allowance";
export { approveErc20Allowance } from "./common/currency/approveErc20Allowance";
export { hasERC20Allowance } from "./common/currency/hasERC20Allowance";
export { normalizeAmount } from "./common/currency/normalizeAmount";
export { toEther } from "./common/currency/toEther";
export { toWei } from "./common/currency/toWei";
export { toUnits } from "./common/currency/toUnits";
export { toDisplayValue } from "./common/currency/toDisplayValue";
export {
  verifyThirdwebPrebuiltImplementation,
  verify,
  checkVerificationStatus, // @internal
  isVerifiedOnEtherscan, // @internal
} from "./common/verification";
export {
  CREATE2_FACTORY_BYTECODE,
  SIGNATURE,
  COMMON_FACTORY,
  GAS_LIMIT_FOR_DEPLOYER,
  DEPLOYER_BYTECODE,
  DEPLOYER_ABI,
} from "./common/any-evm-utils/constants";
export {
  isContractDeployed, // @internal
} from "./common/any-evm-utils/isContractDeployed";
export {
  isEIP155Enforced, // @internal
} from "./common/any-evm-utils/isEIP155Enforced";
export {
  getCreate2FactoryAddress, // @internal
} from "./common/any-evm-utils/getCreate2FactoryAddress";
export {
  getSaltHash, // @internal
} from "./common/any-evm-utils/getSaltHash";
export {
  getInitBytecodeWithSalt, // @internal
} from "./common/any-evm-utils/getInitBytecodeWithSalt";
export { computeDeploymentAddress } from "./common/any-evm-utils/computeDeploymentAddress";
export {
  computeEOAForwarderAddress, // @internal
} from "./common/any-evm-utils/computeEOAForwarderAddress";
export {
  computeForwarderAddress, // @internal
} from "./common/any-evm-utils/computeForwarderAddress";
export {
  computeCloneFactoryAddress, // @internal
} from "./common/any-evm-utils/computeCloneFactoryAddress";
export {
  computeNativeTokenAddress, // @internal
} from "./common/any-evm-utils/computeNativeTokenAddress";
export { getThirdwebContractAddress } from "./common/any-evm-utils/getThirdwebContractAddress";
export { predictThirdwebContractAddress } from "./common/any-evm-utils/predictThirdwebContractAddress";
export {
  getEncodedConstructorParamsForThirdwebContract, // @internal
} from "./common/any-evm-utils/getEncodedConstructorParamsForThirdwebContract";
export { getKeylessTxn } from "./common/any-evm-utils/getKeylessTxn";
export { deployCreate2Factory } from "./common/any-evm-utils/deployCreate2Factory";
export {
  directDeployDeterministic,
  directDeployDeterministicWithUri,
  directDeployDeterministicPublished,
  predictAddressDeterministic,
  predictAddressDeterministicWithUri,
  predictAddressDeterministicPublished,
} from "./common/any-evm-utils/deployDirectDeterministic";
export { deployContractDeterministicRaw } from "./common/any-evm-utils/deployContractDeterministicRaw";
export { deployContractDeterministic } from "./common/any-evm-utils/deployContractDeterministic";
export {
  getDeploymentInfo, // @internal
} from "./common/any-evm-utils/getDeploymentInfo";
export { deployWithThrowawayDeployer } from "./common/any-evm-utils/deployWithThrowawayDeployer";
export {
  computeDeploymentInfo,
  encodeConstructorParamsForImplementation, // @internal
} from "./common/any-evm-utils/computeDeploymentInfo";
export { convertParamValues } from "./common/any-evm-utils/convertParamValues";
export { getCreate2FactoryDeploymentInfo } from "./common/any-evm-utils/getCreate2FactoryDeploymentInfo";
export { fetchPublishedContractFromPolygon } from "./common/any-evm-utils/fetchPublishedContractFromPolygon";
export { fetchAndCacheDeployMetadata } from "./common/any-evm-utils/fetchAndCacheDeployMetadata";
export { estimateGasForDeploy } from "./common/any-evm-utils/estimateGasForDeploy";
export { createTransactionBatches } from "./common/any-evm-utils/createTransactionBatches";
export {
  getDeployArguments, // @internal
  getTrustedForwarders,
} from "./common/deploy";
export { convertToReadableQuantity } from "./common/claim-conditions/convertToReadableQuantity";
export { fetchSnapshotEntryForAddress } from "./common/claim-conditions/fetchSnapshotEntryForAddress";
export { getCachedAbiForContract } from "./common/abi";
export { resolveEns } from "./common/ens/resolveEns";
export {
  resolveAddress, // @internal
} from "./common/ens/resolveAddress";
export {
  type EIP712StandardDomain, // @internal
  type EIP712PolygonDomain, // @internal
  type EIP712Domain, // @internal
  signTypedDataInternal, // @internal
} from "./common/sign";
//#endregion @r/packages/sdk/src/evm/common/*

//#region @r/packages/sdk/src/evm/constants/*
export * from "./constants/addresses/LOCAL_NODE_PKEY";
export * from "./constants/addresses/CONTRACT_ADDRESSES";
export * from "./constants/addresses/APPROVED_IMPLEMENTATIONS";
export * from "./constants/addresses/getApprovedImplementation";
export * from "./constants/addresses/getContractAddressByChainId";
export * from "./constants/addresses/getContractPublisherAddress";
export * from "./constants/addresses/getMultichainRegistryAddress";
export * from "./constants/addresses/getDefaultTrustedForwarders";
export * from "./constants/chains/ChainId";
export * from "./constants/chains/SUPPORTED_CHAIN_ID";
export * from "./constants/chains/SUPPORTED_CHAIN_IDS";
export * from "./constants/chains/supportedChains";
export * from "./constants/contract";
export * from "./constants/currency";
export * from "./constants/events";
export * from "./constants/urls";
export * from "./constants/contract-features";
//#endregion @r/packages/sdk/src/evm/constants/*

//#region @r/packages/sdk/src/evm/enums
export * from "./enums/marketplace/ListingType";
export * from "./enums/marketplace/Status";
export * from "./enums/vote/ProposalState";
export * from "./enums/vote/Vote";
export * from "./enums/ClaimEligibility";
//#endregion @r/packages/sdk/src/evm/enums

//#region @r/packages/sdk/src/evm/types
export * from "./types/claim-conditions/claim-conditions";
export * from "./types/airdrop/airdrop";
export * from "./types/marketplace/NewDirectListing";
export * from "./types/marketplace/DirectListing";
export * from "./types/marketplace/MarketPlaceFilter";
export * from "./types/marketplace/NewAuctionListing";
export * from "./types/marketplace/AuctionListing";
export * from "./types/marketplace/Offer";
export * from "./types/marketplace/UnmappedOffer";
export * from "./types/marketplacev3/DirectListingV3";
export * from "./types/marketplacev3/EnglishAuction";
export * from "./types/marketplacev3/Bid";
export * from "./types/marketplacev3/OfferV3";
export * from "./types/currency";
export * from "./types/delayed-reveal";
export * from "./types/vote";
export * from "./types/SplitRecipient";
export * from "./types/deploy/deploy-metadata";
export * from "./types/deploy/deploy-events";
export * from "./types/deploy/deploy-options";
export * from "./types/events";
export * from "./types/multiwrap";
export * from "./types/registry";
export * from "./types/transactions";
export * from "./types/contract";
export * from "./types/account";
//#endregion

//#region @r/packages/sdk/src/evm/schema
export * from "./schema/shared/BigNumberSchema";
export * from "./schema/shared/AddressSchema";
export * from "./schema/shared/AddressOrEnsSchema";
export * from "./schema/shared/RawDateSchema";
export * from "./schema/shared/CallOverrideSchema";
export * from "./schema/shared/ChainInfo";
export * from "./schema/shared/Ens";
export * from "./schema/shared/Address";
export * from "./schema/sdk-options";
export * from "./schema/contracts/custom";
export * from "./schema/contracts/common/index";
export * from "./schema/contracts/common/claim-conditions";
export * from "./schema/contracts/common/currency";
export * from "./schema/contracts/common/signature";
export * from "./schema/contracts/common/snapshots";
export * from "./schema/contracts/drop-erc721";
export * from "./schema/contracts/drop-erc1155";
export * from "./schema/contracts/marketplace";
export * from "./schema/contracts/packs";
export * from "./schema/contracts/splits";
export * from "./schema/contracts/token-erc20";
export * from "./schema/contracts/token-erc721";
export * from "./schema/contracts/token-erc1155";
export * from "./schema/contracts/vote";
export * from "./schema/tokens/common/properties";
export * from "./schema/tokens/common/wrap";
export * from "./schema/tokens/edition";
export * from "./schema/tokens/token";
export * from "./schema/tokens/pack";
export type { DirectListingInputParams } from "./schema/marketplacev3/direct-listings";
export type { EnglishAuctionInputParams } from "./schema/marketplacev3/english-auctions";
//#endregion @r/packages/sdk/src/evm/schema
