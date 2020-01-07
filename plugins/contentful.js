const contentful = require('contentful')

// use default environment config for convenience
// these will be set via 'env' property in nuxt.config.js

const config = {
  // space: '5s3ysw7vjfxb',
  // accessToken: '6vbYwxmHR1agrTT8Wi_xHfjubGS-Kd9FrI93NpUyahs'
  space: '88i1q5wbj51u',
  accessToken: 'fdZtIn5JyUTSFA1r7GPH1VExukwmVP8mSdYzzV9ps6Q'
  // space: '0uy0bf3014cl',
  // accessToken: 'kRCPs5-sgHaCFp2PER0J08PIhumZRojT7Ql5JwrQ-AI'
}

// export 'createClient' to use it in page components

module.exports = {
  createClient () {
    return contentful.createClient(config)
  }
}
