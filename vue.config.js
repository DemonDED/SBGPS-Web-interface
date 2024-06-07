const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use "~@/assets/scss/_color.scss" as *; @use "~@/assets/scss/_mixins.scss" as *;`
      }
    }
  },
})
