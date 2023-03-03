import type { Rule } from "eslint";

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",

    docs: {
      description: "set preferred name for default imports",
      category: "Stylistic Issues",
    },

    fixable: "code",

    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          module: { type: "string" },
          name: { type: "string" },
          autofix: { type: "boolean" },
        },
        required: ["module", "name"],
        additionalProperties: false,
      },
      uniqueItems: true,
      minItems: 1,
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const foundOption = context.options.find(
          (option) => node.source.value === option.module
        );
        if (!foundOption) {
          // No setting about this import statement
          return;
        }

        const foundImportDefaultSpecifier = node.specifiers.find(
          (specifier) => specifier.type === "ImportDefaultSpecifier"
        );
        if (!foundImportDefaultSpecifier) {
          // No default import in this statement
          return;
        }
        if (foundImportDefaultSpecifier.local.name === foundOption.name) {
          // The default import matches the setting
          return;
        }

        context.report({
          node: foundImportDefaultSpecifier,
          loc: foundImportDefaultSpecifier.loc!,
          message: `The preferred name of the ${foundOption.module}'s default export is "${foundOption.name}"`,
          fix(fixer) {
            if (foundOption.autofix === false) {
              return [];
            }

            const fixes = [
              // Fix import
              fixer.replaceText(foundImportDefaultSpecifier, foundOption.name),
            ];

            // Fix every usage of this import
            for (const variable of context.getDeclaredVariables(
              foundImportDefaultSpecifier
            )) {
              fixes.push(
                ...variable.references.map((reference) =>
                  fixer.replaceText(reference.identifier, foundOption.name)
                )
              );
            }

            return fixes;
          },
        });
      },
    };
  },
};

export default rule;
