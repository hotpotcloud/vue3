
module.exports = {
    transpileDependencies: ['uview-ui', '@dcloudio/uni-ui']
}
const RES = require('./src/utils/configjs')
// 读取 manifest.json ，修改后重新写入
// import { Global_Cog } from './src/utils/config'
const fs = require('fs')

const manifestPath = './src/manifest.json'
let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' })
function replaceManifest(path, value) {
    const arr = path.split('.')
    const len = arr.length
    const lastItem = arr[len - 1]

    let i = 0
    let ManifestArr = Manifest.split(/\n/)

    for (let index = 0; index < ManifestArr.length; index++) {
        const item = ManifestArr[index]
        if (new RegExp(`"${arr[i]}"`).test(item)) ++i
        if (i === len) {
            const hasComma = /,/.test(item)
            ManifestArr[index] = item.replace(
                new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
                `"${lastItem}": ${value}${hasComma ? ',' : ''}`
            )
            break
        }
    }

    Manifest = ManifestArr.join('\n')
}
// 读取环境变量内容
replaceManifest('appid', `"${process.env.VUE_APP_ID}"`)
// replaceManifest('appid', `"${RES.Global_Cog.APPID}"`)
replaceManifest('mp-weixin.appid', `"${process.env.VUE_APP_ID}"`)
// replaceManifest('mp-weixin.appid', `"${RES.Global_Cog.APPID}"`)
fs.writeFileSync(manifestPath, Manifest, {
    flag: 'w'
})

//移除clog
// module.exports = {
//     chainWebpack: (config) => {
//         // 发行或运行时启用了压缩时会生效
//         config.optimization.minimizer('terser').tap((args) => {
//             const compress = args[0].terserOptions.compress
//             // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
//             compress.drop_console = true
//             compress.pure_funcs = [
//                 '__f__', // App 平台 vue 移除日志代码
//                 // 'console.debug' // 可移除指定的 console 方法
//             ]
//             return args
//         })
//     }
// }

