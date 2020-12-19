module.exports = {
  plugins: {
    'postcss-easy-import': {},
    tailwindcss: {
      config: './tailwind.config.js',
    },

    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-media-queries': true,
        'nesting-rules': true,
      },
    },
    autoprefixer: {},
  },
}
