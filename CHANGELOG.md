## Current

## 2.0.2

- Update error message to say "shouldn’t" instead of "cannot"

## 2.0.1

- Fix output because of `exports.default =` was used before instead of `module.export =`
- Move type exports in a `types` file (breaking change)

## 2.0.0

### `preferred-export-default-naming`

- Parse `ImportNamespaceSpecifier` in addition to `ImportDefaultSpecifier` (breaking change)
- Add new config `preferNamespace` to tell if we want to use `import` or `import * as`

### `prevent-imports`

- Add new rule

## 1.1.1

Only generate 1 report per import per file and autofix every variable at the same time to avoid desynchronization

## 1.1.0

Display warning / autofix variables that corresponds to the wrongly named import statements

## 1.0.1

Allow to deactivate the autofix

## 1.0.0

Detect if default imports don't match the preferred names set in eslint's config and autofix it
