//Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());


const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
    buid:{
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/files/`,
    },
    src:{
        js: `${srcFolder}/js/app.js`, 
        sass: `${srcFolder}/sass/style.sass`, 
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
    },
    watch:{
        js: `${srcFolder}/js/**/*.js`, 
        sass: `${srcFolder}/sass/**/*`, 
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``,
};