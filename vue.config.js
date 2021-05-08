// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/style/variables.scss";`
            },
        }
    }
}
