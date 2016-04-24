module.exports = function (grunt) {
    require('jit-grunt')(grunt);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "css/style.css": "_/less/style.less" // destination file and source file
                }
            }
        },
        watch: {
            styles: {
                files: ['_/less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        sass: {
            files: ['_/sass/*.scss'],
            tasks: ['compass:dev']
        }, //sass
        html: {
            files: ['*.html']
        } //html
    });

    grunt.registerTask('default', ['less', 'watch']);
};