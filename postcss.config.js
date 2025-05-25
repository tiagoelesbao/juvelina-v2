// postcss.config.js
export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              colormin: true,
              convertValues: true,
              calc: true,
              zindex: false,
              reducedMotion: true,
            }]
          },
          'postcss-combine-media-query': {},
          'postcss-combine-duplicated-selectors': {
            removeDuplicatedProperties: true,
            removeDuplicatedValues: true,
          },
          'postcss-sort-media-queries': {
            sort: 'mobile-first',
          },
          'postcss-pxtorem': {
            rootValue: 16,
            propList: ['*'],
            selectorBlackList: [/^html$/],
            replace: true,
            mediaQuery: false,
            minPixelValue: 2,
          }
        }
      : {})
  }
};
