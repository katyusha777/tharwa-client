import antfu from '@antfu/eslint-config'

export default antfu(
  {

  },
  {
    files: ['**/*.ts'],
    rules: {
      'semi': ['error', 'never'],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/extensions': ['error', 'never', { ts: 'never', tsx: 'never' }],
      'no-unused-vars': 'off',
      'unused-imports/no-unused-vars': 'off',
      'ts/no-unused-vars': 'off',
      'no-console': 'off',
      'ts/ban-ts-comment': 'off',
      'antfu/no-import-dist': 'off',
      'node/prefer-global/process': 'off',
      'antfu/no-import-node-modules-by-path': 'off',
    },
  },
  {
    rules: {},
  },
)
