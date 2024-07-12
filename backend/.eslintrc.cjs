module.exports = {
    root: true,
    env: { node: "true" },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    ignorePatterns: ['dist', 'server', 'node_modules', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        'no-unused-vars': 1,
        "@typescript-eslint/no-unused-vars": 1,
    },
};
