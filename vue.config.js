module.exports = {
  publicPath: "/frontend",
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppCache: "yes",
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
        skipWaiting: true,
        navigateFallback: 'index.html',
        clientsClaim: true,
    }
  },
}