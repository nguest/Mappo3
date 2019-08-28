module.exports = {
  "extends": "airbnb",
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "env": {
    "browser": true,
    "node": true,
    "jasmine": true,
    "jest": true,
    "es6": true
  },
  "parser": "babel-eslint",

  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "babel"
  ],
  "rules": {
      "react/jsx-filename-extension": "off",
      "react/require-default": "off",
      "react/forbid-prop-types": "off",
      "object-curly-newline": "off",
      "react/jsx-boolean-value": "off",
      "react/state-in-constructor": "off",
      "react/destructuring-assignment": "off"
  },
};
x