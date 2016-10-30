#!/usr/bin/env node


/*!
 * PepXpert®
 * ____________________________________________________________________
 * Grunt, http://gruntjs.com/
 * The JavaScript Task Runner.
 * ____________________________________________________________________
 * Architecture and Code Handcrafted by Prabhat Kumar.
 * Architectuur en Code handgemaakt door Prabhat Kumar.
 * @author    : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/].
 * ____________________________________________________________________
 * @date      : 30-Oct-2016
 * @license   : Apache, version 2.0
 * @require   : Node.js®
 * @require   : NPM
 * @require   : Compass
 * ____________________________________________________________________
 *
 * --/The Heart of Build + Test System/-- of "PepXpert®".
 * ____________________________________________________________________
 */

// # Usage: $ node -v
// # Usage: $ npm -v
// # Usage: $ grunt -version

'use strict';

// To load required NPM modules.
// -----------------------------
var chalk    = require('chalk');

// Default color defined.
// ----------------------
var noop     = chalk.red;
var yeep     = chalk.green;
var okay     = chalk.blue;

// Global variables
// ~~~~~~~~~~~~~~~~
var pkg      = require('./package.json');
var tag      = ['/*!', pkg.name, pkg.version, pkg.author, '*/'].join(' ');

// ----------------------------------------------------------------------------
// All Grunt Operations Defined...  | 30/Oct/2016 | SEED™ — Rosalind.
// ----------------------------------------------------------------------------

module.exports = function(grunt) {
  
  // Force use of Unix newlines.
  grunt.util.linefeed = '\n';
  
  // A regular expression.
  RegExp.quote = function(string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  
  // 1. time-grunt
  // Display the elapsed execution time of grunt tasks.
  require('time-grunt')(grunt);
  
  // 2. load-grunt-tasks
  // Load multiple grunt tasks using globbing patterns.
  require('load-grunt-tasks')(grunt, {
    scope: ['devDependencies', 'dependencies']
  });
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Project configuration for -//PepXpert®//- Build.
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), /* reading 'package.json' for sync package(s) updates, mainly. */
    
    // ---------------------------------------------------------------------------|
    // Primary Task(s) for SEED™ Building System ||                               |
    // -------------------------------------------                                |
    // 1. Assembly --> HTML - Lint + Minify                                       |
    // 2. Sass + Compass Build                                                    |
    // 3. CSS Lint + Minify                                                       |
    // 4. Data Build + Lint                                                       |
    // 5. JavaScript Lint + Concatenation + Minify                                |
    // 6. Cleaning of temporary files or directories                              |
    // 7. Localhost server + watch                                                |
    // 8. Development dependencies updates                                        |
    // 9. Release(s) with version updates                                         |
    // ---------------------------------------------------------------------------|
    // 1. Assembly --> 1.1 HTML Hint
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    htmlhint: {
      options: {
        htmlhintrc: './config/rules/.htmlhintrc'
      },
      html1: {
        src: ['./app/*.html']
      },
      html2: {
        src: ['./app/en/**/*.html']
      }
    },
    // 1. Assembly --> 1.2 HTML Minify
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    htmlmin: {
      dist: {
        options: {
          html5: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeComments: true
        },
        expand: true,
        cwd: '.',
        dest: './build',
        src: [
          './app/**/*.html' // for all files in `app` directory.
        ]
      }
    },
    // 2. Compass + Sass
    // ~~~~~~~~~~~~~~~~~
    compass: {
      // T:1
      dist: {
        options: {
          config: 'config.rb',
          environment: 'production',
          raw: 'preferred_syntax = :sass\n' // Use `raw` since it's not directly available.
        }
      },
      // T:2
      dev: {
        options: {
          assetCacheBuster: true,
          fontsPath: './source/core/font',
          sassDir: './source/core/scss',
          cssDir: './app/en/assets/style',
          sourcemap: true
        }
      }
    },
    // 3. CSS --> 3.1 Lint
    // ~~~~~~~~~~~~~~~~~~~
    csslint: {
      options: {
        csslintrc: './config/rules/.csslintrc'
      },
      strict: {
        options: {
          import: 2
        },
        src: ['./source/core/style/**/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['./app/en/assets/style/**/*.css']
      }
    },
    // To update '.csslintrc' list, run this:
    // node -e "require('csslint').CSSLint.getRules().forEach(function(x) { console.log(x.id) })"
    // 3. CSS --> 3.2 Minify
    // ~~~~~~~~~~~~~~~~~~~~~
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './build/app/en/assets/style/root.min.css': ['./app/en/assets/style/font.css', './app/en/assets/style/root.css'],
          './build/app/en/assets/style/main.min.css': ['./app/en/assets/style/font.css', './app/en/assets/style/main.css'],
        }
      }
    },
    // 4. Data --> 4.1 Lint
    // ~~~~~~~~~~~~~~~~~~~~
    jsonlint: {
      all: {
        src: [
          './pub/data/raw/protein-sequence-data-expanded.json',
          './pub/data/raw/protein-properties-data-expanded.json'
        ],
        options: {
          formatter: 'prose',
          format: true,
          indent: 2
        }
      }
    },
    // 4. Data --> 4.2 Minify
    // ~~~~~~~~~~~~~~~~~~~~~~
    minjson: {
      compile: {
        files: {
          // minify two json data file.
          './pub/data/tank/protein-sequence-data-expanded.min.json': './pub/data/raw/protein-sequence-data-expanded.json',
          './pub/data/tank/protein-properties-data-expanded.min.json': './pub/data/raw/protein-properties-data-expanded.json',
          // Concat/minify protein-*.json and all json files within the data -/gold/- directory,
          // If more than one json file is matched, json will be wrapped in brackets [].
          './pub/data/gold/protein-all.min.json': [
            './pub/data/raw/protein-sequence-data-expanded.json',
            './pub/data/raw/protein-properties-data-expanded.json'
          ]
        }
      }
    },
    // 5. JavaScript --> 5.1 Lint
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          d3: true,
          Modernizr: true,
          jQuery: true
        },
        strict: true,
      },
      ignore_warning: {
        options: {
          '-W015': true // [L24:C9] W015: Expected '}' to have an indentation at 11 instead at 9.
        }
      },
      all: [
        './Gruntfile.js',
        './lib/**/*.js',
        './index.js',
        './source/core/script/**/*.js',
        './source/core/script/root.js',
        '!node_modules/**/*.js', // ignores node_modules.
        '!bower_components/**/*.js' // ignores bower_components.
      ]
    },
    // 5. JavaScript --> 5.2 Concat
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    concat: {
      dist: {
        options: {
          // Replace all 'use strict' statements in the code with a single one at the top.
          banner: "'use strict';\n",
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' + src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          }
        },
        files: {
          // compiled.js for — intermediate work.
          './app/en/assets/script/index.compiled.js': ['./source/core/script/**/*.js'],
        }
      }
    },
    // 5. JavaScript --> 5.3 Minify
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        options: {
          sourceMap: true,
          sourceMapName: './app/en/assets/script/index.js.map'
        },
        files: {
          './build/app/en/assets/script/index.min.js': ['./app/en/assets/script/index.compiled.js'],
          './build/app/en/assets/script/pepxpert.min.js': ['./core/source/compiled/pepxpert.js']
        }
      }
    },
    // 6. Clean --> temporary files or directories
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    clean: {
      // before generating any new files, remove any previously-created files.
      test: ['tmp', '*.temp', '*.log'],
      // will delete files for `build` target.
      build: ['build'],
      release: {
        options: {
          'no-write': true
        },
        src: ['app']
      }
    },
