const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 1920 / 120, // 1920px为设计稿大小
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [/^.html/], //排除html样式
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
};

module.exports = config;
