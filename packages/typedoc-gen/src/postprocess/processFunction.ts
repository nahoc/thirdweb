import { JSONOutput, SomeType, Reflection } from "typedoc";
import { FunctionDoc, FunctionSignature, FunctionSignatureArg } from "./types";
import { getReadableType } from "./getReadableType";

export function getFunctionDoc(
  data: JSONOutput.DeclarationReflection,
): FunctionDoc {
  return {
    name: data.name,
    signatures: data.signatures?.map(getFunctionSignatureDoc),
    source: data.sources?.[0]?.url,
  };
}

function getFunctionSignatureDoc(signature: JSONOutput.SignatureReflection) {
  const output: FunctionSignature = {
    summary: signature.comment?.summary,
    args: signature.parameters?.map((param) => {
      const arg: FunctionSignatureArg = {
        name: param.name,
        type: param.type ? getReadableType(param.type) : undefined,
        summary: param.comment?.summary,
        isOptional: param.flags.isOptional || undefined,
        isRest: param.flags.isRest || undefined,
      };
      return arg;
    }),
    blockTags: signature.comment?.blockTags,
    returns: {
      type: signature.type ? getReadableType(signature.type) : undefined,
      summary: signature.comment?.blockTags?.find(
        (tag) => tag.tag === "@returns",
      )?.content,
    },
  };

  return output;
}
