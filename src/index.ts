import preferredExportDefaultNaming from "./preferred-export-default-naming";
import type { RuleConfig as PreferredExportDefaultNamingRuleConfig } from "./preferred-export-default-naming";
import preventImports from "./prevent-imports";
import type { RuleConfig as PreventImportsRuleConfig } from "./prevent-imports";

export type Configs = {
  "preferred-export-default-naming": PreferredExportDefaultNamingRuleConfig;
  "prevent-imports": PreventImportsRuleConfig;
};

export default {
  rules: {
    "preferred-export-default-naming": preferredExportDefaultNaming,
    "prevent-imports": preventImports,
  },
};
