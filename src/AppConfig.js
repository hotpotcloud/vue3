//未启用
const RES = require('./utils/configjs')
const fs = require('fs')
// const manifestPath = process.env.UNI_INPUT_DIR + '/manifest.json'
const manifestPath = process.env.UNI_INPUT_DIR + '/manifest.json'
let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' })
function replaceManifest(path, value) {
  const arr = path.split('.')
  const len = arr.length
  const lastItem = arr[len - 1]

  let i = 0
  let ManifestArr = Manifest.split(/\n/)

  for (let index = 0; index < ManifestArr.length; index++) {
    const item = ManifestArr[index]
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
    if (i === len) {
      const hasComma = /,/.test(item)
      ManifestArr[index] = item.replace(new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`), `"${lastItem}": ${value}${hasComma ? ',' : ''}`)
      break;
    }
  }

  Manifest = ManifestArr.join('\n')
}

// 动态配置 appid
if (process.env.NODE_ENV === 'production'
  || process.env.NODE_ENV === 'prod'
  || process.env.NODE_ENV === 'rc') {
  // replaceManifest('mp-weixin.appid', '正式和预发网络环境的appid')
  replaceManifest('mp-weixin.appid', RES.Global_Cog.APPID)
} else {
  replaceManifest('mp-weixin.appid', RES.Global_Cog.APPID)
}

fs.writeFileSync(manifestPath, Manifest, {
  "flag": "w"
})

