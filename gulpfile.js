let projectFolder = "dist";
let sourceFolder = "#src";

let path = {
    build: {
        html: projectFolder + "/",
        home: projectFolder + "/",
        css: projectFolder + "/assets/css/",
        lib_css: projectFolder + "/assets/css/lib/",
        more_css: projectFolder + "/assets/css/",
        lib: projectFolder + "/assets/js/lib/",
        js: projectFolder + "/assets/js/",
        imgContent: projectFolder + "/assets/images/content",
        imgStatic: projectFolder + "/assets/images/static",
        fonts: projectFolder + "/assets/fonts/",
    },
    src: {
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
        home: [sourceFolder + "/home/*.html", "!" + sourceFolder + "/home/_*.html"],
        css: sourceFolder + "/scss/style.scss",
        lib_css: sourceFolder + "/scss/lib/**/*.scss",
        more_css: sourceFolder + "/home/**/*.scss",
        lib: sourceFolder + "/js/lib/**/*.js",
        js: sourceFolder + "/js/script.js",
        imgContent: sourceFolder + "/assets/images/content/**/*.{jpg,png,svg,gif,ico,webp}",
        imgStatic: sourceFolder + "/assets/images/static/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: sourceFolder + "/assets/fonts/*.ttf",
    },
    watch: {
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        more_css: sourceFolder + "/home/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        imgContent: sourceFolder + "/assets/images/content/**/*.{jpg,png,svg,gif,ico,webp}",
        imgStatic: sourceFolder + "/assets/images/static/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + projectFolder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass")(require('sass')),
    autoprefixer = require("gulp-autoprefixer"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2");


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir:"./" + projectFolder + "/"
        },
        port: 3000,
        notify: false,
    })
}


function html(){
    return src(path.src.html,path.src.home)
        .pipe(fileinclude())
        .pipe(dest(path.build.html),dest(path.build.home))
        .pipe(browsersync.stream())
}
function home(){
    return src(path.src.home)
        .pipe(fileinclude())
        .pipe(dest(path.build.home))
        .pipe(browsersync.stream())
}


function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )

        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true,
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}
function more_css(){
    return src(path.src.more_css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )

        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true,
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.more_css))
        .pipe(browsersync.stream())
}
function lib_css() {
  return src(path.src.lib_css)
      .pipe(
          scss({
              outputStyle: "expanded"
          })
      )

      .pipe(
          autoprefixer({
              overrideBrowserslist: ["last 5 versions"],
              cascade: true,
          })
      )
      .pipe(dest(path.build.lib_css))
      .pipe(clean_css())
      .pipe(
          rename({
              extname: ".min.css"
          })
      )
      .pipe(dest(path.build.lib_css))
      .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function lib() {
    return src(path.src.lib)
    .pipe(fileinclude())
    .pipe(dest(path.build.lib))
    .pipe(
        uglify()
    )
    .pipe(
        rename({
            extname: ".min.js"
        })
    )
    .pipe(dest(path.build.lib))
    .pipe(browsersync.stream())

}

function fonts(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))

}
function imagesContent(){
    return src(path.src.imgContent)
        .pipe(dest(path.build.imgContent))
        .pipe(src(path.src.imgContent))
        .pipe(dest(path.build.imgContent))
        .pipe(browsersync.stream())
}
function imagesStatic(){
    return src(path.src.imgStatic)
        .pipe(dest(path.build.imgStatic))
        .pipe(src(path.src.imgStatic))
        .pipe(dest(path.build.imgStatic))
        .pipe(browsersync.stream())

}


function watchFiles(params) {
    gulp.watch([path.watch.html],html);
    gulp.watch([path.watch.css],css);
    gulp.watch([path.watch.css],more_css);
    gulp.watch([path.watch.js],js);
    gulp.watch([path.watch.js],lib);

}
function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(fonts, js, lib, lib_css, css, more_css, html, home, imagesContent, imagesStatic));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.lib = lib;
exports.lib_css = lib_css;
exports.fonts = fonts;
exports.home = home;
exports.imagesContent = imagesContent;
exports.imagesStatic = imagesStatic;
exports.js = js;
exports.css = css;
exports.more_css = more_css;
exports.html = html;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
