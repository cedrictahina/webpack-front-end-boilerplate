module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  plugins: ['import'],
  extends: [
    'eslint:recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVestion: 7,
    ecmaFeatures: {
      sourceType: 'module',
      jsx: false
    },
    allowImportExportEverywhere: true,
  },
  rules: {
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    indent: ['error', 2],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['warn'],
    'no-console': 1,
  },
};
