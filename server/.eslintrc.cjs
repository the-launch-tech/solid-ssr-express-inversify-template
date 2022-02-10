module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-explicit-any': 1,
        '@typescript-eslint/await-thenable': 1,
        '@typescript-eslint/class-literal-property-style': 1,
        '@typescript-eslint/explicit-function-return-type': 1,
        '@typescript-eslint/no-empty-interface': 1,
        '@typescript-eslint/no-invalid-void-type': 2,
        '@typescript-eslint/no-misused-promises': 2,
        '@typescript-eslint/no-misused-new': 2,
        '@typescript-eslint/no-unnecessary-condition': 2,
        '@typescript-eslint/no-unsafe-return': 2,
        '@typescript-eslint/prefer-as-const': 2,
        '@typescript-eslint/prefer-readonly': 1,
        '@typescript-eslint/prefer-return-this-type': 2
    }
};
