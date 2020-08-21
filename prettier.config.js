module.exports = {
  semi: false,
  printWidth: 100,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
  jsxBracketSameLine: true,
  useTabs: false,
  overrides: [
    {
      files: ['**/*.json', '**/.prettierrc', '**/.babelrc'],
      options: { parser: 'json' },
    },
  ],
}
