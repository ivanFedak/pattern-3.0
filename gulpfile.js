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

//Наблюдение за изминениями файлов
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.sass, sass);
}

const mainTasks = gulp.parallel(copy,html,sass);

//Построение сценария выполнения задач
const dev = gulp.series(reset,mainTasks,gulp.parallel(watcher,server));

//Выполняем сценарий по умолчанию
gulp.task('default', dev); 