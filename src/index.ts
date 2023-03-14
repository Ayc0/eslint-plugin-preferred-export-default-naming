import preferredExportDefaultNaming from "./preferred-export-default-naming";
import preventImports from "./prevent-imports";

const config = {
  rules: {
    "preferred-export-default-naming": preferredExportDefaultNaming,
    "prevent-imports": preventImports,
  },
};

export = config;
