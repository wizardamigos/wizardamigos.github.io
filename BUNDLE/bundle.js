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

  function getContent() {
    minixhr({ url: config.contentSRC }, function (data, response, xhr, header) {
      // debugger;
      var temp = {};
      var CONTENT = undefined;
      var array = JSON.parse(data);
      array.forEach(function (item) {
        minixhr({ url: item.url }, function (data, response, xhr, header) {
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
  }
  getContent();

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

  // var pitch = "https://rawgit.com/wizardamigosinstitute/organization/master/CONTENT/pitch.markdown";
  // var pitch2 = "https://cdn.rawgit.com/wizardamigosinstitute/organization/master/CONTENT/pitch.markdown";
  // var pitch = "https://raw.githubusercontent.com/wizardamigosinstitute/organization/master/CONTENT/pitch.markdown"
  contentSRC  : 'https://api.github.com/repos/wizardamigosinstitute/organization/contents/CONTENT?ref=master'

  // contentSRC  : 'https://api.github.com/repos/serapath/organization/contents/CONTENT?ref=master'
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
  xhr.onload=function(response){
    var headerJSON = {}, h = xhr.getAllResponseHeaders();
    h.match(/([^\n\r:]+):([^\n\r]+)/g).forEach(function(item){
      var tmp = item.split(': ');
      headerJSON[tmp[0]] = tmp[1];
    });
    callback(this.response, response, xhr, headerJSON);
  };
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
    "minixhr": "^1.2.1",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9hdG9taWZ5L25vZGVfbW9kdWxlcy9hdG9taWZ5LWpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zZXJhcGF0aC93b3Jrc3BhY2Uvc2VyYXNlZWQvSE9MRElORy93aXphcmQuYW1pZ29zLmluc3RpdHV0ZS93aXphcmRhbWlnb3NpbnN0aXR1dGUuZ2l0aHViLmlvL1NPVVJDRS9pbmRleC5qcyIsIlNPVVJDRS9pbmRleC50ZW1wbGF0ZS5odG1sIiwiU09VUkNFL25vZGVfbW9kdWxlcy9fY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL2F0b21pZnkvbm9kZV9tb2R1bGVzL2F0b21pZnktanMvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9hdG9taWZ5L25vZGVfbW9kdWxlcy9hdG9taWZ5LWpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9vcy1icm93c2VyaWZ5L2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvYXRvbWlmeS9ub2RlX21vZHVsZXMvYXRvbWlmeS1qcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2F0b21pZnkvbm9kZV9tb2R1bGVzL2F0b21pZnktanMvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9mYXN0ZG9tL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2hvbG9uLW1hcmtkb3duYm94L1NPVVJDRS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9ob2xvbi1tYXJrZG93bmJveC9TT1VSQ0UvaW5kZXgudGVtcGxhdGUuaHRtbCIsIm5vZGVfbW9kdWxlcy9ob2xvbi1tYXJrZG93bmJveC9TT1VSQ0Uvbm9kZV9tb2R1bGVzL19jb25maWcuanMiLCJub2RlX21vZHVsZXMvaG9sb24tbWFya2Rvd25ib3gvcGFja2FnZS5qc29uIiwibm9kZV9tb2R1bGVzL2h0bWwybWFya2Rvd24vaHRtbDJtYXJrZG93bi5qcyIsIm5vZGVfbW9kdWxlcy9odG1sMm1hcmtkb3duL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2h0bWwybWFya2Rvd24vbWFya2Rvd25faHRtbF9wYXJzZXIuanMiLCJub2RlX21vZHVsZXMvanNvbi1tYXR0ZXIvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pzb24tbWV0YS1tYXJrZWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvanNvbi1tZXRhLW1hcmtlZC9ub2RlX21vZHVsZXMvZXhlbWV0aG9kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtlZC9saWIvbWFya2VkLmpzIiwibm9kZV9tb2R1bGVzL21pbml4aHIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWluaXhoci9ub2RlX21vZHVsZXMveGhycG9seWZpbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0Uvbm9kZV9tb2R1bGVzL19jb25maWcuanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9wYWNrYWdlLmpzb24iLCJwYWNrYWdlLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7QUFJYixJQUFNLE9BQU8sR0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkMsSUFBTSxPQUFPLEdBQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZDLElBQU0sT0FBTyxHQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7O0FBR3ZDLElBQU0sR0FBRyxHQUFXLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hELElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7Ozs7Ozs7QUFTakQsSUFBTSxNQUFNLEdBQVEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDekMsSUFBTSxRQUFRLEdBQU0sT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDckQsSUFBSSxFQUFFLEdBQWMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsRCxTQUFTLHFCQUFxQixDQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBQ3pDLE1BQU0sU0FBUyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRTtBQUMzRCxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFMUUsTUFBSSxTQUFTLEdBQUssSUFBSSxDQUFDO0FBQ3ZCLE1BQUksT0FBTyxHQUFPLEVBQUUsQ0FBQztBQUNyQixNQUFJLFNBQVMsR0FBSyxFQUFFLENBQUM7O0FBRXJCLFdBQVMsVUFBVSxHQUFHO0FBQ3BCLFdBQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7O0FBRXpFLFVBQUksSUFBSSxHQUFNLEVBQUUsQ0FBQztBQUNqQixVQUFJLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFDeEIsVUFBSSxLQUFLLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixXQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFO0FBQzVCLGVBQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDaEUsbUJBQVMsV0FBVyxDQUFFLEdBQUcsRUFBRztBQUMxQixtQkFBTyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUM7V0FDdkQ7QUFDRCxjQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLGNBQUksVUFBVSxHQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUMsY0FBSSxJQUFJLEdBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsY0FBSSxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQ3BCLG1CQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDeEMsaUNBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsbUJBQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQ3BDLGtCQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNkLDBCQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztlQUNyQzthQUNGLENBQUMsQ0FBQztXQUNKLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNuQixnQkFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztXQUN6QixNQUFNO0FBQ0wsbUJBQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQ3BDLGtCQUFHLElBQUksS0FBSyxLQUFLLEVBQUU7QUFDakIsMEJBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2VBQ25DO2FBQ0YsQ0FBQyxDQUFDO1dBQ0o7U0FDRixDQUFDLENBQUM7T0FDSixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSjtBQUNELFlBQVUsRUFBRSxDQUFDOztBQUViLFdBQVMscUJBQXFCLENBQUUsT0FBTyxFQUFFO0FBQ3ZDLGFBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0dBQzVCO0FBQ0QsV0FBUyxVQUFVLENBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7QUFDMUMsYUFBUyxFQUFFLENBQUM7QUFDWixXQUFPLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDYixVQUFJLEVBQUUsSUFBSTtBQUNWLFVBQUksRUFBRSxFQUFFO0tBQ1QsQ0FBQztBQUNGLFFBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsUUFBSSxJQUFJLEdBQUssTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUNoQyxRQUFJLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxDQUFDO0tBQUMsQ0FBQyxDQUFDO0FBQy9ELFFBQUksR0FBRyxHQUFHLDZDQUE2QyxDQUFDO0FBQ3hELFNBQUssQ0FBQyxPQUFPLENBQUMsVUFBUyxDQUFDLEVBQUM7QUFDdkIsVUFBSSxHQUFHLEdBQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixVQUFJLElBQUksR0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckIsVUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLGFBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO0FBQ2xDLFVBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFBRSxpQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztPQUFFO0tBQ2xELENBQUMsQ0FBQzs7QUFFSCxRQUFJLENBQUMsU0FBUyxFQUFFO0FBQUUsVUFBSSxFQUFFLENBQUM7S0FBRTtHQUU1QjtBQUNELFdBQVMsT0FBTyxHQUFJOztBQUVsQixXQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtBQUNoQyxVQUFJLElBQUksR0FBRywyQ0FBMkMsQ0FBQztBQUN2RCxVQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFDLElBQUksRUFBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUU7QUFDL0MsYUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztBQUN6QixpQkFBUyxFQUFHLEdBQUc7QUFDZixlQUFPLEVBQUssRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRTtBQUNoRCxZQUFJLEVBQVEsQ0FBQztPQUNkLENBQUMsQ0FBQztBQUNILGVBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDNUIsQ0FBQyxDQUFDO0FBQ0gsU0FBSyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7QUFDMUIsT0FBQyxVQUFVLElBQUksRUFBRTtBQUNmLFlBQUksSUFBSSxHQUFHLDhCQUE4QixHQUN2Qyw4QkFBOEIsSUFDN0IsSUFBSyxLQUFLLE1BQU0sQ0FBQyxRQUFRLEdBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQSxHQUNuRCxNQUFNLEdBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQztBQUNyQixZQUFJLEdBQUcsSUFBSyxFQUFFLENBQUMsU0FBUyxHQUFDLElBQUksRUFBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUU7Ozs7QUFJaEQsV0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLE9BQU8sQ0FBRSxLQUFLLEVBQUU7O0FBRXJELGlCQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsY0FBYyxDQUFFLEdBQUcsRUFBRTtBQUM1QyxlQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQzFCLENBQUMsQ0FBQTtTQUNILENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDekIsQ0FBQSxDQUFFLElBQUksQ0FBQyxDQUFDO0tBQ1Y7R0FDRjs7QUFFRCxXQUFTLElBQUksR0FBSTtBQUNmLFdBQU8sQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUN4QixhQUFPLEVBQUUsQ0FBQztBQUNWLFNBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRTNCLE9BQUMsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtBQUNsQixZQUFJLEVBQUU7WUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNDLFlBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPO0FBQ2pDLFVBQUUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ3BDLFVBQUUsQ0FBQyxHQUFHLEdBQUcsZ0ZBQWdGLENBQUM7QUFDMUYsV0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO09BQ3RDLENBQUEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUU7O0FBRXpDLE9BQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQztBQUNmLFlBQUksRUFBRTtZQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUUsRUFBRSxDQUFDO0FBQzNELFlBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsR0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JELFVBQUUsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUMseUNBQXlDLENBQUM7QUFDMUQsV0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDO0FBQzVDLFNBQUMsQ0FBQyxLQUFLLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDN0MsQ0FBQSxDQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsYUFBYSxDQUFDLENBQUU7S0FDckMsQ0FBQyxDQUFDO0dBQ0o7O0FBRUQsTUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2IsU0FBTyxHQUFHLENBQUM7Q0FDWjs7OztBQUlELE1BQU0sQ0FBQyxPQUFPLEdBQU0scUJBQXFCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUMzSm5FOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbGpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3h2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBERVBFTkRFTkNJRVMgPSBDVVNUT00gU0RLIFtDdXN0b20gU29mdHdhcmUgRGV2ZWxvcG1lbnQgS2l0XVxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY29uc3Qgd2VicGFnZSAgICAgPSByZXF1aXJlKCd3ZWJwYWdlJyk7XG5jb25zdCBmYXN0ZG9tICAgICA9IHJlcXVpcmUoJ2Zhc3Rkb20nKTtcbmNvbnN0IG1pbml4aHIgICAgID0gcmVxdWlyZSgnbWluaXhocicpO1xuLy8gY29uc3QgbWFya2VkICAgICAgPSByZXF1aXJlKCdtYXJrZWQnKTtcbi8vIGNvbnN0IGpzb25tYXR0ZXIgID0gcmVxdWlyZSgnanNvbi1tYXR0ZXInKTtcbmNvbnN0IGptbSAgICAgICAgID0gcmVxdWlyZSgnanNvbi1tZXRhLW1hcmtlZCcpO1xuY29uc3QgbWFya2Rvd25ib3ggPSByZXF1aXJlKCdob2xvbi1tYXJrZG93bmJveCcpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBQQVJBTUVURVIgPSBBUkdVTUVOVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBubyBjbGkgdG9vbFxuICAvLyAkcGFyYW1OYW1lID0gcHJvY2Vzcy5hcmd2WzJdO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBNT0RVTEUgSU5URVJOQUxTICYgSEVMUEVSU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY29uc3QgY29uZmlnICAgICAgPSByZXF1aXJlKCdfY29uZmlnJykoKTtcbmNvbnN0IHRlbXBsYXRlICAgID0gcmVxdWlyZSgnLi9pbmRleC50ZW1wbGF0ZS5odG1sJyk7XG5sZXQgX18gICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuZnVuY3Rpb24gd2l6YXJkYW1pZ29zaW5zdGl0dXRlIChkb20sIGRhdGEpIHsgLy8gJ2RhdGEnIG1heWJlIGFsc28gdG8gdXNlIGZvciBldmVudCBkZWxlZ2F0aW9uIHBhdHRlcm5cbiAgY29uc3QgQ09NUE9ORU5UID0gKF9fLmlubmVySFRNTD10ZW1wbGF0ZSxfXy5jaGlsZE5vZGVzWzBdKTtcbiAgY29uc3QgX19sb2dvICAgID0gQ09NUE9ORU5ULnF1ZXJ5U2VsZWN0b3JBbGwoJy53aXphcmRhbWlnb3NfX2xvZ28nKVswXTtcbiAgY29uc3QgX19tZW51ICAgID0gQ09NUE9ORU5ULnF1ZXJ5U2VsZWN0b3JBbGwoJy53aXphcmRhbWlnb3NfX21lbnUnKVswXTtcbiAgY29uc3QgX19jb250ZW50ID0gQ09NUE9ORU5ULnF1ZXJ5U2VsZWN0b3JBbGwoJy53aXphcmRhbWlnb3NfX2NvbnRlbnQnKVswXTtcblxuICB2YXIgU0VNQVBIT1JFICAgPSBudWxsO1xuICB2YXIgQ09OVEVOVCAgICAgPSBbXTtcbiAgdmFyIExBTkdVQUdFUyAgID0ge307XG5cbiAgZnVuY3Rpb24gZ2V0Q29udGVudCgpIHtcbiAgICBtaW5peGhyKHsgdXJsOiBjb25maWcuY29udGVudFNSQyB9LCBmdW5jdGlvbiAoZGF0YSwgcmVzcG9uc2UsIHhociwgaGVhZGVyKSB7XG4gICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgIHZhciB0ZW1wICAgID0ge307XG4gICAgICB2YXIgQ09OVEVOVCA9IHVuZGVmaW5lZDtcbiAgICAgIHZhciBhcnJheSAgID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIGFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgbWluaXhocih7IHVybDogaXRlbS51cmwgfSwgZnVuY3Rpb24gKGRhdGEsIHJlc3BvbnNlLCB4aHIsIGhlYWRlcikge1xuICAgICAgICAgIGZ1bmN0aW9uIGI2NF90b191dGY4KCBzdHIgKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZSh3aW5kb3cuYXRvYiggc3RyICkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG9iamVjdCAgICAgID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICB2YXIganNvbm1hcmtlZCAgPSBiNjRfdG9fdXRmOChvYmplY3QuY29udGVudCk7XG4gICAgICAgICAgdmFyIG5hbWUgICAgICAgID0gb2JqZWN0Lm5hbWUuc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICBpZiAobmFtZSA9PT0gJ2luZGV4Jykge1xuICAgICAgICAgICAgQ09OVEVOVCA9IGptbS5wYXJzZShqc29ubWFya2VkKS5DT05URU5UO1xuICAgICAgICAgICAgcHJlcGFyZUFycmF5Q29udGFpbmVyKENPTlRFTlQpO1xuICAgICAgICAgICAgQ09OVEVOVC5mb3JFYWNoKGZ1bmN0aW9uICh0aXRsZSwgaWR4KSB7XG4gICAgICAgICAgICAgIGlmKHRlbXBbdGl0bGVdKSB7XG4gICAgICAgICAgICAgICAgYWRkQ29udGVudChpZHgsIHRpdGxlLCB0ZW1wW3RpdGxlXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIUNPTlRFTlQpIHtcbiAgICAgICAgICAgIHRlbXBbbmFtZV0gPSBqc29ubWFya2VkO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBDT05URU5ULmZvckVhY2goZnVuY3Rpb24gKHRpdGxlLCBpZHgpIHtcbiAgICAgICAgICAgICAgaWYobmFtZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICBhZGRDb250ZW50KGlkeCwgbmFtZSwganNvbm1hcmtlZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBnZXRDb250ZW50KCk7XG5cbiAgZnVuY3Rpb24gcHJlcGFyZUFycmF5Q29udGFpbmVyIChDT05URU5UKSB7XG4gICAgU0VNQVBIT1JFID0gQ09OVEVOVC5sZW5ndGg7XG4gIH1cbiAgZnVuY3Rpb24gYWRkQ29udGVudCAoaWR4LCBuYW1lLCBqc29ubWFya2VkKSB7XG4gICAgU0VNQVBIT1JFLS07XG4gICAgQ09OVEVOVFtpZHhdID0ge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGxhbmc6IHt9XG4gICAgfTtcbiAgICB2YXIgb2JqZWN0ID0gam1tLnBhcnNlKGpzb25tYXJrZWQpO1xuICAgIHZhciBodG1sICAgPSBvYmplY3QuX19jb250ZW50X187XG4gICAgdmFyIGxhbmdzICA9IGh0bWwuc3BsaXQoJzxocj4nKS5maWx0ZXIoZnVuY3Rpb24oeCl7cmV0dXJuIHg7fSk7XG4gICAgdmFyIHJlZyA9IC88cD48YSBocmVmPVwiQChbXFxzXFxTXSopXCI+PFxcL2E+PFxcL3A+KFtcXHNcXFNdKikvO1xuICAgIGxhbmdzLmZvckVhY2goZnVuY3Rpb24oeCl7XG4gICAgICB2YXIgdG1wICAgICA9IHgubWF0Y2gocmVnKTtcbiAgICAgIHZhciBsYW5nICAgID0gdG1wWzFdO1xuICAgICAgdmFyIGNvbnRlbnQgPSB0bXBbMl07XG4gICAgICBDT05URU5UW2lkeF0ubGFuZ1tsYW5nXSA9IGNvbnRlbnQ7XG4gICAgICBpZiAoIUxBTkdVQUdFU1tsYW5nXSkgeyBMQU5HVUFHRVNbbGFuZ10gPSB0cnVlOyB9XG4gICAgfSk7XG5cbiAgICBpZiAoIVNFTUFQSE9SRSkgeyBJTklUKCk7IH1cblxuICB9XG4gIGZ1bmN0aW9uIHByZXBhcmUgKCkge1xuICAgIC8vIEBUT0RPOiB1c2UgZmFzdGRvbVxuICAgIENPTlRFTlQuZm9yRWFjaChmdW5jdGlvbiAoeCwgaWR4KSB7XG4gICAgICB2YXIgaXRlbSA9ICc8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zX19pbmZvYm94XCI+PC9kaXY+JztcbiAgICAgIHZhciB0bXAgPSAoX18uaW5uZXJIVE1MPWl0ZW0sX18uY2hpbGROb2Rlc1swXSk7XG4gICAgICBDT05URU5UW2lkeF0gPSBtYXJrZG93bmJveCh7XG4gICAgICAgIGNvbnRhaW5lciA6IHRtcCxcbiAgICAgICAgb3B0aW9ucyAgIDogeyBkZWZhdWx0TGFuZ3VhZ2U6IGNvbmZpZy5sYW5ndWFnZSB9LFxuICAgICAgICBkYXRhICAgICAgOiB4XG4gICAgICB9KTtcbiAgICAgIF9fY29udGVudC5hcHBlbmRDaGlsZCh0bXApO1xuICAgIH0pO1xuICAgIGZvciAodmFyIGxhbmcgaW4gTEFOR1VBR0VTKSB7XG4gICAgICAoZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAnPGEgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2xhbmcnICtcbiAgICAgICAgICAnICB3aXphcmRhbWlnb3NfX2xhbmctLVNUQVRFXycgK1xuICAgICAgICAgICgobGFuZyA9PT0gY29uZmlnLmxhbmd1YWdlKSA/ICdhY3RpdmUnIDogJ2luYWN0aXZlJykgK1xuICAgICAgICAgICcgIFwiPicrbGFuZysnPC9hPic7XG4gICAgICAgIHZhciB0bXAgID0gKF9fLmlubmVySFRNTD1pdGVtLF9fLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICAvLyBAVE9ETzogc2hvdWxkIHVzZSBkZWxlZ2F0b3IgcGF0dGVybiBpbnN0ZWFkXG4gICAgICAgIC8qKioqKioqKiBXSVJFIFVQICoqKioqKioqL1xuICAgICAgICAvLyBAVE9ETzogc3dpdGNoIGxhbmd1YWdlIGJ1dHRvbnNcbiAgICAgICAgdG1wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gb25jbGljayAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBldmVudHN0b3AoZXZlbnQpO1xuICAgICAgICAgIENPTlRFTlQuZm9yRWFjaChmdW5jdGlvbiBzd2l0Y2hMYW5ndWFnZSAoYXBpKSB7XG4gICAgICAgICAgICBhcGkuY2hhbmdlTGFuZ3VhZ2UobGFuZyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIF9fbWVudS5hcHBlbmRDaGlsZCh0bXApO1xuICAgICAgfSkobGFuZyk7XG4gICAgfVxuICB9XG4gIC8qKioqKiogSU5JVElBTElaRSAqKioqKioqL1xuICBmdW5jdGlvbiBJTklUICgpIHtcbiAgICBmYXN0ZG9tLndyaXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHByZXBhcmUoKTtcbiAgICAgIGRvbS5hcHBlbmRDaGlsZChDT01QT05FTlQpO1xuICAgICAgLy8gRkFDRUJPT0tcbiAgICAgIChmdW5jdGlvbihkLCBzLCBpZCkge1xuICAgICAgICB2YXIganMsIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07XG4gICAgICAgIGlmIChkLmdldEVsZW1lbnRCeUlkKGlkKSkgcmV0dXJuO1xuICAgICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTsganMuaWQgPSBpZDtcbiAgICAgICAganMuc3JjID0gXCIvL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX0dCL3Nkay5qcyN4ZmJtbD0xJnZlcnNpb249djIuMyZhcHBJZD0zMjIyNDk4ODEyNDAyNjJcIjtcbiAgICAgICAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLCBmanMpO1xuICAgICAgfShkb2N1bWVudCwgJ3NjcmlwdCcsICdmYWNlYm9vay1qc3NkaycpKTtcbiAgICAgIC8vIFRXSVRURVJcbiAgICAgIChmdW5jdGlvbihkLHMsaWQpe1xuICAgICAgICB2YXIganMsZmpzPWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF0sdD13aW5kb3cudHd0dHJ8fHt9O1xuICAgICAgICBpZihkLmdldEVsZW1lbnRCeUlkKGlkKSlyZXR1cm47anM9ZC5jcmVhdGVFbGVtZW50KHMpO1xuICAgICAgICBqcy5pZD1pZDtqcy5zcmM9XCJodHRwczovL3BsYXRmb3JtLnR3aXR0ZXIuY29tL3dpZGdldHMuanNcIjtcbiAgICAgICAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLGZqcyk7dC5fZT1bXTtcbiAgICAgICAgdC5yZWFkeT1mdW5jdGlvbihmKXt0Ll9lLnB1c2goZik7fTtyZXR1cm4gdDtcbiAgICAgIH0oZG9jdW1lbnQsXCJzY3JpcHRcIixcInR3aXR0ZXItd2pzXCIpKTtcbiAgICB9KTtcbiAgfVxuICAvKioqKioqKiogUkVUVVJOICoqKioqKioqKi9cbiAgdmFyIEFQSSA9IHt9OyAvLyBzaG91bGQgYmUgYW4gZXZlbnQgZW1pdHRlciB0b29cbiAgcmV0dXJuIEFQSTtcbn1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgICA9IHdpemFyZGFtaWdvc2luc3RpdHV0ZSh3ZWJwYWdlKGNvbmZpZyksIGNvbmZpZyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zXCI+XFxuICA8aW1nIGNsYXNzPVwid2l6YXJkYW1pZ29zX19sb2dvXCIgc3JjPVwiL0JVTkRMRS9hc3NldHMvMDYxOTE1ZDAxMDMxMWQ2ZS5zdmdcIj5cXG5cXG4gIDxkaXYgaWQ9XCJmYi1yb290XCI+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZmItc2hhcmUtYnV0dG9uXCJcXG4gICAgZGF0YS1ocmVmPVwiaHR0cDovL3dpemFyZC5hbWlnb3MuaW5zdGl0dXRlL1wiXFxuICAgIGRhdGEtbGF5b3V0PVwiYnV0dG9uXCI+XFxuICA8L2Rpdj48YnI+XFxuICA8YSBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIiBjbGFzcz1cInR3aXR0ZXItc2hhcmUtYnV0dG9uXCJcXG4gICAgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vc2hhcmVcIlxcbiAgICBkYXRhLXVybD1cImh0dHA6Ly9iaXQubHkvd2l6YXJkYW1pZ29zaW5zdGl0dXRlXCJcXG4gICAgZGF0YS1jb3VudHVybD1cImh0dHA6Ly93aXphcmQuYW1pZ29zLmluc3RpdHV0ZVwiXFxuICAgIGRhdGEtdGV4dD1cIkNvZGluZyBmb3Iga2lkcyBpbiBiZXJsaW4gOi0pXCJcXG4gICAgZGF0YS1oYXNodGFncz1cIiNiZXJsaW4gI3Byb2dyYW1taW5nICNzY2hvb2xcIlxcbiAgICBkYXRhLXJlbGF0ZWQ9XCJzZXJhcGF0aDpXaXphcmQgQW1pZ29zIE9yZ2FuaXplclwiXFxuICAgIGRhdGEtbGFuZz1cImRlXCJcXG4gICAgZGF0YS12aWE9XCJ3aXphcmRhbWlnb3NcIlxcbiAgICBkYXRhLXNpemU9XCJub3JtYWxcIlxcbiAgICBkYXRhLWNvdW50PVwibm9uZVwiPlxcbiAgVHdlZXQgdXMgOi0pXFxuICA8L2E+XFxuICA8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zX19tZW51XCI+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zX19jb250ZW50XCI+PC9kaXY+XFxuPC9kaXY+XFxuJzsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIHBrZyAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJyk7XG4vLyB2YXIgcGFyYW1zICAgICAgPSByZXF1aXJlKCcnKSB0cnkgbG9hZCBmaWxlcyBpbiBpZnJhbWUgYW5kIHNjcmFwZSBpdCB0byBjaXJjdW12ZW50IENPUlNcbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2lmcmFtZS1hcGlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgTU9EVUxFIElOVEVSTkFMUyAmIEhFTFBFUlNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfY29uZmlnICAgICA9IHtcbiAgdGl0bGUgICAgICAgOiAnV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUnLFxuICBkZXNjcmlwdGlvbiA6IHBrZy5kZXNjcmlwdGlvbixcbiAgdmVyc2lvbiAgICAgOiBwa2cudmVyc2lvbixcbiAga2V5d29yZHMgICAgOiBwa2cua2V5d29yZHMuam9pbignLCAnKSxcbiAgYXV0aG9yICAgICAgOiBwa2cuYXV0aG9yLm5hbWUsXG4gIHdlYnNpdGUgICAgIDogcGtnLmhvbWVwYWdlLFxuICBsYW5ndWFnZSAgICA6ICdnZXJtYW4nLFxuICBnYSAgICAgICAgICA6ICdVQS02MjMxMDgwNy0xJyxcbiAgc3R5bGUgICAgICAgOiBwa2cuYXRvbWlmeS5jc3Mub3V0cHV0LFxuXG4gIC8vIHZhciBwaXRjaCA9IFwiaHR0cHM6Ly9yYXdnaXQuY29tL3dpemFyZGFtaWdvc2luc3RpdHV0ZS9vcmdhbml6YXRpb24vbWFzdGVyL0NPTlRFTlQvcGl0Y2gubWFya2Rvd25cIjtcbiAgLy8gdmFyIHBpdGNoMiA9IFwiaHR0cHM6Ly9jZG4ucmF3Z2l0LmNvbS93aXphcmRhbWlnb3NpbnN0aXR1dGUvb3JnYW5pemF0aW9uL21hc3Rlci9DT05URU5UL3BpdGNoLm1hcmtkb3duXCI7XG4gIC8vIHZhciBwaXRjaCA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3dpemFyZGFtaWdvc2luc3RpdHV0ZS9vcmdhbml6YXRpb24vbWFzdGVyL0NPTlRFTlQvcGl0Y2gubWFya2Rvd25cIlxuICBjb250ZW50U1JDICA6ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL3dpemFyZGFtaWdvc2luc3RpdHV0ZS9vcmdhbml6YXRpb24vY29udGVudHMvQ09OVEVOVD9yZWY9bWFzdGVyJ1xuXG4gIC8vIGNvbnRlbnRTUkMgIDogJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3Mvc2VyYXBhdGgvb3JnYW5pemF0aW9uL2NvbnRlbnRzL0NPTlRFTlQ/cmVmPW1hc3Rlcidcbn07XG5mdW5jdGlvbiBjb25maWcgKGtleSkge1xuICByZXR1cm4ga2V5ID8gX2NvbmZpZ1trZXldIDogX2NvbmZpZztcbn1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSBjb25maWc7XG4iLG51bGwsImV4cG9ydHMuZW5kaWFubmVzcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdMRScgfTtcblxuZXhwb3J0cy5ob3N0bmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbG9jYXRpb24uaG9zdG5hbWVcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gJyc7XG59O1xuXG5leHBvcnRzLmxvYWRhdmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9O1xuXG5leHBvcnRzLnVwdGltZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDAgfTtcblxuZXhwb3J0cy5mcmVlbWVtID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xufTtcblxuZXhwb3J0cy50b3RhbG1lbSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbn07XG5cbmV4cG9ydHMuY3B1cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdIH07XG5cbmV4cG9ydHMudHlwZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdCcm93c2VyJyB9O1xuXG5leHBvcnRzLnJlbGVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcblxuZXhwb3J0cy5uZXR3b3JrSW50ZXJmYWNlc1xuPSBleHBvcnRzLmdldE5ldHdvcmtJbnRlcmZhY2VzXG49IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHt9IH07XG5cbmV4cG9ydHMuYXJjaCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdqYXZhc2NyaXB0JyB9O1xuXG5leHBvcnRzLnBsYXRmb3JtID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ2Jyb3dzZXInIH07XG5cbmV4cG9ydHMudG1wZGlyID0gZXhwb3J0cy50bXBEaXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcvdG1wJztcbn07XG5cbmV4cG9ydHMuRU9MID0gJ1xcbic7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBTcGxpdCBhIGZpbGVuYW1lIGludG8gW3Jvb3QsIGRpciwgYmFzZW5hbWUsIGV4dF0sIHVuaXggdmVyc2lvblxuLy8gJ3Jvb3QnIGlzIGp1c3QgYSBzbGFzaCwgb3Igbm90aGluZy5cbnZhciBzcGxpdFBhdGhSZSA9XG4gICAgL14oXFwvP3wpKFtcXHNcXFNdKj8pKCg/OlxcLnsxLDJ9fFteXFwvXSs/fCkoXFwuW14uXFwvXSp8KSkoPzpbXFwvXSopJC87XG52YXIgc3BsaXRQYXRoID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aFJlLmV4ZWMoZmlsZW5hbWUpLnNsaWNlKDEpO1xufTtcblxuLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNvbHZlZFBhdGggPSAnJyxcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xufTtcblxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMubm9ybWFsaXplID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XG4gICAgcGF0aCA9ICcuJztcbiAgfVxuICBpZiAocGF0aCAmJiB0cmFpbGluZ1NsYXNoKSB7XG4gICAgcGF0aCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLCBmdW5jdGlvbihwLCBpbmRleCkge1xuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9KS5qb2luKCcvJykpO1xufTtcblxuXG4vLyBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gIGZyb20gPSBleHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO1xuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xuXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xuICB9XG5cbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xuXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIG91dHB1dFBhcnRzID0gW107XG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG5cbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcblxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xufTtcblxuZXhwb3J0cy5zZXAgPSAnLyc7XG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcblxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgcmVzdWx0ID0gc3BsaXRQYXRoKHBhdGgpLFxuICAgICAgcm9vdCA9IHJlc3VsdFswXSxcbiAgICAgIGRpciA9IHJlc3VsdFsxXTtcblxuICBpZiAoIXJvb3QgJiYgIWRpcikge1xuICAgIC8vIE5vIGRpcm5hbWUgd2hhdHNvZXZlclxuICAgIHJldHVybiAnLic7XG4gIH1cblxuICBpZiAoZGlyKSB7XG4gICAgLy8gSXQgaGFzIGEgZGlybmFtZSwgc3RyaXAgdHJhaWxpbmcgc2xhc2hcbiAgICBkaXIgPSBkaXIuc3Vic3RyKDAsIGRpci5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIHJldHVybiByb290ICsgZGlyO1xufTtcblxuXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24ocGF0aCwgZXh0KSB7XG4gIHZhciBmID0gc3BsaXRQYXRoKHBhdGgpWzJdO1xuICAvLyBUT0RPOiBtYWtlIHRoaXMgY29tcGFyaXNvbiBjYXNlLWluc2Vuc2l0aXZlIG9uIHdpbmRvd3M/XG4gIGlmIChleHQgJiYgZi5zdWJzdHIoLTEgKiBleHQubGVuZ3RoKSA9PT0gZXh0KSB7XG4gICAgZiA9IGYuc3Vic3RyKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIGY7XG59O1xuXG5cbmV4cG9ydHMuZXh0bmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aChwYXRoKVszXTtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xuICAgIH1cbjtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhbk11dGF0aW9uT2JzZXJ2ZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIHZhciBxdWV1ZSA9IFtdO1xuXG4gICAgaWYgKGNhbk11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIGhpZGRlbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWV1ZUxpc3QgPSBxdWV1ZS5zbGljZSgpO1xuICAgICAgICAgICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHF1ZXVlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShoaWRkZW5EaXYsIHsgYXR0cmlidXRlczogdHJ1ZSB9KTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaGlkZGVuRGl2LnNldEF0dHJpYnV0ZSgneWVzJywgJ25vJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iLCIvKipcbiAqIEZhc3REb21cbiAqXG4gKiBFbGltaW5hdGVzIGxheW91dCB0aHJhc2hpbmdcbiAqIGJ5IGJhdGNoaW5nIERPTSByZWFkL3dyaXRlXG4gKiBpbnRlcmFjdGlvbnMuXG4gKlxuICogQGF1dGhvciBXaWxzb24gUGFnZSA8d2lsc29ucGFnZUBtZS5jb20+XG4gKi9cblxuOyhmdW5jdGlvbihmYXN0ZG9tKXtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gTm9ybWFsaXplIHJBRlxuICB2YXIgcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgZnVuY3Rpb24oY2IpIHsgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGNiLCAxMDAwIC8gNjApOyB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnJlc2hcbiAgICogRmFzdERvbSBpbnN0YW5jZS5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBGYXN0RG9tKCkge1xuICAgIHRoaXMuZnJhbWVzID0gW107XG4gICAgdGhpcy5sYXN0SWQgPSAwO1xuXG4gICAgLy8gUGxhY2luZyB0aGUgckFGIG1ldGhvZFxuICAgIC8vIG9uIHRoZSBpbnN0YW5jZSBhbGxvd3NcbiAgICAvLyB1cyB0byByZXBsYWNlIGl0IHdpdGhcbiAgICAvLyBhIHN0dWIgZm9yIHRlc3RpbmcuXG4gICAgdGhpcy5yYWYgPSByYWY7XG5cbiAgICB0aGlzLmJhdGNoID0ge1xuICAgICAgaGFzaDoge30sXG4gICAgICByZWFkOiBbXSxcbiAgICAgIHdyaXRlOiBbXSxcbiAgICAgIG1vZGU6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBqb2IgdG8gdGhlXG4gICAqIHJlYWQgYmF0Y2ggYW5kIHNjaGVkdWxlc1xuICAgKiBhIG5ldyBmcmFtZSBpZiBuZWVkIGJlLlxuICAgKlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uKGZuLCBjdHgpIHtcbiAgICB2YXIgam9iID0gdGhpcy5hZGQoJ3JlYWQnLCBmbiwgY3R4KTtcbiAgICB2YXIgaWQgPSBqb2IuaWQ7XG5cbiAgICAvLyBBZGQgdGhpcyBqb2IgdG8gdGhlIHJlYWQgcXVldWVcbiAgICB0aGlzLmJhdGNoLnJlYWQucHVzaChqb2IuaWQpO1xuXG4gICAgLy8gV2Ugc2hvdWxkICpub3QqIHNjaGVkdWxlIGEgbmV3IGZyYW1lIGlmOlxuICAgIC8vIDEuIFdlJ3JlICdyZWFkaW5nJ1xuICAgIC8vIDIuIEEgZnJhbWUgaXMgYWxyZWFkeSBzY2hlZHVsZWRcbiAgICB2YXIgZG9lc250TmVlZEZyYW1lID0gdGhpcy5iYXRjaC5tb2RlID09PSAncmVhZGluZydcbiAgICAgIHx8IHRoaXMuYmF0Y2guc2NoZWR1bGVkO1xuXG4gICAgLy8gSWYgYSBmcmFtZSBpc24ndCBuZWVkZWQsIHJldHVyblxuICAgIGlmIChkb2VzbnROZWVkRnJhbWUpIHJldHVybiBpZDtcblxuICAgIC8vIFNjaGVkdWxlIGEgbmV3XG4gICAgLy8gZnJhbWUsIHRoZW4gcmV0dXJuXG4gICAgdGhpcy5zY2hlZHVsZUJhdGNoKCk7XG4gICAgcmV0dXJuIGlkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgam9iIHRvIHRoZVxuICAgKiB3cml0ZSBiYXRjaCBhbmQgc2NoZWR1bGVzXG4gICAqIGEgbmV3IGZyYW1lIGlmIG5lZWQgYmUuXG4gICAqXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICAgKiBAcHVibGljXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKGZuLCBjdHgpIHtcbiAgICB2YXIgam9iID0gdGhpcy5hZGQoJ3dyaXRlJywgZm4sIGN0eCk7XG4gICAgdmFyIG1vZGUgPSB0aGlzLmJhdGNoLm1vZGU7XG4gICAgdmFyIGlkID0gam9iLmlkO1xuXG4gICAgLy8gUHVzaCB0aGUgam9iIGlkIGludG8gdGhlIHF1ZXVlXG4gICAgdGhpcy5iYXRjaC53cml0ZS5wdXNoKGpvYi5pZCk7XG5cbiAgICAvLyBXZSBzaG91bGQgKm5vdCogc2NoZWR1bGUgYSBuZXcgZnJhbWUgaWY6XG4gICAgLy8gMS4gV2UgYXJlICd3cml0aW5nJ1xuICAgIC8vIDIuIFdlIGFyZSAncmVhZGluZydcbiAgICAvLyAzLiBBIGZyYW1lIGlzIGFscmVhZHkgc2NoZWR1bGVkLlxuICAgIHZhciBkb2VzbnROZWVkRnJhbWUgPSBtb2RlID09PSAnd3JpdGluZydcbiAgICAgIHx8IG1vZGUgPT09ICdyZWFkaW5nJ1xuICAgICAgfHwgdGhpcy5iYXRjaC5zY2hlZHVsZWQ7XG5cbiAgICAvLyBJZiBhIGZyYW1lIGlzbid0IG5lZWRlZCwgcmV0dXJuXG4gICAgaWYgKGRvZXNudE5lZWRGcmFtZSkgcmV0dXJuIGlkO1xuXG4gICAgLy8gU2NoZWR1bGUgYSBuZXdcbiAgICAvLyBmcmFtZSwgdGhlbiByZXR1cm5cbiAgICB0aGlzLnNjaGVkdWxlQmF0Y2goKTtcbiAgICByZXR1cm4gaWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlZmVycyB0aGUgZ2l2ZW4gam9iXG4gICAqIGJ5IHRoZSBudW1iZXIgb2YgZnJhbWVzXG4gICAqIHNwZWNpZmllZC5cbiAgICpcbiAgICogSWYgbm8gZnJhbWVzIGFyZSBnaXZlblxuICAgKiB0aGVuIHRoZSBqb2IgaXMgcnVuIGluXG4gICAqIHRoZSBuZXh0IGZyZWUgZnJhbWUuXG4gICAqXG4gICAqIEBwYXJhbSAge051bWJlcn0gICBmcmFtZVxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuZGVmZXIgPSBmdW5jdGlvbihmcmFtZSwgZm4sIGN0eCkge1xuXG4gICAgLy8gQWNjZXB0cyB0d28gYXJndW1lbnRzXG4gICAgaWYgKHR5cGVvZiBmcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3R4ID0gZm47XG4gICAgICBmbiA9IGZyYW1lO1xuICAgICAgZnJhbWUgPSAxO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgaW5kZXggPSBmcmFtZSAtIDE7XG5cbiAgICByZXR1cm4gdGhpcy5zY2hlZHVsZShpbmRleCwgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnJ1bih7XG4gICAgICAgIGZuOiBmbixcbiAgICAgICAgY3R4OiBjdHhcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYSBzY2hlZHVsZWQgJ3JlYWQnLFxuICAgKiAnd3JpdGUnIG9yICdkZWZlcicgam9iLlxuICAgKlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nfSBpZFxuICAgKiBAcHVibGljXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKGlkKSB7XG5cbiAgICAvLyBEZWZlciBqb2JzIGFyZSBjbGVhcmVkIGRpZmZlcmVudGx5XG4gICAgaWYgKHR5cGVvZiBpZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMuY2xlYXJGcmFtZShpZCk7XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgaWRzIHRvIGJlIHBhc3NlZCBhcyBzdHJpbmdzXG4gICAgaWQgPSBOdW1iZXIoaWQpO1xuXG4gICAgdmFyIGpvYiA9IHRoaXMuYmF0Y2guaGFzaFtpZF07XG4gICAgaWYgKCFqb2IpIHJldHVybjtcblxuICAgIHZhciBsaXN0ID0gdGhpcy5iYXRjaFtqb2IudHlwZV07XG4gICAgdmFyIGluZGV4ID0gbGlzdC5pbmRleE9mKGlkKTtcblxuICAgIC8vIENsZWFyIHJlZmVyZW5jZXNcbiAgICBkZWxldGUgdGhpcy5iYXRjaC5oYXNoW2lkXTtcbiAgICBpZiAofmluZGV4KSBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFycyBhIHNjaGVkdWxlZCBmcmFtZS5cbiAgICpcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZyYW1lXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5jbGVhckZyYW1lID0gZnVuY3Rpb24oZnJhbWUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmZyYW1lcy5pbmRleE9mKGZyYW1lKTtcbiAgICBpZiAofmluZGV4KSB0aGlzLmZyYW1lcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTY2hlZHVsZXMgYSBuZXcgcmVhZC93cml0ZVxuICAgKiBiYXRjaCBpZiBvbmUgaXNuJ3QgcGVuZGluZy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnNjaGVkdWxlQmF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBTY2hlZHVsZSBiYXRjaCBmb3IgbmV4dCBmcmFtZVxuICAgIHRoaXMuc2NoZWR1bGUoMCwgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmJhdGNoLnNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgc2VsZi5ydW5CYXRjaCgpO1xuICAgIH0pO1xuXG4gICAgLy8gU2V0IGZsYWcgdG8gaW5kaWNhdGVcbiAgICAvLyBhIGZyYW1lIGhhcyBiZWVuIHNjaGVkdWxlZFxuICAgIHRoaXMuYmF0Y2guc2NoZWR1bGVkID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgdW5pcXVlXG4gICAqIGlkIGZvciBhIGpvYi5cbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUudW5pcXVlSWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKyt0aGlzLmxhc3RJZDtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgZWFjaCBqb2IgaW5cbiAgICogdGhlIGxpc3QgcGFzc2VkLlxuICAgKlxuICAgKiBJZiBhIGNvbnRleHQgaGFzIGJlZW5cbiAgICogc3RvcmVkIG9uIHRoZSBmdW5jdGlvblxuICAgKiB0aGVuIGl0IGlzIHVzZWQsIGVsc2UgdGhlXG4gICAqIGN1cnJlbnQgYHRoaXNgIGlzIHVzZWQuXG4gICAqXG4gICAqIEBwYXJhbSAge0FycmF5fSBsaXN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgICB2YXIgaWQ7XG5cbiAgICB3aGlsZSAoaWQgPSBsaXN0LnNoaWZ0KCkpIHtcbiAgICAgIHRoaXMucnVuKHRoaXMuYmF0Y2guaGFzaFtpZF0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUnVucyBhbnkgJ3JlYWQnIGpvYnMgZm9sbG93ZWRcbiAgICogYnkgYW55ICd3cml0ZScgam9icy5cbiAgICpcbiAgICogV2UgcnVuIHRoaXMgaW5zaWRlIGEgdHJ5IGNhdGNoXG4gICAqIHNvIHRoYXQgaWYgYW55IGpvYnMgZXJyb3IsIHdlXG4gICAqIGFyZSBhYmxlIHRvIHJlY292ZXIgYW5kIGNvbnRpbnVlXG4gICAqIHRvIGZsdXNoIHRoZSBiYXRjaCB1bnRpbCBpdCdzIGVtcHR5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUucnVuQmF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuXG4gICAgICAvLyBTZXQgdGhlIG1vZGUgdG8gJ3JlYWRpbmcnLFxuICAgICAgLy8gdGhlbiBlbXB0eSBhbGwgcmVhZCBqb2JzXG4gICAgICB0aGlzLmJhdGNoLm1vZGUgPSAncmVhZGluZyc7XG4gICAgICB0aGlzLmZsdXNoKHRoaXMuYmF0Y2gucmVhZCk7XG5cbiAgICAgIC8vIFNldCB0aGUgbW9kZSB0byAnd3JpdGluZydcbiAgICAgIC8vIHRoZW4gZW1wdHkgYWxsIHdyaXRlIGpvYnNcbiAgICAgIHRoaXMuYmF0Y2gubW9kZSA9ICd3cml0aW5nJztcbiAgICAgIHRoaXMuZmx1c2godGhpcy5iYXRjaC53cml0ZSk7XG5cbiAgICAgIHRoaXMuYmF0Y2gubW9kZSA9IG51bGw7XG5cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnJ1bkJhdGNoKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBqb2IgdG9cbiAgICogdGhlIGdpdmVuIGJhdGNoLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSAgIGxpc3RcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHBhcmFtIHtPYmplY3R9ICAgY3R4XG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGlkXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbih0eXBlLCBmbiwgY3R4KSB7XG4gICAgdmFyIGlkID0gdGhpcy51bmlxdWVJZCgpO1xuICAgIHJldHVybiB0aGlzLmJhdGNoLmhhc2hbaWRdID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZm46IGZuLFxuICAgICAgY3R4OiBjdHgsXG4gICAgICB0eXBlOiB0eXBlXG4gICAgfTtcbiAgfTtcblxuICAvKipcbiAgICogUnVucyBhIGdpdmVuIGpvYi5cbiAgICpcbiAgICogQXBwbGljYXRpb25zIHVzaW5nIEZhc3REb21cbiAgICogaGF2ZSB0aGUgb3B0aW9ucyBvZiBzZXR0aW5nXG4gICAqIGBmYXN0ZG9tLm9uRXJyb3JgLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgY2F0Y2ggYW55XG4gICAqIGVycm9ycyB0aGF0IG1heSB0aHJvd1xuICAgKiBpbnNpZGUgY2FsbGJhY2tzLCB3aGljaFxuICAgKiBpcyB1c2VmdWwgYXMgb2Z0ZW4gRE9NXG4gICAqIG5vZGVzIGhhdmUgYmVlbiByZW1vdmVkXG4gICAqIHNpbmNlIGEgam9iIHdhcyBzY2hlZHVsZWQuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqXG4gICAqICAgZmFzdGRvbS5vbkVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgKiAgICAgLy8gUnVucyB3aGVuIGpvYnMgZXJyb3JcbiAgICogICB9O1xuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGpvYlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oam9iKXtcbiAgICB2YXIgY3R4ID0gam9iLmN0eCB8fCB0aGlzO1xuICAgIHZhciBmbiA9IGpvYi5mbjtcblxuICAgIC8vIENsZWFyIHJlZmVyZW5jZSB0byB0aGUgam9iXG4gICAgZGVsZXRlIHRoaXMuYmF0Y2guaGFzaFtqb2IuaWRdO1xuXG4gICAgLy8gSWYgbm8gYG9uRXJyb3JgIGhhbmRsZXJcbiAgICAvLyBoYXMgYmVlbiByZWdpc3RlcmVkLCBqdXN0XG4gICAgLy8gcnVuIHRoZSBqb2Igbm9ybWFsbHkuXG4gICAgaWYgKCF0aGlzLm9uRXJyb3IpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKGN0eCk7XG4gICAgfVxuXG4gICAgLy8gSWYgYW4gYG9uRXJyb3JgIGhhbmRsZXJcbiAgICAvLyBoYXMgYmVlbiByZWdpc3RlcmVkLCBjYXRjaFxuICAgIC8vIGVycm9ycyB0aGF0IHRocm93IGluc2lkZVxuICAgIC8vIGNhbGxiYWNrcywgYW5kIHJ1biB0aGVcbiAgICAvLyBoYW5kbGVyIGluc3RlYWQuXG4gICAgdHJ5IHsgZm4uY2FsbChjdHgpOyB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLm9uRXJyb3IoZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGFydHMgYSByQUYgbG9vcFxuICAgKiB0byBlbXB0eSB0aGUgZnJhbWUgcXVldWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciByYWYgPSB0aGlzLnJhZjtcblxuICAgIC8vIERvbid0IHN0YXJ0IG1vcmUgdGhhbiBvbmUgbG9vcFxuICAgIGlmICh0aGlzLmxvb3BpbmcpIHJldHVybjtcblxuICAgIHJhZihmdW5jdGlvbiBmcmFtZSgpIHtcbiAgICAgIHZhciBmbiA9IHNlbGYuZnJhbWVzLnNoaWZ0KCk7XG5cbiAgICAgIC8vIElmIG5vIG1vcmUgZnJhbWVzLFxuICAgICAgLy8gc3RvcCBsb29waW5nXG4gICAgICBpZiAoIXNlbGYuZnJhbWVzLmxlbmd0aCkge1xuICAgICAgICBzZWxmLmxvb3BpbmcgPSBmYWxzZTtcblxuICAgICAgLy8gT3RoZXJ3aXNlLCBzY2hlZHVsZSB0aGVcbiAgICAgIC8vIG5leHQgZnJhbWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhZihmcmFtZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biB0aGUgZnJhbWUuICBOb3RlIHRoYXRcbiAgICAgIC8vIHRoaXMgbWF5IHRocm93IGFuIGVycm9yXG4gICAgICAvLyBpbiB1c2VyIGNvZGUsIGJ1dCBhbGxcbiAgICAgIC8vIGZhc3Rkb20gdGFza3MgYXJlIGRlYWx0XG4gICAgICAvLyB3aXRoIGFscmVhZHkgc28gdGhlIGNvZGVcbiAgICAgIC8vIHdpbGwgY29udGludWUgdG8gaXRlcmF0ZVxuICAgICAgaWYgKGZuKSBmbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb29waW5nID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIGZ1bmN0aW9uIHRvXG4gICAqIGEgc3BlY2lmaWVkIGluZGV4XG4gICAqIG9mIHRoZSBmcmFtZSBxdWV1ZS5cbiAgICpcbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIGluZGV4XG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24oaW5kZXgsIGZuKSB7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhpcyBzbG90XG4gICAgLy8gaGFzbid0IGFscmVhZHkgYmVlblxuICAgIC8vIHRha2VuLiBJZiBpdCBoYXMsIHRyeVxuICAgIC8vIHJlLXNjaGVkdWxpbmcgZm9yIHRoZSBuZXh0IHNsb3RcbiAgICBpZiAodGhpcy5mcmFtZXNbaW5kZXhdKSB7XG4gICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZShpbmRleCArIDEsIGZuKTtcbiAgICB9XG5cbiAgICAvLyBTdGFydCB0aGUgckFGXG4gICAgLy8gbG9vcCB0byBlbXB0eVxuICAgIC8vIHRoZSBmcmFtZSBxdWV1ZVxuICAgIHRoaXMubG9vcCgpO1xuXG4gICAgLy8gSW5zZXJ0IHRoaXMgZnVuY3Rpb24gaW50b1xuICAgIC8vIHRoZSBmcmFtZXMgcXVldWUgYW5kIHJldHVyblxuICAgIHJldHVybiB0aGlzLmZyYW1lc1tpbmRleF0gPSBmbjtcbiAgfTtcblxuICAvLyBXZSBvbmx5IGV2ZXIgd2FudCB0aGVyZSB0byBiZVxuICAvLyBvbmUgaW5zdGFuY2Ugb2YgRmFzdERvbSBpbiBhbiBhcHBcbiAgZmFzdGRvbSA9IGZhc3Rkb20gfHwgbmV3IEZhc3REb20oKTtcblxuICAvKipcbiAgICogRXhwb3NlICdmYXN0ZG9tJ1xuICAgKi9cblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhc3Rkb207XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCl7IHJldHVybiBmYXN0ZG9tOyB9KTtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3dbJ2Zhc3Rkb20nXSA9IGZhc3Rkb207XG4gIH1cblxufSkod2luZG93LmZhc3Rkb20pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBERVBFTkRFTkNJRVMgPSBDVVNUT00gU0RLIFtDdXN0b20gU29mdHdhcmUgRGV2ZWxvcG1lbnQgS2l0XVxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy8gY29uc3Qgb3MgICAgICAgID0gcmVxdWlyZSgnb3MnKTtcbi8vIGNvbnN0IG1ldGhvZCAgICA9IHJlcXVpcmUoJ2V4ZW1ldGhvZCcpKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGI7fSk7XG4vLyBjb25zdCBmYXN0ZG9tICAgPSByZXF1aXJlKCdmYXN0ZG9tJyk7XG4vLyBjb25zdCBtaW5peGhyICAgPSByZXF1aXJlKCdtaW5peGhyJyk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFUlJPUlNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IGVycm9yICAgICA9IHtcbiAgY29udGFpbmVyICgpICAgIHsgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBmb3IgY29udGFpbmVyOmRvbSBpcyBtaXNzaW5nJyk7IH1cbn07XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIE1PRFVMRSBJTlRFUk5BTFMgJiBIRUxQRVJTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBjb25maWcgICAgPSByZXF1aXJlKCdfY29uZmlnJykoKTtcbmNvbnN0IHRlbXBsYXRlICA9IHJlcXVpcmUoJy4vaW5kZXgudGVtcGxhdGUuaHRtbCcpO1xuY29uc3QgX18gICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBtYXJrZG93bmJveCAocGFyYW1ldGVyKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAVE9ETzogZW1wbG95IHNvbWUga2luZCBvZiBcImV4dGVuZFwiIG9yIFwieHRlbmRcIiBvciBcIm1lcmdlXCIgc3RyYXRlZ3kgaW5zdGVhZCBvZiBcIlhPUlwiXG4gIC8qKioqKiogSU5JVElBTElaRSAqKioqKioqL1xuICBjb25zdCBDT05UQUlORVIgPSBwYXJhbWV0ZXIuY29udGFpbmVyIHx8IGVycm9yLmNvbnRhaW5lcigpO1xuICBjb25zdCBPUFRJT05TICAgPSBwYXJhbWV0ZXIub3B0aW9ucyAgIHx8IGNvbmZpZy5vcHRpb25zO1xuICBjb25zdCBEQVRBICAgICAgPSBwYXJhbWV0ZXIuZGF0YSAgICAgIHx8IG51bGw7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQFRPRE86IG1heWJlIGFsd2F5cyBhIFwibGV2ZWxcIiBpbnRlcmZhY2U/XG4gIGNvbnN0IENISUxEUkVOICA9IHBhcmFtZXRlci5jaGlsZHJlbiAgfHwge307XG5cbiAgLyoqKioqKiBXSVJFIFVQICoqKioqKiovXG4gIGNvbnN0IENPTVBPTkVOVCA9IChfXy5pbm5lckhUTUw9dGVtcGxhdGUsX18uY2hpbGROb2Rlc1swXSk7XG5cbiAgQ09NUE9ORU5ULmlubmVySFRNTCA9IERBVEEubGFuZ1tPUFRJT05TLmRlZmF1bHRMYW5ndWFnZV07XG4gIENPTlRBSU5FUi5hcHBlbmRDaGlsZChDT01QT05FTlQpO1xuXG4gIC8vIEBUT0RPOiBhZGQgREFUQSBkZXNjcmlwdGlvbiAtIGJlY2F1c2UgaXQgc2hvdWxkIGJlIFwianNvbi1tZXRhLW1hcmtkb3duXCIgOi0pXG5cbiAgLyoqKioqKioqIFJFVFVSTiAqKioqKioqKiovXG4gIGNvbnN0IEFQSSA9IHsgLy8gc2hvdWxkIGJlIGFuIGV2ZW50IGVtaXR0ZXIgdG9vXG4gICAgY2hhbmdlTGFuZ3VhZ2UgKGxhbmd1YWdlKSB7XG4gICAgICBDT01QT05FTlQuaW5uZXJIVE1MID0gREFUQS5sYW5nW2xhbmd1YWdlXTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBBUEk7XG5cbn1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgTU9EVUxFID0gRVhQT1JUIFtQdWJsaWMgSW50ZXJmYWNlXVxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgPSBtYXJrZG93bmJveDtcbiIsIm1vZHVsZS5leHBvcnRzID0gJzxkaXYgY2xhc3M9XCJNYXJrZG93bmJveFwiPjwvZGl2Plxcbic7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBERVBFTkRFTkNJRVNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBwa2cgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpO1xuLy8gdmFyIHBhcmFtcyAgICAgID0gcmVxdWlyZSgnJykgdHJ5IGxvYWQgZmlsZXMgaW4gaWZyYW1lIGFuZCBzY3JhcGUgaXQgdG8gY2lyY3VtdmVudCBDT1JTXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9pZnJhbWUtYXBpXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaSB0b29sXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIE1PRFVMRSBJTlRFUk5BTFMgJiBIRUxQRVJTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX2NvbmZpZyAgICAgPSB7XG4gIHRpdGxlICAgICAgIDogcGtnLm5hbWUsXG4gIGRlc2NyaXB0aW9uIDogcGtnLmRlc2NyaXB0aW9uLFxuICB2ZXJzaW9uICAgICA6IHBrZy52ZXJzaW9uLFxuICBrZXl3b3JkcyAgICA6IHBrZy5rZXl3b3Jkcy5qb2luKCcsICcpLFxuICBhdXRob3IgICAgICA6IHBrZy5hdXRob3IubmFtZSxcbiAgd2Vic2l0ZSAgICAgOiBwa2cuaG9tZXBhZ2UsXG4gIHN0eWxlICAgICAgIDogcGtnLmF0b21pZnkuY3NzLm91dHB1dFxufTtcbmZ1bmN0aW9uIGNvbmZpZyAoa2V5KSB7XG4gIHJldHVybiBrZXkgPyBfY29uZmlnW2tleV0gOiBfY29uZmlnO1xufVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWFBPUlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbm1vZHVsZS5leHBvcnRzICA9IGNvbmZpZztcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwiaG9sb24tbWFya2Rvd25ib3hcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4xLjBcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIiMjIEV4YW1wbGUgKiBbV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGVdKGh0dHA6Ly93aXphcmQuYW1pZ29zLmluc3RpdHV0ZSlcIixcbiAgXCJtYWluXCI6IFwiU09VUkNFL2luZGV4LmpzXCIsXG4gIFwic3R5bGVcIjogXCJTT1VSQ0UvaW5kZXguY3NzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHt9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJhdG9taWZ5XCI6IFwiXjcuMi4yXCIsXG4gICAgXCJiYWJlbGlmeVwiOiBcIl42LjEuMVwiLFxuICAgIFwicmVzcmNpZnlcIjogXCJeMS4xLjNcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwic3RhcnRcIjogXCJhdG9taWZ5XCIsXG4gICAgXCJ0ZXN0XCI6IFwiZWNobyBcXFwiRXJyb3I6IG5vIHRlc3Qgc3BlY2lmaWVkXFxcIiAmJiBleGl0IDFcIlxuICB9LFxuICBcImF0b21pZnlcIjoge1xuICAgIFwic2VydmVyXCI6IHtcbiAgICAgIFwib3BlblwiOiB0cnVlLFxuICAgICAgXCJwYXRoXCI6IFwiaW5kZXguaHRtbFwiLFxuICAgICAgXCJsclwiOiB7XG4gICAgICAgIFwidmVyYm9zZVwiOiB0cnVlLFxuICAgICAgICBcInF1aWV0XCI6IGZhbHNlLFxuICAgICAgICBcInBvcnRcIjogMzEzMzcsXG4gICAgICAgIFwic3luY1wiOiB0cnVlXG4gICAgICB9XG4gICAgfSxcbiAgICBcImpzXCI6IHtcbiAgICAgIFwiZW50cnlcIjogXCJTT1VSQ0UvaW5kZXguanNcIixcbiAgICAgIFwiYWxpYXNcIjogXCJCVU5ETEUvYnVuZGxlLmpzXCIsXG4gICAgICBcIm91dHB1dFwiOiBcIkJVTkRMRS9idW5kbGUuanNcIixcbiAgICAgIFwiZGVidWdcIjogdHJ1ZSxcbiAgICAgIFwid2F0Y2hcIjogdHJ1ZSxcbiAgICAgIFwidHJhbnNmb3JtXCI6IFtcbiAgICAgICAgXCJiYWJlbGlmeVwiXG4gICAgICBdLFxuICAgICAgXCJzdGFuZGFsb25lXCI6IFwiQVBJXCJcbiAgICB9LFxuICAgIFwiY3NzXCI6IHtcbiAgICAgIFwiZW50cnlcIjogXCJTT1VSQ0UvaW5kZXguY3NzXCIsXG4gICAgICBcImFsaWFzXCI6IFwiQlVORExFL2J1bmRsZS5jc3NcIixcbiAgICAgIFwib3V0cHV0XCI6IFwiQlVORExFL2J1bmRsZS5jc3NcIixcbiAgICAgIFwiZGVidWdcIjogdHJ1ZSxcbiAgICAgIFwid2F0Y2hcIjogdHJ1ZSxcbiAgICAgIFwiYXV0b3ByZWZpeGVyXCI6IHtcbiAgICAgICAgXCJicm93c2Vyc1wiOiBbXG4gICAgICAgICAgXCI+IDElXCIsXG4gICAgICAgICAgXCJJRSA3XCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJjYXNjYWRlXCI6IGZhbHNlXG4gICAgICB9LFxuICAgICAgXCJjb21wcmVzc1wiOiBmYWxzZSxcbiAgICAgIFwicGx1Z2luXCI6IFtdXG4gICAgfSxcbiAgICBcImFzc2V0c1wiOiB7XG4gICAgICBcImRlc3RcIjogXCJCVU5ETEUvYXNzZXRzL1wiLFxuICAgICAgXCJwcmVmaXhcIjogXCIvQlVORExFL2Fzc2V0cy9cIixcbiAgICAgIFwicmV0YWluTmFtZVwiOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdCtodHRwczovL2dpdGh1Yi5jb20vaG9sb25zL2hvbG9uLW1hcmtkb3duYm94LmdpdFwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiaG9sb25cIixcbiAgICBcImhvbG9uc1wiLFxuICAgIFwiaG9sb25pZnlcIixcbiAgICBcImhvbG9ub215XCIsXG4gICAgXCJjb21wb25lbnRcIixcbiAgICBcIndlYmNvbXBvbmVudFwiLFxuICAgIFwibW9kdWxlXCIsXG4gICAgXCJibG9ja1wiLFxuICAgIFwiQkVNXCJcbiAgXSxcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcInNlcmFwYXRoXCIsXG4gICAgXCJlbWFpbFwiOiBcImRldkBzZXJhcGF0aC5kZVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cDovL3d3dy5naXRodWIuY29tL3NlcmFwYXRoXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vaG9sb25zL2hvbG9uLW1hcmtkb3duYm94L2lzc3Vlc1wiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vaG9sb25zL2hvbG9uLW1hcmtkb3duYm94I3JlYWRtZVwiLFxuICBcInJlYWRtZVwiOiBcIiMgaG9sb24tbWFya2Rvd25ib3hcXG5cXG4jIyBFeGFtcGxlXFxuKiBbV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGVdKGh0dHA6Ly93aXphcmQuYW1pZ29zLmluc3RpdHV0ZSlcXG5cXG4jIyBDb250cmlidXRlXFxuXFxuSWYgeW91IGxpa2UgdGhlIGlkZWEgb2YgdGhpcyBtb2R1bGUsIHBsZWFzZSBmZWVsIGZyZWUgdG8gY29udGFjdCBtZSA6LSlcXG5cIixcbiAgXCJyZWFkbWVGaWxlbmFtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcImdpdEhlYWRcIjogXCJkZjM3ZGRkYWQxYTEzYjY2ZDU4ODg0MmIzN2NhMjJlMGY5MWE0ZTU3XCIsXG4gIFwiX2lkXCI6IFwiaG9sb24tbWFya2Rvd25ib3hAMC4xLjBcIixcbiAgXCJfc2hhc3VtXCI6IFwiMzhiODZhNTYwMDgxMTQ5NjZlMTJkNTU0YzRmMGNlYjEyOGRkM2NkN1wiLFxuICBcIl9mcm9tXCI6IFwiaG9sb24tbWFya2Rvd25ib3hAKlwiXG59XG4iLCIvKipcbiAqIGh0bWwybWFya2Rvd24gLSBBbiBIVE1MIHRvIE1hcmtkb3duIGNvbnZlcnRlci5cbiAqXG4gKiBUaGlzIGltcGxlbWVudGF0aW9uIHVzZXMgSFRNTCBvciBET00gcGFyc2luZyBmb3IgY29udmVyc2lvbi4gUGFyc2luZyBjb2RlIHdhc1xuICogYWJzdHJhY3RlZCBvdXQgaW4gYSBwYXJzaW5nIGZ1bmN0aW9uIHdoaWNoIHNob3VsZCBiZSBlYXN5IHRvIHJlbW92ZSBpbiBmYXZvclxuICogb2Ygb3RoZXIgcGFyc2luZyBsaWJyYXJpZXMuXG4gKlxuICogQ29udmVydGVkIE1hcmtEb3duIHdhcyB0ZXN0ZWQgd2l0aCBTaG93RG93biBsaWJyYXJ5IGZvciBIVE1MIHJlbmRlcmluZy4gQW5kXG4gKiBpdCB0cmllcyB0byBjcmVhdGUgTWFya0Rvd24gdGhhdCBkb2VzIG5vdCBjb25mdXNlIFNob3dEb3duIHdoZW4gY2VydGFpblxuICogY29tYmluYXRpb24gb2YgSFRNTCB0YWdzIGNvbWUgdG9nZXRoZXIuXG4gKlxuICogQGF1dGhvciBIaW1hbnNodSBHaWxhbmlcbiAqIEBhdXRob3IgS2F0ZXMgR2FzaXMgKG9yaWdpbmFsIGF1dGhvcilcbiAqXG4gKi9cblxuLyoqXG4gKiBodG1sMm1hcmtkb3duXG4gKiBAcGFyYW0gaHRtbCAtIGh0bWwgc3RyaW5nIHRvIGNvbnZlcnRcbiAqIEByZXR1cm4gY29udmVydGVkIG1hcmtkb3duIHRleHRcbiAqL1xuXG4vKlxuIFVuaXZlcnNhbCBKYXZhU2NyaXB0IE1vZHVsZSwgc3VwcG9ydHMgQU1EIChSZXF1aXJlSlMpLCBOb2RlLmpzLCBhbmQgdGhlIGJyb3dzZXIuXG4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20va2lyZWwvMTI2ODc1M1xuKi9cblxuKGZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nKSB7IC8vIEFNRFxuICAgIGRlZmluZShkZWZpbml0aW9uKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgeyAvLyBOb2RlLmpzXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIH0gZWxzZSB7IC8vIEJyb3dzZXJcbiAgICB2YXIgdGhlTW9kdWxlID0gZGVmaW5pdGlvbigpLCBnbG9iYWwgPSB0aGlzLCBvbGQgPSBnbG9iYWxbbmFtZV07XG4gICAgdGhlTW9kdWxlLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBnbG9iYWxbbmFtZV0gPSBvbGQ7XG4gICAgICByZXR1cm4gdGhlTW9kdWxlO1xuICAgIH07XG4gICAgZ2xvYmFsW25hbWVdID0gdGhlTW9kdWxlO1xuICB9XG59KSgnaHRtbDJtYXJrZG93bicsIGZ1bmN0aW9uKCkge1xuXG5mdW5jdGlvbiB0cmltKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLFwiXCIpO1xufVxuXG5mdW5jdGlvbiBlbmRzV2l0aCh2YWx1ZSwgc3VmZml4KSB7XG4gIHJldHVybiB2YWx1ZS5tYXRjaChzdWZmaXgrXCIkXCIpID09IHN1ZmZpeDtcbn1cblxuZnVuY3Rpb24gc3RhcnRzV2l0aCh2YWx1ZSwgc3RyKSB7XG5cdHJldHVybiB2YWx1ZS5pbmRleE9mKHN0cikgPT0gMDtcbn1cblxuZnVuY3Rpb24gaHRtbDJtYXJrZG93bihodG1sLCBvcHRzKSB7XG5cdG9wdHMgPSBvcHRzIHx8IHt9O1xuXG5cdHZhciBub2RlTGlzdCA9IFtdO1xuXHR2YXIgbGlzdFRhZ1N0YWNrID0gW107XG5cdHZhciBsaW5rQXR0clN0YWNrID0gW107XG5cdHZhciBibG9ja3F1b3RlU3RhY2sgPSBbXTtcblx0dmFyIHByZVN0YWNrID0gW107XG5cdHZhciBjb2RlU3RhY2sgPSBbXTtcblx0dmFyIGxpbmtzID0gW107XG5cdHZhciBpbmxpbmVTdHlsZSA9IG9wdHNbJ2lubGluZVN0eWxlJ10gfHwgZmFsc2U7XG5cdHZhciBwYXJzZXIgPSBvcHRzWydwYXJzZXInXTtcblx0dmFyIG1hcmtkb3duVGFncyA9IHtcblx0XHRcImhyXCI6IFwiLSAtIC1cXG5cXG5cIixcblx0XHRcImJyXCI6IFwiICBcXG5cIixcblx0XHRcInRpdGxlXCI6IFwiIyBcIixcblx0XHRcImgxXCI6IFwiIyBcIixcblx0XHRcImgyXCI6IFwiIyMgXCIsXG5cdFx0XCJoM1wiOiBcIiMjIyBcIixcblx0XHRcImg0XCI6IFwiIyMjIyBcIixcblx0XHRcImg1XCI6IFwiIyMjIyMgXCIsXG5cdFx0XCJoNlwiOiBcIiMjIyMjIyBcIixcblx0XHRcImJcIjogXCIqKlwiLFxuXHRcdFwic3Ryb25nXCI6IFwiKipcIixcblx0XHRcImlcIjogXCJfXCIsXG5cdFx0XCJlbVwiOiBcIl9cIixcblx0XHRcImRmblwiOiBcIl9cIixcblx0XHRcInZhclwiOiBcIl9cIixcblx0XHRcImNpdGVcIjogXCJfXCIsXG5cdFx0XCJzcGFuXCI6IFwiIFwiLFxuXHRcdFwidWxcIjogXCIqIFwiLFxuXHRcdFwib2xcIjogXCIxLiBcIixcblx0XHRcImRsXCI6IFwiLSBcIixcblx0XHRcImJsb2NrcXVvdGVcIjogXCI+IFwiXG5cdH07XG5cblx0aWYoIXBhcnNlciAmJiB0eXBlb2YgbWFya2Rvd25ET01QYXJzZXIgIT09ICd1bmRlZmluZWQnKVxuXHRcdHBhcnNlciA9IG1hcmtkb3duRE9NUGFyc2VyO1xuXG5cdGZ1bmN0aW9uIGdldExpc3RNYXJrZG93blRhZygpIHtcblx0XHR2YXIgbGlzdEl0ZW0gPSBcIlwiO1xuXHRcdGlmKGxpc3RUYWdTdGFjaykge1xuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgbGlzdFRhZ1N0YWNrLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdFx0XHRsaXN0SXRlbSArPSBcIiAgXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGxpc3RJdGVtICs9IHBlZWsobGlzdFRhZ1N0YWNrKTtcblx0XHRyZXR1cm4gbGlzdEl0ZW07XG5cdH1cblxuXHRmdW5jdGlvbiBjb252ZXJ0QXR0cnMoYXR0cnMpIHtcblx0XHR2YXIgYXR0cmlidXRlcyA9IHt9O1xuXHRcdGZvcih2YXIgayBpbiBhdHRycykge1xuXHRcdFx0dmFyIGF0dHIgPSBhdHRyc1trXTtcblx0XHRcdGF0dHJpYnV0ZXNbYXR0ci5uYW1lXSA9IGF0dHI7XG5cdFx0fVxuXHRcdHJldHVybiBhdHRyaWJ1dGVzO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGVlayhsaXN0KSB7XG5cdFx0aWYobGlzdCAmJiBsaXN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBsaXN0LnNsaWNlKC0xKVswXTtcblx0XHR9XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH1cblxuXHRmdW5jdGlvbiBwZWVrVGlsbE5vdEVtcHR5KGxpc3QpIHtcblx0XHRpZighbGlzdCkge1xuXHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciBpID0gbGlzdC5sZW5ndGggLSAxOyBpPj0wOyBpLS0gKXtcblx0XHRcdGlmKGxpc3RbaV0gIT0gXCJcIikge1xuXHRcdFx0XHRyZXR1cm4gbGlzdFtpXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVJZkVtcHR5VGFnKHN0YXJ0KSB7XG5cdFx0dmFyIGNsZWFuZWQgPSBmYWxzZTtcblx0XHRpZihzdGFydCA9PSBwZWVrVGlsbE5vdEVtcHR5KG5vZGVMaXN0KSkge1xuXHRcdFx0d2hpbGUocGVlayhub2RlTGlzdCkgIT0gc3RhcnQpIHtcblx0XHRcdFx0bm9kZUxpc3QucG9wKCk7XG5cdFx0XHR9XG5cdFx0XHRub2RlTGlzdC5wb3AoKTtcblx0XHRcdGNsZWFuZWQgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gY2xlYW5lZDtcblx0fVxuXG5cdGZ1bmN0aW9uIHNsaWNlVGV4dChzdGFydCkge1xuXHRcdHZhciB0ZXh0ID0gW107XG5cdFx0d2hpbGUobm9kZUxpc3QubGVuZ3RoID4gMCAmJiBwZWVrKG5vZGVMaXN0KSAhPSBzdGFydCkge1xuXHRcdFx0dmFyIHQgPSBub2RlTGlzdC5wb3AoKTtcblx0XHRcdHRleHQudW5zaGlmdCh0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHRleHQuam9pbihcIlwiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGJsb2NrKGlzRW5kQmxvY2spIHtcblx0XHR2YXIgbGFzdEl0ZW0gPSBub2RlTGlzdC5wb3AoKTtcblx0XHRpZiAoIWxhc3RJdGVtKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYoIWlzRW5kQmxvY2spIHtcblx0XHRcdHZhciBibG9jaztcblx0XHRcdGlmKC9cXHMqXFxuXFxuXFxzKiQvLnRlc3QobGFzdEl0ZW0pKSB7XG5cdFx0XHRcdGxhc3RJdGVtID0gbGFzdEl0ZW0ucmVwbGFjZSgvXFxzKlxcblxcblxccyokLywgXCJcXG5cXG5cIik7XG5cdFx0XHRcdGJsb2NrID0gXCJcIjtcblx0XHRcdH0gZWxzZSBpZigvXFxzKlxcblxccyokLy50ZXN0KGxhc3RJdGVtKSkge1xuXHRcdFx0XHRsYXN0SXRlbSA9IGxhc3RJdGVtLnJlcGxhY2UoL1xccypcXG5cXHMqJC8sIFwiXFxuXCIpO1xuXHRcdFx0XHRibG9jayA9IFwiXFxuXCI7XG5cdFx0XHR9IGVsc2UgaWYoL1xccyskLy50ZXN0KGxhc3RJdGVtKSkge1xuXHRcdFx0XHRibG9jayA9IFwiXFxuXFxuXCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRibG9jayA9IFwiXFxuXFxuXCI7XG5cdFx0XHR9XG5cblx0XHRcdG5vZGVMaXN0LnB1c2gobGFzdEl0ZW0pO1xuXHRcdFx0bm9kZUxpc3QucHVzaChibG9jayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vZGVMaXN0LnB1c2gobGFzdEl0ZW0pO1xuXHRcdFx0aWYoIWVuZHNXaXRoKGxhc3RJdGVtLCBcIlxcblwiKSkge1xuXHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiXFxuXFxuXCIpO1xuXHRcdFx0fVxuXHRcdH1cbiBcdH1cblxuXHRmdW5jdGlvbiBsaXN0QmxvY2soKSB7XG5cdFx0aWYobm9kZUxpc3QubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIGxpID0gcGVlayhub2RlTGlzdCk7XG5cblx0XHRcdGlmKCFlbmRzV2l0aChsaSwgXCJcXG5cIikpIHtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIlxcblwiKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bm9kZUxpc3QucHVzaChcIlxcblwiKTtcblx0XHR9XG5cdH1cblxuXHRwYXJzZXIoaHRtbCx7XG5cdFx0c3RhcnQ6IGZ1bmN0aW9uKHRhZywgYXR0cnMsIHVuYXJ5KSB7XG5cdFx0XHR0YWcgPSB0YWcudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0aWYodW5hcnkgJiYgKHRhZyAhPSBcImJyXCIgJiYgdGFnICE9IFwiaHJcIiAmJiB0YWcgIT0gXCJpbWdcIikpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0c3dpdGNoICh0YWcpIHtcblx0XHRcdGNhc2UgXCJiclwiOlxuXHRcdFx0XHRub2RlTGlzdC5wdXNoKG1hcmtkb3duVGFnc1t0YWddKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiaHJcIjpcblx0XHRcdFx0YmxvY2soKTtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChtYXJrZG93blRhZ3NbdGFnXSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInRpdGxlXCI6XG5cdFx0XHRjYXNlIFwiaDFcIjpcblx0XHRcdGNhc2UgXCJoMlwiOlxuXHRcdFx0Y2FzZSBcImgzXCI6XG5cdFx0XHRjYXNlIFwiaDRcIjpcblx0XHRcdGNhc2UgXCJoNVwiOlxuXHRcdFx0Y2FzZSBcImg2XCI6XG5cdFx0XHRcdGJsb2NrKCk7XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2gobWFya2Rvd25UYWdzW3RhZ10pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJiXCI6XG5cdFx0XHRjYXNlIFwic3Ryb25nXCI6XG5cdFx0XHRjYXNlIFwiaVwiOlxuXHRcdFx0Y2FzZSBcImVtXCI6XG5cdFx0XHRjYXNlIFwiZGZuXCI6XG5cdFx0XHRjYXNlIFwidmFyXCI6XG5cdFx0XHRjYXNlIFwiY2l0ZVwiOlxuXHRcdFx0XHRub2RlTGlzdC5wdXNoKG1hcmtkb3duVGFnc1t0YWddKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiY29kZVwiOlxuXHRcdFx0Y2FzZSBcInNwYW5cIjpcblx0XHRcdFx0aWYocHJlU3RhY2subGVuZ3RoID4gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9IGVsc2UgaWYoISAvXFxzKyQvLnRlc3QocGVlayhub2RlTGlzdCkpKSB7XG5cdFx0XHRcdFx0bm9kZUxpc3QucHVzaChtYXJrZG93blRhZ3NbdGFnXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwicFwiOlxuXHRcdFx0Y2FzZSBcImRpdlwiOlxuXHRcdFx0Ly9jYXNlIFwidGRcIjpcblx0XHRcdFx0YmxvY2soKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidWxcIjpcblx0XHRcdGNhc2UgXCJvbFwiOlxuXHRcdFx0Y2FzZSBcImRsXCI6XG5cdFx0XHRcdGxpc3RUYWdTdGFjay5wdXNoKG1hcmtkb3duVGFnc1t0YWddKTtcblx0XHRcdFx0Ly8gbGlzdHMgYXJlIGJsb2NrIGVsZW1lbnRzXG5cdFx0XHRcdGlmKGxpc3RUYWdTdGFjay5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0bGlzdEJsb2NrKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YmxvY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJsaVwiOlxuXHRcdFx0Y2FzZSBcImR0XCI6XG5cdFx0XHRcdHZhciBsaSA9IGdldExpc3RNYXJrZG93blRhZygpO1xuXHRcdFx0XHRub2RlTGlzdC5wdXNoKGxpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiYVwiOlxuXHRcdFx0XHR2YXIgYXR0cmlicyA9IGNvbnZlcnRBdHRycyhhdHRycyk7XG5cdFx0XHRcdGxpbmtBdHRyU3RhY2sucHVzaChhdHRyaWJzKTtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIltcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImltZ1wiOlxuXHRcdFx0XHR2YXIgYXR0cmlicyA9IGNvbnZlcnRBdHRycyhhdHRycyk7XG5cdFx0XHRcdHZhciBhbHQsIHRpdGxlLCB1cmw7XG5cblx0XHRcdFx0YXR0cmlic1tcInNyY1wiXSA/IHVybCA9IGF0dHJpYnNbXCJzcmNcIl0udmFsdWUgOiB1cmwgPSBcIlwiO1xuXHRcdFx0XHRpZighdXJsKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhdHRyaWJzWydhbHQnXSA/IGFsdCA9IHRyaW0oYXR0cmlic1snYWx0J10udmFsdWUpIDogYWx0ID0gXCJcIjtcblx0XHRcdFx0YXR0cmlic1sndGl0bGUnXSA/IHRpdGxlID0gdHJpbShhdHRyaWJzWyd0aXRsZSddLnZhbHVlKSA6IHRpdGxlID0gXCJcIjtcblxuXHRcdFx0XHQvLyBpZiBwYXJlbnQgb2YgaW1hZ2UgdGFnIGlzIG5lc3RlZCBpbiBhbmNob3IgdGFnIHVzZSBpbmxpbmUgc3R5bGVcblx0XHRcdFx0aWYoIWlubGluZVN0eWxlICYmICFzdGFydHNXaXRoKHBlZWtUaWxsTm90RW1wdHkobm9kZUxpc3QpLCBcIltcIikpIHtcblx0XHRcdFx0XHR2YXIgbCA9IGxpbmtzLmluZGV4T2YodXJsKTtcblx0XHRcdFx0XHRpZihsID09IC0xKSB7XG5cdFx0XHRcdFx0XHRsaW5rcy5wdXNoKHVybCk7XG5cdFx0XHRcdFx0XHRsPWxpbmtzLmxlbmd0aC0xO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJsb2NrKCk7XG5cdFx0XHRcdFx0bm9kZUxpc3QucHVzaChcIiFbXCIpO1xuXHRcdFx0XHRcdGlmKGFsdCE9IFwiXCIpIHtcblx0XHRcdFx0XHRcdG5vZGVMaXN0LnB1c2goYWx0KTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRpdGxlICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdG5vZGVMaXN0LnB1c2godGl0bGUpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2goXCJdW1wiICsgbCArIFwiXVwiKTtcblx0XHRcdFx0XHRibG9jaygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vaWYgaW1hZ2UgaXMgbm90IGEgbGluayBpbWFnZSB0aGVuIHRyZWF0IGltYWdlcyBhcyBibG9jayBlbGVtZW50c1xuXHRcdFx0XHRcdGlmKCFzdGFydHNXaXRoKHBlZWtUaWxsTm90RW1wdHkobm9kZUxpc3QpLCBcIltcIikpIHtcblx0XHRcdFx0XHRcdGJsb2NrKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bm9kZUxpc3QucHVzaChcIiFbXCIgKyBhbHQgKyBcIl0oXCIgKyB1cmwgKyAodGl0bGUgPyBcIiBcXFwiXCIgKyB0aXRsZSArIFwiXFxcIlwiIDogXCJcIikgKyBcIilcIik7XG5cblx0XHRcdFx0XHRpZighc3RhcnRzV2l0aChwZWVrVGlsbE5vdEVtcHR5KG5vZGVMaXN0KSwgXCJbXCIpKSB7XG5cdFx0XHRcdFx0XHRibG9jayh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiYmxvY2txdW90ZVwiOlxuXHRcdFx0XHQvL2xpc3RCbG9jaygpO1xuXHRcdFx0XHRibG9jaygpO1xuXHRcdFx0XHRibG9ja3F1b3RlU3RhY2sucHVzaChtYXJrZG93blRhZ3NbdGFnXSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInByZVwiOlxuXHRcdFx0XHRibG9jaygpO1xuXHRcdFx0XHRwcmVTdGFjay5wdXNoKHRydWUpO1xuXHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiICAgIFwiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidGFibGVcIjpcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIjx0YWJsZT5cIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInRoZWFkXCI6XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCI8dGhlYWQ+XCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ0Ym9keVwiOlxuXHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiPHRib2R5PlwiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidHJcIjpcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIjx0cj5cIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInRkXCI6XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCI8dGQ+XCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNoYXJzOiBmdW5jdGlvbih0ZXh0KSB7XG5cdFx0XHRpZihwcmVTdGFjay5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbi9nLFwiXFxuICAgIFwiKTtcblx0XHRcdH0gZWxzZSBpZih0cmltKHRleHQpICE9IFwiXCIpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvXFxzKy9nLCBcIiBcIik7XG5cblx0XHRcdFx0dmFyIHByZXZUZXh0ID0gcGVla1RpbGxOb3RFbXB0eShub2RlTGlzdCk7XG5cdFx0XHRcdGlmKC9cXHMrJC8udGVzdChwcmV2VGV4dCkpIHtcblx0XHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxzKy9nLCBcIlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIlwiKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvL2lmKGJsb2NrcXVvdGVTdGFjay5sZW5ndGggPiAwICYmIHBlZWtUaWxsTm90RW1wdHkobm9kZUxpc3QpLmVuZHNXaXRoKFwiXFxuXCIpKSB7XG5cdFx0XHRpZihibG9ja3F1b3RlU3RhY2subGVuZ3RoID4gMCkge1xuXHRcdFx0XHRub2RlTGlzdC5wdXNoKGJsb2NrcXVvdGVTdGFjay5qb2luKFwiXCIpKTtcblx0XHRcdH1cblxuXHRcdFx0bm9kZUxpc3QucHVzaCh0ZXh0KTtcblx0XHR9LFxuXHRcdGVuZDogZnVuY3Rpb24odGFnKSB7XG5cdFx0XHR0YWcgPSB0YWcudG9Mb3dlckNhc2UoKTtcblxuXHRcdHN3aXRjaCAodGFnKSB7XG5cdFx0XHRjYXNlIFwidGl0bGVcIjpcblx0XHRcdGNhc2UgXCJoMVwiOlxuXHRcdFx0Y2FzZSBcImgyXCI6XG5cdFx0XHRjYXNlIFwiaDNcIjpcblx0XHRcdGNhc2UgXCJoNFwiOlxuXHRcdFx0Y2FzZSBcImg1XCI6XG5cdFx0XHRjYXNlIFwiaDZcIjpcblx0XHRcdFx0aWYoIXJlbW92ZUlmRW1wdHlUYWcobWFya2Rvd25UYWdzW3RhZ10pKSB7XG5cdFx0XHRcdFx0YmxvY2sodHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwicFwiOlxuXHRcdFx0Y2FzZSBcImRpdlwiOlxuXHRcdFx0Ly9jYXNlIFwidGRcIjpcblx0XHRcdFx0d2hpbGUobm9kZUxpc3QubGVuZ3RoID4gMCAmJiB0cmltKHBlZWsobm9kZUxpc3QpKSA9PSBcIlwiKSB7XG5cdFx0XHRcdFx0bm9kZUxpc3QucG9wKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YmxvY2sodHJ1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImJcIjpcblx0XHRcdGNhc2UgXCJzdHJvbmdcIjpcblx0XHRcdGNhc2UgXCJpXCI6XG5cdFx0XHRjYXNlIFwiZW1cIjpcblx0XHRcdGNhc2UgXCJkZm5cIjpcblx0XHRcdGNhc2UgXCJ2YXJcIjpcblx0XHRcdGNhc2UgXCJjaXRlXCI6XG5cdFx0XHRcdGlmKCFyZW1vdmVJZkVtcHR5VGFnKG1hcmtkb3duVGFnc1t0YWddKSkge1xuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2godHJpbShzbGljZVRleHQobWFya2Rvd25UYWdzW3RhZ10pKSk7XG5cdFx0XHRcdFx0bm9kZUxpc3QucHVzaChtYXJrZG93blRhZ3NbdGFnXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiYVwiOlxuXHRcdFx0XHR2YXIgdGV4dCA9IHNsaWNlVGV4dChcIltcIik7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xccysvZywgXCIgXCIpO1xuXHRcdFx0XHR0ZXh0ID0gdHJpbSh0ZXh0KTtcblxuXHRcdFx0XHRpZih0ZXh0ID09IFwiXCIpIHtcblx0XHRcdFx0XHRub2RlTGlzdC5wb3AoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBhdHRycyA9IGxpbmtBdHRyU3RhY2sucG9wKCk7XG5cdFx0XHRcdHZhciB1cmw7XG5cdFx0XHRcdGF0dHJzW1wiaHJlZlwiXSAmJiAgYXR0cnNbXCJocmVmXCJdLnZhbHVlICE9IFwiXCIgPyB1cmwgPSBhdHRyc1tcImhyZWZcIl0udmFsdWUgOiB1cmwgPSBcIlwiO1xuXG5cdFx0XHRcdGlmKHVybCA9PSBcIlwiKSB7XG5cdFx0XHRcdFx0bm9kZUxpc3QucG9wKCk7XG5cdFx0XHRcdFx0bm9kZUxpc3QucHVzaCh0ZXh0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG5vZGVMaXN0LnB1c2godGV4dCk7XG5cblx0XHRcdFx0aWYoIWlubGluZVN0eWxlICYmICFzdGFydHNXaXRoKHBlZWsobm9kZUxpc3QpLCBcIiFcIikpe1xuXHRcdFx0XHRcdHZhciBsID0gbGlua3MuaW5kZXhPZih1cmwpO1xuXHRcdFx0XHRcdGlmKGwgPT0gLTEpIHtcblx0XHRcdFx0XHRcdGxpbmtzLnB1c2godXJsKTtcblx0XHRcdFx0XHRcdGw9bGlua3MubGVuZ3RoLTE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2goXCJdW1wiICsgbCArIFwiXVwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZihzdGFydHNXaXRoKHBlZWsobm9kZUxpc3QpLCBcIiFcIikpe1xuXHRcdFx0XHRcdFx0dmFyIHRleHQgPSBub2RlTGlzdC5wb3AoKTtcblx0XHRcdFx0XHRcdHRleHQgPSBub2RlTGlzdC5wb3AoKSArIHRleHQ7XG5cdFx0XHRcdFx0XHRibG9jaygpO1xuXHRcdFx0XHRcdFx0bm9kZUxpc3QucHVzaCh0ZXh0KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgdGl0bGUgPSBhdHRyc1tcInRpdGxlXCJdO1xuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2goXCJdKFwiICsgdXJsICsgKHRpdGxlID8gXCIgXFxcIlwiICsgdHJpbSh0aXRsZS52YWx1ZSkucmVwbGFjZSgvXFxzKy9nLCBcIiBcIikgKyBcIlxcXCJcIiA6IFwiXCIpICsgXCIpXCIpO1xuXG5cdFx0XHRcdFx0aWYoc3RhcnRzV2l0aChwZWVrKG5vZGVMaXN0KSwgXCIhXCIpKXtcblx0XHRcdFx0XHRcdGJsb2NrKHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ1bFwiOlxuXHRcdFx0Y2FzZSBcIm9sXCI6XG5cdFx0XHRjYXNlIFwiZGxcIjpcblx0XHRcdFx0bGlzdEJsb2NrKCk7XG5cdFx0XHRcdGxpc3RUYWdTdGFjay5wb3AoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwibGlcIjpcblx0XHRcdGNhc2UgXCJkdFwiOlxuXHRcdFx0XHR2YXIgbGkgPSBnZXRMaXN0TWFya2Rvd25UYWcoKTtcblx0XHRcdFx0aWYoIXJlbW92ZUlmRW1wdHlUYWcobGkpKSB7XG5cdFx0XHRcdFx0dmFyIHRleHQgPSB0cmltKHNsaWNlVGV4dChsaSkpO1xuXG5cdFx0XHRcdFx0aWYoc3RhcnRzV2l0aCh0ZXh0LCBcIlshW1wiKSkge1xuXHRcdFx0XHRcdFx0bm9kZUxpc3QucG9wKCk7XG5cdFx0XHRcdFx0XHRibG9jaygpO1xuXHRcdFx0XHRcdFx0bm9kZUxpc3QucHVzaCh0ZXh0KTtcblx0XHRcdFx0XHRcdGJsb2NrKHRydWUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRub2RlTGlzdC5wdXNoKHRleHQpO1xuXHRcdFx0XHRcdFx0bGlzdEJsb2NrKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImJsb2NrcXVvdGVcIjpcblx0XHRcdFx0YmxvY2txdW90ZVN0YWNrLnBvcCgpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJwcmVcIjpcblx0XHRcdFx0Ly91bmNvbW1lbnQgZm9sbG93aW5nIGV4cGVyaW1lbnRhbCBjb2RlIHRvIGRpc2NhcmQgbGluZSBudW1iZXJzIHdoZW4gc3ludGF4IGhpZ2hsaWdodGVycyBhcmUgdXNlZFxuXHRcdFx0XHQvL25vdGVzIHRoaXMgY29kZSB0aG9yb3VnaCB0ZXN0aW5nIGJlZm9yZSBwcm9kdWN0aW9uIHVzZXJcblx0XHRcdFx0Lypcblx0XHRcdFx0dmFyIHA9W107XG5cdFx0XHRcdHZhciBmbGFnID0gdHJ1ZTtcblx0XHRcdFx0dmFyIGNvdW50ID0gMCwgd2hpdGVTcGFjZSA9IDAsIGxpbmUgPSAwO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIj4+IFwiICsgcGVlayhub2RlTGlzdCkpO1xuXHRcdFx0XHR3aGlsZShwZWVrKG5vZGVMaXN0KS5zdGFydHNXaXRoKFwiICAgIFwiKSB8fCBmbGFnID09IHRydWUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCdpbnNpZGUnKTtcblx0XHRcdFx0XHR2YXIgdGV4dCA9IG5vZGVMaXN0LnBvcCgpO1xuXHRcdFx0XHRcdHAucHVzaCh0ZXh0KTtcblxuXHRcdFx0XHRcdGlmKGZsYWcgPT0gdHJ1ZSAmJiAhdGV4dC5zdGFydHNXaXRoKFwiICAgIFwiKSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGZsYWcgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvL3ZhciByZXN1bHQgPSBwYXJzZUludCh0ZXh0LnRyaW0oKSk7XG5cdFx0XHRcdFx0aWYoIWlzTmFOKHRleHQudHJpbSgpKSkge1xuXHRcdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0XHR9IGVsc2UgaWYodGV4dC50cmltKCkgPT0gXCJcIil7XG5cdFx0XHRcdFx0XHR3aGl0ZVNwYWNlKys7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxpbmUrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZmxhZyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc29sZS5sb2cobGluZSk7XG5cdFx0XHRcdGlmKGxpbmUgIT0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHdoaWxlKHAubGVuZ3RoICE9IDApIHtcblx0XHRcdFx0XHRcdG5vZGVMaXN0LnB1c2gocC5wb3AoKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCovXG5cdFx0XHRcdGJsb2NrKHRydWUpO1xuXHRcdFx0XHRwcmVTdGFjay5wb3AoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiY29kZVwiOlxuXHRcdFx0Y2FzZSBcInNwYW5cIjpcblx0XHRcdFx0aWYocHJlU3RhY2subGVuZ3RoID4gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9IGVsc2UgaWYodHJpbShwZWVrKG5vZGVMaXN0KSkgPT0gXCJcIikge1xuXHRcdFx0XHRcdG5vZGVMaXN0LnBvcCgpO1xuXHRcdFx0XHRcdG5vZGVMaXN0LnB1c2gobWFya2Rvd25UYWdzW3RhZ10pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciB0ZXh0ID0gbm9kZUxpc3QucG9wKCk7XG5cdFx0XHRcdFx0bm9kZUxpc3QucHVzaCh0cmltKHRleHQpKTtcblx0XHRcdFx0XHRub2RlTGlzdC5wdXNoKG1hcmtkb3duVGFnc1t0YWddKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ0YWJsZVwiOlxuXHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiPC90YWJsZT5cIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInRoZWFkXCI6XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCI8L3RoZWFkPlwiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidGJvZHlcIjpcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIjwvdGJvZHk+XCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ0clwiOlxuXHRcdFx0XHRub2RlTGlzdC5wdXNoKFwiPC90cj5cIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInRkXCI6XG5cdFx0XHRcdG5vZGVMaXN0LnB1c2goXCI8L3RkPlwiKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiYnJcIjpcblx0XHRcdGNhc2UgXCJoclwiOlxuXHRcdFx0Y2FzZSBcImltZ1wiOlxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdH1cblx0fSwge1wibm9kZXNUb0lnbm9yZVwiOiBbXCJzY3JpcHRcIiwgXCJub3NjcmlwdFwiLCBcIm9iamVjdFwiLCBcImlmcmFtZVwiLCBcImZyYW1lXCIsIFwiaGVhZFwiLCBcInN0eWxlXCIsIFwibGFiZWxcIl19KTtcblxuXHRpZighaW5saW5lU3R5bGUpIHtcblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYoaSA9PSAwKSB7XG5cdFx0XHRcdHZhciBsYXN0SXRlbSA9IG5vZGVMaXN0LnBvcCgpO1xuXHRcdFx0XHRub2RlTGlzdC5wdXNoKGxhc3RJdGVtLnJlcGxhY2UoL1xccyskL2csIFwiXCIpKTtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIlxcblxcbltcIiArIGkgKyBcIl06IFwiICsgbGlua3NbaV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bm9kZUxpc3QucHVzaChcIlxcbltcIiArIGkgKyBcIl06IFwiICsgbGlua3NbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBub2RlTGlzdC5qb2luKFwiXCIpO1xuXG59XG5cbnJldHVybiBodG1sMm1hcmtkb3duO1xuXG59KTsiLCJ2YXIgaHRtbDJtYXJrZG93biA9IHJlcXVpcmUoJy4vaHRtbDJtYXJrZG93bicpO1xudmFyIGh0bWxQYXJzZXIgPSByZXF1aXJlKCcuL21hcmtkb3duX2h0bWxfcGFyc2VyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaHRtbCwgb3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgb3B0cy5wYXJzZXIgPSBodG1sUGFyc2VyO1xuICByZXR1cm4gaHRtbDJtYXJrZG93bihodG1sLCBvcHRzKTtcbn07XG4iLCIvKlxuICogSFRNTCBQYXJzZXIgQnkgSm9obiBSZXNpZyAoZWpvaG4ub3JnKVxuICogT3JpZ2luYWwgY29kZSBieSBFcmlrIEFydmlkc3NvbiwgTW96aWxsYSBQdWJsaWMgTGljZW5zZVxuICogaHR0cDovL2VyaWsuZWFlLm5ldC9zaW1wbGVodG1scGFyc2VyL3NpbXBsZWh0bWxwYXJzZXIuanNcbiAqXG4gKiAvLyBVc2UgbGlrZSBzbzpcbiAqIEhUTUxQYXJzZXIoaHRtbFN0cmluZywge1xuICogICAgIHN0YXJ0OiBmdW5jdGlvbih0YWcsIGF0dHJzLCB1bmFyeSkge30sXG4gKiAgICAgZW5kOiBmdW5jdGlvbih0YWcpIHt9LFxuICogICAgIGNoYXJzOiBmdW5jdGlvbih0ZXh0KSB7fSxcbiAqICAgICBjb21tZW50OiBmdW5jdGlvbih0ZXh0KSB7fVxuICogfSk7XG4gKlxuICogLy8gb3IgdG8gZ2V0IGFuIFhNTCBzdHJpbmc6XG4gKiBIVE1MdG9YTUwoaHRtbFN0cmluZyk7XG4gKlxuICogLy8gb3IgdG8gZ2V0IGFuIFhNTCBET00gRG9jdW1lbnRcbiAqIEhUTUx0b0RPTShodG1sU3RyaW5nKTtcbiAqXG4gKiAvLyBvciB0byBpbmplY3QgaW50byBhbiBleGlzdGluZyBkb2N1bWVudC9ET00gbm9kZVxuICogSFRNTHRvRE9NKGh0bWxTdHJpbmcsIGRvY3VtZW50KTtcbiAqIEhUTUx0b0RPTShodG1sU3RyaW5nLCBkb2N1bWVudC5ib2R5KTtcbiAqXG4gKi9cblxuLypcbiBVbml2ZXJzYWwgSmF2YVNjcmlwdCBNb2R1bGUsIHN1cHBvcnRzIEFNRCAoUmVxdWlyZUpTKSwgTm9kZS5qcywgYW5kIHRoZSBicm93c2VyLlxuIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2tpcmVsLzEyNjg3NTNcbiovXG5cbihmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBBTURcbiAgICBkZWZpbmUoZGVmaW5pdGlvbik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHsgLy8gTm9kZS5qc1xuICAgIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICB9IGVsc2UgeyAvLyBCcm93c2VyXG4gICAgdmFyIHRoZU1vZHVsZSA9IGRlZmluaXRpb24oKSwgZ2xvYmFsID0gdGhpcywgb2xkID0gZ2xvYmFsW25hbWVdO1xuICAgIHRoZU1vZHVsZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgZ2xvYmFsW25hbWVdID0gb2xkO1xuICAgICAgcmV0dXJuIHRoZU1vZHVsZTtcbiAgICB9O1xuICAgIGdsb2JhbFtuYW1lXSA9IHRoZU1vZHVsZTtcbiAgfVxufSkoJ21hcmtkb3duSFRNTFBhcnNlcicsIGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJlZ3VsYXIgRXhwcmVzc2lvbnMgZm9yIHBhcnNpbmcgdGFncyBhbmQgYXR0cmlidXRlc1xuXHR2YXIgc3RhcnRUYWcgPSAvXjwoXFx3KykoKD86XFxzK1xcdysoPzpcXHMqPVxccyooPzooPzpcIlteXCJdKlwiKXwoPzonW14nXSonKXxbXj5cXHNdKykpPykqKVxccyooXFwvPyk+Lyxcblx0XHRlbmRUYWcgPSAvXjxcXC8oXFx3KylbXj5dKj4vLFxuXHRcdGF0dHIgPSAvKFxcdyspKD86XFxzKj1cXHMqKD86KD86XCIoKD86XFxcXC58W15cIl0pKilcIil8KD86JygoPzpcXFxcLnxbXiddKSopJyl8KFtePlxcc10rKSkpPy9nO1xuXG5cdC8vIEVtcHR5IEVsZW1lbnRzIC0gSFRNTCA0LjAxXG5cdHZhciBlbXB0eSA9IG1ha2VNYXAoXCJhcmVhLGJhc2UsYmFzZWZvbnQsYnIsY29sLGZyYW1lLGhyLGltZyxpbnB1dCxpc2luZGV4LGxpbmssbWV0YSxwYXJhbSxlbWJlZFwiKTtcblxuXHQvLyBCbG9jayBFbGVtZW50cyAtIEhUTUwgNC4wMVxuXHR2YXIgYmxvY2sgPSBtYWtlTWFwKFwiYWRkcmVzcyxhcHBsZXQsYmxvY2txdW90ZSxidXR0b24sY2VudGVyLGRkLGRlbCxkaXIsZGl2LGRsLGR0LGZpZWxkc2V0LGZvcm0sZnJhbWVzZXQsaHIsaWZyYW1lLGlucyxpc2luZGV4LGxpLG1hcCxtZW51LG5vZnJhbWVzLG5vc2NyaXB0LG9iamVjdCxvbCxwLHByZSxzY3JpcHQsdGFibGUsdGJvZHksdGQsdGZvb3QsdGgsdGhlYWQsdHIsdWxcIik7XG5cblx0Ly8gSW5saW5lIEVsZW1lbnRzIC0gSFRNTCA0LjAxXG5cdHZhciBpbmxpbmUgPSBtYWtlTWFwKFwiYSxhYmJyLGFjcm9ueW0sYXBwbGV0LGIsYmFzZWZvbnQsYmRvLGJpZyxicixidXR0b24sY2l0ZSxjb2RlLGRlbCxkZm4sZW0sZm9udCxpLGlmcmFtZSxpbWcsaW5wdXQsaW5zLGtiZCxsYWJlbCxtYXAsb2JqZWN0LHEscyxzYW1wLHNjcmlwdCxzZWxlY3Qsc21hbGwsc3BhbixzdHJpa2Usc3Ryb25nLHN1YixzdXAsdGV4dGFyZWEsdHQsdSx2YXJcIik7XG5cblx0Ly8gRWxlbWVudHMgdGhhdCB5b3UgY2FuLCBpbnRlbnRpb25hbGx5LCBsZWF2ZSBvcGVuXG5cdC8vIChhbmQgd2hpY2ggY2xvc2UgdGhlbXNlbHZlcylcblx0dmFyIGNsb3NlU2VsZiA9IG1ha2VNYXAoXCJjb2xncm91cCxkZCxkdCxsaSxvcHRpb25zLHAsdGQsdGZvb3QsdGgsdGhlYWQsdHJcIik7XG5cblx0Ly8gQXR0cmlidXRlcyB0aGF0IGhhdmUgdGhlaXIgdmFsdWVzIGZpbGxlZCBpbiBkaXNhYmxlZD1cImRpc2FibGVkXCJcblx0dmFyIGZpbGxBdHRycyA9IG1ha2VNYXAoXCJjaGVja2VkLGNvbXBhY3QsZGVjbGFyZSxkZWZlcixkaXNhYmxlZCxpc21hcCxtdWx0aXBsZSxub2hyZWYsbm9yZXNpemUsbm9zaGFkZSxub3dyYXAscmVhZG9ubHksc2VsZWN0ZWRcIik7XG5cblx0Ly8gU3BlY2lhbCBFbGVtZW50cyAoY2FuIGNvbnRhaW4gYW55dGhpbmcpXG5cdHZhciBzcGVjaWFsID0gbWFrZU1hcChcInNjcmlwdCxzdHlsZVwiKTtcblxuXHRmdW5jdGlvbiBIVE1MUGFyc2VyKCBodG1sLCBoYW5kbGVyICkge1xuXHRcdHZhciBpbmRleCwgY2hhcnMsIG1hdGNoLCBzdGFjayA9IFtdLCBsYXN0ID0gaHRtbDtcblx0XHRzdGFjay5sYXN0ID0gZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiB0aGlzWyB0aGlzLmxlbmd0aCAtIDEgXTtcblx0XHR9O1xuXG5cdFx0d2hpbGUgKCBodG1sICkge1xuXHRcdFx0Y2hhcnMgPSB0cnVlO1xuXG5cdFx0XHQvLyBNYWtlIHN1cmUgd2UncmUgbm90IGluIGEgc2NyaXB0IG9yIHN0eWxlIGVsZW1lbnRcblx0XHRcdGlmICggIXN0YWNrLmxhc3QoKSB8fCAhc3BlY2lhbFsgc3RhY2subGFzdCgpIF0gKSB7XG5cblx0XHRcdFx0Ly8gQ29tbWVudFxuXHRcdFx0XHRpZiAoIGh0bWwuaW5kZXhPZihcIjwhLS1cIikgPT0gMCApIHtcblx0XHRcdFx0XHRpbmRleCA9IGh0bWwuaW5kZXhPZihcIi0tPlwiKTtcblxuXHRcdFx0XHRcdGlmICggaW5kZXggPj0gMCApIHtcblx0XHRcdFx0XHRcdGlmICggaGFuZGxlci5jb21tZW50IClcblx0XHRcdFx0XHRcdFx0aGFuZGxlci5jb21tZW50KCBodG1sLnN1YnN0cmluZyggNCwgaW5kZXggKSApO1xuXHRcdFx0XHRcdFx0aHRtbCA9IGh0bWwuc3Vic3RyaW5nKCBpbmRleCArIDMgKTtcblx0XHRcdFx0XHRcdGNoYXJzID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGVuZCB0YWdcblx0XHRcdFx0fSBlbHNlIGlmICggaHRtbC5pbmRleE9mKFwiPC9cIikgPT0gMCApIHtcblx0XHRcdFx0XHRtYXRjaCA9IGh0bWwubWF0Y2goIGVuZFRhZyApO1xuXG5cdFx0XHRcdFx0aWYgKCBtYXRjaCApIHtcblx0XHRcdFx0XHRcdGh0bWwgPSBodG1sLnN1YnN0cmluZyggbWF0Y2hbMF0ubGVuZ3RoICk7XG5cdFx0XHRcdFx0XHRtYXRjaFswXS5yZXBsYWNlKCBlbmRUYWcsIHBhcnNlRW5kVGFnICk7XG5cdFx0XHRcdFx0XHRjaGFycyA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBzdGFydCB0YWdcblx0XHRcdFx0fSBlbHNlIGlmICggaHRtbC5pbmRleE9mKFwiPFwiKSA9PSAwICkge1xuXHRcdFx0XHRcdG1hdGNoID0gaHRtbC5tYXRjaCggc3RhcnRUYWcgKTtcblxuXHRcdFx0XHRcdGlmICggbWF0Y2ggKSB7XG5cdFx0XHRcdFx0XHRodG1sID0gaHRtbC5zdWJzdHJpbmcoIG1hdGNoWzBdLmxlbmd0aCApO1xuXHRcdFx0XHRcdFx0bWF0Y2hbMF0ucmVwbGFjZSggc3RhcnRUYWcsIHBhcnNlU3RhcnRUYWcgKTtcblx0XHRcdFx0XHRcdGNoYXJzID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBjaGFycyApIHtcblx0XHRcdFx0XHRpbmRleCA9IGh0bWwuaW5kZXhPZihcIjxcIik7XG5cblx0XHRcdFx0XHR2YXIgdGV4dCA9IGluZGV4IDwgMCA/IGh0bWwgOiBodG1sLnN1YnN0cmluZyggMCwgaW5kZXggKTtcblx0XHRcdFx0XHRodG1sID0gaW5kZXggPCAwID8gXCJcIiA6IGh0bWwuc3Vic3RyaW5nKCBpbmRleCApO1xuXG5cdFx0XHRcdFx0aWYgKCBoYW5kbGVyLmNoYXJzIClcblx0XHRcdFx0XHRcdGhhbmRsZXIuY2hhcnMoIHRleHQgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRodG1sID0gaHRtbC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoLiopPFxcL1wiICsgc3RhY2subGFzdCgpICsgXCJbXj5dKj5cIiksIGZ1bmN0aW9uKGFsbCwgdGV4dCl7XG5cdFx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvPCEtLSguKj8pLS0+L2csIFwiJDFcIilcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC88IVxcW0NEQVRBXFxbKC4qPyldXT4vZywgXCIkMVwiKTtcblxuXHRcdFx0XHRcdGlmICggaGFuZGxlci5jaGFycyApXG5cdFx0XHRcdFx0XHRoYW5kbGVyLmNoYXJzKCB0ZXh0ICk7XG5cblx0XHRcdFx0XHRyZXR1cm4gXCJcIjtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cGFyc2VFbmRUYWcoIFwiXCIsIHN0YWNrLmxhc3QoKSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGh0bWwgPT0gbGFzdCApXG5cdFx0XHRcdHRocm93IFwiUGFyc2UgRXJyb3I6IFwiICsgaHRtbDtcblx0XHRcdGxhc3QgPSBodG1sO1xuXHRcdH1cblxuXHRcdC8vIENsZWFuIHVwIGFueSByZW1haW5pbmcgdGFnc1xuXHRcdHBhcnNlRW5kVGFnKCk7XG5cblx0XHRmdW5jdGlvbiBwYXJzZVN0YXJ0VGFnKCB0YWcsIHRhZ05hbWUsIHJlc3QsIHVuYXJ5ICkge1xuXHRcdFx0aWYgKCBibG9ja1sgdGFnTmFtZSBdICkge1xuXHRcdFx0XHR3aGlsZSAoIHN0YWNrLmxhc3QoKSAmJiBpbmxpbmVbIHN0YWNrLmxhc3QoKSBdICkge1xuXHRcdFx0XHRcdHBhcnNlRW5kVGFnKCBcIlwiLCBzdGFjay5sYXN0KCkgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGNsb3NlU2VsZlsgdGFnTmFtZSBdICYmIHN0YWNrLmxhc3QoKSA9PSB0YWdOYW1lICkge1xuXHRcdFx0XHRwYXJzZUVuZFRhZyggXCJcIiwgdGFnTmFtZSApO1xuXHRcdFx0fVxuXG5cdFx0XHR1bmFyeSA9IGVtcHR5WyB0YWdOYW1lIF0gfHwgISF1bmFyeTtcblxuXHRcdFx0aWYgKCAhdW5hcnkgKVxuXHRcdFx0XHRzdGFjay5wdXNoKCB0YWdOYW1lICk7XG5cblx0XHRcdGlmICggaGFuZGxlci5zdGFydCApIHtcblx0XHRcdFx0dmFyIGF0dHJzID0gW107XG5cblx0XHRcdFx0cmVzdC5yZXBsYWNlKGF0dHIsIGZ1bmN0aW9uKG1hdGNoLCBuYW1lKSB7XG5cdFx0XHRcdFx0dmFyIHZhbHVlID0gYXJndW1lbnRzWzJdID8gYXJndW1lbnRzWzJdIDpcblx0XHRcdFx0XHRcdGFyZ3VtZW50c1szXSA/IGFyZ3VtZW50c1szXSA6XG5cdFx0XHRcdFx0XHRhcmd1bWVudHNbNF0gPyBhcmd1bWVudHNbNF0gOlxuXHRcdFx0XHRcdFx0ZmlsbEF0dHJzW25hbWVdID8gbmFtZSA6IFwiXCI7XG5cblx0XHRcdFx0XHRhdHRycy5wdXNoKHtcblx0XHRcdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdFx0XHRlc2NhcGVkOiB2YWx1ZS5yZXBsYWNlKC8oXnxbXlxcXFxdKVwiL2csICckMVxcXFxcXFwiJykgLy9cIlxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoIGhhbmRsZXIuc3RhcnQgKVxuXHRcdFx0XHRcdGhhbmRsZXIuc3RhcnQoIHRhZ05hbWUsIGF0dHJzLCB1bmFyeSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHBhcnNlRW5kVGFnKCB0YWcsIHRhZ05hbWUgKSB7XG5cdFx0XHQvLyBJZiBubyB0YWcgbmFtZSBpcyBwcm92aWRlZCwgY2xlYW4gc2hvcFxuXHRcdFx0aWYgKCAhdGFnTmFtZSApXG5cdFx0XHRcdHZhciBwb3MgPSAwO1xuXG5cdFx0XHQvLyBGaW5kIHRoZSBjbG9zZXN0IG9wZW5lZCB0YWcgb2YgdGhlIHNhbWUgdHlwZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRmb3IgKCB2YXIgcG9zID0gc3RhY2subGVuZ3RoIC0gMTsgcG9zID49IDA7IHBvcy0tIClcblx0XHRcdFx0XHRpZiAoIHN0YWNrWyBwb3MgXSA9PSB0YWdOYW1lIClcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRpZiAoIHBvcyA+PSAwICkge1xuXHRcdFx0XHQvLyBDbG9zZSBhbGwgdGhlIG9wZW4gZWxlbWVudHMsIHVwIHRoZSBzdGFja1xuXHRcdFx0XHRmb3IgKCB2YXIgaSA9IHN0YWNrLmxlbmd0aCAtIDE7IGkgPj0gcG9zOyBpLS0gKVxuXHRcdFx0XHRcdGlmICggaGFuZGxlci5lbmQgKVxuXHRcdFx0XHRcdFx0aGFuZGxlci5lbmQoIHN0YWNrWyBpIF0gKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgdGhlIG9wZW4gZWxlbWVudHMgZnJvbSB0aGUgc3RhY2tcblx0XHRcdFx0c3RhY2subGVuZ3RoID0gcG9zO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHR0aGlzLkhUTUx0b1hNTCA9IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHZhciByZXN1bHRzID0gXCJcIjtcblxuXHRcdEhUTUxQYXJzZXIoaHRtbCwge1xuXHRcdFx0c3RhcnQ6IGZ1bmN0aW9uKCB0YWcsIGF0dHJzLCB1bmFyeSApIHtcblx0XHRcdFx0cmVzdWx0cyArPSBcIjxcIiArIHRhZztcblxuXHRcdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKyApXG5cdFx0XHRcdFx0cmVzdWx0cyArPSBcIiBcIiArIGF0dHJzW2ldLm5hbWUgKyAnPVwiJyArIGF0dHJzW2ldLmVzY2FwZWQgKyAnXCInO1xuXG5cdFx0XHRcdHJlc3VsdHMgKz0gKHVuYXJ5ID8gXCIvXCIgOiBcIlwiKSArIFwiPlwiO1xuXHRcdFx0fSxcblx0XHRcdGVuZDogZnVuY3Rpb24oIHRhZyApIHtcblx0XHRcdFx0cmVzdWx0cyArPSBcIjwvXCIgKyB0YWcgKyBcIj5cIjtcblx0XHRcdH0sXG5cdFx0XHRjaGFyczogZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0XHRcdHJlc3VsdHMgKz0gdGV4dDtcblx0XHRcdH0sXG5cdFx0XHRjb21tZW50OiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdFx0cmVzdWx0cyArPSBcIjwhLS1cIiArIHRleHQgKyBcIi0tPlwiO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH07XG5cblx0dGhpcy5IVE1MdG9ET00gPSBmdW5jdGlvbiggaHRtbCwgZG9jICkge1xuXHRcdC8vIFRoZXJlIGNhbiBiZSBvbmx5IG9uZSBvZiB0aGVzZSBlbGVtZW50c1xuXHRcdHZhciBvbmUgPSBtYWtlTWFwKFwiaHRtbCxoZWFkLGJvZHksdGl0bGVcIik7XG5cblx0XHQvLyBFbmZvcmNlIGEgc3RydWN0dXJlIGZvciB0aGUgZG9jdW1lbnRcblx0XHR2YXIgc3RydWN0dXJlID0ge1xuXHRcdFx0bGluazogXCJoZWFkXCIsXG5cdFx0XHRiYXNlOiBcImhlYWRcIlxuXHRcdH07XG5cblx0XHRpZiAoICFkb2MgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBET01Eb2N1bWVudCAhPSBcInVuZGVmaW5lZFwiIClcblx0XHRcdFx0ZG9jID0gbmV3IERPTURvY3VtZW50KCk7XG5cdFx0XHRlbHNlIGlmICggdHlwZW9mIGRvY3VtZW50ICE9IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24gJiYgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnQgKVxuXHRcdFx0XHRkb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudChcIlwiLCBcIlwiLCBudWxsKTtcblx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgQWN0aXZlWCAhPSBcInVuZGVmaW5lZFwiIClcblx0XHRcdFx0ZG9jID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNc3htbC5ET01Eb2N1bWVudFwiKTtcblxuXHRcdH0gZWxzZVxuXHRcdFx0ZG9jID0gZG9jLm93bmVyRG9jdW1lbnQgfHxcblx0XHRcdFx0ZG9jLmdldE93bmVyRG9jdW1lbnQgJiYgZG9jLmdldE93bmVyRG9jdW1lbnQoKSB8fFxuXHRcdFx0XHRkb2M7XG5cblx0XHR2YXIgZWxlbXMgPSBbXSxcblx0XHRcdGRvY3VtZW50RWxlbWVudCA9IGRvYy5kb2N1bWVudEVsZW1lbnQgfHxcblx0XHRcdFx0ZG9jLmdldERvY3VtZW50RWxlbWVudCAmJiBkb2MuZ2V0RG9jdW1lbnRFbGVtZW50KCk7XG5cblx0XHQvLyBJZiB3ZSdyZSBkZWFsaW5nIHdpdGggYW4gZW1wdHkgZG9jdW1lbnQgdGhlbiB3ZVxuXHRcdC8vIG5lZWQgdG8gcHJlLXBvcHVsYXRlIGl0IHdpdGggdGhlIEhUTUwgZG9jdW1lbnQgc3RydWN0dXJlXG5cdFx0aWYgKCAhZG9jdW1lbnRFbGVtZW50ICYmIGRvYy5jcmVhdGVFbGVtZW50ICkgKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgaHRtbCA9IGRvYy5jcmVhdGVFbGVtZW50KFwiaHRtbFwiKTtcblx0XHRcdHZhciBoZWFkID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJoZWFkXCIpO1xuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiKSApO1xuXHRcdFx0aHRtbC5hcHBlbmRDaGlsZCggaGVhZCApO1xuXHRcdFx0aHRtbC5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIpICk7XG5cdFx0XHRkb2MuYXBwZW5kQ2hpbGQoIGh0bWwgKTtcblx0XHR9KSgpO1xuXG5cdFx0Ly8gRmluZCBhbGwgdGhlIHVuaXF1ZSBlbGVtZW50c1xuXHRcdGlmICggZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lIClcblx0XHRcdGZvciAoIHZhciBpIGluIG9uZSApXG5cdFx0XHRcdG9uZVsgaSBdID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBpIClbMF07XG5cblx0XHQvLyBJZiB3ZSdyZSB3b3JraW5nIHdpdGggYSBkb2N1bWVudCwgaW5qZWN0IGNvbnRlbnRzIGludG9cblx0XHQvLyB0aGUgYm9keSBlbGVtZW50XG5cdFx0dmFyIGN1clBhcmVudE5vZGUgPSBvbmUuYm9keTtcblxuXHRcdEhUTUxQYXJzZXIoIGh0bWwsIHtcblx0XHRcdHN0YXJ0OiBmdW5jdGlvbiggdGFnTmFtZSwgYXR0cnMsIHVuYXJ5ICkge1xuXHRcdFx0XHQvLyBJZiBpdCdzIGEgcHJlLWJ1aWx0IGVsZW1lbnQsIHRoZW4gd2UgY2FuIGlnbm9yZVxuXHRcdFx0XHQvLyBpdHMgY29uc3RydWN0aW9uXG5cdFx0XHRcdGlmICggb25lWyB0YWdOYW1lIF0gKSB7XG5cdFx0XHRcdFx0Y3VyUGFyZW50Tm9kZSA9IG9uZVsgdGFnTmFtZSBdO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBlbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoIHRhZ05hbWUgKTtcblxuXHRcdFx0XHRmb3IgKCB2YXIgYXR0ciBpbiBhdHRycyApXG5cdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIGF0dHJzWyBhdHRyIF0ubmFtZSwgYXR0cnNbIGF0dHIgXS52YWx1ZSApO1xuXG5cdFx0XHRcdGlmICggc3RydWN0dXJlWyB0YWdOYW1lIF0gJiYgdHlwZW9mIG9uZVsgc3RydWN0dXJlWyB0YWdOYW1lIF0gXSAhPSBcImJvb2xlYW5cIiApXG5cdFx0XHRcdFx0b25lWyBzdHJ1Y3R1cmVbIHRhZ05hbWUgXSBdLmFwcGVuZENoaWxkKCBlbGVtICk7XG5cblx0XHRcdFx0ZWxzZSBpZiAoIGN1clBhcmVudE5vZGUgJiYgY3VyUGFyZW50Tm9kZS5hcHBlbmRDaGlsZCApXG5cdFx0XHRcdFx0Y3VyUGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggZWxlbSApO1xuXG5cdFx0XHRcdGlmICggIXVuYXJ5ICkge1xuXHRcdFx0XHRcdGVsZW1zLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRjdXJQYXJlbnROb2RlID0gZWxlbTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGVuZDogZnVuY3Rpb24oIHRhZyApIHtcblx0XHRcdFx0ZWxlbXMubGVuZ3RoIC09IDE7XG5cblx0XHRcdFx0Ly8gSW5pdCB0aGUgbmV3IHBhcmVudE5vZGVcblx0XHRcdFx0Y3VyUGFyZW50Tm9kZSA9IGVsZW1zWyBlbGVtcy5sZW5ndGggLSAxIF07XG5cdFx0XHR9LFxuXHRcdFx0Y2hhcnM6IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0XHRjdXJQYXJlbnROb2RlLmFwcGVuZENoaWxkKCBkb2MuY3JlYXRlVGV4dE5vZGUoIHRleHQgKSApO1xuXHRcdFx0fSxcblx0XHRcdGNvbW1lbnQ6IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0XHQvLyBjcmVhdGUgY29tbWVudCBub2RlXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZG9jO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIG1ha2VNYXAoc3RyKXtcblx0XHR2YXIgb2JqID0ge30sIGl0ZW1zID0gc3RyLnNwbGl0KFwiLFwiKTtcblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKyApXG5cdFx0XHRvYmpbIGl0ZW1zW2ldIF0gPSB0cnVlO1xuXHRcdHJldHVybiBvYmo7XG5cdH1cblxuXHRyZXR1cm4gSFRNTFBhcnNlcjtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgREVGQVVMVF9SRUdFWCA9IC9eKFxce1tcXHNcXFNdKj9cXG5cXH0pKFxccypcXG4pKi87XG5cbi8qKlxuICogUGFyc2VzIEpTT04gZnJvbnQgbWF0dGVyIGZyb20gc3BlY2lmaWVkIGBzdHJpbmdgLCByZXR1cm5pbmcgdGhlIG9iamVjdCBpdHNlbGZcbiAqIGF1Z21lbnRlZCB3aXRoIGBfX2NvbnRlbnRfX2AgcHJvcGVydHkgKHRoaXMgbmFtZSBpcyBjb25maWd1cmFibGUgdmlhIGBhbGlhc2Agb3B0aW9uKVxuICogd2hlcmUgdGhlIHJlc3QgY29udGVudCByZXNpZGVzLlxuICpcbiAqIEJ5IGRlZmF1bHQgaXQgcGFyc2VzIGluZGVudGVkIEpTT04gKHN1Y2ggYXMgdGhlIG9uZSB5b3UgZ2V0IHZpYVxuICogYEpTT04uc3RyaW5naWZ5KG15b2JqLCBudWxsLCAyKWAsIHNvIGl0IG9ubHkgbG9va3MgZm9yIGEgc2luZ2xlIGNsb3NpbmdcbiAqIHJpZ2h0IGJyYWNlIHNpdHRpbmcgb24gdGhlIGxpbmUgc3RhcnQuXG4gKiBUaGUgcmVzdCBjb250ZW50IGNhbiBiZSBkZWxpbWl0ZWQgZnJvbSBKU09OIHVzaW5nIGFyYml0cmFyeVxuICogbnVtYmVyIG9mIGJsYW5rIGxpbmVzLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogICogYGFsaWFzYCDigJQgdmFyaWFibGUgbmFtZSB0byBhc3NpZ24gdGV4dCBjb250ZW50IHRvIChkZWZhdWx0IGlzIGBfX2NvbnRlbnRfX2ApXG4gKiAgKiBgcmVnZXhgIOKAlCByZWdleCBmb3IgY2FwdHVyaW5nIHRoZSBKU09OIG9iamVjdCBhbmQgc3RyaXBwaW5nIGl0IGF3YXlcbiAqICAgIGZyb20gdGhlIHJlc3QgY29udGVudDsgdGhlIGZpcnN0IGNhcHR1cmluZyBncm91cCBzaG91bGQgZW5jbG9zZSB0aGUgSlNPTiBvYmplY3RcbiAqICAgIChkZWZhdWx0IGlzIGBeKFxce1tcXHNcXFNdKj9cXG5cXH0pKD86XFxzKlxcbikqYClcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCBzdHJpbmdcbiAqIEBwYXJhbSB7Kn0gb3B0aW9ucyDigJQgb3B0aW9ucyBkZXNjcmliZWQgYWJvdmVcbiAqL1xuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uIChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIC8vIGNvbmZpZ3VyYWJsZXNcbiAgdmFyIHJlZ2V4ID0gb3B0aW9ucy5yZWdleCB8fCBERUZBVUxUX1JFR0VYO1xuICB2YXIgYWxpYXMgPSBvcHRpb25zLmFsaWFzIHx8ICdfX2NvbnRlbnRfXyc7XG4gIC8vIHBhcnNlIGl0IGxpa2UgYSBwcm9cbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZWdleCwgZnVuY3Rpb24gKG1hdGNoLCBqc29uKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH1cbiAgfSk7XG4gIHJlc3VsdFthbGlhc10gPSBzdHJpbmc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJldmVyc2UgcGFyc2U6IHJlbW92ZXMgYF9fY29udGVudF9fYCBwcm9wZXJ0eSBmcm9tIHRoZSBgb2JqZWN0YCBhbmQgZW1pdHMgaXRcbiAqIGFzIGluZGVudGVkIEpTT047IHRoZW4gYXBwZW5kcyB0aGUgYF9fY29udGVudF9fYCBwcm9wZXJ0eSB0byByZXN1bHRpbmcgc3RyaW5nXG4gKiB3aXRoIG9wdGlvbmFsIGRlbGltaXRlciBzcGVjaWZpZWQgdmlhIGBkZWxpbWl0ZXJgIG9wdGlvbnMgKGJ5IGRlZmF1bHQgYSBzaW5nbGVcbiAqIGJsYW5rIGxpbmUgaXMgaW5zZXJ0ZWQpLlxuICpcbiAqIE9wdGlvbnMgYXJlOlxuICpcbiAqICAqIGBhbGlhc2Ag4oCUIHZhcmlhYmxlIG5hbWUgY29udGFpbmluZyB0aGUgcmVzdCBjb250ZW50XG4gKiAgICAoZGVmYXVsdCBpcyBgX19jb250ZW50X19gLCBsaWtlIGluIGBwYXJzZWApXG4gKiAgKiBgZGVsaW1pdGVyYCDigJQgYSBzdHJpbmcgdG8gaW5zZXJ0IGJldHdlZW4gSlNPTiBhbmQgcmVzdCBjb250ZW50XG4gKiAgICAoZGVmYXVsdCBpcyBgXFxuXFxuYClcbiAqXG4gKiBAcGFyYW0geyp9IG9iamVjdCDigJQgb2JqZWN0IHRvIHNlcmlhbGl6ZTtcbiAqIEBwYXJhbSB7Kn0gb3B0aW9ucyDigJQgb3B0aW9ucyBkZXNjcmliZWQgYWJvdmVcbiAqL1xuZXhwb3J0cy5zZXJpYWxpemUgPSBmdW5jdGlvbiAob2JqZWN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAvLyBjb25maWd1cmFibGVcbiAgdmFyIGRlbGltaXRlciA9IG9wdGlvbnMuZGVsaW1pdGVyIHx8ICdcXG5cXG4nO1xuICB2YXIgYWxpYXMgPSBvcHRpb25zLmFsaWFzIHx8ICdfX2NvbnRlbnRfXyc7XG4gIC8vIEV4dHJhY3QgdGhlIGNvbnRlbnRcbiAgdmFyIGNvbnRlbnQgPSBvYmplY3RbYWxpYXNdIHx8ICcnO1xuICAvLyBQcm9wZXJ0aWVzIGFyZSBjb3BpZWQgb250byB0aGUgbmV3IG9iamVjdCB0byBwcmV2ZW50IHNpZGUtZWZmZWN0c1xuICB2YXIgb2JqID0ge307XG4gIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSAhPSBhbGlhcylcbiAgICAgIG9ialtrZXldID0gb2JqZWN0W2tleV07XG4gIH0pO1xuICAvLyBXcml0ZSB0aGVtXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDIpICsgZGVsaW1pdGVyICsgY29udGVudDtcbn07XG4iLCJcbid1c2Ugc3RyaWN0Jztcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTID0gQ1VTVE9NIFNESyBbQ3VzdG9tIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdF1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBqc29ubWF0dGVyICAgID0gcmVxdWlyZSgnanNvbi1tYXR0ZXInKTtcbnZhciBtYXJrZWQgICAgICAgID0gcmVxdWlyZSgnbWFya2VkJyk7XG52YXIgaHRtbDJtYXJrZG93biA9IHJlcXVpcmUoJ2h0bWwybWFya2Rvd24nKTtcbnZhciBtZXRob2QgICAgICAgID0gcmVxdWlyZSgnZXhlbWV0aG9kJykoZnVuY3Rpb24oYSxiKXtyZXR1cm4gYjt9KVxudmFyIGZzICAgICAgICAgICAgPSByZXF1aXJlKCdmcycpO1xudmFyIG9zICAgICAgICAgICAgPSByZXF1aXJlKCdvcycpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBQQVJBTUVURVIgPSBBUkdVTUVOVCArIFtTYW5pdGl6ZSAmIFZhbGlkYXRlXVxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGFyZ3MgICAgICAgICAgPSBwcm9jZXNzLmFyZ3Yuc2xpY2UoMik7XG5mdW5jdGlvbiBzZXRJbnB1dCAoZXJyb3IsIG1vZGUsIHN0cmluZywgZmlsZW5hbWUpIHtcbiAgaWYgKGVycm9yKSB7IHRocm93IGVycm9yOyB9XG4gIHZhciAkbW9kZSAgICAgICA9IG1vZGU7XG4gIHZhciAkc3RyaW5nICAgICA9IHN0cmluZztcbiAgdmFyICRmaWxlbmFtZSAgID0gZmlsZW5hbWU7XG59XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYUE9SVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy8gUkVRVUlSRUQgTU9EVUxFXG5pZiAoeydyZXF1aXJlZCc6dHJ1ZSwnYnJvd3NlcmlmeSc6dHJ1ZX1bbWV0aG9kXSkge1xuICBtb2R1bGUuZXhwb3J0cyA9ICB7XG4gICAgcGFyc2UgICAgICAgICAgIDogcGFyc2UsXG4gICAgc2VyaWFsaXplICAgICAgIDogc2VyaWFsaXplXG4gIH07XG59IGVsc2UgaWYgKHsnbnBtJzp0cnVlLCdzY3JpcHQnOnRydWUsJ2dsb2JhbGNsaSc6dHJ1ZSwnbG9jYWxjbGknOnRydWV9W21ldGhvZF0pIHtcbiAgLy8gJCBub2RlIC1wIC1lICdwcm9jZXNzLnN0ZGluLmlzVFRZJyAvLyA9PiB0cnVlXG4gIGlmIChwcm9jZXNzLnN0ZGluLmlzVFRZKSB7XG4gICAgLy8gU0VSVkVSICQ+IGNsaSAtLXNlcnZlclxuICAgIGlmIChhcmdzWzBdID09PSAnLS1zZXJ2ZXInKSB7XG4gICAgICBjb25zb2xlLmxvZygnU0VSVkVSIHdpdGggUkVQTCcpO1xuICAgICAgY29uc29sZS5sb2coJ1RvIGFib3J0IHByZXNzOiBDVFJMK0Qgb3IgQ1RSTCtDJyk7XG4gICAgICBzZXRJbnB1dChudWxsLCBhcmdzWzBdLCBudWxsLCBudWxsKTtcbiAgICAgIHN0YXJ0RGVhbW9uKCk7XG4gICAgLy8gQ0xJICQ+IGNsaSAtLXNlcmlhbGl6ZSBmaWxlbmFtZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnTk9STUFMIENMSSBFWEVDVVRJT04nKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQFRPRE86IHNlcmlhbGl6ZS9wYXJzZSBmcm9tIGNsaSBub3QgaW1wbGVtZW50ZWQgeWV0IScpO1xuICAgICAgaWYgKGFyZ3NbMV0pIHsgLy8gQ0xJICsgMiBhcmdzXG4gICAgICAgIHNldElucHV0KG51bGwsIGFyZ3NbMF0sIG51bGwsIGFyZ3NbMV0pO1xuICAgICAgfSBlbHNlIGlmIChhcmdzWzBdKSB7IC8vIENMSSArIDEgYXJnXG4gICAgICAgIHNldElucHV0KG51bGwsICctLXBhcnNlJywgbnVsbCwgYXJnc1swXSk7XG4gICAgICB9IGVsc2UgeyAvLyBDTEkgKyBubyBhcmdzXG4gICAgICAgIHNldElucHV0KG5ldyBFcnJvcignQFRPRE86IGFkZCAtLWhlbHAgb3B0aW9uICYgc2hvdyB3aGVuIGdpdmVuIG5vIGFyZ3MnKSk7XG4gICAgICB9XG4gICAgfVxuICAvLyAkIGVjaG8gJ2ZvbycgfCBub2RlIC1wIC1lICdwcm9jZXNzLnN0ZGluLmlzVFRZJyAvLyA9PiB1bmRlZmluZWRcbiAgLy8gQFRPRE86ICEhISEgTWF5YmUgXCJtZXRob2Q9J25wbSdcIiB3aWxsIG5vdCBjb3VudCBhcyBub3JtYWwgY2xpIGV4ZWN1dGlvbiAhISEhICEhISEhISEhIVxuICB9IGVsc2UgaWYgKGFyZ3NbMF0gPT09ICctLXNlcnZlcicpIHtcbiAgICBzZXRJbnB1dChuZXcgRXJyb3IoJ0BUT0RPOiBhZGQgc3RyZWFtIGludG8gc2VydmVyIGRlYW1vbiBwcm9jZXNzJykpO1xuICAvLyBQSVBFRFxuICB9IGVsc2UgaWYgKGFyZ3NbMF0pIHtcbiAgICB2YXIgJG1vZGUgPSBhcmdzWzBdO1xuICAgIHN0YXJ0U3RyZWFtKCk7XG4gICAgc3RhcnREZWFtb24oKTtcbiAgfSBlbHNlIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICB2YXIgJG1vZGUgICAgID0gJy0tcGFyc2UnO1xuICAgIHN0YXJ0U3RyZWFtKCk7XG4gICAgc3RhcnREZWFtb24oKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0BUT0RPOiB3aGF0cyB3cm9uZyBoZXJlPz8/Jyk7XG4gIH1cbn0gZWxzZSB7XG4gIHRocm93IG5ldyBFcnJvcignQFRPRE86IHVuc3VwcG9ydGVkIG1ldGhvZDogJyttZXRob2QpO1xufVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBQSVBFIFNUUkVBTVxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gc3RhcnRTdHJlYW0gKCkge1xuICBwcm9jZXNzLnN0ZGluLnNldEVuY29kaW5nKCd1dGY4Jyk7XG4gIHByb2Nlc3Muc3RkaW4ub24oJ2RhdGEnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiLS1wYXJzZVwiICAgICA6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHBhcnNlKHN0cmluZyk7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgMikpO1xuICAgICAgfSxcbiAgICAgIFwiLS1zZXJpYWxpemVcIiA6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHNlcmlhbGl6ZShKU09OLnBhcnNlKHN0cmluZykpO1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShyZXN1bHQpO1xuICAgICAgfVxuICAgIH1bJG1vZGVdKGRhdGEpO1xuICB9KTtcbn1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgVU5JWCBTSUdOQUxTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBzdGFydERlYW1vbiAoKSB7XG4gIC8vIHBzIGF1eCB8IGdyZXAgeW91cnNjcmlwdFxuICAvLyBraWxsIC1zIFNJR0lOVCBbcHJvY2Vzc19pZF1cbiAgcHJvY2Vzcy5zdGRpbi5yZXN1bWUoKTtcbiAgcHJvY2Vzcy5vbignU0lHSU5UJywgZnVuY3Rpb24gKGVycikge1xuICAgIC8vIEFuIGVhc3kgd2F5IHRvIHNlbmQgdGhlIFNJR0lOVCBzaWduYWwgaXMgd2l0aCBDb250cm9sLUMgaW4gbW9zdCB0ZXJtaW5hbCBwcm9ncmFtcy5cbiAgICAvLyBOb3RlOlxuICAgIC8vICAgU0lHVVNSMSBpcyByZXNlcnZlZCBieSBub2RlLmpzIHRvIHN0YXJ0IHRoZSBkZWJ1Z2dlci4gSXQncyBwb3NzaWJsZSB0byBpbnN0YWxsIGEgbGlzdGVuZXIgYnV0IHRoYXQgd29uJ3Qgc3RvcCB0aGUgZGVidWdnZXIgZnJvbSBzdGFydGluZy5cbiAgICAvLyAgIFNJR1RFUk0gYW5kIFNJR0lOVCBoYXZlIGRlZmF1bHQgaGFuZGxlcnMgb24gbm9uLVdpbmRvd3MgcGxhdGZvcm1zIHRoYXQgcmVzZXRzIHRoZSB0ZXJtaW5hbCBtb2RlIGJlZm9yZSBleGl0aW5nIHdpdGggY29kZSAxMjggKyBzaWduYWwgbnVtYmVyLiBJZiBvbmUgb2YgdGhlc2Ugc2lnbmFscyBoYXMgYSBsaXN0ZW5lciBpbnN0YWxsZWQsIGl0cyBkZWZhdWx0IGJlaGF2aW91ciB3aWxsIGJlIHJlbW92ZWQgKG5vZGUgd2lsbCBubyBsb25nZXIgZXhpdCkuXG4gICAgLy8gICBTSUdQSVBFIGlzIGlnbm9yZWQgYnkgZGVmYXVsdCwgaXQgY2FuIGhhdmUgYSBsaXN0ZW5lciBpbnN0YWxsZWQuXG4gICAgLy8gICBTSUdIVVAgaXMgZ2VuZXJhdGVkIG9uIFdpbmRvd3Mgd2hlbiB0aGUgY29uc29sZSB3aW5kb3cgaXMgY2xvc2VkLCBhbmQgb24gb3RoZXIgcGxhdGZvcm1zIHVuZGVyIHZhcmlvdXMgc2ltaWxhciBjb25kaXRpb25zLCBzZWUgc2lnbmFsKDcpLiBJdCBjYW4gaGF2ZSBhIGxpc3RlbmVyIGluc3RhbGxlZCwgaG93ZXZlciBub2RlIHdpbGwgYmUgdW5jb25kaXRpb25hbGx5IHRlcm1pbmF0ZWQgYnkgV2luZG93cyBhYm91dCAxMCBzZWNvbmRzIGxhdGVyLiBPbiBub24tV2luZG93cyBwbGF0Zm9ybXMsIHRoZSBkZWZhdWx0IGJlaGF2aW91ciBvZiBTSUdIVVAgaXMgdG8gdGVybWluYXRlIG5vZGUsIGJ1dCBvbmNlIGEgbGlzdGVuZXIgaGFzIGJlZW4gaW5zdGFsbGVkIGl0cyBkZWZhdWx0IGJlaGF2aW91ciB3aWxsIGJlIHJlbW92ZWQuXG4gICAgLy8gICBTSUdURVJNIGlzIG5vdCBzdXBwb3J0ZWQgb24gV2luZG93cywgaXQgY2FuIGJlIGxpc3RlbmVkIG9uLlxuICAgIC8vICAgU0lHSU5UIGZyb20gdGhlIHRlcm1pbmFsIGlzIHN1cHBvcnRlZCBvbiBhbGwgcGxhdGZvcm1zLCBhbmQgY2FuIHVzdWFsbHkgYmUgZ2VuZXJhdGVkIHdpdGggQ1RSTCtDICh0aG91Z2ggdGhpcyBtYXkgYmUgY29uZmlndXJhYmxlKS4gSXQgaXMgbm90IGdlbmVyYXRlZCB3aGVuIHRlcm1pbmFsIHJhdyBtb2RlIGlzIGVuYWJsZWQuXG4gICAgLy8gICBTSUdCUkVBSyBpcyBkZWxpdmVyZWQgb24gV2luZG93cyB3aGVuIENUUkwrQlJFQUsgaXMgcHJlc3NlZCwgb24gbm9uLVdpbmRvd3MgcGxhdGZvcm1zIGl0IGNhbiBiZSBsaXN0ZW5lZCBvbiwgYnV0IHRoZXJlIGlzIG5vIHdheSB0byBzZW5kIG9yIGdlbmVyYXRlIGl0LlxuICAgIC8vICAgU0lHV0lOQ0ggaXMgZGVsaXZlcmVkIHdoZW4gdGhlIGNvbnNvbGUgaGFzIGJlZW4gcmVzaXplZC4gT24gV2luZG93cywgdGhpcyB3aWxsIG9ubHkgaGFwcGVuIG9uIHdyaXRlIHRvIHRoZSBjb25zb2xlIHdoZW4gdGhlIGN1cnNvciBpcyBiZWluZyBtb3ZlZCwgb3Igd2hlbiBhIHJlYWRhYmxlIHR0eSBpcyB1c2VkIGluIHJhdyBtb2RlLlxuICAgIC8vICAgU0lHS0lMTCBjYW5ub3QgaGF2ZSBhIGxpc3RlbmVyIGluc3RhbGxlZCwgaXQgd2lsbCB1bmNvbmRpdGlvbmFsbHkgdGVybWluYXRlIG5vZGUgb24gYWxsIHBsYXRmb3Jtcy5cbiAgICAvLyAgIFNJR1NUT1AgY2Fubm90IGhhdmUgYSBsaXN0ZW5lciBpbnN0YWxsZWQuXG4gICAgLy8gICBOb3RlIHRoYXQgV2luZG93cyBkb2VzIG5vdCBzdXBwb3J0IHNlbmRpbmcgU2lnbmFscywgYnV0IG5vZGUgb2ZmZXJzIHNvbWUgZW11bGF0aW9uIHdpdGggcHJvY2Vzcy5raWxsKCksIGFuZCBjaGlsZF9wcm9jZXNzLmtpbGwoKTogLSBTZW5kaW5nIHNpZ25hbCAwIGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhIHByb2Nlc3MgLSBTZW5kaW5nIFNJR0lOVCwgU0lHVEVSTSwgYW5kIFNJR0tJTEwgY2F1c2UgdGhlIHVuY29uZGl0aW9uYWwgZXhpdCBvZiB0aGUgdGFyZ2V0IHByb2Nlc3MuXG4gICAgY29uc29sZS5sb2coJ0dvdCBhIFNJR0lOVC4gR29vZGJ5ZSBjcnVlbCB3b3JsZC4nKTtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gIH0pO1xufVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBNT0RVTEUgSU5URVJOQUxTICYgSEVMUEVSU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gcGFyc2UgKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0ganNvbm1hdHRlci5wYXJzZShzdHJpbmcsIHtcbiAgICByZWdleDogL15bXFxzXFx0XFxuXFxyXSotLS17MX1bXFxzXFx0XFxuXFxyXSooXFx7W1xcc1xcU10qXFx9W1xcc1xcdFxcblxccl0qKSgtLS17MX0pL1xuICB9KTtcbiAgdmFyIG1hcmtkb3duICAgICAgICA9IHJlc3VsdC5fX2NvbnRlbnRfXztcbiAgdmFyIGh0bWwgICAgICAgICAgICA9IG1hcmtlZChtYXJrZG93bikucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCJcIik7XG4gIHJlc3VsdC5fX2NvbnRlbnRfXyAgPSBwYXRjaChodG1sLCByZXN1bHQuY3VzdG9tKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHNlcmlhbGl6ZSAob2JqZWN0KSB7XG4gIHZhciBodG1sICAgID0gb2JqZWN0Ll9fY29udGVudF9fO1xuICBodG1sICAgICAgICA9IHVucGF0Y2goaHRtbCwgb2JqZWN0LmN1c3RvbSk7XG4gIG9iamVjdC5fX2NvbnRlbnRfXyAgPSBodG1sMm1hcmtkb3duKGh0bWwpO1xuICB2YXIgcmVzdWx0ICA9IGpzb25tYXR0ZXIuc2VyaWFsaXplKG9iamVjdCwge1xuICAgIGRlbGltaXRlcjogb3MuRU9MKyctLS0nK29zLkVPTCtvcy5FT0xcbiAgfSk7XG4gIHJldHVybiAnLS0tJyArIG9zLkVPTCArIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHVucGF0Y2ggKGh0bWwsIGN1c3RvbSkge1xuICAvLyBmb3IgKHZhciBrZXkgaW4gY3VzdG9tKSB7XG4gIC8vICAgdmFyIGh0bWxzdHJpbmcgPSBjdXN0b21ba2V5XTtcbiAgLy8gICBmb3IgKHZhciBvbGQ7IG9sZCAhPSBodG1sOyl7XG4gIC8vICAgICBvbGQgPSBodG1sO1xuICAvLyAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShcbiAgLy8gICAgICAgaHRtbHN0cmluZyxcbiAgLy8gICAgICAgJzxhIGhyZWY9XCIoJytrZXkrJylcIj57eycra2V5LnN1YnN0cigyLGtleS5sZW5ndGgpKyd9fTwvYT4nXG4gIC8vICAgICApO1xuICAvLyAgIH1cbiAgLy8gfVxuICBpZiAoY3VzdG9tKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdAVE9ETzogaHRtbDJtYXJrZG93biBwYXJzZXIgaXMgdG9vIHNtYXJ0IC0gc28gbm90IHlldCBpbXBsZW1lbnRlZCAtIG9wZW4gYW4gaXNzdWUgaWYgeW91IG5lZWQgaXQgdG8gYmUgc29sdmVkJylcbiAgfVxuICAvLyByZXR1cm4gaHRtbDtcbn1cbmZ1bmN0aW9uIHBhdGNoIChodG1sLCBjdXN0b20pIHtcbiAgZm9yICh2YXIga2V5IGluIGN1c3RvbSkge1xuICAgIHZhciByZWd4ID0gbmV3IFJlZ0V4cCgnPGEgaHJlZj1cIignICsga2V5ICsgJylcIj5bXjw+XSo8XFwvYT4nLCAnZycpO1xuICAgIGh0bWwgPSBodG1sLnJlcGxhY2UocmVneCwgZnVuY3Rpb24gKG1hdGNoLCBjb250ZW50cywgb2Zmc2V0LCBzKSB7XG4gICAgICByZXR1cm4gY3VzdG9tW2tleV07XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGh0bWw7XG59XG4iLCJcbid1c2Ugc3RyaWN0Jztcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTID0gQ1VTVE9NIFNESyBbQ3VzdG9tIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdF1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaSB0b29sXG4gIC8vICRwYXJhbU5hbWUgPSBwcm9jZXNzLmFyZ3ZbMl07XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIE1PRFVMRSBJTlRFUk5BTFMgJiBIRUxQRVJTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiByZXR1cm5NZXNzYWdlIChtc2csIG1ldGhvZCkge1xuICBjb25zb2xlLmxvZygnPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyk7XG4gIGNvbnNvbGUubG9nKG1zZyk7XG4gIGNvbnNvbGUubG9nKCc9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0nKTtcbiAgcmV0dXJuIG1ldGhvZDtcbn1cbmZ1bmN0aW9uIGV4ZW1ldGhvZCAobG9nZ2VyKSB7XG4gIC8vIGxvZ2dlcjogZnVuY3Rpb24gKG1zZywgbWV0aG9kKSB7IC8qbG9nIGhlcmUqLyByZXR1cm4gbWV0aG9kOyB9XG4gIC8vIHJldHVybiBbbnBtfHNjcmlwdHxnbG9iYWxjbGl8bG9jYWxjbGl8cmVxdWlyZWR8YnJvd3NlcmlmeV1cbiAgbG9nZ2VyID0gbG9nZ2VyID8gbG9nZ2VyIDogcmV0dXJuTWVzc2FnZTtcbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCcpIHtcbiAgICB2YXIgaXNMaW51eCAgICAgICAgID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICAgIHZhciBpc01hYyAgICAgICAgICAgPSB0cnVlO1xuICB9IGVsc2UgaWYgKHByb2Nlc3MucGxhdGZvcm0pIHtcbiAgICB2YXIgaXNXaW5kb3dzICAgICAgID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaXNCcm93c2VyaWZpZWQgID0gcHJvY2Vzcy50aXRsZSA9PT0gJ2Jyb3dzZXInO1xuICB9XG4gIHZhciBpc05vZGUgICAgICAgICAgICA9ICFpc0Jyb3dzZXJpZmllZDtcbiAgaWYgKGlzTm9kZSkge1xuICAgIHZhciBpc1JlcXVpcmVkICA9IG1vZHVsZS5wYXJlbnQgPyBtb2R1bGUucGFyZW50LnBhcmVudCA/IHRydWU6ZmFsc2U6ZmFsc2U7XG4gICAgdmFyIGlzQ0xJICAgICAgID0gIWlzUmVxdWlyZWQ7XG4gICAgaWYgKGlzQ0xJKSB7XG4gICAgICB2YXIgZnVsbHBhdGggID0gcHJvY2Vzcy5lbnYuXy5zcGxpdChwYXRoLnNlcCk7XG4gICAgICB2YXIgZGlyICAgICAgID0gZnVsbHBhdGhbMF07XG4gICAgICB2YXIgY21kICAgICAgID0gZnVsbHBhdGhbZnVsbHBhdGgubGVuZ3RoLTFdO1xuICAgICAgdmFyIGlzTG9jYWwgICA9IGNtZCA9PT0gJ25vZGUnIHx8IGNtZCA9PT0gJ2lvanMnO1xuICAgICAgdmFyIGlzU2NyaXB0ICA9IGRpciA9PT0gJy4nO1xuICAgICAgdmFyIGlzTlBNICAgICA9IGNtZCA9PT0gJ25wbSc7XG4gICAgICB2YXIgaXNHbG9iYWwgID0gIWlzTG9jYWw7XG4gICAgICBpZiAoaXNOUE0pIHtcbiAgICAgICAgcmV0dXJuIGxvZ2dlcignRVhFQyBBUzogbnBtIHJ1biAuLi4nLCAnbnBtJyk7XG4gICAgICB9IGVsc2UgaWYgKGlzU2NyaXB0KSB7XG4gICAgICAgIHJldHVybiBsb2dnZXIoJ0VYRUMgQVM6IHN0YW5kYWxvbmUgc2NyaXB0JywgJ3NjcmlwdCcpO1xuICAgICAgfSBlbHNlIGlmIChpc0dsb2JhbCkge1xuICAgICAgICByZXR1cm4gbG9nZ2VyKCdFWEVDIEFTOiBub2RlIGNsaSBnbG9iYWwnLCAnZ2xvYmFsY2xpJyk7XG4gICAgICB9IGVsc2UgaWYgKGlzTG9jYWwpe1xuICAgICAgICByZXR1cm4gbG9nZ2VyKCdFWEVDIEFTOiBub2RlIGNsaSBsb2NhbCcsICdsb2NhbGNsaScpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgcmV0dXJuIGxvZ2dlcignRVhFQyBBUzogbm9kZSByZXF1aXJlZCguLi4pJywgJ3JlcXVpcmVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ3VycmVudCB1c2FnZSBub3Qgc3VwcG9ydGVkLiBbd2VpcmQgbm9kZSB1c2FnZV0nKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNCcm93c2VyaWZpZWQpIHtcbiAgICB2YXIgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgcmV0dXJuIGxvZ2dlcignRVhFQyBBUzogYnJvd3NlciByZXF1aXJlZCguLi4pJywgJ2Jyb3dzZXJpZnknKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXJyZW50IHVzYWdlIG5vdCBzdXBwb3J0ZWQuIFticm93c2VyaWZpZWQgY2xpXScpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1cnJlbnQgdXNhZ2Ugbm90IHN1cHBvcnRlZC4gW3Vua25vd24gZW52aXJvbm1lbnRdJyk7XG4gIH1cbn1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyA9IGV4ZW1ldGhvZDtcbiIsIi8qKlxuICogbWFya2VkIC0gYSBtYXJrZG93biBwYXJzZXJcbiAqIENvcHlyaWdodCAoYykgMjAxMS0yMDE0LCBDaHJpc3RvcGhlciBKZWZmcmV5LiAoTUlUIExpY2Vuc2VkKVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NoamovbWFya2VkXG4gKi9cblxuOyhmdW5jdGlvbigpIHtcblxuLyoqXG4gKiBCbG9jay1MZXZlbCBHcmFtbWFyXG4gKi9cblxudmFyIGJsb2NrID0ge1xuICBuZXdsaW5lOiAvXlxcbisvLFxuICBjb2RlOiAvXiggezR9W15cXG5dK1xcbiopKy8sXG4gIGZlbmNlczogbm9vcCxcbiAgaHI6IC9eKCAqWy0qX10pezMsfSAqKD86XFxuK3wkKS8sXG4gIGhlYWRpbmc6IC9eICooI3sxLDZ9KSAqKFteXFxuXSs/KSAqIyogKig/Olxcbit8JCkvLFxuICBucHRhYmxlOiBub29wLFxuICBsaGVhZGluZzogL14oW15cXG5dKylcXG4gKig9fC0pezIsfSAqKD86XFxuK3wkKS8sXG4gIGJsb2NrcXVvdGU6IC9eKCAqPlteXFxuXSsoXFxuKD8hZGVmKVteXFxuXSspKlxcbiopKy8sXG4gIGxpc3Q6IC9eKCAqKShidWxsKSBbXFxzXFxTXSs/KD86aHJ8ZGVmfFxcbnsyLH0oPyEgKSg/IVxcMWJ1bGwgKVxcbip8XFxzKiQpLyxcbiAgaHRtbDogL14gKig/OmNvbW1lbnQgKig/OlxcbnxcXHMqJCl8Y2xvc2VkICooPzpcXG57Mix9fFxccyokKXxjbG9zaW5nICooPzpcXG57Mix9fFxccyokKSkvLFxuICBkZWY6IC9eICpcXFsoW15cXF1dKylcXF06ICo8PyhbXlxccz5dKyk+Pyg/OiArW1wiKF0oW15cXG5dKylbXCIpXSk/ICooPzpcXG4rfCQpLyxcbiAgdGFibGU6IG5vb3AsXG4gIHBhcmFncmFwaDogL14oKD86W15cXG5dK1xcbj8oPyFocnxoZWFkaW5nfGxoZWFkaW5nfGJsb2NrcXVvdGV8dGFnfGRlZikpKylcXG4qLyxcbiAgdGV4dDogL15bXlxcbl0rL1xufTtcblxuYmxvY2suYnVsbGV0ID0gLyg/OlsqKy1dfFxcZCtcXC4pLztcbmJsb2NrLml0ZW0gPSAvXiggKikoYnVsbCkgW15cXG5dKig/Olxcbig/IVxcMWJ1bGwgKVteXFxuXSopKi87XG5ibG9jay5pdGVtID0gcmVwbGFjZShibG9jay5pdGVtLCAnZ20nKVxuICAoL2J1bGwvZywgYmxvY2suYnVsbGV0KVxuICAoKTtcblxuYmxvY2subGlzdCA9IHJlcGxhY2UoYmxvY2subGlzdClcbiAgKC9idWxsL2csIGJsb2NrLmJ1bGxldClcbiAgKCdocicsICdcXFxcbisoPz1cXFxcMT8oPzpbLSpfXSAqKXszLH0oPzpcXFxcbit8JCkpJylcbiAgKCdkZWYnLCAnXFxcXG4rKD89JyArIGJsb2NrLmRlZi5zb3VyY2UgKyAnKScpXG4gICgpO1xuXG5ibG9jay5ibG9ja3F1b3RlID0gcmVwbGFjZShibG9jay5ibG9ja3F1b3RlKVxuICAoJ2RlZicsIGJsb2NrLmRlZilcbiAgKCk7XG5cbmJsb2NrLl90YWcgPSAnKD8hKD86J1xuICArICdhfGVtfHN0cm9uZ3xzbWFsbHxzfGNpdGV8cXxkZm58YWJicnxkYXRhfHRpbWV8Y29kZSdcbiAgKyAnfHZhcnxzYW1wfGtiZHxzdWJ8c3VwfGl8Ynx1fG1hcmt8cnVieXxydHxycHxiZGl8YmRvJ1xuICArICd8c3Bhbnxicnx3YnJ8aW5zfGRlbHxpbWcpXFxcXGIpXFxcXHcrKD8hOi98W15cXFxcd1xcXFxzQF0qQClcXFxcYic7XG5cbmJsb2NrLmh0bWwgPSByZXBsYWNlKGJsb2NrLmh0bWwpXG4gICgnY29tbWVudCcsIC88IS0tW1xcc1xcU10qPy0tPi8pXG4gICgnY2xvc2VkJywgLzwodGFnKVtcXHNcXFNdKz88XFwvXFwxPi8pXG4gICgnY2xvc2luZycsIC88dGFnKD86XCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj8+LylcbiAgKC90YWcvZywgYmxvY2suX3RhZylcbiAgKCk7XG5cbmJsb2NrLnBhcmFncmFwaCA9IHJlcGxhY2UoYmxvY2sucGFyYWdyYXBoKVxuICAoJ2hyJywgYmxvY2suaHIpXG4gICgnaGVhZGluZycsIGJsb2NrLmhlYWRpbmcpXG4gICgnbGhlYWRpbmcnLCBibG9jay5saGVhZGluZylcbiAgKCdibG9ja3F1b3RlJywgYmxvY2suYmxvY2txdW90ZSlcbiAgKCd0YWcnLCAnPCcgKyBibG9jay5fdGFnKVxuICAoJ2RlZicsIGJsb2NrLmRlZilcbiAgKCk7XG5cbi8qKlxuICogTm9ybWFsIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5ub3JtYWwgPSBtZXJnZSh7fSwgYmxvY2spO1xuXG4vKipcbiAqIEdGTSBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2suZ2ZtID0gbWVyZ2Uoe30sIGJsb2NrLm5vcm1hbCwge1xuICBmZW5jZXM6IC9eICooYHszLH18fnszLH0pICooXFxTKyk/ICpcXG4oW1xcc1xcU10rPylcXHMqXFwxICooPzpcXG4rfCQpLyxcbiAgcGFyYWdyYXBoOiAvXi9cbn0pO1xuXG5ibG9jay5nZm0ucGFyYWdyYXBoID0gcmVwbGFjZShibG9jay5wYXJhZ3JhcGgpXG4gICgnKD8hJywgJyg/ISdcbiAgICArIGJsb2NrLmdmbS5mZW5jZXMuc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwyJykgKyAnfCdcbiAgICArIGJsb2NrLmxpc3Quc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwzJykgKyAnfCcpXG4gICgpO1xuXG4vKipcbiAqIEdGTSArIFRhYmxlcyBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2sudGFibGVzID0gbWVyZ2Uoe30sIGJsb2NrLmdmbSwge1xuICBucHRhYmxlOiAvXiAqKFxcUy4qXFx8LiopXFxuICooWy06XSsgKlxcfFstfCA6XSopXFxuKCg/Oi4qXFx8LiooPzpcXG58JCkpKilcXG4qLyxcbiAgdGFibGU6IC9eICpcXHwoLispXFxuICpcXHwoICpbLTpdK1stfCA6XSopXFxuKCg/OiAqXFx8LiooPzpcXG58JCkpKilcXG4qL1xufSk7XG5cbi8qKlxuICogQmxvY2sgTGV4ZXJcbiAqL1xuXG5mdW5jdGlvbiBMZXhlcihvcHRpb25zKSB7XG4gIHRoaXMudG9rZW5zID0gW107XG4gIHRoaXMudG9rZW5zLmxpbmtzID0ge307XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLnJ1bGVzID0gYmxvY2subm9ybWFsO1xuXG4gIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50YWJsZXMpIHtcbiAgICAgIHRoaXMucnVsZXMgPSBibG9jay50YWJsZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucnVsZXMgPSBibG9jay5nZm07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIEJsb2NrIFJ1bGVzXG4gKi9cblxuTGV4ZXIucnVsZXMgPSBibG9jaztcblxuLyoqXG4gKiBTdGF0aWMgTGV4IE1ldGhvZFxuICovXG5cbkxleGVyLmxleCA9IGZ1bmN0aW9uKHNyYywgb3B0aW9ucykge1xuICB2YXIgbGV4ZXIgPSBuZXcgTGV4ZXIob3B0aW9ucyk7XG4gIHJldHVybiBsZXhlci5sZXgoc3JjKTtcbn07XG5cbi8qKlxuICogUHJlcHJvY2Vzc2luZ1xuICovXG5cbkxleGVyLnByb3RvdHlwZS5sZXggPSBmdW5jdGlvbihzcmMpIHtcbiAgc3JjID0gc3JjXG4gICAgLnJlcGxhY2UoL1xcclxcbnxcXHIvZywgJ1xcbicpXG4gICAgLnJlcGxhY2UoL1xcdC9nLCAnICAgICcpXG4gICAgLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXHUyNDI0L2csICdcXG4nKTtcblxuICByZXR1cm4gdGhpcy50b2tlbihzcmMsIHRydWUpO1xufTtcblxuLyoqXG4gKiBMZXhpbmdcbiAqL1xuXG5MZXhlci5wcm90b3R5cGUudG9rZW4gPSBmdW5jdGlvbihzcmMsIHRvcCwgYnEpIHtcbiAgdmFyIHNyYyA9IHNyYy5yZXBsYWNlKC9eICskL2dtLCAnJylcbiAgICAsIG5leHRcbiAgICAsIGxvb3NlXG4gICAgLCBjYXBcbiAgICAsIGJ1bGxcbiAgICAsIGJcbiAgICAsIGl0ZW1cbiAgICAsIHNwYWNlXG4gICAgLCBpXG4gICAgLCBsO1xuXG4gIHdoaWxlIChzcmMpIHtcbiAgICAvLyBuZXdsaW5lXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubmV3bGluZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzBdLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ3NwYWNlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb2RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuY29kZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiB7NH0vZ20sICcnKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIHRleHQ6ICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgICA/IGNhcC5yZXBsYWNlKC9cXG4rJC8sICcnKVxuICAgICAgICAgIDogY2FwXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGZlbmNlcyAoZ2ZtKVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmZlbmNlcy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICBsYW5nOiBjYXBbMl0sXG4gICAgICAgIHRleHQ6IGNhcFszXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBoZWFkaW5nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaGVhZGluZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBkZXB0aDogY2FwWzFdLmxlbmd0aCxcbiAgICAgICAgdGV4dDogY2FwWzJdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIG5vIGxlYWRpbmcgcGlwZSAoZ2ZtKVxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMubnB0YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXS5zcGxpdCgvICpcXHwgKi8pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKGl0ZW0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaGVhZGluZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxoZWFkaW5nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIGRlcHRoOiBjYXBbMl0gPT09ICc9JyA/IDEgOiAyLFxuICAgICAgICB0ZXh0OiBjYXBbMV1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaHJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5oci5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hyJ1xuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBibG9ja3F1b3RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYmxvY2txdW90ZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnYmxvY2txdW90ZV9zdGFydCdcbiAgICAgIH0pO1xuXG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiAqPiA/L2dtLCAnJyk7XG5cbiAgICAgIC8vIFBhc3MgYHRvcGAgdG8ga2VlcCB0aGUgY3VycmVudFxuICAgICAgLy8gXCJ0b3BsZXZlbFwiIHN0YXRlLiBUaGlzIGlzIGV4YWN0bHlcbiAgICAgIC8vIGhvdyBtYXJrZG93bi5wbCB3b3Jrcy5cbiAgICAgIHRoaXMudG9rZW4oY2FwLCB0b3AsIHRydWUpO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGVfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpc3RcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saXN0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGJ1bGwgPSBjYXBbMl07XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGlzdF9zdGFydCcsXG4gICAgICAgIG9yZGVyZWQ6IGJ1bGwubGVuZ3RoID4gMVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEdldCBlYWNoIHRvcC1sZXZlbCBpdGVtLlxuICAgICAgY2FwID0gY2FwWzBdLm1hdGNoKHRoaXMucnVsZXMuaXRlbSk7XG5cbiAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgIGwgPSBjYXAubGVuZ3RoO1xuICAgICAgaSA9IDA7XG5cbiAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBjYXBbaV07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBsaXN0IGl0ZW0ncyBidWxsZXRcbiAgICAgICAgLy8gc28gaXQgaXMgc2VlbiBhcyB0aGUgbmV4dCB0b2tlbi5cbiAgICAgICAgc3BhY2UgPSBpdGVtLmxlbmd0aDtcbiAgICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXiAqKFsqKy1dfFxcZCtcXC4pICsvLCAnJyk7XG5cbiAgICAgICAgLy8gT3V0ZGVudCB3aGF0ZXZlciB0aGVcbiAgICAgICAgLy8gbGlzdCBpdGVtIGNvbnRhaW5zLiBIYWNreS5cbiAgICAgICAgaWYgKH5pdGVtLmluZGV4T2YoJ1xcbiAnKSkge1xuICAgICAgICAgIHNwYWNlIC09IGl0ZW0ubGVuZ3RoO1xuICAgICAgICAgIGl0ZW0gPSAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgICAgICA/IGl0ZW0ucmVwbGFjZShuZXcgUmVnRXhwKCdeIHsxLCcgKyBzcGFjZSArICd9JywgJ2dtJyksICcnKVxuICAgICAgICAgICAgOiBpdGVtLnJlcGxhY2UoL14gezEsNH0vZ20sICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBuZXh0IGxpc3QgaXRlbSBiZWxvbmdzIGhlcmUuXG4gICAgICAgIC8vIEJhY2twZWRhbCBpZiBpdCBkb2VzIG5vdCBiZWxvbmcgaW4gdGhpcyBsaXN0LlxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNtYXJ0TGlzdHMgJiYgaSAhPT0gbCAtIDEpIHtcbiAgICAgICAgICBiID0gYmxvY2suYnVsbGV0LmV4ZWMoY2FwW2kgKyAxXSlbMF07XG4gICAgICAgICAgaWYgKGJ1bGwgIT09IGIgJiYgIShidWxsLmxlbmd0aCA+IDEgJiYgYi5sZW5ndGggPiAxKSkge1xuICAgICAgICAgICAgc3JjID0gY2FwLnNsaWNlKGkgKyAxKS5qb2luKCdcXG4nKSArIHNyYztcbiAgICAgICAgICAgIGkgPSBsIC0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciBpdGVtIGlzIGxvb3NlIG9yIG5vdC5cbiAgICAgICAgLy8gVXNlOiAvKF58XFxuKSg/ISApW15cXG5dK1xcblxcbig/IVxccyokKS9cbiAgICAgICAgLy8gZm9yIGRpc2NvdW50IGJlaGF2aW9yLlxuICAgICAgICBsb29zZSA9IG5leHQgfHwgL1xcblxcbig/IVxccyokKS8udGVzdChpdGVtKTtcbiAgICAgICAgaWYgKGkgIT09IGwgLSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGl0ZW0uY2hhckF0KGl0ZW0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nO1xuICAgICAgICAgIGlmICghbG9vc2UpIGxvb3NlID0gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IGxvb3NlXG4gICAgICAgICAgICA/ICdsb29zZV9pdGVtX3N0YXJ0J1xuICAgICAgICAgICAgOiAnbGlzdF9pdGVtX3N0YXJ0J1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWN1cnNlLlxuICAgICAgICB0aGlzLnRva2VuKGl0ZW0sIGZhbHNlLCBicSk7XG5cbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ2xpc3RfaXRlbV9lbmQnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpc3RfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGh0bWxcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5odG1sLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgICA/ICdwYXJhZ3JhcGgnXG4gICAgICAgICAgOiAnaHRtbCcsXG4gICAgICAgIHByZTogY2FwWzFdID09PSAncHJlJyB8fCBjYXBbMV0gPT09ICdzY3JpcHQnIHx8IGNhcFsxXSA9PT0gJ3N0eWxlJyxcbiAgICAgICAgdGV4dDogY2FwWzBdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlZlxuICAgIGlmICgoIWJxICYmIHRvcCkgJiYgKGNhcCA9IHRoaXMucnVsZXMuZGVmLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5saW5rc1tjYXBbMV0udG9Mb3dlckNhc2UoKV0gPSB7XG4gICAgICAgIGhyZWY6IGNhcFsyXSxcbiAgICAgICAgdGl0bGU6IGNhcFszXVxuICAgICAgfTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIChnZm0pXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy50YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC8oPzogKlxcfCAqKT9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXVxuICAgICAgICAgIC5yZXBsYWNlKC9eICpcXHwgKnwgKlxcfCAqJC9nLCAnJylcbiAgICAgICAgICAuc3BsaXQoLyAqXFx8ICovKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaChpdGVtKTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdG9wLWxldmVsIHBhcmFncmFwaFxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMucGFyYWdyYXBoLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3BhcmFncmFwaCcsXG4gICAgICAgIHRleHQ6IGNhcFsxXS5jaGFyQXQoY2FwWzFdLmxlbmd0aCAtIDEpID09PSAnXFxuJ1xuICAgICAgICAgID8gY2FwWzFdLnNsaWNlKDAsIC0xKVxuICAgICAgICAgIDogY2FwWzFdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgLy8gVG9wLWxldmVsIHNob3VsZCBuZXZlciByZWFjaCBoZXJlLlxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHRleHQ6IGNhcFswXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3JjKSB7XG4gICAgICB0aHJvdyBuZXdcbiAgICAgICAgRXJyb3IoJ0luZmluaXRlIGxvb3Agb24gYnl0ZTogJyArIHNyYy5jaGFyQ29kZUF0KDApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcy50b2tlbnM7XG59O1xuXG4vKipcbiAqIElubGluZS1MZXZlbCBHcmFtbWFyXG4gKi9cblxudmFyIGlubGluZSA9IHtcbiAgZXNjYXBlOiAvXlxcXFwoW1xcXFxgKnt9XFxbXFxdKCkjK1xcLS4hXz5dKS8sXG4gIGF1dG9saW5rOiAvXjwoW14gPl0rKEB8OlxcLylbXiA+XSspPi8sXG4gIHVybDogbm9vcCxcbiAgdGFnOiAvXjwhLS1bXFxzXFxTXSo/LS0+fF48XFwvP1xcdysoPzpcIlteXCJdKlwifCdbXiddKid8W14nXCI+XSkqPz4vLFxuICBsaW5rOiAvXiE/XFxbKGluc2lkZSlcXF1cXChocmVmXFwpLyxcbiAgcmVmbGluazogL14hP1xcWyhpbnNpZGUpXFxdXFxzKlxcWyhbXlxcXV0qKVxcXS8sXG4gIG5vbGluazogL14hP1xcWygoPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXSkqKVxcXS8sXG4gIHN0cm9uZzogL15fXyhbXFxzXFxTXSs/KV9fKD8hXyl8XlxcKlxcKihbXFxzXFxTXSs/KVxcKlxcKig/IVxcKikvLFxuICBlbTogL15cXGJfKCg/Ol9ffFtcXHNcXFNdKSs/KV9cXGJ8XlxcKigoPzpcXCpcXCp8W1xcc1xcU10pKz8pXFwqKD8hXFwqKS8sXG4gIGNvZGU6IC9eKGArKVxccyooW1xcc1xcU10qP1teYF0pXFxzKlxcMSg/IWApLyxcbiAgYnI6IC9eIHsyLH1cXG4oPyFcXHMqJCkvLFxuICBkZWw6IG5vb3AsXG4gIHRleHQ6IC9eW1xcc1xcU10rPyg/PVtcXFxcPCFcXFtfKmBdfCB7Mix9XFxufCQpL1xufTtcblxuaW5saW5lLl9pbnNpZGUgPSAvKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV18XFxdKD89W15cXFtdKlxcXSkpKi87XG5pbmxpbmUuX2hyZWYgPSAvXFxzKjw/KFtcXHNcXFNdKj8pPj8oPzpcXHMrWydcIl0oW1xcc1xcU10qPylbJ1wiXSk/XFxzKi87XG5cbmlubGluZS5saW5rID0gcmVwbGFjZShpbmxpbmUubGluaylcbiAgKCdpbnNpZGUnLCBpbmxpbmUuX2luc2lkZSlcbiAgKCdocmVmJywgaW5saW5lLl9ocmVmKVxuICAoKTtcblxuaW5saW5lLnJlZmxpbmsgPSByZXBsYWNlKGlubGluZS5yZWZsaW5rKVxuICAoJ2luc2lkZScsIGlubGluZS5faW5zaWRlKVxuICAoKTtcblxuLyoqXG4gKiBOb3JtYWwgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUubm9ybWFsID0gbWVyZ2Uoe30sIGlubGluZSk7XG5cbi8qKlxuICogUGVkYW50aWMgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUucGVkYW50aWMgPSBtZXJnZSh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBzdHJvbmc6IC9eX18oPz1cXFMpKFtcXHNcXFNdKj9cXFMpX18oPyFfKXxeXFwqXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKlxcKig/IVxcKikvLFxuICBlbTogL15fKD89XFxTKShbXFxzXFxTXSo/XFxTKV8oPyFfKXxeXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKig/IVxcKikvXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuZ2ZtID0gbWVyZ2Uoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgZXNjYXBlOiByZXBsYWNlKGlubGluZS5lc2NhcGUpKCddKScsICd+fF0pJykoKSxcbiAgdXJsOiAvXihodHRwcz86XFwvXFwvW15cXHM8XStbXjwuLDo7XCInKVxcXVxcc10pLyxcbiAgZGVsOiAvXn5+KD89XFxTKShbXFxzXFxTXSo/XFxTKX5+LyxcbiAgdGV4dDogcmVwbGFjZShpbmxpbmUudGV4dClcbiAgICAoJ118JywgJ35dfCcpXG4gICAgKCd8JywgJ3xodHRwcz86Ly98JylcbiAgICAoKVxufSk7XG5cbi8qKlxuICogR0ZNICsgTGluZSBCcmVha3MgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuYnJlYWtzID0gbWVyZ2Uoe30sIGlubGluZS5nZm0sIHtcbiAgYnI6IHJlcGxhY2UoaW5saW5lLmJyKSgnezIsfScsICcqJykoKSxcbiAgdGV4dDogcmVwbGFjZShpbmxpbmUuZ2ZtLnRleHQpKCd7Mix9JywgJyonKSgpXG59KTtcblxuLyoqXG4gKiBJbmxpbmUgTGV4ZXIgJiBDb21waWxlclxuICovXG5cbmZ1bmN0aW9uIElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLmxpbmtzID0gbGlua3M7XG4gIHRoaXMucnVsZXMgPSBpbmxpbmUubm9ybWFsO1xuICB0aGlzLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmICghdGhpcy5saW5rcykge1xuICAgIHRocm93IG5ld1xuICAgICAgRXJyb3IoJ1Rva2VucyBhcnJheSByZXF1aXJlcyBhIGBsaW5rc2AgcHJvcGVydHkuJyk7XG4gIH1cblxuICBpZiAodGhpcy5vcHRpb25zLmdmbSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYnJlYWtzKSB7XG4gICAgICB0aGlzLnJ1bGVzID0gaW5saW5lLmJyZWFrcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ydWxlcyA9IGlubGluZS5nZm07XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgIHRoaXMucnVsZXMgPSBpbmxpbmUucGVkYW50aWM7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2UgSW5saW5lIFJ1bGVzXG4gKi9cblxuSW5saW5lTGV4ZXIucnVsZXMgPSBpbmxpbmU7XG5cbi8qKlxuICogU3RhdGljIExleGluZy9Db21waWxpbmcgTWV0aG9kXG4gKi9cblxuSW5saW5lTGV4ZXIub3V0cHV0ID0gZnVuY3Rpb24oc3JjLCBsaW5rcywgb3B0aW9ucykge1xuICB2YXIgaW5saW5lID0gbmV3IElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKTtcbiAgcmV0dXJuIGlubGluZS5vdXRwdXQoc3JjKTtcbn07XG5cbi8qKlxuICogTGV4aW5nL0NvbXBpbGluZ1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXQgPSBmdW5jdGlvbihzcmMpIHtcbiAgdmFyIG91dCA9ICcnXG4gICAgLCBsaW5rXG4gICAgLCB0ZXh0XG4gICAgLCBocmVmXG4gICAgLCBjYXA7XG5cbiAgd2hpbGUgKHNyYykge1xuICAgIC8vIGVzY2FwZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmVzY2FwZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gY2FwWzFdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYXV0b2xpbmtcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5hdXRvbGluay5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzJdID09PSAnQCcpIHtcbiAgICAgICAgdGV4dCA9IGNhcFsxXS5jaGFyQXQoNikgPT09ICc6J1xuICAgICAgICAgID8gdGhpcy5tYW5nbGUoY2FwWzFdLnN1YnN0cmluZyg3KSlcbiAgICAgICAgICA6IHRoaXMubWFuZ2xlKGNhcFsxXSk7XG4gICAgICAgIGhyZWYgPSB0aGlzLm1hbmdsZSgnbWFpbHRvOicpICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICB9XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIG51bGwsIHRleHQpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdXJsIChnZm0pXG4gICAgaWYgKCF0aGlzLmluTGluayAmJiAoY2FwID0gdGhpcy5ydWxlcy51cmwuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgIGhyZWYgPSB0ZXh0O1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGluayhocmVmLCBudWxsLCB0ZXh0KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnRhZy5leGVjKHNyYykpIHtcbiAgICAgIGlmICghdGhpcy5pbkxpbmsgJiYgL148YSAvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmluTGluayAmJiAvXjxcXC9hPi9pLnRlc3QoY2FwWzBdKSkge1xuICAgICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgPyBlc2NhcGUoY2FwWzBdKVxuICAgICAgICA6IGNhcFswXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpbmtcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saW5rLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIG91dCArPSB0aGlzLm91dHB1dExpbmsoY2FwLCB7XG4gICAgICAgIGhyZWY6IGNhcFsyXSxcbiAgICAgICAgdGl0bGU6IGNhcFszXVxuICAgICAgfSk7XG4gICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gcmVmbGluaywgbm9saW5rXG4gICAgaWYgKChjYXAgPSB0aGlzLnJ1bGVzLnJlZmxpbmsuZXhlYyhzcmMpKVxuICAgICAgICB8fCAoY2FwID0gdGhpcy5ydWxlcy5ub2xpbmsuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGxpbmsgPSAoY2FwWzJdIHx8IGNhcFsxXSkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgICAgbGluayA9IHRoaXMubGlua3NbbGluay50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIGlmICghbGluayB8fCAhbGluay5ocmVmKSB7XG4gICAgICAgIG91dCArPSBjYXBbMF0uY2hhckF0KDApO1xuICAgICAgICBzcmMgPSBjYXBbMF0uc3Vic3RyaW5nKDEpICsgc3JjO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIG91dCArPSB0aGlzLm91dHB1dExpbmsoY2FwLCBsaW5rKTtcbiAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBzdHJvbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5zdHJvbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuc3Ryb25nKHRoaXMub3V0cHV0KGNhcFsyXSB8fCBjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGVtXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZW0uZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuZW0odGhpcy5vdXRwdXQoY2FwWzJdIHx8IGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gY29kZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmNvZGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuY29kZXNwYW4oZXNjYXBlKGNhcFsyXSwgdHJ1ZSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYnJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ici5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5icigpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZGVsIChnZm0pXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZGVsLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmRlbCh0aGlzLm91dHB1dChjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSBlc2NhcGUodGhpcy5zbWFydHlwYW50cyhjYXBbMF0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzcmMpIHtcbiAgICAgIHRocm93IG5ld1xuICAgICAgICBFcnJvcignSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvbXBpbGUgTGlua1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXRMaW5rID0gZnVuY3Rpb24oY2FwLCBsaW5rKSB7XG4gIHZhciBocmVmID0gZXNjYXBlKGxpbmsuaHJlZilcbiAgICAsIHRpdGxlID0gbGluay50aXRsZSA/IGVzY2FwZShsaW5rLnRpdGxlKSA6IG51bGw7XG5cbiAgcmV0dXJuIGNhcFswXS5jaGFyQXQoMCkgIT09ICchJ1xuICAgID8gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIHRpdGxlLCB0aGlzLm91dHB1dChjYXBbMV0pKVxuICAgIDogdGhpcy5yZW5kZXJlci5pbWFnZShocmVmLCB0aXRsZSwgZXNjYXBlKGNhcFsxXSkpO1xufTtcblxuLyoqXG4gKiBTbWFydHlwYW50cyBUcmFuc2Zvcm1hdGlvbnNcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUuc21hcnR5cGFudHMgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICghdGhpcy5vcHRpb25zLnNtYXJ0eXBhbnRzKSByZXR1cm4gdGV4dDtcbiAgcmV0dXJuIHRleHRcbiAgICAvLyBlbS1kYXNoZXNcbiAgICAucmVwbGFjZSgvLS0vZywgJ1xcdTIwMTQnKVxuICAgIC8vIG9wZW5pbmcgc2luZ2xlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcIlxcc10pJy9nLCAnJDFcXHUyMDE4JylcbiAgICAvLyBjbG9zaW5nIHNpbmdsZXMgJiBhcG9zdHJvcGhlc1xuICAgIC5yZXBsYWNlKC8nL2csICdcXHUyMDE5JylcbiAgICAvLyBvcGVuaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XFx1MjAxOFxcc10pXCIvZywgJyQxXFx1MjAxYycpXG4gICAgLy8gY2xvc2luZyBkb3VibGVzXG4gICAgLnJlcGxhY2UoL1wiL2csICdcXHUyMDFkJylcbiAgICAvLyBlbGxpcHNlc1xuICAgIC5yZXBsYWNlKC9cXC57M30vZywgJ1xcdTIwMjYnKTtcbn07XG5cbi8qKlxuICogTWFuZ2xlIExpbmtzXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm1hbmdsZSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgdmFyIG91dCA9ICcnXG4gICAgLCBsID0gdGV4dC5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBjaDtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIGNoID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBjaCA9ICd4JyArIGNoLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gICAgb3V0ICs9ICcmIycgKyBjaCArICc7JztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJlbmRlcmVyXG4gKi9cblxuZnVuY3Rpb24gUmVuZGVyZXIob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xufVxuXG5SZW5kZXJlci5wcm90b3R5cGUuY29kZSA9IGZ1bmN0aW9uKGNvZGUsIGxhbmcsIGVzY2FwZWQpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICB2YXIgb3V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodChjb2RlLCBsYW5nKTtcbiAgICBpZiAob3V0ICE9IG51bGwgJiYgb3V0ICE9PSBjb2RlKSB7XG4gICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgIGNvZGUgPSBvdXQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFsYW5nKSB7XG4gICAgcmV0dXJuICc8cHJlPjxjb2RlPidcbiAgICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICAgKyAnXFxuPC9jb2RlPjwvcHJlPic7XG4gIH1cblxuICByZXR1cm4gJzxwcmU+PGNvZGUgY2xhc3M9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMubGFuZ1ByZWZpeFxuICAgICsgZXNjYXBlKGxhbmcsIHRydWUpXG4gICAgKyAnXCI+J1xuICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICsgJ1xcbjwvY29kZT48L3ByZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJsb2NrcXVvdGUgPSBmdW5jdGlvbihxdW90ZSkge1xuICByZXR1cm4gJzxibG9ja3F1b3RlPlxcbicgKyBxdW90ZSArICc8L2Jsb2NrcXVvdGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oaHRtbCkge1xuICByZXR1cm4gaHRtbDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5oZWFkaW5nID0gZnVuY3Rpb24odGV4dCwgbGV2ZWwsIHJhdykge1xuICByZXR1cm4gJzxoJ1xuICAgICsgbGV2ZWxcbiAgICArICcgaWQ9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMuaGVhZGVyUHJlZml4XG4gICAgKyByYXcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXlxcd10rL2csICctJylcbiAgICArICdcIj4nXG4gICAgKyB0ZXh0XG4gICAgKyAnPC9oJ1xuICAgICsgbGV2ZWxcbiAgICArICc+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5ociA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxoci8+XFxuJyA6ICc8aHI+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24oYm9keSwgb3JkZXJlZCkge1xuICB2YXIgdHlwZSA9IG9yZGVyZWQgPyAnb2wnIDogJ3VsJztcbiAgcmV0dXJuICc8JyArIHR5cGUgKyAnPlxcbicgKyBib2R5ICsgJzwvJyArIHR5cGUgKyAnPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGlzdGl0ZW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGxpPicgKyB0ZXh0ICsgJzwvbGk+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5wYXJhZ3JhcGggPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPHA+JyArIHRleHQgKyAnPC9wPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGUgPSBmdW5jdGlvbihoZWFkZXIsIGJvZHkpIHtcbiAgcmV0dXJuICc8dGFibGU+XFxuJ1xuICAgICsgJzx0aGVhZD5cXG4nXG4gICAgKyBoZWFkZXJcbiAgICArICc8L3RoZWFkPlxcbidcbiAgICArICc8dGJvZHk+XFxuJ1xuICAgICsgYm9keVxuICAgICsgJzwvdGJvZHk+XFxuJ1xuICAgICsgJzwvdGFibGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZXJvdyA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgcmV0dXJuICc8dHI+XFxuJyArIGNvbnRlbnQgKyAnPC90cj5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlY2VsbCA9IGZ1bmN0aW9uKGNvbnRlbnQsIGZsYWdzKSB7XG4gIHZhciB0eXBlID0gZmxhZ3MuaGVhZGVyID8gJ3RoJyA6ICd0ZCc7XG4gIHZhciB0YWcgPSBmbGFncy5hbGlnblxuICAgID8gJzwnICsgdHlwZSArICcgc3R5bGU9XCJ0ZXh0LWFsaWduOicgKyBmbGFncy5hbGlnbiArICdcIj4nXG4gICAgOiAnPCcgKyB0eXBlICsgJz4nO1xuICByZXR1cm4gdGFnICsgY29udGVudCArICc8LycgKyB0eXBlICsgJz5cXG4nO1xufTtcblxuLy8gc3BhbiBsZXZlbCByZW5kZXJlclxuUmVuZGVyZXIucHJvdG90eXBlLnN0cm9uZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8c3Ryb25nPicgKyB0ZXh0ICsgJzwvc3Ryb25nPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuZW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGVtPicgKyB0ZXh0ICsgJzwvZW0+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5jb2Rlc3BhbiA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8Y29kZT4nICsgdGV4dCArICc8L2NvZGU+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5iciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxici8+JyA6ICc8YnI+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5kZWwgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGRlbD4nICsgdGV4dCArICc8L2RlbD4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBwcm90ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlKGhyZWYpKVxuICAgICAgICAucmVwbGFjZSgvW15cXHc6XS9nLCAnJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAocHJvdC5pbmRleE9mKCdqYXZhc2NyaXB0OicpID09PSAwIHx8IHByb3QuaW5kZXhPZigndmJzY3JpcHQ6JykgPT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbiAgdmFyIG91dCA9ICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCInO1xuICBpZiAodGl0bGUpIHtcbiAgICBvdXQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gIH1cbiAgb3V0ICs9ICc+JyArIHRleHQgKyAnPC9hPic7XG4gIHJldHVybiBvdXQ7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaW1hZ2UgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICB2YXIgb3V0ID0gJzxpbWcgc3JjPVwiJyArIGhyZWYgKyAnXCIgYWx0PVwiJyArIHRleHQgKyAnXCInO1xuICBpZiAodGl0bGUpIHtcbiAgICBvdXQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gIH1cbiAgb3V0ICs9IHRoaXMub3B0aW9ucy54aHRtbCA/ICcvPicgOiAnPic7XG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBhcnNpbmcgJiBDb21waWxpbmdcbiAqL1xuXG5mdW5jdGlvbiBQYXJzZXIob3B0aW9ucykge1xuICB0aGlzLnRva2VucyA9IFtdO1xuICB0aGlzLnRva2VuID0gbnVsbDtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMub3B0aW9ucy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlciB8fCBuZXcgUmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbn1cblxuLyoqXG4gKiBTdGF0aWMgUGFyc2UgTWV0aG9kXG4gKi9cblxuUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24oc3JjLCBvcHRpb25zLCByZW5kZXJlcikge1xuICB2YXIgcGFyc2VyID0gbmV3IFBhcnNlcihvcHRpb25zLCByZW5kZXJlcik7XG4gIHJldHVybiBwYXJzZXIucGFyc2Uoc3JjKTtcbn07XG5cbi8qKlxuICogUGFyc2UgTG9vcFxuICovXG5cblBhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihzcmMpIHtcbiAgdGhpcy5pbmxpbmUgPSBuZXcgSW5saW5lTGV4ZXIoc3JjLmxpbmtzLCB0aGlzLm9wdGlvbnMsIHRoaXMucmVuZGVyZXIpO1xuICB0aGlzLnRva2VucyA9IHNyYy5yZXZlcnNlKCk7XG5cbiAgdmFyIG91dCA9ICcnO1xuICB3aGlsZSAodGhpcy5uZXh0KCkpIHtcbiAgICBvdXQgKz0gdGhpcy50b2soKTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIE5leHQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9rZW4gPSB0aGlzLnRva2Vucy5wb3AoKTtcbn07XG5cbi8qKlxuICogUHJldmlldyBOZXh0IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLnRva2Vucy5sZW5ndGggLSAxXSB8fCAwO1xufTtcblxuLyoqXG4gKiBQYXJzZSBUZXh0IFRva2Vuc1xuICovXG5cblBhcnNlci5wcm90b3R5cGUucGFyc2VUZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib2R5ID0gdGhpcy50b2tlbi50ZXh0O1xuXG4gIHdoaWxlICh0aGlzLnBlZWsoKS50eXBlID09PSAndGV4dCcpIHtcbiAgICBib2R5ICs9ICdcXG4nICsgdGhpcy5uZXh0KCkudGV4dDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmlubGluZS5vdXRwdXQoYm9keSk7XG59O1xuXG4vKipcbiAqIFBhcnNlIEN1cnJlbnQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnRvayA9IGZ1bmN0aW9uKCkge1xuICBzd2l0Y2ggKHRoaXMudG9rZW4udHlwZSkge1xuICAgIGNhc2UgJ3NwYWNlJzoge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjYXNlICdocic6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmhyKCk7XG4gICAgfVxuICAgIGNhc2UgJ2hlYWRpbmcnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5oZWFkaW5nKFxuICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi50ZXh0KSxcbiAgICAgICAgdGhpcy50b2tlbi5kZXB0aCxcbiAgICAgICAgdGhpcy50b2tlbi50ZXh0KTtcbiAgICB9XG4gICAgY2FzZSAnY29kZSc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmNvZGUodGhpcy50b2tlbi50ZXh0LFxuICAgICAgICB0aGlzLnRva2VuLmxhbmcsXG4gICAgICAgIHRoaXMudG9rZW4uZXNjYXBlZCk7XG4gICAgfVxuICAgIGNhc2UgJ3RhYmxlJzoge1xuICAgICAgdmFyIGhlYWRlciA9ICcnXG4gICAgICAgICwgYm9keSA9ICcnXG4gICAgICAgICwgaVxuICAgICAgICAsIHJvd1xuICAgICAgICAsIGNlbGxcbiAgICAgICAgLCBmbGFnc1xuICAgICAgICAsIGo7XG5cbiAgICAgIC8vIGhlYWRlclxuICAgICAgY2VsbCA9ICcnO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMudG9rZW4uaGVhZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZsYWdzID0geyBoZWFkZXI6IHRydWUsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2ldIH07XG4gICAgICAgIGNlbGwgKz0gdGhpcy5yZW5kZXJlci50YWJsZWNlbGwoXG4gICAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4uaGVhZGVyW2ldKSxcbiAgICAgICAgICB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25baV0gfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaGVhZGVyICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnRva2VuLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvdyA9IHRoaXMudG9rZW4uY2VsbHNbaV07XG5cbiAgICAgICAgY2VsbCA9ICcnO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbChcbiAgICAgICAgICAgIHRoaXMuaW5saW5lLm91dHB1dChyb3dbal0pLFxuICAgICAgICAgICAgeyBoZWFkZXI6IGZhbHNlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltqXSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnRhYmxlKGhlYWRlciwgYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2Jsb2NrcXVvdGVfc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2Jsb2NrcXVvdGVfZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmJsb2NrcXVvdGUoYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2xpc3Rfc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnXG4gICAgICAgICwgb3JkZXJlZCA9IHRoaXMudG9rZW4ub3JkZXJlZDtcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0KGJvZHksIG9yZGVyZWQpO1xuICAgIH1cbiAgICBjYXNlICdsaXN0X2l0ZW1fc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2tlbi50eXBlID09PSAndGV4dCdcbiAgICAgICAgICA/IHRoaXMucGFyc2VUZXh0KClcbiAgICAgICAgICA6IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdsb29zZV9pdGVtX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2l0ZW1fZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdodG1sJzoge1xuICAgICAgdmFyIGh0bWwgPSAhdGhpcy50b2tlbi5wcmUgJiYgIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICA/IHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpXG4gICAgICAgIDogdGhpcy50b2tlbi50ZXh0O1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHRtbChodG1sKTtcbiAgICB9XG4gICAgY2FzZSAncGFyYWdyYXBoJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpKTtcbiAgICB9XG4gICAgY2FzZSAndGV4dCc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnBhcmFncmFwaCh0aGlzLnBhcnNlVGV4dCgpKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSGVscGVyc1xuICovXG5cbmZ1bmN0aW9uIGVzY2FwZShodG1sLCBlbmNvZGUpIHtcbiAgcmV0dXJuIGh0bWxcbiAgICAucmVwbGFjZSghZW5jb2RlID8gLyYoPyEjP1xcdys7KS9nIDogLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbn1cblxuZnVuY3Rpb24gdW5lc2NhcGUoaHRtbCkge1xuICByZXR1cm4gaHRtbC5yZXBsYWNlKC8mKFsjXFx3XSspOy9nLCBmdW5jdGlvbihfLCBuKSB7XG4gICAgbiA9IG4udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobiA9PT0gJ2NvbG9uJykgcmV0dXJuICc6JztcbiAgICBpZiAobi5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgICAgcmV0dXJuIG4uY2hhckF0KDEpID09PSAneCdcbiAgICAgICAgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG4uc3Vic3RyaW5nKDIpLCAxNikpXG4gICAgICAgIDogU3RyaW5nLmZyb21DaGFyQ29kZSgrbi5zdWJzdHJpbmcoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlKHJlZ2V4LCBvcHQpIHtcbiAgcmVnZXggPSByZWdleC5zb3VyY2U7XG4gIG9wdCA9IG9wdCB8fCAnJztcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlbGYobmFtZSwgdmFsKSB7XG4gICAgaWYgKCFuYW1lKSByZXR1cm4gbmV3IFJlZ0V4cChyZWdleCwgb3B0KTtcbiAgICB2YWwgPSB2YWwuc291cmNlIHx8IHZhbDtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvKF58W15cXFtdKVxcXi9nLCAnJDEnKTtcbiAgICByZWdleCA9IHJlZ2V4LnJlcGxhY2UobmFtZSwgdmFsKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5ub29wLmV4ZWMgPSBub29wO1xuXG5mdW5jdGlvbiBtZXJnZShvYmopIHtcbiAgdmFyIGkgPSAxXG4gICAgLCB0YXJnZXRcbiAgICAsIGtleTtcblxuICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHRhcmdldCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gdGFyZ2V0W2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuXG4vKipcbiAqIE1hcmtlZFxuICovXG5cbmZ1bmN0aW9uIG1hcmtlZChzcmMsIG9wdCwgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrIHx8IHR5cGVvZiBvcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdDtcbiAgICAgIG9wdCA9IG51bGw7XG4gICAgfVxuXG4gICAgb3B0ID0gbWVyZ2Uoe30sIG1hcmtlZC5kZWZhdWx0cywgb3B0IHx8IHt9KTtcblxuICAgIHZhciBoaWdobGlnaHQgPSBvcHQuaGlnaGxpZ2h0XG4gICAgICAsIHRva2Vuc1xuICAgICAgLCBwZW5kaW5nXG4gICAgICAsIGkgPSAwO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRva2VucyA9IExleGVyLmxleChzcmMsIG9wdClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgfVxuXG4gICAgcGVuZGluZyA9IHRva2Vucy5sZW5ndGg7XG5cbiAgICB2YXIgZG9uZSA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBvcHQuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG91dDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgb3V0ID0gUGFyc2VyLnBhcnNlKHRva2Vucywgb3B0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyID0gZTtcbiAgICAgIH1cblxuICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcblxuICAgICAgcmV0dXJuIGVyclxuICAgICAgICA/IGNhbGxiYWNrKGVycilcbiAgICAgICAgOiBjYWxsYmFjayhudWxsLCBvdXQpO1xuICAgIH07XG5cbiAgICBpZiAoIWhpZ2hsaWdodCB8fCBoaWdobGlnaHQubGVuZ3RoIDwgMykge1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9XG5cbiAgICBkZWxldGUgb3B0LmhpZ2hsaWdodDtcblxuICAgIGlmICghcGVuZGluZykgcmV0dXJuIGRvbmUoKTtcblxuICAgIGZvciAoOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09ICdjb2RlJykge1xuICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoaWdobGlnaHQodG9rZW4udGV4dCwgdG9rZW4ubGFuZywgZnVuY3Rpb24oZXJyLCBjb2RlKSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICBpZiAoY29kZSA9PSBudWxsIHx8IGNvZGUgPT09IHRva2VuLnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0b2tlbi50ZXh0ID0gY29kZTtcbiAgICAgICAgICB0b2tlbi5lc2NhcGVkID0gdHJ1ZTtcbiAgICAgICAgICAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKHRva2Vuc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKG9wdCkgb3B0ID0gbWVyZ2Uoe30sIG1hcmtlZC5kZWZhdWx0cywgb3B0KTtcbiAgICByZXR1cm4gUGFyc2VyLnBhcnNlKExleGVyLmxleChzcmMsIG9wdCksIG9wdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlLm1lc3NhZ2UgKz0gJ1xcblBsZWFzZSByZXBvcnQgdGhpcyB0byBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWQuJztcbiAgICBpZiAoKG9wdCB8fCBtYXJrZWQuZGVmYXVsdHMpLnNpbGVudCkge1xuICAgICAgcmV0dXJuICc8cD5BbiBlcnJvciBvY2N1cmVkOjwvcD48cHJlPidcbiAgICAgICAgKyBlc2NhcGUoZS5tZXNzYWdlICsgJycsIHRydWUpXG4gICAgICAgICsgJzwvcHJlPic7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cbn1cblxuLyoqXG4gKiBPcHRpb25zXG4gKi9cblxubWFya2VkLm9wdGlvbnMgPVxubWFya2VkLnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHQpIHtcbiAgbWVyZ2UobWFya2VkLmRlZmF1bHRzLCBvcHQpO1xuICByZXR1cm4gbWFya2VkO1xufTtcblxubWFya2VkLmRlZmF1bHRzID0ge1xuICBnZm06IHRydWUsXG4gIHRhYmxlczogdHJ1ZSxcbiAgYnJlYWtzOiBmYWxzZSxcbiAgcGVkYW50aWM6IGZhbHNlLFxuICBzYW5pdGl6ZTogZmFsc2UsXG4gIHNtYXJ0TGlzdHM6IGZhbHNlLFxuICBzaWxlbnQ6IGZhbHNlLFxuICBoaWdobGlnaHQ6IG51bGwsXG4gIGxhbmdQcmVmaXg6ICdsYW5nLScsXG4gIHNtYXJ0eXBhbnRzOiBmYWxzZSxcbiAgaGVhZGVyUHJlZml4OiAnJyxcbiAgcmVuZGVyZXI6IG5ldyBSZW5kZXJlcixcbiAgeGh0bWw6IGZhbHNlXG59O1xuXG4vKipcbiAqIEV4cG9zZVxuICovXG5cbm1hcmtlZC5QYXJzZXIgPSBQYXJzZXI7XG5tYXJrZWQucGFyc2VyID0gUGFyc2VyLnBhcnNlO1xuXG5tYXJrZWQuUmVuZGVyZXIgPSBSZW5kZXJlcjtcblxubWFya2VkLkxleGVyID0gTGV4ZXI7XG5tYXJrZWQubGV4ZXIgPSBMZXhlci5sZXg7XG5cbm1hcmtlZC5JbmxpbmVMZXhlciA9IElubGluZUxleGVyO1xubWFya2VkLmlubGluZUxleGVyID0gSW5saW5lTGV4ZXIub3V0cHV0O1xuXG5tYXJrZWQucGFyc2UgPSBtYXJrZWQ7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBtYXJrZWQ7XG59IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBtYXJrZWQ7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy5tYXJrZWQgPSBtYXJrZWQ7XG59XG5cbn0pLmNhbGwoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCk7XG59KCkpO1xuIiwidmFyIFhNTEh0dHBSZXF1ZXN0ICA9IHJlcXVpcmUoJ3hocnBvbHlmaWxsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyMiAocGFyYW1zLCBjYWxsYmFjaykge1xuICAvLyBjYWxsczogY2FsbGJhY2soZGF0YSwgcmVzcG9uc2UsIHhocik7XG4gIHZhciBhcmdzID0geyAvLyBlLmcuIHVybCA9IFwiaHR0cDovL2lwLmpzb250ZXN0LmNvbS9hPTEmYj0yJmM9M1wiXG4gICAgdXJsICAgICAgOiB0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJyA/IHBhcmFtcyA6IHBhcmFtcy51cmwsXG4gICAgbWV0aG9kICAgOiBwYXJhbXMubWV0aG9kIHx8IHBhcmFtcy5kYXRhID8gJ1BPU1QnOiAnR0VUJyxcbiAgICBib2R5ICAgICA6IHBhcmFtcy5kYXRhLCAvLyBkYXRhOiBmb3JtZGF0YSBvciB7a2V5OnZhbH1cbiAgICBoZWFkZXJzICA6IChmdW5jdGlvbigpe1xuICAgICAgdmFyIGhlYWRlciA9IHtcbiAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnIDonWE1MSHR0cFJlcXVlc3QnLFxuICAgICAgICAnQ29udGVudC1UeXBlJyAgICAgOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHBhcmFtcy5oZWFkZXJzID8gcGFyYW1zLmhlYWRlcnMgOiBwYXJhbXMuYm9keSA/IGhlYWRlciA6IHt9O1xuICAgIH0pKClcbiAgfTtcbiAgdmFyIHhociA9IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIGlmICgheGhyKSB7IHJldHVybiBudWxsIH07XG4gIHhoci5vcGVuKGFyZ3MubWV0aG9kLGFyZ3MudXJsKTtcbiAgZm9yICh2YXIgZmllbGQgaW4gYXJncy5oZWFkZXJzKSB7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIGFyZ3MuaGVhZGVyc1tmaWVsZF0pO1xuICB9XG4gIHhoci5vbmxvYWQ9ZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHZhciBoZWFkZXJKU09OID0ge30sIGggPSB4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCk7XG4gICAgaC5tYXRjaCgvKFteXFxuXFxyOl0rKTooW15cXG5cXHJdKykvZykuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgIHZhciB0bXAgPSBpdGVtLnNwbGl0KCc6ICcpO1xuICAgICAgaGVhZGVySlNPTlt0bXBbMF1dID0gdG1wWzFdO1xuICAgIH0pO1xuICAgIGNhbGxiYWNrKHRoaXMucmVzcG9uc2UsIHJlc3BvbnNlLCB4aHIsIGhlYWRlckpTT04pO1xuICB9O1xuICB4aHIuc2VuZChhcmdzLmJvZHl8fG51bGwpO1xufTtcbiIsInZhciBmYWN0b3JpZXMgPSBbXG4gIGZ1bmN0aW9uICgpIHtyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7fSwgLy8gSUUxMCssIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIFNhZmFyaVxuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwzLlhNTEhUVFBcIik7fSwgICAgIC8vIElFOVxuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFAuNi4wXCIpO30sIC8vIElFOFxuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFAuMy4wXCIpO30sIC8vIElFN1xuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFBcIik7fSwgICAgIC8vIElFNlxuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7fSwgIC8vIElFNVxuICBmdW5jdGlvbiAoKSB7cmV0dXJuIG51bGw7fVxuXTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0WEhSKCkge1xuICBmb3IgKHZhciBpPTAsIHhociwgbGVuPWZhY3Rvcmllcy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICB0cnkgICAgICAgeyB4aHIgPSBmYWN0b3JpZXNbaV0oKTsgcmV0dXJuIHhocjsgfVxuICAgIGNhdGNoIChlKSB7IGNvbnRpbnVlOyB9XG4gIH1cbn07XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9jb25maWcgICA9IHJlcXVpcmUoJ19jb25maWcnKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSBib2lsZXJwbGF0ZTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhFQ1VUSU9OXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgY29uZmlnICAgICAgPSBfY29uZmlnKCk7XG5mdW5jdGlvbiBib2lsZXJwbGF0ZSAocGFyYW1ldGVyKSB7XG4gIHZhciAkdGl0bGUgICAgICAgICAgICAgID0gY29uZmlnWyd0aXRsZSddO1xuICB2YXIgJGRlc2NyaXB0aW9uICAgICAgICA9IGNvbmZpZ1snZGVzY3JpcHRpb24nXTtcbiAgdmFyICRrZXl3b3JkcyAgICAgICAgICAgPSBjb25maWdbJ2tleXdvcmRzJ107XG4gIHZhciAkYXV0aG9yICAgICAgICAgICAgID0gY29uZmlnWydhdXRob3InXTtcbiAgdmFyICR3ZWJzaXRlICAgICAgICAgICAgPSBjb25maWdbJ3dlYnNpdGUnXTtcbiAgdmFyICRzdHlsZSAgICAgICAgICAgICAgPSBjb25maWdbJ3N0eWxlJ107XG5cbiAgdmFyICRsb2dvVVJMICAgICAgICAgICAgPSB1bmRlZmluZWQ7XG4gIHZhciAkZ29vZ2xlQW5hbHl0aWNzICAgID0gdW5kZWZpbmVkO1xuXG4gIGlmIChwYXJhbWV0ZXIpIHtcbiAgICAkdGl0bGUgICAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIudGl0bGUgICAgICAgfHwgJHRpdGxlO1xuICAgICRkZXNjcmlwdGlvbiAgICAgICAgICA9IHBhcmFtZXRlci5kZXNjcmlwdGlvbiB8fCAkZGVzY3JpcHRpb247XG4gICAgJGtleXdvcmRzICAgICAgICAgICAgID0gcGFyYW1ldGVyLmtleXdvcmRzICAgIHx8ICRrZXl3b3JkcztcbiAgICAkYXV0aG9yICAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIuYXV0aG9yICAgICAgfHwgJGF1dGhvcjtcbiAgICAkd2Vic2l0ZSAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIud2Vic2l0ZSAgICAgfHwgJHdlYnNpdGU7XG4gICAgJHN0eWxlICAgICAgICAgICAgICAgID0gcGFyYW1ldGVyLnN0eWxlICAgICAgIHx8ICRzdHlsZTtcblxuICAgICRsb2dvVVJMICAgICAgICAgICAgICA9IHBhcmFtZXRlci5sb2dvVVJMICAgICB8fCAkbG9nb1VSTDtcbiAgICAkZ29vZ2xlQW5hbHl0aWNzICAgICAgPSBwYXJhbWV0ZXIuZ2EgICAgICAgICAgfHwgJGdvb2dsZUFuYWx5dGljcztcbiAgfVxuXG4gIHZhciB0aXRsZSAgICAgICAgICAgICAgID0gWyc8dGl0bGU+JyskdGl0bGUrJzwvdGl0bGU+J107XG4gIHZhciBtZXRhICAgICAgICAgICAgICAgID0gW1xuICAgICc8bWV0YSBjaGFyc2V0PVwidXRmLThcIj4nLFxuICAgICc8bWV0YSBuYW1lPVwiZm9ybWF0LWRldGVjdGlvblwiIGNvbnRlbnQ9XCJ0ZWxlcGhvbmU9bm9cIiAvPicsXG4gICAgJzxtZXRhIG5hbWU9XCJtc2FwcGxpY2F0aW9uLXRhcC1oaWdobGlnaHRcIiBjb250ZW50PVwibm9cIiAvPicsXG4gICAgJzxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCInKyRkZXNjcmlwdGlvbisnXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cImtleXdvcmRzXCIgY29udGVudD1cIicrJGtleXdvcmRzKydcIj4nLFxuICAgICc8bWV0YSBuYW1lPVwiYXV0aG9yXCIgY29udGVudD1cIicrJGF1dGhvcisnXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZSA9IDEuMCwgdXNlci1zY2FsYWJsZT1ub1wiPidcbiAgXTtcbiAgdmFyIG9nICAgICAgICAgICAgICAgICAgPSBbXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6dGl0bGVcIiBjb250ZW50PVwiJyskdGl0bGUrJ1wiIC8+JyxcbiAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzpzaXRlX25hbWVcIiBjb250ZW50PVwiJyskdGl0bGUrJ1wiIC8+JyxcbiAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzp1cmxcIiBjb250ZW50PVwiJyskd2Vic2l0ZSsnXCIgLz4nLFxuICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOmRlc2NyaXB0aW9uXCIgY29udGVudD1cIicrJGRlc2NyaXB0aW9uKydcIiAvPicsXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiJyskbG9nb1VSTCsnXCIgLz4nLFxuICBdO1xuICB2YXIgaWNvbiAgICAgICAgICAgICAgICA9IFsgLy8gY2hlY2sgaXRlbSBnZW5lcmF0b3JcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiNTd4NTdcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tNTd4NTcucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiNjB4NjBcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tNjB4NjAucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiNzJ4NzJcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tNzJ4NzIucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiNzZ4NzZcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tNzZ4NzYucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiMTE0eDExNFwiIGhyZWY9XCJsb2dvL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi0xMTR4MTE0LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjEyMHgxMjBcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tMTIweDEyMC5wbmdcIj4nLFxuICAgICc8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgc2l6ZXM9XCIxNDR4MTQ0XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTE0NHgxNDQucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9wbmdcIiBocmVmPVwibG9nby9mYXZpY29uL2Zhdmljb24tMzJ4MzIucG5nXCIgc2l6ZXM9XCIzMngzMlwiPicsXG4gICAgJzxsaW5rIHJlbD1cImljb25cIiB0eXBlPVwiaW1hZ2UvcG5nXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9mYXZpY29uLTk2eDk2LnBuZ1wiIHNpemVzPVwiOTZ4OTZcIj4nLFxuICAgICc8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCJsb2dvL2Zhdmljb24vZmF2aWNvbi0xNngxNi5wbmdcIiBzaXplcz1cIjE2eDE2XCI+JyxcbiAgICAnPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwibG9nby9mYXZpY29uL21hbmlmZXN0Lmpzb25cIj4nLFxuICAgICc8bWV0YSBuYW1lPVwibXNhcHBsaWNhdGlvbi1UaWxlQ29sb3JcIiBjb250ZW50PVwiI2I5MWQ0N1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJtc2FwcGxpY2F0aW9uLVRpbGVJbWFnZVwiIGNvbnRlbnQ9XCJsb2dvL2Zhdmljb24vbXN0aWxlLTE0NHgxNDQucG5nXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiNmZmZmZmZcIj4nLFxuICAgICc8bGluayByZWw9XCJzaG9ydGN1dCBpY29uXCIgdHlwZT1cImltYWdlL3gtaWNvblwiIGhyZWY9XCJTT1VSQ0UvZmF2aWNvbi5pY29cIj4nLFxuICAgICc8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCJTT1VSQ0UvcmVpbnZlbnRpbmdlbmdhZ2VtZW50LnBuZ1wiPidcbiAgXTtcbiAgdmFyIHN0eWxlICAgICAgICAgICAgICAgPSBbXG4gICAgJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiJyArICRzdHlsZSArICdcIiAvPidcbiAgXTtcbiAgdmFyIGdvb2dsZSAgICAgICAgICAgICAgPSAkZ29vZ2xlQW5hbHl0aWNzID8gW1xuICAgIFwiPHNjcmlwdD5cIixcbiAgICAgIFwiKGZ1bmN0aW9uKGkscyxvLGcscixhLG0pe2lbJ0dvb2dsZUFuYWx5dGljc09iamVjdCddPXI7aVtyXT1pW3JdfHxmdW5jdGlvbigpe1wiLFxuICAgICAgXCIoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcIixcbiAgICAgIFwibT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKVwiLFxuICAgICAgXCJ9KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XCIsXG4gICAgICBcImdhKCdjcmVhdGUnLCAnXCIgKyAkZ29vZ2xlQW5hbHl0aWNzICsgXCInLCAnYXV0bycpO1wiLFxuICAgICAgXCJnYSgnc2VuZCcsICdwYWdldmlldycpO1wiLFxuICAgIFwiPC9zY3JpcHQ+XCJdXG4gICAgOltdO1xuXG5cbiAgdmFyIGhlYWQgICAgPSB0aXRsZS5jb25jYXQobWV0YSkuY29uY2F0KG9nKS8qLmNvbmNhdChpY29uKSovLmNvbmNhdChzdHlsZSk7XG4gIHZhciBib2R5ICAgID0gZ29vZ2xlLyouY29uY2F0KC4uLikqLztcblxuICB2YXIgaHRtbFRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcbiAgdmFyIGhlYWRUYWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XG4gIHZhciBib2R5VGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIGh0bWxUYWcuc2V0QXR0cmlidXRlKCdsYW5nJywnZW4nKTtcbiAgaGVhZFRhZy5pbm5lckhUTUwgPSBoZWFkLmpvaW4oJycpO1xuXG4gIHZhciB0bXAsIHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGVtcC5pbm5lckhUTUwgPSBib2R5LmpvaW4oJycpO1xuICB3aGlsZSAodG1wID0gdGVtcC5jaGlsZE5vZGVzWzBdKSB7IGJvZHlUYWcuYXBwZW5kQ2hpbGQodG1wKTsgfVxuXG4gIHJldHVybiBib2R5VGFnO1xufTtcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgcGtnICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9wYWNrYWdlLmpzb24nKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSBjb25maWc7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYRUNVVElPTlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9jb25maWcgICAgID0ge1xuICB0aXRsZSAgICAgICA6ICcnLFxuICBkZXNjcmlwdGlvbiA6IHBrZy5kZXNjcmlwdGlvbixcbiAgdmVyc2lvbiAgICAgOiBwa2cudmVyc2lvbixcbiAga2V5d29yZHMgICAgOiBwa2cua2V5d29yZHMuam9pbignLCAnKSxcbiAgYXV0aG9yICAgICAgOiBwa2cuYXV0aG9yLm5hbWUsXG4gIHdlYnNpdGUgICAgIDogJ2h0dHA6Ly9ucG1qcy5vcmcvd2VicGFnZScsXG4gIHN0eWxlICAgICAgIDogJ0JVTkRMRS9idW5kbGUuY3NzJ1xufTtcbmZ1bmN0aW9uIGNvbmZpZyAoa2V5KSB7XG4gIHJldHVybiBrZXkgPyBfY29uZmlnW2tleV0gOiBfY29uZmlnO1xufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJ3ZWJwYWdlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMy4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJXZWJwYWdlIEJvaWxlcnBsYXRlIENvbXBvbmVudFwiLFxuICBcIm1haW5cIjogXCJTT1VSQ0UvaW5kZXguanNcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInRlc3RcIjogXCJlY2hvIFxcXCJFcnJvcjogbm8gdGVzdCBzcGVjaWZpZWRcXFwiICYmIGV4aXQgMVwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiYm9pbGVycGxhdGVcIixcbiAgICBcIndlYnBhZ2VcIixcbiAgICBcImNvbXBvbmVudFwiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJzZXJhcGF0aFwiLFxuICAgIFwiZW1haWxcIjogXCJkZXZAc2VyYXBhdGguZGVcIixcbiAgICBcInVybFwiOiBcImh0dHA6Ly93d3cuZ2l0aHViLmNvbS9zZXJhcGF0aFwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInJlYWRtZVwiOiBcIiMgd2VicGFnZVxcbldlYnBhZ2UgQm9pbGVycGxhdGUgQ29tcG9uZW50XFxuXFxuYGBganNcXG52YXIgd2VicGFnZSA9IHJlcXVpcmUoJ3dlYnBhZ2UnKTtcXG52YXIgYm9keSAgICA9IHdlYnBhZ2Uoe1xcbiAgLy8gT1BUSU9OQUxcXG4gIC8vIC4uLiBhbmQgbW9yZSBpbiB0aGUgZnV0dXJlIChlLmcuIGljb24sIG9nLCAuLi4pXFxuICB0aXRsZSAgICAgICA6ICdGb29iYXInLFxcbiAgZGVzY3JpcHRpb24gOiAnZm9vIGJhciBiYXonLFxcbiAga2V5d29yZHMgICAgOiAnZm9vLCBiYXIsIGJheicsXFxuICBhdXRob3IgICAgICA6ICdxdXV4IGJheicsXFxuICB3ZWJzaXRlICAgICA6ICdodHRwOi8vZm9vLmJhci5iYXonXFxufSk7XFxuXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJnaXRIZWFkXCI6IFwiMjgzOWM1NmE5NWJkNDQ3Yjc4ZGU1MDNiMTVkNjE5MTg1NzUwZTdjNFwiLFxuICBcIl9pZFwiOiBcIndlYnBhZ2VAMC4zLjBcIixcbiAgXCJfc2hhc3VtXCI6IFwiMTVjOGM5OWU4MjJiNDk5ZTk5ODFhZTY4NzY1MzliNDIzNDQ4YjhlN1wiLFxuICBcIl9mcm9tXCI6IFwid2VicGFnZUA+PTAuMy4wIDwwLjQuMFwiXG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcIndpemFyZGFtaWdvc2luc3RpdHV0ZVwiLFxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJkZXNjcmlwdGlvblwiOiBcIldpemFyZCBBbWlnb3MgSW5zdGl0dXRlIFdlYnNpdGVcIixcbiAgXCJtYWluXCI6IFwiU09VUkNFL2luZGV4LmpzXCIsXG4gIFwic3R5bGVcIjogXCJTT1VSQ0UvaW5kZXguY3NzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImZhc3Rkb21cIjogXCJeMC44LjZcIixcbiAgICBcImhvbG9uLW1hcmtkb3duYm94XCI6IFwiXjAuMS4wXCIsXG4gICAgXCJqc29uLW1hdHRlclwiOiBcIl4xLjAuMlwiLFxuICAgIFwianNvbi1tZXRhLW1hcmtlZFwiOiBcIl4xLjEuMlwiLFxuICAgIFwibWFya2VkXCI6IFwiXjAuMy4zXCIsXG4gICAgXCJtaW5peGhyXCI6IFwiXjEuMi4xXCIsXG4gICAgXCJyZXNyY2lmeVwiOiBcIl4xLjEuM1wiLFxuICAgIFwid2VicGFnZVwiOiBcIl4wLjMuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImF0b21pZnlcIjogXCJeNy4xLjBcIixcbiAgICBcImJhYmVsaWZ5XCI6IFwiXjYuMC4yXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInN0YXJ0XCI6IFwiYXRvbWlmeVwiLFxuICAgIFwidGVzdFwiOiBcImVjaG8gXFxcIkVycm9yOiBubyB0ZXN0IHNwZWNpZmllZFxcXCIgJiYgZXhpdCAxICN0ZXN0ZW0gc3RhcnQgLS1zaW5nbGVSdW5cIixcbiAgICBcIi0tLVwiOiBcIiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIsXG4gICAgXCJidWlsZDpzY3JpcHRzXCI6IFwiI2Jyb3dzZXJpZnkgLWQgYXNzZXRzL3NjcmlwdHMvbWFpbi5qcyAtcCBbbWluaWZ5aWZ5IC0tY29tcHJlc3NQYXRoIC4gLS1tYXAgbWFpbi5qcy5tYXAgLS1vdXRwdXQgZGlzdC9tYWluLmpzLm1hcF0gfCBoYXNobWFyayAtbiBkaXN0L21haW4uanMgLXMgLWwgOCAtbSBhc3NldHMuanNvbiAnZGlzdC97bmFtZX17aGFzaH17ZXh0fSdcIixcbiAgICBcImpzY3NcIjogXCIjanNjcyBlc2hpbnQgZXNsaW50Li4uXCIsXG4gICAgXCJ1Z2xpZnlcIjogXCIjdWdsaWZ5XCIsXG4gICAgXCJwbmdcIjogXCIjb3B0aW1nXCIsXG4gICAgXCJqcGdcIjogXCIjanBnb1wiLFxuICAgIFwiY3NzbVwiOiBcIiN5Y3NzbWluICoqLmNzcyAjY3NzbWluXCIsXG4gICAgXCJjc3N2XCI6IFwiI2Nzcy12YWxpZGF0b3IgKiouY3NzXCIsXG4gICAgXCJjc3NwXCI6IFwiI2Nzcy1wcmV0dGlmaWVyICoqLmNzc1wiLFxuICAgIFwiaHRtbFwiOiBcIiNodG1sNS1saW50ICoqLmh0bWxcIixcbiAgICBcImJ1aWxkVlwiOiBcIiNybSAtcmYgUkVMRUFTRSAmJiBta2RpciBSRUxFQVNFICYmIG5vZGUgbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvYmluL2NtZC5qcyBTT1VSQ0UvaW5kZXguanMgLWQgLW8gUkVMRUFTRS9pbmRleC52JChjYXQgcGFja2FnZS5qc29uIHwgZ3JlcCB2ZXJzaW9uIHwgZ3JlcCAtUG8gJyg/PD12ZXJzaW9uXFxcIjogXFxcIikuKig/PVxcXCIpJykuYnVuZGxlLmpzXCIsXG4gICAgXCJ3YXRjaFZcIjogXCIjcm0gLXJmIFJFTEVBU0UgJiYgbWtkaXIgUkVMRUFTRSAmJiBub2RlIG5vZGVfbW9kdWxlcy93YXRjaGlmeS9iaW4vY21kLmpzIFNPVVJDRS9pbmRleC5qcyAtbyBSRUxFQVNFL2luZGV4LnYkKGNhdCBwYWNrYWdlLmpzb24gfCBncmVwIHZlcnNpb24gfCBncmVwIC1QbyAnKD88PXZlcnNpb25cXFwiOiBcXFwiKS4qKD89XFxcIiknKS5idW5kbGUuanNcIixcbiAgICBcIm9wZW46cHJvZFwiOiBcIiNvcGVuZXIgaHR0cDovL2V4YW1wbGUuY29tXCIsXG4gICAgXCJvcGVuOnN0YWdlXCI6IFwiI29wZW5lciBodHRwOi8vc3RhZ2luZy5leGFtcGxlLmludGVybmFsXCIsXG4gICAgXCJvcGVuOmRldlwiOiBcIiNvcGVuZXIgaHR0cDovL2xvY2FsaG9zdDo5MDkwXCIsXG4gICAgXCJkZXBsb3k6cHJvZFwiOiBcIiNzMy1jbGkgc3luYyAuL2Rpc3QvIHMzOi8vZXhhbXBsZS1jb20vcHJvZC1zaXRlL1wiLFxuICAgIFwiZGVwbG95OnN0YWdlXCI6IFwiI3MzLWNsaSBzeW5jIC4vZGlzdC8gczM6Ly9leGFtcGxlLWNvbS9zdGFnZS1zaXRlL1wiXG4gIH0sXG4gIFwiYXRvbWlmeVwiOiB7XG4gICAgXCJzZXJ2ZXJcIjoge1xuICAgICAgXCJvcGVuXCI6IHRydWUsXG4gICAgICBcInBhdGhcIjogXCJpbmRleC5odG1sXCIsXG4gICAgICBcImxyXCI6IHtcbiAgICAgICAgXCJ2ZXJib3NlXCI6IHRydWUsXG4gICAgICAgIFwicXVpZXRcIjogZmFsc2UsXG4gICAgICAgIFwicG9ydFwiOiAzMTMzNyxcbiAgICAgICAgXCJzeW5jXCI6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIFwianNcIjoge1xuICAgICAgXCJlbnRyeVwiOiBcIlNPVVJDRS9pbmRleC5qc1wiLFxuICAgICAgXCJhbGlhc1wiOiBcIkJVTkRMRS9idW5kbGUuanNcIixcbiAgICAgIFwib3V0cHV0XCI6IFwiQlVORExFL2J1bmRsZS5qc1wiLFxuICAgICAgXCJkZWJ1Z1wiOiB0cnVlLFxuICAgICAgXCJ3YXRjaFwiOiB0cnVlLFxuICAgICAgXCJ0cmFuc2Zvcm1cIjogW1xuICAgICAgICBcImJhYmVsaWZ5XCJcbiAgICAgIF0sXG4gICAgICBcInN0YW5kYWxvbmVcIjogXCJBUElcIlxuICAgIH0sXG4gICAgXCJjc3NcIjoge1xuICAgICAgXCJlbnRyeVwiOiBcIlNPVVJDRS9pbmRleC5jc3NcIixcbiAgICAgIFwiYWxpYXNcIjogXCJCVU5ETEUvYnVuZGxlLmNzc1wiLFxuICAgICAgXCJvdXRwdXRcIjogXCJCVU5ETEUvYnVuZGxlLmNzc1wiLFxuICAgICAgXCJkZWJ1Z1wiOiB0cnVlLFxuICAgICAgXCJ3YXRjaFwiOiB0cnVlLFxuICAgICAgXCJhdXRvcHJlZml4ZXJcIjoge1xuICAgICAgICBcImJyb3dzZXJzXCI6IFtcbiAgICAgICAgICBcIj4gMSVcIixcbiAgICAgICAgICBcIklFIDdcIlxuICAgICAgICBdLFxuICAgICAgICBcImNhc2NhZGVcIjogZmFsc2VcbiAgICAgIH0sXG4gICAgICBcImNvbXByZXNzXCI6IGZhbHNlLFxuICAgICAgXCJwbHVnaW5cIjogW11cbiAgICB9LFxuICAgIFwiYXNzZXRzXCI6IHtcbiAgICAgIFwiZGVzdFwiOiBcIkJVTkRMRS9hc3NldHMvXCIsXG4gICAgICBcInByZWZpeFwiOiBcIi9CVU5ETEUvYXNzZXRzL1wiLFxuICAgICAgXCJyZXRhaW5OYW1lXCI6IGZhbHNlXG4gICAgfVxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3dpemFyZGFtaWdvc2luc3RpdHV0ZS93aXphcmRhbWlnb3NpbnN0aXR1dGUuZ2l0aHViLmlvLmdpdFwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwidGVhY2hpbmdcIixcbiAgICBcInRlYWNoZXJcIixcbiAgICBcImxlYXJuaW5nXCIsXG4gICAgXCJqYXZhc2NyaXB0XCIsXG4gICAgXCJiZXJsaW5cIixcbiAgICBcImxlYXJuZXJcIixcbiAgICBcInByb2dyYW1taW5nXCIsXG4gICAgXCJzY2hvb2xcIixcbiAgICBcInVuaXZlcnNpdHlcIixcbiAgICBcImFjYWRlbXlcIixcbiAgICBcImluc3RpdHV0ZVwiLFxuICAgIFwid2l6YXJkXCIsXG4gICAgXCJhbWlnb3NcIixcbiAgICBcIm5vZGVcIixcbiAgICBcIm5vZGVqc1wiLFxuICAgIFwiaHRtbFwiLFxuICAgIFwiY3NzXCJcbiAgXSxcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcInNlcmFwYXRoXCIsXG4gICAgXCJlbWFpbFwiOiBcImRldkBzZXJhcGF0aC5kZVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cDovL3d3dy5naXRodWIuY29tL3NlcmFwYXRoXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiR05VIEFHUExcIixcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS93aXphcmRhbWlnb3NpbnN0aXR1dGUvd2l6YXJkYW1pZ29zaW5zdGl0dXRlLmdpdGh1Yi5pby9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cDovL3dpemFyZC5hbWlnb3MuaW5zdGl0dXRlXCJcbn1cbiJdfQ==
