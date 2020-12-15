"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var imagemin = require("gulp-imagemin");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var concat = require("gulp-concat");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "!source/img/sprite-*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
});

gulp.task("vendor", function () {
  return gulp.src("source/js/vendor.js")
    .pipe(gulp.dest("build/js"))
});

gulp.task("script", function () {
  return gulp.src(["source/js/*.js","!source/js/vendor.js"])
    .pipe(concat("main.js"))
    .pipe(gulp.dest("build/js"))
});


gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/sprite-*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/js/*.js", gulp.series("vendor", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("script", "refresh"));
  gulp.watch("source/img/sprite-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "css", "vendor", "script", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
