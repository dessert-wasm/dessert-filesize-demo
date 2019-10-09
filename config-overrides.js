const path = require('path');


module.exports = config => {
  const wasmExtensionRegExp = /\.wasm$/;

  // New extension
  config.resolve.extensions.push('.wasm');

  // Make file-loader ignore WASM files
  config.module.rules.forEach(rule => {
    (rule.oneOf || []).forEach(oneOf => {
      if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
        oneOf.exclude.push(wasmExtensionRegExp);
      }
    });
  });

  // Add a dedicated loader for WASM
  // https://github.com/ballercat/wasm-loader
  // https://github.com/ballercat/wasm-loader/issues/3#issuecomment-459944069
  config.module.rules.push({
    test: wasmExtensionRegExp,
    include: path.resolve(__dirname, 'src'),
    use: [{ loader: require.resolve('wasm-loader'), options: {} }]
  });

  return config;
};
