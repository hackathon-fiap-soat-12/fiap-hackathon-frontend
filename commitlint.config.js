module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
    ],
    'scope-enum': [2, 'always', ['core', 'ui', 'api', 'docs']],
    'subject-case': [2, 'never', ['start-case', 'pascal-case']],
  },
};
