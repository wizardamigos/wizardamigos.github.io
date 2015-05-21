!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.API=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
var webpage = require('webpage');
var fastdom = require('fastdom');
var minixhr = require('minixhr');
// const marked      = require('marked');
// const jsonmatter  = require('json-matter');
var jmm = require('json-meta-marked');
var markdownbox = require('holon-markdownbox');
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
// no cli tool
// $paramName = process.argv[2];
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
var config = require('_config')();
var template = require('./index.template.html');
var __ = document.createElement('div');
function wizardamigosinstitute(dom, data) {
  // 'data' maybe also to use for event delegation pattern
  var COMPONENT = (__.innerHTML = template, __.childNodes[0]);
  var __logo = COMPONENT.querySelectorAll('.wizardamigos__logo')[0];
  var __menu = COMPONENT.querySelectorAll('.wizardamigos__menu')[0];
  var __content = COMPONENT.querySelectorAll('.wizardamigos__content')[0];

  var SEMAPHORE = null;
  var CONTENT = [];
  var LANGUAGES = {};

  minixhr({ url: config.contentSRC }, function (data, response, xhr) {
    var temp = {};
    var CONTENT = undefined;
    var array = JSON.parse(data);
    array.forEach(function (item) {
      minixhr({ url: item.url }, function (data, response, xhr) {
        function b64_to_utf8(str) {
          return decodeURIComponent(escape(window.atob(str)));
        }
        var object = JSON.parse(data);
        var jsonmarked = b64_to_utf8(object.content);
        var name = object.name.split('.')[0];
        if (name === 'index') {
          CONTENT = jmm.parse(jsonmarked).CONTENT;
          prepareArrayContainer(CONTENT);
          CONTENT.forEach(function (title, idx) {
            if (temp[title]) {
              addContent(idx, title, temp[title]);
            }
          });
        } else if (!CONTENT) {
          temp[name] = jsonmarked;
        } else {
          CONTENT.forEach(function (title, idx) {
            if (name === title) {
              addContent(idx, name, jsonmarked);
            }
          });
        }
      });
    });
  });

  INIT();

  function prepareArrayContainer(CONTENT) {
    SEMAPHORE = CONTENT.length;
  }
  function addContent(idx, name, jsonmarked) {
    SEMAPHORE--;
    CONTENT[idx] = {
      name: name,
      lang: {}
    };
    var object = jmm.parse(jsonmarked);
    var html = object.__content__;
    var langs = html.split('<hr>').filter(function (x) {
      return x;
    });
    var reg = /<p><a href="@([\s\S]*)"><\/a><\/p>([\s\S]*)/;
    langs.forEach(function (x) {
      var tmp = x.match(reg);
      var lang = tmp[1];
      var content = tmp[2];
      CONTENT[idx].lang[lang] = content;
      if (!LANGUAGES[lang]) {
        LANGUAGES[lang] = true;
      }
    });

    if (!SEMAPHORE) {
      INIT();
    }
  }
  function prepare() {
    // @TODO: use fastdom
    CONTENT.forEach(function (x, idx) {
      var item = '<div class="wizardamigos__infobox"></div>';
      var tmp = (__.innerHTML = item, __.childNodes[0]);
      CONTENT[idx] = markdownbox({
        container: tmp,
        options: { defaultLanguage: config.language },
        data: x
      });
      __content.appendChild(tmp);
    });
    for (var lang in LANGUAGES) {
      (function (lang) {
        var item = '<a class="wizardamigos__lang' + '  wizardamigos__lang--STATE_' + (lang === config.language ? 'active' : 'inactive') + '  ">' + lang + '</a>';
        var tmp = (__.innerHTML = item, __.childNodes[0]);
        // @TODO: should use delegator pattern instead
        /******** WIRE UP ********/
        // @TODO: switch language buttons
        tmp.addEventListener('click', function onclick(event) {
          // eventstop(event);
          CONTENT.forEach(function switchLanguage(api) {
            api.changeLanguage(lang);
          });
        });
        __menu.appendChild(tmp);
      })(lang);
    }
  }
  /****** INITIALIZE *******/
  function INIT() {
    fastdom.write(function () {
      prepare();
      dom.appendChild(COMPONENT);
      // FACEBOOK
      (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);js.id = id;
        js.src = '//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.3&appId=322249881240262';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
      // TWITTER
      (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return;js = d.createElement(s);
        js.id = id;js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);t._e = [];
        t.ready = function (f) {
          t._e.push(f);
        };return t;
      })(document, 'script', 'twitter-wjs');
    });
  }
  /******** RETURN *********/
  var API = {}; // should be an event emitter too
  return API;
}
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports = wizardamigosinstitute(webpage(config), config);

},{"./index.template.html":2,"_config":3,"fastdom":8,"holon-markdownbox":9,"json-meta-marked":17,"minixhr":20,"webpage":22}],2:[function(require,module,exports){
module.exports = '<div class="wizardamigos">\n  <img class="wizardamigos__logo" src="/BUNDLE/assets/061915d010311d6e.svg">\n\n  <div id="fb-root"></div>\n  <div class="fb-share-button"\n    data-href="http://wizard.amigos.institute/"\n    data-layout="button">\n  </div><br>\n  <a style="display:block" class="twitter-share-button"\n    href="https://twitter.com/share"\n    data-url="http://bit.ly/wizardamigosinstitute"\n    data-counturl="http://wizard.amigos.institute"\n    data-text="Coding for kids in berlin :-)"\n    data-hashtags="#berlin #programming #school"\n    data-related="serapath:Wizard Amigos Organizer"\n    data-lang="de"\n    data-via="wizardamigos"\n    data-size="normal"\n    data-count="none">\n  Tweet us :-)\n  </a>\n  <div class="wizardamigos__menu"></div>\n  <div class="wizardamigos__content"></div>\n</div>\n';
},{}],3:[function(require,module,exports){
/******************************************************************************
  DEPENDENCIES
******************************************************************************/
var pkg         = require('../../package.json');
// var params      = require('') try load files in iframe and scrape it to circumvent CORS
// https://www.npmjs.com/package/iframe-api
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli tool
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
var _config     = {
  title       : 'Wizard Amigos Institute',
  description : pkg.description,
  version     : pkg.version,
  keywords    : pkg.keywords.join(', '),
  author      : pkg.author.name,
  website     : pkg.homepage,
  language    : 'german',
  ga          : 'UA-62310807-1',
  style       : pkg.atomify.css.output,
  // contentSRC  : 'https://api.github.com/repos/wizardamigosinstitute/organization/contents/CONTENT?ref=master'
  contentSRC  : 'https://api.github.com/repos/serapath/organization/contents/CONTENT?ref=master'
};
function config (key) {
  return key ? _config[key] : _config;
}
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports  = config;

},{"../../package.json":25}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}],6:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":7}],7:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],8:[function(require,module,exports){
/**
 * FastDom
 *
 * Eliminates layout thrashing
 * by batching DOM read/write
 * interactions.
 *
 * @author Wilson Page <wilsonpage@me.com>
 */

