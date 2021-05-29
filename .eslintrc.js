module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['@askeladden/eslint-config-askeladden'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // Prettier responsibility
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',

    // https://notes.webutvikling.org/default-exports/
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
