module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: ["@vue/babel-plugin-jsx"] // Vue 3 JSX 转换
};
