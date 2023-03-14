import type { TSESTree } from "@typescript-eslint/utils";

declare module "eslint" {
  export namespace Rule {
    interface NodeListener {
      "TSQualifiedName:exit"?: (node: TSESTree.TSQualifiedName) => void;
    }
  }
}
