//First Gulp file

const {src , dest , watch , series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync').create();
//sass task

function scssTask(){
    return src('app/scss/**/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(dest('dist', {sorcemaps: '.'}))
}

//Browser-Sync tasks

function browsersyncServe(e){
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    e();
}

function browsersyncReload(e){
    browsersync.reload();
    e();
}




//Watch Task
function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['app/scss/**/*.scss', 'app/js/**/*.js'] ,series(scssTask, browsersyncReload))
}

//Default Gulp tasks

exports.default = series(
    scssTask,
    browsersyncServe,
    watchTask
)