import { RuleTester } from "eslint";

import rule, { type RuleConfig } from "../src/preferred-export-default-naming";

const suites: Array<{
  file: string;
  code: string;
  output?: string;
  errors?: string[];
  config: RuleConfig[];
}> = [
  {
    file: "allowed.ts",
    code: "import React from 'react';",
    config: [
      {
        module: "react",
        name: "React",
      },
    ],
  },
  {
    file: "error.ts",
    code: "import react from 'react';",
    config: [
      {
        module: "react",
        name: "React",
      },
    ],
    errors: ['The preferred name of the react\'s default export is "React"'],
    output: "import React from 'react';",
  },
  {
    file: "autofix-content.ts",
    code: "import react from 'react';const element = react.createElement('div');",
    config: [
      {
        module: "react",
        name: "React",
      },
    ],
    errors: [`The preferred name of the react's default export is "React"`],
    output:
      "import React from 'react';const element = React.createElement('div');",
  },
];

for (const suite of suites) {
  const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 2018, sourceType: "module" },
  });

  const valid: RuleTester.ValidTestCase[] = [];
  const invalid: RuleTester.InvalidTestCase[] = [];

  if (suite.errors) {
    invalid.push({
      name: suite.file,
      filename: suite.file,
      code: suite.code,
      output: suite.output ?? suite.code,
      errors: suite.errors,
      options: suite.config,
    });
  } else {
    valid.push({
      name: suite.file,
      filename: suite.file,
      code: suite.code,
      options: suite.config,
    });
  }

  ruleTester.run("blocz/preferred-export-default-naming", rule, {
    valid,
    invalid,
  });
}
