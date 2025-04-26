import swc from '@rollup/plugin-swc';
import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'src/index.ts',
    output: [
      { dir: 'dist', preserveModules: true, entryFileName: '[name].js', chunkFileNames: '[name]-[hash].js', format: 'esm' }
    ],
    plugins: [
      nodeResolve(),           // 解析 node_modules 中的模块
      commonjs(),              // 将 CommonJS 转为 ES6
      typescript({             // TypeScript 支持
        tsconfig: './tsconfig.json',
        jsx: 'preserve'        // 保留 JSX 交给 Babel 处理
      }),
      babel({                 // Babel 转换
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      swc()
    ]
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts', format: 'esm' },
    plugins: [dts()]
  }
];