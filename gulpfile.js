//Основной модуль
import gulp from 'gulp';
//Импорт путей
import { path } from './gulp/config/path.js';
//Импорт общих плагинов
import {plugins} from './gulp/config/plugins.js';

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
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
import {svgSprive} from './gulp/tasks/svgSprive.js';
import {zip} from './gulp/tasks/zip.js';
import {ftp} from './gulp/tasks/ftp.js';

//Наблюдение за изминениями файлов
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html); //gulp.series(html,ftp) если хотим чтобы при изменении файла сразу постился на сервер
    gulp.watch(path.watch.sass, sass);
    gulp.watch(path.watch.js, js); 
    gulp.watch(path.watch.images, images);
}

export {svgSprive}; //npm run svgSprive

//Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf,ttfToWoff,fontsStyle);

//Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy,html,sass,js, images));

//Построение сценария выполнения задач
const dev = gulp.series(reset,mainTasks,gulp.parallel(watcher,server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip); 
const deployFTP = gulp.series(reset, mainTasks, ftp); 

//Экспорт сценариев
export {dev};//npm run dev
export {build}; //npm run build
export {deployZIP}; //npm run zip
export {deployFTP}; //npm run deploy

//Выполняем сценарий по умолчанию
gulp.task('default', dev);//gulp