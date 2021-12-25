import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; //Сжатие css
import webpcss from 'gulp-webpcss'; //Вывод WEBP изображений
import autoprefixer from  'gulp-autoprefixer'; //Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // \Групирование медиа запросов


const sas = gulpSass(dartSass);

export const sass = ()=>{
    return app.gulp.src(app.path.src.sass,{sourcemaps: true})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SASS',
                message: 'Error: <%= error.message %>'
            }))
        )
        .pipe(sas({
            outputStyle: 'expanded',
        }))
        .pipe(groupCssMediaQueries())
        .pipe(webpcss(
            {
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            }
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: true
        }))
        .pipe(app.gulp.dest(app.path.buid.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.buid.css))
        .pipe(app.plugins.browsersync.stream());
};