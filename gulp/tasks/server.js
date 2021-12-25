export const server = (done)=>{
    app.plugins.browsersync.init({
        server: {
            baseDir: `${app.path.buid.html}`
        },
        notify: false,
        port: 4000
    })
};