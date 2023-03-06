## TL;DR

This ESLint rule enforces preferred names for default exports

```js
/*
  eslint blocz/preferred-export-default-naming: [
    "error", { "module": "react", "name": "React" }
  ]
*/

import react from "react"; // this will throw an error
import React from "react"; // this won't throw an error
```

## How to use

In `.eslintrc`:

```jsonc
{
  "plugins": "blocz",
  "rules": {
    "blocz/preferred-export-default-naming": [
      "warn",
      {
        "modules": "classnames",
        "name": "classNames",
        "autofix": false // disable autofix
      },
      {
        "modules": "react",
        "name": "React" // as autofix by default
      },
      {
        "modules": "react-dom",
        "name": "ReactDOM",
        "autofix": true // enable autofix (for clarity)
      }
    ]
  }
}
```
