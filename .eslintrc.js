module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:nuxt/recommended",
    "@nuxt/eslint-config",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  plugins: ["nuxt"],
  rules: {
    radix: [0],
    "no-underscore-dangle": "off",
    "vue/v-on-event-hyphenation": [0],
    "lines-between-class-members": [0],
    "import/extensions": [0],
    "import/no-unresolved": [0],
    "import/prefer-default-export": [0],
    "import/no-dynamic-require": [0],
    "import/no-extraneous-dependencies": [0],
    "import/no-mutable-exports": [0],
    "global-require": [0],
    "max-classes-per-file": [0],
    "class-methods-use-this": [0],
    "no-sequences": [0],
    "no-async-promise-executor": [0],

    camelcase: [0],
    "vue/no-v-html": [0],
    "vue/require-default-prop": [0],
    "vue/prop-name-casing": [0],
    "vue/require-component-is": [0],
    "func-names": [0],
    "no-restricted-globals": [0],
    "no-nested-ternary": [0],
    "no-param-reassign": [0],
    "linebreak-style": [0],
    "no-console": [1],
    "no-return-await": [0],
    "no-alert": 1,
    "vue/no-v-model-argument": "off",
    "vue/max-attributes-per-line": [
      1,
      {
        singleline: 3,
      },
    ],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["template"],
      },
    ],
    {
      "vue/require-explicit-emits": ["error", {
        "allowProps": false
      }]
    }
  },
};
