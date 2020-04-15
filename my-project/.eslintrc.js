// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    "no-new": "off",
    "space-before-function-paren": "off",
    camelcase: "off",
    "no-unused-vars": "off",
    "no-multi-spaces": "off",
    "no-unused-expressions": "off",
    "no-sequences": "off",
    "arrow-spacing": "off",
    "padded-blocks": "off",
    "block-spacing": "off",
    "no-multiple-empty-lines": "off",
    "space-infix-ops": "off",
    "comma-spacing": "off",
    "space-before-blocks": "off",
    "keyword-spacing": "off",
    semi: "off",
    quotes: "off",
    "eol-last": "off",
    "comma-dangle": "off",
    "key-spacing": "off",
    "no-trailing-spaces": "off",
    "spaced-comment": "off",
    indent: "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
