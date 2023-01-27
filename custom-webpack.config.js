const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  plugins: [
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(fileName => !fileName.endsWith('.map'));
        entrypointFiles.push(...entrypoints.polyfills.filter(dups => !entrypointFiles.includes(dups)).filter(js => js.endsWith(".js")))
        entrypointFiles.push(...entrypoints.styles.filter(css => css.endsWith(".css")))
        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        };
      }
    })
  ]
};
