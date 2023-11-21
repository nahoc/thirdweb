import { utils } from "ethers";

/**
 * Generate salt for deployment with Create2
 * Note: Salt component is generated by appending `tw` (thirdweb) to the bytecode
 *
 * @internal
 * @param bytecode - Creation bytecode of the contract to deploy
 */
export function getSaltHash(bytecode: string): string {
  const bytecodePrefixed = bytecode.startsWith("0x")
    ? bytecode
    : `0x${bytecode}`;
  const bytecodeHash = utils.id(bytecodePrefixed);
  const salt = `tw.${bytecodeHash}`;
  const saltHash = utils.id(salt);

  return saltHash;
}
