const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const tscProject = tsc.createProject('tsconfig.json');

const src = "./src";
const dest = "./dist";

gulp.task("tsc", () => {
    del(`${dest}/**/*`);
    return tscProject.src().pipe(tscProject()).js.pipe(gulp.dest(dest));
});

gulp.task("build", ["tsc"], () => {
    return gulp.src(`${src}/**/!(*.ts)`).pipe(gulp.dest(dest));
});