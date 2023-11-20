module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    [
      "@babel/env",
      {
        targets: {
          browsers: [">0.25%", "not ie 11", "not op_mini all"]
        },
        modules: false
      }
    ],
    "@babel/preset-react"
  ]
};