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
from termcolor import colored

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

def compressPepXpert(text):
    def compress(match):
        text = match.group(0)
        if '  ' in text: # assume all strings with two consecutive spaces.
            text = re.sub('/\*.*?\*/', '', text) # remove all comments.
            text = re.sub(' +', ' ', text) # replace consecutive spaces with one space.
            text = re.sub(r' ?(\+|\-|\*|/|,|=|{|}|;|\(|\)|<|>|!|\'|\") ?', r'\1', text) # tighten spaces around some tokens.
        return text

    text = re.sub(r"('([^'\\]|\\(.|\n))*'|\"([^\"\\]|\\(.|\n))*\")", compress, text) # replace all strings.
    return text

# Now, build(), stat(), and monitor() — will do all build(s) work.

def create():
    if os.path.exists('core/source/compiled/'):
        pass
    else:
        os.makedirs('core/source/compiled/', 0755)

def build():
    data = 'var %s = (function() {\n\n%s\nreturn %s;\n})();\n' % (module, compile(sources()), module)
    if 'release' in sys.argv:
        f1, temp1_path = tempfile.mkstemp()
        f2, temp2_path = tempfile.mkstemp()
        os.write(f1, data)
        os.close(f1)
        os.close(f2)
        os.system('uglifyjs "%s" -mo "%s"' % (temp1_path, temp2_path))
        os.remove(temp1_path)
        data = open(temp2_path).read()
        os.remove(temp2_path)
        data = compressPepXpert(data)
    data = header + data
    open(output_path, 'w').write(data)
    # printing information about build.
    # —————————————————————————————————
    print colored('———————————————————————————————————————————————————', 'green')
    print colored('SEED™ — Rosalind', 'green'), colored('v1.0.0', 'blue')
    print colored(' └——> A Sequømics Product ——— http://sequomics.com/', 'green')
    print colored('———————————————————————————————————————————————————', 'green')
    print 'Copyright © 2006 - 2016 by', __copyright__
    print 'Build Time:', localtime
    print colored('——————— Path', 'red'), colored('———————————— filename', 'blue')
    print os.path.split('core/source/compiled/pepxpert.js')
    print colored('built —>', 'green'), '%s (%u lines).' % (output_path, len(data.split('\n')))
    print colored('———————————————————————————————————————————————————', 'green')

def stat():
    # it will show — statistics of build file.
    return [os.stat(file).st_mtime for file in sources()]

def monitor():
    a = stat()
    while True:
        time.sleep(0.5)
        b = stat()
        if a != b:
            a = b
            create()
            build()

if __name__ == '__main__':
    create()
    build()
    if 'debug' in sys.argv:
        monitor()
