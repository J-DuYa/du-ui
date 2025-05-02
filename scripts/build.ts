import chalk from 'chalk'
import { join } from 'node:path'
import { glob } from 'glob'
import { rollup, } from 'rollup'
import scss from 'rollup-plugin-scss'

function vconsole (
  type: 'msg' | 'done' | 'com' | 'start' = 'msg',
  msg: string,
  options?: {
    
  }
) {
  switch (type) {
    case 'msg':
      console.log(chalk.blue(msg))
      break
    case 'com':
      console.log(chalk.magenta(msg))
      break
    case 'start':
      console.log(chalk.rgb(41, 45, 62).underline(msg))
      break
    case 'done':
      console.log(chalk.green(msg))
      break
    default:
      console.log('default')
  }
}

const logPlugin = (btn: string) => {
  return {
    name: 'log-plugin',
    buildStart() {
      vconsole('start', `🚀 Start building ${btn}...`)
    },
    buildEnd() {
      vconsole('done', '✅ Build Done')
    },
    transform() {
      vconsole('com', `🔧 Processing: ${btn}/index.scss`)
      return null
    }
  }
}

async function generateRollupToCss () {
  vconsole('msg', 'Enter to generate this rollup configuration...')
  // Read files
  const files = await glob('src/**/index.scss', {
    cwd: process.cwd(),
  })

  for (let idx = 0; idx < files.length; idx ++) {
    const el = files[idx]
    vconsole('msg', `Dealing: ${el}`)
    const name = el.match(/^src\/([^\/]+)\/index\.scss$/)?.[1]

    const bundle = await rollup({
      external: [
        /node_modules/
      ],
      input: el,
      output: {
        dir: join(process.cwd(), 'dist'),
        assetFileNames: `${name}/index.css`,
        format: 'es',
      },
      plugins: [
        logPlugin(name as string),
        scss({
          // @ts-ignore
          output: true, // 将 CSS 写入文件
          outputStyle: 'compressed', // 压缩输出
          fileName: `${name}/index.css` // 指定输出路径和文件名
        })
      ]
    })

    await bundle.write({
      dir: join(process.cwd(), 'dist'),
      assetFileNames: `${name}/index.css`,
      format: 'es',
    })

    vconsole('done', `Writed ${name} successfully.`)
  }
}

function build () {
  generateRollupToCss()
}

build()
