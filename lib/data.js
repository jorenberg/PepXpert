/*!
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * | PepXpert®                                                               |
 * | A computational biology tool to predict protein properties.             |
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * To work on protein data — {.fasta} formatted.
 * ___________________________________________________________________________
 *
 * Architecture and Code Handcrafted by Prabhat Kumar.
 * Architectuur en Code handgemaakt door Prabhat Kumar.
 * @author    : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/].
 * ___________________________________________________________________________
 *
 * @date      : 30-Oct-2016
 * @license   : Apache, version 2.0
 * @require   : Node.js®
 * @require   : NPM
 * ___________________________________________________________________________
 *
 * --/The Heart of JavaScript Data System/-- of "PepXpert®".
 * ___________________________________________________________________________
 */

// To load required Node module.
// -----------------------------
var fs        = require('fs');
var path      = require('path');
// To load required NPM modules.
// -----------------------------
var request   = require('sync-request');
var chalk     = require('chalk');

// Default color defined.
// ----------------------
var noop      = chalk.red;
var yeep      = chalk.green;
var okay      = chalk.blue;

// Global variables.
// ~~~~~~~~~~~~~~~~~
var rootPath  = './';
