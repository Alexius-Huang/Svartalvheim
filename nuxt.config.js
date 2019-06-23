module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Svartalvheim',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Maxwell Alexius' },
      { property: 'og:url', content: 'https://svartalvhe.im/maxwell-alexius' },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: 'Maxwell Alexius' },
      { property: 'og:description', content: 'Welcome to Svartalvheim where Software Built' },
      { property: 'og:image', content: 'https://i.imgur.com/appNsU9.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,500|Staatliches' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Mono|Share+Tech+Mono' }
    ],
    script: [
      { type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
