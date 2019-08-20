module.exports = {
  "extends": "airbnb",
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
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
  },
};
