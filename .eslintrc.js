module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['airbnb'],
    parserOptions: {
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    parser: '@babel/eslint-parser',
    rules: {
      
      "no-undef":"off",
      "no-unused-vars":"off",
      "import/no-unresolved" :"off",
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "max-len": "off",
      "no-console":"off",
      "radix":"off",
      "no-use-before-define":"off",
      "no-restricted-globals":"off",
      "consistent-return": "off",
      "no-underscore-dangle":"off",
      "import/no-import-module-exports":"off"
        },        
    overrides: [
      {
        files: ['*.ts', '*.tsx'],  // Specify TypeScript files
        rules: {
  
        },
      },
    ],
  };
  