/**
 * gulp demo
 *
 * by kele527
 */

var del=require('del');
var gulp=require('gulp');
var uglify=require('gulp-uglify');
var mincss=require('gulp-clean-css');//压缩css
var inline=require('gulp-inline-source'); //资源内联 （主要是js，css，图片）
var include=require('gulp-include'); //资源内联（主要是html片段）
var sequence=require('gulp-sequence');
var useref=require('gulp-useref'); //合并文件
var gulpif=require('gulp-if');
var print=require('gulp-print'); //打印命中的文件
var connect=require('gulp-connect'); //本地服务器
//var spritesmith=require('gulp.spritesmith');//雪碧图模块
var imagemin=require('gulp-imagemin');
var jshint=require('gulp-jshint');//js校检
var spriter=require('gulp-css-spriter');
//清理构建目录
gulp.task('clean',function (cb) {
    del(['dist']).then(function () {
        cb()
    })
});
gulp.task('css',function(){
    return gulp.src('./src/css/body.css')
    .pipe(spriter({
        'spriteSheet':'./dist/images/sprite.png',
        'pathToSpriteSheetFromCSS':'../images/sprite.png'
    }))
    .pipe(gulp.dest('./dist/css'))
});
//js校检
gulp.task('jshint',function(){
    return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
//图片压缩
gulp.task('imagemin',function(){
    return gulp.src('./src/images/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});
//视频
gulp.task('video',function(){
    return gulp.src('./src/*.{mp4,ogg}')
    .pipe(gulp.dest('dist/'));
});
gulp.task('mincss',function () {
    return gulp.src('./src/css/*.css')
        .pipe(mincss())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('minjs',function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});


gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(inline())//把js内联到html中
        .pipe(include())//把html片段内联到html主文件中
        .pipe(useref())//根据标记的块  合并js或者css
        .pipe(gulpif('*.js',uglify()))
        .pipe(gulpif('*.css',mincss()))
        .pipe(connect.reload()) //重新构建后自动刷新页面
        .pipe(gulp.dest('dist'));
});


//本地服务器  支持自动刷新页面
gulp.task('connect', function() {
    connect.server({
        root: './dist', //本地服务器的根目录路径
        port:8080,
        livereload: true
    });
});
gulp.task('spritesmith',function(){
    return gulp.src('./src/images/*.png').pipe(spritesmith({imgName:'sprite.png',
cssName:'css/sprite.css',
padding:5,
algorithm:'top-down'

//csstemplate:"css/handlebarsStr.css"
})).pipe(gulp.dest('dist/'));
});
//sequence的返回函数只能运行一次 所以这里用function cb方式使用
gulp.task('watchlist',function (cb) {
    sequence('clean',['mincss','minjs','html','css','jshint','video','imagemin'])(cb)
});

gulp.task('watch',function () {
    gulp.watch(['./src/**'],['watchlist']);
});


//中括号外面的是串行执行， 中括号里面的任务是并行执行。
gulp.task('default',function (cb) {
    sequence('clean',['mincss','minjs','html','connect','css','jshint','video','imagemin'],'watch')(cb)
});



