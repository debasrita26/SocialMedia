const gulp= require('gulp');
const sass= require('gulp-sass')(require('sass'));
const cssnano= require('gulp-cssnano');
const rev=require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
<<<<<<< HEAD
// const imagemin= require('gulp-imagemin');
=======
//const imagemin= require('gulp-imagemin');
>>>>>>> 251b4c0e1a63e454d25490f5fd9e9b0ee59c6d2d
const del = require('del');

gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        base:'./public/assets',
        merge: true
    })
    )
    .pipe(gulp.dest('./public/assets'));
    done();
});


  gulp.task('js', function(done){
       console.log('minifying js...');
       
       gulp.src('./assets/**/*.js')
       .pipe(uglify())
       .pipe(rev())
       .pipe(gulp.dest('./public/assets'))
       .pipe(rev.manifest({
<<<<<<< HEAD
           base:"./public/assets",
=======
            base:'./public/assets',
>>>>>>> 251b4c0e1a63e454d25490f5fd9e9b0ee59c6d2d
           merge: true
       }))
       .pipe(gulp.dest('./public/assets'));
       done();
 });


   gulp.task('images', function(done){
       console.log('compressing images...');
      gulp.src('./assets/**/*.+(png|jpg|gif|jfif|svg|jpeg)')
<<<<<<< HEAD
    //    .pipe(imagemin())
       .pipe(rev())
       .pipe(gulp.dest('./public/assets'))
       .pipe(rev.manifest({
           base: './public/assets',
           merge: true
=======
       //.pipe(imagemin())
       .pipe(rev())
       .pipe(gulp.dest('./public/assets'))
       .pipe(rev.manifest({
        base:'./public/assets',
        merge: true
>>>>>>> 251b4c0e1a63e454d25490f5fd9e9b0ee59c6d2d
       }))
       .pipe(gulp.dest('./public/assets'));
        done();
   });

 
  // empty the public/assets directory
   gulp.task('clean:assets', function(done){
       del.sync('./public/assets');
       del.sync("./rev-manifest.json");
       done();
   });

   gulp.task('build', 
      gulp.series('clean:assets', 'css', 'js', 'images'), 
      function(done){
     console.log("printing assets");
      done();
   }
   );
