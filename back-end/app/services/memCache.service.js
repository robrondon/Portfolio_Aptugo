const hash = require('node_hash')
const fs = require('fs')

module.exports = class memCache {
  getMemCache(url, timeout) {
    const file = hash.md5(url)
    if (fs.existsSync(__dirname + '/cache/' + file)) {
      var stats = fs.statSync(__dirname + '/cache/' + file)
      let minutes = (new Date().getTime() - stats.mtime) / 1000 / 60
      if (minutes > timeout) {
        return null
      } else {
        return fs.readFileSync(__dirname + '/cache/' + file)
      }
    } else {
      return null
    }
  }

  save(url, contents, binary = false) {
    const file = hash.md5(url)
    if (!fs.existsSync(__dirname + '/cache/')) {
      fs.mkdirSync(__dirname + '/cache')
    }
    if (!binary) {
      fs.writeFileSync(__dirname + '/cache/' + file, JSON.stringify(contents), { flag: 'w' })
    } else {
      fs.writeFileSync(__dirname + '/cache/' + file, contents, { flag: 'w' })
    }
  }
}
