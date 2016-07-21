module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/heb-greg-date-picker.js',
                dest: 'dist/heb-greg-date-picker.min.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/heb-greg-converter.js', 'src/heb-year-converter.js', 'heb-greg-date-picker.js'],
                dest: 'dist/heb-greg-date-picker.js'
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: ['heb-greg-date-picker.css', 'test.html'],
                dest: 'dist/'
            }
        },
        clean: {
            dist: {
                src: ['dist']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'concat', 'copy', 'uglify']);

};