module.exports = {
    root: true,
    extends: '@edwmurph/eslint-config',
    rules: {
        'max-len': ["error", { "code": 200 }]
    },
    env: {
        webextensions:true,
        browser:true
    }
  };