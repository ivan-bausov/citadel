module.exports = function (grunt) {
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: './dev/js',
                    name: "app",
                    out: "dev/js/app.min.js",
                    mainConfigFile: "./dev/js/require.config.js",
                    target: 'es3',
                    module: 'amd',
                    declaration: false,
                    removeComments: true,
                    sourceMap: false
                }
            }
        },

        clean: {
            prod: ['prod']
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'images/*',
                            'fonts/*',
                            'css/main.css'
                        ],
                        dest: 'prod',
                        cwd: 'dev'
                    }
                ]
            },
            index: {
                src: 'dev/index.html',
                dest: 'prod/index.html',
                options: {
                    process: function (content) {
                        return content.replace('<script src="/js/require.config.js"></script>', '');
                    }
                }
            },
            app: {
                src: 'dev/js/app.min.js',
                dest: 'prod/js/app.js'
            },
            requirejs: {
                src: 'dev/js/vendor/require.js',
                dest: 'prod/js/vendor/require.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dev/css/main.css': 'dev/scss/main.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['requirejs:compile', 'sass', 'clean:prod', 'copy']);

};
