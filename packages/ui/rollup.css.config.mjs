import scss from 'rollup-plugin-scss';

export default [
  {
    external: [
      /node_modules/,
    ],
    input: 'src/index.scss',
    output: {
      dir: 'dist',
      preserveModules: true,
      format: 'esm',
    },
    plugins: [
      scss()
    ]
  },
];