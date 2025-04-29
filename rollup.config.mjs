import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss';
// import postcss from 'rollup-plugin-postcss';
// import autoprefixer from 'autoprefixer';
// import cssnano from 'cssnano';

export default [
  {
    external: [
      /node_modules/
    ],
    input: ['./style/button/index.scss'],
    output: [
      {
        dir: 'dist',
        assetFileNames: 'button/index.css',
        format: 'es',
      }
    ],
    plugins: [
      scss({
        output: true, // 将 CSS 写入文件
        outputStyle: 'compressed', // 压缩输出
        fileName: 'button/index.css' // 指定输出路径和文件名
      })
    ]
  },
  {
    external: [
      /node_modules/,
      /(.scss)$/
    ],
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        preserveModules: true,
        entryFileName: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        format: 'esm',
      }
    ],
    plugins: [
      nodeResolve(),           // 解析 node_modules 中的模块
      commonjs(),              // 将 CommonJS 转为 ES6
      typescript({             // TypeScript 支持
        tsconfig: './tsconfig.json',
        jsx: 'preserve',        // 保留 JSX 交给 Babel 处理
        exclude: ['node_modules/**']
      }),
      babel({                 // Babel 转换
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**',
      }),
    ]
  },
  {
    external: [
      /node_modules/
    ],
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts', format: 'esm' },
    plugins: [dts()]
  },
];