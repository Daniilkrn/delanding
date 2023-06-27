/* eslint-disable no-undef */
"use strict";

const {src,dest} = require("gulp");
const gulp = require("gulp");
// eslint-disable-next-line no-undef
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
// eslint-disable-next-line no-undef
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
// eslint-disable-next-line no-undef
const uglify = require("gulp-uglify");
// eslint-disable-next-line no-undef
const rigger = require("gulp-rigger");
const plumber = require("gulp-plumber");
const panini = require("panini");
const imagemin = require("gulp-imagemin");
const del = require("del");
const notify = require("gulp-notify");
// eslint-disable-next-line no-unused-vars
const media = require("gulp-group-css-media-queries");
// eslint-disable-next-line no-unused-vars
const ghPages = require("gulp-gh-pages");
const browserSync = require("browser-sync").create();

const srcPath = "src/";
const distPath = "dist/";

const path = {
    build: {
        html: distPath,
        css: distPath + "assets/css/",
        js: distPath + "assets/js/",
        images: distPath + "assets/images/",
        fonts: distPath + "assets/fonts/"
    },
    src: {
        html: srcPath + "*.html",
        css: srcPath + "assets/scss/*.scss",
        js: srcPath + "assets/js/*.js",
        images: srcPath + "assets/images/**/*.{png,jpeg,jpg,svg}",
        fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    watch: {
        html: srcPath + "**/*.html",
        css: srcPath + "assets/scss/**/*.scss",
        js: srcPath + "assets/js/**/*.js",
        images: srcPath + "assets/images/**/*.{png,svg,jpg,jpeg}",
        fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    clean: "./" + distPath
};

// async function buildHtml() {
//     gulp.src(["*.html"])
//         .pipe(gulp.dest(path.scripts.dest));
// }

function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        }
    });
}

function html() {
    panini.refresh();
    return src(path.src.html, {base: srcPath})
        .pipe(plumber())
        .pipe(panini({
            root: srcPath,
            layouts: srcPath + "tpl/layouts/",
            partials: srcPath + "tpl/partials/",
        }))
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
}

function css() {
    return src(path.src.css, {base: srcPath + "assets/scss/"})
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "SCSS error",
                    message: "Error: <message error>"
                })(err);
                this.emit("end");
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));
}

function js() {
    return src(path.src.js, {base: srcPath + "assets/js/"})
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "SCSS error",
                    message: "Error: <message error>"
                })(err);
                this.emit("end");
            }
        }))
        .pipe(rigger())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));
}

function images() {
    return src(path.src.images, {base: srcPath + "assets/images/"})
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(path.build.images))
        .pipe(browserSync.reload({stream: true}));
}

function fonts() {
    return src(path.src.fonts, {base: srcPath + "assets/fonts/"})
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({stream: true}));
}

function clean() {
    return del(path.clean);
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.fonts], fonts);
    gulp.watch([path.watch.images], images);
}

const build = gulp.series(clean, gulp.parallel(html,css,js,fonts,images));
const watch = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.clean = clean;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;


gulp.task("deploy", function() {
    return gulp.src(distPath)
        .pipe(ghPages());
});