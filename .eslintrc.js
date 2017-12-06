module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'react/no-danger': 'off',
    'import/no-extraneous-dependencies': 'off',
    'arrow-parens': 'off',
    'global-require': 'off',
    'spaced-comment': 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    'jsx-a11y/label-has-for': 'off'
  },

  settings: {
    'import/resolver': {
      'webpack': {}
    }
  }
};
