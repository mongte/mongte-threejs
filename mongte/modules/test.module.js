export default function tttt(option) {
  this.nuxt.hook('ready', async next => {
    console.log('nuxt is ready')
  })
}

module.exports.meta = require('../package.json')