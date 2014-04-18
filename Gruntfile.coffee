'use strict'

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    jshint:
      options:
        jshintrc: '.jshintrc'
      all: [
        'src/*.js'
      ]

    uglify:
      options:
        preserveComments: 'some'
      dist:
        files:
          'dist/jquery.heightEqualizer.min.js': ['src/jquery.heightEqualizer.js']

  # Load grunt tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  # Register tasks.
  grunt.registerTask 'dist', [
    'jshint'
    'uglify'
  ]

  return;