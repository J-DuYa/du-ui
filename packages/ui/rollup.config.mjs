import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import vue from 'rollup-plugin-vue'
import typescript2 from 'rollup-plugin-typescript2';
// import scss from 'rollup-plugin-scss';
// import postcss from 'rollup-plugin-postcss';
// import autoprefixer from 'autoprefixer';
// import cssnano from 'cssnano';

const __dirname = dirname(fileURLToPath(import.meta.url))

console.log('__dirname', __dirname)

export default [
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
      vue({
        preprocessStyles: true
      }),
      nodeResolve(),           // 解析 node_modules 中的模块
      commonjs(),              // 将 CommonJS 转为 ES6
      typescript({             // TypeScript 支持
        tsconfig: './tsconfig.json',
        jsx: 'preserve',        // 保留 JSX 交给 Babel 处理
        exclude: ['node_modules/**']
      }),
      babel({                 // Babel 转换
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        exclude: 'node_modules/**',
      }),
      alias({
        entries: [
          { find: '@', replacement: resolve(__dirname, 'src') }
        ]
      })
    ]
  },
  {
    external: [
      /node_modules/
    ],
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
    },
    // output: { file: 'dist/index.d.ts', format: 'esm' },
    plugins: [
      dts(),
      // alias({
      //   entries: [
      //     { find: '@', replacement: resolve(__dirname, 'src') }
      //   ]
      // })
    ]
  },
];