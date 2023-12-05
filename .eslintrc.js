const grnx = require('@grnx-utils/eslint')

module.exports = grnx({
    root: __dirname,
    tsconfig: 'tsconfig.base.json',
    monorepo: true,
    enableImports: false,
    ext: {
        'effector/no-forward': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off'
    }
})
