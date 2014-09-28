/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        copy: {
            build: {
                cwd: 'source',
                src: [ '**', '!**/*.styl', '!**/*.traceur' ],
                dest: 'build',
                expand: true
            }
        },
        clean:{
            build:{
                src: [ 'build' ]
            }
        },
        cssmin: {
            build: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: 'build',      // Src matches are relative to this path.
                        src: ['**/*.css'], // Actual pattern(s) to match.
                        dest: 'build',   // Destination path prefix.
                        ext: '.min.css',   // Dest filepaths will have this extension.
                        extDot: 'last'   // Extensions in filenames begin after the first dot
                    }
                ]
            }
        },
        // Task configuration.
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'tests/**/*.js']
            }
        },
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: { src: ['tests/*.js'] }
        },
        stylus: {
            build: {
                options: {
                    linenos: true,
                    compress: false
                },
                files: [{
                    expand: true,
                    cwd: 'source',
                    src: [ '**/*.styl' ],
                    dest: 'build',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: 'build',      // Src matches are relative to this path.
                        src: ['**/*.js'], // Actual pattern(s) to match.
                        dest: 'build',   // Destination path prefix.
                        ext: '.min.js',   // Dest filepaths will have this extension.
                        extDot: 'last'   // Extensions in filenames begin after the first dot
                    }
                ]
            }
        },
        traceur: {
            options: {
                // traceur options here
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'source',
                    src: ['**/*.traceur'],
                    dest: 'build',
                    ext: '.js'
                }]
            }
        },
        watch: {
            stylesheets: {
                files: 'source/**/*.styl',
                tasks: [ 'stylesheets' ]
            },
            scripts: {
                files: 'source/**/*.traceur',
                tasks: [ 'scripts' ]
            },
            copy: {
                files: [ 'source/**', '!source/**/*.styl', '!source/**/*.traceur' ],
                tasks: [ 'copy' ]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-traceur');


    // Default task.
    grunt.registerTask('default',[ 'build', 'tests', 'watch' ]);
    grunt.registerTask(
        'tests',
        'Run tests',
        [ 'jshint', 'simplemocha' ]
    );
    //Build application
    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'clean', 'copy', 'stylesheets', 'scripts' ]
    );
    grunt.registerTask(
        'stylesheets',
        'Compile css',
        [  'stylus', 'cssmin' ]
    );
    grunt.registerTask(
        'scripts',
        'Compile JavaScript',
        [  'traceur','uglify' ]
    );

};
