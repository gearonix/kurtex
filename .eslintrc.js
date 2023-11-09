const grnx = require('@grnx-utils/eslint')

module.exports = grnx({
    root: __dirname,
    tsconfig: 'tsconfig.base.json',
    monorepo: true,
    enableImports: false
})