;(function(fastdom){

  'use strict';

  // Normalize rAF
  var raf = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(cb) { return window.setTimeout(cb, 1000 / 60); };

  /**
   * Creates a fresh
   * FastDom instance.
   *
   * @constructor
   */
  function FastDom() {
    this.frames = [];
    this.lastId = 0;

    // Placing the rAF method
    // on the instance allows
    // us to replace it with
    // a stub for testing.
    this.raf = raf;

    this.batch = {
      hash: {},
      read: [],
      write: [],
      mode: null
    };
  }

  /**
   * Adds a job to the
   * read batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  FastDom.prototype.read = function(fn, ctx) {
    var job = this.add('read', fn, ctx);
    var id = job.id;

    // Add this job to the read queue
    this.batch.read.push(job.id);

    // We should *not* schedule a new frame if:
    // 1. We're 'reading'
    // 2. A frame is already scheduled
    var doesntNeedFrame = this.batch.mode === 'reading'
      || this.batch.scheduled;

    // If a frame isn't needed, return
    if (doesntNeedFrame) return id;

    // Schedule a new
    // frame, then return
    this.scheduleBatch();
    return id;
  };

  /**
   * Adds a job to the
   * write batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  FastDom.prototype.write = function(fn, ctx) {
    var job = this.add('write', fn, ctx);
    var mode = this.batch.mode;
    var id = job.id;

    // Push the job id into the queue
    this.batch.write.push(job.id);

    // We should *not* schedule a new frame if:
    // 1. We are 'writing'
    // 2. We are 'reading'
    // 3. A frame is already scheduled.
    var doesntNeedFrame = mode === 'writing'
      || mode === 'reading'
      || this.batch.scheduled;

    // If a frame isn't needed, return
    if (doesntNeedFrame) return id;

    // Schedule a new
    // frame, then return
    this.scheduleBatch();
    return id;
  };

  /**
   * Defers the given job
   * by the number of frames
   * specified.
   *
   * If no frames are given
   * then the job is run in
   * the next free frame.
   *
   * @param  {Number}   frame
   * @param  {Function} fn
   * @public
   */
  FastDom.prototype.defer = function(frame, fn, ctx) {

    // Accepts two arguments
    if (typeof frame === 'function') {
      ctx = fn;
      fn = frame;
      frame = 1;
    }

    var self = this;
    var index = frame - 1;

    return this.schedule(index, function() {
      self.run({
        fn: fn,
        ctx: ctx
      });
    });
  };

  /**
   * Clears a scheduled 'read',
   * 'write' or 'defer' job.
   *
   * @param  {Number|String} id
   * @public
   */
  FastDom.prototype.clear = function(id) {

    // Defer jobs are cleared differently
    if (typeof id === 'function') {
      return this.clearFrame(id);
    }

    // Allow ids to be passed as strings
    id = Number(id);

    var job = this.batch.hash[id];
    if (!job) return;

    var list = this.batch[job.type];
    var index = list.indexOf(id);

    // Clear references
    delete this.batch.hash[id];
    if (~index) list.splice(index, 1);
  };

  /**
   * Clears a scheduled frame.
   *
   * @param  {Function} frame
   * @private
   */
  FastDom.prototype.clearFrame = function(frame) {
    var index = this.frames.indexOf(frame);
    if (~index) this.frames.splice(index, 1);
  };

  /**
   * Schedules a new read/write
   * batch if one isn't pending.
   *
   * @private
   */
  FastDom.prototype.scheduleBatch = function() {
    var self = this;

    // Schedule batch for next frame
    this.schedule(0, function() {
      self.batch.scheduled = false;
      self.runBatch();
    });

    // Set flag to indicate
    // a frame has been scheduled
    this.batch.scheduled = true;
  };

  /**
   * Generates a unique
   * id for a job.
   *
   * @return {Number}
   * @private
   */
  FastDom.prototype.uniqueId = function() {
    return ++this.lastId;
  };

  /**
   * Calls each job in
   * the list passed.
   *
   * If a context has been
   * stored on the function
   * then it is used, else the
   * current `this` is used.
   *
   * @param  {Array} list
   * @private
   */
  FastDom.prototype.flush = function(list) {
    var id;

    while (id = list.shift()) {
      this.run(this.batch.hash[id]);
    }
  };

  /**
   * Runs any 'read' jobs followed
   * by any 'write' jobs.
   *
   * We run this inside a try catch
   * so that if any jobs error, we
   * are able to recover and continue
   * to flush the batch until it's empty.
   *
   * @private
   */
  FastDom.prototype.runBatch = function() {
    try {

      // Set the mode to 'reading',
      // then empty all read jobs
      this.batch.mode = 'reading';
      this.flush(this.batch.read);

      // Set the mode to 'writing'
      // then empty all write jobs
      this.batch.mode = 'writing';
      this.flush(this.batch.write);

      this.batch.mode = null;

    } catch (e) {
      this.runBatch();
      throw e;
    }
  };

  /**
   * Adds a new job to
   * the given batch.
   *
   * @param {Array}   list
   * @param {Function} fn
   * @param {Object}   ctx
   * @returns {Number} id
   * @private
   */
  FastDom.prototype.add = function(type, fn, ctx) {
    var id = this.uniqueId();
    return this.batch.hash[id] = {
      id: id,
      fn: fn,
      ctx: ctx,
      type: type
    };
  };

  /**
   * Runs a given job.
   *
   * Applications using FastDom
   * have the options of setting
   * `fastdom.onError`.
   *
   * This will catch any
   * errors that may throw
   * inside callbacks, which
   * is useful as often DOM
   * nodes have been removed
   * since a job was scheduled.
   *
   * Example:
   *
   *   fastdom.onError = function(e) {
   *     // Runs when jobs error
   *   };
   *
   * @param  {Object} job
   * @private
   */
  FastDom.prototype.run = function(job){
    var ctx = job.ctx || this;
    var fn = job.fn;

    // Clear reference to the job
    delete this.batch.hash[job.id];

    // If no `onError` handler
    // has been registered, just
    // run the job normally.
    if (!this.onError) {
      return fn.call(ctx);
    }

    // If an `onError` handler
    // has been registered, catch
    // errors that throw inside
    // callbacks, and run the
    // handler instead.
    try { fn.call(ctx); } catch (e) {
      this.onError(e);
    }
  };

  /**
   * Starts a rAF loop
   * to empty the frame queue.
   *
   * @private
   */
  FastDom.prototype.loop = function() {
    var self = this;
    var raf = this.raf;

    // Don't start more than one loop
    if (this.looping) return;

    raf(function frame() {
      var fn = self.frames.shift();

      // If no more frames,
      // stop looping
      if (!self.frames.length) {
        self.looping = false;

      // Otherwise, schedule the
      // next frame
      } else {
        raf(frame);
      }

      // Run the frame.  Note that
      // this may throw an error
      // in user code, but all
      // fastdom tasks are dealt
      // with already so the code
      // will continue to iterate
      if (fn) fn();
    });

    this.looping = true;
  };

  /**
   * Adds a function to
   * a specified index
   * of the frame queue.
   *
   * @param  {Number}   index
   * @param  {Function} fn
   * @return {Function}
   * @private
   */
  FastDom.prototype.schedule = function(index, fn) {

    // Make sure this slot
    // hasn't already been
    // taken. If it has, try
    // re-scheduling for the next slot
    if (this.frames[index]) {
      return this.schedule(index + 1, fn);
    }

    // Start the rAF
    // loop to empty
    // the frame queue
    this.loop();

    // Insert this function into
    // the frames queue and return
    return this.frames[index] = fn;
  };

  // We only ever want there to be
  // one instance of FastDom in an app
  fastdom = fastdom || new FastDom();

  /**
   * Expose 'fastdom'
   */

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = fastdom;
  } else if (typeof define === 'function' && define.amd) {
    define(function(){ return fastdom; });
  } else {
    window['fastdom'] = fastdom;
  }

})(window.fastdom);

},{}],9:[function(require,module,exports){
'use strict';
/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
// const os        = require('os');
// const method    = require('exemethod')(function(a,b){return b;});
// const fastdom   = require('fastdom');
// const minixhr   = require('minixhr');
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli
/******************************************************************************
  ERRORS
******************************************************************************/
const error     = {
  container ()    { throw new Error('Argument for container:dom is missing'); }
};
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
const config    = require('_config')();
const template  = require('./index.template.html');
const __        = document.createElement('div');
/*****************************************************************************/
function markdownbox (parameter) {                                               // @TODO: employ some kind of "extend" or "xtend" or "merge" strategy instead of "XOR"
  /****** INITIALIZE *******/
  const CONTAINER = parameter.container || error.container();
  const OPTIONS   = parameter.options   || config.options;
  const DATA      = parameter.data      || null;                                 // @TODO: maybe always a "level" interface?
  const CHILDREN  = parameter.children  || {};

  /****** WIRE UP *******/
  const COMPONENT = (__.innerHTML=template,__.childNodes[0]);

  COMPONENT.innerHTML = DATA.lang[OPTIONS.defaultLanguage];
  CONTAINER.appendChild(COMPONENT);

  // @TODO: add DATA description - because it should be "json-meta-markdown" :-)

  /******** RETURN *********/
  const API = { // should be an event emitter too
    changeLanguage (language) {
      COMPONENT.innerHTML = DATA.lang[language];
    }
  };
  return API;

}
/******************************************************************************
  MODULE = EXPORT [Public Interface]
******************************************************************************/
module.exports = markdownbox;

},{"./index.template.html":10,"_config":11}],10:[function(require,module,exports){
module.exports = '<div class="Markdownbox"></div>\n';
},{}],11:[function(require,module,exports){
/******************************************************************************
  DEPENDENCIES
******************************************************************************/
var pkg         = require('../../package.json');
// var params      = require('') try load files in iframe and scrape it to circumvent CORS
// https://www.npmjs.com/package/iframe-api
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli tool
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
var _config     = {
  title       : pkg.name,
  description : pkg.description,
  version     : pkg.version,
  keywords    : pkg.keywords.join(', '),
  author      : pkg.author.name,
  website     : pkg.homepage,
  style       : pkg.atomify.css.output
};
function config (key) {
  return key ? _config[key] : _config;
}
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports  = config;

},{"../../package.json":12}],12:[function(require,module,exports){
module.exports={
  "name": "holon-markdownbox",
  "version": "0.1.0",
  "description": "## Example * [Wizard Amigos Institute](http://wizard.amigos.institute)",
  "main": "SOURCE/index.js",
  "style": "SOURCE/index.css",
  "dependencies": {},
  "devDependencies": {
    "atomify": "^7.2.2",
    "babelify": "^6.1.1",
    "resrcify": "^1.1.3"
  },
  "scripts": {
    "start": "atomify",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "atomify": {
    "server": {
      "open": true,
      "path": "index.html",
      "lr": {
        "verbose": true,
        "quiet": false,
        "port": 31337,
        "sync": true
      }
    },
    "js": {
      "entry": "SOURCE/index.js",
      "alias": "BUNDLE/bundle.js",
      "output": "BUNDLE/bundle.js",
      "debug": true,
      "watch": true,
      "transform": [
        "babelify"
      ],
      "standalone": "API"
    },
    "css": {
      "entry": "SOURCE/index.css",
      "alias": "BUNDLE/bundle.css",
      "output": "BUNDLE/bundle.css",
      "debug": true,
      "watch": true,
      "autoprefixer": {
        "browsers": [
          "> 1%",
          "IE 7"
        ],
        "cascade": false
      },
      "compress": false,
      "plugin": []
    },
    "assets": {
      "dest": "BUNDLE/assets/",
      "prefix": "/BUNDLE/assets/",
      "retainName": false
    }
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/holons/holon-markdownbox.git"
  },
  "keywords": [
    "holon",
    "holons",
    "holonify",
    "holonomy",
    "component",
    "webcomponent",
    "module",
    "block",
    "BEM"
  ],
  "author": {
    "name": "serapath",
    "email": "dev@serapath.de",
    "url": "http://www.github.com/serapath"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/holons/holon-markdownbox/issues"
  },
  "homepage": "https://github.com/holons/holon-markdownbox#readme",
  "readme": "# holon-markdownbox\n\n## Example\n* [Wizard Amigos Institute](http://wizard.amigos.institute)\n\n## Contribute\n\nIf you like the idea of this module, please feel free to contact me :-)\n",
  "readmeFilename": "README.md",
  "gitHead": "df37dddad1a13b66d588842b37ca22e0f91a4e57",
  "_id": "holon-markdownbox@0.1.0",
  "_shasum": "38b86a56008114966e12d554c4f0ceb128dd3cd7",
  "_from": "holon-markdownbox@*"
}

},{}],13:[function(require,module,exports){
/**
 * html2markdown - An HTML to Markdown converter.
 *
 * This implementation uses HTML or DOM parsing for conversion. Parsing code was
 * abstracted out in a parsing function which should be easy to remove in favor
 * of other parsing libraries.
 *
 * Converted MarkDown was tested with ShowDown library for HTML rendering. And
 * it tries to create MarkDown that does not confuse ShowDown when certain
 * combination of HTML tags come together.
 *
 * @author Himanshu Gilani
 * @author Kates Gasis (original author)
 *
 */

/**
 * html2markdown
 * @param html - html string to convert
 * @return converted markdown text
 */

/*
 Universal JavaScript Module, supports AMD (RequireJS), Node.js, and the browser.
 https://gist.github.com/kirel/1268753
*/

(function (name, definition) {
  if (typeof define === 'function') { // AMD
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) { // Node.js
    module.exports = definition();
  } else { // Browser
    var theModule = definition(), global = this, old = global[name];
    theModule.noConflict = function () {
      global[name] = old;
      return theModule;
    };
    global[name] = theModule;
  }
})('html2markdown', function() {

function trim(value) {
	return value.replace(/^\s+|\s+$/g,"");
}

function endsWith(value, suffix) {
  return value.match(suffix+"$") == suffix;
}

function startsWith(value, str) {
	return value.indexOf(str) == 0;
}

function html2markdown(html, opts) {
	opts = opts || {};

	var nodeList = [];
	var listTagStack = [];
	var linkAttrStack = [];
	var blockquoteStack = [];
	var preStack = [];
	var codeStack = [];
	var links = [];
	var inlineStyle = opts['inlineStyle'] || false;
	var parser = opts['parser'];
	var markdownTags = {
		"hr": "- - -\n\n",
		"br": "  \n",
		"title": "# ",
		"h1": "# ",
		"h2": "## ",
		"h3": "### ",
		"h4": "#### ",
		"h5": "##### ",
		"h6": "###### ",
		"b": "**",
		"strong": "**",
		"i": "_",
		"em": "_",
		"dfn": "_",
		"var": "_",
		"cite": "_",
		"span": " ",
		"ul": "* ",
		"ol": "1. ",
		"dl": "- ",
		"blockquote": "> "
	};

	if(!parser && typeof markdownDOMParser !== 'undefined')
		parser = markdownDOMParser;

	function getListMarkdownTag() {
		var listItem = "";
		if(listTagStack) {
			for ( var i = 0; i < listTagStack.length - 1; i++) {
				listItem += "  ";
			}
		}
		listItem += peek(listTagStack);
		return listItem;
	}

	function convertAttrs(attrs) {
		var attributes = {};
		for(var k in attrs) {
			var attr = attrs[k];
			attributes[attr.name] = attr;
		}
		return attributes;
	}

	function peek(list) {
		if(list && list.length > 0) {
			return list.slice(-1)[0];
		}
		return "";
	}

	function peekTillNotEmpty(list) {
		if(!list) {
			return "";
		}

		for(var i = list.length - 1; i>=0; i-- ){
			if(list[i] != "") {
				return list[i];
			}
		}
		return "";
	}

	function removeIfEmptyTag(start) {
		var cleaned = false;
		if(start == peekTillNotEmpty(nodeList)) {
			while(peek(nodeList) != start) {
				nodeList.pop();
			}
			nodeList.pop();
			cleaned = true;
		}
		return cleaned;
	}

	function sliceText(start) {
		var text = [];
		while(nodeList.length > 0 && peek(nodeList) != start) {
			var t = nodeList.pop();
			text.unshift(t);
		}
		return text.join("");
	}

	function block(isEndBlock) {
		var lastItem = nodeList.pop();
		if (!lastItem) {
			return;
		}

		if(!isEndBlock) {
			var block;
			if(/\s*\n\n\s*$/.test(lastItem)) {
				lastItem = lastItem.replace(/\s*\n\n\s*$/, "\n\n");
				block = "";
			} else if(/\s*\n\s*$/.test(lastItem)) {
				lastItem = lastItem.replace(/\s*\n\s*$/, "\n");
				block = "\n";
			} else if(/\s+$/.test(lastItem)) {
				block = "\n\n";
			} else {
				block = "\n\n";
			}

			nodeList.push(lastItem);
			nodeList.push(block);
		} else {
			nodeList.push(lastItem);
			if(!endsWith(lastItem, "\n")) {
				nodeList.push("\n\n");
			}
		}
 	}

	function listBlock() {
		if(nodeList.length > 0) {
			var li = peek(nodeList);

			if(!endsWith(li, "\n")) {
				nodeList.push("\n");
			}
		} else {
			nodeList.push("\n");
		}
	}

	parser(html,{
		start: function(tag, attrs, unary) {
			tag = tag.toLowerCase();

			if(unary && (tag != "br" && tag != "hr" && tag != "img")) {
				return;
			}

		switch (tag) {
			case "br":
				nodeList.push(markdownTags[tag]);
				break;
			case "hr":
				block();
				nodeList.push(markdownTags[tag]);
				break;
			case "title":
			case "h1":
			case "h2":
			case "h3":
			case "h4":
			case "h5":
			case "h6":
				block();
				nodeList.push(markdownTags[tag]);
				break;
			case "b":
			case "strong":
			case "i":
			case "em":
			case "dfn":
			case "var":
			case "cite":
				nodeList.push(markdownTags[tag]);
				break;
			case "code":
			case "span":
				if(preStack.length > 0)
				{
					break;
				} else if(! /\s+$/.test(peek(nodeList))) {
					nodeList.push(markdownTags[tag]);
				}
				break;
			case "p":
			case "div":
			//case "td":
				block();
				break;
			case "ul":
			case "ol":
			case "dl":
				listTagStack.push(markdownTags[tag]);
				// lists are block elements
				if(listTagStack.length > 1) {
					listBlock();
				} else {
					block();
				}
				break;
			case "li":
			case "dt":
				var li = getListMarkdownTag();
				nodeList.push(li);
				break;
			case "a":
				var attribs = convertAttrs(attrs);
				linkAttrStack.push(attribs);
				nodeList.push("[");
				break;
			case "img":
				var attribs = convertAttrs(attrs);
				var alt, title, url;

				attribs["src"] ? url = attribs["src"].value : url = "";
				if(!url) {
					break;
				}

				attribs['alt'] ? alt = trim(attribs['alt'].value) : alt = "";
				attribs['title'] ? title = trim(attribs['title'].value) : title = "";

				// if parent of image tag is nested in anchor tag use inline style
				if(!inlineStyle && !startsWith(peekTillNotEmpty(nodeList), "[")) {
					var l = links.indexOf(url);
					if(l == -1) {
						links.push(url);
						l=links.length-1;
					}

					block();
					nodeList.push("![");
					if(alt!= "") {
						nodeList.push(alt);
					} else if (title != null) {
						nodeList.push(title);
					}

					nodeList.push("][" + l + "]");
					block();
				} else {
					//if image is not a link image then treat images as block elements
					if(!startsWith(peekTillNotEmpty(nodeList), "[")) {
						block();
					}

					nodeList.push("![" + alt + "](" + url + (title ? " \"" + title + "\"" : "") + ")");

					if(!startsWith(peekTillNotEmpty(nodeList), "[")) {
						block(true);
					}
				}
				break;
			case "blockquote":
				//listBlock();
				block();
				blockquoteStack.push(markdownTags[tag]);
				break;
			case "pre":
				block();
				preStack.push(true);
				nodeList.push("    ");
				break;
			case "table":
				nodeList.push("<table>");
				break;
			case "thead":
				nodeList.push("<thead>");
				break;
			case "tbody":
				nodeList.push("<tbody>");
				break;
			case "tr":
				nodeList.push("<tr>");
				break;
			case "td":
				nodeList.push("<td>");
				break;
			}
		},
		chars: function(text) {
			if(preStack.length > 0) {
				text = text.replace(/\n/g,"\n    ");
			} else if(trim(text) != "") {
				text = text.replace(/\s+/g, " ");

				var prevText = peekTillNotEmpty(nodeList);
				if(/\s+$/.test(prevText)) {
					text = text.replace(/^\s+/g, "");
				}
			} else {
				nodeList.push("");
				return;
			}

			//if(blockquoteStack.length > 0 && peekTillNotEmpty(nodeList).endsWith("\n")) {
			if(blockquoteStack.length > 0) {
				nodeList.push(blockquoteStack.join(""));
			}

			nodeList.push(text);
		},
		end: function(tag) {
			tag = tag.toLowerCase();

		switch (tag) {
			case "title":
			case "h1":
			case "h2":
			case "h3":
			case "h4":
			case "h5":
			case "h6":
				if(!removeIfEmptyTag(markdownTags[tag])) {
					block(true);
				}
				break;
			case "p":
			case "div":
			//case "td":
				while(nodeList.length > 0 && trim(peek(nodeList)) == "") {
					nodeList.pop();
				}
				block(true);
				break;
			case "b":
			case "strong":
			case "i":
			case "em":
			case "dfn":
			case "var":
			case "cite":
				if(!removeIfEmptyTag(markdownTags[tag])) {
					nodeList.push(trim(sliceText(markdownTags[tag])));
					nodeList.push(markdownTags[tag]);
				}
				break;
			case "a":
				var text = sliceText("[");
				text = text.replace(/\s+/g, " ");
				text = trim(text);

				if(text == "") {
					nodeList.pop();
					break;
				}

				var attrs = linkAttrStack.pop();
				var url;
				attrs["href"] &&  attrs["href"].value != "" ? url = attrs["href"].value : url = "";

				if(url == "") {
					nodeList.pop();
					nodeList.push(text);
					break;
				}

				nodeList.push(text);

				if(!inlineStyle && !startsWith(peek(nodeList), "!")){
					var l = links.indexOf(url);
					if(l == -1) {
						links.push(url);
						l=links.length-1;
					}
					nodeList.push("][" + l + "]");
				} else {
					if(startsWith(peek(nodeList), "!")){
						var text = nodeList.pop();
						text = nodeList.pop() + text;
						block();
						nodeList.push(text);
					}

					var title = attrs["title"];
					nodeList.push("](" + url + (title ? " \"" + trim(title.value).replace(/\s+/g, " ") + "\"" : "") + ")");

					if(startsWith(peek(nodeList), "!")){
						block(true);
					}
				}
				break;
			case "ul":
			case "ol":
			case "dl":
				listBlock();
				listTagStack.pop();
				break;
			case "li":
			case "dt":
				var li = getListMarkdownTag();
				if(!removeIfEmptyTag(li)) {
					var text = trim(sliceText(li));

					if(startsWith(text, "[![")) {
						nodeList.pop();
						block();
						nodeList.push(text);
						block(true);
					} else {
						nodeList.push(text);
						listBlock();
					}
				}
				break;
			case "blockquote":
				blockquoteStack.pop();
				break;
			case "pre":
				//uncomment following experimental code to discard line numbers when syntax highlighters are used
				//notes this code thorough testing before production user
				/*
				var p=[];
				var flag = true;
				var count = 0, whiteSpace = 0, line = 0;
				console.log(">> " + peek(nodeList));
				while(peek(nodeList).startsWith("    ") || flag == true)
				{
					//console.log('inside');
					var text = nodeList.pop();
					p.push(text);

					if(flag == true && !text.startsWith("    ")) {
						continue;
					} else {
						flag = false;
					}

					//var result = parseInt(text.trim());
					if(!isNaN(text.trim())) {
						count++;
					} else if(text.trim() == ""){
						whiteSpace++;
					} else {
						line++;
					}
					flag = false;
				}

				console.log(line);
				if(line != 0)
				{
					while(p.length != 0) {
						nodeList.push(p.pop());
					}
				}
				*/
				block(true);
				preStack.pop();
				break;
			case "code":
			case "span":
				if(preStack.length > 0)
				{
					break;
				} else if(trim(peek(nodeList)) == "") {
					nodeList.pop();
					nodeList.push(markdownTags[tag]);
				} else {
					var text = nodeList.pop();
					nodeList.push(trim(text));
					nodeList.push(markdownTags[tag]);
				}
				break;
			case "table":
				nodeList.push("</table>");
				break;
			case "thead":
				nodeList.push("</thead>");
				break;
			case "tbody":
				nodeList.push("</tbody>");
				break;
			case "tr":
				nodeList.push("</tr>");
				break;
			case "td":
				nodeList.push("</td>");
				break;
			case "br":
			case "hr":
			case "img":
				break;
			}

		}
	}, {"nodesToIgnore": ["script", "noscript", "object", "iframe", "frame", "head", "style", "label"]});

	if(!inlineStyle) {
		for ( var i = 0; i < links.length; i++) {
			if(i == 0) {
				var lastItem = nodeList.pop();
				nodeList.push(lastItem.replace(/\s+$/g, ""));
				nodeList.push("\n\n[" + i + "]: " + links[i]);
			} else {
				nodeList.push("\n[" + i + "]: " + links[i]);
			}
		}
	}

	return nodeList.join("");

}

return html2markdown;

});
},{}],14:[function(require,module,exports){
var html2markdown = require('./html2markdown');
var htmlParser = require('./markdown_html_parser');

module.exports = function(html, opts) {
  opts = opts || {};
  opts.parser = htmlParser;
  return html2markdown(html, opts);
};

},{"./html2markdown":13,"./markdown_html_parser":15}],15:[function(require,module,exports){
/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */

/*
 Universal JavaScript Module, supports AMD (RequireJS), Node.js, and the browser.
 https://gist.github.com/kirel/1268753
*/

(function (name, definition) {
  if (typeof define === 'function') { // AMD
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) { // Node.js
    module.exports = definition();
  } else { // Browser
    var theModule = definition(), global = this, old = global[name];
    theModule.noConflict = function () {
      global[name] = old;
      return theModule;
    };
    global[name] = theModule;
  }
})('markdownHTMLParser', function() {

	// Regular Expressions for parsing tags and attributes
	var startTag = /^<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
		endTag = /^<\/(\w+)[^>]*>/,
		attr = /(\w+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

	// Empty Elements - HTML 4.01
	var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

	// Block Elements - HTML 4.01
	var block = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

	// Inline Elements - HTML 4.01
	var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

	// Attributes that have their values filled in disabled="disabled"
	var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

	// Special Elements (can contain anything)
	var special = makeMap("script,style");

	function HTMLParser( html, handler ) {
		var index, chars, match, stack = [], last = html;
		stack.last = function(){
			return this[ this.length - 1 ];
		};

		while ( html ) {
			chars = true;

			// Make sure we're not in a script or style element
			if ( !stack.last() || !special[ stack.last() ] ) {

				// Comment
				if ( html.indexOf("<!--") == 0 ) {
					index = html.indexOf("-->");

					if ( index >= 0 ) {
						if ( handler.comment )
							handler.comment( html.substring( 4, index ) );
						html = html.substring( index + 3 );
						chars = false;
					}

				// end tag
				} else if ( html.indexOf("</") == 0 ) {
					match = html.match( endTag );

					if ( match ) {
						html = html.substring( match[0].length );
						match[0].replace( endTag, parseEndTag );
						chars = false;
					}

				// start tag
				} else if ( html.indexOf("<") == 0 ) {
					match = html.match( startTag );

					if ( match ) {
						html = html.substring( match[0].length );
						match[0].replace( startTag, parseStartTag );
						chars = false;
					}
				}

				if ( chars ) {
					index = html.indexOf("<");

					var text = index < 0 ? html : html.substring( 0, index );
					html = index < 0 ? "" : html.substring( index );

					if ( handler.chars )
						handler.chars( text );
				}

			} else {
				html = html.replace(new RegExp("(.*)<\/" + stack.last() + "[^>]*>"), function(all, text){
					text = text.replace(/<!--(.*?)-->/g, "$1")
						.replace(/<!\[CDATA\[(.*?)]]>/g, "$1");

					if ( handler.chars )
						handler.chars( text );

					return "";
				});

				parseEndTag( "", stack.last() );
			}

			if ( html == last )
				throw "Parse Error: " + html;
			last = html;
		}

		// Clean up any remaining tags
		parseEndTag();

		function parseStartTag( tag, tagName, rest, unary ) {
			if ( block[ tagName ] ) {
				while ( stack.last() && inline[ stack.last() ] ) {
					parseEndTag( "", stack.last() );
				}
			}

			if ( closeSelf[ tagName ] && stack.last() == tagName ) {
				parseEndTag( "", tagName );
			}

			unary = empty[ tagName ] || !!unary;

			if ( !unary )
				stack.push( tagName );

			if ( handler.start ) {
				var attrs = [];

				rest.replace(attr, function(match, name) {
					var value = arguments[2] ? arguments[2] :
						arguments[3] ? arguments[3] :
						arguments[4] ? arguments[4] :
						fillAttrs[name] ? name : "";

					attrs.push({
						name: name,
						value: value,
						escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
					});
				});

				if ( handler.start )
					handler.start( tagName, attrs, unary );
			}
		}

		function parseEndTag( tag, tagName ) {
			// If no tag name is provided, clean shop
			if ( !tagName )
				var pos = 0;

			// Find the closest opened tag of the same type
			else
				for ( var pos = stack.length - 1; pos >= 0; pos-- )
					if ( stack[ pos ] == tagName )
						break;

			if ( pos >= 0 ) {
				// Close all the open elements, up the stack
				for ( var i = stack.length - 1; i >= pos; i-- )
					if ( handler.end )
						handler.end( stack[ i ] );

				// Remove the open elements from the stack
				stack.length = pos;
			}
		}
	};

	this.HTMLtoXML = function( html ) {
		var results = "";

		HTMLParser(html, {
			start: function( tag, attrs, unary ) {
				results += "<" + tag;

				for ( var i = 0; i < attrs.length; i++ )
					results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';

				results += (unary ? "/" : "") + ">";
			},
			end: function( tag ) {
				results += "</" + tag + ">";
			},
			chars: function( text ) {
				results += text;
			},
			comment: function( text ) {
				results += "<!--" + text + "-->";
			}
		});

		return results;
	};

	this.HTMLtoDOM = function( html, doc ) {
		// There can be only one of these elements
		var one = makeMap("html,head,body,title");

		// Enforce a structure for the document
		var structure = {
			link: "head",
			base: "head"
		};

		if ( !doc ) {
			if ( typeof DOMDocument != "undefined" )
				doc = new DOMDocument();
			else if ( typeof document != "undefined" && document.implementation && document.implementation.createDocument )
				doc = document.implementation.createDocument("", "", null);
			else if ( typeof ActiveX != "undefined" )
				doc = new ActiveXObject("Msxml.DOMDocument");

		} else
			doc = doc.ownerDocument ||
				doc.getOwnerDocument && doc.getOwnerDocument() ||
				doc;

		var elems = [],
			documentElement = doc.documentElement ||
				doc.getDocumentElement && doc.getDocumentElement();

		// If we're dealing with an empty document then we
		// need to pre-populate it with the HTML document structure
		if ( !documentElement && doc.createElement ) (function(){
			var html = doc.createElement("html");
			var head = doc.createElement("head");
			head.appendChild( doc.createElement("title") );
			html.appendChild( head );
			html.appendChild( doc.createElement("body") );
			doc.appendChild( html );
		})();

		// Find all the unique elements
		if ( doc.getElementsByTagName )
			for ( var i in one )
				one[ i ] = doc.getElementsByTagName( i )[0];

		// If we're working with a document, inject contents into
		// the body element
		var curParentNode = one.body;

		HTMLParser( html, {
			start: function( tagName, attrs, unary ) {
				// If it's a pre-built element, then we can ignore
				// its construction
				if ( one[ tagName ] ) {
					curParentNode = one[ tagName ];
					return;
				}

				var elem = doc.createElement( tagName );

				for ( var attr in attrs )
					elem.setAttribute( attrs[ attr ].name, attrs[ attr ].value );

				if ( structure[ tagName ] && typeof one[ structure[ tagName ] ] != "boolean" )
					one[ structure[ tagName ] ].appendChild( elem );

				else if ( curParentNode && curParentNode.appendChild )
					curParentNode.appendChild( elem );

				if ( !unary ) {
					elems.push( elem );
					curParentNode = elem;
				}
			},
			end: function( tag ) {
				elems.length -= 1;

				// Init the new parentNode
				curParentNode = elems[ elems.length - 1 ];
			},
			chars: function( text ) {
				curParentNode.appendChild( doc.createTextNode( text ) );
			},
			comment: function( text ) {
				// create comment node
			}
		});

		return doc;
	};

	function makeMap(str){
		var obj = {}, items = str.split(",");
		for ( var i = 0; i < items.length; i++ )
			obj[ items[i] ] = true;
		return obj;
	}

	return HTMLParser;

});
},{}],16:[function(require,module,exports){
'use strict';

var DEFAULT_REGEX = /^(\{[\s\S]*?\n\})(\s*\n)*/;

/**
 * Parses JSON front matter from specified `string`, returning the object itself
 * augmented with `__content__` property (this name is configurable via `alias` option)
 * where the rest content resides.
 *
 * By default it parses indented JSON (such as the one you get via
 * `JSON.stringify(myobj, null, 2)`, so it only looks for a single closing
 * right brace sitting on the line start.
 * The rest content can be delimited from JSON using arbitrary
 * number of blank lines.
 *
 * Options:
 *
 *  * `alias` — variable name to assign text content to (default is `__content__`)
 *  * `regex` — regex for capturing the JSON object and stripping it away
 *    from the rest content; the first capturing group should enclose the JSON object
 *    (default is `^(\{[\s\S]*?\n\})(?:\s*\n)*`)
 *
 * @param {String} string — input string
 * @param {*} options — options described above
 */
exports.parse = function (string, options) {
  options = options || {};
  // configurables
  var regex = options.regex || DEFAULT_REGEX;
  var alias = options.alias || '__content__';
  // parse it like a pro
  var result = {};
  string = string.replace(regex, function (match, json) {
    try {
      result = JSON.parse(json);
      return '';
    } catch (e) {
      return match;
    }
  });
  result[alias] = string;
  return result;
};

/**
 * Reverse parse: removes `__content__` property from the `object` and emits it
 * as indented JSON; then appends the `__content__` property to resulting string
 * with optional delimiter specified via `delimiter` options (by default a single
 * blank line is inserted).
 *
 * Options are:
 *
 *  * `alias` — variable name containing the rest content
 *    (default is `__content__`, like in `parse`)
 *  * `delimiter` — a string to insert between JSON and rest content
 *    (default is `\n\n`)
 *
 * @param {*} object — object to serialize;
 * @param {*} options — options described above
 */
exports.serialize = function (object, options) {
  options = options || {};
  // configurable
  var delimiter = options.delimiter || '\n\n';
  var alias = options.alias || '__content__';
  // Extract the content
  var content = object[alias] || '';
  // Properties are copied onto the new object to prevent side-effects
  var obj = {};
  Object.keys(object).forEach(function (key) {
    if (key != alias)
      obj[key] = object[key];
  });
  // Write them
  return JSON.stringify(obj, null, 2) + delimiter + content;
};

},{}],17:[function(require,module,exports){
(function (process){

'use strict';
/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
var jsonmatter    = require('json-matter');
var marked        = require('marked');
var html2markdown = require('html2markdown');
var method        = require('exemethod')(function(a,b){return b;})
var fs            = require('fs');
var os            = require('os');
/******************************************************************************
  PARAMETER = ARGUMENT + [Sanitize & Validate]
******************************************************************************/
var args          = process.argv.slice(2);
function setInput (error, mode, string, filename) {
  if (error) { throw error; }
  var $mode       = mode;
  var $string     = string;
  var $filename   = filename;
}
/******************************************************************************
  EXPORT
******************************************************************************/
// REQUIRED MODULE
if ({'required':true,'browserify':true}[method]) {
  module.exports =  {
    parse           : parse,
    serialize       : serialize
  };
} else if ({'npm':true,'script':true,'globalcli':true,'localcli':true}[method]) {
  // $ node -p -e 'process.stdin.isTTY' // => true
  if (process.stdin.isTTY) {
    // SERVER $> cli --server
    if (args[0] === '--server') {
      console.log('SERVER with REPL');
      console.log('To abort press: CTRL+D or CTRL+C');
      setInput(null, args[0], null, null);
      startDeamon();
    // CLI $> cli --serialize filename
    } else {
      console.log('NORMAL CLI EXECUTION');
      throw new Error('@TODO: serialize/parse from cli not implemented yet!');
      if (args[1]) { // CLI + 2 args
        setInput(null, args[0], null, args[1]);
      } else if (args[0]) { // CLI + 1 arg
        setInput(null, '--parse', null, args[0]);
      } else { // CLI + no args
        setInput(new Error('@TODO: add --help option & show when given no args'));
      }
    }
  // $ echo 'foo' | node -p -e 'process.stdin.isTTY' // => undefined
  // @TODO: !!!! Maybe "method='npm'" will not count as normal cli execution !!!! !!!!!!!!!
  } else if (args[0] === '--server') {
    setInput(new Error('@TODO: add stream into server deamon process'));
  // PIPED
  } else if (args[0]) {
    var $mode = args[0];
    startStream();
    startDeamon();
  } else if (!args.length) {
    var $mode     = '--parse';
    startStream();
    startDeamon();
  } else {
    throw new Error('@TODO: whats wrong here???');
  }
} else {
  throw new Error('@TODO: unsupported method: '+method);
}
/******************************************************************************
  PIPE STREAM
******************************************************************************/
function startStream () {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(data) {
    return {
      "--parse"     : function (string) {
        var result = parse(string);
        process.stdout.write(JSON.stringify(result, null, 2));
      },
      "--serialize" : function (string) {
        var result = serialize(JSON.parse(string));
        process.stdout.write(result);
      }
    }[$mode](data);
  });
}
/******************************************************************************
  UNIX SIGNALS
******************************************************************************/
function startDeamon () {
  // ps aux | grep yourscript
  // kill -s SIGINT [process_id]
  process.stdin.resume();
  process.on('SIGINT', function (err) {
    // An easy way to send the SIGINT signal is with Control-C in most terminal programs.
    // Note:
    //   SIGUSR1 is reserved by node.js to start the debugger. It's possible to install a listener but that won't stop the debugger from starting.
    //   SIGTERM and SIGINT have default handlers on non-Windows platforms that resets the terminal mode before exiting with code 128 + signal number. If one of these signals has a listener installed, its default behaviour will be removed (node will no longer exit).
    //   SIGPIPE is ignored by default, it can have a listener installed.
    //   SIGHUP is generated on Windows when the console window is closed, and on other platforms under various similar conditions, see signal(7). It can have a listener installed, however node will be unconditionally terminated by Windows about 10 seconds later. On non-Windows platforms, the default behaviour of SIGHUP is to terminate node, but once a listener has been installed its default behaviour will be removed.
    //   SIGTERM is not supported on Windows, it can be listened on.
    //   SIGINT from the terminal is supported on all platforms, and can usually be generated with CTRL+C (though this may be configurable). It is not generated when terminal raw mode is enabled.
    //   SIGBREAK is delivered on Windows when CTRL+BREAK is pressed, on non-Windows platforms it can be listened on, but there is no way to send or generate it.
    //   SIGWINCH is delivered when the console has been resized. On Windows, this will only happen on write to the console when the cursor is being moved, or when a readable tty is used in raw mode.
    //   SIGKILL cannot have a listener installed, it will unconditionally terminate node on all platforms.
    //   SIGSTOP cannot have a listener installed.
    //   Note that Windows does not support sending Signals, but node offers some emulation with process.kill(), and child_process.kill(): - Sending signal 0 can be used to search for the existence of a process - Sending SIGINT, SIGTERM, and SIGKILL cause the unconditional exit of the target process.
    console.log('Got a SIGINT. Goodbye cruel world.');
    if (err) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
}
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
function parse (string) {
  var result = jsonmatter.parse(string, {
    regex: /^[\s\t\n\r]*---{1}[\s\t\n\r]*(\{[\s\S]*\}[\s\t\n\r]*)(---{1})/
  });
  var markdown        = result.__content__;
  var html            = marked(markdown).replace(/\r?\n|\r/g, "");
  result.__content__  = patch(html, result.custom);
  return result;
}
function serialize (object) {
  var html    = object.__content__;
  html        = unpatch(html, object.custom);
  object.__content__  = html2markdown(html);
  var result  = jsonmatter.serialize(object, {
    delimiter: os.EOL+'---'+os.EOL+os.EOL
  });
  return '---' + os.EOL + result;
}
function unpatch (html, custom) {
  // for (var key in custom) {
  //   var htmlstring = custom[key];
  //   for (var old; old != html;){
  //     old = html;
  //     html = html.replace(
  //       htmlstring,
  //       '<a href="('+key+')">{{'+key.substr(2,key.length)+'}}</a>'
  //     );
  //   }
  // }
  if (custom) {
    throw new Error('@TODO: html2markdown parser is too smart - so not yet implemented - open an issue if you need it to be solved')
  }
  // return html;
}
function patch (html, custom) {
  for (var key in custom) {
    var regx = new RegExp('<a href="(' + key + ')">[^<>]*<\/a>', 'g');
    html = html.replace(regx, function (match, contents, offset, s) {
      return custom[key];
    });
  }
  return html;
}

}).call(this,require('_process'))

},{"_process":7,"exemethod":18,"fs":4,"html2markdown":14,"json-matter":16,"marked":19,"os":5}],18:[function(require,module,exports){
(function (process){

'use strict';
/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
const path = require('path');
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli tool
  // $paramName = process.argv[2];
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
function returnMessage (msg, method) {
  console.log('==============================');
  console.log(msg);
  console.log('==============================');
  return method;
}
function exemethod (logger) {
  // logger: function (msg, method) { /*log here*/ return method; }
  // return [npm|script|globalcli|localcli|required|browserify]
  logger = logger ? logger : returnMessage;
  if (process.platform === 'linux') {
    var isLinux         = true;
  } else if (process.platform === 'darwin') {
    var isMac           = true;
  } else if (process.platform) {
    var isWindows       = true;
  } else {
    var isBrowserified  = process.title === 'browser';
  }
  var isNode            = !isBrowserified;
  if (isNode) {
    var isRequired  = module.parent ? module.parent.parent ? true:false:false;
    var isCLI       = !isRequired;
    if (isCLI) {
      var fullpath  = process.env._.split(path.sep);
      var dir       = fullpath[0];
      var cmd       = fullpath[fullpath.length-1];
      var isLocal   = cmd === 'node' || cmd === 'iojs';
      var isScript  = dir === '.';
      var isNPM     = cmd === 'npm';
      var isGlobal  = !isLocal;
      if (isNPM) {
        return logger('EXEC AS: npm run ...', 'npm');
      } else if (isScript) {
        return logger('EXEC AS: standalone script', 'script');
      } else if (isGlobal) {
        return logger('EXEC AS: node cli global', 'globalcli');
      } else if (isLocal){
        return logger('EXEC AS: node cli local', 'localcli');
      }
    } else if (isRequired) {
      return logger('EXEC AS: node required(...)', 'required');
    } else {
      throw new Error('Current usage not supported. [weird node usage]');
    }
  } else if (isBrowserified) {
    var isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      return logger('EXEC AS: browser required(...)', 'browserify');
    } else {
      throw new Error('Current usage not supported. [browserified cli]');
    }
  } else {
    throw new Error('Current usage not supported. [unknown environment]');
  }
}
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports = exemethod;

}).call(this,require('_process'))

},{"_process":7,"path":6}],19:[function(require,module,exports){
(function (global){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3]
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(this.smartypants(cap[0]));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/--/g, '\u2014')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
var XMLHttpRequest  = require('xhrpolyfill');

module.exports = function xhr2 (params, callback) {
  // calls: callback(data, response, xhr);
  var args = { // e.g. url = "http://ip.jsontest.com/a=1&b=2&c=3"
    url      : typeof params === 'string' ? params : params.url,
    method   : params.method || params.data ? 'POST': 'GET',
    body     : params.data, // data: formdata or {key:val}
    headers  : (function(){
      var header = {
        'X-Requested-With' :'XMLHttpRequest',
        'Content-Type'     :'application/x-www-form-urlencoded'
      };
      return params.headers ? params.headers : params.body ? header : {};
    })()
  };
  var xhr = XMLHttpRequest();
  if (!xhr) { return null };
  xhr.open(args.method,args.url);
  for (var field in args.headers) {
    xhr.setRequestHeader(field, args.headers[field]);
  }
  xhr.onload=function(response){callback(this.response, response, xhr);};
  xhr.send(args.body||null);
};

},{"xhrpolyfill":21}],21:[function(require,module,exports){
var factories = [
  function () {return new XMLHttpRequest();}, // IE10+, Firefox, Chrome, Opera, Safari
  function () {return new ActiveXObject("Msxml3.XMLHTTP");},     // IE9
  function () {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}, // IE8
  function () {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}, // IE7
  function () {return new ActiveXObject("Msxml2.XMLHTTP");},     // IE6
  function () {return new ActiveXObject("Microsoft.XMLHTTP");},  // IE5
  function () {return null;}
];
module.exports = function getXHR() {
  for (var i=0, xhr, len=factories.length; i<len; i++) {
    try       { xhr = factories[i](); return xhr; }
    catch (e) { continue; }
  }
};

},{}],22:[function(require,module,exports){
/******************************************************************************
  DEPENDENCIES
******************************************************************************/
var _config   = require('_config');
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli tool
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports  = boilerplate;
/******************************************************************************
  EXECUTION
******************************************************************************/
var config      = _config();
function boilerplate (parameter) {
  var $title              = config['title'];
  var $description        = config['description'];
  var $keywords           = config['keywords'];
  var $author             = config['author'];
  var $website            = config['website'];
  var $style              = config['style'];

  var $logoURL            = undefined;
  var $googleAnalytics    = undefined;

  if (parameter) {
    $title                = parameter.title       || $title;
    $description          = parameter.description || $description;
    $keywords             = parameter.keywords    || $keywords;
    $author               = parameter.author      || $author;
    $website              = parameter.website     || $website;
    $style                = parameter.style       || $style;

    $logoURL              = parameter.logoURL     || $logoURL;
    $googleAnalytics      = parameter.ga          || $googleAnalytics;
  }

  var title               = ['<title>'+$title+'</title>'];
  var meta                = [
    '<meta charset="utf-8">',
    '<meta name="format-detection" content="telephone=no" />',
    '<meta name="msapplication-tap-highlight" content="no" />',
    '<meta name="description" content="'+$description+'">',
    '<meta name="keywords" content="'+$keywords+'">',
    '<meta name="author" content="'+$author+'">',
    '<meta name="viewport" content="width=device-width, initial-scale = 1.0, user-scalable=no">'
  ];
  var og                  = [
    '<meta property="og:title" content="'+$title+'" />',
    '<meta property="og:site_name" content="'+$title+'" />',
    '<meta property="og:url" content="'+$website+'" />',
    '<meta property="og:description" content="'+$description+'" />',
    '<meta property="og:image" content="'+$logoURL+'" />',
  ];
  var icon                = [ // check item generator
    '<link rel="apple-touch-icon" sizes="57x57" href="logo/favicon/apple-touch-icon-57x57.png">',
    '<link rel="apple-touch-icon" sizes="60x60" href="logo/favicon/apple-touch-icon-60x60.png">',
    '<link rel="apple-touch-icon" sizes="72x72" href="logo/favicon/apple-touch-icon-72x72.png">',
    '<link rel="apple-touch-icon" sizes="76x76" href="logo/favicon/apple-touch-icon-76x76.png">',
    '<link rel="apple-touch-icon" sizes="114x114" href="logo/favicon/apple-touch-icon-114x114.png">',
    '<link rel="apple-touch-icon" sizes="120x120" href="logo/favicon/apple-touch-icon-120x120.png">',
    '<link rel="apple-touch-icon" sizes="144x144" href="logo/favicon/apple-touch-icon-144x144.png">',
    '<link rel="icon" type="image/png" href="logo/favicon/favicon-32x32.png" sizes="32x32">',
    '<link rel="icon" type="image/png" href="logo/favicon/favicon-96x96.png" sizes="96x96">',
    '<link rel="icon" type="image/png" href="logo/favicon/favicon-16x16.png" sizes="16x16">',
    '<link rel="manifest" href="logo/favicon/manifest.json">',
    '<meta name="msapplication-TileColor" content="#b91d47">',
    '<meta name="msapplication-TileImage" content="logo/favicon/mstile-144x144.png">',
    '<meta name="theme-color" content="#ffffff">',
    '<link rel="shortcut icon" type="image/x-icon" href="SOURCE/favicon.ico">',
    '<link rel="icon" type="image/png" href="SOURCE/reinventingengagement.png">'
  ];
  var style               = [
    '<link rel="stylesheet" type="text/css" href="' + $style + '" />'
  ];
  var google              = $googleAnalytics ? [
    "<script>",
      "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){",
      "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),",
      "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)",
      "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');",
      "ga('create', '" + $googleAnalytics + "', 'auto');",
      "ga('send', 'pageview');",
    "</script>"]
    :[];


  var head    = title.concat(meta).concat(og)/*.concat(icon)*/.concat(style);
  var body    = google/*.concat(...)*/;

  var htmlTag = document.querySelector('html');
  var headTag = document.querySelector('head');
  var bodyTag = document.querySelector('body');

  htmlTag.setAttribute('lang','en');
  headTag.innerHTML = head.join('');

  var tmp, temp = document.createElement('div');
  temp.innerHTML = body.join('');
  while (tmp = temp.childNodes[0]) { bodyTag.appendChild(tmp); }

  return bodyTag;
};

},{"_config":23}],23:[function(require,module,exports){
/******************************************************************************
  DEPENDENCIES
******************************************************************************/
var pkg         = require('../../package.json');
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli tool
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports  = config;
/******************************************************************************
  EXECUTION
******************************************************************************/
var _config     = {
  title       : '',
  description : pkg.description,
  version     : pkg.version,
  keywords    : pkg.keywords.join(', '),
  author      : pkg.author.name,
  website     : 'http://npmjs.org/webpage',
  style       : 'BUNDLE/bundle.css'
};
function config (key) {
  return key ? _config[key] : _config;
}

},{"../../package.json":24}],24:[function(require,module,exports){
module.exports={
  "name": "webpage",
  "version": "0.3.0",
  "description": "Webpage Boilerplate Component",
  "main": "SOURCE/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "boilerplate",
    "webpage",
    "component"
  ],
  "author": {
    "name": "serapath",
    "email": "dev@serapath.de",
    "url": "http://www.github.com/serapath"
  },
  "license": "MIT",
  "readme": "# webpage\nWebpage Boilerplate Component\n\n```js\nvar webpage = require('webpage');\nvar body    = webpage({\n  // OPTIONAL\n  // ... and more in the future (e.g. icon, og, ...)\n  title       : 'Foobar',\n  description : 'foo bar baz',\n  keywords    : 'foo, bar, baz',\n  author      : 'quux baz',\n  website     : 'http://foo.bar.baz'\n});\n",
  "readmeFilename": "README.md",
  "gitHead": "2839c56a95bd447b78de503b15d619185750e7c4",
  "_id": "webpage@0.3.0",
  "_shasum": "15c8c99e822b499e9981ae6876539b423448b8e7",
  "_from": "webpage@>=0.3.0 <0.4.0"
}

},{}],25:[function(require,module,exports){
module.exports={
  "name": "wizardamigosinstitute",
  "version": "1.0.0",
  "private": true,
  "description": "Wizard Amigos Institute Website",
  "main": "SOURCE/index.js",
  "style": "SOURCE/index.css",
  "dependencies": {
    "fastdom": "^0.8.6",
    "holon-markdownbox": "^0.1.0",
    "json-matter": "^1.0.2",
    "json-meta-marked": "^1.1.2",
    "marked": "^0.3.3",
    "minixhr": "^1.1.0",
    "resrcify": "^1.1.3",
    "webpage": "^0.3.0"
  },
  "devDependencies": {
    "atomify": "^7.1.0",
    "babelify": "^6.0.2"
  },
  "scripts": {
    "start": "atomify",
    "test": "echo \"Error: no test specified\" && exit 1 #testem start --singleRun",
    "---": "#----------------------------------------------------------------",
    "build:scripts": "#browserify -d assets/scripts/main.js -p [minifyify --compressPath . --map main.js.map --output dist/main.js.map] | hashmark -n dist/main.js -s -l 8 -m assets.json 'dist/{name}{hash}{ext}'",
    "jscs": "#jscs eshint eslint...",
    "uglify": "#uglify",
    "png": "#optimg",
    "jpg": "#jpgo",
    "cssm": "#ycssmin **.css #cssmin",
    "cssv": "#css-validator **.css",
    "cssp": "#css-prettifier **.css",
    "html": "#html5-lint **.html",
    "buildV": "#rm -rf RELEASE && mkdir RELEASE && node node_modules/browserify/bin/cmd.js SOURCE/index.js -d -o RELEASE/index.v$(cat package.json | grep version | grep -Po '(?<=version\": \").*(?=\")').bundle.js",
    "watchV": "#rm -rf RELEASE && mkdir RELEASE && node node_modules/watchify/bin/cmd.js SOURCE/index.js -o RELEASE/index.v$(cat package.json | grep version | grep -Po '(?<=version\": \").*(?=\")').bundle.js",
    "open:prod": "#opener http://example.com",
    "open:stage": "#opener http://staging.example.internal",
    "open:dev": "#opener http://localhost:9090",
    "deploy:prod": "#s3-cli sync ./dist/ s3://example-com/prod-site/",
    "deploy:stage": "#s3-cli sync ./dist/ s3://example-com/stage-site/"
  },
  "atomify": {
    "server": {
      "open": true,
      "path": "index.html",
      "lr": {
        "verbose": true,
        "quiet": false,
        "port": 31337,
        "sync": true
      }
    },
    "js": {
      "entry": "SOURCE/index.js",
      "alias": "BUNDLE/bundle.js",
      "output": "BUNDLE/bundle.js",
      "debug": true,
      "watch": true,
      "transform": [
        "babelify"
      ],
      "standalone": "API"
    },
    "css": {
      "entry": "SOURCE/index.css",
      "alias": "BUNDLE/bundle.css",
      "output": "BUNDLE/bundle.css",
      "debug": true,
      "watch": true,
      "autoprefixer": {
        "browsers": [
          "> 1%",
          "IE 7"
        ],
        "cascade": false
      },
      "compress": false,
      "plugin": []
    },
    "assets": {
      "dest": "BUNDLE/assets/",
      "prefix": "/BUNDLE/assets/",
      "retainName": false
    }
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/wizardamigosinstitute/wizardamigosinstitute.github.io.git"
  },
  "keywords": [
    "teaching",
    "teacher",
    "learning",
    "javascript",
    "berlin",
    "learner",
    "programming",
    "school",
    "university",
    "academy",
    "institute",
    "wizard",
    "amigos",
    "node",
    "nodejs",
    "html",
    "css"
  ],
  "author": {
    "name": "serapath",
    "email": "dev@serapath.de",
    "url": "http://www.github.com/serapath"
  },
  "license": "GNU AGPL",
  "bugs": {
    "url": "https://github.com/wizardamigosinstitute/wizardamigosinstitute.github.io/issues"
  },
  "homepage": "http://wizard.amigos.institute"
}

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9hdG9taWZ5L25vZGVfbW9kdWxlcy9hdG9taWZ5LWpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zZXJhcGF0aC93b3Jrc3BhY2Uvc2VyYXNlZWQvSE9MRElORy93aXphcmQuYW1pZ29zLmluc3RpdHV0ZS93aXphcmRhbWlnb3NpbnN0aXR1dGUuZ2l0aHViLmlvL1NPVVJDRS9pbmRleC5qcyIsIlNPVVJDRS9pbmRleC50ZW1wbGF0ZS5odG1sIiwiU09VUkNFL25vZGVfbW9kdWxlcy9fY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL2F0b21pZnkvbm9kZV9tb2R1bGVzL2F0b21pZnktanMvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9hdG9taWZ5L25vZGVfbW9kdWxlcy9hdG9taWZ5LWpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9vcy1icm93c2VyaWZ5L2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvYXRvbWlmeS9ub2RlX21vZHVsZXMvYXRvbWlmeS1qcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2F0b21pZnkvbm9kZV9tb2R1bGVzL2F0b21pZnktanMvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9mYXN0ZG9tL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2hvbG9uLW1hcmtkb3duYm94L1NPVVJDRS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9ob2xvbi1tYXJrZG93bmJveC9TT1VSQ0UvaW5kZXgudGVtcGxhdGUuaHRtbCIsIm5vZGVfbW9kdWxlcy9ob2xvbi1tYXJrZG93bmJveC9TT1VSQ0Uvbm9kZV9tb2R1bGVzL19jb25maWcuanMiLCJub2RlX21vZHVsZXMvaG9sb24tbWFya2Rvd25ib3gvcGFja2FnZS5qc29uIiwibm9kZV9tb2R1bGVzL2h0bWwybWFya2Rvd24vaHRtbDJtYXJrZG93bi5qcyIsIm5vZGVfbW9kdWxlcy9odG1sMm1hcmtkb3duL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2h0bWwybWFya2Rvd24vbWFya2Rvd25faHRtbF9wYXJzZXIuanMiLCJub2RlX21vZHVsZXMvanNvbi1tYXR0ZXIvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pzb24tbWV0YS1tYXJrZWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvanNvbi1tZXRhLW1hcmtlZC9ub2RlX21vZHVsZXMvZXhlbWV0aG9kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtlZC9saWIvbWFya2VkLmpzIiwibm9kZV9tb2R1bGVzL21pbml4aHIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWluaXhoci9ub2RlX21vZHVsZXMveGhycG9seWZpbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0Uvbm9kZV9tb2R1bGVzL19jb25maWcuanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9wYWNrYWdlLmpzb24iLCJwYWNrYWdlLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7QUFJYixJQUFNLE9BQU8sR0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkMsSUFBTSxPQUFPLEdBQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZDLElBQU0sT0FBTyxHQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7O0FBR3ZDLElBQU0sR0FBRyxHQUFXLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hELElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7Ozs7Ozs7QUFTakQsSUFBTSxNQUFNLEdBQVEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDekMsSUFBTSxRQUFRLEdBQU0sT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDckQsSUFBSSxFQUFFLEdBQWMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsRCxTQUFTLHFCQUFxQixDQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBQ3pDLE1BQU0sU0FBUyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRTtBQUMzRCxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFMUUsTUFBSSxTQUFTLEdBQUssSUFBSSxDQUFDO0FBQ3ZCLE1BQUksT0FBTyxHQUFPLEVBQUUsQ0FBQztBQUNyQixNQUFJLFNBQVMsR0FBSyxFQUFFLENBQUM7O0FBRXJCLFNBQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUNqRSxRQUFJLElBQUksR0FBTSxFQUFFLENBQUM7QUFDakIsUUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3hCLFFBQUksS0FBSyxHQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsU0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRTtBQUM1QixhQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLFVBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7QUFDeEQsaUJBQVMsV0FBVyxDQUFFLEdBQUcsRUFBRztBQUMxQixpQkFBTyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7QUFDRCxZQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLFlBQUksVUFBVSxHQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUMsWUFBSSxJQUFJLEdBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsWUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQ3BCLGlCQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDeEMsK0JBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsaUJBQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQ3BDLGdCQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNkLHdCQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNyQztXQUNGLENBQUMsQ0FBQztTQUNKLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNuQixjQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDO1NBQ3pCLE1BQU07QUFDTCxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssRUFBRSxHQUFHLEVBQUU7QUFDcEMsZ0JBQUcsSUFBSSxLQUFLLEtBQUssRUFBRTtBQUNqQix3QkFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDbkM7V0FDRixDQUFDLENBQUM7U0FDSjtPQUNGLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxNQUFJLEVBQUUsQ0FBQzs7QUFFUCxXQUFTLHFCQUFxQixDQUFFLE9BQU8sRUFBRTtBQUN2QyxhQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztHQUM1QjtBQUNELFdBQVMsVUFBVSxDQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0FBQzFDLGFBQVMsRUFBRSxDQUFDO0FBQ1osV0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ2IsVUFBSSxFQUFFLElBQUk7QUFDVixVQUFJLEVBQUUsRUFBRTtLQUNULENBQUM7QUFDRixRQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLFFBQUksSUFBSSxHQUFLLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDaEMsUUFBSSxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLENBQUMsQ0FBQztLQUFDLENBQUMsQ0FBQztBQUMvRCxRQUFJLEdBQUcsR0FBRyw2Q0FBNkMsQ0FBQztBQUN4RCxTQUFLLENBQUMsT0FBTyxDQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQ3ZCLFVBQUksR0FBRyxHQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsVUFBSSxJQUFJLEdBQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLFVBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQixhQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztBQUNsQyxVQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQUUsaUJBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7T0FBRTtLQUNsRCxDQUFDLENBQUM7O0FBRUgsUUFBSSxDQUFDLFNBQVMsRUFBRTtBQUFFLFVBQUksRUFBRSxDQUFDO0tBQUU7R0FFNUI7QUFDRCxXQUFTLE9BQU8sR0FBSTs7QUFFbEIsV0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUU7QUFDaEMsVUFBSSxJQUFJLEdBQUcsMkNBQTJDLENBQUM7QUFDdkQsVUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFFO0FBQy9DLGFBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDekIsaUJBQVMsRUFBRyxHQUFHO0FBQ2YsZUFBTyxFQUFLLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDaEQsWUFBSSxFQUFRLENBQUM7T0FDZCxDQUFDLENBQUM7QUFDSCxlQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzVCLENBQUMsQ0FBQztBQUNILFNBQUssSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO0FBQzFCLE9BQUMsVUFBVSxJQUFJLEVBQUU7QUFDZixZQUFJLElBQUksR0FBRyw4QkFBOEIsR0FDdkMsOEJBQThCLElBQzdCLElBQUssS0FBSyxNQUFNLENBQUMsUUFBUSxHQUFJLFFBQVEsR0FBRyxVQUFVLENBQUEsR0FDbkQsTUFBTSxHQUFDLElBQUksR0FBQyxNQUFNLENBQUM7QUFDckIsWUFBSSxHQUFHLElBQUssRUFBRSxDQUFDLFNBQVMsR0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFFOzs7O0FBSWhELFdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxPQUFPLENBQUUsS0FBSyxFQUFFOztBQUVyRCxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLGNBQWMsQ0FBRSxHQUFHLEVBQUU7QUFDNUMsZUFBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUMxQixDQUFDLENBQUE7U0FDSCxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQ3pCLENBQUEsQ0FBRSxJQUFJLENBQUMsQ0FBQztLQUNWO0dBQ0Y7O0FBRUQsV0FBUyxJQUFJLEdBQUk7QUFDZixXQUFPLENBQUMsS0FBSyxDQUFDLFlBQVk7QUFDeEIsYUFBTyxFQUFFLENBQUM7QUFDVixTQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUzQixPQUFDLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7QUFDbEIsWUFBSSxFQUFFO1lBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQyxZQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTztBQUNqQyxVQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNwQyxVQUFFLENBQUMsR0FBRyxHQUFHLGdGQUFnRixDQUFDO0FBQzFGLFdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztPQUN0QyxDQUFBLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFFOztBQUV6QyxPQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUM7QUFDZixZQUFJLEVBQUU7WUFBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsS0FBSyxJQUFFLEVBQUUsQ0FBQztBQUMzRCxZQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRCxVQUFFLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFDLHlDQUF5QyxDQUFDO0FBQzFELFdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztBQUM1QyxTQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQzdDLENBQUEsQ0FBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLGFBQWEsQ0FBQyxDQUFFO0tBQ3JDLENBQUMsQ0FBQztHQUNKOztBQUVELE1BQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLFNBQU8sR0FBRyxDQUFDO0NBQ1o7Ozs7QUFJRCxNQUFNLENBQUMsT0FBTyxHQUFNLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0FDekpuRTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbGpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3h2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0Jztcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTID0gQ1VTVE9NIFNESyBbQ3VzdG9tIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdF1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IHdlYnBhZ2UgICAgID0gcmVxdWlyZSgnd2VicGFnZScpO1xuY29uc3QgZmFzdGRvbSAgICAgPSByZXF1aXJlKCdmYXN0ZG9tJyk7XG5jb25zdCBtaW5peGhyICAgICA9IHJlcXVpcmUoJ21pbml4aHInKTtcbi8vIGNvbnN0IG1hcmtlZCAgICAgID0gcmVxdWlyZSgnbWFya2VkJyk7XG4vLyBjb25zdCBqc29ubWF0dGVyICA9IHJlcXVpcmUoJ2pzb24tbWF0dGVyJyk7XG5jb25zdCBqbW0gICAgICAgICA9IHJlcXVpcmUoJ2pzb24tbWV0YS1tYXJrZWQnKTtcbmNvbnN0IG1hcmtkb3duYm94ID0gcmVxdWlyZSgnaG9sb24tbWFya2Rvd25ib3gnKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbiAgLy8gJHBhcmFtTmFtZSA9IHByb2Nlc3MuYXJndlsyXTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgTU9EVUxFIElOVEVSTkFMUyAmIEhFTFBFUlNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IGNvbmZpZyAgICAgID0gcmVxdWlyZSgnX2NvbmZpZycpKCk7XG5jb25zdCB0ZW1wbGF0ZSAgICA9IHJlcXVpcmUoJy4vaW5kZXgudGVtcGxhdGUuaHRtbCcpO1xubGV0IF9fICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmZ1bmN0aW9uIHdpemFyZGFtaWdvc2luc3RpdHV0ZSAoZG9tLCBkYXRhKSB7IC8vICdkYXRhJyBtYXliZSBhbHNvIHRvIHVzZSBmb3IgZXZlbnQgZGVsZWdhdGlvbiBwYXR0ZXJuXG4gIGNvbnN0IENPTVBPTkVOVCA9IChfXy5pbm5lckhUTUw9dGVtcGxhdGUsX18uY2hpbGROb2Rlc1swXSk7XG4gIGNvbnN0IF9fbG9nbyAgICA9IENPTVBPTkVOVC5xdWVyeVNlbGVjdG9yQWxsKCcud2l6YXJkYW1pZ29zX19sb2dvJylbMF07XG4gIGNvbnN0IF9fbWVudSAgICA9IENPTVBPTkVOVC5xdWVyeVNlbGVjdG9yQWxsKCcud2l6YXJkYW1pZ29zX19tZW51JylbMF07XG4gIGNvbnN0IF9fY29udGVudCA9IENPTVBPTkVOVC5xdWVyeVNlbGVjdG9yQWxsKCcud2l6YXJkYW1pZ29zX19jb250ZW50JylbMF07XG5cbiAgdmFyIFNFTUFQSE9SRSAgID0gbnVsbDtcbiAgdmFyIENPTlRFTlQgICAgID0gW107XG4gIHZhciBMQU5HVUFHRVMgICA9IHt9O1xuXG4gIG1pbml4aHIoeyB1cmw6IGNvbmZpZy5jb250ZW50U1JDIH0sIGZ1bmN0aW9uIChkYXRhLCByZXNwb25zZSwgeGhyKSB7XG4gICAgdmFyIHRlbXAgICAgPSB7fTtcbiAgICB2YXIgQ09OVEVOVCA9IHVuZGVmaW5lZDtcbiAgICB2YXIgYXJyYXkgICA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbWluaXhocih7IHVybDogaXRlbS51cmwgfSwgZnVuY3Rpb24gKGRhdGEsIHJlc3BvbnNlLCB4aHIpIHtcbiAgICAgICAgZnVuY3Rpb24gYjY0X3RvX3V0ZjgoIHN0ciApIHtcbiAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZSh3aW5kb3cuYXRvYiggc3RyICkpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2JqZWN0ICAgICAgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB2YXIganNvbm1hcmtlZCAgPSBiNjRfdG9fdXRmOChvYmplY3QuY29udGVudCk7XG4gICAgICAgIHZhciBuYW1lICAgICAgICA9IG9iamVjdC5uYW1lLnNwbGl0KCcuJylbMF07XG4gICAgICAgIGlmIChuYW1lID09PSAnaW5kZXgnKSB7XG4gICAgICAgICAgQ09OVEVOVCA9IGptbS5wYXJzZShqc29ubWFya2VkKS5DT05URU5UO1xuICAgICAgICAgIHByZXBhcmVBcnJheUNvbnRhaW5lcihDT05URU5UKTtcbiAgICAgICAgICBDT05URU5ULmZvckVhY2goZnVuY3Rpb24gKHRpdGxlLCBpZHgpIHtcbiAgICAgICAgICAgIGlmKHRlbXBbdGl0bGVdKSB7XG4gICAgICAgICAgICAgIGFkZENvbnRlbnQoaWR4LCB0aXRsZSwgdGVtcFt0aXRsZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCFDT05URU5UKSB7XG4gICAgICAgICAgdGVtcFtuYW1lXSA9IGpzb25tYXJrZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgQ09OVEVOVC5mb3JFYWNoKGZ1bmN0aW9uICh0aXRsZSwgaWR4KSB7XG4gICAgICAgICAgICBpZihuYW1lID09PSB0aXRsZSkge1xuICAgICAgICAgICAgICBhZGRDb250ZW50KGlkeCwgbmFtZSwganNvbm1hcmtlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBJTklUKCk7XG5cbiAgZnVuY3Rpb24gcHJlcGFyZUFycmF5Q29udGFpbmVyIChDT05URU5UKSB7XG4gICAgU0VNQVBIT1JFID0gQ09OVEVOVC5sZW5ndGg7XG4gIH1cbiAgZnVuY3Rpb24gYWRkQ29udGVudCAoaWR4LCBuYW1lLCBqc29ubWFya2VkKSB7XG4gICAgU0VNQVBIT1JFLS07XG4gICAgQ09OVEVOVFtpZHhdID0ge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGxhbmc6IHt9XG4gICAgfTtcbiAgICB2YXIgb2JqZWN0ID0gam1tLnBhcnNlKGpzb25tYXJrZWQpO1xuICAgIHZhciBodG1sICAgPSBvYmplY3QuX19jb250ZW50X187XG4gICAgdmFyIGxhbmdzICA9IGh0bWwuc3BsaXQoJzxocj4nKS5maWx0ZXIoZnVuY3Rpb24oeCl7cmV0dXJuIHg7fSk7XG4gICAgdmFyIHJlZyA9IC88cD48YSBocmVmPVwiQChbXFxzXFxTXSopXCI+PFxcL2E+PFxcL3A+KFtcXHNcXFNdKikvO1xuICAgIGxhbmdzLmZvckVhY2goZnVuY3Rpb24oeCl7XG4gICAgICB2YXIgdG1wICAgICA9IHgubWF0Y2gocmVnKTtcbiAgICAgIHZhciBsYW5nICAgID0gdG1wWzFdO1xuICAgICAgdmFyIGNvbnRlbnQgPSB0bXBbMl07XG4gICAgICBDT05URU5UW2lkeF0ubGFuZ1tsYW5nXSA9IGNvbnRlbnQ7XG4gICAgICBpZiAoIUxBTkdVQUdFU1tsYW5nXSkgeyBMQU5HVUFHRVNbbGFuZ10gPSB0cnVlOyB9XG4gICAgfSk7XG5cbiAgICBpZiAoIVNFTUFQSE9SRSkgeyBJTklUKCk7IH1cblxuICB9XG4gIGZ1bmN0aW9uIHByZXBhcmUgKCkge1xuICAgIC8vIEBUT0RPOiB1c2UgZmFzdGRvbVxuICAgIENPTlRFTlQuZm9yRWFjaChmdW5jdGlvbiAoeCwgaWR4KSB7XG4gICAgICB2YXIgaXRlbSA9ICc8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zX19pbmZvYm94XCI+PC9kaXY+JztcbiAgICAgIHZhciB0bXAgPSAoX18uaW5uZXJIVE1MPWl0ZW0sX18uY2hpbGROb2Rlc1swXSk7XG4gICAgICBDT05URU5UW2lkeF0gPSBtYXJrZG93bmJveCh7XG4gICAgICAgIGNvbnRhaW5lciA6IHRtcCxcbiAgICAgICAgb3B0aW9ucyAgIDogeyBkZWZhdWx0TGFuZ3VhZ2U6IGNvbmZpZy5sYW5ndWFnZSB9LFxuICAgICAgICBkYXRhICAgICAgOiB4XG4gICAgICB9KTtcbiAgICAgIF9fY29udGVudC5hcHBlbmRDaGlsZCh0bXApO1xuICAgIH0pO1xuICAgIGZvciAodmFyIGxhbmcgaW4gTEFOR1VBR0VTKSB7XG4gICAgICAoZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAnPGEgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2xhbmcnICtcbiAgICAgICAgICAnICB3aXphcmRhbWlnb3NfX2xhbmctLVNUQVRFXycgK1xuICAgICAgICAgICgobGFuZyA9PT0gY29uZmlnLmxhbmd1YWdlKSA/ICdhY3RpdmUnIDogJ2luYWN0aXZlJykgK1xuICAgICAgICAgICcgIFwiPicrbGFuZysnPC9hPic7XG4gICAgICAgIHZhciB0bXAgID0gKF9fLmlubmVySFRNTD1pdGVtLF9fLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICAvLyBAVE9ETzogc2hvdWxkIHVzZSBkZWxlZ2F0b3IgcGF0dGVybiBpbnN0ZWFkXG4gICAgICAgIC8qKioqKioqKiBXSVJFIFVQICoqKioqKioqL1xuICAgICAgICAvLyBAVE9ETzogc3dpdGNoIGxhbmd1YWdlIGJ1dHRvbnNcbiAgICAgICAgdG1wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gb25jbGljayAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBldmVudHN0b3AoZXZlbnQpO1xuICAgICAgICAgIENPTlRFTlQuZm9yRWFjaChmdW5jdGlvbiBzd2l0Y2hMYW5ndWFnZSAoYXBpKSB7XG4gICAgICAgICAgICBhcGkuY2hhbmdlTGFuZ3VhZ2UobGFuZyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIF9fbWVudS5hcHBlbmRDaGlsZCh0bXApO1xuICAgICAgfSkobGFuZyk7XG4gICAgfVxuICB9XG4gIC8qKioqKiogSU5JVElBTElaRSAqKioqKioqL1xuICBmdW5jdGlvbiBJTklUICgpIHtcbiAgICBmYXN0ZG9tLndyaXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHByZXBhcmUoKTtcbiAgICAgIGRvbS5hcHBlbmRDaGlsZChDT01QT05FTlQpO1xuICAgICAgLy8gRkFDRUJPT0tcbiAgICAgIChmdW5jdGlvbihkLCBzLCBpZCkge1xuICAgICAgICB2YXIganMsIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07XG4gICAgICAgIGlmIChkLmdldEVsZW1lbnRCeUlkKGlkKSkgcmV0dXJuO1xuICAgICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTsganMuaWQgPSBpZDtcbiAgICAgICAganMuc3JjID0gXCIvL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX0dCL3Nkay5qcyN4ZmJtbD0xJnZlcnNpb249djIuMyZhcHBJZD0zMjIyNDk4ODEyNDAyNjJcIjtcbiAgICAgICAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLCBmanMpO1xuICAgICAgfShkb2N1bWVudCwgJ3NjcmlwdCcsICdmYWNlYm9vay1qc3NkaycpKTtcbiAgICAgIC8vIFRXSVRURVJcbiAgICAgIChmdW5jdGlvbihkLHMsaWQpe1xuICAgICAgICB2YXIganMsZmpzPWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF0sdD13aW5kb3cudHd0dHJ8fHt9O1xuICAgICAgICBpZihkLmdldEVsZW1lbnRCeUlkKGlkKSlyZXR1cm47anM9ZC5jcmVhdGVFbGVtZW50KHMpO1xuICAgICAgICBqcy5pZD1pZDtqcy5zcmM9XCJodHRwczovL3BsYXRmb3JtLnR3aXR0ZXIuY29tL3dpZGdldHMuanNcIjtcbiAgICAgICAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLGZqcyk7dC5fZT1bXTtcbiAgICAgICAgdC5yZWFkeT1mdW5jdGlvbihmKXt0Ll9lLnB1c2goZik7fTtyZXR1cm4gdDtcbiAgICAgIH0oZG9jdW1lbnQsXCJzY3JpcHRcIixcInR3aXR0ZXItd2pzXCIpKTtcbiAgICB9KTtcbiAgfVxuICAvKioqKioqKiogUkVUVVJOICoqKioqKioqKi9cbiAgdmFyIEFQSSA9IHt9OyAvLyBzaG91bGQgYmUgYW4gZXZlbnQgZW1pdHRlciB0b29cbiAgcmV0dXJuIEFQSTtcbn1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgICA9IHdpemFyZGFtaWdvc2luc3RpdHV0ZSh3ZWJwYWdlKGNvbmZpZyksIGNvbmZpZyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zXCI+XFxuICA8aW1nIGNsYXNzPVwid2l6YXJkYW1pZ29zX19sb2dvXCIgc3JjPVwiL0JVTkRMRS9hc3NldHMvMDYxOTE1ZDAxMDMxMWQ2ZS5zdmdcIj5cXG5cXG4gIDxkaXYgaWQ9XCJmYi1yb290XCI+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZmItc2hhcmUtYnV0dG9uXCJcXG4gICAgZGF0YS1ocmVmPVwiaHR0cDovL3dpemFyZC5hbWlnb3MuaW5zdGl0dXRlL1wiXFxuICAgIGRhdGEtbGF5b3V0PVwiYnV0dG9uXCI+XFxuICA8L2Rpdj48YnI+XFxuICA8YSBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIiBjbGFzcz1cInR3aXR0ZXItc2hhcmUtYnV0dG9uXCJcXG4gICAgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vc2hhcmVcIlxcbiAgICBkYXRhLXVybD1cImh0dHA6Ly9iaXQubHkvd2l6YXJkYW1pZ29zaW5zdGl0dXRlXCJcXG4gICAgZGF0YS1jb3VudHVybD1cImh0dHA6Ly93aXphcmQuYW1pZ29zLmluc3RpdHV0ZVwiXFxuICAgIGRhdGEtdGV4dD1cIkNvZGluZyBmb3Iga2lkcyBpbiBiZXJsaW4gOi0pXCJcXG4gICAgZGF0YS1oYXNodGFncz1cIiNiZXJsaW4gI3Byb2dyYW1taW5nICNzY2hvb2xcIlxcbiAgICBkYXRhLXJlbGF0ZWQ9XCJzZXJhcGF0aDpXaXphcmQgQW1pZ29zIE9yZ2FuaXplclwiXFxuICAgIGRhdGEtbGFuZz1cImRlXCJcXG4gICAgZGF0YS12aWE9XCJ3aXphcmRhbWlnb3NcIlxcbiAgICBkYXRhLXNpemU9XCJub3JtYWxcIlxcbiAgICBkYXRhLWNvdW50PVwibm9uZVwiPlxcbiAgVHdlZXQgdXMgOi0pXFxuICA8L2E+XFxuICA8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zX19tZW51XCI+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zX19jb250ZW50XCI+PC9kaXY+XFxuPC9kaXY+XFxuJzsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIHBrZyAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJyk7XG4vLyB2YXIgcGFyYW1zICAgICAgPSByZXF1aXJlKCcnKSB0cnkgbG9hZCBmaWxlcyBpbiBpZnJhbWUgYW5kIHNjcmFwZSBpdCB0byBjaXJjdW12ZW50IENPUlNcbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2lmcmFtZS1hcGlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgTU9EVUxFIElOVEVSTkFMUyAmIEhFTFBFUlNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfY29uZmlnICAgICA9IHtcbiAgdGl0bGUgICAgICAgOiAnV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUnLFxuICBkZXNjcmlwdGlvbiA6IHBrZy5kZXNjcmlwdGlvbixcbiAgdmVyc2lvbiAgICAgOiBwa2cudmVyc2lvbixcbiAga2V5d29yZHMgICAgOiBwa2cua2V5d29yZHMuam9pbignLCAnKSxcbiAgYXV0aG9yICAgICAgOiBwa2cuYXV0aG9yLm5hbWUsXG4gIHdlYnNpdGUgICAgIDogcGtnLmhvbWVwYWdlLFxuICBsYW5ndWFnZSAgICA6ICdnZXJtYW4nLFxuICBnYSAgICAgICAgICA6ICdVQS02MjMxMDgwNy0xJyxcbiAgc3R5bGUgICAgICAgOiBwa2cuYXRvbWlmeS5jc3Mub3V0cHV0LFxuICAvLyBjb250ZW50U1JDICA6ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL3dpemFyZGFtaWdvc2luc3RpdHV0ZS9vcmdhbml6YXRpb24vY29udGVudHMvQ09OVEVOVD9yZWY9bWFzdGVyJ1xuICBjb250ZW50U1JDICA6ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL3NlcmFwYXRoL29yZ2FuaXphdGlvbi9jb250ZW50cy9DT05URU5UP3JlZj1tYXN0ZXInXG59O1xuZnVuY3Rpb24gY29uZmlnIChrZXkpIHtcbiAgcmV0dXJuIGtleSA/IF9jb25maWdba2V5XSA6IF9jb25maWc7XG59XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYUE9SVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgID0gY29uZmlnO1xuIixudWxsLCJleHBvcnRzLmVuZGlhbm5lc3MgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnTEUnIH07XG5cbmV4cG9ydHMuaG9zdG5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lXG4gICAgfVxuICAgIGVsc2UgcmV0dXJuICcnO1xufTtcblxuZXhwb3J0cy5sb2FkYXZnID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW10gfTtcblxuZXhwb3J0cy51cHRpbWUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAwIH07XG5cbmV4cG9ydHMuZnJlZW1lbSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbn07XG5cbmV4cG9ydHMudG90YWxtZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE51bWJlci5NQVhfVkFMVUU7XG59O1xuXG5leHBvcnRzLmNwdXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9O1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnQnJvd3NlcicgfTtcblxuZXhwb3J0cy5yZWxlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmFwcFZlcnNpb247XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG5cbmV4cG9ydHMubmV0d29ya0ludGVyZmFjZXNcbj0gZXhwb3J0cy5nZXROZXR3b3JrSW50ZXJmYWNlc1xuPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7fSB9O1xuXG5leHBvcnRzLmFyY2ggPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnamF2YXNjcmlwdCcgfTtcblxuZXhwb3J0cy5wbGF0Zm9ybSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdicm93c2VyJyB9O1xuXG5leHBvcnRzLnRtcGRpciA9IGV4cG9ydHMudG1wRGlyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnL3RtcCc7XG59O1xuXG5leHBvcnRzLkVPTCA9ICdcXG4nO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gU3BsaXQgYSBmaWxlbmFtZSBpbnRvIFtyb290LCBkaXIsIGJhc2VuYW1lLCBleHRdLCB1bml4IHZlcnNpb25cbi8vICdyb290JyBpcyBqdXN0IGEgc2xhc2gsIG9yIG5vdGhpbmcuXG52YXIgc3BsaXRQYXRoUmUgPVxuICAgIC9eKFxcLz98KShbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcL10rP3wpKFxcLlteLlxcL10qfCkpKD86W1xcL10qKSQvO1xudmFyIHNwbGl0UGF0aCA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gIHJldHVybiBzcGxpdFBhdGhSZS5leGVjKGZpbGVuYW1lKS5zbGljZSgxKTtcbn07XG5cbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogcHJvY2Vzcy5jd2QoKTtcblxuICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfSBlbHNlIGlmICghcGF0aCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbiAgfVxuXG4gIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhcmVzb2x2ZWRBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIHJldHVybiAoKHJlc29sdmVkQWJzb2x1dGUgPyAnLycgOiAnJykgKyByZXNvbHZlZFBhdGgpIHx8ICcuJztcbn07XG5cbi8vIHBhdGgubm9ybWFsaXplKHBhdGgpXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCksXG4gICAgICB0cmFpbGluZ1NsYXNoID0gc3Vic3RyKHBhdGgsIC0xKSA9PT0gJy8nO1xuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICBwYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHBhdGggPSAnLic7XG4gIH1cbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xuICAgIHBhdGggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmpvaW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocywgZnVuY3Rpb24ocCwgaW5kZXgpIHtcbiAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5qb2luIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSkuam9pbignLycpKTtcbn07XG5cblxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVsYXRpdmUgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuICBmcm9tID0gZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTtcbiAgdG8gPSBleHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtcblxuICBmdW5jdGlvbiB0cmltKGFycikge1xuICAgIHZhciBzdGFydCA9IDA7XG4gICAgZm9yICg7IHN0YXJ0IDwgYXJyLmxlbmd0aDsgc3RhcnQrKykge1xuICAgICAgaWYgKGFycltzdGFydF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW5kID0gYXJyLmxlbmd0aCAtIDE7XG4gICAgZm9yICg7IGVuZCA+PSAwOyBlbmQtLSkge1xuICAgICAgaWYgKGFycltlbmRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gW107XG4gICAgcmV0dXJuIGFyci5zbGljZShzdGFydCwgZW5kIC0gc3RhcnQgKyAxKTtcbiAgfVxuXG4gIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSk7XG4gIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKTtcblxuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCwgdG9QYXJ0cy5sZW5ndGgpO1xuICB2YXIgc2FtZVBhcnRzTGVuZ3RoID0gbGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZyb21QYXJ0c1tpXSAhPT0gdG9QYXJ0c1tpXSkge1xuICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvdXRwdXRQYXJ0cyA9IFtdO1xuICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0UGFydHMucHVzaCgnLi4nKTtcbiAgfVxuXG4gIG91dHB1dFBhcnRzID0gb3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7XG5cbiAgcmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oJy8nKTtcbn07XG5cbmV4cG9ydHMuc2VwID0gJy8nO1xuZXhwb3J0cy5kZWxpbWl0ZXIgPSAnOic7XG5cbmV4cG9ydHMuZGlybmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIHJlc3VsdCA9IHNwbGl0UGF0aChwYXRoKSxcbiAgICAgIHJvb3QgPSByZXN1bHRbMF0sXG4gICAgICBkaXIgPSByZXN1bHRbMV07XG5cbiAgaWYgKCFyb290ICYmICFkaXIpIHtcbiAgICAvLyBObyBkaXJuYW1lIHdoYXRzb2V2ZXJcbiAgICByZXR1cm4gJy4nO1xuICB9XG5cbiAgaWYgKGRpcikge1xuICAgIC8vIEl0IGhhcyBhIGRpcm5hbWUsIHN0cmlwIHRyYWlsaW5nIHNsYXNoXG4gICAgZGlyID0gZGlyLnN1YnN0cigwLCBkaXIubGVuZ3RoIC0gMSk7XG4gIH1cblxuICByZXR1cm4gcm9vdCArIGRpcjtcbn07XG5cblxuZXhwb3J0cy5iYXNlbmFtZSA9IGZ1bmN0aW9uKHBhdGgsIGV4dCkge1xuICB2YXIgZiA9IHNwbGl0UGF0aChwYXRoKVsyXTtcbiAgLy8gVE9ETzogbWFrZSB0aGlzIGNvbXBhcmlzb24gY2FzZS1pbnNlbnNpdGl2ZSBvbiB3aW5kb3dzP1xuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBmO1xufTtcblxuXG5leHBvcnRzLmV4dG5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBzcGxpdFBhdGgocGF0aClbM107XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XG4gICAgaWYgKHhzLmZpbHRlcikgcmV0dXJuIHhzLmZpbHRlcihmKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZih4c1tpXSwgaSwgeHMpKSByZXMucHVzaCh4c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcbnZhciBzdWJzdHIgPSAnYWInLnN1YnN0cigtMSkgPT09ICdiJ1xuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XG4gICAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gc3RyLmxlbmd0aCArIHN0YXJ0O1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcbiAgICB9XG47XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5NdXRhdGlvbk9ic2VydmVyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcjtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICB2YXIgcXVldWUgPSBbXTtcblxuICAgIGlmIChjYW5NdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICAgIHZhciBoaWRkZW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVldWVMaXN0ID0gcXVldWUuc2xpY2UoKTtcbiAgICAgICAgICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBxdWV1ZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoaGlkZGVuRGl2LCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGhpZGRlbkRpdi5zZXRBdHRyaWJ1dGUoJ3llcycsICdubycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwiLyoqXG4gKiBGYXN0RG9tXG4gKlxuICogRWxpbWluYXRlcyBsYXlvdXQgdGhyYXNoaW5nXG4gKiBieSBiYXRjaGluZyBET00gcmVhZC93cml0ZVxuICogaW50ZXJhY3Rpb25zLlxuICpcbiAqIEBhdXRob3IgV2lsc29uIFBhZ2UgPHdpbHNvbnBhZ2VAbWUuY29tPlxuICovXG5cbjsoZnVuY3Rpb24oZmFzdGRvbSl7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE5vcm1hbGl6ZSByQUZcbiAgdmFyIHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IGZ1bmN0aW9uKGNiKSB7IHJldHVybiB3aW5kb3cuc2V0VGltZW91dChjYiwgMTAwMCAvIDYwKTsgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZyZXNoXG4gICAqIEZhc3REb20gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gRmFzdERvbSgpIHtcbiAgICB0aGlzLmZyYW1lcyA9IFtdO1xuICAgIHRoaXMubGFzdElkID0gMDtcblxuICAgIC8vIFBsYWNpbmcgdGhlIHJBRiBtZXRob2RcbiAgICAvLyBvbiB0aGUgaW5zdGFuY2UgYWxsb3dzXG4gICAgLy8gdXMgdG8gcmVwbGFjZSBpdCB3aXRoXG4gICAgLy8gYSBzdHViIGZvciB0ZXN0aW5nLlxuICAgIHRoaXMucmFmID0gcmFmO1xuXG4gICAgdGhpcy5iYXRjaCA9IHtcbiAgICAgIGhhc2g6IHt9LFxuICAgICAgcmVhZDogW10sXG4gICAgICB3cml0ZTogW10sXG4gICAgICBtb2RlOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgam9iIHRvIHRoZVxuICAgKiByZWFkIGJhdGNoIGFuZCBzY2hlZHVsZXNcbiAgICogYSBuZXcgZnJhbWUgaWYgbmVlZCBiZS5cbiAgICpcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbihmbiwgY3R4KSB7XG4gICAgdmFyIGpvYiA9IHRoaXMuYWRkKCdyZWFkJywgZm4sIGN0eCk7XG4gICAgdmFyIGlkID0gam9iLmlkO1xuXG4gICAgLy8gQWRkIHRoaXMgam9iIHRvIHRoZSByZWFkIHF1ZXVlXG4gICAgdGhpcy5iYXRjaC5yZWFkLnB1c2goam9iLmlkKTtcblxuICAgIC8vIFdlIHNob3VsZCAqbm90KiBzY2hlZHVsZSBhIG5ldyBmcmFtZSBpZjpcbiAgICAvLyAxLiBXZSdyZSAncmVhZGluZydcbiAgICAvLyAyLiBBIGZyYW1lIGlzIGFscmVhZHkgc2NoZWR1bGVkXG4gICAgdmFyIGRvZXNudE5lZWRGcmFtZSA9IHRoaXMuYmF0Y2gubW9kZSA9PT0gJ3JlYWRpbmcnXG4gICAgICB8fCB0aGlzLmJhdGNoLnNjaGVkdWxlZDtcblxuICAgIC8vIElmIGEgZnJhbWUgaXNuJ3QgbmVlZGVkLCByZXR1cm5cbiAgICBpZiAoZG9lc250TmVlZEZyYW1lKSByZXR1cm4gaWQ7XG5cbiAgICAvLyBTY2hlZHVsZSBhIG5ld1xuICAgIC8vIGZyYW1lLCB0aGVuIHJldHVyblxuICAgIHRoaXMuc2NoZWR1bGVCYXRjaCgpO1xuICAgIHJldHVybiBpZDtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIGpvYiB0byB0aGVcbiAgICogd3JpdGUgYmF0Y2ggYW5kIHNjaGVkdWxlc1xuICAgKiBhIG5ldyBmcmFtZSBpZiBuZWVkIGJlLlxuICAgKlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihmbiwgY3R4KSB7XG4gICAgdmFyIGpvYiA9IHRoaXMuYWRkKCd3cml0ZScsIGZuLCBjdHgpO1xuICAgIHZhciBtb2RlID0gdGhpcy5iYXRjaC5tb2RlO1xuICAgIHZhciBpZCA9IGpvYi5pZDtcblxuICAgIC8vIFB1c2ggdGhlIGpvYiBpZCBpbnRvIHRoZSBxdWV1ZVxuICAgIHRoaXMuYmF0Y2gud3JpdGUucHVzaChqb2IuaWQpO1xuXG4gICAgLy8gV2Ugc2hvdWxkICpub3QqIHNjaGVkdWxlIGEgbmV3IGZyYW1lIGlmOlxuICAgIC8vIDEuIFdlIGFyZSAnd3JpdGluZydcbiAgICAvLyAyLiBXZSBhcmUgJ3JlYWRpbmcnXG4gICAgLy8gMy4gQSBmcmFtZSBpcyBhbHJlYWR5IHNjaGVkdWxlZC5cbiAgICB2YXIgZG9lc250TmVlZEZyYW1lID0gbW9kZSA9PT0gJ3dyaXRpbmcnXG4gICAgICB8fCBtb2RlID09PSAncmVhZGluZydcbiAgICAgIHx8IHRoaXMuYmF0Y2guc2NoZWR1bGVkO1xuXG4gICAgLy8gSWYgYSBmcmFtZSBpc24ndCBuZWVkZWQsIHJldHVyblxuICAgIGlmIChkb2VzbnROZWVkRnJhbWUpIHJldHVybiBpZDtcblxuICAgIC8vIFNjaGVkdWxlIGEgbmV3XG4gICAgLy8gZnJhbWUsIHRoZW4gcmV0dXJuXG4gICAgdGhpcy5zY2hlZHVsZUJhdGNoKCk7XG4gICAgcmV0dXJuIGlkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWZlcnMgdGhlIGdpdmVuIGpvYlxuICAgKiBieSB0aGUgbnVtYmVyIG9mIGZyYW1lc1xuICAgKiBzcGVjaWZpZWQuXG4gICAqXG4gICAqIElmIG5vIGZyYW1lcyBhcmUgZ2l2ZW5cbiAgICogdGhlbiB0aGUgam9iIGlzIHJ1biBpblxuICAgKiB0aGUgbmV4dCBmcmVlIGZyYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgZnJhbWVcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLmRlZmVyID0gZnVuY3Rpb24oZnJhbWUsIGZuLCBjdHgpIHtcblxuICAgIC8vIEFjY2VwdHMgdHdvIGFyZ3VtZW50c1xuICAgIGlmICh0eXBlb2YgZnJhbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN0eCA9IGZuO1xuICAgICAgZm4gPSBmcmFtZTtcbiAgICAgIGZyYW1lID0gMTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGluZGV4ID0gZnJhbWUgLSAxO1xuXG4gICAgcmV0dXJuIHRoaXMuc2NoZWR1bGUoaW5kZXgsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5ydW4oe1xuICAgICAgICBmbjogZm4sXG4gICAgICAgIGN0eDogY3R4XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXJzIGEgc2NoZWR1bGVkICdyZWFkJyxcbiAgICogJ3dyaXRlJyBvciAnZGVmZXInIGpvYi5cbiAgICpcbiAgICogQHBhcmFtICB7TnVtYmVyfFN0cmluZ30gaWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbihpZCkge1xuXG4gICAgLy8gRGVmZXIgam9icyBhcmUgY2xlYXJlZCBkaWZmZXJlbnRseVxuICAgIGlmICh0eXBlb2YgaWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLmNsZWFyRnJhbWUoaWQpO1xuICAgIH1cblxuICAgIC8vIEFsbG93IGlkcyB0byBiZSBwYXNzZWQgYXMgc3RyaW5nc1xuICAgIGlkID0gTnVtYmVyKGlkKTtcblxuICAgIHZhciBqb2IgPSB0aGlzLmJhdGNoLmhhc2hbaWRdO1xuICAgIGlmICgham9iKSByZXR1cm47XG5cbiAgICB2YXIgbGlzdCA9IHRoaXMuYmF0Y2hbam9iLnR5cGVdO1xuICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZihpZCk7XG5cbiAgICAvLyBDbGVhciByZWZlcmVuY2VzXG4gICAgZGVsZXRlIHRoaXMuYmF0Y2guaGFzaFtpZF07XG4gICAgaWYgKH5pbmRleCkgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYSBzY2hlZHVsZWQgZnJhbWUuXG4gICAqXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmcmFtZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuY2xlYXJGcmFtZSA9IGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5mcmFtZXMuaW5kZXhPZihmcmFtZSk7XG4gICAgaWYgKH5pbmRleCkgdGhpcy5mcmFtZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfTtcblxuICAvKipcbiAgICogU2NoZWR1bGVzIGEgbmV3IHJlYWQvd3JpdGVcbiAgICogYmF0Y2ggaWYgb25lIGlzbid0IHBlbmRpbmcuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5zY2hlZHVsZUJhdGNoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gU2NoZWR1bGUgYmF0Y2ggZm9yIG5leHQgZnJhbWVcbiAgICB0aGlzLnNjaGVkdWxlKDAsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5iYXRjaC5zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgIHNlbGYucnVuQmF0Y2goKTtcbiAgICB9KTtcblxuICAgIC8vIFNldCBmbGFnIHRvIGluZGljYXRlXG4gICAgLy8gYSBmcmFtZSBoYXMgYmVlbiBzY2hlZHVsZWRcbiAgICB0aGlzLmJhdGNoLnNjaGVkdWxlZCA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHVuaXF1ZVxuICAgKiBpZCBmb3IgYSBqb2IuXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnVuaXF1ZUlkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICsrdGhpcy5sYXN0SWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIGVhY2ggam9iIGluXG4gICAqIHRoZSBsaXN0IHBhc3NlZC5cbiAgICpcbiAgICogSWYgYSBjb250ZXh0IGhhcyBiZWVuXG4gICAqIHN0b3JlZCBvbiB0aGUgZnVuY3Rpb25cbiAgICogdGhlbiBpdCBpcyB1c2VkLCBlbHNlIHRoZVxuICAgKiBjdXJyZW50IGB0aGlzYCBpcyB1c2VkLlxuICAgKlxuICAgKiBAcGFyYW0gIHtBcnJheX0gbGlzdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbihsaXN0KSB7XG4gICAgdmFyIGlkO1xuXG4gICAgd2hpbGUgKGlkID0gbGlzdC5zaGlmdCgpKSB7XG4gICAgICB0aGlzLnJ1bih0aGlzLmJhdGNoLmhhc2hbaWRdKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJ1bnMgYW55ICdyZWFkJyBqb2JzIGZvbGxvd2VkXG4gICAqIGJ5IGFueSAnd3JpdGUnIGpvYnMuXG4gICAqXG4gICAqIFdlIHJ1biB0aGlzIGluc2lkZSBhIHRyeSBjYXRjaFxuICAgKiBzbyB0aGF0IGlmIGFueSBqb2JzIGVycm9yLCB3ZVxuICAgKiBhcmUgYWJsZSB0byByZWNvdmVyIGFuZCBjb250aW51ZVxuICAgKiB0byBmbHVzaCB0aGUgYmF0Y2ggdW50aWwgaXQncyBlbXB0eS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnJ1bkJhdGNoID0gZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcblxuICAgICAgLy8gU2V0IHRoZSBtb2RlIHRvICdyZWFkaW5nJyxcbiAgICAgIC8vIHRoZW4gZW1wdHkgYWxsIHJlYWQgam9ic1xuICAgICAgdGhpcy5iYXRjaC5tb2RlID0gJ3JlYWRpbmcnO1xuICAgICAgdGhpcy5mbHVzaCh0aGlzLmJhdGNoLnJlYWQpO1xuXG4gICAgICAvLyBTZXQgdGhlIG1vZGUgdG8gJ3dyaXRpbmcnXG4gICAgICAvLyB0aGVuIGVtcHR5IGFsbCB3cml0ZSBqb2JzXG4gICAgICB0aGlzLmJhdGNoLm1vZGUgPSAnd3JpdGluZyc7XG4gICAgICB0aGlzLmZsdXNoKHRoaXMuYmF0Y2gud3JpdGUpO1xuXG4gICAgICB0aGlzLmJhdGNoLm1vZGUgPSBudWxsO1xuXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5ydW5CYXRjaCgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgam9iIHRvXG4gICAqIHRoZSBnaXZlbiBiYXRjaC5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gICBsaXN0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIGN0eFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBpZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24odHlwZSwgZm4sIGN0eCkge1xuICAgIHZhciBpZCA9IHRoaXMudW5pcXVlSWQoKTtcbiAgICByZXR1cm4gdGhpcy5iYXRjaC5oYXNoW2lkXSA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGZuOiBmbixcbiAgICAgIGN0eDogY3R4LFxuICAgICAgdHlwZTogdHlwZVxuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIFJ1bnMgYSBnaXZlbiBqb2IuXG4gICAqXG4gICAqIEFwcGxpY2F0aW9ucyB1c2luZyBGYXN0RG9tXG4gICAqIGhhdmUgdGhlIG9wdGlvbnMgb2Ygc2V0dGluZ1xuICAgKiBgZmFzdGRvbS5vbkVycm9yYC5cbiAgICpcbiAgICogVGhpcyB3aWxsIGNhdGNoIGFueVxuICAgKiBlcnJvcnMgdGhhdCBtYXkgdGhyb3dcbiAgICogaW5zaWRlIGNhbGxiYWNrcywgd2hpY2hcbiAgICogaXMgdXNlZnVsIGFzIG9mdGVuIERPTVxuICAgKiBub2RlcyBoYXZlIGJlZW4gcmVtb3ZlZFxuICAgKiBzaW5jZSBhIGpvYiB3YXMgc2NoZWR1bGVkLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKlxuICAgKiAgIGZhc3Rkb20ub25FcnJvciA9IGZ1bmN0aW9uKGUpIHtcbiAgICogICAgIC8vIFJ1bnMgd2hlbiBqb2JzIGVycm9yXG4gICAqICAgfTtcbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSBqb2JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKGpvYil7XG4gICAgdmFyIGN0eCA9IGpvYi5jdHggfHwgdGhpcztcbiAgICB2YXIgZm4gPSBqb2IuZm47XG5cbiAgICAvLyBDbGVhciByZWZlcmVuY2UgdG8gdGhlIGpvYlxuICAgIGRlbGV0ZSB0aGlzLmJhdGNoLmhhc2hbam9iLmlkXTtcblxuICAgIC8vIElmIG5vIGBvbkVycm9yYCBoYW5kbGVyXG4gICAgLy8gaGFzIGJlZW4gcmVnaXN0ZXJlZCwganVzdFxuICAgIC8vIHJ1biB0aGUgam9iIG5vcm1hbGx5LlxuICAgIGlmICghdGhpcy5vbkVycm9yKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbChjdHgpO1xuICAgIH1cblxuICAgIC8vIElmIGFuIGBvbkVycm9yYCBoYW5kbGVyXG4gICAgLy8gaGFzIGJlZW4gcmVnaXN0ZXJlZCwgY2F0Y2hcbiAgICAvLyBlcnJvcnMgdGhhdCB0aHJvdyBpbnNpZGVcbiAgICAvLyBjYWxsYmFja3MsIGFuZCBydW4gdGhlXG4gICAgLy8gaGFuZGxlciBpbnN0ZWFkLlxuICAgIHRyeSB7IGZuLmNhbGwoY3R4KTsgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5vbkVycm9yKGUpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhcnRzIGEgckFGIGxvb3BcbiAgICogdG8gZW1wdHkgdGhlIGZyYW1lIHF1ZXVlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcmFmID0gdGhpcy5yYWY7XG5cbiAgICAvLyBEb24ndCBzdGFydCBtb3JlIHRoYW4gb25lIGxvb3BcbiAgICBpZiAodGhpcy5sb29waW5nKSByZXR1cm47XG5cbiAgICByYWYoZnVuY3Rpb24gZnJhbWUoKSB7XG4gICAgICB2YXIgZm4gPSBzZWxmLmZyYW1lcy5zaGlmdCgpO1xuXG4gICAgICAvLyBJZiBubyBtb3JlIGZyYW1lcyxcbiAgICAgIC8vIHN0b3AgbG9vcGluZ1xuICAgICAgaWYgKCFzZWxmLmZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgc2VsZi5sb29waW5nID0gZmFsc2U7XG5cbiAgICAgIC8vIE90aGVyd2lzZSwgc2NoZWR1bGUgdGhlXG4gICAgICAvLyBuZXh0IGZyYW1lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYWYoZnJhbWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBSdW4gdGhlIGZyYW1lLiAgTm90ZSB0aGF0XG4gICAgICAvLyB0aGlzIG1heSB0aHJvdyBhbiBlcnJvclxuICAgICAgLy8gaW4gdXNlciBjb2RlLCBidXQgYWxsXG4gICAgICAvLyBmYXN0ZG9tIHRhc2tzIGFyZSBkZWFsdFxuICAgICAgLy8gd2l0aCBhbHJlYWR5IHNvIHRoZSBjb2RlXG4gICAgICAvLyB3aWxsIGNvbnRpbnVlIHRvIGl0ZXJhdGVcbiAgICAgIGlmIChmbikgZm4oKTtcbiAgICB9KTtcblxuICAgIHRoaXMubG9vcGluZyA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBmdW5jdGlvbiB0b1xuICAgKiBhIHNwZWNpZmllZCBpbmRleFxuICAgKiBvZiB0aGUgZnJhbWUgcXVldWUuXG4gICAqXG4gICAqIEBwYXJhbSAge051bWJlcn0gICBpbmRleFxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uKGluZGV4LCBmbikge1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoaXMgc2xvdFxuICAgIC8vIGhhc24ndCBhbHJlYWR5IGJlZW5cbiAgICAvLyB0YWtlbi4gSWYgaXQgaGFzLCB0cnlcbiAgICAvLyByZS1zY2hlZHVsaW5nIGZvciB0aGUgbmV4dCBzbG90XG4gICAgaWYgKHRoaXMuZnJhbWVzW2luZGV4XSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGUoaW5kZXggKyAxLCBmbik7XG4gICAgfVxuXG4gICAgLy8gU3RhcnQgdGhlIHJBRlxuICAgIC8vIGxvb3AgdG8gZW1wdHlcbiAgICAvLyB0aGUgZnJhbWUgcXVldWVcbiAgICB0aGlzLmxvb3AoKTtcblxuICAgIC8vIEluc2VydCB0aGlzIGZ1bmN0aW9uIGludG9cbiAgICAvLyB0aGUgZnJhbWVzIHF1ZXVlIGFuZCByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5mcmFtZXNbaW5kZXhdID0gZm47XG4gIH07XG5cbiAgLy8gV2Ugb25seSBldmVyIHdhbnQgdGhlcmUgdG8gYmVcbiAgLy8gb25lIGluc3RhbmNlIG9mIEZhc3REb20gaW4gYW4gYXBwXG4gIGZhc3Rkb20gPSBmYXN0ZG9tIHx8IG5ldyBGYXN0RG9tKCk7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSAnZmFzdGRvbSdcbiAgICovXG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYXN0ZG9tO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpeyByZXR1cm4gZmFzdGRvbTsgfSk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93WydmYXN0ZG9tJ10gPSBmYXN0ZG9tO1xuICB9XG5cbn0pKHdpbmRvdy5mYXN0ZG9tKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTID0gQ1VTVE9NIFNESyBbQ3VzdG9tIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdF1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8vIGNvbnN0IG9zICAgICAgICA9IHJlcXVpcmUoJ29zJyk7XG4vLyBjb25zdCBtZXRob2QgICAgPSByZXF1aXJlKCdleGVtZXRob2QnKShmdW5jdGlvbihhLGIpe3JldHVybiBiO30pO1xuLy8gY29uc3QgZmFzdGRvbSAgID0gcmVxdWlyZSgnZmFzdGRvbScpO1xuLy8gY29uc3QgbWluaXhociAgID0gcmVxdWlyZSgnbWluaXhocicpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBQQVJBTUVURVIgPSBBUkdVTUVOVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBubyBjbGlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVJST1JTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBlcnJvciAgICAgPSB7XG4gIGNvbnRhaW5lciAoKSAgICB7IHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgZm9yIGNvbnRhaW5lcjpkb20gaXMgbWlzc2luZycpOyB9XG59O1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBNT0RVTEUgSU5URVJOQUxTICYgSEVMUEVSU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY29uc3QgY29uZmlnICAgID0gcmVxdWlyZSgnX2NvbmZpZycpKCk7XG5jb25zdCB0ZW1wbGF0ZSAgPSByZXF1aXJlKCcuL2luZGV4LnRlbXBsYXRlLmh0bWwnKTtcbmNvbnN0IF9fICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gbWFya2Rvd25ib3ggKHBhcmFtZXRlcikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQFRPRE86IGVtcGxveSBzb21lIGtpbmQgb2YgXCJleHRlbmRcIiBvciBcInh0ZW5kXCIgb3IgXCJtZXJnZVwiIHN0cmF0ZWd5IGluc3RlYWQgb2YgXCJYT1JcIlxuICAvKioqKioqIElOSVRJQUxJWkUgKioqKioqKi9cbiAgY29uc3QgQ09OVEFJTkVSID0gcGFyYW1ldGVyLmNvbnRhaW5lciB8fCBlcnJvci5jb250YWluZXIoKTtcbiAgY29uc3QgT1BUSU9OUyAgID0gcGFyYW1ldGVyLm9wdGlvbnMgICB8fCBjb25maWcub3B0aW9ucztcbiAgY29uc3QgREFUQSAgICAgID0gcGFyYW1ldGVyLmRhdGEgICAgICB8fCBudWxsOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEBUT0RPOiBtYXliZSBhbHdheXMgYSBcImxldmVsXCIgaW50ZXJmYWNlP1xuICBjb25zdCBDSElMRFJFTiAgPSBwYXJhbWV0ZXIuY2hpbGRyZW4gIHx8IHt9O1xuXG4gIC8qKioqKiogV0lSRSBVUCAqKioqKioqL1xuICBjb25zdCBDT01QT05FTlQgPSAoX18uaW5uZXJIVE1MPXRlbXBsYXRlLF9fLmNoaWxkTm9kZXNbMF0pO1xuXG4gIENPTVBPTkVOVC5pbm5lckhUTUwgPSBEQVRBLmxhbmdbT1BUSU9OUy5kZWZhdWx0TGFuZ3VhZ2VdO1xuICBDT05UQUlORVIuYXBwZW5kQ2hpbGQoQ09NUE9ORU5UKTtcblxuICAvLyBAVE9ETzogYWRkIERBVEEgZGVzY3JpcHRpb24gLSBiZWNhdXNlIGl0IHNob3VsZCBiZSBcImpzb24tbWV0YS1tYXJrZG93blwiIDotKVxuXG4gIC8qKioqKioqKiBSRVRVUk4gKioqKioqKioqL1xuICBjb25zdCBBUEkgPSB7IC8vIHNob3VsZCBiZSBhbiBldmVudCBlbWl0dGVyIHRvb1xuICAgIGNoYW5nZUxhbmd1YWdlIChsYW5ndWFnZSkge1xuICAgICAgQ09NUE9ORU5ULmlubmVySFRNTCA9IERBVEEubGFuZ1tsYW5ndWFnZV07XG4gICAgfVxuICB9O1xuICByZXR1cm4gQVBJO1xuXG59XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIE1PRFVMRSA9IEVYUE9SVCBbUHVibGljIEludGVyZmFjZV1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbm1vZHVsZS5leHBvcnRzID0gbWFya2Rvd25ib3g7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwiTWFya2Rvd25ib3hcIj48L2Rpdj5cXG4nOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgcGtnICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9wYWNrYWdlLmpzb24nKTtcbi8vIHZhciBwYXJhbXMgICAgICA9IHJlcXVpcmUoJycpIHRyeSBsb2FkIGZpbGVzIGluIGlmcmFtZSBhbmQgc2NyYXBlIGl0IHRvIGNpcmN1bXZlbnQgQ09SU1xuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvaWZyYW1lLWFwaVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBQQVJBTUVURVIgPSBBUkdVTUVOVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBubyBjbGkgdG9vbFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBNT0RVTEUgSU5URVJOQUxTICYgSEVMUEVSU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9jb25maWcgICAgID0ge1xuICB0aXRsZSAgICAgICA6IHBrZy5uYW1lLFxuICBkZXNjcmlwdGlvbiA6IHBrZy5kZXNjcmlwdGlvbixcbiAgdmVyc2lvbiAgICAgOiBwa2cudmVyc2lvbixcbiAga2V5d29yZHMgICAgOiBwa2cua2V5d29yZHMuam9pbignLCAnKSxcbiAgYXV0aG9yICAgICAgOiBwa2cuYXV0aG9yLm5hbWUsXG4gIHdlYnNpdGUgICAgIDogcGtnLmhvbWVwYWdlLFxuICBzdHlsZSAgICAgICA6IHBrZy5hdG9taWZ5LmNzcy5vdXRwdXRcbn07XG5mdW5jdGlvbiBjb25maWcgKGtleSkge1xuICByZXR1cm4ga2V5ID8gX2NvbmZpZ1trZXldIDogX2NvbmZpZztcbn1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSBjb25maWc7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcImhvbG9uLW1hcmtkb3duYm94XCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMS4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCIjIyBFeGFtcGxlICogW1dpemFyZCBBbWlnb3MgSW5zdGl0dXRlXShodHRwOi8vd2l6YXJkLmFtaWdvcy5pbnN0aXR1dGUpXCIsXG4gIFwibWFpblwiOiBcIlNPVVJDRS9pbmRleC5qc1wiLFxuICBcInN0eWxlXCI6IFwiU09VUkNFL2luZGV4LmNzc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7fSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYXRvbWlmeVwiOiBcIl43LjIuMlwiLFxuICAgIFwiYmFiZWxpZnlcIjogXCJeNi4xLjFcIixcbiAgICBcInJlc3JjaWZ5XCI6IFwiXjEuMS4zXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInN0YXJ0XCI6IFwiYXRvbWlmeVwiLFxuICAgIFwidGVzdFwiOiBcImVjaG8gXFxcIkVycm9yOiBubyB0ZXN0IHNwZWNpZmllZFxcXCIgJiYgZXhpdCAxXCJcbiAgfSxcbiAgXCJhdG9taWZ5XCI6IHtcbiAgICBcInNlcnZlclwiOiB7XG4gICAgICBcIm9wZW5cIjogdHJ1ZSxcbiAgICAgIFwicGF0aFwiOiBcImluZGV4Lmh0bWxcIixcbiAgICAgIFwibHJcIjoge1xuICAgICAgICBcInZlcmJvc2VcIjogdHJ1ZSxcbiAgICAgICAgXCJxdWlldFwiOiBmYWxzZSxcbiAgICAgICAgXCJwb3J0XCI6IDMxMzM3LFxuICAgICAgICBcInN5bmNcIjogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgXCJqc1wiOiB7XG4gICAgICBcImVudHJ5XCI6IFwiU09VUkNFL2luZGV4LmpzXCIsXG4gICAgICBcImFsaWFzXCI6IFwiQlVORExFL2J1bmRsZS5qc1wiLFxuICAgICAgXCJvdXRwdXRcIjogXCJCVU5ETEUvYnVuZGxlLmpzXCIsXG4gICAgICBcImRlYnVnXCI6IHRydWUsXG4gICAgICBcIndhdGNoXCI6IHRydWUsXG4gICAgICBcInRyYW5zZm9ybVwiOiBbXG4gICAgICAgIFwiYmFiZWxpZnlcIlxuICAgICAgXSxcbiAgICAgIFwic3RhbmRhbG9uZVwiOiBcIkFQSVwiXG4gICAgfSxcbiAgICBcImNzc1wiOiB7XG4gICAgICBcImVudHJ5XCI6IFwiU09VUkNFL2luZGV4LmNzc1wiLFxuICAgICAgXCJhbGlhc1wiOiBcIkJVTkRMRS9idW5kbGUuY3NzXCIsXG4gICAgICBcIm91dHB1dFwiOiBcIkJVTkRMRS9idW5kbGUuY3NzXCIsXG4gICAgICBcImRlYnVnXCI6IHRydWUsXG4gICAgICBcIndhdGNoXCI6IHRydWUsXG4gICAgICBcImF1dG9wcmVmaXhlclwiOiB7XG4gICAgICAgIFwiYnJvd3NlcnNcIjogW1xuICAgICAgICAgIFwiPiAxJVwiLFxuICAgICAgICAgIFwiSUUgN1wiXG4gICAgICAgIF0sXG4gICAgICAgIFwiY2FzY2FkZVwiOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIFwiY29tcHJlc3NcIjogZmFsc2UsXG4gICAgICBcInBsdWdpblwiOiBbXVxuICAgIH0sXG4gICAgXCJhc3NldHNcIjoge1xuICAgICAgXCJkZXN0XCI6IFwiQlVORExFL2Fzc2V0cy9cIixcbiAgICAgIFwicHJlZml4XCI6IFwiL0JVTkRMRS9hc3NldHMvXCIsXG4gICAgICBcInJldGFpbk5hbWVcIjogZmFsc2VcbiAgICB9XG4gIH0sXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQraHR0cHM6Ly9naXRodWIuY29tL2hvbG9ucy9ob2xvbi1tYXJrZG93bmJveC5naXRcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImhvbG9uXCIsXG4gICAgXCJob2xvbnNcIixcbiAgICBcImhvbG9uaWZ5XCIsXG4gICAgXCJob2xvbm9teVwiLFxuICAgIFwiY29tcG9uZW50XCIsXG4gICAgXCJ3ZWJjb21wb25lbnRcIixcbiAgICBcIm1vZHVsZVwiLFxuICAgIFwiYmxvY2tcIixcbiAgICBcIkJFTVwiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJzZXJhcGF0aFwiLFxuICAgIFwiZW1haWxcIjogXCJkZXZAc2VyYXBhdGguZGVcIixcbiAgICBcInVybFwiOiBcImh0dHA6Ly93d3cuZ2l0aHViLmNvbS9zZXJhcGF0aFwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2hvbG9ucy9ob2xvbi1tYXJrZG93bmJveC9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2hvbG9ucy9ob2xvbi1tYXJrZG93bmJveCNyZWFkbWVcIixcbiAgXCJyZWFkbWVcIjogXCIjIGhvbG9uLW1hcmtkb3duYm94XFxuXFxuIyMgRXhhbXBsZVxcbiogW1dpemFyZCBBbWlnb3MgSW5zdGl0dXRlXShodHRwOi8vd2l6YXJkLmFtaWdvcy5pbnN0aXR1dGUpXFxuXFxuIyMgQ29udHJpYnV0ZVxcblxcbklmIHlvdSBsaWtlIHRoZSBpZGVhIG9mIHRoaXMgbW9kdWxlLCBwbGVhc2UgZmVlbCBmcmVlIHRvIGNvbnRhY3QgbWUgOi0pXFxuXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJnaXRIZWFkXCI6IFwiZGYzN2RkZGFkMWExM2I2NmQ1ODg4NDJiMzdjYTIyZTBmOTFhNGU1N1wiLFxuICBcIl9pZFwiOiBcImhvbG9uLW1hcmtkb3duYm94QDAuMS4wXCIsXG4gIFwiX3NoYXN1bVwiOiBcIjM4Yjg2YTU2MDA4MTE0OTY2ZTEyZDU1NGM0ZjBjZWIxMjhkZDNjZDdcIixcbiAgXCJfZnJvbVwiOiBcImhvbG9uLW1hcmtkb3duYm94QCpcIlxufVxuIiwiLyoqXG4gKiBodG1sMm1hcmtkb3duIC0gQW4gSFRNTCB0byBNYXJrZG93biBjb252ZXJ0ZXIuXG4gKlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiB1c2VzIEhUTUwgb3IgRE9NIHBhcnNpbmcgZm9yIGNvbnZlcnNpb24uIFBhcnNpbmcgY29kZSB3YXNcbiAqIGFic3RyYWN0ZWQgb3V0IGluIGEgcGFyc2luZyBmdW5jdGlvbiB3aGljaCBzaG91bGQgYmUgZWFzeSB0byByZW1vdmUgaW4gZmF2b3JcbiAqIG9mIG90aGVyIHBhcnNpbmcgbGlicmFyaWVzLlxuICpcbiAqIENvbnZlcnRlZCBNYXJrRG93biB3YXMgdGVzdGVkIHdpdGggU2hvd0Rvd24gbGlicmFyeSBmb3IgSFRNTCByZW5kZXJpbmcuIEFuZFxuICogaXQgdHJpZXMgdG8gY3JlYXRlIE1hcmtEb3duIHRoYXQgZG9lcyBub3QgY29uZnVzZSBTaG93RG93biB3aGVuIGNlcnRhaW5cbiAqIGNvbWJpbmF0aW9uIG9mIEhUTUwgdGFncyBjb21lIHRvZ2V0aGVyLlxuICpcbiAqIEBhdXRob3IgSGltYW5zaHUgR2lsYW5pXG4gKiBAYXV0aG9yIEthdGVzIEdhc2lzIChvcmlnaW5hbCBhdXRob3IpXG4gKlxuICovXG5cbi8qKlxuICogaHRtbDJtYXJrZG93blxuICogQHBhcmFtIGh0bWwgLSBodG1sIHN0cmluZyB0byBjb252ZXJ0XG4gKiBAcmV0dXJuIGNvbnZlcnRlZCBtYXJrZG93biB0ZXh0XG4gKi9cblxuLypcbiBVbml2ZXJzYWwgSmF2YVNjcmlwdCBNb2R1bGUsIHN1cHBvcnRzIEFNRCAoUmVxdWlyZUpTKSwgTm9kZS5qcywgYW5kIHRoZSBicm93c2VyLlxuIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2tpcmVsLzEyNjg3NTNcbiovXG5cbihmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBBTURcbiAgICBkZWZpbmUoZGVmaW5pdGlvbik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHsgLy8gTm9kZS5qc1xuICAgIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICB9IGVsc2UgeyAvLyBCcm93c2VyXG4gICAgdmFyIHRoZU1vZHVsZSA9IGRlZmluaXRpb24oKSwgZ2xvYmFsID0gdGhpcywgb2xkID0gZ2xvYmFsW25hbWVdO1xuICAgIHRoZU1vZHVsZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgZ2xvYmFsW25hbWVdID0gb2xkO1xuICAgICAgcmV0dXJuIHRoZU1vZHVsZTtcbiAgICB9O1xuICAgIGdsb2JhbFtuYW1lXSA9IHRoZU1vZHVsZTtcbiAgfVxufSkoJ2h0bWwybWFya2Rvd24nLCBmdW5jdGlvbigpIHtcblxuZnVuY3Rpb24gdHJpbSh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUucmVwbGFjZSgvXlxccyt8XFxzKyQvZyxcIlwiKTtcbn1cblxuZnVuY3Rpb24gZW5kc1dpdGgodmFsdWUsIHN1ZmZpeCkge1xuICByZXR1cm4gdmFsdWUubWF0Y2goc3VmZml4K1wiJFwiKSA9PSBzdWZmaXg7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0c1dpdGgodmFsdWUsIHN0cikge1xuXHRyZXR1cm4gdmFsdWUuaW5kZXhPZihzdHIpID09IDA7XG59XG5cbmZ1bmN0aW9uIGh0bWwybWFya2Rvd24oaHRtbCwgb3B0cykge1xuXHRvcHRzID0gb3B0cyB8fCB7fTtcblxuXHR2YXIgbm9kZUxpc3QgPSBbXTtcblx0dmFyIGxpc3RUYWdTdGFjayA9IFtdO1xuXHR2YXIgbGlua0F0dHJTdGFjayA9IFtdO1xuXHR2YXIgYmxvY2txdW90ZVN0YWNrID0gW107XG5cdHZhciBwcmVTdGFjayA9IFtdO1xuXHR2YXIgY29kZVN0YWNrID0gW107XG5cdHZhciBsaW5rcyA9IFtdO1xuXHR2YXIgaW5saW5lU3R5bGUgPSBvcHRzWydpbmxpbmVTdHlsZSddIHx8IGZhbHNlO1xuXHR2YXIgcGFyc2VyID0gb3B0c1sncGFyc2VyJ107XG5cdHZhciBtYXJrZG93blRhZ3MgPSB7XG5cdFx0XCJoclwiOiBcIi0gLSAtXFxuXFxuXCIsXG5cdFx0XCJiclwiOiBcIiAgXFxuXCIsXG5cdFx0XCJ0aXRsZVwiOiBcIiMgXCIsXG5cdFx0XCJoMVwiOiBcIiMgXCIsXG5cdFx0XCJoMlwiOiBcIiMjIFwiLFxuXHRcdFwiaDNcIjogXCIjIyMgXCIsXG5cdFx0XCJoNFwiOiBcIiMjIyMgXCIsXG5cdFx0XCJoNVwiOiBcIiMjIyMjIFwiLFxuXHRcdFwiaDZcIjogXCIjIyMjIyMgXCIsXG5cdFx0XCJiXCI6IFwiKipcIixcblx0XHRcInN0cm9uZ1wiOiBcIioqXCIsXG5cdFx0XCJpXCI6IFwiX1wiLFxuXHRcdFwiZW1cIjogXCJfXCIsXG5cdFx0XCJkZm5cIjogXCJfXCIsXG5cdFx0XCJ2YXJcIjogXCJfXCIsXG5cdFx0XCJjaXRlXCI6IFwiX1wiLFxuXHRcdFwic3BhblwiOiBcIiBcIixcblx0XHRcInVsXCI6IFwiKiBcIixcblx0XHRcIm9sXCI6IFwiMS4gXCIsXG5cdFx0XCJkbFwiOiBcIi0gXCIsXG5cdFx0XCJibG9ja3F1b3RlXCI6IFwiPiBcIlxuXHR9O1xuXG5cdGlmKCFwYXJzZXIgJiYgdHlwZW9mIG1hcmtkb3duRE9NUGFyc2VyICE9PSAndW5kZWZpbmVkJylcblx0XHRwYXJzZXIgPSBtYXJrZG93bkRPTVBhcnNlcjtcblxuXHRmdW5jdGlvbiBnZXRMaXN0TWFya2Rvd25UYWcoKSB7XG5cdFx0dmFyIGxpc3RJdGVtID0gXCJcIjtcblx0XHRpZihsaXN0VGFnU3RhY2spIHtcblx0XHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGxpc3RUYWdTdGFjay5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0bGlzdEl0ZW0gKz0gXCIgIFwiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRsaXN0SXRlbSArPSBwZWVrKGxpc3RUYWdTdGFjayk7XG5cdFx0cmV0dXJuIGxpc3RJdGVtO1xuXHR9XG5cblx0ZnVuY3Rpb24gY29udmVydEF0dHJzKGF0dHJzKSB7XG5cdFx0dmFyIGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRmb3IodmFyIGsgaW4gYXR0cnMpIHtcblx0XHRcdHZhciBhdHRyID0gYXR0cnNba107XG5cdFx0XHRhdHRyaWJ1dGVzW2F0dHIubmFtZV0gPSBhdHRyO1xuXHRcdH1cblx0XHRyZXR1cm4gYXR0cmlidXRlcztcblx0fVxuXG5cdGZ1bmN0aW9uIHBlZWsobGlzdCkge1xuXHRcdGlmKGxpc3QgJiYgbGlzdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRyZXR1cm4gbGlzdC5zbGljZSgtMSlbMF07XG5cdFx0fVxuXHRcdHJldHVybiBcIlwiO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGVla1RpbGxOb3RFbXB0eShsaXN0KSB7XG5cdFx0aWYoIWxpc3QpIHtcblx0XHRcdHJldHVybiBcIlwiO1xuXHRcdH1cblxuXHRcdGZvcih2YXIgaSA9IGxpc3QubGVuZ3RoIC0gMTsgaT49MDsgaS0tICl7XG5cdFx0XHRpZihsaXN0W2ldICE9IFwiXCIpIHtcblx0XHRcdFx0cmV0dXJuIGxpc3RbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBcIlwiO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVtb3ZlSWZFbXB0eVRhZyhzdGFydCkge1xuXHRcdHZhciBjbGVhbmVkID0gZmFsc2U7XG5cdFx0aWYoc3RhcnQgPT0gcGVla1RpbGxOb3RFbXB0eShub2RlTGlzdCkpIHtcblx0XHRcdHdoaWxlKHBlZWsobm9kZUxpc3QpICE9IHN0YXJ0KSB7XG5cdFx0XHRcdG5vZGVMaXN0LnBvcCgpO1xuXHRcdFx0fVxuXHRcdFx0bm9kZUxpc3QucG9wKCk7XG5cdFx0XHRjbGVhbmVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGNsZWFuZWQ7XG5cdH1cblxuXHRmdW5jdGlvbiBzbGljZVRleHQoc3RhcnQpIHtcblx0XHR2YXIgdGV4dCA9IFtdO1xuXHRcdHdoaWxlKG5vZGVMaXN0Lmxlbmd0aCA+IDAgJiYgcGVlayhub2RlTGlzdCkgIT0gc3RhcnQpIHtcblx0XHRcdHZhciB0ID0gbm9kZUxpc3QucG9wKCk7XG5cdFx0XHR0ZXh0LnVuc2hpZnQodCk7XG5cdFx0fVxuXHRcdHJldHVybiB0ZXh0LmpvaW4oXCJcIik7XG5cdH1cblxuXHRmdW5jdGlvbiBibG9jayhpc0VuZEJsb2NrKSB7XG5cdFx0dmFyIGxhc3RJdGVtID0gbm9kZUxpc3QucG9wKCk7XG5cdFx0aWYgKCFsYXN0SXRlbSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmKCFpc0VuZEJsb2NrKSB7XG5cdFx0XHR2YXIgYmxvY2s7XG5cdFx0XHRpZigvXFxzKlxcblxcblxccyokLy50ZXN0KGxhc3RJdGVtKSkge1xuXHRcdFx0XHRsYXN0SXRlbSA9IGxhc3RJdGVtLnJlcGxhY2UoL1xccypcXG5cXG5cXHMqJC8sIFwiXFxuXFxuXCIpO1xuXHRcdFx0XHRibG9jayA9IFwiXCI7XG5cdFx0XHR9IGVsc2UgaWYoL1xccypcXG5cXHMqJC8udGVzdChsYXN0SXRlbSkpIHtcblx0XHRcdFx0bGFzdEl0ZW0gPSBsYXN0SXRlbS5yZXBsYWNlKC9cXHMqXFxuXFxzKiQvLCBcIlxcblwiKTtcblx0XHRcdFx0YmxvY2sgPSBcIlxcblwiO1xuXHRcdFx0fSBlbHNlIGlmKC9cXHMrJC8udGVzdChsYXN0SXRlbSkpIHtcblx0XHRcdFx0YmxvY2sgPSBcIlxcblxcblwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YmxvY2sgPSBcIlxcblxcblwiO1xuXHRcdFx0fVxuXG5cdFx0XHRub2RlTGlzdC5wdXNoKGxhc3RJdGVtKTtcblx0XHRcdG5vZGVMaXN0LnB1c2goYmxvY2spO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub2RlTGlzdC5wdXNoKGxhc3RJdGVtKTtcblx0XHRcdGlmKCFlbmRzV2l0aChsYXN0SXRlbSwgXCJcXG5cIikpIHtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIlxcblxcblwiKTtcblx0XHRcdH1cblx0XHR9XG4gXHR9XG5cblx0ZnVuY3Rpb24gbGlzdEJsb2NrKCkge1xuXHRcdGlmKG5vZGVMaXN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdHZhciBsaSA9IHBlZWsobm9kZUxpc3QpO1xuXG5cdFx0XHRpZighZW5kc1dpdGgobGksIFwiXFxuXCIpKSB7XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCJcXG5cIik7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vZGVMaXN0LnB1c2goXCJcXG5cIik7XG5cdFx0fVxuXHR9XG5cblx0cGFyc2VyKGh0bWwse1xuXHRcdHN0YXJ0OiBmdW5jdGlvbih0YWcsIGF0dHJzLCB1bmFyeSkge1xuXHRcdFx0dGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdGlmKHVuYXJ5ICYmICh0YWcgIT0gXCJiclwiICYmIHRhZyAhPSBcImhyXCIgJiYgdGFnICE9IFwiaW1nXCIpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdHN3aXRjaCAodGFnKSB7XG5cdFx0XHRjYXNlIFwiYnJcIjpcblx0XHRcdFx0bm9kZUxpc3QucHVzaChtYXJrZG93blRhZ3NbdGFnXSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImhyXCI6XG5cdFx0XHRcdGJsb2NrKCk7XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2gobWFya2Rvd25UYWdzW3RhZ10pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ0aXRsZVwiOlxuXHRcdFx0Y2FzZSBcImgxXCI6XG5cdFx0XHRjYXNlIFwiaDJcIjpcblx0XHRcdGNhc2UgXCJoM1wiOlxuXHRcdFx0Y2FzZSBcImg0XCI6XG5cdFx0XHRjYXNlIFwiaDVcIjpcblx0XHRcdGNhc2UgXCJoNlwiOlxuXHRcdFx0XHRibG9jaygpO1xuXHRcdFx0XHRub2RlTGlzdC5wdXNoKG1hcmtkb3duVGFnc1t0YWddKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiYlwiOlxuXHRcdFx0Y2FzZSBcInN0cm9uZ1wiOlxuXHRcdFx0Y2FzZSBcImlcIjpcblx0XHRcdGNhc2UgXCJlbVwiOlxuXHRcdFx0Y2FzZSBcImRmblwiOlxuXHRcdFx0Y2FzZSBcInZhclwiOlxuXHRcdFx0Y2FzZSBcImNpdGVcIjpcblx0XHRcdFx0bm9kZUxpc3QucHVzaChtYXJrZG93blRhZ3NbdGFnXSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImNvZGVcIjpcblx0XHRcdGNhc2UgXCJzcGFuXCI6XG5cdFx0XHRcdGlmKHByZVN0YWNrLmxlbmd0aCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fSBlbHNlIGlmKCEgL1xccyskLy50ZXN0KHBlZWsobm9kZUxpc3QpKSkge1xuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2gobWFya2Rvd25UYWdzW3RhZ10pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInBcIjpcblx0XHRcdGNhc2UgXCJkaXZcIjpcblx0XHRcdC8vY2FzZSBcInRkXCI6XG5cdFx0XHRcdGJsb2NrKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInVsXCI6XG5cdFx0XHRjYXNlIFwib2xcIjpcblx0XHRcdGNhc2UgXCJkbFwiOlxuXHRcdFx0XHRsaXN0VGFnU3RhY2sucHVzaChtYXJrZG93blRhZ3NbdGFnXSk7XG5cdFx0XHRcdC8vIGxpc3RzIGFyZSBibG9jayBlbGVtZW50c1xuXHRcdFx0XHRpZihsaXN0VGFnU3RhY2subGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdGxpc3RCbG9jaygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJsb2NrKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwibGlcIjpcblx0XHRcdGNhc2UgXCJkdFwiOlxuXHRcdFx0XHR2YXIgbGkgPSBnZXRMaXN0TWFya2Rvd25UYWcoKTtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChsaSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImFcIjpcblx0XHRcdFx0dmFyIGF0dHJpYnMgPSBjb252ZXJ0QXR0cnMoYXR0cnMpO1xuXHRcdFx0XHRsaW5rQXR0clN0YWNrLnB1c2goYXR0cmlicyk7XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCJbXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJpbWdcIjpcblx0XHRcdFx0dmFyIGF0dHJpYnMgPSBjb252ZXJ0QXR0cnMoYXR0cnMpO1xuXHRcdFx0XHR2YXIgYWx0LCB0aXRsZSwgdXJsO1xuXG5cdFx0XHRcdGF0dHJpYnNbXCJzcmNcIl0gPyB1cmwgPSBhdHRyaWJzW1wic3JjXCJdLnZhbHVlIDogdXJsID0gXCJcIjtcblx0XHRcdFx0aWYoIXVybCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YXR0cmlic1snYWx0J10gPyBhbHQgPSB0cmltKGF0dHJpYnNbJ2FsdCddLnZhbHVlKSA6IGFsdCA9IFwiXCI7XG5cdFx0XHRcdGF0dHJpYnNbJ3RpdGxlJ10gPyB0aXRsZSA9IHRyaW0oYXR0cmlic1sndGl0bGUnXS52YWx1ZSkgOiB0aXRsZSA9IFwiXCI7XG5cblx0XHRcdFx0Ly8gaWYgcGFyZW50IG9mIGltYWdlIHRhZyBpcyBuZXN0ZWQgaW4gYW5jaG9yIHRhZyB1c2UgaW5saW5lIHN0eWxlXG5cdFx0XHRcdGlmKCFpbmxpbmVTdHlsZSAmJiAhc3RhcnRzV2l0aChwZWVrVGlsbE5vdEVtcHR5KG5vZGVMaXN0KSwgXCJbXCIpKSB7XG5cdFx0XHRcdFx0dmFyIGwgPSBsaW5rcy5pbmRleE9mKHVybCk7XG5cdFx0XHRcdFx0aWYobCA9PSAtMSkge1xuXHRcdFx0XHRcdFx0bGlua3MucHVzaCh1cmwpO1xuXHRcdFx0XHRcdFx0bD1saW5rcy5sZW5ndGgtMTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRibG9jaygpO1xuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2goXCIhW1wiKTtcblx0XHRcdFx0XHRpZihhbHQhPSBcIlwiKSB7XG5cdFx0XHRcdFx0XHRub2RlTGlzdC5wdXNoKGFsdCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aXRsZSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRub2RlTGlzdC5wdXNoKHRpdGxlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiXVtcIiArIGwgKyBcIl1cIik7XG5cdFx0XHRcdFx0YmxvY2soKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL2lmIGltYWdlIGlzIG5vdCBhIGxpbmsgaW1hZ2UgdGhlbiB0cmVhdCBpbWFnZXMgYXMgYmxvY2sgZWxlbWVudHNcblx0XHRcdFx0XHRpZighc3RhcnRzV2l0aChwZWVrVGlsbE5vdEVtcHR5KG5vZGVMaXN0KSwgXCJbXCIpKSB7XG5cdFx0XHRcdFx0XHRibG9jaygpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2goXCIhW1wiICsgYWx0ICsgXCJdKFwiICsgdXJsICsgKHRpdGxlID8gXCIgXFxcIlwiICsgdGl0bGUgKyBcIlxcXCJcIiA6IFwiXCIpICsgXCIpXCIpO1xuXG5cdFx0XHRcdFx0aWYoIXN0YXJ0c1dpdGgocGVla1RpbGxOb3RFbXB0eShub2RlTGlzdCksIFwiW1wiKSkge1xuXHRcdFx0XHRcdFx0YmxvY2sodHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImJsb2NrcXVvdGVcIjpcblx0XHRcdFx0Ly9saXN0QmxvY2soKTtcblx0XHRcdFx0YmxvY2soKTtcblx0XHRcdFx0YmxvY2txdW90ZVN0YWNrLnB1c2gobWFya2Rvd25UYWdzW3RhZ10pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJwcmVcIjpcblx0XHRcdFx0YmxvY2soKTtcblx0XHRcdFx0cHJlU3RhY2sucHVzaCh0cnVlKTtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIiAgICBcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInRhYmxlXCI6XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCI8dGFibGU+XCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ0aGVhZFwiOlxuXHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiPHRoZWFkPlwiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidGJvZHlcIjpcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIjx0Ym9keT5cIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInRyXCI6XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCI8dHI+XCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ0ZFwiOlxuXHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiPHRkPlwiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRjaGFyczogZnVuY3Rpb24odGV4dCkge1xuXHRcdFx0aWYocHJlU3RhY2subGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXG4vZyxcIlxcbiAgICBcIik7XG5cdFx0XHR9IGVsc2UgaWYodHJpbSh0ZXh0KSAhPSBcIlwiKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xccysvZywgXCIgXCIpO1xuXG5cdFx0XHRcdHZhciBwcmV2VGV4dCA9IHBlZWtUaWxsTm90RW1wdHkobm9kZUxpc3QpO1xuXHRcdFx0XHRpZigvXFxzKyQvLnRlc3QocHJldlRleHQpKSB7XG5cdFx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvXlxccysvZywgXCJcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCJcIik7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly9pZihibG9ja3F1b3RlU3RhY2subGVuZ3RoID4gMCAmJiBwZWVrVGlsbE5vdEVtcHR5KG5vZGVMaXN0KS5lbmRzV2l0aChcIlxcblwiKSkge1xuXHRcdFx0aWYoYmxvY2txdW90ZVN0YWNrLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChibG9ja3F1b3RlU3RhY2suam9pbihcIlwiKSk7XG5cdFx0XHR9XG5cblx0XHRcdG5vZGVMaXN0LnB1c2godGV4dCk7XG5cdFx0fSxcblx0XHRlbmQ6IGZ1bmN0aW9uKHRhZykge1xuXHRcdFx0dGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRzd2l0Y2ggKHRhZykge1xuXHRcdFx0Y2FzZSBcInRpdGxlXCI6XG5cdFx0XHRjYXNlIFwiaDFcIjpcblx0XHRcdGNhc2UgXCJoMlwiOlxuXHRcdFx0Y2FzZSBcImgzXCI6XG5cdFx0XHRjYXNlIFwiaDRcIjpcblx0XHRcdGNhc2UgXCJoNVwiOlxuXHRcdFx0Y2FzZSBcImg2XCI6XG5cdFx0XHRcdGlmKCFyZW1vdmVJZkVtcHR5VGFnKG1hcmtkb3duVGFnc1t0YWddKSkge1xuXHRcdFx0XHRcdGJsb2NrKHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInBcIjpcblx0XHRcdGNhc2UgXCJkaXZcIjpcblx0XHRcdC8vY2FzZSBcInRkXCI6XG5cdFx0XHRcdHdoaWxlKG5vZGVMaXN0Lmxlbmd0aCA+IDAgJiYgdHJpbShwZWVrKG5vZGVMaXN0KSkgPT0gXCJcIikge1xuXHRcdFx0XHRcdG5vZGVMaXN0LnBvcCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJsb2NrKHRydWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJiXCI6XG5cdFx0XHRjYXNlIFwic3Ryb25nXCI6XG5cdFx0XHRjYXNlIFwiaVwiOlxuXHRcdFx0Y2FzZSBcImVtXCI6XG5cdFx0XHRjYXNlIFwiZGZuXCI6XG5cdFx0XHRjYXNlIFwidmFyXCI6XG5cdFx0XHRjYXNlIFwiY2l0ZVwiOlxuXHRcdFx0XHRpZighcmVtb3ZlSWZFbXB0eVRhZyhtYXJrZG93blRhZ3NbdGFnXSkpIHtcblx0XHRcdFx0XHRub2RlTGlzdC5wdXNoKHRyaW0oc2xpY2VUZXh0KG1hcmtkb3duVGFnc1t0YWddKSkpO1xuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2gobWFya2Rvd25UYWdzW3RhZ10pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImFcIjpcblx0XHRcdFx0dmFyIHRleHQgPSBzbGljZVRleHQoXCJbXCIpO1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKTtcblx0XHRcdFx0dGV4dCA9IHRyaW0odGV4dCk7XG5cblx0XHRcdFx0aWYodGV4dCA9PSBcIlwiKSB7XG5cdFx0XHRcdFx0bm9kZUxpc3QucG9wKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgYXR0cnMgPSBsaW5rQXR0clN0YWNrLnBvcCgpO1xuXHRcdFx0XHR2YXIgdXJsO1xuXHRcdFx0XHRhdHRyc1tcImhyZWZcIl0gJiYgIGF0dHJzW1wiaHJlZlwiXS52YWx1ZSAhPSBcIlwiID8gdXJsID0gYXR0cnNbXCJocmVmXCJdLnZhbHVlIDogdXJsID0gXCJcIjtcblxuXHRcdFx0XHRpZih1cmwgPT0gXCJcIikge1xuXHRcdFx0XHRcdG5vZGVMaXN0LnBvcCgpO1xuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2godGV4dCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRub2RlTGlzdC5wdXNoKHRleHQpO1xuXG5cdFx0XHRcdGlmKCFpbmxpbmVTdHlsZSAmJiAhc3RhcnRzV2l0aChwZWVrKG5vZGVMaXN0KSwgXCIhXCIpKXtcblx0XHRcdFx0XHR2YXIgbCA9IGxpbmtzLmluZGV4T2YodXJsKTtcblx0XHRcdFx0XHRpZihsID09IC0xKSB7XG5cdFx0XHRcdFx0XHRsaW5rcy5wdXNoKHVybCk7XG5cdFx0XHRcdFx0XHRsPWxpbmtzLmxlbmd0aC0xO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiXVtcIiArIGwgKyBcIl1cIik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYoc3RhcnRzV2l0aChwZWVrKG5vZGVMaXN0KSwgXCIhXCIpKXtcblx0XHRcdFx0XHRcdHZhciB0ZXh0ID0gbm9kZUxpc3QucG9wKCk7XG5cdFx0XHRcdFx0XHR0ZXh0ID0gbm9kZUxpc3QucG9wKCkgKyB0ZXh0O1xuXHRcdFx0XHRcdFx0YmxvY2soKTtcblx0XHRcdFx0XHRcdG5vZGVMaXN0LnB1c2godGV4dCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHRpdGxlID0gYXR0cnNbXCJ0aXRsZVwiXTtcblx0XHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiXShcIiArIHVybCArICh0aXRsZSA/IFwiIFxcXCJcIiArIHRyaW0odGl0bGUudmFsdWUpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpICsgXCJcXFwiXCIgOiBcIlwiKSArIFwiKVwiKTtcblxuXHRcdFx0XHRcdGlmKHN0YXJ0c1dpdGgocGVlayhub2RlTGlzdCksIFwiIVwiKSl7XG5cdFx0XHRcdFx0XHRibG9jayh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidWxcIjpcblx0XHRcdGNhc2UgXCJvbFwiOlxuXHRcdFx0Y2FzZSBcImRsXCI6XG5cdFx0XHRcdGxpc3RCbG9jaygpO1xuXHRcdFx0XHRsaXN0VGFnU3RhY2sucG9wKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImxpXCI6XG5cdFx0XHRjYXNlIFwiZHRcIjpcblx0XHRcdFx0dmFyIGxpID0gZ2V0TGlzdE1hcmtkb3duVGFnKCk7XG5cdFx0XHRcdGlmKCFyZW1vdmVJZkVtcHR5VGFnKGxpKSkge1xuXHRcdFx0XHRcdHZhciB0ZXh0ID0gdHJpbShzbGljZVRleHQobGkpKTtcblxuXHRcdFx0XHRcdGlmKHN0YXJ0c1dpdGgodGV4dCwgXCJbIVtcIikpIHtcblx0XHRcdFx0XHRcdG5vZGVMaXN0LnBvcCgpO1xuXHRcdFx0XHRcdFx0YmxvY2soKTtcblx0XHRcdFx0XHRcdG5vZGVMaXN0LnB1c2godGV4dCk7XG5cdFx0XHRcdFx0XHRibG9jayh0cnVlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bm9kZUxpc3QucHVzaCh0ZXh0KTtcblx0XHRcdFx0XHRcdGxpc3RCbG9jaygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJibG9ja3F1b3RlXCI6XG5cdFx0XHRcdGJsb2NrcXVvdGVTdGFjay5wb3AoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwicHJlXCI6XG5cdFx0XHRcdC8vdW5jb21tZW50IGZvbGxvd2luZyBleHBlcmltZW50YWwgY29kZSB0byBkaXNjYXJkIGxpbmUgbnVtYmVycyB3aGVuIHN5bnRheCBoaWdobGlnaHRlcnMgYXJlIHVzZWRcblx0XHRcdFx0Ly9ub3RlcyB0aGlzIGNvZGUgdGhvcm91Z2ggdGVzdGluZyBiZWZvcmUgcHJvZHVjdGlvbiB1c2VyXG5cdFx0XHRcdC8qXG5cdFx0XHRcdHZhciBwPVtdO1xuXHRcdFx0XHR2YXIgZmxhZyA9IHRydWU7XG5cdFx0XHRcdHZhciBjb3VudCA9IDAsIHdoaXRlU3BhY2UgPSAwLCBsaW5lID0gMDtcblx0XHRcdFx0Y29uc29sZS5sb2coXCI+PiBcIiArIHBlZWsobm9kZUxpc3QpKTtcblx0XHRcdFx0d2hpbGUocGVlayhub2RlTGlzdCkuc3RhcnRzV2l0aChcIiAgICBcIikgfHwgZmxhZyA9PSB0cnVlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnaW5zaWRlJyk7XG5cdFx0XHRcdFx0dmFyIHRleHQgPSBub2RlTGlzdC5wb3AoKTtcblx0XHRcdFx0XHRwLnB1c2godGV4dCk7XG5cblx0XHRcdFx0XHRpZihmbGFnID09IHRydWUgJiYgIXRleHQuc3RhcnRzV2l0aChcIiAgICBcIikpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRmbGFnID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly92YXIgcmVzdWx0ID0gcGFyc2VJbnQodGV4dC50cmltKCkpO1xuXHRcdFx0XHRcdGlmKCFpc05hTih0ZXh0LnRyaW0oKSkpIHtcblx0XHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdFx0fSBlbHNlIGlmKHRleHQudHJpbSgpID09IFwiXCIpe1xuXHRcdFx0XHRcdFx0d2hpdGVTcGFjZSsrO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRsaW5lKys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZsYWcgPSBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnNvbGUubG9nKGxpbmUpO1xuXHRcdFx0XHRpZihsaW5lICE9IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR3aGlsZShwLmxlbmd0aCAhPSAwKSB7XG5cdFx0XHRcdFx0XHRub2RlTGlzdC5wdXNoKHAucG9wKCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQqL1xuXHRcdFx0XHRibG9jayh0cnVlKTtcblx0XHRcdFx0cHJlU3RhY2sucG9wKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImNvZGVcIjpcblx0XHRcdGNhc2UgXCJzcGFuXCI6XG5cdFx0XHRcdGlmKHByZVN0YWNrLmxlbmd0aCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fSBlbHNlIGlmKHRyaW0ocGVlayhub2RlTGlzdCkpID09IFwiXCIpIHtcblx0XHRcdFx0XHRub2RlTGlzdC5wb3AoKTtcblx0XHRcdFx0XHRub2RlTGlzdC5wdXNoKG1hcmtkb3duVGFnc1t0YWddKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgdGV4dCA9IG5vZGVMaXN0LnBvcCgpO1xuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2godHJpbSh0ZXh0KSk7XG5cdFx0XHRcdFx0bm9kZUxpc3QucHVzaChtYXJrZG93blRhZ3NbdGFnXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidGFibGVcIjpcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIjwvdGFibGU+XCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ0aGVhZFwiOlxuXHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiPC90aGVhZD5cIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInRib2R5XCI6XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCI8L3Rib2R5PlwiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidHJcIjpcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIjwvdHI+XCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ0ZFwiOlxuXHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiPC90ZD5cIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImJyXCI6XG5cdFx0XHRjYXNlIFwiaHJcIjpcblx0XHRcdGNhc2UgXCJpbWdcIjpcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0sIHtcIm5vZGVzVG9JZ25vcmVcIjogW1wic2NyaXB0XCIsIFwibm9zY3JpcHRcIiwgXCJvYmplY3RcIiwgXCJpZnJhbWVcIiwgXCJmcmFtZVwiLCBcImhlYWRcIiwgXCJzdHlsZVwiLCBcImxhYmVsXCJdfSk7XG5cblx0aWYoIWlubGluZVN0eWxlKSB7XG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmKGkgPT0gMCkge1xuXHRcdFx0XHR2YXIgbGFzdEl0ZW0gPSBub2RlTGlzdC5wb3AoKTtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChsYXN0SXRlbS5yZXBsYWNlKC9cXHMrJC9nLCBcIlwiKSk7XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCJcXG5cXG5bXCIgKyBpICsgXCJdOiBcIiArIGxpbmtzW2ldKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCJcXG5bXCIgKyBpICsgXCJdOiBcIiArIGxpbmtzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbm9kZUxpc3Quam9pbihcIlwiKTtcblxufVxuXG5yZXR1cm4gaHRtbDJtYXJrZG93bjtcblxufSk7IiwidmFyIGh0bWwybWFya2Rvd24gPSByZXF1aXJlKCcuL2h0bWwybWFya2Rvd24nKTtcbnZhciBodG1sUGFyc2VyID0gcmVxdWlyZSgnLi9tYXJrZG93bl9odG1sX3BhcnNlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGh0bWwsIG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIG9wdHMucGFyc2VyID0gaHRtbFBhcnNlcjtcbiAgcmV0dXJuIGh0bWwybWFya2Rvd24oaHRtbCwgb3B0cyk7XG59O1xuIiwiLypcbiAqIEhUTUwgUGFyc2VyIEJ5IEpvaG4gUmVzaWcgKGVqb2huLm9yZylcbiAqIE9yaWdpbmFsIGNvZGUgYnkgRXJpayBBcnZpZHNzb24sIE1vemlsbGEgUHVibGljIExpY2Vuc2VcbiAqIGh0dHA6Ly9lcmlrLmVhZS5uZXQvc2ltcGxlaHRtbHBhcnNlci9zaW1wbGVodG1scGFyc2VyLmpzXG4gKlxuICogLy8gVXNlIGxpa2Ugc286XG4gKiBIVE1MUGFyc2VyKGh0bWxTdHJpbmcsIHtcbiAqICAgICBzdGFydDogZnVuY3Rpb24odGFnLCBhdHRycywgdW5hcnkpIHt9LFxuICogICAgIGVuZDogZnVuY3Rpb24odGFnKSB7fSxcbiAqICAgICBjaGFyczogZnVuY3Rpb24odGV4dCkge30sXG4gKiAgICAgY29tbWVudDogZnVuY3Rpb24odGV4dCkge31cbiAqIH0pO1xuICpcbiAqIC8vIG9yIHRvIGdldCBhbiBYTUwgc3RyaW5nOlxuICogSFRNTHRvWE1MKGh0bWxTdHJpbmcpO1xuICpcbiAqIC8vIG9yIHRvIGdldCBhbiBYTUwgRE9NIERvY3VtZW50XG4gKiBIVE1MdG9ET00oaHRtbFN0cmluZyk7XG4gKlxuICogLy8gb3IgdG8gaW5qZWN0IGludG8gYW4gZXhpc3RpbmcgZG9jdW1lbnQvRE9NIG5vZGVcbiAqIEhUTUx0b0RPTShodG1sU3RyaW5nLCBkb2N1bWVudCk7XG4gKiBIVE1MdG9ET00oaHRtbFN0cmluZywgZG9jdW1lbnQuYm9keSk7XG4gKlxuICovXG5cbi8qXG4gVW5pdmVyc2FsIEphdmFTY3JpcHQgTW9kdWxlLCBzdXBwb3J0cyBBTUQgKFJlcXVpcmVKUyksIE5vZGUuanMsIGFuZCB0aGUgYnJvd3Nlci5cbiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9raXJlbC8xMjY4NzUzXG4qL1xuXG4oZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicpIHsgLy8gQU1EXG4gICAgZGVmaW5lKGRlZmluaXRpb24pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7IC8vIE5vZGUuanNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKTtcbiAgfSBlbHNlIHsgLy8gQnJvd3NlclxuICAgIHZhciB0aGVNb2R1bGUgPSBkZWZpbml0aW9uKCksIGdsb2JhbCA9IHRoaXMsIG9sZCA9IGdsb2JhbFtuYW1lXTtcbiAgICB0aGVNb2R1bGUubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGdsb2JhbFtuYW1lXSA9IG9sZDtcbiAgICAgIHJldHVybiB0aGVNb2R1bGU7XG4gICAgfTtcbiAgICBnbG9iYWxbbmFtZV0gPSB0aGVNb2R1bGU7XG4gIH1cbn0pKCdtYXJrZG93bkhUTUxQYXJzZXInLCBmdW5jdGlvbigpIHtcblxuXHQvLyBSZWd1bGFyIEV4cHJlc3Npb25zIGZvciBwYXJzaW5nIHRhZ3MgYW5kIGF0dHJpYnV0ZXNcblx0dmFyIHN0YXJ0VGFnID0gL148KFxcdyspKCg/OlxccytcXHcrKD86XFxzKj1cXHMqKD86KD86XCJbXlwiXSpcIil8KD86J1teJ10qJyl8W14+XFxzXSspKT8pKilcXHMqKFxcLz8pPi8sXG5cdFx0ZW5kVGFnID0gL148XFwvKFxcdyspW14+XSo+Lyxcblx0XHRhdHRyID0gLyhcXHcrKSg/Olxccyo9XFxzKig/Oig/OlwiKCg/OlxcXFwufFteXCJdKSopXCIpfCg/OicoKD86XFxcXC58W14nXSkqKScpfChbXj5cXHNdKykpKT8vZztcblxuXHQvLyBFbXB0eSBFbGVtZW50cyAtIEhUTUwgNC4wMVxuXHR2YXIgZW1wdHkgPSBtYWtlTWFwKFwiYXJlYSxiYXNlLGJhc2Vmb250LGJyLGNvbCxmcmFtZSxocixpbWcsaW5wdXQsaXNpbmRleCxsaW5rLG1ldGEscGFyYW0sZW1iZWRcIik7XG5cblx0Ly8gQmxvY2sgRWxlbWVudHMgLSBIVE1MIDQuMDFcblx0dmFyIGJsb2NrID0gbWFrZU1hcChcImFkZHJlc3MsYXBwbGV0LGJsb2NrcXVvdGUsYnV0dG9uLGNlbnRlcixkZCxkZWwsZGlyLGRpdixkbCxkdCxmaWVsZHNldCxmb3JtLGZyYW1lc2V0LGhyLGlmcmFtZSxpbnMsaXNpbmRleCxsaSxtYXAsbWVudSxub2ZyYW1lcyxub3NjcmlwdCxvYmplY3Qsb2wscCxwcmUsc2NyaXB0LHRhYmxlLHRib2R5LHRkLHRmb290LHRoLHRoZWFkLHRyLHVsXCIpO1xuXG5cdC8vIElubGluZSBFbGVtZW50cyAtIEhUTUwgNC4wMVxuXHR2YXIgaW5saW5lID0gbWFrZU1hcChcImEsYWJicixhY3JvbnltLGFwcGxldCxiLGJhc2Vmb250LGJkbyxiaWcsYnIsYnV0dG9uLGNpdGUsY29kZSxkZWwsZGZuLGVtLGZvbnQsaSxpZnJhbWUsaW1nLGlucHV0LGlucyxrYmQsbGFiZWwsbWFwLG9iamVjdCxxLHMsc2FtcCxzY3JpcHQsc2VsZWN0LHNtYWxsLHNwYW4sc3RyaWtlLHN0cm9uZyxzdWIsc3VwLHRleHRhcmVhLHR0LHUsdmFyXCIpO1xuXG5cdC8vIEVsZW1lbnRzIHRoYXQgeW91IGNhbiwgaW50ZW50aW9uYWxseSwgbGVhdmUgb3BlblxuXHQvLyAoYW5kIHdoaWNoIGNsb3NlIHRoZW1zZWx2ZXMpXG5cdHZhciBjbG9zZVNlbGYgPSBtYWtlTWFwKFwiY29sZ3JvdXAsZGQsZHQsbGksb3B0aW9ucyxwLHRkLHRmb290LHRoLHRoZWFkLHRyXCIpO1xuXG5cdC8vIEF0dHJpYnV0ZXMgdGhhdCBoYXZlIHRoZWlyIHZhbHVlcyBmaWxsZWQgaW4gZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG5cdHZhciBmaWxsQXR0cnMgPSBtYWtlTWFwKFwiY2hlY2tlZCxjb21wYWN0LGRlY2xhcmUsZGVmZXIsZGlzYWJsZWQsaXNtYXAsbXVsdGlwbGUsbm9ocmVmLG5vcmVzaXplLG5vc2hhZGUsbm93cmFwLHJlYWRvbmx5LHNlbGVjdGVkXCIpO1xuXG5cdC8vIFNwZWNpYWwgRWxlbWVudHMgKGNhbiBjb250YWluIGFueXRoaW5nKVxuXHR2YXIgc3BlY2lhbCA9IG1ha2VNYXAoXCJzY3JpcHQsc3R5bGVcIik7XG5cblx0ZnVuY3Rpb24gSFRNTFBhcnNlciggaHRtbCwgaGFuZGxlciApIHtcblx0XHR2YXIgaW5kZXgsIGNoYXJzLCBtYXRjaCwgc3RhY2sgPSBbXSwgbGFzdCA9IGh0bWw7XG5cdFx0c3RhY2subGFzdCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gdGhpc1sgdGhpcy5sZW5ndGggLSAxIF07XG5cdFx0fTtcblxuXHRcdHdoaWxlICggaHRtbCApIHtcblx0XHRcdGNoYXJzID0gdHJ1ZTtcblxuXHRcdFx0Ly8gTWFrZSBzdXJlIHdlJ3JlIG5vdCBpbiBhIHNjcmlwdCBvciBzdHlsZSBlbGVtZW50XG5cdFx0XHRpZiAoICFzdGFjay5sYXN0KCkgfHwgIXNwZWNpYWxbIHN0YWNrLmxhc3QoKSBdICkge1xuXG5cdFx0XHRcdC8vIENvbW1lbnRcblx0XHRcdFx0aWYgKCBodG1sLmluZGV4T2YoXCI8IS0tXCIpID09IDAgKSB7XG5cdFx0XHRcdFx0aW5kZXggPSBodG1sLmluZGV4T2YoXCItLT5cIik7XG5cblx0XHRcdFx0XHRpZiAoIGluZGV4ID49IDAgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGhhbmRsZXIuY29tbWVudCApXG5cdFx0XHRcdFx0XHRcdGhhbmRsZXIuY29tbWVudCggaHRtbC5zdWJzdHJpbmcoIDQsIGluZGV4ICkgKTtcblx0XHRcdFx0XHRcdGh0bWwgPSBodG1sLnN1YnN0cmluZyggaW5kZXggKyAzICk7XG5cdFx0XHRcdFx0XHRjaGFycyA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBlbmQgdGFnXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGh0bWwuaW5kZXhPZihcIjwvXCIpID09IDAgKSB7XG5cdFx0XHRcdFx0bWF0Y2ggPSBodG1sLm1hdGNoKCBlbmRUYWcgKTtcblxuXHRcdFx0XHRcdGlmICggbWF0Y2ggKSB7XG5cdFx0XHRcdFx0XHRodG1sID0gaHRtbC5zdWJzdHJpbmcoIG1hdGNoWzBdLmxlbmd0aCApO1xuXHRcdFx0XHRcdFx0bWF0Y2hbMF0ucmVwbGFjZSggZW5kVGFnLCBwYXJzZUVuZFRhZyApO1xuXHRcdFx0XHRcdFx0Y2hhcnMgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gc3RhcnQgdGFnXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGh0bWwuaW5kZXhPZihcIjxcIikgPT0gMCApIHtcblx0XHRcdFx0XHRtYXRjaCA9IGh0bWwubWF0Y2goIHN0YXJ0VGFnICk7XG5cblx0XHRcdFx0XHRpZiAoIG1hdGNoICkge1xuXHRcdFx0XHRcdFx0aHRtbCA9IGh0bWwuc3Vic3RyaW5nKCBtYXRjaFswXS5sZW5ndGggKTtcblx0XHRcdFx0XHRcdG1hdGNoWzBdLnJlcGxhY2UoIHN0YXJ0VGFnLCBwYXJzZVN0YXJ0VGFnICk7XG5cdFx0XHRcdFx0XHRjaGFycyA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggY2hhcnMgKSB7XG5cdFx0XHRcdFx0aW5kZXggPSBodG1sLmluZGV4T2YoXCI8XCIpO1xuXG5cdFx0XHRcdFx0dmFyIHRleHQgPSBpbmRleCA8IDAgPyBodG1sIDogaHRtbC5zdWJzdHJpbmcoIDAsIGluZGV4ICk7XG5cdFx0XHRcdFx0aHRtbCA9IGluZGV4IDwgMCA/IFwiXCIgOiBodG1sLnN1YnN0cmluZyggaW5kZXggKTtcblxuXHRcdFx0XHRcdGlmICggaGFuZGxlci5jaGFycyApXG5cdFx0XHRcdFx0XHRoYW5kbGVyLmNoYXJzKCB0ZXh0ICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aHRtbCA9IGh0bWwucmVwbGFjZShuZXcgUmVnRXhwKFwiKC4qKTxcXC9cIiArIHN0YWNrLmxhc3QoKSArIFwiW14+XSo+XCIpLCBmdW5jdGlvbihhbGwsIHRleHQpe1xuXHRcdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoLzwhLS0oLio/KS0tPi9nLCBcIiQxXCIpXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgvPCFcXFtDREFUQVxcWyguKj8pXV0+L2csIFwiJDFcIik7XG5cblx0XHRcdFx0XHRpZiAoIGhhbmRsZXIuY2hhcnMgKVxuXHRcdFx0XHRcdFx0aGFuZGxlci5jaGFycyggdGV4dCApO1xuXG5cdFx0XHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHBhcnNlRW5kVGFnKCBcIlwiLCBzdGFjay5sYXN0KCkgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBodG1sID09IGxhc3QgKVxuXHRcdFx0XHR0aHJvdyBcIlBhcnNlIEVycm9yOiBcIiArIGh0bWw7XG5cdFx0XHRsYXN0ID0gaHRtbDtcblx0XHR9XG5cblx0XHQvLyBDbGVhbiB1cCBhbnkgcmVtYWluaW5nIHRhZ3Ncblx0XHRwYXJzZUVuZFRhZygpO1xuXG5cdFx0ZnVuY3Rpb24gcGFyc2VTdGFydFRhZyggdGFnLCB0YWdOYW1lLCByZXN0LCB1bmFyeSApIHtcblx0XHRcdGlmICggYmxvY2tbIHRhZ05hbWUgXSApIHtcblx0XHRcdFx0d2hpbGUgKCBzdGFjay5sYXN0KCkgJiYgaW5saW5lWyBzdGFjay5sYXN0KCkgXSApIHtcblx0XHRcdFx0XHRwYXJzZUVuZFRhZyggXCJcIiwgc3RhY2subGFzdCgpICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBjbG9zZVNlbGZbIHRhZ05hbWUgXSAmJiBzdGFjay5sYXN0KCkgPT0gdGFnTmFtZSApIHtcblx0XHRcdFx0cGFyc2VFbmRUYWcoIFwiXCIsIHRhZ05hbWUgKTtcblx0XHRcdH1cblxuXHRcdFx0dW5hcnkgPSBlbXB0eVsgdGFnTmFtZSBdIHx8ICEhdW5hcnk7XG5cblx0XHRcdGlmICggIXVuYXJ5IClcblx0XHRcdFx0c3RhY2sucHVzaCggdGFnTmFtZSApO1xuXG5cdFx0XHRpZiAoIGhhbmRsZXIuc3RhcnQgKSB7XG5cdFx0XHRcdHZhciBhdHRycyA9IFtdO1xuXG5cdFx0XHRcdHJlc3QucmVwbGFjZShhdHRyLCBmdW5jdGlvbihtYXRjaCwgbmFtZSkge1xuXHRcdFx0XHRcdHZhciB2YWx1ZSA9IGFyZ3VtZW50c1syXSA/IGFyZ3VtZW50c1syXSA6XG5cdFx0XHRcdFx0XHRhcmd1bWVudHNbM10gPyBhcmd1bWVudHNbM10gOlxuXHRcdFx0XHRcdFx0YXJndW1lbnRzWzRdID8gYXJndW1lbnRzWzRdIDpcblx0XHRcdFx0XHRcdGZpbGxBdHRyc1tuYW1lXSA/IG5hbWUgOiBcIlwiO1xuXG5cdFx0XHRcdFx0YXR0cnMucHVzaCh7XG5cdFx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHRcdFx0ZXNjYXBlZDogdmFsdWUucmVwbGFjZSgvKF58W15cXFxcXSlcIi9nLCAnJDFcXFxcXFxcIicpIC8vXCJcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKCBoYW5kbGVyLnN0YXJ0IClcblx0XHRcdFx0XHRoYW5kbGVyLnN0YXJ0KCB0YWdOYW1lLCBhdHRycywgdW5hcnkgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBwYXJzZUVuZFRhZyggdGFnLCB0YWdOYW1lICkge1xuXHRcdFx0Ly8gSWYgbm8gdGFnIG5hbWUgaXMgcHJvdmlkZWQsIGNsZWFuIHNob3Bcblx0XHRcdGlmICggIXRhZ05hbWUgKVxuXHRcdFx0XHR2YXIgcG9zID0gMDtcblxuXHRcdFx0Ly8gRmluZCB0aGUgY2xvc2VzdCBvcGVuZWQgdGFnIG9mIHRoZSBzYW1lIHR5cGVcblx0XHRcdGVsc2Vcblx0XHRcdFx0Zm9yICggdmFyIHBvcyA9IHN0YWNrLmxlbmd0aCAtIDE7IHBvcyA+PSAwOyBwb3MtLSApXG5cdFx0XHRcdFx0aWYgKCBzdGFja1sgcG9zIF0gPT0gdGFnTmFtZSApXG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0aWYgKCBwb3MgPj0gMCApIHtcblx0XHRcdFx0Ly8gQ2xvc2UgYWxsIHRoZSBvcGVuIGVsZW1lbnRzLCB1cCB0aGUgc3RhY2tcblx0XHRcdFx0Zm9yICggdmFyIGkgPSBzdGFjay5sZW5ndGggLSAxOyBpID49IHBvczsgaS0tIClcblx0XHRcdFx0XHRpZiAoIGhhbmRsZXIuZW5kIClcblx0XHRcdFx0XHRcdGhhbmRsZXIuZW5kKCBzdGFja1sgaSBdICk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBvcGVuIGVsZW1lbnRzIGZyb20gdGhlIHN0YWNrXG5cdFx0XHRcdHN0YWNrLmxlbmd0aCA9IHBvcztcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0dGhpcy5IVE1MdG9YTUwgPSBmdW5jdGlvbiggaHRtbCApIHtcblx0XHR2YXIgcmVzdWx0cyA9IFwiXCI7XG5cblx0XHRIVE1MUGFyc2VyKGh0bWwsIHtcblx0XHRcdHN0YXJ0OiBmdW5jdGlvbiggdGFnLCBhdHRycywgdW5hcnkgKSB7XG5cdFx0XHRcdHJlc3VsdHMgKz0gXCI8XCIgKyB0YWc7XG5cblx0XHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKysgKVxuXHRcdFx0XHRcdHJlc3VsdHMgKz0gXCIgXCIgKyBhdHRyc1tpXS5uYW1lICsgJz1cIicgKyBhdHRyc1tpXS5lc2NhcGVkICsgJ1wiJztcblxuXHRcdFx0XHRyZXN1bHRzICs9ICh1bmFyeSA/IFwiL1wiIDogXCJcIikgKyBcIj5cIjtcblx0XHRcdH0sXG5cdFx0XHRlbmQ6IGZ1bmN0aW9uKCB0YWcgKSB7XG5cdFx0XHRcdHJlc3VsdHMgKz0gXCI8L1wiICsgdGFnICsgXCI+XCI7XG5cdFx0XHR9LFxuXHRcdFx0Y2hhcnM6IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0XHRyZXN1bHRzICs9IHRleHQ7XG5cdFx0XHR9LFxuXHRcdFx0Y29tbWVudDogZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0XHRcdHJlc3VsdHMgKz0gXCI8IS0tXCIgKyB0ZXh0ICsgXCItLT5cIjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9O1xuXG5cdHRoaXMuSFRNTHRvRE9NID0gZnVuY3Rpb24oIGh0bWwsIGRvYyApIHtcblx0XHQvLyBUaGVyZSBjYW4gYmUgb25seSBvbmUgb2YgdGhlc2UgZWxlbWVudHNcblx0XHR2YXIgb25lID0gbWFrZU1hcChcImh0bWwsaGVhZCxib2R5LHRpdGxlXCIpO1xuXG5cdFx0Ly8gRW5mb3JjZSBhIHN0cnVjdHVyZSBmb3IgdGhlIGRvY3VtZW50XG5cdFx0dmFyIHN0cnVjdHVyZSA9IHtcblx0XHRcdGxpbms6IFwiaGVhZFwiLFxuXHRcdFx0YmFzZTogXCJoZWFkXCJcblx0XHR9O1xuXG5cdFx0aWYgKCAhZG9jICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgRE9NRG9jdW1lbnQgIT0gXCJ1bmRlZmluZWRcIiApXG5cdFx0XHRcdGRvYyA9IG5ldyBET01Eb2N1bWVudCgpO1xuXHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkb2N1bWVudCAhPSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmltcGxlbWVudGF0aW9uICYmIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50IClcblx0XHRcdFx0ZG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnQoXCJcIiwgXCJcIiwgbnVsbCk7XG5cdFx0XHRlbHNlIGlmICggdHlwZW9mIEFjdGl2ZVggIT0gXCJ1bmRlZmluZWRcIiApXG5cdFx0XHRcdGRvYyA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwuRE9NRG9jdW1lbnRcIik7XG5cblx0XHR9IGVsc2Vcblx0XHRcdGRvYyA9IGRvYy5vd25lckRvY3VtZW50IHx8XG5cdFx0XHRcdGRvYy5nZXRPd25lckRvY3VtZW50ICYmIGRvYy5nZXRPd25lckRvY3VtZW50KCkgfHxcblx0XHRcdFx0ZG9jO1xuXG5cdFx0dmFyIGVsZW1zID0gW10sXG5cdFx0XHRkb2N1bWVudEVsZW1lbnQgPSBkb2MuZG9jdW1lbnRFbGVtZW50IHx8XG5cdFx0XHRcdGRvYy5nZXREb2N1bWVudEVsZW1lbnQgJiYgZG9jLmdldERvY3VtZW50RWxlbWVudCgpO1xuXG5cdFx0Ly8gSWYgd2UncmUgZGVhbGluZyB3aXRoIGFuIGVtcHR5IGRvY3VtZW50IHRoZW4gd2Vcblx0XHQvLyBuZWVkIHRvIHByZS1wb3B1bGF0ZSBpdCB3aXRoIHRoZSBIVE1MIGRvY3VtZW50IHN0cnVjdHVyZVxuXHRcdGlmICggIWRvY3VtZW50RWxlbWVudCAmJiBkb2MuY3JlYXRlRWxlbWVudCApIChmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGh0bWwgPSBkb2MuY3JlYXRlRWxlbWVudChcImh0bWxcIik7XG5cdFx0XHR2YXIgaGVhZCA9IGRvYy5jcmVhdGVFbGVtZW50KFwiaGVhZFwiKTtcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoIGRvYy5jcmVhdGVFbGVtZW50KFwidGl0bGVcIikgKTtcblx0XHRcdGh0bWwuYXBwZW5kQ2hpbGQoIGhlYWQgKTtcblx0XHRcdGh0bWwuYXBwZW5kQ2hpbGQoIGRvYy5jcmVhdGVFbGVtZW50KFwiYm9keVwiKSApO1xuXHRcdFx0ZG9jLmFwcGVuZENoaWxkKCBodG1sICk7XG5cdFx0fSkoKTtcblxuXHRcdC8vIEZpbmQgYWxsIHRoZSB1bmlxdWUgZWxlbWVudHNcblx0XHRpZiAoIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSApXG5cdFx0XHRmb3IgKCB2YXIgaSBpbiBvbmUgKVxuXHRcdFx0XHRvbmVbIGkgXSA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSggaSApWzBdO1xuXG5cdFx0Ly8gSWYgd2UncmUgd29ya2luZyB3aXRoIGEgZG9jdW1lbnQsIGluamVjdCBjb250ZW50cyBpbnRvXG5cdFx0Ly8gdGhlIGJvZHkgZWxlbWVudFxuXHRcdHZhciBjdXJQYXJlbnROb2RlID0gb25lLmJvZHk7XG5cblx0XHRIVE1MUGFyc2VyKCBodG1sLCB7XG5cdFx0XHRzdGFydDogZnVuY3Rpb24oIHRhZ05hbWUsIGF0dHJzLCB1bmFyeSApIHtcblx0XHRcdFx0Ly8gSWYgaXQncyBhIHByZS1idWlsdCBlbGVtZW50LCB0aGVuIHdlIGNhbiBpZ25vcmVcblx0XHRcdFx0Ly8gaXRzIGNvbnN0cnVjdGlvblxuXHRcdFx0XHRpZiAoIG9uZVsgdGFnTmFtZSBdICkge1xuXHRcdFx0XHRcdGN1clBhcmVudE5vZGUgPSBvbmVbIHRhZ05hbWUgXTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCB0YWdOYW1lICk7XG5cblx0XHRcdFx0Zm9yICggdmFyIGF0dHIgaW4gYXR0cnMgKVxuXHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBhdHRyc1sgYXR0ciBdLm5hbWUsIGF0dHJzWyBhdHRyIF0udmFsdWUgKTtcblxuXHRcdFx0XHRpZiAoIHN0cnVjdHVyZVsgdGFnTmFtZSBdICYmIHR5cGVvZiBvbmVbIHN0cnVjdHVyZVsgdGFnTmFtZSBdIF0gIT0gXCJib29sZWFuXCIgKVxuXHRcdFx0XHRcdG9uZVsgc3RydWN0dXJlWyB0YWdOYW1lIF0gXS5hcHBlbmRDaGlsZCggZWxlbSApO1xuXG5cdFx0XHRcdGVsc2UgaWYgKCBjdXJQYXJlbnROb2RlICYmIGN1clBhcmVudE5vZGUuYXBwZW5kQ2hpbGQgKVxuXHRcdFx0XHRcdGN1clBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoIGVsZW0gKTtcblxuXHRcdFx0XHRpZiAoICF1bmFyeSApIHtcblx0XHRcdFx0XHRlbGVtcy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0Y3VyUGFyZW50Tm9kZSA9IGVsZW07XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRlbmQ6IGZ1bmN0aW9uKCB0YWcgKSB7XG5cdFx0XHRcdGVsZW1zLmxlbmd0aCAtPSAxO1xuXG5cdFx0XHRcdC8vIEluaXQgdGhlIG5ldyBwYXJlbnROb2RlXG5cdFx0XHRcdGN1clBhcmVudE5vZGUgPSBlbGVtc1sgZWxlbXMubGVuZ3RoIC0gMSBdO1xuXHRcdFx0fSxcblx0XHRcdGNoYXJzOiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdFx0Y3VyUGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZVRleHROb2RlKCB0ZXh0ICkgKTtcblx0XHRcdH0sXG5cdFx0XHRjb21tZW50OiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdFx0Ly8gY3JlYXRlIGNvbW1lbnQgbm9kZVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGRvYztcblx0fTtcblxuXHRmdW5jdGlvbiBtYWtlTWFwKHN0cil7XG5cdFx0dmFyIG9iaiA9IHt9LCBpdGVtcyA9IHN0ci5zcGxpdChcIixcIik7XG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKysgKVxuXHRcdFx0b2JqWyBpdGVtc1tpXSBdID0gdHJ1ZTtcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0cmV0dXJuIEhUTUxQYXJzZXI7XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIERFRkFVTFRfUkVHRVggPSAvXihcXHtbXFxzXFxTXSo/XFxuXFx9KShcXHMqXFxuKSovO1xuXG4vKipcbiAqIFBhcnNlcyBKU09OIGZyb250IG1hdHRlciBmcm9tIHNwZWNpZmllZCBgc3RyaW5nYCwgcmV0dXJuaW5nIHRoZSBvYmplY3QgaXRzZWxmXG4gKiBhdWdtZW50ZWQgd2l0aCBgX19jb250ZW50X19gIHByb3BlcnR5ICh0aGlzIG5hbWUgaXMgY29uZmlndXJhYmxlIHZpYSBgYWxpYXNgIG9wdGlvbilcbiAqIHdoZXJlIHRoZSByZXN0IGNvbnRlbnQgcmVzaWRlcy5cbiAqXG4gKiBCeSBkZWZhdWx0IGl0IHBhcnNlcyBpbmRlbnRlZCBKU09OIChzdWNoIGFzIHRoZSBvbmUgeW91IGdldCB2aWFcbiAqIGBKU09OLnN0cmluZ2lmeShteW9iaiwgbnVsbCwgMilgLCBzbyBpdCBvbmx5IGxvb2tzIGZvciBhIHNpbmdsZSBjbG9zaW5nXG4gKiByaWdodCBicmFjZSBzaXR0aW5nIG9uIHRoZSBsaW5lIHN0YXJ0LlxuICogVGhlIHJlc3QgY29udGVudCBjYW4gYmUgZGVsaW1pdGVkIGZyb20gSlNPTiB1c2luZyBhcmJpdHJhcnlcbiAqIG51bWJlciBvZiBibGFuayBsaW5lcy5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAqIGBhbGlhc2Ag4oCUIHZhcmlhYmxlIG5hbWUgdG8gYXNzaWduIHRleHQgY29udGVudCB0byAoZGVmYXVsdCBpcyBgX19jb250ZW50X19gKVxuICogICogYHJlZ2V4YCDigJQgcmVnZXggZm9yIGNhcHR1cmluZyB0aGUgSlNPTiBvYmplY3QgYW5kIHN0cmlwcGluZyBpdCBhd2F5XG4gKiAgICBmcm9tIHRoZSByZXN0IGNvbnRlbnQ7IHRoZSBmaXJzdCBjYXB0dXJpbmcgZ3JvdXAgc2hvdWxkIGVuY2xvc2UgdGhlIEpTT04gb2JqZWN0XG4gKiAgICAoZGVmYXVsdCBpcyBgXihcXHtbXFxzXFxTXSo/XFxuXFx9KSg/OlxccypcXG4pKmApXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgc3RyaW5nXG4gKiBAcGFyYW0geyp9IG9wdGlvbnMg4oCUIG9wdGlvbnMgZGVzY3JpYmVkIGFib3ZlXG4gKi9cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoc3RyaW5nLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAvLyBjb25maWd1cmFibGVzXG4gIHZhciByZWdleCA9IG9wdGlvbnMucmVnZXggfHwgREVGQVVMVF9SRUdFWDtcbiAgdmFyIGFsaWFzID0gb3B0aW9ucy5hbGlhcyB8fCAnX19jb250ZW50X18nO1xuICAvLyBwYXJzZSBpdCBsaWtlIGEgcHJvXG4gIHZhciByZXN1bHQgPSB7fTtcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmVnZXgsIGZ1bmN0aW9uIChtYXRjaCwganNvbikge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9XG4gIH0pO1xuICByZXN1bHRbYWxpYXNdID0gc3RyaW5nO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZXZlcnNlIHBhcnNlOiByZW1vdmVzIGBfX2NvbnRlbnRfX2AgcHJvcGVydHkgZnJvbSB0aGUgYG9iamVjdGAgYW5kIGVtaXRzIGl0XG4gKiBhcyBpbmRlbnRlZCBKU09OOyB0aGVuIGFwcGVuZHMgdGhlIGBfX2NvbnRlbnRfX2AgcHJvcGVydHkgdG8gcmVzdWx0aW5nIHN0cmluZ1xuICogd2l0aCBvcHRpb25hbCBkZWxpbWl0ZXIgc3BlY2lmaWVkIHZpYSBgZGVsaW1pdGVyYCBvcHRpb25zIChieSBkZWZhdWx0IGEgc2luZ2xlXG4gKiBibGFuayBsaW5lIGlzIGluc2VydGVkKS5cbiAqXG4gKiBPcHRpb25zIGFyZTpcbiAqXG4gKiAgKiBgYWxpYXNgIOKAlCB2YXJpYWJsZSBuYW1lIGNvbnRhaW5pbmcgdGhlIHJlc3QgY29udGVudFxuICogICAgKGRlZmF1bHQgaXMgYF9fY29udGVudF9fYCwgbGlrZSBpbiBgcGFyc2VgKVxuICogICogYGRlbGltaXRlcmAg4oCUIGEgc3RyaW5nIHRvIGluc2VydCBiZXR3ZWVuIEpTT04gYW5kIHJlc3QgY29udGVudFxuICogICAgKGRlZmF1bHQgaXMgYFxcblxcbmApXG4gKlxuICogQHBhcmFtIHsqfSBvYmplY3Qg4oCUIG9iamVjdCB0byBzZXJpYWxpemU7XG4gKiBAcGFyYW0geyp9IG9wdGlvbnMg4oCUIG9wdGlvbnMgZGVzY3JpYmVkIGFib3ZlXG4gKi9cbmV4cG9ydHMuc2VyaWFsaXplID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgLy8gY29uZmlndXJhYmxlXG4gIHZhciBkZWxpbWl0ZXIgPSBvcHRpb25zLmRlbGltaXRlciB8fCAnXFxuXFxuJztcbiAgdmFyIGFsaWFzID0gb3B0aW9ucy5hbGlhcyB8fCAnX19jb250ZW50X18nO1xuICAvLyBFeHRyYWN0IHRoZSBjb250ZW50XG4gIHZhciBjb250ZW50ID0gb2JqZWN0W2FsaWFzXSB8fCAnJztcbiAgLy8gUHJvcGVydGllcyBhcmUgY29waWVkIG9udG8gdGhlIG5ldyBvYmplY3QgdG8gcHJldmVudCBzaWRlLWVmZmVjdHNcbiAgdmFyIG9iaiA9IHt9O1xuICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgIT0gYWxpYXMpXG4gICAgICBvYmpba2V5XSA9IG9iamVjdFtrZXldO1xuICB9KTtcbiAgLy8gV3JpdGUgdGhlbVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKSArIGRlbGltaXRlciArIGNvbnRlbnQ7XG59O1xuIiwiXG4ndXNlIHN0cmljdCc7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFUyA9IENVU1RPTSBTREsgW0N1c3RvbSBTb2Z0d2FyZSBEZXZlbG9wbWVudCBLaXRdXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIganNvbm1hdHRlciAgICA9IHJlcXVpcmUoJ2pzb24tbWF0dGVyJyk7XG52YXIgbWFya2VkICAgICAgICA9IHJlcXVpcmUoJ21hcmtlZCcpO1xudmFyIGh0bWwybWFya2Rvd24gPSByZXF1aXJlKCdodG1sMm1hcmtkb3duJyk7XG52YXIgbWV0aG9kICAgICAgICA9IHJlcXVpcmUoJ2V4ZW1ldGhvZCcpKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGI7fSlcbnZhciBmcyAgICAgICAgICAgID0gcmVxdWlyZSgnZnMnKTtcbnZhciBvcyAgICAgICAgICAgID0gcmVxdWlyZSgnb3MnKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlQgKyBbU2FuaXRpemUgJiBWYWxpZGF0ZV1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBhcmdzICAgICAgICAgID0gcHJvY2Vzcy5hcmd2LnNsaWNlKDIpO1xuZnVuY3Rpb24gc2V0SW5wdXQgKGVycm9yLCBtb2RlLCBzdHJpbmcsIGZpbGVuYW1lKSB7XG4gIGlmIChlcnJvcikgeyB0aHJvdyBlcnJvcjsgfVxuICB2YXIgJG1vZGUgICAgICAgPSBtb2RlO1xuICB2YXIgJHN0cmluZyAgICAgPSBzdHJpbmc7XG4gIHZhciAkZmlsZW5hbWUgICA9IGZpbGVuYW1lO1xufVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWFBPUlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8vIFJFUVVJUkVEIE1PRFVMRVxuaWYgKHsncmVxdWlyZWQnOnRydWUsJ2Jyb3dzZXJpZnknOnRydWV9W21ldGhvZF0pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSAge1xuICAgIHBhcnNlICAgICAgICAgICA6IHBhcnNlLFxuICAgIHNlcmlhbGl6ZSAgICAgICA6IHNlcmlhbGl6ZVxuICB9O1xufSBlbHNlIGlmICh7J25wbSc6dHJ1ZSwnc2NyaXB0Jzp0cnVlLCdnbG9iYWxjbGknOnRydWUsJ2xvY2FsY2xpJzp0cnVlfVttZXRob2RdKSB7XG4gIC8vICQgbm9kZSAtcCAtZSAncHJvY2Vzcy5zdGRpbi5pc1RUWScgLy8gPT4gdHJ1ZVxuICBpZiAocHJvY2Vzcy5zdGRpbi5pc1RUWSkge1xuICAgIC8vIFNFUlZFUiAkPiBjbGkgLS1zZXJ2ZXJcbiAgICBpZiAoYXJnc1swXSA9PT0gJy0tc2VydmVyJykge1xuICAgICAgY29uc29sZS5sb2coJ1NFUlZFUiB3aXRoIFJFUEwnKTtcbiAgICAgIGNvbnNvbGUubG9nKCdUbyBhYm9ydCBwcmVzczogQ1RSTCtEIG9yIENUUkwrQycpO1xuICAgICAgc2V0SW5wdXQobnVsbCwgYXJnc1swXSwgbnVsbCwgbnVsbCk7XG4gICAgICBzdGFydERlYW1vbigpO1xuICAgIC8vIENMSSAkPiBjbGkgLS1zZXJpYWxpemUgZmlsZW5hbWVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ05PUk1BTCBDTEkgRVhFQ1VUSU9OJyk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0BUT0RPOiBzZXJpYWxpemUvcGFyc2UgZnJvbSBjbGkgbm90IGltcGxlbWVudGVkIHlldCEnKTtcbiAgICAgIGlmIChhcmdzWzFdKSB7IC8vIENMSSArIDIgYXJnc1xuICAgICAgICBzZXRJbnB1dChudWxsLCBhcmdzWzBdLCBudWxsLCBhcmdzWzFdKTtcbiAgICAgIH0gZWxzZSBpZiAoYXJnc1swXSkgeyAvLyBDTEkgKyAxIGFyZ1xuICAgICAgICBzZXRJbnB1dChudWxsLCAnLS1wYXJzZScsIG51bGwsIGFyZ3NbMF0pO1xuICAgICAgfSBlbHNlIHsgLy8gQ0xJICsgbm8gYXJnc1xuICAgICAgICBzZXRJbnB1dChuZXcgRXJyb3IoJ0BUT0RPOiBhZGQgLS1oZWxwIG9wdGlvbiAmIHNob3cgd2hlbiBnaXZlbiBubyBhcmdzJykpO1xuICAgICAgfVxuICAgIH1cbiAgLy8gJCBlY2hvICdmb28nIHwgbm9kZSAtcCAtZSAncHJvY2Vzcy5zdGRpbi5pc1RUWScgLy8gPT4gdW5kZWZpbmVkXG4gIC8vIEBUT0RPOiAhISEhIE1heWJlIFwibWV0aG9kPSducG0nXCIgd2lsbCBub3QgY291bnQgYXMgbm9ybWFsIGNsaSBleGVjdXRpb24gISEhISAhISEhISEhISFcbiAgfSBlbHNlIGlmIChhcmdzWzBdID09PSAnLS1zZXJ2ZXInKSB7XG4gICAgc2V0SW5wdXQobmV3IEVycm9yKCdAVE9ETzogYWRkIHN0cmVhbSBpbnRvIHNlcnZlciBkZWFtb24gcHJvY2VzcycpKTtcbiAgLy8gUElQRURcbiAgfSBlbHNlIGlmIChhcmdzWzBdKSB7XG4gICAgdmFyICRtb2RlID0gYXJnc1swXTtcbiAgICBzdGFydFN0cmVhbSgpO1xuICAgIHN0YXJ0RGVhbW9uKCk7XG4gIH0gZWxzZSBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgdmFyICRtb2RlICAgICA9ICctLXBhcnNlJztcbiAgICBzdGFydFN0cmVhbSgpO1xuICAgIHN0YXJ0RGVhbW9uKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdAVE9ETzogd2hhdHMgd3JvbmcgaGVyZT8/PycpO1xuICB9XG59IGVsc2Uge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0BUT0RPOiB1bnN1cHBvcnRlZCBtZXRob2Q6ICcrbWV0aG9kKTtcbn1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUElQRSBTVFJFQU1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIHN0YXJ0U3RyZWFtICgpIHtcbiAgcHJvY2Vzcy5zdGRpbi5zZXRFbmNvZGluZygndXRmOCcpO1xuICBwcm9jZXNzLnN0ZGluLm9uKCdkYXRhJywgZnVuY3Rpb24oZGF0YSkge1xuICAgIHJldHVybiB7XG4gICAgICBcIi0tcGFyc2VcIiAgICAgOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBwYXJzZShzdHJpbmcpO1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpKTtcbiAgICAgIH0sXG4gICAgICBcIi0tc2VyaWFsaXplXCIgOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBzZXJpYWxpemUoSlNPTi5wYXJzZShzdHJpbmcpKTtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9WyRtb2RlXShkYXRhKTtcbiAgfSk7XG59XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFVOSVggU0lHTkFMU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gc3RhcnREZWFtb24gKCkge1xuICAvLyBwcyBhdXggfCBncmVwIHlvdXJzY3JpcHRcbiAgLy8ga2lsbCAtcyBTSUdJTlQgW3Byb2Nlc3NfaWRdXG4gIHByb2Nlc3Muc3RkaW4ucmVzdW1lKCk7XG4gIHByb2Nlc3Mub24oJ1NJR0lOVCcsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAvLyBBbiBlYXN5IHdheSB0byBzZW5kIHRoZSBTSUdJTlQgc2lnbmFsIGlzIHdpdGggQ29udHJvbC1DIGluIG1vc3QgdGVybWluYWwgcHJvZ3JhbXMuXG4gICAgLy8gTm90ZTpcbiAgICAvLyAgIFNJR1VTUjEgaXMgcmVzZXJ2ZWQgYnkgbm9kZS5qcyB0byBzdGFydCB0aGUgZGVidWdnZXIuIEl0J3MgcG9zc2libGUgdG8gaW5zdGFsbCBhIGxpc3RlbmVyIGJ1dCB0aGF0IHdvbid0IHN0b3AgdGhlIGRlYnVnZ2VyIGZyb20gc3RhcnRpbmcuXG4gICAgLy8gICBTSUdURVJNIGFuZCBTSUdJTlQgaGF2ZSBkZWZhdWx0IGhhbmRsZXJzIG9uIG5vbi1XaW5kb3dzIHBsYXRmb3JtcyB0aGF0IHJlc2V0cyB0aGUgdGVybWluYWwgbW9kZSBiZWZvcmUgZXhpdGluZyB3aXRoIGNvZGUgMTI4ICsgc2lnbmFsIG51bWJlci4gSWYgb25lIG9mIHRoZXNlIHNpZ25hbHMgaGFzIGEgbGlzdGVuZXIgaW5zdGFsbGVkLCBpdHMgZGVmYXVsdCBiZWhhdmlvdXIgd2lsbCBiZSByZW1vdmVkIChub2RlIHdpbGwgbm8gbG9uZ2VyIGV4aXQpLlxuICAgIC8vICAgU0lHUElQRSBpcyBpZ25vcmVkIGJ5IGRlZmF1bHQsIGl0IGNhbiBoYXZlIGEgbGlzdGVuZXIgaW5zdGFsbGVkLlxuICAgIC8vICAgU0lHSFVQIGlzIGdlbmVyYXRlZCBvbiBXaW5kb3dzIHdoZW4gdGhlIGNvbnNvbGUgd2luZG93IGlzIGNsb3NlZCwgYW5kIG9uIG90aGVyIHBsYXRmb3JtcyB1bmRlciB2YXJpb3VzIHNpbWlsYXIgY29uZGl0aW9ucywgc2VlIHNpZ25hbCg3KS4gSXQgY2FuIGhhdmUgYSBsaXN0ZW5lciBpbnN0YWxsZWQsIGhvd2V2ZXIgbm9kZSB3aWxsIGJlIHVuY29uZGl0aW9uYWxseSB0ZXJtaW5hdGVkIGJ5IFdpbmRvd3MgYWJvdXQgMTAgc2Vjb25kcyBsYXRlci4gT24gbm9uLVdpbmRvd3MgcGxhdGZvcm1zLCB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgU0lHSFVQIGlzIHRvIHRlcm1pbmF0ZSBub2RlLCBidXQgb25jZSBhIGxpc3RlbmVyIGhhcyBiZWVuIGluc3RhbGxlZCBpdHMgZGVmYXVsdCBiZWhhdmlvdXIgd2lsbCBiZSByZW1vdmVkLlxuICAgIC8vICAgU0lHVEVSTSBpcyBub3Qgc3VwcG9ydGVkIG9uIFdpbmRvd3MsIGl0IGNhbiBiZSBsaXN0ZW5lZCBvbi5cbiAgICAvLyAgIFNJR0lOVCBmcm9tIHRoZSB0ZXJtaW5hbCBpcyBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3JtcywgYW5kIGNhbiB1c3VhbGx5IGJlIGdlbmVyYXRlZCB3aXRoIENUUkwrQyAodGhvdWdoIHRoaXMgbWF5IGJlIGNvbmZpZ3VyYWJsZSkuIEl0IGlzIG5vdCBnZW5lcmF0ZWQgd2hlbiB0ZXJtaW5hbCByYXcgbW9kZSBpcyBlbmFibGVkLlxuICAgIC8vICAgU0lHQlJFQUsgaXMgZGVsaXZlcmVkIG9uIFdpbmRvd3Mgd2hlbiBDVFJMK0JSRUFLIGlzIHByZXNzZWQsIG9uIG5vbi1XaW5kb3dzIHBsYXRmb3JtcyBpdCBjYW4gYmUgbGlzdGVuZWQgb24sIGJ1dCB0aGVyZSBpcyBubyB3YXkgdG8gc2VuZCBvciBnZW5lcmF0ZSBpdC5cbiAgICAvLyAgIFNJR1dJTkNIIGlzIGRlbGl2ZXJlZCB3aGVuIHRoZSBjb25zb2xlIGhhcyBiZWVuIHJlc2l6ZWQuIE9uIFdpbmRvd3MsIHRoaXMgd2lsbCBvbmx5IGhhcHBlbiBvbiB3cml0ZSB0byB0aGUgY29uc29sZSB3aGVuIHRoZSBjdXJzb3IgaXMgYmVpbmcgbW92ZWQsIG9yIHdoZW4gYSByZWFkYWJsZSB0dHkgaXMgdXNlZCBpbiByYXcgbW9kZS5cbiAgICAvLyAgIFNJR0tJTEwgY2Fubm90IGhhdmUgYSBsaXN0ZW5lciBpbnN0YWxsZWQsIGl0IHdpbGwgdW5jb25kaXRpb25hbGx5IHRlcm1pbmF0ZSBub2RlIG9uIGFsbCBwbGF0Zm9ybXMuXG4gICAgLy8gICBTSUdTVE9QIGNhbm5vdCBoYXZlIGEgbGlzdGVuZXIgaW5zdGFsbGVkLlxuICAgIC8vICAgTm90ZSB0aGF0IFdpbmRvd3MgZG9lcyBub3Qgc3VwcG9ydCBzZW5kaW5nIFNpZ25hbHMsIGJ1dCBub2RlIG9mZmVycyBzb21lIGVtdWxhdGlvbiB3aXRoIHByb2Nlc3Mua2lsbCgpLCBhbmQgY2hpbGRfcHJvY2Vzcy5raWxsKCk6IC0gU2VuZGluZyBzaWduYWwgMCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIHRoZSBleGlzdGVuY2Ugb2YgYSBwcm9jZXNzIC0gU2VuZGluZyBTSUdJTlQsIFNJR1RFUk0sIGFuZCBTSUdLSUxMIGNhdXNlIHRoZSB1bmNvbmRpdGlvbmFsIGV4aXQgb2YgdGhlIHRhcmdldCBwcm9jZXNzLlxuICAgIGNvbnNvbGUubG9nKCdHb3QgYSBTSUdJTlQuIEdvb2RieWUgY3J1ZWwgd29ybGQuJyk7XG4gICAgaWYgKGVycikge1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfVxuICB9KTtcbn1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgTU9EVUxFIElOVEVSTkFMUyAmIEhFTFBFUlNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIHBhcnNlIChzdHJpbmcpIHtcbiAgdmFyIHJlc3VsdCA9IGpzb25tYXR0ZXIucGFyc2Uoc3RyaW5nLCB7XG4gICAgcmVnZXg6IC9eW1xcc1xcdFxcblxccl0qLS0tezF9W1xcc1xcdFxcblxccl0qKFxce1tcXHNcXFNdKlxcfVtcXHNcXHRcXG5cXHJdKikoLS0tezF9KS9cbiAgfSk7XG4gIHZhciBtYXJrZG93biAgICAgICAgPSByZXN1bHQuX19jb250ZW50X187XG4gIHZhciBodG1sICAgICAgICAgICAgPSBtYXJrZWQobWFya2Rvd24pLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiXCIpO1xuICByZXN1bHQuX19jb250ZW50X18gID0gcGF0Y2goaHRtbCwgcmVzdWx0LmN1c3RvbSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBzZXJpYWxpemUgKG9iamVjdCkge1xuICB2YXIgaHRtbCAgICA9IG9iamVjdC5fX2NvbnRlbnRfXztcbiAgaHRtbCAgICAgICAgPSB1bnBhdGNoKGh0bWwsIG9iamVjdC5jdXN0b20pO1xuICBvYmplY3QuX19jb250ZW50X18gID0gaHRtbDJtYXJrZG93bihodG1sKTtcbiAgdmFyIHJlc3VsdCAgPSBqc29ubWF0dGVyLnNlcmlhbGl6ZShvYmplY3QsIHtcbiAgICBkZWxpbWl0ZXI6IG9zLkVPTCsnLS0tJytvcy5FT0wrb3MuRU9MXG4gIH0pO1xuICByZXR1cm4gJy0tLScgKyBvcy5FT0wgKyByZXN1bHQ7XG59XG5mdW5jdGlvbiB1bnBhdGNoIChodG1sLCBjdXN0b20pIHtcbiAgLy8gZm9yICh2YXIga2V5IGluIGN1c3RvbSkge1xuICAvLyAgIHZhciBodG1sc3RyaW5nID0gY3VzdG9tW2tleV07XG4gIC8vICAgZm9yICh2YXIgb2xkOyBvbGQgIT0gaHRtbDspe1xuICAvLyAgICAgb2xkID0gaHRtbDtcbiAgLy8gICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoXG4gIC8vICAgICAgIGh0bWxzdHJpbmcsXG4gIC8vICAgICAgICc8YSBocmVmPVwiKCcra2V5KycpXCI+e3snK2tleS5zdWJzdHIoMixrZXkubGVuZ3RoKSsnfX08L2E+J1xuICAvLyAgICAgKTtcbiAgLy8gICB9XG4gIC8vIH1cbiAgaWYgKGN1c3RvbSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQFRPRE86IGh0bWwybWFya2Rvd24gcGFyc2VyIGlzIHRvbyBzbWFydCAtIHNvIG5vdCB5ZXQgaW1wbGVtZW50ZWQgLSBvcGVuIGFuIGlzc3VlIGlmIHlvdSBuZWVkIGl0IHRvIGJlIHNvbHZlZCcpXG4gIH1cbiAgLy8gcmV0dXJuIGh0bWw7XG59XG5mdW5jdGlvbiBwYXRjaCAoaHRtbCwgY3VzdG9tKSB7XG4gIGZvciAodmFyIGtleSBpbiBjdXN0b20pIHtcbiAgICB2YXIgcmVneCA9IG5ldyBSZWdFeHAoJzxhIGhyZWY9XCIoJyArIGtleSArICcpXCI+W148Pl0qPFxcL2E+JywgJ2cnKTtcbiAgICBodG1sID0gaHRtbC5yZXBsYWNlKHJlZ3gsIGZ1bmN0aW9uIChtYXRjaCwgY29udGVudHMsIG9mZnNldCwgcykge1xuICAgICAgcmV0dXJuIGN1c3RvbVtrZXldO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBodG1sO1xufVxuIiwiXG4ndXNlIHN0cmljdCc7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFUyA9IENVU1RPTSBTREsgW0N1c3RvbSBTb2Z0d2FyZSBEZXZlbG9wbWVudCBLaXRdXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBQQVJBTUVURVIgPSBBUkdVTUVOVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBubyBjbGkgdG9vbFxuICAvLyAkcGFyYW1OYW1lID0gcHJvY2Vzcy5hcmd2WzJdO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBNT0RVTEUgSU5URVJOQUxTICYgSEVMUEVSU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gcmV0dXJuTWVzc2FnZSAobXNnLCBtZXRob2QpIHtcbiAgY29uc29sZS5sb2coJz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuICBjb25zb2xlLmxvZyhtc2cpO1xuICBjb25zb2xlLmxvZygnPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyk7XG4gIHJldHVybiBtZXRob2Q7XG59XG5mdW5jdGlvbiBleGVtZXRob2QgKGxvZ2dlcikge1xuICAvLyBsb2dnZXI6IGZ1bmN0aW9uIChtc2csIG1ldGhvZCkgeyAvKmxvZyBoZXJlKi8gcmV0dXJuIG1ldGhvZDsgfVxuICAvLyByZXR1cm4gW25wbXxzY3JpcHR8Z2xvYmFsY2xpfGxvY2FsY2xpfHJlcXVpcmVkfGJyb3dzZXJpZnldXG4gIGxvZ2dlciA9IGxvZ2dlciA/IGxvZ2dlciA6IHJldHVybk1lc3NhZ2U7XG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnbGludXgnKSB7XG4gICAgdmFyIGlzTGludXggICAgICAgICA9IHRydWU7XG4gIH0gZWxzZSBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcbiAgICB2YXIgaXNNYWMgICAgICAgICAgID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChwcm9jZXNzLnBsYXRmb3JtKSB7XG4gICAgdmFyIGlzV2luZG93cyAgICAgICA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGlzQnJvd3NlcmlmaWVkICA9IHByb2Nlc3MudGl0bGUgPT09ICdicm93c2VyJztcbiAgfVxuICB2YXIgaXNOb2RlICAgICAgICAgICAgPSAhaXNCcm93c2VyaWZpZWQ7XG4gIGlmIChpc05vZGUpIHtcbiAgICB2YXIgaXNSZXF1aXJlZCAgPSBtb2R1bGUucGFyZW50ID8gbW9kdWxlLnBhcmVudC5wYXJlbnQgPyB0cnVlOmZhbHNlOmZhbHNlO1xuICAgIHZhciBpc0NMSSAgICAgICA9ICFpc1JlcXVpcmVkO1xuICAgIGlmIChpc0NMSSkge1xuICAgICAgdmFyIGZ1bGxwYXRoICA9IHByb2Nlc3MuZW52Ll8uc3BsaXQocGF0aC5zZXApO1xuICAgICAgdmFyIGRpciAgICAgICA9IGZ1bGxwYXRoWzBdO1xuICAgICAgdmFyIGNtZCAgICAgICA9IGZ1bGxwYXRoW2Z1bGxwYXRoLmxlbmd0aC0xXTtcbiAgICAgIHZhciBpc0xvY2FsICAgPSBjbWQgPT09ICdub2RlJyB8fCBjbWQgPT09ICdpb2pzJztcbiAgICAgIHZhciBpc1NjcmlwdCAgPSBkaXIgPT09ICcuJztcbiAgICAgIHZhciBpc05QTSAgICAgPSBjbWQgPT09ICducG0nO1xuICAgICAgdmFyIGlzR2xvYmFsICA9ICFpc0xvY2FsO1xuICAgICAgaWYgKGlzTlBNKSB7XG4gICAgICAgIHJldHVybiBsb2dnZXIoJ0VYRUMgQVM6IG5wbSBydW4gLi4uJywgJ25wbScpO1xuICAgICAgfSBlbHNlIGlmIChpc1NjcmlwdCkge1xuICAgICAgICByZXR1cm4gbG9nZ2VyKCdFWEVDIEFTOiBzdGFuZGFsb25lIHNjcmlwdCcsICdzY3JpcHQnKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNHbG9iYWwpIHtcbiAgICAgICAgcmV0dXJuIGxvZ2dlcignRVhFQyBBUzogbm9kZSBjbGkgZ2xvYmFsJywgJ2dsb2JhbGNsaScpO1xuICAgICAgfSBlbHNlIGlmIChpc0xvY2FsKXtcbiAgICAgICAgcmV0dXJuIGxvZ2dlcignRVhFQyBBUzogbm9kZSBjbGkgbG9jYWwnLCAnbG9jYWxjbGknKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgIHJldHVybiBsb2dnZXIoJ0VYRUMgQVM6IG5vZGUgcmVxdWlyZWQoLi4uKScsICdyZXF1aXJlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1cnJlbnQgdXNhZ2Ugbm90IHN1cHBvcnRlZC4gW3dlaXJkIG5vZGUgdXNhZ2VdJyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQnJvd3NlcmlmaWVkKSB7XG4gICAgdmFyIGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuICAgIGlmIChpc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybiBsb2dnZXIoJ0VYRUMgQVM6IGJyb3dzZXIgcmVxdWlyZWQoLi4uKScsICdicm93c2VyaWZ5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ3VycmVudCB1c2FnZSBub3Qgc3VwcG9ydGVkLiBbYnJvd3NlcmlmaWVkIGNsaV0nKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDdXJyZW50IHVzYWdlIG5vdCBzdXBwb3J0ZWQuIFt1bmtub3duIGVudmlyb25tZW50XScpO1xuICB9XG59XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYUE9SVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgPSBleGVtZXRob2Q7XG4iLCIvKipcbiAqIG1hcmtlZCAtIGEgbWFya2Rvd24gcGFyc2VyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxNCwgQ2hyaXN0b3BoZXIgSmVmZnJleS4gKE1JVCBMaWNlbnNlZClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGpqL21hcmtlZFxuICovXG5cbjsoZnVuY3Rpb24oKSB7XG5cbi8qKlxuICogQmxvY2stTGV2ZWwgR3JhbW1hclxuICovXG5cbnZhciBibG9jayA9IHtcbiAgbmV3bGluZTogL15cXG4rLyxcbiAgY29kZTogL14oIHs0fVteXFxuXStcXG4qKSsvLFxuICBmZW5jZXM6IG5vb3AsXG4gIGhyOiAvXiggKlstKl9dKXszLH0gKig/Olxcbit8JCkvLFxuICBoZWFkaW5nOiAvXiAqKCN7MSw2fSkgKihbXlxcbl0rPykgKiMqICooPzpcXG4rfCQpLyxcbiAgbnB0YWJsZTogbm9vcCxcbiAgbGhlYWRpbmc6IC9eKFteXFxuXSspXFxuICooPXwtKXsyLH0gKig/Olxcbit8JCkvLFxuICBibG9ja3F1b3RlOiAvXiggKj5bXlxcbl0rKFxcbig/IWRlZilbXlxcbl0rKSpcXG4qKSsvLFxuICBsaXN0OiAvXiggKikoYnVsbCkgW1xcc1xcU10rPyg/OmhyfGRlZnxcXG57Mix9KD8hICkoPyFcXDFidWxsIClcXG4qfFxccyokKS8sXG4gIGh0bWw6IC9eICooPzpjb21tZW50ICooPzpcXG58XFxzKiQpfGNsb3NlZCAqKD86XFxuezIsfXxcXHMqJCl8Y2xvc2luZyAqKD86XFxuezIsfXxcXHMqJCkpLyxcbiAgZGVmOiAvXiAqXFxbKFteXFxdXSspXFxdOiAqPD8oW15cXHM+XSspPj8oPzogK1tcIihdKFteXFxuXSspW1wiKV0pPyAqKD86XFxuK3wkKS8sXG4gIHRhYmxlOiBub29wLFxuICBwYXJhZ3JhcGg6IC9eKCg/OlteXFxuXStcXG4/KD8haHJ8aGVhZGluZ3xsaGVhZGluZ3xibG9ja3F1b3RlfHRhZ3xkZWYpKSspXFxuKi8sXG4gIHRleHQ6IC9eW15cXG5dKy9cbn07XG5cbmJsb2NrLmJ1bGxldCA9IC8oPzpbKistXXxcXGQrXFwuKS87XG5ibG9jay5pdGVtID0gL14oICopKGJ1bGwpIFteXFxuXSooPzpcXG4oPyFcXDFidWxsIClbXlxcbl0qKSovO1xuYmxvY2suaXRlbSA9IHJlcGxhY2UoYmxvY2suaXRlbSwgJ2dtJylcbiAgKC9idWxsL2csIGJsb2NrLmJ1bGxldClcbiAgKCk7XG5cbmJsb2NrLmxpc3QgPSByZXBsYWNlKGJsb2NrLmxpc3QpXG4gICgvYnVsbC9nLCBibG9jay5idWxsZXQpXG4gICgnaHInLCAnXFxcXG4rKD89XFxcXDE/KD86Wy0qX10gKil7Myx9KD86XFxcXG4rfCQpKScpXG4gICgnZGVmJywgJ1xcXFxuKyg/PScgKyBibG9jay5kZWYuc291cmNlICsgJyknKVxuICAoKTtcblxuYmxvY2suYmxvY2txdW90ZSA9IHJlcGxhY2UoYmxvY2suYmxvY2txdW90ZSlcbiAgKCdkZWYnLCBibG9jay5kZWYpXG4gICgpO1xuXG5ibG9jay5fdGFnID0gJyg/ISg/OidcbiAgKyAnYXxlbXxzdHJvbmd8c21hbGx8c3xjaXRlfHF8ZGZufGFiYnJ8ZGF0YXx0aW1lfGNvZGUnXG4gICsgJ3x2YXJ8c2FtcHxrYmR8c3VifHN1cHxpfGJ8dXxtYXJrfHJ1Ynl8cnR8cnB8YmRpfGJkbydcbiAgKyAnfHNwYW58YnJ8d2JyfGluc3xkZWx8aW1nKVxcXFxiKVxcXFx3Kyg/ITovfFteXFxcXHdcXFxcc0BdKkApXFxcXGInO1xuXG5ibG9jay5odG1sID0gcmVwbGFjZShibG9jay5odG1sKVxuICAoJ2NvbW1lbnQnLCAvPCEtLVtcXHNcXFNdKj8tLT4vKVxuICAoJ2Nsb3NlZCcsIC88KHRhZylbXFxzXFxTXSs/PFxcL1xcMT4vKVxuICAoJ2Nsb3NpbmcnLCAvPHRhZyg/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXidcIj5dKSo/Pi8pXG4gICgvdGFnL2csIGJsb2NrLl90YWcpXG4gICgpO1xuXG5ibG9jay5wYXJhZ3JhcGggPSByZXBsYWNlKGJsb2NrLnBhcmFncmFwaClcbiAgKCdocicsIGJsb2NrLmhyKVxuICAoJ2hlYWRpbmcnLCBibG9jay5oZWFkaW5nKVxuICAoJ2xoZWFkaW5nJywgYmxvY2subGhlYWRpbmcpXG4gICgnYmxvY2txdW90ZScsIGJsb2NrLmJsb2NrcXVvdGUpXG4gICgndGFnJywgJzwnICsgYmxvY2suX3RhZylcbiAgKCdkZWYnLCBibG9jay5kZWYpXG4gICgpO1xuXG4vKipcbiAqIE5vcm1hbCBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2subm9ybWFsID0gbWVyZ2Uoe30sIGJsb2NrKTtcblxuLyoqXG4gKiBHRk0gQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLmdmbSA9IG1lcmdlKHt9LCBibG9jay5ub3JtYWwsIHtcbiAgZmVuY2VzOiAvXiAqKGB7Myx9fH57Myx9KSAqKFxcUyspPyAqXFxuKFtcXHNcXFNdKz8pXFxzKlxcMSAqKD86XFxuK3wkKS8sXG4gIHBhcmFncmFwaDogL14vXG59KTtcblxuYmxvY2suZ2ZtLnBhcmFncmFwaCA9IHJlcGxhY2UoYmxvY2sucGFyYWdyYXBoKVxuICAoJyg/IScsICcoPyEnXG4gICAgKyBibG9jay5nZm0uZmVuY2VzLnNvdXJjZS5yZXBsYWNlKCdcXFxcMScsICdcXFxcMicpICsgJ3wnXG4gICAgKyBibG9jay5saXN0LnNvdXJjZS5yZXBsYWNlKCdcXFxcMScsICdcXFxcMycpICsgJ3wnKVxuICAoKTtcblxuLyoqXG4gKiBHRk0gKyBUYWJsZXMgQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLnRhYmxlcyA9IG1lcmdlKHt9LCBibG9jay5nZm0sIHtcbiAgbnB0YWJsZTogL14gKihcXFMuKlxcfC4qKVxcbiAqKFstOl0rICpcXHxbLXwgOl0qKVxcbigoPzouKlxcfC4qKD86XFxufCQpKSopXFxuKi8sXG4gIHRhYmxlOiAvXiAqXFx8KC4rKVxcbiAqXFx8KCAqWy06XStbLXwgOl0qKVxcbigoPzogKlxcfC4qKD86XFxufCQpKSopXFxuKi9cbn0pO1xuXG4vKipcbiAqIEJsb2NrIExleGVyXG4gKi9cblxuZnVuY3Rpb24gTGV4ZXIob3B0aW9ucykge1xuICB0aGlzLnRva2VucyA9IFtdO1xuICB0aGlzLnRva2Vucy5saW5rcyA9IHt9O1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5ydWxlcyA9IGJsb2NrLm5vcm1hbDtcblxuICBpZiAodGhpcy5vcHRpb25zLmdmbSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGFibGVzKSB7XG4gICAgICB0aGlzLnJ1bGVzID0gYmxvY2sudGFibGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzID0gYmxvY2suZ2ZtO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBCbG9jayBSdWxlc1xuICovXG5cbkxleGVyLnJ1bGVzID0gYmxvY2s7XG5cbi8qKlxuICogU3RhdGljIExleCBNZXRob2RcbiAqL1xuXG5MZXhlci5sZXggPSBmdW5jdGlvbihzcmMsIG9wdGlvbnMpIHtcbiAgdmFyIGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICByZXR1cm4gbGV4ZXIubGV4KHNyYyk7XG59O1xuXG4vKipcbiAqIFByZXByb2Nlc3NpbmdcbiAqL1xuXG5MZXhlci5wcm90b3R5cGUubGV4ID0gZnVuY3Rpb24oc3JjKSB7XG4gIHNyYyA9IHNyY1xuICAgIC5yZXBsYWNlKC9cXHJcXG58XFxyL2csICdcXG4nKVxuICAgIC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKVxuICAgIC5yZXBsYWNlKC9cXHUwMGEwL2csICcgJylcbiAgICAucmVwbGFjZSgvXFx1MjQyNC9nLCAnXFxuJyk7XG5cbiAgcmV0dXJuIHRoaXMudG9rZW4oc3JjLCB0cnVlKTtcbn07XG5cbi8qKlxuICogTGV4aW5nXG4gKi9cblxuTGV4ZXIucHJvdG90eXBlLnRva2VuID0gZnVuY3Rpb24oc3JjLCB0b3AsIGJxKSB7XG4gIHZhciBzcmMgPSBzcmMucmVwbGFjZSgvXiArJC9nbSwgJycpXG4gICAgLCBuZXh0XG4gICAgLCBsb29zZVxuICAgICwgY2FwXG4gICAgLCBidWxsXG4gICAgLCBiXG4gICAgLCBpdGVtXG4gICAgLCBzcGFjZVxuICAgICwgaVxuICAgICwgbDtcblxuICB3aGlsZSAoc3JjKSB7XG4gICAgLy8gbmV3bGluZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLm5ld2xpbmUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgaWYgKGNhcFswXS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdzcGFjZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29kZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmNvZGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgY2FwID0gY2FwWzBdLnJlcGxhY2UoL14gezR9L2dtLCAnJyk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICB0ZXh0OiAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgICAgPyBjYXAucmVwbGFjZSgvXFxuKyQvLCAnJylcbiAgICAgICAgICA6IGNhcFxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBmZW5jZXMgKGdmbSlcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5mZW5jZXMuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdjb2RlJyxcbiAgICAgICAgbGFuZzogY2FwWzJdLFxuICAgICAgICB0ZXh0OiBjYXBbM11cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaGVhZGluZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmhlYWRpbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAgICAgZGVwdGg6IGNhcFsxXS5sZW5ndGgsXG4gICAgICAgIHRleHQ6IGNhcFsyXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWJsZSBubyBsZWFkaW5nIHBpcGUgKGdmbSlcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLm5wdGFibGUuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgaXRlbSA9IHtcbiAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgaGVhZGVyOiBjYXBbMV0ucmVwbGFjZSgvXiAqfCAqXFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBhbGlnbjogY2FwWzJdLnJlcGxhY2UoL14gKnxcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGNlbGxzOiBjYXBbM10ucmVwbGFjZSgvXFxuJC8sICcnKS5zcGxpdCgnXFxuJylcbiAgICAgIH07XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmFsaWduLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdyaWdodCc7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKyAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbS5jZWxsc1tpXSA9IGl0ZW0uY2VsbHNbaV0uc3BsaXQoLyAqXFx8ICovKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaChpdGVtKTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGhlYWRpbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saGVhZGluZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBkZXB0aDogY2FwWzJdID09PSAnPScgPyAxIDogMixcbiAgICAgICAgdGV4dDogY2FwWzFdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGhyXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaHIuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdocidcbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYmxvY2txdW90ZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrcXVvdGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGVfc3RhcnQnXG4gICAgICB9KTtcblxuICAgICAgY2FwID0gY2FwWzBdLnJlcGxhY2UoL14gKj4gPy9nbSwgJycpO1xuXG4gICAgICAvLyBQYXNzIGB0b3BgIHRvIGtlZXAgdGhlIGN1cnJlbnRcbiAgICAgIC8vIFwidG9wbGV2ZWxcIiBzdGF0ZS4gVGhpcyBpcyBleGFjdGx5XG4gICAgICAvLyBob3cgbWFya2Rvd24ucGwgd29ya3MuXG4gICAgICB0aGlzLnRva2VuKGNhcCwgdG9wLCB0cnVlKTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdibG9ja3F1b3RlX2VuZCdcbiAgICAgIH0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaXN0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubGlzdC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBidWxsID0gY2FwWzJdO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpc3Rfc3RhcnQnLFxuICAgICAgICBvcmRlcmVkOiBidWxsLmxlbmd0aCA+IDFcbiAgICAgIH0pO1xuXG4gICAgICAvLyBHZXQgZWFjaCB0b3AtbGV2ZWwgaXRlbS5cbiAgICAgIGNhcCA9IGNhcFswXS5tYXRjaCh0aGlzLnJ1bGVzLml0ZW0pO1xuXG4gICAgICBuZXh0ID0gZmFsc2U7XG4gICAgICBsID0gY2FwLmxlbmd0aDtcbiAgICAgIGkgPSAwO1xuXG4gICAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpdGVtID0gY2FwW2ldO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgbGlzdCBpdGVtJ3MgYnVsbGV0XG4gICAgICAgIC8vIHNvIGl0IGlzIHNlZW4gYXMgdGhlIG5leHQgdG9rZW4uXG4gICAgICAgIHNwYWNlID0gaXRlbS5sZW5ndGg7XG4gICAgICAgIGl0ZW0gPSBpdGVtLnJlcGxhY2UoL14gKihbKistXXxcXGQrXFwuKSArLywgJycpO1xuXG4gICAgICAgIC8vIE91dGRlbnQgd2hhdGV2ZXIgdGhlXG4gICAgICAgIC8vIGxpc3QgaXRlbSBjb250YWlucy4gSGFja3kuXG4gICAgICAgIGlmICh+aXRlbS5pbmRleE9mKCdcXG4gJykpIHtcbiAgICAgICAgICBzcGFjZSAtPSBpdGVtLmxlbmd0aDtcbiAgICAgICAgICBpdGVtID0gIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICAgICAgPyBpdGVtLnJlcGxhY2UobmV3IFJlZ0V4cCgnXiB7MSwnICsgc3BhY2UgKyAnfScsICdnbScpLCAnJylcbiAgICAgICAgICAgIDogaXRlbS5yZXBsYWNlKC9eIHsxLDR9L2dtLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciB0aGUgbmV4dCBsaXN0IGl0ZW0gYmVsb25ncyBoZXJlLlxuICAgICAgICAvLyBCYWNrcGVkYWwgaWYgaXQgZG9lcyBub3QgYmVsb25nIGluIHRoaXMgbGlzdC5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zbWFydExpc3RzICYmIGkgIT09IGwgLSAxKSB7XG4gICAgICAgICAgYiA9IGJsb2NrLmJ1bGxldC5leGVjKGNhcFtpICsgMV0pWzBdO1xuICAgICAgICAgIGlmIChidWxsICE9PSBiICYmICEoYnVsbC5sZW5ndGggPiAxICYmIGIubGVuZ3RoID4gMSkpIHtcbiAgICAgICAgICAgIHNyYyA9IGNhcC5zbGljZShpICsgMSkuam9pbignXFxuJykgKyBzcmM7XG4gICAgICAgICAgICBpID0gbCAtIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgaXRlbSBpcyBsb29zZSBvciBub3QuXG4gICAgICAgIC8vIFVzZTogLyhefFxcbikoPyEgKVteXFxuXStcXG5cXG4oPyFcXHMqJCkvXG4gICAgICAgIC8vIGZvciBkaXNjb3VudCBiZWhhdmlvci5cbiAgICAgICAgbG9vc2UgPSBuZXh0IHx8IC9cXG5cXG4oPyFcXHMqJCkvLnRlc3QoaXRlbSk7XG4gICAgICAgIGlmIChpICE9PSBsIC0gMSkge1xuICAgICAgICAgIG5leHQgPSBpdGVtLmNoYXJBdChpdGVtLmxlbmd0aCAtIDEpID09PSAnXFxuJztcbiAgICAgICAgICBpZiAoIWxvb3NlKSBsb29zZSA9IG5leHQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBsb29zZVxuICAgICAgICAgICAgPyAnbG9vc2VfaXRlbV9zdGFydCdcbiAgICAgICAgICAgIDogJ2xpc3RfaXRlbV9zdGFydCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVjdXJzZS5cbiAgICAgICAgdGhpcy50b2tlbihpdGVtLCBmYWxzZSwgYnEpO1xuXG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdsaXN0X2l0ZW1fZW5kJ1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdsaXN0X2VuZCdcbiAgICAgIH0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBodG1sXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaHRtbC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogdGhpcy5vcHRpb25zLnNhbml0aXplXG4gICAgICAgICAgPyAncGFyYWdyYXBoJ1xuICAgICAgICAgIDogJ2h0bWwnLFxuICAgICAgICBwcmU6IGNhcFsxXSA9PT0gJ3ByZScgfHwgY2FwWzFdID09PSAnc2NyaXB0JyB8fCBjYXBbMV0gPT09ICdzdHlsZScsXG4gICAgICAgIHRleHQ6IGNhcFswXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBkZWZcbiAgICBpZiAoKCFicSAmJiB0b3ApICYmIChjYXAgPSB0aGlzLnJ1bGVzLmRlZi5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMubGlua3NbY2FwWzFdLnRvTG93ZXJDYXNlKCldID0ge1xuICAgICAgICBocmVmOiBjYXBbMl0sXG4gICAgICAgIHRpdGxlOiBjYXBbM11cbiAgICAgIH07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWJsZSAoZ2ZtKVxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMudGFibGUuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgaXRlbSA9IHtcbiAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgaGVhZGVyOiBjYXBbMV0ucmVwbGFjZSgvXiAqfCAqXFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBhbGlnbjogY2FwWzJdLnJlcGxhY2UoL14gKnxcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGNlbGxzOiBjYXBbM10ucmVwbGFjZSgvKD86ICpcXHwgKik/XFxuJC8sICcnKS5zcGxpdCgnXFxuJylcbiAgICAgIH07XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmFsaWduLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdyaWdodCc7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKyAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbS5jZWxsc1tpXSA9IGl0ZW0uY2VsbHNbaV1cbiAgICAgICAgICAucmVwbGFjZSgvXiAqXFx8ICp8ICpcXHwgKiQvZywgJycpXG4gICAgICAgICAgLnNwbGl0KC8gKlxcfCAqLyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goaXRlbSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRvcC1sZXZlbCBwYXJhZ3JhcGhcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLnBhcmFncmFwaC5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgICB0ZXh0OiBjYXBbMV0uY2hhckF0KGNhcFsxXS5sZW5ndGggLSAxKSA9PT0gJ1xcbidcbiAgICAgICAgICA/IGNhcFsxXS5zbGljZSgwLCAtMSlcbiAgICAgICAgICA6IGNhcFsxXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIC8vIFRvcC1sZXZlbCBzaG91bGQgbmV2ZXIgcmVhY2ggaGVyZS5cbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNyYykge1xuICAgICAgdGhyb3cgbmV3XG4gICAgICAgIEVycm9yKCdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMudG9rZW5zO1xufTtcblxuLyoqXG4gKiBJbmxpbmUtTGV2ZWwgR3JhbW1hclxuICovXG5cbnZhciBpbmxpbmUgPSB7XG4gIGVzY2FwZTogL15cXFxcKFtcXFxcYCp7fVxcW1xcXSgpIytcXC0uIV8+XSkvLFxuICBhdXRvbGluazogL148KFteID5dKyhAfDpcXC8pW14gPl0rKT4vLFxuICB1cmw6IG5vb3AsXG4gIHRhZzogL148IS0tW1xcc1xcU10qPy0tPnxePFxcLz9cXHcrKD86XCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj8+LyxcbiAgbGluazogL14hP1xcWyhpbnNpZGUpXFxdXFwoaHJlZlxcKS8sXG4gIHJlZmxpbms6IC9eIT9cXFsoaW5zaWRlKVxcXVxccypcXFsoW15cXF1dKilcXF0vLFxuICBub2xpbms6IC9eIT9cXFsoKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV0pKilcXF0vLFxuICBzdHJvbmc6IC9eX18oW1xcc1xcU10rPylfXyg/IV8pfF5cXCpcXCooW1xcc1xcU10rPylcXCpcXCooPyFcXCopLyxcbiAgZW06IC9eXFxiXygoPzpfX3xbXFxzXFxTXSkrPylfXFxifF5cXCooKD86XFwqXFwqfFtcXHNcXFNdKSs/KVxcKig/IVxcKikvLFxuICBjb2RlOiAvXihgKylcXHMqKFtcXHNcXFNdKj9bXmBdKVxccypcXDEoPyFgKS8sXG4gIGJyOiAvXiB7Mix9XFxuKD8hXFxzKiQpLyxcbiAgZGVsOiBub29wLFxuICB0ZXh0OiAvXltcXHNcXFNdKz8oPz1bXFxcXDwhXFxbXypgXXwgezIsfVxcbnwkKS9cbn07XG5cbmlubGluZS5faW5zaWRlID0gLyg/OlxcW1teXFxdXSpcXF18W15cXFtcXF1dfFxcXSg/PVteXFxbXSpcXF0pKSovO1xuaW5saW5lLl9ocmVmID0gL1xccyo8PyhbXFxzXFxTXSo/KT4/KD86XFxzK1snXCJdKFtcXHNcXFNdKj8pWydcIl0pP1xccyovO1xuXG5pbmxpbmUubGluayA9IHJlcGxhY2UoaW5saW5lLmxpbmspXG4gICgnaW5zaWRlJywgaW5saW5lLl9pbnNpZGUpXG4gICgnaHJlZicsIGlubGluZS5faHJlZilcbiAgKCk7XG5cbmlubGluZS5yZWZsaW5rID0gcmVwbGFjZShpbmxpbmUucmVmbGluaylcbiAgKCdpbnNpZGUnLCBpbmxpbmUuX2luc2lkZSlcbiAgKCk7XG5cbi8qKlxuICogTm9ybWFsIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLm5vcm1hbCA9IG1lcmdlKHt9LCBpbmxpbmUpO1xuXG4vKipcbiAqIFBlZGFudGljIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLnBlZGFudGljID0gbWVyZ2Uoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgc3Ryb25nOiAvXl9fKD89XFxTKShbXFxzXFxTXSo/XFxTKV9fKD8hXyl8XlxcKlxcKig/PVxcUykoW1xcc1xcU10qP1xcUylcXCpcXCooPyFcXCopLyxcbiAgZW06IC9eXyg/PVxcUykoW1xcc1xcU10qP1xcUylfKD8hXyl8XlxcKig/PVxcUykoW1xcc1xcU10qP1xcUylcXCooPyFcXCopL1xufSk7XG5cbi8qKlxuICogR0ZNIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLmdmbSA9IG1lcmdlKHt9LCBpbmxpbmUubm9ybWFsLCB7XG4gIGVzY2FwZTogcmVwbGFjZShpbmxpbmUuZXNjYXBlKSgnXSknLCAnfnxdKScpKCksXG4gIHVybDogL14oaHR0cHM/OlxcL1xcL1teXFxzPF0rW148Liw6O1wiJylcXF1cXHNdKS8sXG4gIGRlbDogL15+fig/PVxcUykoW1xcc1xcU10qP1xcUyl+fi8sXG4gIHRleHQ6IHJlcGxhY2UoaW5saW5lLnRleHQpXG4gICAgKCddfCcsICd+XXwnKVxuICAgICgnfCcsICd8aHR0cHM/Oi8vfCcpXG4gICAgKClcbn0pO1xuXG4vKipcbiAqIEdGTSArIExpbmUgQnJlYWtzIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLmJyZWFrcyA9IG1lcmdlKHt9LCBpbmxpbmUuZ2ZtLCB7XG4gIGJyOiByZXBsYWNlKGlubGluZS5icikoJ3syLH0nLCAnKicpKCksXG4gIHRleHQ6IHJlcGxhY2UoaW5saW5lLmdmbS50ZXh0KSgnezIsfScsICcqJykoKVxufSk7XG5cbi8qKlxuICogSW5saW5lIExleGVyICYgQ29tcGlsZXJcbiAqL1xuXG5mdW5jdGlvbiBJbmxpbmVMZXhlcihsaW5rcywgb3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5saW5rcyA9IGxpbmtzO1xuICB0aGlzLnJ1bGVzID0gaW5saW5lLm5vcm1hbDtcbiAgdGhpcy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlciB8fCBuZXcgUmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICBpZiAoIXRoaXMubGlua3MpIHtcbiAgICB0aHJvdyBuZXdcbiAgICAgIEVycm9yKCdUb2tlbnMgYXJyYXkgcmVxdWlyZXMgYSBgbGlua3NgIHByb3BlcnR5LicpO1xuICB9XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmJyZWFrcykge1xuICAgICAgdGhpcy5ydWxlcyA9IGlubGluZS5icmVha3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucnVsZXMgPSBpbmxpbmUuZ2ZtO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICB0aGlzLnJ1bGVzID0gaW5saW5lLnBlZGFudGljO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIElubGluZSBSdWxlc1xuICovXG5cbklubGluZUxleGVyLnJ1bGVzID0gaW5saW5lO1xuXG4vKipcbiAqIFN0YXRpYyBMZXhpbmcvQ29tcGlsaW5nIE1ldGhvZFxuICovXG5cbklubGluZUxleGVyLm91dHB1dCA9IGZ1bmN0aW9uKHNyYywgbGlua3MsIG9wdGlvbnMpIHtcbiAgdmFyIGlubGluZSA9IG5ldyBJbmxpbmVMZXhlcihsaW5rcywgb3B0aW9ucyk7XG4gIHJldHVybiBpbmxpbmUub3V0cHV0KHNyYyk7XG59O1xuXG4vKipcbiAqIExleGluZy9Db21waWxpbmdcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUub3V0cHV0ID0gZnVuY3Rpb24oc3JjKSB7XG4gIHZhciBvdXQgPSAnJ1xuICAgICwgbGlua1xuICAgICwgdGV4dFxuICAgICwgaHJlZlxuICAgICwgY2FwO1xuXG4gIHdoaWxlIChzcmMpIHtcbiAgICAvLyBlc2NhcGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5lc2NhcGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IGNhcFsxXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGF1dG9saW5rXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYXV0b2xpbmsuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgaWYgKGNhcFsyXSA9PT0gJ0AnKSB7XG4gICAgICAgIHRleHQgPSBjYXBbMV0uY2hhckF0KDYpID09PSAnOidcbiAgICAgICAgICA/IHRoaXMubWFuZ2xlKGNhcFsxXS5zdWJzdHJpbmcoNykpXG4gICAgICAgICAgOiB0aGlzLm1hbmdsZShjYXBbMV0pO1xuICAgICAgICBocmVmID0gdGhpcy5tYW5nbGUoJ21haWx0bzonKSArIHRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0ID0gZXNjYXBlKGNhcFsxXSk7XG4gICAgICAgIGhyZWYgPSB0ZXh0O1xuICAgICAgfVxuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGluayhocmVmLCBudWxsLCB0ZXh0KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHVybCAoZ2ZtKVxuICAgIGlmICghdGhpcy5pbkxpbmsgJiYgKGNhcCA9IHRoaXMucnVsZXMudXJsLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0ZXh0ID0gZXNjYXBlKGNhcFsxXSk7XG4gICAgICBocmVmID0gdGV4dDtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmxpbmsoaHJlZiwgbnVsbCwgdGV4dCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50YWcuZXhlYyhzcmMpKSB7XG4gICAgICBpZiAoIXRoaXMuaW5MaW5rICYmIC9ePGEgL2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pbkxpbmsgJiYgL148XFwvYT4vaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5vcHRpb25zLnNhbml0aXplXG4gICAgICAgID8gZXNjYXBlKGNhcFswXSlcbiAgICAgICAgOiBjYXBbMF07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaW5rXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubGluay5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICBvdXQgKz0gdGhpcy5vdXRwdXRMaW5rKGNhcCwge1xuICAgICAgICBocmVmOiBjYXBbMl0sXG4gICAgICAgIHRpdGxlOiBjYXBbM11cbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHJlZmxpbmssIG5vbGlua1xuICAgIGlmICgoY2FwID0gdGhpcy5ydWxlcy5yZWZsaW5rLmV4ZWMoc3JjKSlcbiAgICAgICAgfHwgKGNhcCA9IHRoaXMucnVsZXMubm9saW5rLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBsaW5rID0gKGNhcFsyXSB8fCBjYXBbMV0pLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbiAgICAgIGxpbmsgPSB0aGlzLmxpbmtzW2xpbmsudG9Mb3dlckNhc2UoKV07XG4gICAgICBpZiAoIWxpbmsgfHwgIWxpbmsuaHJlZikge1xuICAgICAgICBvdXQgKz0gY2FwWzBdLmNoYXJBdCgwKTtcbiAgICAgICAgc3JjID0gY2FwWzBdLnN1YnN0cmluZygxKSArIHNyYztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICBvdXQgKz0gdGhpcy5vdXRwdXRMaW5rKGNhcCwgbGluayk7XG4gICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gc3Ryb25nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuc3Ryb25nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLnN0cm9uZyh0aGlzLm91dHB1dChjYXBbMl0gfHwgY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBlbVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmVtLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmVtKHRoaXMub3V0cHV0KGNhcFsyXSB8fCBjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGNvZGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5jb2RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmNvZGVzcGFuKGVzY2FwZShjYXBbMl0sIHRydWUpKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGJyXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYnIuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuYnIoKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlbCAoZ2ZtKVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmRlbC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5kZWwodGhpcy5vdXRwdXQoY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gZXNjYXBlKHRoaXMuc21hcnR5cGFudHMoY2FwWzBdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3JjKSB7XG4gICAgICB0aHJvdyBuZXdcbiAgICAgICAgRXJyb3IoJ0luZmluaXRlIGxvb3Agb24gYnl0ZTogJyArIHNyYy5jaGFyQ29kZUF0KDApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb21waWxlIExpbmtcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUub3V0cHV0TGluayA9IGZ1bmN0aW9uKGNhcCwgbGluaykge1xuICB2YXIgaHJlZiA9IGVzY2FwZShsaW5rLmhyZWYpXG4gICAgLCB0aXRsZSA9IGxpbmsudGl0bGUgPyBlc2NhcGUobGluay50aXRsZSkgOiBudWxsO1xuXG4gIHJldHVybiBjYXBbMF0uY2hhckF0KDApICE9PSAnISdcbiAgICA/IHRoaXMucmVuZGVyZXIubGluayhocmVmLCB0aXRsZSwgdGhpcy5vdXRwdXQoY2FwWzFdKSlcbiAgICA6IHRoaXMucmVuZGVyZXIuaW1hZ2UoaHJlZiwgdGl0bGUsIGVzY2FwZShjYXBbMV0pKTtcbn07XG5cbi8qKlxuICogU21hcnR5cGFudHMgVHJhbnNmb3JtYXRpb25zXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLnNtYXJ0eXBhbnRzID0gZnVuY3Rpb24odGV4dCkge1xuICBpZiAoIXRoaXMub3B0aW9ucy5zbWFydHlwYW50cykgcmV0dXJuIHRleHQ7XG4gIHJldHVybiB0ZXh0XG4gICAgLy8gZW0tZGFzaGVzXG4gICAgLnJlcGxhY2UoLy0tL2csICdcXHUyMDE0JylcbiAgICAvLyBvcGVuaW5nIHNpbmdsZXNcbiAgICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XCJcXHNdKScvZywgJyQxXFx1MjAxOCcpXG4gICAgLy8gY2xvc2luZyBzaW5nbGVzICYgYXBvc3Ryb3BoZXNcbiAgICAucmVwbGFjZSgvJy9nLCAnXFx1MjAxOScpXG4gICAgLy8gb3BlbmluZyBkb3VibGVzXG4gICAgLnJlcGxhY2UoLyhefFstXFx1MjAxNC8oXFxbe1xcdTIwMThcXHNdKVwiL2csICckMVxcdTIwMWMnKVxuICAgIC8vIGNsb3NpbmcgZG91Ymxlc1xuICAgIC5yZXBsYWNlKC9cIi9nLCAnXFx1MjAxZCcpXG4gICAgLy8gZWxsaXBzZXNcbiAgICAucmVwbGFjZSgvXFwuezN9L2csICdcXHUyMDI2Jyk7XG59O1xuXG4vKipcbiAqIE1hbmdsZSBMaW5rc1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5tYW5nbGUgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHZhciBvdXQgPSAnJ1xuICAgICwgbCA9IHRleHQubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgY2g7XG5cbiAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICBjaCA9IHRleHQuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgY2ggPSAneCcgKyBjaC50b1N0cmluZygxNik7XG4gICAgfVxuICAgIG91dCArPSAnJiMnICsgY2ggKyAnOyc7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZW5kZXJlclxuICovXG5cbmZ1bmN0aW9uIFJlbmRlcmVyKG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbn1cblxuUmVuZGVyZXIucHJvdG90eXBlLmNvZGUgPSBmdW5jdGlvbihjb2RlLCBsYW5nLCBlc2NhcGVkKSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KSB7XG4gICAgdmFyIG91dCA9IHRoaXMub3B0aW9ucy5oaWdobGlnaHQoY29kZSwgbGFuZyk7XG4gICAgaWYgKG91dCAhPSBudWxsICYmIG91dCAhPT0gY29kZSkge1xuICAgICAgZXNjYXBlZCA9IHRydWU7XG4gICAgICBjb2RlID0gb3V0O1xuICAgIH1cbiAgfVxuXG4gIGlmICghbGFuZykge1xuICAgIHJldHVybiAnPHByZT48Y29kZT4nXG4gICAgICArIChlc2NhcGVkID8gY29kZSA6IGVzY2FwZShjb2RlLCB0cnVlKSlcbiAgICAgICsgJ1xcbjwvY29kZT48L3ByZT4nO1xuICB9XG5cbiAgcmV0dXJuICc8cHJlPjxjb2RlIGNsYXNzPVwiJ1xuICAgICsgdGhpcy5vcHRpb25zLmxhbmdQcmVmaXhcbiAgICArIGVzY2FwZShsYW5nLCB0cnVlKVxuICAgICsgJ1wiPidcbiAgICArIChlc2NhcGVkID8gY29kZSA6IGVzY2FwZShjb2RlLCB0cnVlKSlcbiAgICArICdcXG48L2NvZGU+PC9wcmU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5ibG9ja3F1b3RlID0gZnVuY3Rpb24ocXVvdGUpIHtcbiAgcmV0dXJuICc8YmxvY2txdW90ZT5cXG4nICsgcXVvdGUgKyAnPC9ibG9ja3F1b3RlPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKGh0bWwpIHtcbiAgcmV0dXJuIGh0bWw7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaGVhZGluZyA9IGZ1bmN0aW9uKHRleHQsIGxldmVsLCByYXcpIHtcbiAgcmV0dXJuICc8aCdcbiAgICArIGxldmVsXG4gICAgKyAnIGlkPVwiJ1xuICAgICsgdGhpcy5vcHRpb25zLmhlYWRlclByZWZpeFxuICAgICsgcmF3LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15cXHddKy9nLCAnLScpXG4gICAgKyAnXCI+J1xuICAgICsgdGV4dFxuICAgICsgJzwvaCdcbiAgICArIGxldmVsXG4gICAgKyAnPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaHIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub3B0aW9ucy54aHRtbCA/ICc8aHIvPlxcbicgOiAnPGhyPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uKGJvZHksIG9yZGVyZWQpIHtcbiAgdmFyIHR5cGUgPSBvcmRlcmVkID8gJ29sJyA6ICd1bCc7XG4gIHJldHVybiAnPCcgKyB0eXBlICsgJz5cXG4nICsgYm9keSArICc8LycgKyB0eXBlICsgJz5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpc3RpdGVtID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxsaT4nICsgdGV4dCArICc8L2xpPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUucGFyYWdyYXBoID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxwPicgKyB0ZXh0ICsgJzwvcD5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlID0gZnVuY3Rpb24oaGVhZGVyLCBib2R5KSB7XG4gIHJldHVybiAnPHRhYmxlPlxcbidcbiAgICArICc8dGhlYWQ+XFxuJ1xuICAgICsgaGVhZGVyXG4gICAgKyAnPC90aGVhZD5cXG4nXG4gICAgKyAnPHRib2R5PlxcbidcbiAgICArIGJvZHlcbiAgICArICc8L3Rib2R5PlxcbidcbiAgICArICc8L3RhYmxlPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGVyb3cgPSBmdW5jdGlvbihjb250ZW50KSB7XG4gIHJldHVybiAnPHRyPlxcbicgKyBjb250ZW50ICsgJzwvdHI+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZWNlbGwgPSBmdW5jdGlvbihjb250ZW50LCBmbGFncykge1xuICB2YXIgdHlwZSA9IGZsYWdzLmhlYWRlciA/ICd0aCcgOiAndGQnO1xuICB2YXIgdGFnID0gZmxhZ3MuYWxpZ25cbiAgICA/ICc8JyArIHR5cGUgKyAnIHN0eWxlPVwidGV4dC1hbGlnbjonICsgZmxhZ3MuYWxpZ24gKyAnXCI+J1xuICAgIDogJzwnICsgdHlwZSArICc+JztcbiAgcmV0dXJuIHRhZyArIGNvbnRlbnQgKyAnPC8nICsgdHlwZSArICc+XFxuJztcbn07XG5cbi8vIHNwYW4gbGV2ZWwgcmVuZGVyZXJcblJlbmRlcmVyLnByb3RvdHlwZS5zdHJvbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPHN0cm9uZz4nICsgdGV4dCArICc8L3N0cm9uZz4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmVtID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxlbT4nICsgdGV4dCArICc8L2VtPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuY29kZXNwYW4gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGNvZGU+JyArIHRleHQgKyAnPC9jb2RlPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuYnIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub3B0aW9ucy54aHRtbCA/ICc8YnIvPicgOiAnPGJyPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuZGVsID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxkZWw+JyArIHRleHQgKyAnPC9kZWw+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24oaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcHJvdCA9IGRlY29kZVVSSUNvbXBvbmVudCh1bmVzY2FwZShocmVmKSlcbiAgICAgICAgLnJlcGxhY2UoL1teXFx3Ol0vZywgJycpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKHByb3QuaW5kZXhPZignamF2YXNjcmlwdDonKSA9PT0gMCB8fCBwcm90LmluZGV4T2YoJ3Zic2NyaXB0OicpID09PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG4gIHZhciBvdXQgPSAnPGEgaHJlZj1cIicgKyBocmVmICsgJ1wiJztcbiAgaWYgKHRpdGxlKSB7XG4gICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICB9XG4gIG91dCArPSAnPicgKyB0ZXh0ICsgJzwvYT4nO1xuICByZXR1cm4gb3V0O1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmltYWdlID0gZnVuY3Rpb24oaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgdmFyIG91dCA9ICc8aW1nIHNyYz1cIicgKyBocmVmICsgJ1wiIGFsdD1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgaWYgKHRpdGxlKSB7XG4gICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICB9XG4gIG91dCArPSB0aGlzLm9wdGlvbnMueGh0bWwgPyAnLz4nIDogJz4nO1xuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQYXJzaW5nICYgQ29tcGlsaW5nXG4gKi9cblxuZnVuY3Rpb24gUGFyc2VyKG9wdGlvbnMpIHtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy50b2tlbiA9IG51bGw7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLm9wdGlvbnMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG59XG5cbi8qKlxuICogU3RhdGljIFBhcnNlIE1ldGhvZFxuICovXG5cblBhcnNlci5wYXJzZSA9IGZ1bmN0aW9uKHNyYywgb3B0aW9ucywgcmVuZGVyZXIpIHtcbiAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucywgcmVuZGVyZXIpO1xuICByZXR1cm4gcGFyc2VyLnBhcnNlKHNyYyk7XG59O1xuXG4vKipcbiAqIFBhcnNlIExvb3BcbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oc3JjKSB7XG4gIHRoaXMuaW5saW5lID0gbmV3IElubGluZUxleGVyKHNyYy5saW5rcywgdGhpcy5vcHRpb25zLCB0aGlzLnJlbmRlcmVyKTtcbiAgdGhpcy50b2tlbnMgPSBzcmMucmV2ZXJzZSgpO1xuXG4gIHZhciBvdXQgPSAnJztcbiAgd2hpbGUgKHRoaXMubmV4dCgpKSB7XG4gICAgb3V0ICs9IHRoaXMudG9rKCk7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOZXh0IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRva2VuID0gdGhpcy50b2tlbnMucG9wKCk7XG59O1xuXG4vKipcbiAqIFByZXZpZXcgTmV4dCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy50b2tlbnMubGVuZ3RoIC0gMV0gfHwgMDtcbn07XG5cbi8qKlxuICogUGFyc2UgVGV4dCBUb2tlbnNcbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlVGV4dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm9keSA9IHRoaXMudG9rZW4udGV4dDtcblxuICB3aGlsZSAodGhpcy5wZWVrKCkudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgYm9keSArPSAnXFxuJyArIHRoaXMubmV4dCgpLnRleHQ7XG4gIH1cblxuICByZXR1cm4gdGhpcy5pbmxpbmUub3V0cHV0KGJvZHkpO1xufTtcblxuLyoqXG4gKiBQYXJzZSBDdXJyZW50IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS50b2sgPSBmdW5jdGlvbigpIHtcbiAgc3dpdGNoICh0aGlzLnRva2VuLnR5cGUpIHtcbiAgICBjYXNlICdzcGFjZSc6IHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY2FzZSAnaHInOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5ocigpO1xuICAgIH1cbiAgICBjYXNlICdoZWFkaW5nJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaGVhZGluZyhcbiAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dCksXG4gICAgICAgIHRoaXMudG9rZW4uZGVwdGgsXG4gICAgICAgIHRoaXMudG9rZW4udGV4dCk7XG4gICAgfVxuICAgIGNhc2UgJ2NvZGUnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5jb2RlKHRoaXMudG9rZW4udGV4dCxcbiAgICAgICAgdGhpcy50b2tlbi5sYW5nLFxuICAgICAgICB0aGlzLnRva2VuLmVzY2FwZWQpO1xuICAgIH1cbiAgICBjYXNlICd0YWJsZSc6IHtcbiAgICAgIHZhciBoZWFkZXIgPSAnJ1xuICAgICAgICAsIGJvZHkgPSAnJ1xuICAgICAgICAsIGlcbiAgICAgICAgLCByb3dcbiAgICAgICAgLCBjZWxsXG4gICAgICAgICwgZmxhZ3NcbiAgICAgICAgLCBqO1xuXG4gICAgICAvLyBoZWFkZXJcbiAgICAgIGNlbGwgPSAnJztcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnRva2VuLmhlYWRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBmbGFncyA9IHsgaGVhZGVyOiB0cnVlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltpXSB9O1xuICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKFxuICAgICAgICAgIHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLmhlYWRlcltpXSksXG4gICAgICAgICAgeyBoZWFkZXI6IHRydWUsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2ldIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGhlYWRlciArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy50b2tlbi5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICByb3cgPSB0aGlzLnRva2VuLmNlbGxzW2ldO1xuXG4gICAgICAgIGNlbGwgPSAnJztcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNlbGwgKz0gdGhpcy5yZW5kZXJlci50YWJsZWNlbGwoXG4gICAgICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQocm93W2pdKSxcbiAgICAgICAgICAgIHsgaGVhZGVyOiBmYWxzZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25bal0gfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5ICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci50YWJsZShoZWFkZXIsIGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdibG9ja3F1b3RlX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdibG9ja3F1b3RlX2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5ibG9ja3F1b3RlKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdsaXN0X3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJ1xuICAgICAgICAsIG9yZGVyZWQgPSB0aGlzLnRva2VuLm9yZGVyZWQ7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnbGlzdF9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdChib2R5LCBvcmRlcmVkKTtcbiAgICB9XG4gICAgY2FzZSAnbGlzdF9pdGVtX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2l0ZW1fZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rZW4udHlwZSA9PT0gJ3RleHQnXG4gICAgICAgICAgPyB0aGlzLnBhcnNlVGV4dCgpXG4gICAgICAgICAgOiB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0aXRlbShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnbG9vc2VfaXRlbV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnbGlzdF9pdGVtX2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0aXRlbShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnaHRtbCc6IHtcbiAgICAgIHZhciBodG1sID0gIXRoaXMudG9rZW4ucHJlICYmICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgPyB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi50ZXh0KVxuICAgICAgICA6IHRoaXMudG9rZW4udGV4dDtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmh0bWwoaHRtbCk7XG4gICAgfVxuICAgIGNhc2UgJ3BhcmFncmFwaCc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnBhcmFncmFwaCh0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi50ZXh0KSk7XG4gICAgfVxuICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5wYXJhZ3JhcGgodGhpcy5wYXJzZVRleHQoKSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEhlbHBlcnNcbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoaHRtbCwgZW5jb2RlKSB7XG4gIHJldHVybiBodG1sXG4gICAgLnJlcGxhY2UoIWVuY29kZSA/IC8mKD8hIz9cXHcrOykvZyA6IC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgLnJlcGxhY2UoLycvZywgJyYjMzk7Jyk7XG59XG5cbmZ1bmN0aW9uIHVuZXNjYXBlKGh0bWwpIHtcbiAgcmV0dXJuIGh0bWwucmVwbGFjZSgvJihbI1xcd10rKTsvZywgZnVuY3Rpb24oXywgbikge1xuICAgIG4gPSBuLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG4gPT09ICdjb2xvbicpIHJldHVybiAnOic7XG4gICAgaWYgKG4uY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgIHJldHVybiBuLmNoYXJBdCgxKSA9PT0gJ3gnXG4gICAgICAgID8gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChuLnN1YnN0cmluZygyKSwgMTYpKVxuICAgICAgICA6IFN0cmluZy5mcm9tQ2hhckNvZGUoK24uc3Vic3RyaW5nKDEpKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZShyZWdleCwgb3B0KSB7XG4gIHJlZ2V4ID0gcmVnZXguc291cmNlO1xuICBvcHQgPSBvcHQgfHwgJyc7XG4gIHJldHVybiBmdW5jdGlvbiBzZWxmKG5hbWUsIHZhbCkge1xuICAgIGlmICghbmFtZSkgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXgsIG9wdCk7XG4gICAgdmFsID0gdmFsLnNvdXJjZSB8fCB2YWw7XG4gICAgdmFsID0gdmFsLnJlcGxhY2UoLyhefFteXFxbXSlcXF4vZywgJyQxJyk7XG4gICAgcmVnZXggPSByZWdleC5yZXBsYWNlKG5hbWUsIHZhbCk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxubm9vcC5leGVjID0gbm9vcDtcblxuZnVuY3Rpb24gbWVyZ2Uob2JqKSB7XG4gIHZhciBpID0gMVxuICAgICwgdGFyZ2V0XG4gICAgLCBrZXk7XG5cbiAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB0YXJnZXQgPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChrZXkgaW4gdGFyZ2V0KSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwga2V5KSkge1xuICAgICAgICBvYmpba2V5XSA9IHRhcmdldFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cblxuLyoqXG4gKiBNYXJrZWRcbiAqL1xuXG5mdW5jdGlvbiBtYXJrZWQoc3JjLCBvcHQsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayB8fCB0eXBlb2Ygb3B0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBvcHQ7XG4gICAgICBvcHQgPSBudWxsO1xuICAgIH1cblxuICAgIG9wdCA9IG1lcmdlKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCB8fCB7fSk7XG5cbiAgICB2YXIgaGlnaGxpZ2h0ID0gb3B0LmhpZ2hsaWdodFxuICAgICAgLCB0b2tlbnNcbiAgICAgICwgcGVuZGluZ1xuICAgICAgLCBpID0gMDtcblxuICAgIHRyeSB7XG4gICAgICB0b2tlbnMgPSBMZXhlci5sZXgoc3JjLCBvcHQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICAgIH1cblxuICAgIHBlbmRpbmcgPSB0b2tlbnMubGVuZ3RoO1xuXG4gICAgdmFyIGRvbmUgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICB9XG5cbiAgICAgIHZhciBvdXQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIG91dCA9IFBhcnNlci5wYXJzZSh0b2tlbnMsIG9wdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGVyciA9IGU7XG4gICAgICB9XG5cbiAgICAgIG9wdC5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG5cbiAgICAgIHJldHVybiBlcnJcbiAgICAgICAgPyBjYWxsYmFjayhlcnIpXG4gICAgICAgIDogY2FsbGJhY2sobnVsbCwgb3V0KTtcbiAgICB9O1xuXG4gICAgaWYgKCFoaWdobGlnaHQgfHwgaGlnaGxpZ2h0Lmxlbmd0aCA8IDMpIHtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfVxuXG4gICAgZGVsZXRlIG9wdC5oaWdobGlnaHQ7XG5cbiAgICBpZiAoIXBlbmRpbmcpIHJldHVybiBkb25lKCk7XG5cbiAgICBmb3IgKDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAnY29kZScpIHtcbiAgICAgICAgICByZXR1cm4gLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGlnaGxpZ2h0KHRva2VuLnRleHQsIHRva2VuLmxhbmcsIGZ1bmN0aW9uKGVyciwgY29kZSkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgaWYgKGNvZGUgPT0gbnVsbCB8fCBjb2RlID09PSB0b2tlbi50ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9rZW4udGV4dCA9IGNvZGU7XG4gICAgICAgICAgdG9rZW4uZXNjYXBlZCA9IHRydWU7XG4gICAgICAgICAgLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSh0b2tlbnNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGlmIChvcHQpIG9wdCA9IG1lcmdlKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gICAgcmV0dXJuIFBhcnNlci5wYXJzZShMZXhlci5sZXgoc3JjLCBvcHQpLCBvcHQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZS5tZXNzYWdlICs9ICdcXG5QbGVhc2UgcmVwb3J0IHRoaXMgdG8gaHR0cHM6Ly9naXRodWIuY29tL2NoamovbWFya2VkLic7XG4gICAgaWYgKChvcHQgfHwgbWFya2VkLmRlZmF1bHRzKS5zaWxlbnQpIHtcbiAgICAgIHJldHVybiAnPHA+QW4gZXJyb3Igb2NjdXJlZDo8L3A+PHByZT4nXG4gICAgICAgICsgZXNjYXBlKGUubWVzc2FnZSArICcnLCB0cnVlKVxuICAgICAgICArICc8L3ByZT4nO1xuICAgIH1cbiAgICB0aHJvdyBlO1xuICB9XG59XG5cbi8qKlxuICogT3B0aW9uc1xuICovXG5cbm1hcmtlZC5vcHRpb25zID1cbm1hcmtlZC5zZXRPcHRpb25zID0gZnVuY3Rpb24ob3B0KSB7XG4gIG1lcmdlKG1hcmtlZC5kZWZhdWx0cywgb3B0KTtcbiAgcmV0dXJuIG1hcmtlZDtcbn07XG5cbm1hcmtlZC5kZWZhdWx0cyA9IHtcbiAgZ2ZtOiB0cnVlLFxuICB0YWJsZXM6IHRydWUsXG4gIGJyZWFrczogZmFsc2UsXG4gIHBlZGFudGljOiBmYWxzZSxcbiAgc2FuaXRpemU6IGZhbHNlLFxuICBzbWFydExpc3RzOiBmYWxzZSxcbiAgc2lsZW50OiBmYWxzZSxcbiAgaGlnaGxpZ2h0OiBudWxsLFxuICBsYW5nUHJlZml4OiAnbGFuZy0nLFxuICBzbWFydHlwYW50czogZmFsc2UsXG4gIGhlYWRlclByZWZpeDogJycsXG4gIHJlbmRlcmVyOiBuZXcgUmVuZGVyZXIsXG4gIHhodG1sOiBmYWxzZVxufTtcblxuLyoqXG4gKiBFeHBvc2VcbiAqL1xuXG5tYXJrZWQuUGFyc2VyID0gUGFyc2VyO1xubWFya2VkLnBhcnNlciA9IFBhcnNlci5wYXJzZTtcblxubWFya2VkLlJlbmRlcmVyID0gUmVuZGVyZXI7XG5cbm1hcmtlZC5MZXhlciA9IExleGVyO1xubWFya2VkLmxleGVyID0gTGV4ZXIubGV4O1xuXG5tYXJrZWQuSW5saW5lTGV4ZXIgPSBJbmxpbmVMZXhlcjtcbm1hcmtlZC5pbmxpbmVMZXhlciA9IElubGluZUxleGVyLm91dHB1dDtcblxubWFya2VkLnBhcnNlID0gbWFya2VkO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gbWFya2VkO1xufSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gbWFya2VkOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMubWFya2VkID0gbWFya2VkO1xufVxuXG59KS5jYWxsKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpO1xufSgpKTtcbiIsInZhciBYTUxIdHRwUmVxdWVzdCAgPSByZXF1aXJlKCd4aHJwb2x5ZmlsbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhocjIgKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgLy8gY2FsbHM6IGNhbGxiYWNrKGRhdGEsIHJlc3BvbnNlLCB4aHIpO1xuICB2YXIgYXJncyA9IHsgLy8gZS5nLiB1cmwgPSBcImh0dHA6Ly9pcC5qc29udGVzdC5jb20vYT0xJmI9MiZjPTNcIlxuICAgIHVybCAgICAgIDogdHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZycgPyBwYXJhbXMgOiBwYXJhbXMudXJsLFxuICAgIG1ldGhvZCAgIDogcGFyYW1zLm1ldGhvZCB8fCBwYXJhbXMuZGF0YSA/ICdQT1NUJzogJ0dFVCcsXG4gICAgYm9keSAgICAgOiBwYXJhbXMuZGF0YSwgLy8gZGF0YTogZm9ybWRhdGEgb3Ige2tleTp2YWx9XG4gICAgaGVhZGVycyAgOiAoZnVuY3Rpb24oKXtcbiAgICAgIHZhciBoZWFkZXIgPSB7XG4gICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJyA6J1hNTEh0dHBSZXF1ZXN0JyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgIDonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfTtcbiAgICAgIHJldHVybiBwYXJhbXMuaGVhZGVycyA/IHBhcmFtcy5oZWFkZXJzIDogcGFyYW1zLmJvZHkgPyBoZWFkZXIgOiB7fTtcbiAgICB9KSgpXG4gIH07XG4gIHZhciB4aHIgPSBYTUxIdHRwUmVxdWVzdCgpO1xuICBpZiAoIXhocikgeyByZXR1cm4gbnVsbCB9O1xuICB4aHIub3BlbihhcmdzLm1ldGhvZCxhcmdzLnVybCk7XG4gIGZvciAodmFyIGZpZWxkIGluIGFyZ3MuaGVhZGVycykge1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCBhcmdzLmhlYWRlcnNbZmllbGRdKTtcbiAgfVxuICB4aHIub25sb2FkPWZ1bmN0aW9uKHJlc3BvbnNlKXtjYWxsYmFjayh0aGlzLnJlc3BvbnNlLCByZXNwb25zZSwgeGhyKTt9O1xuICB4aHIuc2VuZChhcmdzLmJvZHl8fG51bGwpO1xufTtcbiIsInZhciBmYWN0b3JpZXMgPSBbXG4gIGZ1bmN0aW9uICgpIHtyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7fSwgLy8gSUUxMCssIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIFNhZmFyaVxuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwzLlhNTEhUVFBcIik7fSwgICAgIC8vIElFOVxuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFAuNi4wXCIpO30sIC8vIElFOFxuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFAuMy4wXCIpO30sIC8vIElFN1xuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFBcIik7fSwgICAgIC8vIElFNlxuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7fSwgIC8vIElFNVxuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG51bGw7fVxuXTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0WEhSKCkge1xuICBmb3IgKHZhciBpPTAsIHhociwgbGVuPWZhY3Rvcmllcy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICB0cnkgICAgICAgeyB4aHIgPSBmYWN0b3JpZXNbaV0oKTsgcmV0dXJuIHhocjsgfVxuICAgIGNhdGNoIChlKSB7IGNvbnRpbnVlOyB9XG4gIH1cbn07XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9jb25maWcgICA9IHJlcXVpcmUoJ19jb25maWcnKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSBib2lsZXJwbGF0ZTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhFQ1VUSU9OXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgY29uZmlnICAgICAgPSBfY29uZmlnKCk7XG5mdW5jdGlvbiBib2lsZXJwbGF0ZSAocGFyYW1ldGVyKSB7XG4gIHZhciAkdGl0bGUgICAgICAgICAgICAgID0gY29uZmlnWyd0aXRsZSddO1xuICB2YXIgJGRlc2NyaXB0aW9uICAgICAgICA9IGNvbmZpZ1snZGVzY3JpcHRpb24nXTtcbiAgdmFyICRrZXl3b3JkcyAgICAgICAgICAgPSBjb25maWdbJ2tleXdvcmRzJ107XG4gIHZhciAkYXV0aG9yICAgICAgICAgICAgID0gY29uZmlnWydhdXRob3InXTtcbiAgdmFyICR3ZWJzaXRlICAgICAgICAgICAgPSBjb25maWdbJ3dlYnNpdGUnXTtcbiAgdmFyICRzdHlsZSAgICAgICAgICAgICAgPSBjb25maWdbJ3N0eWxlJ107XG5cbiAgdmFyICRsb2dvVVJMICAgICAgICAgICAgPSB1bmRlZmluZWQ7XG4gIHZhciAkZ29vZ2xlQW5hbHl0aWNzICAgID0gdW5kZWZpbmVkO1xuXG4gIGlmIChwYXJhbWV0ZXIpIHtcbiAgICAkdGl0bGUgICAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIudGl0bGUgICAgICAgfHwgJHRpdGxlO1xuICAgICRkZXNjcmlwdGlvbiAgICAgICAgICA9IHBhcmFtZXRlci5kZXNjcmlwdGlvbiB8fCAkZGVzY3JpcHRpb247XG4gICAgJGtleXdvcmRzICAgICAgICAgICAgID0gcGFyYW1ldGVyLmtleXdvcmRzICAgIHx8ICRrZXl3b3JkcztcbiAgICAkYXV0aG9yICAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIuYXV0aG9yICAgICAgfHwgJGF1dGhvcjtcbiAgICAkd2Vic2l0ZSAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIud2Vic2l0ZSAgICAgfHwgJHdlYnNpdGU7XG4gICAgJHN0eWxlICAgICAgICAgICAgICAgID0gcGFyYW1ldGVyLnN0eWxlICAgICAgIHx8ICRzdHlsZTtcblxuICAgICRsb2dvVVJMICAgICAgICAgICAgICA9IHBhcmFtZXRlci5sb2dvVVJMICAgICB8fCAkbG9nb1VSTDtcbiAgICAkZ29vZ2xlQW5hbHl0aWNzICAgICAgPSBwYXJhbWV0ZXIuZ2EgICAgICAgICAgfHwgJGdvb2dsZUFuYWx5dGljcztcbiAgfVxuXG4gIHZhciB0aXRsZSAgICAgICAgICAgICAgID0gWyc8dGl0bGU+JyskdGl0bGUrJzwvdGl0bGU+J107XG4gIHZhciBtZXRhICAgICAgICAgICAgICAgID0gW1xuICAgICc8bWV0YSBjaGFyc2V0PVwidXRmLThcIj4nLFxuICAgICc8bWV0YSBuYW1lPVwiZm9ybWF0LWRldGVjdGlvblwiIGNvbnRlbnQ9XCJ0ZWxlcGhvbmU9bm9cIiAvPicsXG4gICAgJzxtZXRhIG5hbWU9XCJtc2FwcGxpY2F0aW9uLXRhcC1oaWdobGlnaHRcIiBjb250ZW50PVwibm9cIiAvPicsXG4gICAgJzxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCInKyRkZXNjcmlwdGlvbisnXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cImtleXdvcmRzXCIgY29udGVudD1cIicrJGtleXdvcmRzKydcIj4nLFxuICAgICc8bWV0YSBuYW1lPVwiYXV0aG9yXCIgY29udGVudD1cIicrJGF1dGhvcisnXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZSA9IDEuMCwgdXNlci1zY2FsYWJsZT1ub1wiPidcbiAgXTtcbiAgdmFyIG9nICAgICAgICAgICAgICAgICAgPSBbXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6dGl0bGVcIiBjb250ZW50PVwiJyskdGl0bGUrJ1wiIC8+JyxcbiAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzpzaXRlX25hbWVcIiBjb250ZW50PVwiJyskdGl0bGUrJ1wiIC8+JyxcbiAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzp1cmxcIiBjb250ZW50PVwiJyskd2Vic2l0ZSsnXCIgLz4nLFxuICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOmRlc2NyaXB0aW9uXCIgY29udGVudD1cIicrJGRlc2NyaXB0aW9uKydcIiAvPicsXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiJyskbG9nb1VSTCsnXCIgLz4nLFxuICBdO1xuICB2YXIgaWNvbiAgICAgICAgICAgICAgICA9IFsgLy8gY2hlY2sgaXRlbSBnZW5lcmF0b3JcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiNTd4NTdcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tNTd4NTcucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiNjB4NjBcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tNjB4NjAucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiNzJ4NzJcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tNzJ4NzIucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiNzZ4NzZcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tNzZ4NzYucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiMTE0eDExNFwiIGhyZWY9XCJsb2dvL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi0xMTR4MTE0LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjEyMHgxMjBcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tMTIweDEyMC5wbmdcIj4nLFxuICAgICc8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgc2l6ZXM9XCIxNDR4MTQ0XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTE0NHgxNDQucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9wbmdcIiBocmVmPVwibG9nby9mYXZpY29uL2Zhdmljb24tMzJ4MzIucG5nXCIgc2l6ZXM9XCIzMngzMlwiPicsXG4gICAgJzxsaW5rIHJlbD1cImljb25cIiB0eXBlPVwiaW1hZ2UvcG5nXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9mYXZpY29uLTk2eDk2LnBuZ1wiIHNpemVzPVwiOTZ4OTZcIj4nLFxuICAgICc8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCJsb2dvL2Zhdmljb24vZmF2aWNvbi0xNngxNi5wbmdcIiBzaXplcz1cIjE2eDE2XCI+JyxcbiAgICAnPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwibG9nby9mYXZpY29uL21hbmlmZXN0Lmpzb25cIj4nLFxuICAgICc8bWV0YSBuYW1lPVwibXNhcHBsaWNhdGlvbi1UaWxlQ29sb3JcIiBjb250ZW50PVwiI2I5MWQ0N1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJtc2FwcGxpY2F0aW9uLVRpbGVJbWFnZVwiIGNvbnRlbnQ9XCJsb2dvL2Zhdmljb24vbXN0aWxlLTE0NHgxNDQucG5nXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiNmZmZmZmZcIj4nLFxuICAgICc8bGluayByZWw9XCJzaG9ydGN1dCBpY29uXCIgdHlwZT1cImltYWdlL3gtaWNvblwiIGhyZWY9XCJTT1VSQ0UvZmF2aWNvbi5pY29cIj4nLFxuICAgICc8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCJTT1VSQ0UvcmVpbnZlbnRpbmdlbmdhZ2VtZW50LnBuZ1wiPidcbiAgXTtcbiAgdmFyIHN0eWxlICAgICAgICAgICAgICAgPSBbXG4gICAgJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiJyArICRzdHlsZSArICdcIiAvPidcbiAgXTtcbiAgdmFyIGdvb2dsZSAgICAgICAgICAgICAgPSAkZ29vZ2xlQW5hbHl0aWNzID8gW1xuICAgIFwiPHNjcmlwdD5cIixcbiAgICAgIFwiKGZ1bmN0aW9uKGkscyxvLGcscixhLG0pe2lbJ0dvb2dsZUFuYWx5dGljc09iamVjdCddPXI7aVtyXT1pW3JdfHxmdW5jdGlvbigpe1wiLFxuICAgICAgXCIoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcIixcbiAgICAgIFwibT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKVwiLFxuICAgICAgXCJ9KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XCIsXG4gICAgICBcImdhKCdjcmVhdGUnLCAnXCIgKyAkZ29vZ2xlQW5hbHl0aWNzICsgXCInLCAnYXV0bycpO1wiLFxuICAgICAgXCJnYSgnc2VuZCcsICdwYWdldmlldycpO1wiLFxuICAgIFwiPC9zY3JpcHQ+XCJdXG4gICAgOltdO1xuXG5cbiAgdmFyIGhlYWQgICAgPSB0aXRsZS5jb25jYXQobWV0YSkuY29uY2F0KG9nKS8qLmNvbmNhdChpY29uKSovLmNvbmNhdChzdHlsZSk7XG4gIHZhciBib2R5ICAgID0gZ29vZ2xlLyouY29uY2F0KC4uLikqLztcblxuICB2YXIgaHRtbFRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcbiAgdmFyIGhlYWRUYWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XG4gIHZhciBib2R5VGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIGh0bWxUYWcuc2V0QXR0cmlidXRlKCdsYW5nJywnZW4nKTtcbiAgaGVhZFRhZy5pbm5lckhUTUwgPSBoZWFkLmpvaW4oJycpO1xuXG4gIHZhciB0bXAsIHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGVtcC5pbm5lckhUTUwgPSBib2R5LmpvaW4oJycpO1xuICB3aGlsZSAodG1wID0gdGVtcC5jaGlsZE5vZGVzWzBdKSB7IGJvZHlUYWcuYXBwZW5kQ2hpbGQodG1wKTsgfVxuXG4gIHJldHVybiBib2R5VGFnO1xufTtcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgcGtnICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9wYWNrYWdlLmpzb24nKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSBjb25maWc7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYRUNVVElPTlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9jb25maWcgICAgID0ge1xuICB0aXRsZSAgICAgICA6ICcnLFxuICBkZXNjcmlwdGlvbiA6IHBrZy5kZXNjcmlwdGlvbixcbiAgdmVyc2lvbiAgICAgOiBwa2cudmVyc2lvbixcbiAga2V5d29yZHMgICAgOiBwa2cua2V5d29yZHMuam9pbignLCAnKSxcbiAgYXV0aG9yICAgICAgOiBwa2cuYXV0aG9yLm5hbWUsXG4gIHdlYnNpdGUgICAgIDogJ2h0dHA6Ly9ucG1qcy5vcmcvd2VicGFnZScsXG4gIHN0eWxlICAgICAgIDogJ0JVTkRMRS9idW5kbGUuY3NzJ1xufTtcbmZ1bmN0aW9uIGNvbmZpZyAoa2V5KSB7XG4gIHJldHVybiBrZXkgPyBfY29uZmlnW2tleV0gOiBfY29uZmlnO1xufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJ3ZWJwYWdlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMy4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJXZWJwYWdlIEJvaWxlcnBsYXRlIENvbXBvbmVudFwiLFxuICBcIm1haW5cIjogXCJTT1VSQ0UvaW5kZXguanNcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInRlc3RcIjogXCJlY2hvIFxcXCJFcnJvcjogbm8gdGVzdCBzcGVjaWZpZWRcXFwiICYmIGV4aXQgMVwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiYm9pbGVycGxhdGVcIixcbiAgICBcIndlYnBhZ2VcIixcbiAgICBcImNvbXBvbmVudFwiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJzZXJhcGF0aFwiLFxuICAgIFwiZW1haWxcIjogXCJkZXZAc2VyYXBhdGguZGVcIixcbiAgICBcInVybFwiOiBcImh0dHA6Ly93d3cuZ2l0aHViLmNvbS9zZXJhcGF0aFwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInJlYWRtZVwiOiBcIiMgd2VicGFnZVxcbldlYnBhZ2UgQm9pbGVycGxhdGUgQ29tcG9uZW50XFxuXFxuYGBganNcXG52YXIgd2VicGFnZSA9IHJlcXVpcmUoJ3dlYnBhZ2UnKTtcXG52YXIgYm9keSAgICA9IHdlYnBhZ2Uoe1xcbiAgLy8gT1BUSU9OQUxcXG4gIC8vIC4uLiBhbmQgbW9yZSBpbiB0aGUgZnV0dXJlIChlLmcuIGljb24sIG9nLCAuLi4pXFxuICB0aXRsZSAgICAgICA6ICdGb29iYXInLFxcbiAgZGVzY3JpcHRpb24gOiAnZm9vIGJhciBiYXonLFxcbiAga2V5d29yZHMgICAgOiAnZm9vLCBiYXIsIGJheicsXFxuICBhdXRob3IgICAgICA6ICdxdXV4IGJheicsXFxuICB3ZWJzaXRlICAgICA6ICdodHRwOi8vZm9vLmJhci5iYXonXFxufSk7XFxuXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJnaXRIZWFkXCI6IFwiMjgzOWM1NmE5NWJkNDQ3Yjc4ZGU1MDNiMTVkNjE5MTg1NzUwZTdjNFwiLFxuICBcIl9pZFwiOiBcIndlYnBhZ2VAMC4zLjBcIixcbiAgXCJfc2hhc3VtXCI6IFwiMTVjOGM5OWU4MjJiNDk5ZTk5ODFhZTY4NzY1MzliNDIzNDQ4YjhlN1wiLFxuICBcIl9mcm9tXCI6IFwid2VicGFnZUA+PTAuMy4wIDwwLjQuMFwiXG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcIndpemFyZGFtaWdvc2luc3RpdHV0ZVwiLFxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJkZXNjcmlwdGlvblwiOiBcIldpemFyZCBBbWlnb3MgSW5zdGl0dXRlIFdlYnNpdGVcIixcbiAgXCJtYWluXCI6IFwiU09VUkNFL2luZGV4LmpzXCIsXG4gIFwic3R5bGVcIjogXCJTT1VSQ0UvaW5kZXguY3NzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImZhc3Rkb21cIjogXCJeMC44LjZcIixcbiAgICBcImhvbG9uLW1hcmtkb3duYm94XCI6IFwiXjAuMS4wXCIsXG4gICAgXCJqc29uLW1hdHRlclwiOiBcIl4xLjAuMlwiLFxuICAgIFwianNvbi1tZXRhLW1hcmtlZFwiOiBcIl4xLjEuMlwiLFxuICAgIFwibWFya2VkXCI6IFwiXjAuMy4zXCIsXG4gICAgXCJtaW5peGhyXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJyZXNyY2lmeVwiOiBcIl4xLjEuM1wiLFxuICAgIFwid2VicGFnZVwiOiBcIl4wLjMuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImF0b21pZnlcIjogXCJeNy4xLjBcIixcbiAgICBcImJhYmVsaWZ5XCI6IFwiXjYuMC4yXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInN0YXJ0XCI6IFwiYXRvbWlmeVwiLFxuICAgIFwidGVzdFwiOiBcImVjaG8gXFxcIkVycm9yOiBubyB0ZXN0IHNwZWNpZmllZFxcXCIgJiYgZXhpdCAxICN0ZXN0ZW0gc3RhcnQgLS1zaW5nbGVSdW5cIixcbiAgICBcIi0tLVwiOiBcIiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIsXG4gICAgXCJidWlsZDpzY3JpcHRzXCI6IFwiI2Jyb3dzZXJpZnkgLWQgYXNzZXRzL3NjcmlwdHMvbWFpbi5qcyAtcCBbbWluaWZ5aWZ5IC0tY29tcHJlc3NQYXRoIC4gLS1tYXAgbWFpbi5qcy5tYXAgLS1vdXRwdXQgZGlzdC9tYWluLmpzLm1hcF0gfCBoYXNobWFyayAtbiBkaXN0L21haW4uanMgLXMgLWwgOCAtbSBhc3NldHMuanNvbiAnZGlzdC97bmFtZX17aGFzaH17ZXh0fSdcIixcbiAgICBcImpzY3NcIjogXCIjanNjcyBlc2hpbnQgZXNsaW50Li4uXCIsXG4gICAgXCJ1Z2xpZnlcIjogXCIjdWdsaWZ5XCIsXG4gICAgXCJwbmdcIjogXCIjb3B0aW1nXCIsXG4gICAgXCJqcGdcIjogXCIjanBnb1wiLFxuICAgIFwiY3NzbVwiOiBcIiN5Y3NzbWluICoqLmNzcyAjY3NzbWluXCIsXG4gICAgXCJjc3N2XCI6IFwiI2Nzcy12YWxpZGF0b3IgKiouY3NzXCIsXG4gICAgXCJjc3NwXCI6IFwiI2Nzcy1wcmV0dGlmaWVyICoqLmNzc1wiLFxuICAgIFwiaHRtbFwiOiBcIiNodG1sNS1saW50ICoqLmh0bWxcIixcbiAgICBcImJ1aWxkVlwiOiBcIiNybSAtcmYgUkVMRUFTRSAmJiBta2RpciBSRUxFQVNFICYmIG5vZGUgbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvYmluL2NtZC5qcyBTT1VSQ0UvaW5kZXguanMgLWQgLW8gUkVMRUFTRS9pbmRleC52JChjYXQgcGFja2FnZS5qc29uIHwgZ3JlcCB2ZXJzaW9uIHwgZ3JlcCAtUG8gJyg/PD12ZXJzaW9uXFxcIjogXFxcIikuKig/PVxcXCIpJykuYnVuZGxlLmpzXCIsXG4gICAgXCJ3YXRjaFZcIjogXCIjcm0gLXJmIFJFTEVBU0UgJiYgbWtkaXIgUkVMRUFTRSAmJiBub2RlIG5vZGVfbW9kdWxlcy93YXRjaGlmeS9iaW4vY21kLmpzIFNPVVJDRS9pbmRleC5qcyAtbyBSRUxFQVNFL2luZGV4LnYkKGNhdCBwYWNrYWdlLmpzb24gfCBncmVwIHZlcnNpb24gfCBncmVwIC1QbyAnKD88PXZlcnNpb25cXFwiOiBcXFwiKS4qKD89XFxcIiknKS5idW5kbGUuanNcIixcbiAgICBcIm9wZW46cHJvZFwiOiBcIiNvcGVuZXIgaHR0cDovL2V4YW1wbGUuY29tXCIsXG4gICAgXCJvcGVuOnN0YWdlXCI6IFwiI29wZW5lciBodHRwOi8vc3RhZ2luZy5leGFtcGxlLmludGVybmFsXCIsXG4gICAgXCJvcGVuOmRldlwiOiBcIiNvcGVuZXIgaHR0cDovL2xvY2FsaG9zdDo5MDkwXCIsXG4gICAgXCJkZXBsb3k6cHJvZFwiOiBcIiNzMy1jbGkgc3luYyAuL2Rpc3QvIHMzOi8vZXhhbXBsZS1jb20vcHJvZC1zaXRlL1wiLFxuICAgIFwiZGVwbG95OnN0YWdlXCI6IFwiI3MzLWNsaSBzeW5jIC4vZGlzdC8gczM6Ly9leGFtcGxlLWNvbS9zdGFnZS1zaXRlL1wiXG4gIH0sXG4gIFwiYXRvbWlmeVwiOiB7XG4gICAgXCJzZXJ2ZXJcIjoge1xuICAgICAgXCJvcGVuXCI6IHRydWUsXG4gICAgICBcInBhdGhcIjogXCJpbmRleC5odG1sXCIsXG4gICAgICBcImxyXCI6IHtcbiAgICAgICAgXCJ2ZXJib3NlXCI6IHRydWUsXG4gICAgICAgIFwicXVpZXRcIjogZmFsc2UsXG4gICAgICAgIFwicG9ydFwiOiAzMTMzNyxcbiAgICAgICAgXCJzeW5jXCI6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIFwianNcIjoge1xuICAgICAgXCJlbnRyeVwiOiBcIlNPVVJDRS9pbmRleC5qc1wiLFxuICAgICAgXCJhbGlhc1wiOiBcIkJVTkRMRS9idW5kbGUuanNcIixcbiAgICAgIFwib3V0cHV0XCI6IFwiQlVORExFL2J1bmRsZS5qc1wiLFxuICAgICAgXCJkZWJ1Z1wiOiB0cnVlLFxuICAgICAgXCJ3YXRjaFwiOiB0cnVlLFxuICAgICAgXCJ0cmFuc2Zvcm1cIjogW1xuICAgICAgICBcImJhYmVsaWZ5XCJcbiAgICAgIF0sXG4gICAgICBcInN0YW5kYWxvbmVcIjogXCJBUElcIlxuICAgIH0sXG4gICAgXCJjc3NcIjoge1xuICAgICAgXCJlbnRyeVwiOiBcIlNPVVJDRS9pbmRleC5jc3NcIixcbiAgICAgIFwiYWxpYXNcIjogXCJCVU5ETEUvYnVuZGxlLmNzc1wiLFxuICAgICAgXCJvdXRwdXRcIjogXCJCVU5ETEUvYnVuZGxlLmNzc1wiLFxuICAgICAgXCJkZWJ1Z1wiOiB0cnVlLFxuICAgICAgXCJ3YXRjaFwiOiB0cnVlLFxuICAgICAgXCJhdXRvcHJlZml4ZXJcIjoge1xuICAgICAgICBcImJyb3dzZXJzXCI6IFtcbiAgICAgICAgICBcIj4gMSVcIixcbiAgICAgICAgICBcIklFIDdcIlxuICAgICAgICBdLFxuICAgICAgICBcImNhc2NhZGVcIjogZmFsc2VcbiAgICAgIH0sXG4gICAgICBcImNvbXByZXNzXCI6IGZhbHNlLFxuICAgICAgXCJwbHVnaW5cIjogW11cbiAgICB9LFxuICAgIFwiYXNzZXRzXCI6IHtcbiAgICAgIFwiZGVzdFwiOiBcIkJVTkRMRS9hc3NldHMvXCIsXG4gICAgICBcInByZWZpeFwiOiBcIi9CVU5ETEUvYXNzZXRzL1wiLFxuICAgICAgXCJyZXRhaW5OYW1lXCI6IGZhbHNlXG4gICAgfVxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3dpemFyZGFtaWdvc2luc3RpdHV0ZS93aXphcmRhbWlnb3NpbnN0aXR1dGUuZ2l0aHViLmlvLmdpdFwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwidGVhY2hpbmdcIixcbiAgICBcInRlYWNoZXJcIixcbiAgICBcImxlYXJuaW5nXCIsXG4gICAgXCJqYXZhc2NyaXB0XCIsXG4gICAgXCJiZXJsaW5cIixcbiAgICBcImxlYXJuZXJcIixcbiAgICBcInByb2dyYW1taW5nXCIsXG4gICAgXCJzY2hvb2xcIixcbiAgICBcInVuaXZlcnNpdHlcIixcbiAgICBcImFjYWRlbXlcIixcbiAgICBcImluc3RpdHV0ZVwiLFxuICAgIFwid2l6YXJkXCIsXG4gICAgXCJhbWlnb3NcIixcbiAgICBcIm5vZGVcIixcbiAgICBcIm5vZGVqc1wiLFxuICAgIFwiaHRtbFwiLFxuICAgIFwiY3NzXCJcbiAgXSxcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcInNlcmFwYXRoXCIsXG4gICAgXCJlbWFpbFwiOiBcImRldkBzZXJhcGF0aC5kZVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cDovL3d3dy5naXRodWIuY29tL3NlcmFwYXRoXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiR05VIEFHUExcIixcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS93aXphcmRhbWlnb3NpbnN0aXR1dGUvd2l6YXJkYW1pZ29zaW5zdGl0dXRlLmdpdGh1Yi5pby9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cDovL3dpemFyZC5hbWlnb3MuaW5zdGl0dXRlXCJcbn1cbiJdfQ==
