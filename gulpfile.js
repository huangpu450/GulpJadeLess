/**
* [gulp description]
* @type {[type]}
*/
var gulp = require("gulp");
var data = require('gulp-data');
var gutil = require("gulp-util");
var del = require("del");
var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var spritesmith = require('gulp.spritesmith');
var gulpJade = require('gulp-jade');
var minify_css = require('gulp-minify-css');
/*var assetRev = require('gulp-asset-rev');*/

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var connect = require('gulp-connect');
var rest = require('connect-rest');
var pkg = require('./package.json');
/**
 * ----------------------------------------------------
 * source configuration
 * ----------------------------------------------------
 */

var src = {
    html: "src/html/*.html",                          // html 文件
    jade: "src/html/**/*.jade",                          // jade 文件
    vendor: ["vendor/**/*", "bower_components/**/*"], // vendor 目录和 bower_components
    style: "src/style/**/*.less",                  // style 目录下所有 xx/*.less
    script:"src/js/**/*.js",                       // js 目录下所有 xx/*.js
    png: "src/images/sprit/*.png",                  // images目录下所有的png文件
    img: "src/images/**/*",                       // images目录下所有的图片文件
    assets: "src/assets/**/*" ,                           // 图片等应用资源
    js: "src/js/**/*"                             // js
};

var dist = {
    root: "dist/",
    html: "dist/html",
    style: "dist/style",
    png: "dist/images/sprit",
    img: "dist/images",
    vendor: "dist/vendor",
    assets: "dist/assets",
    js: "dist/js"
};

var bin = {
    root: "bin/",
    html: "bin/",
    style: "bin/style",
    vendor: "bin/vendor",
    assets: "bin/assets",
    js: "bin/js"
};

/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */

/**
 * clean build dir
 */
function clean(done) {
    del.sync(dist.root);
    done();
}

/**
 * [cleanBin description]
 * @return {[type]} [description]
 */
function cleanBin(done) {
    del.sync(bin.root);
    done();
}

/**
 * [copyVendor description]
 * @return {[type]} [description]
 */
function copyVendor() {
    return gulp.src(src.vendor)
        .pipe(gulp.dest(dist.vendor));
}

/**
 * [copyAssets description]
 * @return {[type]} [description]
 */
function copyAssets() {
    return gulp.src(src.assets)
        .pipe(gulp.dest(dist.assets));
}
/**
 * [copyImg description]
 * @return {[type]} [description]
 */
function copyImg() {
    return gulp.src(['src/images/**/*', '!src/images/sprit/*.png'])
        .pipe(gulp.dest(dist.img));
}
/**
 * [copyJavascript description]
 * @return {[type]} [description]
 */
function copyJavascript() {
    return gulp.src(src.js)
        .pipe(gulp.dest(dist.js));
}

/**
 * [copyDist description]
 * @return {[type]} [description]
 */
function copyDist() {
    return gulp.src(dist.root + '**/*')
        .pipe(gulp.dest(bin.root));
}

/**
 * [html description]
 * @return {[type]} [description]
 */
function html() {
    return gulp.src(src.html)
        /*.pipe(assetRev())*/
        .pipe(gulp.dest(dist.html))
}
/**
 * [jade description]
 * @return {[type]} [description]
 */
function jade() {
    var dataJson = require('./mocks/data.json');
    var cityData = require('./mocks/cityData.json');
    /*console.info(dataJson)*/
    return gulp.src(src.jade)
        /*.pipe(data(function(file) {
            return require('./src/html/data.json');
        }))*/
        .pipe(gulpJade({
            pretty: true,
            preety:true,
            data: {
                debug: false,
                name: pkg.name,
                keywords: pkg.keywords,
                description: pkg.description,
                json: dataJson,
                json2: cityData
            }
        }))
        .pipe(gulp.dest(dist.html))
}
/**
 * [spritesmithImg description]
 * @return {[type]} [description]
 */
function spritesmithImg() {
    return gulp.src(src.png)//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'css/sprite.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate: function (data) {
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-"+sprite.name+
                        "{" +
                        "background-image: url('"+sprite.escaped_image+"');"+
                        "background-position: "+sprite.px.offset_x+"px "+sprite.px.offset_y+"px;"+
                        "width:"+sprite.px.width+";"+
                        "height:"+sprite.px.height+";"+
                        "}\n");
                });
                return arr.join("");
            }

        }))
        .pipe(gulp.dest(dist.png));
}

/**
 * [style description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function style() {
    return gulp.src(src.style)
        .pipe(cached('style'))
        .pipe(less())
/*        .on('error', handleError)*/
        .pipe(autoprefixer({
            browsers: ['last 3 version']
        }))
        .pipe(minify_css())//4.混淆即压缩
/*        .pipe(assetRev())*/
        .pipe(gulp.dest(dist.style))
}

exports.style = style;

/**
 * [webpackProduction description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function webpackProduction(done) {
    var config = Object.create(webpackConfig);
    config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": "production"
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    );

    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:production]", stats.toString({
            colors: true,
        }));
        done();
    });
}


/**
 * [webpackDevelopment description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
var devConfig, devCompiler;

devConfig = Object.create(webpackConfig);
devConfig.devtool = "sourcemap";
/*devConfig.debug = true;*/
devCompiler = webpack(devConfig);

function webpackDevelopment(done) {
    devCompiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
            return;
        }
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        done();
    });
}

/**
 * webpack develop server
 */
// devConfig.plugins = devConfig.plugins || []
// devConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
// function webpackDevelopmentServer(done) {
//   new WebpackDevServer(devCompiler, {
//    contentBase: dist.root,
//     lazy: false,
//     hot: true
//   }).listen(8080, 'localhost', function (err) {
//     if (err) throw new gutil.PluginError('webpack-dev-server', err)
//     gutil.log('[webpack-dev-server]', 'http://localhost:8080/')
//  reload();
//  done();
//   });
// }

/**
 * [connectServer description]
 * @return {[type]} [description]
 */
function connectServer(done) {
    connect.server({
        /*root: dist.root,*/
        port: 8080,
        livereload: true,
        middleware: function(connect, opt) {
            return [rest.rester({
                context: "/"
            })]
        }
    });
    done();
}

/**
 * [watch description]
 * @return {[type]} [description]
 */
function watch() {
    gulp.watch(src.html, html);
    gulp.watch("src/**/*.jade", jade);
    gulp.watch("src/**/*.js", copyJavascript);
    gulp.watch("src/**/*.less", style);
    gulp.watch("dist/**/*").on('change', function(file) {
        gulp.src('dist/')
            .pipe(connect.reload());
    });
}

/**
 * default task
 */
gulp.task("default", gulp.series(
    clean,
    gulp.parallel(copyAssets, copyImg, copyJavascript, copyVendor, html, jade, spritesmithImg, style, webpackDevelopment),
    connectServer,
    watch
));

/**
 * production build task
 */
gulp.task("build", gulp.series(
    clean,
    gulp.parallel(copyAssets, copyImg , copyJavascript, copyVendor, html, jade, spritesmithImg, style, webpackDevelopment, webpackProduction),
    cleanBin,
    copyDist,
    function(done) {
        console.log('build success');
        done();
    }
));

/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function handleError(err) {
    if (err.message) {
        console.log(err.message)
    } else {
        console.log(err)
    }
    this.emit('end')
}

/**
 * [reload description]
 * @return {[type]} [description]
 */
function reload() {
    connect.reload();
}