import fs from 'fs';
import fonter from 'gulp-fonter-unx';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => { 
    //Ищем файл шрифтов .otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`,{})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message %>'
            }))
        )
        // Конвертировать в .ttf
        .pipe(fonter({
            formats:['ttf']            
        }))
        //Выгружаем в исходную папку
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
};
export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`,{})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message %>'
            }))
        )
        //Конвертировать в .woff
        .pipe(fonter({
            formats:['woff']
        }))
        //Выгружаем в папку с результатами
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        //Ищем файлы шрифтов .ttf
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        //Конвертировать в .woff2
        .pipe(ttf2woff2())
        //Выгружаем в папку с результатом
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};
export const fontsStyle = () => {
    //Файл стилей подключение шрифтов
    let fontsFile = `${app.path.srcFolder}/sass/services/_fonts.scss`;
    //Проверяем существует ли файл шрифтов
    fs.readdir(app.path.build.fonts, function(err,fontsFiles) {
        if(fontsFiles){
            //Проверяем существует ли файл стилей для подключения шрифтов
            if(!fs.existsSync(fontsFile)){
                //Если файла нет,создаем его
                fs.writeFile(fontsFile,'', cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                  //Записываем подключение шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if(newFileOnly !== fontFileName){
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if(fontWeight.toLowerCase() === 'thin'){
                            fontWeight = 100;
                        } else if(fontWeight.toLowerCase() === 'extralight'){
                            fontWeight = 200;
                        } else if(fontWeight.toLowerCase() === 'light'){
                            fontWeight = 300;
                        }else if(fontWeight.toLowerCase() === 'medium'){
                            fontWeight = 500;                      
                        } else if(fontWeight.toLowerCase() === 'semibold'){
                            fontWeight = 600;
                        } else if(fontWeight.toLowerCase() === 'bold'){
                            fontWeight = 700;                 
                        } else if(fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy'){
                            fontWeight = 800;                  
                        } else if(fontWeight.toLowerCase() === 'black'){
                            fontWeight = 900;                  
                        } else{
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile,`@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format("woff2"),url("../fonts/${fontFileName}/.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            }else{
                //Если файл есть выводим сообщение
                console.log('Файл sass/services/fonts.scss уже существует. Для обновления файла нужно его удалить');
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
};