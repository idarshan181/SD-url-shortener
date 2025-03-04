module.exports = {
  '*': ['eslint --fix --no-warn-ignored'],
  '**/*.ts?(x)': () => 'pnpm run check-types',
  '*.json': ['prettier --write'],
};
