module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'styled-components',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-react-jsx-source',
    ['import', { libraryName: 'antd', style: true }],
    // ["transform-imports", {
    //   "@capillarytech/cap-ui-library": {
    //     "transform": "@capillarytech/cap-ui-library/${member}",
    //     "preventFullImport": true
    //   },
    // }]
  ],
  env: {
    production: {
      only: ['app', 'node_modules/@capillarytech/*'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
