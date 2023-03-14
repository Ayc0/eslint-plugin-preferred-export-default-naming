import { RuleTester } from "eslint";

import rule, { type RuleConfig } from "../src/prevent-imports";

const suites: Array<{
  file: string;
  code: string;
  output?: string;
  errors?: string[];
  config: RuleConfig;
}> = [
  {
    file: "ok.ts",
    code: "import a, { b } from 'c';import * as a from 'c'",
    config: [
      {
        module: "react",
        names: ["a"],
      },
    ],
  },

  {
    file: "no-named-import.ts",
    code: "import { a } from 'b';import _c from 'c';class D extends _c.d {}; const e: _c.e = {};",
    config: [
      {
        module: "b",
        names: ["a"],
      },
      {
        module: "c",
        names: ["d", "e"],
        reason: "Prefer f",
      },
    ],
    errors: [
      'You cannot import "a" from "b"',
      'You cannot use "d" from "c": Prefer f',
      'You cannot use "e" from "c": Prefer f',
    ],
  },

  {
    file: "multiple-from-same-module.ts",
    code: "import A, { b, c } from 'a';const b = A.b;function c(_c = A.c) {}",
    config: [
      {
        module: "a",
        names: ["b"],
        reason: "B",
      },
      {
        module: "a",
        names: ["c"],
        reason: "C",
      },
    ],
    errors: [
      'You cannot import "b" from "a": B',
      'You cannot import "c" from "a": C',
      'You cannot use "b" from "a": B',
      'You cannot use "c" from "a": C',
    ],
  },
];

for (const suite of suites) {
  const ruleTester = new RuleTester({
    // @ts-expect-error
    parser: require.resolve("@typescript-eslint/parser"),
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

  ruleTester.run("blocz/prevent-imports", rule, {
    valid,
    invalid,
  });
}
