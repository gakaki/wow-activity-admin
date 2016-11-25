var gulp  = require("gulp");
var qiniu = require("gulp-qiniu");

gulp.task('upload', function () {
  return gulp.src('./dist/**')
  .pipe(qiniu({
    accessKey: "l4bcP6bByVSJWgqOeKxHGtCyXl3L3bWlLh9wOLYu",
    secretKey: "kevimwWUrbsidQLFRD00zadC0RSUt7qZOFHUW7OY",
    bucket: "activity-admin",
    private: false
  }, {
    dir: '/dist',
    versioning: false,
    // versionFile: './cdn.json',
    concurrent: 10
  }));
})
