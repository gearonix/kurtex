const grnx = require('@grnx-utils/eslint')

module.exports = grnx({
    root: __dirname,
    tsconfig: 'tsconfig.base.json',
    monorepo: true,
    enableImports: false,
    ext: {
        'effector/no-forward': 'off',
        // disabled due to conflict with plugin-perfectionist
        'effector/keep-options-order': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        'prefer-arrow/prefer-arrow-functions': 'off'
    }
})
