module.exports = {
  extends: ['../../.eslintrc.js'],
  ignorePatterns: ['!**/*'],
  rules: {
    /**
     * disabled due to 'use client' strings in next.js
     */
    '@typescript-eslint/no-unnecessary-condition': 'off'
  }
}
