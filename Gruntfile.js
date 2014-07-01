module.exports = function(grunt) {
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Isaki v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed under <%= _.pluck(pkg.licenses, "type") %> (<%= _.pluck(pkg.licenses, "url") %>)\n' +
              ' */\n',

    clean: {
      js: ["app/assets/javascripts/application.tmp.js"] 
    },

    concat: {
      isaki: {
        src: [
          "app/assets/javascripts/*.js"          
        ],
        dest: "app/assets/javascripts/application.tmp.js"
      }
    },

    uglify: {
      isaki: {
        options: {
          banner: "<%= banner %>",
          report: "min"
        },
        src: "<%= concat.isaki.dest %>",
        dest: "app/assets/javascripts/application.min.js"
      }
    },

    compass: {
      development: {
        options: {
          sassDir: "sass",
          cssDir: "templates/assets/stylesheets",
          outputStyle: "expanded",
          raw: 'preferred_syntax = :scss\n'
        }
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'templates/assets/stylesheets',
        src: ["application.css", "application.min.css"],
        dest: "app/assets/stylesheets",
        ext: ".min.css"
      }
    },

    watch: {
      options: {
        spawn: false
      },
      sass: {
        files: 'sass/*.scss',
        tasks: ["compass"],
        options: {
          livereload: true
        }
      },

      coffee: {
        files: "coffeescript/*.coffee",
        tasks: ["coffee", "concat", "uglify"]
      }
    },

    coffee: {
      compile: {
        options: {
          bare: true
        },
        flatten: true,
        expand: true,
        cwd: "coffeescript",
        src: ["*.coffee"],
        dest: "templates/assets/javascripts",
        ext: ".js"
      }
    },

    shell: {
      jekyllServer: {
        command: "jekyll serve --watch"
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      server: {
        tasks: ["watch:sass", "watch:coffee", "shell:jekyllServer"]
      },
    }

      
  });

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  //CSS distribution task.
  grunt.registerTask('compile-css', ['compass:development', 'cssmin']);

  //JS distribution task
  grunt.registerTask('compile-js', ['coffee:compile', 'concat', 'uglify', 'clean:js']);

  //Package for production
  grunt.registerTask('deploy', ['compile-js', 'compile-css']);
  
  //Lift the server
  grunt.registerTask('server', ['concurrent:server'])

}
