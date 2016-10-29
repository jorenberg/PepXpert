#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ————————————————————————————————————————————————————————————————————————————
# Copyright © 2014 - 2016, Sequømics Corporation. All rights reserved.
# Licensed under the MIT License (the "License");
# you may not use this file except in compliance with the License.
# ————————————————————————————————————————————————————————————————————————————
#  ,-.
#  ,     ,-.   ,-.
# / \   (   )-(   )
# \ |  ,.>-( * )-<
#  \|,' (   )-(   )
#   Y ___`-'   `-'
#   |/__/   `-'
#   |
#   |
#   |  -~PRABHAT~-
# __|_____________
# ————————————————————————————————————————————————————————————————————————————
__authors__       = [
    '"Prabhat Kumar" <prabhat.genome@gmail.com>',
    '"Sequømics Corporation" <admin@sequomics.com>'
    ]
__license__       = 'MIT License'
__date__          = '29-10-2016'
__copyright__     = "Prabhat Kumar"
__webserver__     = "http://biotools.sequomics.com/pepxpert/"
__license__       = "http://biotools.sequomics.com/pepxpert/license.txt"

# ————————————————————————————————————————————————————————————————————————————
module            = 'pepxpert'
input_path        = 'core/source/engine'
output_path       = 'core/source/compiled/pepxpert.js'
# ————————————————————————————————————————————————————————————————————————————

# Load required modules.
import os
import sys
import re
import time
import tempfile
import warnings

localtime = time.asctime(time.localtime(time.time()))
# ————————————————————————————————————————————————————————————————————————————

header ='''/*!
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * | PepXpert®                                                               |
 * ├─────────────────────────────────────────────────────────────────────────┤
 * | A computational biology tool to predict protein properties.             |
 * ├─────────────────────────────────────────────────────────────────────────┤
 * | Using a basic and advance computational biology algorithms.             |
 * ├─────────────────────────────────────────────────────────────────────────┤
 * | Copyright © 2006 - 2016, Prabhat Kumar, All rights reserved.            |
 * └─────────────────────────────────────────────────────────────────────────┘
 * ---------------------------------------------------------------------------
 * Architecture and Code Handcrafted by Prabhat Kumar.
 * Architectuur en Code handgemaakt door Prabhat Kumar.
 * @author    : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/].
 * ___________________________________________________________________________
 *
 * @date      : 29-Oct-2016
 * @license   : Apache, version 2.0
 * @require   : d3.js® & Raphaël.js®
 * @build     : SEED™ — Rosalind
 *              |---- A Sequømics Product — http://sequomics.com/.
 * ___________________________________________________________________________
 */
'''

def sources():
    return [os.path.join(base, f) for base, folders, files in \
        os.walk(input_path) for f in files if f.endswith('.js')]

def compile(sources):
    return '\n'.join('// %s\n%s' % (path, open(path).read()) for path in sources)
