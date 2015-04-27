!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.API=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
'use strict';

var webpage = require('webpage');
var fastdom = require('fastdom');
// var minixhr = require('minixhr');
// function wizard (parameter) { }
// try {
//   minixhr({ url: 'params.json' }, function (error, data) {
//     debugger;
//     alert(error);
//     alert(data);
//   });
// } catch (CORSerror) {
//   alert(CORSerror);
// }
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
// no cli tool
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
var config = require('_config')();
var template = require('./index.template.html');
var __ = document.createElement('div');
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports = wizardamigosinstitute(webpage(config), config);
/******************************************************************************
  EXECUTION
******************************************************************************/
function wizardamigosinstitute(dom, data) {
  // 'data' maybe also to use for event delegation pattern
  var COMPONENT = (__.innerHTML = template, __.childNodes[0]);
  var __logo = COMPONENT.querySelectorAll('.wizardamigos__logo')[0];
  var __menu = COMPONENT.querySelectorAll('.wizardamigos__menu')[0];
  var __a = '';
  /******** WIRE UP ********/
  // __Heart.addEventListener('click', function onclick (event) {
  //   eventstop(event);
  //   alert('#sign up');
  //   router('index.html#signup');
  // });
  /****** INITIALIZE *******/
  fastdom.write(function INIT() {
    dom.appendChild(COMPONENT);
  });
  /******** RETURN *********/
  var API = {}; // should be an event emitter too
  return API;
}

},{"./index.template.html":2,"_config":3,"fastdom":4,"webpage":5}],2:[function(require,module,exports){
module.exports = '<div class="wizardamigos">\n  <img class="wizardamigos__logo" src="/BUNDLE/assets/061915d010311d6e.svg">\n  <div class="wizardamigos__menu"></div>\n  <div class="wizardamigos__intro">\n    <h1 class="wizardamigos__title">Welcome, wizard amigos.</h1>\n    <p class="wizardamigos__subtitle">Come, learn to code with us.</p>\n    <p>\n      Wizard Amigos Institute is a co-learning programming class. It is an open,\n      friendly and collaborative space for girls and boys to learn how to code.\n    </p>\n  </div>\n  <div class="wizardamigos__scrolls">\n  <!-- @TODO: convert text content layout to markdown -->\n    <h1 class="wizardamigos__title">Magic Spells</h1>\n    <p>\n      We cover the main elements that every wizard apprentice needs to know:\n    </p>\n    <ul>\n      <li>Operating System\n        <ul><li class="wizardamigos__bullets">unix & bash</li></ul>\n      </li>\n      <li>Markup Languages\n        <ul><li class="wizardamigos__bullets">markdown, html & css</li></ul>\n      </li>\n      <li>Tools\n        <ul><li class="wizardamigos__bullets">chrome dev tools & atom.io</li></ul>\n      </li>\n      <li>Collaboration\n        <ul><li class="wizardamigos__bullets">github, gitter, waffle & co.</li></ul>\n      </li>\n      <li>Programming\n        <ul><li class="wizardamigos__bullets">javascript, nodejs & regex</li></ul>\n      </li>\n      <li>DevOps\n        <ul><li class="wizardamigos__bullets">npm, git & browserify</li></ul>\n      </li>\n    </ul>\n    <p>\n      Magic is serious business.\n      There will be homeworks,\n      so the learners will be able to practice their spells.\n      To help them, we will produce a simple video summary after each session.\n    </p>\n    <p>\n      We also encourage all the participants to have some project they want to work on\n      <i>(but if they don\'t, no worries, will help them find one).</i>\n    </p>\n  </div>\n  <div class="wizardamigos__schedule">\n  <!-- @TODO: convert text content layout to markdown -->\n    <h1 class="wizardamigos__title">Classes of Magic</h1>\n    <p>\n      Wizard Amigos Institute will open its doors in <b>May 2015</b>.\n      Every class will accept <b>up to 10 learners</b>\n      and will be run by at least 2 higher-level wizards.\n    </p>\n    <p>\n      <br>\n      <span style="color:#fff; font-weight:900">Class of Magic</span><br>\n      Mondays or Thursdays (16:00 - 17:30)<br>\n      120 EUR / month<br>\n      <a target="_blank" href="https://www.google.de/maps/dir//co.up,+Adalbertstra%C3%9Fe+8,+10999+Berlin,+Deutschland/@52.50033,13.419786,17z/data=!4m12!1m3!3m2!1s0x47a84e337e23d413:0x2cfd69e5a9f68f1a!2sco.up!4m7!1m0!1m5!1m1!1s0x47a84e337e23d413:0x2cfd69e5a9f68f1a!2m2!1d13.419786!2d52.50033">Co_up (Adalbertstrasse 8)</a>\n      <a class="wizardamigos__apply" href=\'mailto:wizard@amigos.institute?Subject=Application:%20Mondays%20or%20Thursdays%20(16:00%20-%2017.30)&Body=%0D%0A\'>Apply</a><br>\n    </p>\n    <p>\n      <br>\n      <span style="color:#fff; font-weight:900">Class of Magic</span><br>\n      Mondays or Thursdays (16:00 - 19:00)<br>\n      240 EUR / month<br>\n      <a target="_blank" href="https://www.google.de/maps/dir//co.up,+Adalbertstra%C3%9Fe+8,+10999+Berlin,+Deutschland/@52.50033,13.419786,17z/data=!4m12!1m3!3m2!1s0x47a84e337e23d413:0x2cfd69e5a9f68f1a!2sco.up!4m7!1m0!1m5!1m1!1s0x47a84e337e23d413:0x2cfd69e5a9f68f1a!2m2!1d13.419786!2d52.50033">Co_up (Adalbertstrasse 8)</a>\n      <a target="_blank" class="wizardamigos__apply" href=\'mailto:wizard@amigos.institute?Subject=Application:%20Mondays%20or%20Thursdays%20(16:00%20-%2019.00)&Body=%0D%0A\'>Apply</a><br>\n    </p>\n    <p>\n      <br>\n      From each paid class we will donate a certain amount to support the pay-what-you-can program.\n      Those who apply for the pay-what-you-can-program, will be added to\n      the queue and informed when the next free slot is available.\n      We are also open for <a target="_blank" href=\'mailto:wizard@amigos.institute?Subject=I%20would%20like%20to%20donate&Body=%0D%0A\'>donations</a>.\n    </p>\n  </div>\n  <div class="wizardamigos__requirements">\n  <!-- @TODO: convert text content layout to markdown -->\n    <h1 class="wizardamigos__title">Unlocking Charm</h1>\n\n    <span style="color:#fff; font-weight:900">There are some requirements for Classes of Magic:</span>\n    <p>You need to have your own computer. It doesn\'t have to be super powerful, but you need one.</p>\n    <p>It needs to run on Mac OSX or Linux. If you have Windows, we will help you install Linux.</p>\n    <p>\n      Most of the modern programming materials, tutorials and other online resources are written in english,\n      so you should understand the basics. Mentors speak german and english, so they can help you out.\n    </p>\n  </div>\n  <div class="wizardamigos__about">\n  <!-- @TODO: convert text content layout to markdown -->\n    <h1 class="wizardamigos__title">Who is Wizard Amigos Institute for</h1>\n    <p>\n      It is for girls and boys who want to learn special magic programming wizardry.\n    </p>\n    <p>\n      This is not a typical school. It is a Wizard Institute that promotes\n      collaboration and a learning-by-doing approach. We will help you get to know the\n      right magic spells and prepare you to become an active problem solver.\n    </p>\n    <p>\n      If you are not sure whether you should apply,\n      <a target="_blank" href="mailto:wizard@amigos.institute">contact us</a>\n      and we will happy to talk to you.\n    </p>\n  </div>\n  <div class="wizardamigos__join">\n  <!-- @TODO: convert text content layout to markdown -->\n    <h1 class="wizardamigos__title">Mad Science</h1>\n    <p><b>Want to join us?</b></p>\n    Do you happen to be a Wizard yourself and would like to help as a teacher or speaker?\n    <p>Join our <a target="_blank" href="http://meetup.com/codingamigos">Coding Amigos Meetup</a></p>\n    <p>or chat with us on <a target="_blank" href="https://gitter.im/wizardamigosinstitute/chat">Gitter</a>.</p>\n  </div>\n</div>\n';
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
  style       : pkg.atomify.css.output
};
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports  = config;
/******************************************************************************
  EXECUTION
******************************************************************************/
function config (key) {
  return key ? _config[key] : _config;
}

},{"../../package.json":8}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

  if (parameter) {
    $title                = parameter.title       || $title;
    $description          = parameter.description || $description;
    $keywords             = parameter.keywords    || $keywords;
    $author               = parameter.author      || $author;
    $website              = parameter.website     || $website;
    $style                = parameter.style       || $style;
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
    '<meta property="og:image" content="pic/issuing_an_asset.gif" />',
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
  var head = title.concat(meta)/*.concat(og).concat(icon)*/.concat(style);

  var htmlTag = document.querySelector('html');
  var headTag = document.querySelector('head');
  htmlTag.setAttribute('lang','en');
  headTag.innerHTML = head.join('');

  return document.querySelector('body');
};

},{"_config":6}],6:[function(require,module,exports){
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

},{"../../package.json":7}],7:[function(require,module,exports){
module.exports={
  "name": "webpage",
  "version": "0.2.0",
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
  "gitHead": "8e652f2ced941556e3b62318f3d5d9599070ba8d",
  "_id": "webpage@0.2.0",
  "_shasum": "b122c3e796d74e16ec1bc1e5c1cf4784df0ec15a",
  "_from": "webpage@0.2.0"
}

},{}],8:[function(require,module,exports){
module.exports={
  "name": "wizardamigosinstitute",
  "version": "1.0.0",
  "private": true,
  "description": "Wizard Amigos Institute Website",
  "main": "SOURCE/index.js",
  "style": "SOURCE/index.css",
  "dependencies": {
    "fastdom": "^0.8.6",
    "minixhr": "^1.1.0",
    "resrcify": "^1.1.3",
    "webpage": "^0.2.0"
  },
  "devDependencies": {
    "atomify": "^7.1.0",
    "babelify": "^6.0.2"
  },
  "scripts": {
    "atomify": "atomify",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9hdG9taWZ5L25vZGVfbW9kdWxlcy9hdG9taWZ5LWpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zZXJhcGF0aC93b3Jrc3BhY2Uvc2VyYXNlZWQvSE9MRElORy93aXphcmQuYW1pZ29zLmluc3RpdHV0ZS93aXphcmRhbWlnb3NpbnN0aXR1dGUuZ2l0aHViLmlvL1NPVVJDRS9pbmRleC5qcyIsIlNPVVJDRS9pbmRleC50ZW1wbGF0ZS5odG1sIiwiU09VUkNFL25vZGVfbW9kdWxlcy9fY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL2Zhc3Rkb20vaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0Uvbm9kZV9tb2R1bGVzL19jb25maWcuanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9wYWNrYWdlLmpzb24iLCJwYWNrYWdlLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNHQSxZQUFZLENBQUM7O0FBQWIsSUFBTSxPQUFPLEdBQUssT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLElBQU0sT0FBTyxHQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CckMsSUFBTSxNQUFNLEdBQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDdkMsSUFBTSxRQUFRLEdBQUksT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDbkQsSUFBSSxFQUFFLEdBQVksUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OztBQUloRCxNQUFNLENBQUMsT0FBTyxHQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7OztBQUlqRSxTQUFTLHFCQUFxQixDQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBQ3pDLE1BQU0sU0FBUyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRTtBQUMzRCxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLEdBQUcsR0FBRSxFQUFFLENBQUM7Ozs7Ozs7O0FBUWQsU0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksR0FBSTtBQUM3QixPQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzVCLENBQUMsQ0FBQzs7QUFFSCxNQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixTQUFPLEdBQUcsQ0FBQztDQUNaOzs7QUNuREQ7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTID0gQ1VTVE9NIFNESyBbQ3VzdG9tIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdF1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IHdlYnBhZ2UgICA9IHJlcXVpcmUoJ3dlYnBhZ2UnKTtcbmNvbnN0IGZhc3Rkb20gICA9IHJlcXVpcmUoJ2Zhc3Rkb20nKTtcbi8vIHZhciBtaW5peGhyID0gcmVxdWlyZSgnbWluaXhocicpO1xuICAvLyBmdW5jdGlvbiB3aXphcmQgKHBhcmFtZXRlcikgeyB9XG4gIC8vIHRyeSB7XG4gIC8vICAgbWluaXhocih7IHVybDogJ3BhcmFtcy5qc29uJyB9LCBmdW5jdGlvbiAoZXJyb3IsIGRhdGEpIHtcbiAgLy8gICAgIGRlYnVnZ2VyO1xuICAvLyAgICAgYWxlcnQoZXJyb3IpO1xuICAvLyAgICAgYWxlcnQoZGF0YSk7XG4gIC8vICAgfSk7XG4gIC8vIH0gY2F0Y2ggKENPUlNlcnJvcikge1xuICAvLyAgIGFsZXJ0KENPUlNlcnJvcik7XG4gIC8vIH1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgTU9EVUxFIElOVEVSTkFMUyAmIEhFTFBFUlNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IGNvbmZpZyAgICA9IHJlcXVpcmUoJ19jb25maWcnKSgpO1xuY29uc3QgdGVtcGxhdGUgID0gcmVxdWlyZSgnLi9pbmRleC50ZW1wbGF0ZS5odG1sJyk7XG5sZXQgX18gICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSB3aXphcmRhbWlnb3NpbnN0aXR1dGUod2VicGFnZShjb25maWcpLCBjb25maWcpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWEVDVVRJT05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIHdpemFyZGFtaWdvc2luc3RpdHV0ZSAoZG9tLCBkYXRhKSB7IC8vICdkYXRhJyBtYXliZSBhbHNvIHRvIHVzZSBmb3IgZXZlbnQgZGVsZWdhdGlvbiBwYXR0ZXJuXG4gIGNvbnN0IENPTVBPTkVOVCA9IChfXy5pbm5lckhUTUw9dGVtcGxhdGUsX18uY2hpbGROb2Rlc1swXSk7XG4gIGNvbnN0IF9fbG9nbyAgICA9IENPTVBPTkVOVC5xdWVyeVNlbGVjdG9yQWxsKCcud2l6YXJkYW1pZ29zX19sb2dvJylbMF07XG4gIGNvbnN0IF9fbWVudSAgICA9IENPTVBPTkVOVC5xdWVyeVNlbGVjdG9yQWxsKCcud2l6YXJkYW1pZ29zX19tZW51JylbMF07XG4gIGNvbnN0IF9fYSA9Jyc7XG4gIC8qKioqKioqKiBXSVJFIFVQICoqKioqKioqL1xuICAgICAgLy8gX19IZWFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIG9uY2xpY2sgKGV2ZW50KSB7XG4gICAgICAvLyAgIGV2ZW50c3RvcChldmVudCk7XG4gICAgICAvLyAgIGFsZXJ0KCcjc2lnbiB1cCcpO1xuICAgICAgLy8gICByb3V0ZXIoJ2luZGV4Lmh0bWwjc2lnbnVwJyk7XG4gICAgICAvLyB9KTtcbiAgLyoqKioqKiBJTklUSUFMSVpFICoqKioqKiovXG4gIGZhc3Rkb20ud3JpdGUoZnVuY3Rpb24gSU5JVCAoKSB7XG4gICAgZG9tLmFwcGVuZENoaWxkKENPTVBPTkVOVCk7XG4gIH0pO1xuICAvKioqKioqKiogUkVUVVJOICoqKioqKioqKi9cbiAgdmFyIEFQSSA9IHt9OyAvLyBzaG91bGQgYmUgYW4gZXZlbnQgZW1pdHRlciB0b29cbiAgcmV0dXJuIEFQSTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gJzxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NcIj5cXG4gIDxpbWcgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2xvZ29cIiBzcmM9XCIvQlVORExFL2Fzc2V0cy8wNjE5MTVkMDEwMzExZDZlLnN2Z1wiPlxcbiAgPGRpdiBjbGFzcz1cIndpemFyZGFtaWdvc19fbWVudVwiPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIndpemFyZGFtaWdvc19faW50cm9cIj5cXG4gICAgPGgxIGNsYXNzPVwid2l6YXJkYW1pZ29zX190aXRsZVwiPldlbGNvbWUsIHdpemFyZCBhbWlnb3MuPC9oMT5cXG4gICAgPHAgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3N1YnRpdGxlXCI+Q29tZSwgbGVhcm4gdG8gY29kZSB3aXRoIHVzLjwvcD5cXG4gICAgPHA+XFxuICAgICAgV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUgaXMgYSBjby1sZWFybmluZyBwcm9ncmFtbWluZyBjbGFzcy4gSXQgaXMgYW4gb3BlbixcXG4gICAgICBmcmllbmRseSBhbmQgY29sbGFib3JhdGl2ZSBzcGFjZSBmb3IgZ2lybHMgYW5kIGJveXMgdG8gbGVhcm4gaG93IHRvIGNvZGUuXFxuICAgIDwvcD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIndpemFyZGFtaWdvc19fc2Nyb2xsc1wiPlxcbiAgPCEtLSBAVE9ETzogY29udmVydCB0ZXh0IGNvbnRlbnQgbGF5b3V0IHRvIG1hcmtkb3duIC0tPlxcbiAgICA8aDEgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3RpdGxlXCI+TWFnaWMgU3BlbGxzPC9oMT5cXG4gICAgPHA+XFxuICAgICAgV2UgY292ZXIgdGhlIG1haW4gZWxlbWVudHMgdGhhdCBldmVyeSB3aXphcmQgYXBwcmVudGljZSBuZWVkcyB0byBrbm93OlxcbiAgICA8L3A+XFxuICAgIDx1bD5cXG4gICAgICA8bGk+T3BlcmF0aW5nIFN5c3RlbVxcbiAgICAgICAgPHVsPjxsaSBjbGFzcz1cIndpemFyZGFtaWdvc19fYnVsbGV0c1wiPnVuaXggJiBiYXNoPC9saT48L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgICAgPGxpPk1hcmt1cCBMYW5ndWFnZXNcXG4gICAgICAgIDx1bD48bGkgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2J1bGxldHNcIj5tYXJrZG93biwgaHRtbCAmIGNzczwvbGk+PC91bD5cXG4gICAgICA8L2xpPlxcbiAgICAgIDxsaT5Ub29sc1xcbiAgICAgICAgPHVsPjxsaSBjbGFzcz1cIndpemFyZGFtaWdvc19fYnVsbGV0c1wiPmNocm9tZSBkZXYgdG9vbHMgJiBhdG9tLmlvPC9saT48L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgICAgPGxpPkNvbGxhYm9yYXRpb25cXG4gICAgICAgIDx1bD48bGkgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2J1bGxldHNcIj5naXRodWIsIGdpdHRlciwgd2FmZmxlICYgY28uPC9saT48L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgICAgPGxpPlByb2dyYW1taW5nXFxuICAgICAgICA8dWw+PGxpIGNsYXNzPVwid2l6YXJkYW1pZ29zX19idWxsZXRzXCI+amF2YXNjcmlwdCwgbm9kZWpzICYgcmVnZXg8L2xpPjwvdWw+XFxuICAgICAgPC9saT5cXG4gICAgICA8bGk+RGV2T3BzXFxuICAgICAgICA8dWw+PGxpIGNsYXNzPVwid2l6YXJkYW1pZ29zX19idWxsZXRzXCI+bnBtLCBnaXQgJiBicm93c2VyaWZ5PC9saT48L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgIDwvdWw+XFxuICAgIDxwPlxcbiAgICAgIE1hZ2ljIGlzIHNlcmlvdXMgYnVzaW5lc3MuXFxuICAgICAgVGhlcmUgd2lsbCBiZSBob21ld29ya3MsXFxuICAgICAgc28gdGhlIGxlYXJuZXJzIHdpbGwgYmUgYWJsZSB0byBwcmFjdGljZSB0aGVpciBzcGVsbHMuXFxuICAgICAgVG8gaGVscCB0aGVtLCB3ZSB3aWxsIHByb2R1Y2UgYSBzaW1wbGUgdmlkZW8gc3VtbWFyeSBhZnRlciBlYWNoIHNlc3Npb24uXFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgV2UgYWxzbyBlbmNvdXJhZ2UgYWxsIHRoZSBwYXJ0aWNpcGFudHMgdG8gaGF2ZSBzb21lIHByb2plY3QgdGhleSB3YW50IHRvIHdvcmsgb25cXG4gICAgICA8aT4oYnV0IGlmIHRoZXkgZG9uXFwndCwgbm8gd29ycmllcywgd2lsbCBoZWxwIHRoZW0gZmluZCBvbmUpLjwvaT5cXG4gICAgPC9wPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zX19zY2hlZHVsZVwiPlxcbiAgPCEtLSBAVE9ETzogY29udmVydCB0ZXh0IGNvbnRlbnQgbGF5b3V0IHRvIG1hcmtkb3duIC0tPlxcbiAgICA8aDEgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3RpdGxlXCI+Q2xhc3NlcyBvZiBNYWdpYzwvaDE+XFxuICAgIDxwPlxcbiAgICAgIFdpemFyZCBBbWlnb3MgSW5zdGl0dXRlIHdpbGwgb3BlbiBpdHMgZG9vcnMgaW4gPGI+TWF5IDIwMTU8L2I+LlxcbiAgICAgIEV2ZXJ5IGNsYXNzIHdpbGwgYWNjZXB0IDxiPnVwIHRvIDEwIGxlYXJuZXJzPC9iPlxcbiAgICAgIGFuZCB3aWxsIGJlIHJ1biBieSBhdCBsZWFzdCAyIGhpZ2hlci1sZXZlbCB3aXphcmRzLlxcbiAgICA8L3A+XFxuICAgIDxwPlxcbiAgICAgIDxicj5cXG4gICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiNmZmY7IGZvbnQtd2VpZ2h0OjkwMFwiPkNsYXNzIG9mIE1hZ2ljPC9zcGFuPjxicj5cXG4gICAgICBNb25kYXlzIG9yIFRodXJzZGF5cyAoMTY6MDAgLSAxNzozMCk8YnI+XFxuICAgICAgMTIwIEVVUiAvIG1vbnRoPGJyPlxcbiAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5nb29nbGUuZGUvbWFwcy9kaXIvL2NvLnVwLCtBZGFsYmVydHN0cmElQzMlOUZlKzgsKzEwOTk5K0JlcmxpbiwrRGV1dHNjaGxhbmQvQDUyLjUwMDMzLDEzLjQxOTc4NiwxN3ovZGF0YT0hNG0xMiExbTMhM20yITFzMHg0N2E4NGUzMzdlMjNkNDEzOjB4MmNmZDY5ZTVhOWY2OGYxYSEyc2NvLnVwITRtNyExbTAhMW01ITFtMSExczB4NDdhODRlMzM3ZTIzZDQxMzoweDJjZmQ2OWU1YTlmNjhmMWEhMm0yITFkMTMuNDE5Nzg2ITJkNTIuNTAwMzNcIj5Db191cCAoQWRhbGJlcnRzdHJhc3NlIDgpPC9hPlxcbiAgICAgIDxhIGNsYXNzPVwid2l6YXJkYW1pZ29zX19hcHBseVwiIGhyZWY9XFwnbWFpbHRvOndpemFyZEBhbWlnb3MuaW5zdGl0dXRlP1N1YmplY3Q9QXBwbGljYXRpb246JTIwTW9uZGF5cyUyMG9yJTIwVGh1cnNkYXlzJTIwKDE2OjAwJTIwLSUyMDE3LjMwKSZCb2R5PSUwRCUwQVxcJz5BcHBseTwvYT48YnI+XFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgPGJyPlxcbiAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6I2ZmZjsgZm9udC13ZWlnaHQ6OTAwXCI+Q2xhc3Mgb2YgTWFnaWM8L3NwYW4+PGJyPlxcbiAgICAgIE1vbmRheXMgb3IgVGh1cnNkYXlzICgxNjowMCAtIDE5OjAwKTxicj5cXG4gICAgICAyNDAgRVVSIC8gbW9udGg8YnI+XFxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lmdvb2dsZS5kZS9tYXBzL2Rpci8vY28udXAsK0FkYWxiZXJ0c3RyYSVDMyU5RmUrOCwrMTA5OTkrQmVybGluLCtEZXV0c2NobGFuZC9ANTIuNTAwMzMsMTMuNDE5Nzg2LDE3ei9kYXRhPSE0bTEyITFtMyEzbTIhMXMweDQ3YTg0ZTMzN2UyM2Q0MTM6MHgyY2ZkNjllNWE5ZjY4ZjFhITJzY28udXAhNG03ITFtMCExbTUhMW0xITFzMHg0N2E4NGUzMzdlMjNkNDEzOjB4MmNmZDY5ZTVhOWY2OGYxYSEybTIhMWQxMy40MTk3ODYhMmQ1Mi41MDAzM1wiPkNvX3VwIChBZGFsYmVydHN0cmFzc2UgOCk8L2E+XFxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2FwcGx5XCIgaHJlZj1cXCdtYWlsdG86d2l6YXJkQGFtaWdvcy5pbnN0aXR1dGU/U3ViamVjdD1BcHBsaWNhdGlvbjolMjBNb25kYXlzJTIwb3IlMjBUaHVyc2RheXMlMjAoMTY6MDAlMjAtJTIwMTkuMDApJkJvZHk9JTBEJTBBXFwnPkFwcGx5PC9hPjxicj5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICA8YnI+XFxuICAgICAgRnJvbSBlYWNoIHBhaWQgY2xhc3Mgd2Ugd2lsbCBkb25hdGUgYSBjZXJ0YWluIGFtb3VudCB0byBzdXBwb3J0IHRoZSBwYXktd2hhdC15b3UtY2FuIHByb2dyYW0uXFxuICAgICAgVGhvc2Ugd2hvIGFwcGx5IGZvciB0aGUgcGF5LXdoYXQteW91LWNhbi1wcm9ncmFtLCB3aWxsIGJlIGFkZGVkIHRvXFxuICAgICAgdGhlIHF1ZXVlIGFuZCBpbmZvcm1lZCB3aGVuIHRoZSBuZXh0IGZyZWUgc2xvdCBpcyBhdmFpbGFibGUuXFxuICAgICAgV2UgYXJlIGFsc28gb3BlbiBmb3IgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cXCdtYWlsdG86d2l6YXJkQGFtaWdvcy5pbnN0aXR1dGU/U3ViamVjdD1JJTIwd291bGQlMjBsaWtlJTIwdG8lMjBkb25hdGUmQm9keT0lMEQlMEFcXCc+ZG9uYXRpb25zPC9hPi5cXG4gICAgPC9wPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zX19yZXF1aXJlbWVudHNcIj5cXG4gIDwhLS0gQFRPRE86IGNvbnZlcnQgdGV4dCBjb250ZW50IGxheW91dCB0byBtYXJrZG93biAtLT5cXG4gICAgPGgxIGNsYXNzPVwid2l6YXJkYW1pZ29zX190aXRsZVwiPlVubG9ja2luZyBDaGFybTwvaDE+XFxuXFxuICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6I2ZmZjsgZm9udC13ZWlnaHQ6OTAwXCI+VGhlcmUgYXJlIHNvbWUgcmVxdWlyZW1lbnRzIGZvciBDbGFzc2VzIG9mIE1hZ2ljOjwvc3Bhbj5cXG4gICAgPHA+WW91IG5lZWQgdG8gaGF2ZSB5b3VyIG93biBjb21wdXRlci4gSXQgZG9lc25cXCd0IGhhdmUgdG8gYmUgc3VwZXIgcG93ZXJmdWwsIGJ1dCB5b3UgbmVlZCBvbmUuPC9wPlxcbiAgICA8cD5JdCBuZWVkcyB0byBydW4gb24gTWFjIE9TWCBvciBMaW51eC4gSWYgeW91IGhhdmUgV2luZG93cywgd2Ugd2lsbCBoZWxwIHlvdSBpbnN0YWxsIExpbnV4LjwvcD5cXG4gICAgPHA+XFxuICAgICAgTW9zdCBvZiB0aGUgbW9kZXJuIHByb2dyYW1taW5nIG1hdGVyaWFscywgdHV0b3JpYWxzIGFuZCBvdGhlciBvbmxpbmUgcmVzb3VyY2VzIGFyZSB3cml0dGVuIGluIGVuZ2xpc2gsXFxuICAgICAgc28geW91IHNob3VsZCB1bmRlcnN0YW5kIHRoZSBiYXNpY3MuIE1lbnRvcnMgc3BlYWsgZ2VybWFuIGFuZCBlbmdsaXNoLCBzbyB0aGV5IGNhbiBoZWxwIHlvdSBvdXQuXFxuICAgIDwvcD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIndpemFyZGFtaWdvc19fYWJvdXRcIj5cXG4gIDwhLS0gQFRPRE86IGNvbnZlcnQgdGV4dCBjb250ZW50IGxheW91dCB0byBtYXJrZG93biAtLT5cXG4gICAgPGgxIGNsYXNzPVwid2l6YXJkYW1pZ29zX190aXRsZVwiPldobyBpcyBXaXphcmQgQW1pZ29zIEluc3RpdHV0ZSBmb3I8L2gxPlxcbiAgICA8cD5cXG4gICAgICBJdCBpcyBmb3IgZ2lybHMgYW5kIGJveXMgd2hvIHdhbnQgdG8gbGVhcm4gc3BlY2lhbCBtYWdpYyBwcm9ncmFtbWluZyB3aXphcmRyeS5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICBUaGlzIGlzIG5vdCBhIHR5cGljYWwgc2Nob29sLiBJdCBpcyBhIFdpemFyZCBJbnN0aXR1dGUgdGhhdCBwcm9tb3Rlc1xcbiAgICAgIGNvbGxhYm9yYXRpb24gYW5kIGEgbGVhcm5pbmctYnktZG9pbmcgYXBwcm9hY2guIFdlIHdpbGwgaGVscCB5b3UgZ2V0IHRvIGtub3cgdGhlXFxuICAgICAgcmlnaHQgbWFnaWMgc3BlbGxzIGFuZCBwcmVwYXJlIHlvdSB0byBiZWNvbWUgYW4gYWN0aXZlIHByb2JsZW0gc29sdmVyLlxcbiAgICA8L3A+XFxuICAgIDxwPlxcbiAgICAgIElmIHlvdSBhcmUgbm90IHN1cmUgd2hldGhlciB5b3Ugc2hvdWxkIGFwcGx5LFxcbiAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJtYWlsdG86d2l6YXJkQGFtaWdvcy5pbnN0aXR1dGVcIj5jb250YWN0IHVzPC9hPlxcbiAgICAgIGFuZCB3ZSB3aWxsIGhhcHB5IHRvIHRhbGsgdG8geW91LlxcbiAgICA8L3A+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2pvaW5cIj5cXG4gIDwhLS0gQFRPRE86IGNvbnZlcnQgdGV4dCBjb250ZW50IGxheW91dCB0byBtYXJrZG93biAtLT5cXG4gICAgPGgxIGNsYXNzPVwid2l6YXJkYW1pZ29zX190aXRsZVwiPk1hZCBTY2llbmNlPC9oMT5cXG4gICAgPHA+PGI+V2FudCB0byBqb2luIHVzPzwvYj48L3A+XFxuICAgIERvIHlvdSBoYXBwZW4gdG8gYmUgYSBXaXphcmQgeW91cnNlbGYgYW5kIHdvdWxkIGxpa2UgdG8gaGVscCBhcyBhIHRlYWNoZXIgb3Igc3BlYWtlcj9cXG4gICAgPHA+Sm9pbiBvdXIgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHA6Ly9tZWV0dXAuY29tL2NvZGluZ2FtaWdvc1wiPkNvZGluZyBBbWlnb3MgTWVldHVwPC9hPjwvcD5cXG4gICAgPHA+b3IgY2hhdCB3aXRoIHVzIG9uIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdHRlci5pbS93aXphcmRhbWlnb3NpbnN0aXR1dGUvY2hhdFwiPkdpdHRlcjwvYT4uPC9wPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuJzsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIHBrZyAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJyk7XG4vLyB2YXIgcGFyYW1zICAgICAgPSByZXF1aXJlKCcnKSB0cnkgbG9hZCBmaWxlcyBpbiBpZnJhbWUgYW5kIHNjcmFwZSBpdCB0byBjaXJjdW12ZW50IENPUlNcbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2lmcmFtZS1hcGlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgTU9EVUxFIElOVEVSTkFMUyAmIEhFTFBFUlNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfY29uZmlnICAgICA9IHtcbiAgdGl0bGUgICAgICAgOiAnV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUnLFxuICBkZXNjcmlwdGlvbiA6IHBrZy5kZXNjcmlwdGlvbixcbiAgdmVyc2lvbiAgICAgOiBwa2cudmVyc2lvbixcbiAga2V5d29yZHMgICAgOiBwa2cua2V5d29yZHMuam9pbignLCAnKSxcbiAgYXV0aG9yICAgICAgOiBwa2cuYXV0aG9yLm5hbWUsXG4gIHdlYnNpdGUgICAgIDogcGtnLmhvbWVwYWdlLFxuICBzdHlsZSAgICAgICA6IHBrZy5hdG9taWZ5LmNzcy5vdXRwdXRcbn07XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYUE9SVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgID0gY29uZmlnO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWEVDVVRJT05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGNvbmZpZyAoa2V5KSB7XG4gIHJldHVybiBrZXkgPyBfY29uZmlnW2tleV0gOiBfY29uZmlnO1xufVxuIiwiLyoqXG4gKiBGYXN0RG9tXG4gKlxuICogRWxpbWluYXRlcyBsYXlvdXQgdGhyYXNoaW5nXG4gKiBieSBiYXRjaGluZyBET00gcmVhZC93cml0ZVxuICogaW50ZXJhY3Rpb25zLlxuICpcbiAqIEBhdXRob3IgV2lsc29uIFBhZ2UgPHdpbHNvbnBhZ2VAbWUuY29tPlxuICovXG5cbjsoZnVuY3Rpb24oZmFzdGRvbSl7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE5vcm1hbGl6ZSByQUZcbiAgdmFyIHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IGZ1bmN0aW9uKGNiKSB7IHJldHVybiB3aW5kb3cuc2V0VGltZW91dChjYiwgMTAwMCAvIDYwKTsgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZyZXNoXG4gICAqIEZhc3REb20gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gRmFzdERvbSgpIHtcbiAgICB0aGlzLmZyYW1lcyA9IFtdO1xuICAgIHRoaXMubGFzdElkID0gMDtcblxuICAgIC8vIFBsYWNpbmcgdGhlIHJBRiBtZXRob2RcbiAgICAvLyBvbiB0aGUgaW5zdGFuY2UgYWxsb3dzXG4gICAgLy8gdXMgdG8gcmVwbGFjZSBpdCB3aXRoXG4gICAgLy8gYSBzdHViIGZvciB0ZXN0aW5nLlxuICAgIHRoaXMucmFmID0gcmFmO1xuXG4gICAgdGhpcy5iYXRjaCA9IHtcbiAgICAgIGhhc2g6IHt9LFxuICAgICAgcmVhZDogW10sXG4gICAgICB3cml0ZTogW10sXG4gICAgICBtb2RlOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgam9iIHRvIHRoZVxuICAgKiByZWFkIGJhdGNoIGFuZCBzY2hlZHVsZXNcbiAgICogYSBuZXcgZnJhbWUgaWYgbmVlZCBiZS5cbiAgICpcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbihmbiwgY3R4KSB7XG4gICAgdmFyIGpvYiA9IHRoaXMuYWRkKCdyZWFkJywgZm4sIGN0eCk7XG4gICAgdmFyIGlkID0gam9iLmlkO1xuXG4gICAgLy8gQWRkIHRoaXMgam9iIHRvIHRoZSByZWFkIHF1ZXVlXG4gICAgdGhpcy5iYXRjaC5yZWFkLnB1c2goam9iLmlkKTtcblxuICAgIC8vIFdlIHNob3VsZCAqbm90KiBzY2hlZHVsZSBhIG5ldyBmcmFtZSBpZjpcbiAgICAvLyAxLiBXZSdyZSAncmVhZGluZydcbiAgICAvLyAyLiBBIGZyYW1lIGlzIGFscmVhZHkgc2NoZWR1bGVkXG4gICAgdmFyIGRvZXNudE5lZWRGcmFtZSA9IHRoaXMuYmF0Y2gubW9kZSA9PT0gJ3JlYWRpbmcnXG4gICAgICB8fCB0aGlzLmJhdGNoLnNjaGVkdWxlZDtcblxuICAgIC8vIElmIGEgZnJhbWUgaXNuJ3QgbmVlZGVkLCByZXR1cm5cbiAgICBpZiAoZG9lc250TmVlZEZyYW1lKSByZXR1cm4gaWQ7XG5cbiAgICAvLyBTY2hlZHVsZSBhIG5ld1xuICAgIC8vIGZyYW1lLCB0aGVuIHJldHVyblxuICAgIHRoaXMuc2NoZWR1bGVCYXRjaCgpO1xuICAgIHJldHVybiBpZDtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIGpvYiB0byB0aGVcbiAgICogd3JpdGUgYmF0Y2ggYW5kIHNjaGVkdWxlc1xuICAgKiBhIG5ldyBmcmFtZSBpZiBuZWVkIGJlLlxuICAgKlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihmbiwgY3R4KSB7XG4gICAgdmFyIGpvYiA9IHRoaXMuYWRkKCd3cml0ZScsIGZuLCBjdHgpO1xuICAgIHZhciBtb2RlID0gdGhpcy5iYXRjaC5tb2RlO1xuICAgIHZhciBpZCA9IGpvYi5pZDtcblxuICAgIC8vIFB1c2ggdGhlIGpvYiBpZCBpbnRvIHRoZSBxdWV1ZVxuICAgIHRoaXMuYmF0Y2gud3JpdGUucHVzaChqb2IuaWQpO1xuXG4gICAgLy8gV2Ugc2hvdWxkICpub3QqIHNjaGVkdWxlIGEgbmV3IGZyYW1lIGlmOlxuICAgIC8vIDEuIFdlIGFyZSAnd3JpdGluZydcbiAgICAvLyAyLiBXZSBhcmUgJ3JlYWRpbmcnXG4gICAgLy8gMy4gQSBmcmFtZSBpcyBhbHJlYWR5IHNjaGVkdWxlZC5cbiAgICB2YXIgZG9lc250TmVlZEZyYW1lID0gbW9kZSA9PT0gJ3dyaXRpbmcnXG4gICAgICB8fCBtb2RlID09PSAncmVhZGluZydcbiAgICAgIHx8IHRoaXMuYmF0Y2guc2NoZWR1bGVkO1xuXG4gICAgLy8gSWYgYSBmcmFtZSBpc24ndCBuZWVkZWQsIHJldHVyblxuICAgIGlmIChkb2VzbnROZWVkRnJhbWUpIHJldHVybiBpZDtcblxuICAgIC8vIFNjaGVkdWxlIGEgbmV3XG4gICAgLy8gZnJhbWUsIHRoZW4gcmV0dXJuXG4gICAgdGhpcy5zY2hlZHVsZUJhdGNoKCk7XG4gICAgcmV0dXJuIGlkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWZlcnMgdGhlIGdpdmVuIGpvYlxuICAgKiBieSB0aGUgbnVtYmVyIG9mIGZyYW1lc1xuICAgKiBzcGVjaWZpZWQuXG4gICAqXG4gICAqIElmIG5vIGZyYW1lcyBhcmUgZ2l2ZW5cbiAgICogdGhlbiB0aGUgam9iIGlzIHJ1biBpblxuICAgKiB0aGUgbmV4dCBmcmVlIGZyYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgZnJhbWVcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLmRlZmVyID0gZnVuY3Rpb24oZnJhbWUsIGZuLCBjdHgpIHtcblxuICAgIC8vIEFjY2VwdHMgdHdvIGFyZ3VtZW50c1xuICAgIGlmICh0eXBlb2YgZnJhbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN0eCA9IGZuO1xuICAgICAgZm4gPSBmcmFtZTtcbiAgICAgIGZyYW1lID0gMTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGluZGV4ID0gZnJhbWUgLSAxO1xuXG4gICAgcmV0dXJuIHRoaXMuc2NoZWR1bGUoaW5kZXgsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5ydW4oe1xuICAgICAgICBmbjogZm4sXG4gICAgICAgIGN0eDogY3R4XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXJzIGEgc2NoZWR1bGVkICdyZWFkJyxcbiAgICogJ3dyaXRlJyBvciAnZGVmZXInIGpvYi5cbiAgICpcbiAgICogQHBhcmFtICB7TnVtYmVyfFN0cmluZ30gaWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbihpZCkge1xuXG4gICAgLy8gRGVmZXIgam9icyBhcmUgY2xlYXJlZCBkaWZmZXJlbnRseVxuICAgIGlmICh0eXBlb2YgaWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLmNsZWFyRnJhbWUoaWQpO1xuICAgIH1cblxuICAgIC8vIEFsbG93IGlkcyB0byBiZSBwYXNzZWQgYXMgc3RyaW5nc1xuICAgIGlkID0gTnVtYmVyKGlkKTtcblxuICAgIHZhciBqb2IgPSB0aGlzLmJhdGNoLmhhc2hbaWRdO1xuICAgIGlmICgham9iKSByZXR1cm47XG5cbiAgICB2YXIgbGlzdCA9IHRoaXMuYmF0Y2hbam9iLnR5cGVdO1xuICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZihpZCk7XG5cbiAgICAvLyBDbGVhciByZWZlcmVuY2VzXG4gICAgZGVsZXRlIHRoaXMuYmF0Y2guaGFzaFtpZF07XG4gICAgaWYgKH5pbmRleCkgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYSBzY2hlZHVsZWQgZnJhbWUuXG4gICAqXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmcmFtZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuY2xlYXJGcmFtZSA9IGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5mcmFtZXMuaW5kZXhPZihmcmFtZSk7XG4gICAgaWYgKH5pbmRleCkgdGhpcy5mcmFtZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfTtcblxuICAvKipcbiAgICogU2NoZWR1bGVzIGEgbmV3IHJlYWQvd3JpdGVcbiAgICogYmF0Y2ggaWYgb25lIGlzbid0IHBlbmRpbmcuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5zY2hlZHVsZUJhdGNoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gU2NoZWR1bGUgYmF0Y2ggZm9yIG5leHQgZnJhbWVcbiAgICB0aGlzLnNjaGVkdWxlKDAsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5iYXRjaC5zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgIHNlbGYucnVuQmF0Y2goKTtcbiAgICB9KTtcblxuICAgIC8vIFNldCBmbGFnIHRvIGluZGljYXRlXG4gICAgLy8gYSBmcmFtZSBoYXMgYmVlbiBzY2hlZHVsZWRcbiAgICB0aGlzLmJhdGNoLnNjaGVkdWxlZCA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHVuaXF1ZVxuICAgKiBpZCBmb3IgYSBqb2IuXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnVuaXF1ZUlkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICsrdGhpcy5sYXN0SWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIGVhY2ggam9iIGluXG4gICAqIHRoZSBsaXN0IHBhc3NlZC5cbiAgICpcbiAgICogSWYgYSBjb250ZXh0IGhhcyBiZWVuXG4gICAqIHN0b3JlZCBvbiB0aGUgZnVuY3Rpb25cbiAgICogdGhlbiBpdCBpcyB1c2VkLCBlbHNlIHRoZVxuICAgKiBjdXJyZW50IGB0aGlzYCBpcyB1c2VkLlxuICAgKlxuICAgKiBAcGFyYW0gIHtBcnJheX0gbGlzdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbihsaXN0KSB7XG4gICAgdmFyIGlkO1xuXG4gICAgd2hpbGUgKGlkID0gbGlzdC5zaGlmdCgpKSB7XG4gICAgICB0aGlzLnJ1bih0aGlzLmJhdGNoLmhhc2hbaWRdKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJ1bnMgYW55ICdyZWFkJyBqb2JzIGZvbGxvd2VkXG4gICAqIGJ5IGFueSAnd3JpdGUnIGpvYnMuXG4gICAqXG4gICAqIFdlIHJ1biB0aGlzIGluc2lkZSBhIHRyeSBjYXRjaFxuICAgKiBzbyB0aGF0IGlmIGFueSBqb2JzIGVycm9yLCB3ZVxuICAgKiBhcmUgYWJsZSB0byByZWNvdmVyIGFuZCBjb250aW51ZVxuICAgKiB0byBmbHVzaCB0aGUgYmF0Y2ggdW50aWwgaXQncyBlbXB0eS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnJ1bkJhdGNoID0gZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcblxuICAgICAgLy8gU2V0IHRoZSBtb2RlIHRvICdyZWFkaW5nJyxcbiAgICAgIC8vIHRoZW4gZW1wdHkgYWxsIHJlYWQgam9ic1xuICAgICAgdGhpcy5iYXRjaC5tb2RlID0gJ3JlYWRpbmcnO1xuICAgICAgdGhpcy5mbHVzaCh0aGlzLmJhdGNoLnJlYWQpO1xuXG4gICAgICAvLyBTZXQgdGhlIG1vZGUgdG8gJ3dyaXRpbmcnXG4gICAgICAvLyB0aGVuIGVtcHR5IGFsbCB3cml0ZSBqb2JzXG4gICAgICB0aGlzLmJhdGNoLm1vZGUgPSAnd3JpdGluZyc7XG4gICAgICB0aGlzLmZsdXNoKHRoaXMuYmF0Y2gud3JpdGUpO1xuXG4gICAgICB0aGlzLmJhdGNoLm1vZGUgPSBudWxsO1xuXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5ydW5CYXRjaCgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgam9iIHRvXG4gICAqIHRoZSBnaXZlbiBiYXRjaC5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gICBsaXN0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIGN0eFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBpZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24odHlwZSwgZm4sIGN0eCkge1xuICAgIHZhciBpZCA9IHRoaXMudW5pcXVlSWQoKTtcbiAgICByZXR1cm4gdGhpcy5iYXRjaC5oYXNoW2lkXSA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGZuOiBmbixcbiAgICAgIGN0eDogY3R4LFxuICAgICAgdHlwZTogdHlwZVxuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIFJ1bnMgYSBnaXZlbiBqb2IuXG4gICAqXG4gICAqIEFwcGxpY2F0aW9ucyB1c2luZyBGYXN0RG9tXG4gICAqIGhhdmUgdGhlIG9wdGlvbnMgb2Ygc2V0dGluZ1xuICAgKiBgZmFzdGRvbS5vbkVycm9yYC5cbiAgICpcbiAgICogVGhpcyB3aWxsIGNhdGNoIGFueVxuICAgKiBlcnJvcnMgdGhhdCBtYXkgdGhyb3dcbiAgICogaW5zaWRlIGNhbGxiYWNrcywgd2hpY2hcbiAgICogaXMgdXNlZnVsIGFzIG9mdGVuIERPTVxuICAgKiBub2RlcyBoYXZlIGJlZW4gcmVtb3ZlZFxuICAgKiBzaW5jZSBhIGpvYiB3YXMgc2NoZWR1bGVkLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKlxuICAgKiAgIGZhc3Rkb20ub25FcnJvciA9IGZ1bmN0aW9uKGUpIHtcbiAgICogICAgIC8vIFJ1bnMgd2hlbiBqb2JzIGVycm9yXG4gICAqICAgfTtcbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSBqb2JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKGpvYil7XG4gICAgdmFyIGN0eCA9IGpvYi5jdHggfHwgdGhpcztcbiAgICB2YXIgZm4gPSBqb2IuZm47XG5cbiAgICAvLyBDbGVhciByZWZlcmVuY2UgdG8gdGhlIGpvYlxuICAgIGRlbGV0ZSB0aGlzLmJhdGNoLmhhc2hbam9iLmlkXTtcblxuICAgIC8vIElmIG5vIGBvbkVycm9yYCBoYW5kbGVyXG4gICAgLy8gaGFzIGJlZW4gcmVnaXN0ZXJlZCwganVzdFxuICAgIC8vIHJ1biB0aGUgam9iIG5vcm1hbGx5LlxuICAgIGlmICghdGhpcy5vbkVycm9yKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbChjdHgpO1xuICAgIH1cblxuICAgIC8vIElmIGFuIGBvbkVycm9yYCBoYW5kbGVyXG4gICAgLy8gaGFzIGJlZW4gcmVnaXN0ZXJlZCwgY2F0Y2hcbiAgICAvLyBlcnJvcnMgdGhhdCB0aHJvdyBpbnNpZGVcbiAgICAvLyBjYWxsYmFja3MsIGFuZCBydW4gdGhlXG4gICAgLy8gaGFuZGxlciBpbnN0ZWFkLlxuICAgIHRyeSB7IGZuLmNhbGwoY3R4KTsgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5vbkVycm9yKGUpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhcnRzIGEgckFGIGxvb3BcbiAgICogdG8gZW1wdHkgdGhlIGZyYW1lIHF1ZXVlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcmFmID0gdGhpcy5yYWY7XG5cbiAgICAvLyBEb24ndCBzdGFydCBtb3JlIHRoYW4gb25lIGxvb3BcbiAgICBpZiAodGhpcy5sb29waW5nKSByZXR1cm47XG5cbiAgICByYWYoZnVuY3Rpb24gZnJhbWUoKSB7XG4gICAgICB2YXIgZm4gPSBzZWxmLmZyYW1lcy5zaGlmdCgpO1xuXG4gICAgICAvLyBJZiBubyBtb3JlIGZyYW1lcyxcbiAgICAgIC8vIHN0b3AgbG9vcGluZ1xuICAgICAgaWYgKCFzZWxmLmZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgc2VsZi5sb29waW5nID0gZmFsc2U7XG5cbiAgICAgIC8vIE90aGVyd2lzZSwgc2NoZWR1bGUgdGhlXG4gICAgICAvLyBuZXh0IGZyYW1lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYWYoZnJhbWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBSdW4gdGhlIGZyYW1lLiAgTm90ZSB0aGF0XG4gICAgICAvLyB0aGlzIG1heSB0aHJvdyBhbiBlcnJvclxuICAgICAgLy8gaW4gdXNlciBjb2RlLCBidXQgYWxsXG4gICAgICAvLyBmYXN0ZG9tIHRhc2tzIGFyZSBkZWFsdFxuICAgICAgLy8gd2l0aCBhbHJlYWR5IHNvIHRoZSBjb2RlXG4gICAgICAvLyB3aWxsIGNvbnRpbnVlIHRvIGl0ZXJhdGVcbiAgICAgIGlmIChmbikgZm4oKTtcbiAgICB9KTtcblxuICAgIHRoaXMubG9vcGluZyA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBmdW5jdGlvbiB0b1xuICAgKiBhIHNwZWNpZmllZCBpbmRleFxuICAgKiBvZiB0aGUgZnJhbWUgcXVldWUuXG4gICAqXG4gICAqIEBwYXJhbSAge051bWJlcn0gICBpbmRleFxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uKGluZGV4LCBmbikge1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoaXMgc2xvdFxuICAgIC8vIGhhc24ndCBhbHJlYWR5IGJlZW5cbiAgICAvLyB0YWtlbi4gSWYgaXQgaGFzLCB0cnlcbiAgICAvLyByZS1zY2hlZHVsaW5nIGZvciB0aGUgbmV4dCBzbG90XG4gICAgaWYgKHRoaXMuZnJhbWVzW2luZGV4XSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGUoaW5kZXggKyAxLCBmbik7XG4gICAgfVxuXG4gICAgLy8gU3RhcnQgdGhlIHJBRlxuICAgIC8vIGxvb3AgdG8gZW1wdHlcbiAgICAvLyB0aGUgZnJhbWUgcXVldWVcbiAgICB0aGlzLmxvb3AoKTtcblxuICAgIC8vIEluc2VydCB0aGlzIGZ1bmN0aW9uIGludG9cbiAgICAvLyB0aGUgZnJhbWVzIHF1ZXVlIGFuZCByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5mcmFtZXNbaW5kZXhdID0gZm47XG4gIH07XG5cbiAgLy8gV2Ugb25seSBldmVyIHdhbnQgdGhlcmUgdG8gYmVcbiAgLy8gb25lIGluc3RhbmNlIG9mIEZhc3REb20gaW4gYW4gYXBwXG4gIGZhc3Rkb20gPSBmYXN0ZG9tIHx8IG5ldyBGYXN0RG9tKCk7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSAnZmFzdGRvbSdcbiAgICovXG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYXN0ZG9tO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpeyByZXR1cm4gZmFzdGRvbTsgfSk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93WydmYXN0ZG9tJ10gPSBmYXN0ZG9tO1xuICB9XG5cbn0pKHdpbmRvdy5mYXN0ZG9tKTtcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX2NvbmZpZyAgID0gcmVxdWlyZSgnX2NvbmZpZycpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBQQVJBTUVURVIgPSBBUkdVTUVOVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBubyBjbGkgdG9vbFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWFBPUlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbm1vZHVsZS5leHBvcnRzICA9IGJvaWxlcnBsYXRlO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWEVDVVRJT05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBjb25maWcgICAgICA9IF9jb25maWcoKTtcbmZ1bmN0aW9uIGJvaWxlcnBsYXRlIChwYXJhbWV0ZXIpIHtcbiAgdmFyICR0aXRsZSAgICAgICAgICAgICAgPSBjb25maWdbJ3RpdGxlJ107XG4gIHZhciAkZGVzY3JpcHRpb24gICAgICAgID0gY29uZmlnWydkZXNjcmlwdGlvbiddO1xuICB2YXIgJGtleXdvcmRzICAgICAgICAgICA9IGNvbmZpZ1sna2V5d29yZHMnXTtcbiAgdmFyICRhdXRob3IgICAgICAgICAgICAgPSBjb25maWdbJ2F1dGhvciddO1xuICB2YXIgJHdlYnNpdGUgICAgICAgICAgICA9IGNvbmZpZ1snd2Vic2l0ZSddO1xuICB2YXIgJHN0eWxlICAgICAgICAgICAgICA9IGNvbmZpZ1snc3R5bGUnXTtcblxuICBpZiAocGFyYW1ldGVyKSB7XG4gICAgJHRpdGxlICAgICAgICAgICAgICAgID0gcGFyYW1ldGVyLnRpdGxlICAgICAgIHx8ICR0aXRsZTtcbiAgICAkZGVzY3JpcHRpb24gICAgICAgICAgPSBwYXJhbWV0ZXIuZGVzY3JpcHRpb24gfHwgJGRlc2NyaXB0aW9uO1xuICAgICRrZXl3b3JkcyAgICAgICAgICAgICA9IHBhcmFtZXRlci5rZXl3b3JkcyAgICB8fCAka2V5d29yZHM7XG4gICAgJGF1dGhvciAgICAgICAgICAgICAgID0gcGFyYW1ldGVyLmF1dGhvciAgICAgIHx8ICRhdXRob3I7XG4gICAgJHdlYnNpdGUgICAgICAgICAgICAgID0gcGFyYW1ldGVyLndlYnNpdGUgICAgIHx8ICR3ZWJzaXRlO1xuICAgICRzdHlsZSAgICAgICAgICAgICAgICA9IHBhcmFtZXRlci5zdHlsZSAgICAgICB8fCAkc3R5bGU7XG4gIH1cblxuICB2YXIgdGl0bGUgICAgICAgICAgICAgICA9IFsnPHRpdGxlPicrJHRpdGxlKyc8L3RpdGxlPiddO1xuICB2YXIgbWV0YSAgICAgICAgICAgICAgICA9IFtcbiAgICAnPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cImZvcm1hdC1kZXRlY3Rpb25cIiBjb250ZW50PVwidGVsZXBob25lPW5vXCIgLz4nLFxuICAgICc8bWV0YSBuYW1lPVwibXNhcHBsaWNhdGlvbi10YXAtaGlnaGxpZ2h0XCIgY29udGVudD1cIm5vXCIgLz4nLFxuICAgICc8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiJyskZGVzY3JpcHRpb24rJ1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJrZXl3b3Jkc1wiIGNvbnRlbnQ9XCInKyRrZXl3b3JkcysnXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cImF1dGhvclwiIGNvbnRlbnQ9XCInKyRhdXRob3IrJ1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGUgPSAxLjAsIHVzZXItc2NhbGFibGU9bm9cIj4nXG4gIF07XG4gIHZhciBvZyAgICAgICAgICAgICAgICAgID0gW1xuICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD1cIicrJHRpdGxlKydcIiAvPicsXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6c2l0ZV9uYW1lXCIgY29udGVudD1cIicrJHRpdGxlKydcIiAvPicsXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6dXJsXCIgY29udGVudD1cIicrJHdlYnNpdGUrJ1wiIC8+JyxcbiAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCInKyRkZXNjcmlwdGlvbisnXCIgLz4nLFxuICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOmltYWdlXCIgY29udGVudD1cInBpYy9pc3N1aW5nX2FuX2Fzc2V0LmdpZlwiIC8+JyxcbiAgXTtcbiAgdmFyIGljb24gICAgICAgICAgICAgICAgPSBbIC8vIGNoZWNrIGl0ZW0gZ2VuZXJhdG9yXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjU3eDU3XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTU3eDU3LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjYweDYwXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTYweDYwLnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjcyeDcyXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTcyeDcyLnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjc2eDc2XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTc2eDc2LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjExNHgxMTRcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tMTE0eDExNC5wbmdcIj4nLFxuICAgICc8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgc2l6ZXM9XCIxMjB4MTIwXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTEyMHgxMjAucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiMTQ0eDE0NFwiIGhyZWY9XCJsb2dvL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi0xNDR4MTQ0LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImljb25cIiB0eXBlPVwiaW1hZ2UvcG5nXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9mYXZpY29uLTMyeDMyLnBuZ1wiIHNpemVzPVwiMzJ4MzJcIj4nLFxuICAgICc8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCJsb2dvL2Zhdmljb24vZmF2aWNvbi05Nng5Ni5wbmdcIiBzaXplcz1cIjk2eDk2XCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9wbmdcIiBocmVmPVwibG9nby9mYXZpY29uL2Zhdmljb24tMTZ4MTYucG5nXCIgc2l6ZXM9XCIxNngxNlwiPicsXG4gICAgJzxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9tYW5pZmVzdC5qc29uXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cIm1zYXBwbGljYXRpb24tVGlsZUNvbG9yXCIgY29udGVudD1cIiNiOTFkNDdcIj4nLFxuICAgICc8bWV0YSBuYW1lPVwibXNhcHBsaWNhdGlvbi1UaWxlSW1hZ2VcIiBjb250ZW50PVwibG9nby9mYXZpY29uL21zdGlsZS0xNDR4MTQ0LnBuZ1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCIjZmZmZmZmXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwic2hvcnRjdXQgaWNvblwiIHR5cGU9XCJpbWFnZS94LWljb25cIiBocmVmPVwiU09VUkNFL2Zhdmljb24uaWNvXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9wbmdcIiBocmVmPVwiU09VUkNFL3JlaW52ZW50aW5nZW5nYWdlbWVudC5wbmdcIj4nXG4gIF07XG4gIHZhciBzdHlsZSAgICAgICAgICAgICAgID0gW1xuICAgICc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyAkc3R5bGUgKyAnXCIgLz4nXG4gIF07XG4gIHZhciBoZWFkID0gdGl0bGUuY29uY2F0KG1ldGEpLyouY29uY2F0KG9nKS5jb25jYXQoaWNvbikqLy5jb25jYXQoc3R5bGUpO1xuXG4gIHZhciBodG1sVGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpO1xuICB2YXIgaGVhZFRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgaHRtbFRhZy5zZXRBdHRyaWJ1dGUoJ2xhbmcnLCdlbicpO1xuICBoZWFkVGFnLmlubmVySFRNTCA9IGhlYWQuam9pbignJyk7XG5cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbn07XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIHBrZyAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJyk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaSB0b29sXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYUE9SVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgID0gY29uZmlnO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWEVDVVRJT05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfY29uZmlnICAgICA9IHtcbiAgdGl0bGUgICAgICAgOiAnJyxcbiAgZGVzY3JpcHRpb24gOiBwa2cuZGVzY3JpcHRpb24sXG4gIHZlcnNpb24gICAgIDogcGtnLnZlcnNpb24sXG4gIGtleXdvcmRzICAgIDogcGtnLmtleXdvcmRzLmpvaW4oJywgJyksXG4gIGF1dGhvciAgICAgIDogcGtnLmF1dGhvci5uYW1lLFxuICB3ZWJzaXRlICAgICA6ICdodHRwOi8vbnBtanMub3JnL3dlYnBhZ2UnLFxuICBzdHlsZSAgICAgICA6ICdCVU5ETEUvYnVuZGxlLmNzcydcbn07XG5mdW5jdGlvbiBjb25maWcgKGtleSkge1xuICByZXR1cm4ga2V5ID8gX2NvbmZpZ1trZXldIDogX2NvbmZpZztcbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwid2VicGFnZVwiLFxuICBcInZlcnNpb25cIjogXCIwLjIuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiV2VicGFnZSBCb2lsZXJwbGF0ZSBDb21wb25lbnRcIixcbiAgXCJtYWluXCI6IFwiU09VUkNFL2luZGV4LmpzXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJ0ZXN0XCI6IFwiZWNobyBcXFwiRXJyb3I6IG5vIHRlc3Qgc3BlY2lmaWVkXFxcIiAmJiBleGl0IDFcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImJvaWxlcnBsYXRlXCIsXG4gICAgXCJ3ZWJwYWdlXCIsXG4gICAgXCJjb21wb25lbnRcIlxuICBdLFxuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwic2VyYXBhdGhcIixcbiAgICBcImVtYWlsXCI6IFwiZGV2QHNlcmFwYXRoLmRlXCIsXG4gICAgXCJ1cmxcIjogXCJodHRwOi8vd3d3LmdpdGh1Yi5jb20vc2VyYXBhdGhcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJyZWFkbWVcIjogXCIjIHdlYnBhZ2VcXG5XZWJwYWdlIEJvaWxlcnBsYXRlIENvbXBvbmVudFxcblxcbmBgYGpzXFxudmFyIHdlYnBhZ2UgPSByZXF1aXJlKCd3ZWJwYWdlJyk7XFxudmFyIGJvZHkgICAgPSB3ZWJwYWdlKHtcXG4gIC8vIE9QVElPTkFMXFxuICAvLyAuLi4gYW5kIG1vcmUgaW4gdGhlIGZ1dHVyZSAoZS5nLiBpY29uLCBvZywgLi4uKVxcbiAgdGl0bGUgICAgICAgOiAnRm9vYmFyJyxcXG4gIGRlc2NyaXB0aW9uIDogJ2ZvbyBiYXIgYmF6JyxcXG4gIGtleXdvcmRzICAgIDogJ2ZvbywgYmFyLCBiYXonLFxcbiAgYXV0aG9yICAgICAgOiAncXV1eCBiYXonLFxcbiAgd2Vic2l0ZSAgICAgOiAnaHR0cDovL2Zvby5iYXIuYmF6J1xcbn0pO1xcblwiLFxuICBcInJlYWRtZUZpbGVuYW1lXCI6IFwiUkVBRE1FLm1kXCIsXG4gIFwiZ2l0SGVhZFwiOiBcIjhlNjUyZjJjZWQ5NDE1NTZlM2I2MjMxOGYzZDVkOTU5OTA3MGJhOGRcIixcbiAgXCJfaWRcIjogXCJ3ZWJwYWdlQDAuMi4wXCIsXG4gIFwiX3NoYXN1bVwiOiBcImIxMjJjM2U3OTZkNzRlMTZlYzFiYzFlNWMxY2Y0Nzg0ZGYwZWMxNWFcIixcbiAgXCJfZnJvbVwiOiBcIndlYnBhZ2VAMC4yLjBcIlxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJ3aXphcmRhbWlnb3NpbnN0aXR1dGVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJXaXphcmQgQW1pZ29zIEluc3RpdHV0ZSBXZWJzaXRlXCIsXG4gIFwibWFpblwiOiBcIlNPVVJDRS9pbmRleC5qc1wiLFxuICBcInN0eWxlXCI6IFwiU09VUkNFL2luZGV4LmNzc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJmYXN0ZG9tXCI6IFwiXjAuOC42XCIsXG4gICAgXCJtaW5peGhyXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJyZXNyY2lmeVwiOiBcIl4xLjEuM1wiLFxuICAgIFwid2VicGFnZVwiOiBcIl4wLjIuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImF0b21pZnlcIjogXCJeNy4xLjBcIixcbiAgICBcImJhYmVsaWZ5XCI6IFwiXjYuMC4yXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImF0b21pZnlcIjogXCJhdG9taWZ5XCIsXG4gICAgXCJ0ZXN0XCI6IFwiZWNobyBcXFwiRXJyb3I6IG5vIHRlc3Qgc3BlY2lmaWVkXFxcIiAmJiBleGl0IDEgI3Rlc3RlbSBzdGFydCAtLXNpbmdsZVJ1blwiLFxuICAgIFwiLS0tXCI6IFwiIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIixcbiAgICBcImJ1aWxkOnNjcmlwdHNcIjogXCIjYnJvd3NlcmlmeSAtZCBhc3NldHMvc2NyaXB0cy9tYWluLmpzIC1wIFttaW5pZnlpZnkgLS1jb21wcmVzc1BhdGggLiAtLW1hcCBtYWluLmpzLm1hcCAtLW91dHB1dCBkaXN0L21haW4uanMubWFwXSB8IGhhc2htYXJrIC1uIGRpc3QvbWFpbi5qcyAtcyAtbCA4IC1tIGFzc2V0cy5qc29uICdkaXN0L3tuYW1lfXtoYXNofXtleHR9J1wiLFxuICAgIFwianNjc1wiOiBcIiNqc2NzIGVzaGludCBlc2xpbnQuLi5cIixcbiAgICBcInVnbGlmeVwiOiBcIiN1Z2xpZnlcIixcbiAgICBcInBuZ1wiOiBcIiNvcHRpbWdcIixcbiAgICBcImpwZ1wiOiBcIiNqcGdvXCIsXG4gICAgXCJjc3NtXCI6IFwiI3ljc3NtaW4gKiouY3NzICNjc3NtaW5cIixcbiAgICBcImNzc3ZcIjogXCIjY3NzLXZhbGlkYXRvciAqKi5jc3NcIixcbiAgICBcImNzc3BcIjogXCIjY3NzLXByZXR0aWZpZXIgKiouY3NzXCIsXG4gICAgXCJodG1sXCI6IFwiI2h0bWw1LWxpbnQgKiouaHRtbFwiLFxuICAgIFwiYnVpbGRWXCI6IFwiI3JtIC1yZiBSRUxFQVNFICYmIG1rZGlyIFJFTEVBU0UgJiYgbm9kZSBub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9iaW4vY21kLmpzIFNPVVJDRS9pbmRleC5qcyAtZCAtbyBSRUxFQVNFL2luZGV4LnYkKGNhdCBwYWNrYWdlLmpzb24gfCBncmVwIHZlcnNpb24gfCBncmVwIC1QbyAnKD88PXZlcnNpb25cXFwiOiBcXFwiKS4qKD89XFxcIiknKS5idW5kbGUuanNcIixcbiAgICBcIndhdGNoVlwiOiBcIiNybSAtcmYgUkVMRUFTRSAmJiBta2RpciBSRUxFQVNFICYmIG5vZGUgbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L2Jpbi9jbWQuanMgU09VUkNFL2luZGV4LmpzIC1vIFJFTEVBU0UvaW5kZXgudiQoY2F0IHBhY2thZ2UuanNvbiB8IGdyZXAgdmVyc2lvbiB8IGdyZXAgLVBvICcoPzw9dmVyc2lvblxcXCI6IFxcXCIpLiooPz1cXFwiKScpLmJ1bmRsZS5qc1wiLFxuICAgIFwib3Blbjpwcm9kXCI6IFwiI29wZW5lciBodHRwOi8vZXhhbXBsZS5jb21cIixcbiAgICBcIm9wZW46c3RhZ2VcIjogXCIjb3BlbmVyIGh0dHA6Ly9zdGFnaW5nLmV4YW1wbGUuaW50ZXJuYWxcIixcbiAgICBcIm9wZW46ZGV2XCI6IFwiI29wZW5lciBodHRwOi8vbG9jYWxob3N0OjkwOTBcIixcbiAgICBcImRlcGxveTpwcm9kXCI6IFwiI3MzLWNsaSBzeW5jIC4vZGlzdC8gczM6Ly9leGFtcGxlLWNvbS9wcm9kLXNpdGUvXCIsXG4gICAgXCJkZXBsb3k6c3RhZ2VcIjogXCIjczMtY2xpIHN5bmMgLi9kaXN0LyBzMzovL2V4YW1wbGUtY29tL3N0YWdlLXNpdGUvXCJcbiAgfSxcbiAgXCJhdG9taWZ5XCI6IHtcbiAgICBcInNlcnZlclwiOiB7XG4gICAgICBcIm9wZW5cIjogdHJ1ZSxcbiAgICAgIFwicGF0aFwiOiBcImluZGV4Lmh0bWxcIixcbiAgICAgIFwibHJcIjoge1xuICAgICAgICBcInZlcmJvc2VcIjogdHJ1ZSxcbiAgICAgICAgXCJxdWlldFwiOiBmYWxzZSxcbiAgICAgICAgXCJwb3J0XCI6IDMxMzM3LFxuICAgICAgICBcInN5bmNcIjogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgXCJqc1wiOiB7XG4gICAgICBcImVudHJ5XCI6IFwiU09VUkNFL2luZGV4LmpzXCIsXG4gICAgICBcImFsaWFzXCI6IFwiQlVORExFL2J1bmRsZS5qc1wiLFxuICAgICAgXCJvdXRwdXRcIjogXCJCVU5ETEUvYnVuZGxlLmpzXCIsXG4gICAgICBcImRlYnVnXCI6IHRydWUsXG4gICAgICBcIndhdGNoXCI6IHRydWUsXG4gICAgICBcInRyYW5zZm9ybVwiOiBbXG4gICAgICAgIFwiYmFiZWxpZnlcIlxuICAgICAgXSxcbiAgICAgIFwic3RhbmRhbG9uZVwiOiBcIkFQSVwiXG4gICAgfSxcbiAgICBcImNzc1wiOiB7XG4gICAgICBcImVudHJ5XCI6IFwiU09VUkNFL2luZGV4LmNzc1wiLFxuICAgICAgXCJhbGlhc1wiOiBcIkJVTkRMRS9idW5kbGUuY3NzXCIsXG4gICAgICBcIm91dHB1dFwiOiBcIkJVTkRMRS9idW5kbGUuY3NzXCIsXG4gICAgICBcImRlYnVnXCI6IHRydWUsXG4gICAgICBcIndhdGNoXCI6IHRydWUsXG4gICAgICBcImF1dG9wcmVmaXhlclwiOiB7XG4gICAgICAgIFwiYnJvd3NlcnNcIjogW1xuICAgICAgICAgIFwiPiAxJVwiLFxuICAgICAgICAgIFwiSUUgN1wiXG4gICAgICAgIF0sXG4gICAgICAgIFwiY2FzY2FkZVwiOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIFwiY29tcHJlc3NcIjogZmFsc2UsXG4gICAgICBcInBsdWdpblwiOiBbXVxuICAgIH0sXG4gICAgXCJhc3NldHNcIjoge1xuICAgICAgXCJkZXN0XCI6IFwiQlVORExFL2Fzc2V0cy9cIixcbiAgICAgIFwicHJlZml4XCI6IFwiL0JVTkRMRS9hc3NldHMvXCIsXG4gICAgICBcInJldGFpbk5hbWVcIjogZmFsc2VcbiAgICB9XG4gIH0sXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vd2l6YXJkYW1pZ29zaW5zdGl0dXRlL3dpemFyZGFtaWdvc2luc3RpdHV0ZS5naXRodWIuaW8uZ2l0XCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJ0ZWFjaGluZ1wiLFxuICAgIFwidGVhY2hlclwiLFxuICAgIFwibGVhcm5pbmdcIixcbiAgICBcImphdmFzY3JpcHRcIixcbiAgICBcImJlcmxpblwiLFxuICAgIFwibGVhcm5lclwiLFxuICAgIFwicHJvZ3JhbW1pbmdcIixcbiAgICBcInNjaG9vbFwiLFxuICAgIFwidW5pdmVyc2l0eVwiLFxuICAgIFwiYWNhZGVteVwiLFxuICAgIFwiaW5zdGl0dXRlXCIsXG4gICAgXCJ3aXphcmRcIixcbiAgICBcImFtaWdvc1wiLFxuICAgIFwibm9kZVwiLFxuICAgIFwibm9kZWpzXCIsXG4gICAgXCJodG1sXCIsXG4gICAgXCJjc3NcIlxuICBdLFxuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwic2VyYXBhdGhcIixcbiAgICBcImVtYWlsXCI6IFwiZGV2QHNlcmFwYXRoLmRlXCIsXG4gICAgXCJ1cmxcIjogXCJodHRwOi8vd3d3LmdpdGh1Yi5jb20vc2VyYXBhdGhcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJHTlUgQUdQTFwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3dpemFyZGFtaWdvc2luc3RpdHV0ZS93aXphcmRhbWlnb3NpbnN0aXR1dGUuZ2l0aHViLmlvL2lzc3Vlc1wiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwOi8vd2l6YXJkLmFtaWdvcy5pbnN0aXR1dGVcIlxufVxuIl19
