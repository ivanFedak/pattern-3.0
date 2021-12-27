//Основной модуль
import gulp from 'gulp';
//Импорт путей
import { path } from './gulp/config/path.js';
//Импорт общих плагинов
import {plugins} from './gulp/config/plugins.js';

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
};

//Импорт задач
import {copy} from './gulp/tasks/copy.js';
import {reset} from './gulp/tasks/reset.js';
import {html} from './gulp/tasks/html.js';
import {server} from './gulp/tasks/server.js';
import {sass} from './gulp/tasks/sass.js';
import {js} from './gulp/tasks/js.js';
import {images} from './gulp/tasks/images.js';
import {otfToTtf, ttfToWoff, fontsStyle} from './gulp/tasks/fonts.js';

//Наблюдение за изминениями файлов
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.sass, sass);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

//Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf,ttfToWoff,fontsStyle);

//Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy,html,sass,js, images));

//Построение сценария выполнения задач
const dev = gulp.series(reset,mainTasks,gulp.parallel(watcher,server));

//Выполняем сценарий по умолчанию
gulp.task('default', dev); 