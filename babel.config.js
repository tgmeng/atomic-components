const baseConfig = {
  presets: ['@babel/preset-react', '@emotion/babel-preset-css-prop'],
};

module.exports = (api) => {
  const isTest = api.env('test');

  return isTest
    ? {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          ...baseConfig.presets,
        ],
      }
    : {
        presets: [
          ['@babel/preset-env', { modules: false }],
          ...baseConfig.presets,
        ],
      };
};
