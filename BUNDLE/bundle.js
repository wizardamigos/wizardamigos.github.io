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
module.exports = '<div class="wizardamigos">\n  <div class="wizardamigos__logo"></div>\n  <div class="wizardamigos__menu"></div>\n  <div class="wizardamigos__intro">\n    <h1 class="wizardamigos__title">Welcome, amigos.</h1>\n    <p class="wizardamigos__subtitle">Come, learn to code with us.</p>\n    Wizard Amigos Institute designs co-learning programming classes.\n    The idea is to create open, friendly & collaborative atmosphere for learners.\n    We are going to try hard to make this learning journey exciting\n    for our future wizard amigos.\n  </div>\n  <div class="wizardamigos__scrolls">\n  <!-- @TODO: convert text content layout to markdown -->\n    <h1 class="wizardamigos__title">Magic Scrolls</h1>\n    <p>\n      We will be covering all the elements that would interest wizard apprentices.\n    </p>\n    Magic spells that we will be covering during our classes:\n    <ul>\n      <li>Operating System\n        <ul><li class="wizardamigos__bullets">unix & bash</li></ul>\n      </li>\n      <li>Collaboration\n        <ul><li class="wizardamigos__bullets">git, github & Co.</li></ul>\n      </li>\n      <li>Markup Languages\n        <ul><li class="wizardamigos__bullets">markdown, html & css</li></ul>\n      </li>\n      <li>Programming\n        <ul><li class="wizardamigos__bullets">javascript & regex</li></ul>\n      </li>\n      <li>DevOps\n        <ul><li class="wizardamigos__bullets">npm & nodejs & browserify</li></ul>\n      </li>\n    </ul>\n  </div>\n  <div class="wizardamigos__schedule">\n  <!-- @TODO: convert text content layout to markdown -->\n    <h1 class="wizardamigos__title">Classes of Magic</h1>\n    <p>\n      Wizard Amigos Institute will start running from <b>May 1, 2015</b> on.\n    </p>\n    <p>\n      Price for the 8 week class is 240 EUR.\n      From each fully paid class we will donate 40 EUR to support the pay-what-you-can program.\n      Feel free to donate more if you want to support this program.\n      If you want to apply for the pay-what-you-can-program, please apply and you will be added to\n      the queue which is served every time a slot is covered.\n    </p>\n    <p>\n      <b>Class of Magic</b> (May 4 - Jun 22, 2015)<br>\n      <b>8x</b> Mondays (16 - 19h)<br>\n      <a target="_blank" href="https://www.google.de/maps/dir//co.up,+Adalbertstra%C3%9Fe+8,+10999+Berlin,+Deutschland/@52.50033,13.419786,17z/data=!4m12!1m3!3m2!1s0x47a84e337e23d413:0x2cfd69e5a9f68f1a!2sco.up!4m7!1m0!1m5!1m1!1s0x47a84e337e23d413:0x2cfd69e5a9f68f1a!2m2!1d13.419786!2d52.50033">Co_up (Adalbertstrasse 8)</a>\n      <a class="wizardamigos__apply" href="#"> APPLY </a>\n    </p>\n    <p>\n      <b>Class of Magic</b> (May 6 - Jun 24, 2015)<br>\n      <b>8x</b> Wednesdays (16 - 19h)<br>\n      <a target="_blank" href="https://www.google.de/maps/dir//St.+Oberholz,+Rosenthaler+Stra%C3%9Fe+72A,+10119+Berlin,+Deutschland/@52.529507,13.401894,17z/data=!4m12!1m3!3m2!1s0x47a851e4644a4b75:0xf49417256487121c!2sSt.+Oberholz!4m7!1m0!1m5!1m1!1s0x47a851e4644a4b75:0xf49417256487121c!2m2!1d13.401894!2d52.529507">St.Oberholz(Rosenthaler Platz)</a>\n      <a class="wizardamigos__apply" href="#"> APPLY </a>\n    </p>\n    <p>\n      <b>Class of Magic</b> (May 14 - Jul 2, 2015)<br>\n      <b>8x</b> Thursdays (16 - 19h)<br>\n      <a target="_blank" href="https://www.google.de/maps/dir//Rungestra%C3%9Fe+20,+10179+Berlin/@52.5124293,13.4195935,17z/data=!4m13!1m4!3m3!1s0x47a84e3b3c6cc001:0xebd08242d893b932!2sRungestra%C3%9Fe+20,+10179+Berlin!3b1!4m7!1m0!1m5!1m1!1s0x47a84e3b3c6cc001:0xebd08242d893b932!2m2!1d13.4195935!2d52.5124293">C-Base (Rungestrasse)</a>\n      <a class="wizardamigos__apply" href="#"> APPLY </a>\n    </p>\n    <p>\n      Each class will last <b>3 full hours</b>. It will accept <b>up to 10\n      learners</b> and will be run by at least 2 higher-level wizards.<br><br>\n      <u>For each meetup</u> we will try to prepare short screencasts and other materials with different assignments.<br>\n      <u>First meeting</u> is going to be informal and will include helping learners get set up with Linux and getting started with some of the basics.\n      The "formal" class part will begin the second week.\n    </p>\n    <p>\n      Hack-and-tell days will also be organised and wizards will be able to share what they are working on there. This will be easy going events where learners will be able to get some feedback and to inspire those who want to join wizard amigos.\n    </p>\n    <p>\n      For all who want to do more there will also be homework so learners will be able to practice their spells.\n      We also encourage all the participants to have some project they want to work on.<br>\n      <i>(but if they don\'t, no worries, will help them find one).</i>\n    </p>\n  </div>\n  <div class="wizardamigos__requirements">\n  <!-- @TODO: convert text content layout to markdown -->\n    <h1 class="wizardamigos__title">Unlocking Charm</h1>\n\n    <p class="wizardamigos__subtitle">\n      There are some requirements for Classes of Magic.\n    </p>\n    <ul>\n      <li>You need to have your own computer. It doesn\'t have to be super powerful, but you need one.<br><br></li>\n      <li>It needs to run on Mac OSX or Linux. If you have Windows, we will help you install Linux.<br><br></li>\n      <li>You also should understand some basic English. Most of the programming materials, tutorials and games are in English.\n        <ul><li class="wizardamigos__bullets"><i>\n        Mentors do speak German (and English is their second language), so you will be able to speak German,\n        but you really have to be able to understand English.</i></li></ul>\n      </li>\n    </ul>\n  </div>\n  <div class="wizardamigos__about">\n  <!-- @TODO: convert text content layout to markdown -->\n    <h1 class="wizardamigos__title">Who is Wizard Amigos Institute for</h1>\n    <p>\n      It is for girls and guys who want to learn special magic programming wizardry.\n      You have to be at least 8yrs old and you should have some basic computer skills.\n    </p>\n    <p>\n      This is not a typical school. It is a Wizard institute that encourages self-learning,\n      collaboration and learning-by-doing approach. We will help you get to know the\n      right magic spells and prepare you to become an active problem solver.\n    </p>\n    <p>\n      If you are not sure whether you should apply,\n      <a href="mailto:wizard@amigos.institute@">contact us</a>\n      and we will quickly send you a reply.\n    </p>\n  </div>\n  <div class="wizardamigos__join">\n  <!-- @TODO: convert text content layout to markdown -->\n    <h1 class="wizardamigos__title">Mad Science</h1>\n    <p><b>Want to join us?</b></p>\n    Do you happen to be a Wizard yourself and would like to help as a teacher or speaker?\n    <p>Go to our <a href="http://wizardamigosinstitute.github.com">Github organization.</a></p>\n    <p>Or chat with us on <a href="https://gitter.im/wizardamigosinstitute/chat">Gitter</a></p>\n  </div>\n</div>\n';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9hdG9taWZ5L25vZGVfbW9kdWxlcy9hdG9taWZ5LWpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zZXJhcGF0aC93b3Jrc3BhY2Uvc2VyYXNlZWQvSE9MRElORy93aXphcmQuYW1pZ29zLmluc3RpdHV0ZS93aXphcmRhbWlnb3NpbnN0aXR1dGUuZ2l0aHViLmlvL1NPVVJDRS9pbmRleC5qcyIsIlNPVVJDRS9pbmRleC50ZW1wbGF0ZS5odG1sIiwiU09VUkNFL25vZGVfbW9kdWxlcy9fY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL2Zhc3Rkb20vaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0Uvbm9kZV9tb2R1bGVzL19jb25maWcuanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9wYWNrYWdlLmpzb24iLCJwYWNrYWdlLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNHQSxZQUFZLENBQUM7O0FBQWIsSUFBTSxPQUFPLEdBQUssT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLElBQU0sT0FBTyxHQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CckMsSUFBTSxNQUFNLEdBQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDdkMsSUFBTSxRQUFRLEdBQUksT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDbkQsSUFBSSxFQUFFLEdBQVksUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OztBQUloRCxNQUFNLENBQUMsT0FBTyxHQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7OztBQUlqRSxTQUFTLHFCQUFxQixDQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBQ3pDLE1BQU0sU0FBUyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRTtBQUMzRCxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLEdBQUcsR0FBRSxFQUFFLENBQUM7Ozs7Ozs7O0FBUWQsU0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksR0FBSTtBQUM3QixPQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzVCLENBQUMsQ0FBQzs7QUFFSCxNQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixTQUFPLEdBQUcsQ0FBQztDQUNaOzs7QUNuREQ7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTID0gQ1VTVE9NIFNESyBbQ3VzdG9tIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdF1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IHdlYnBhZ2UgICA9IHJlcXVpcmUoJ3dlYnBhZ2UnKTtcbmNvbnN0IGZhc3Rkb20gICA9IHJlcXVpcmUoJ2Zhc3Rkb20nKTtcbi8vIHZhciBtaW5peGhyID0gcmVxdWlyZSgnbWluaXhocicpO1xuICAvLyBmdW5jdGlvbiB3aXphcmQgKHBhcmFtZXRlcikgeyB9XG4gIC8vIHRyeSB7XG4gIC8vICAgbWluaXhocih7IHVybDogJ3BhcmFtcy5qc29uJyB9LCBmdW5jdGlvbiAoZXJyb3IsIGRhdGEpIHtcbiAgLy8gICAgIGRlYnVnZ2VyO1xuICAvLyAgICAgYWxlcnQoZXJyb3IpO1xuICAvLyAgICAgYWxlcnQoZGF0YSk7XG4gIC8vICAgfSk7XG4gIC8vIH0gY2F0Y2ggKENPUlNlcnJvcikge1xuICAvLyAgIGFsZXJ0KENPUlNlcnJvcik7XG4gIC8vIH1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgTU9EVUxFIElOVEVSTkFMUyAmIEhFTFBFUlNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IGNvbmZpZyAgICA9IHJlcXVpcmUoJ19jb25maWcnKSgpO1xuY29uc3QgdGVtcGxhdGUgID0gcmVxdWlyZSgnLi9pbmRleC50ZW1wbGF0ZS5odG1sJyk7XG5sZXQgX18gICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSB3aXphcmRhbWlnb3NpbnN0aXR1dGUod2VicGFnZShjb25maWcpLCBjb25maWcpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWEVDVVRJT05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIHdpemFyZGFtaWdvc2luc3RpdHV0ZSAoZG9tLCBkYXRhKSB7IC8vICdkYXRhJyBtYXliZSBhbHNvIHRvIHVzZSBmb3IgZXZlbnQgZGVsZWdhdGlvbiBwYXR0ZXJuXG4gIGNvbnN0IENPTVBPTkVOVCA9IChfXy5pbm5lckhUTUw9dGVtcGxhdGUsX18uY2hpbGROb2Rlc1swXSk7XG4gIGNvbnN0IF9fbG9nbyAgICA9IENPTVBPTkVOVC5xdWVyeVNlbGVjdG9yQWxsKCcud2l6YXJkYW1pZ29zX19sb2dvJylbMF07XG4gIGNvbnN0IF9fbWVudSAgICA9IENPTVBPTkVOVC5xdWVyeVNlbGVjdG9yQWxsKCcud2l6YXJkYW1pZ29zX19tZW51JylbMF07XG4gIGNvbnN0IF9fYSA9Jyc7XG4gIC8qKioqKioqKiBXSVJFIFVQICoqKioqKioqL1xuICAgICAgLy8gX19IZWFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIG9uY2xpY2sgKGV2ZW50KSB7XG4gICAgICAvLyAgIGV2ZW50c3RvcChldmVudCk7XG4gICAgICAvLyAgIGFsZXJ0KCcjc2lnbiB1cCcpO1xuICAgICAgLy8gICByb3V0ZXIoJ2luZGV4Lmh0bWwjc2lnbnVwJyk7XG4gICAgICAvLyB9KTtcbiAgLyoqKioqKiBJTklUSUFMSVpFICoqKioqKiovXG4gIGZhc3Rkb20ud3JpdGUoZnVuY3Rpb24gSU5JVCAoKSB7XG4gICAgZG9tLmFwcGVuZENoaWxkKENPTVBPTkVOVCk7XG4gIH0pO1xuICAvKioqKioqKiogUkVUVVJOICoqKioqKioqKi9cbiAgdmFyIEFQSSA9IHt9OyAvLyBzaG91bGQgYmUgYW4gZXZlbnQgZW1pdHRlciB0b29cbiAgcmV0dXJuIEFQSTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gJzxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NcIj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2xvZ29cIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX21lbnVcIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2ludHJvXCI+XFxuICAgIDxoMSBjbGFzcz1cIndpemFyZGFtaWdvc19fdGl0bGVcIj5XZWxjb21lLCBhbWlnb3MuPC9oMT5cXG4gICAgPHAgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3N1YnRpdGxlXCI+Q29tZSwgbGVhcm4gdG8gY29kZSB3aXRoIHVzLjwvcD5cXG4gICAgV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUgZGVzaWducyBjby1sZWFybmluZyBwcm9ncmFtbWluZyBjbGFzc2VzLlxcbiAgICBUaGUgaWRlYSBpcyB0byBjcmVhdGUgb3BlbiwgZnJpZW5kbHkgJiBjb2xsYWJvcmF0aXZlIGF0bW9zcGhlcmUgZm9yIGxlYXJuZXJzLlxcbiAgICBXZSBhcmUgZ29pbmcgdG8gdHJ5IGhhcmQgdG8gbWFrZSB0aGlzIGxlYXJuaW5nIGpvdXJuZXkgZXhjaXRpbmdcXG4gICAgZm9yIG91ciBmdXR1cmUgd2l6YXJkIGFtaWdvcy5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIndpemFyZGFtaWdvc19fc2Nyb2xsc1wiPlxcbiAgPCEtLSBAVE9ETzogY29udmVydCB0ZXh0IGNvbnRlbnQgbGF5b3V0IHRvIG1hcmtkb3duIC0tPlxcbiAgICA8aDEgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3RpdGxlXCI+TWFnaWMgU2Nyb2xsczwvaDE+XFxuICAgIDxwPlxcbiAgICAgIFdlIHdpbGwgYmUgY292ZXJpbmcgYWxsIHRoZSBlbGVtZW50cyB0aGF0IHdvdWxkIGludGVyZXN0IHdpemFyZCBhcHByZW50aWNlcy5cXG4gICAgPC9wPlxcbiAgICBNYWdpYyBzcGVsbHMgdGhhdCB3ZSB3aWxsIGJlIGNvdmVyaW5nIGR1cmluZyBvdXIgY2xhc3NlczpcXG4gICAgPHVsPlxcbiAgICAgIDxsaT5PcGVyYXRpbmcgU3lzdGVtXFxuICAgICAgICA8dWw+PGxpIGNsYXNzPVwid2l6YXJkYW1pZ29zX19idWxsZXRzXCI+dW5peCAmIGJhc2g8L2xpPjwvdWw+XFxuICAgICAgPC9saT5cXG4gICAgICA8bGk+Q29sbGFib3JhdGlvblxcbiAgICAgICAgPHVsPjxsaSBjbGFzcz1cIndpemFyZGFtaWdvc19fYnVsbGV0c1wiPmdpdCwgZ2l0aHViICYgQ28uPC9saT48L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgICAgPGxpPk1hcmt1cCBMYW5ndWFnZXNcXG4gICAgICAgIDx1bD48bGkgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2J1bGxldHNcIj5tYXJrZG93biwgaHRtbCAmIGNzczwvbGk+PC91bD5cXG4gICAgICA8L2xpPlxcbiAgICAgIDxsaT5Qcm9ncmFtbWluZ1xcbiAgICAgICAgPHVsPjxsaSBjbGFzcz1cIndpemFyZGFtaWdvc19fYnVsbGV0c1wiPmphdmFzY3JpcHQgJiByZWdleDwvbGk+PC91bD5cXG4gICAgICA8L2xpPlxcbiAgICAgIDxsaT5EZXZPcHNcXG4gICAgICAgIDx1bD48bGkgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2J1bGxldHNcIj5ucG0gJiBub2RlanMgJiBicm93c2VyaWZ5PC9saT48L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3NjaGVkdWxlXCI+XFxuICA8IS0tIEBUT0RPOiBjb252ZXJ0IHRleHQgY29udGVudCBsYXlvdXQgdG8gbWFya2Rvd24gLS0+XFxuICAgIDxoMSBjbGFzcz1cIndpemFyZGFtaWdvc19fdGl0bGVcIj5DbGFzc2VzIG9mIE1hZ2ljPC9oMT5cXG4gICAgPHA+XFxuICAgICAgV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUgd2lsbCBzdGFydCBydW5uaW5nIGZyb20gPGI+TWF5IDEsIDIwMTU8L2I+IG9uLlxcbiAgICA8L3A+XFxuICAgIDxwPlxcbiAgICAgIFByaWNlIGZvciB0aGUgOCB3ZWVrIGNsYXNzIGlzIDI0MCBFVVIuXFxuICAgICAgRnJvbSBlYWNoIGZ1bGx5IHBhaWQgY2xhc3Mgd2Ugd2lsbCBkb25hdGUgNDAgRVVSIHRvIHN1cHBvcnQgdGhlIHBheS13aGF0LXlvdS1jYW4gcHJvZ3JhbS5cXG4gICAgICBGZWVsIGZyZWUgdG8gZG9uYXRlIG1vcmUgaWYgeW91IHdhbnQgdG8gc3VwcG9ydCB0aGlzIHByb2dyYW0uXFxuICAgICAgSWYgeW91IHdhbnQgdG8gYXBwbHkgZm9yIHRoZSBwYXktd2hhdC15b3UtY2FuLXByb2dyYW0sIHBsZWFzZSBhcHBseSBhbmQgeW91IHdpbGwgYmUgYWRkZWQgdG9cXG4gICAgICB0aGUgcXVldWUgd2hpY2ggaXMgc2VydmVkIGV2ZXJ5IHRpbWUgYSBzbG90IGlzIGNvdmVyZWQuXFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgPGI+Q2xhc3Mgb2YgTWFnaWM8L2I+IChNYXkgNCAtIEp1biAyMiwgMjAxNSk8YnI+XFxuICAgICAgPGI+OHg8L2I+IE1vbmRheXMgKDE2IC0gMTloKTxicj5cXG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLmRlL21hcHMvZGlyLy9jby51cCwrQWRhbGJlcnRzdHJhJUMzJTlGZSs4LCsxMDk5OStCZXJsaW4sK0RldXRzY2hsYW5kL0A1Mi41MDAzMywxMy40MTk3ODYsMTd6L2RhdGE9ITRtMTIhMW0zITNtMiExczB4NDdhODRlMzM3ZTIzZDQxMzoweDJjZmQ2OWU1YTlmNjhmMWEhMnNjby51cCE0bTchMW0wITFtNSExbTEhMXMweDQ3YTg0ZTMzN2UyM2Q0MTM6MHgyY2ZkNjllNWE5ZjY4ZjFhITJtMiExZDEzLjQxOTc4NiEyZDUyLjUwMDMzXCI+Q29fdXAgKEFkYWxiZXJ0c3RyYXNzZSA4KTwvYT5cXG4gICAgICA8YSBjbGFzcz1cIndpemFyZGFtaWdvc19fYXBwbHlcIiBocmVmPVwiI1wiPiBBUFBMWSA8L2E+XFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgPGI+Q2xhc3Mgb2YgTWFnaWM8L2I+IChNYXkgNiAtIEp1biAyNCwgMjAxNSk8YnI+XFxuICAgICAgPGI+OHg8L2I+IFdlZG5lc2RheXMgKDE2IC0gMTloKTxicj5cXG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLmRlL21hcHMvZGlyLy9TdC4rT2JlcmhvbHosK1Jvc2VudGhhbGVyK1N0cmElQzMlOUZlKzcyQSwrMTAxMTkrQmVybGluLCtEZXV0c2NobGFuZC9ANTIuNTI5NTA3LDEzLjQwMTg5NCwxN3ovZGF0YT0hNG0xMiExbTMhM20yITFzMHg0N2E4NTFlNDY0NGE0Yjc1OjB4ZjQ5NDE3MjU2NDg3MTIxYyEyc1N0LitPYmVyaG9seiE0bTchMW0wITFtNSExbTEhMXMweDQ3YTg1MWU0NjQ0YTRiNzU6MHhmNDk0MTcyNTY0ODcxMjFjITJtMiExZDEzLjQwMTg5NCEyZDUyLjUyOTUwN1wiPlN0Lk9iZXJob2x6KFJvc2VudGhhbGVyIFBsYXR6KTwvYT5cXG4gICAgICA8YSBjbGFzcz1cIndpemFyZGFtaWdvc19fYXBwbHlcIiBocmVmPVwiI1wiPiBBUFBMWSA8L2E+XFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgPGI+Q2xhc3Mgb2YgTWFnaWM8L2I+IChNYXkgMTQgLSBKdWwgMiwgMjAxNSk8YnI+XFxuICAgICAgPGI+OHg8L2I+IFRodXJzZGF5cyAoMTYgLSAxOWgpPGJyPlxcbiAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5nb29nbGUuZGUvbWFwcy9kaXIvL1J1bmdlc3RyYSVDMyU5RmUrMjAsKzEwMTc5K0Jlcmxpbi9ANTIuNTEyNDI5MywxMy40MTk1OTM1LDE3ei9kYXRhPSE0bTEzITFtNCEzbTMhMXMweDQ3YTg0ZTNiM2M2Y2MwMDE6MHhlYmQwODI0MmQ4OTNiOTMyITJzUnVuZ2VzdHJhJUMzJTlGZSsyMCwrMTAxNzkrQmVybGluITNiMSE0bTchMW0wITFtNSExbTEhMXMweDQ3YTg0ZTNiM2M2Y2MwMDE6MHhlYmQwODI0MmQ4OTNiOTMyITJtMiExZDEzLjQxOTU5MzUhMmQ1Mi41MTI0MjkzXCI+Qy1CYXNlIChSdW5nZXN0cmFzc2UpPC9hPlxcbiAgICAgIDxhIGNsYXNzPVwid2l6YXJkYW1pZ29zX19hcHBseVwiIGhyZWY9XCIjXCI+IEFQUExZIDwvYT5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICBFYWNoIGNsYXNzIHdpbGwgbGFzdCA8Yj4zIGZ1bGwgaG91cnM8L2I+LiBJdCB3aWxsIGFjY2VwdCA8Yj51cCB0byAxMFxcbiAgICAgIGxlYXJuZXJzPC9iPiBhbmQgd2lsbCBiZSBydW4gYnkgYXQgbGVhc3QgMiBoaWdoZXItbGV2ZWwgd2l6YXJkcy48YnI+PGJyPlxcbiAgICAgIDx1PkZvciBlYWNoIG1lZXR1cDwvdT4gd2Ugd2lsbCB0cnkgdG8gcHJlcGFyZSBzaG9ydCBzY3JlZW5jYXN0cyBhbmQgb3RoZXIgbWF0ZXJpYWxzIHdpdGggZGlmZmVyZW50IGFzc2lnbm1lbnRzLjxicj5cXG4gICAgICA8dT5GaXJzdCBtZWV0aW5nPC91PiBpcyBnb2luZyB0byBiZSBpbmZvcm1hbCBhbmQgd2lsbCBpbmNsdWRlIGhlbHBpbmcgbGVhcm5lcnMgZ2V0IHNldCB1cCB3aXRoIExpbnV4IGFuZCBnZXR0aW5nIHN0YXJ0ZWQgd2l0aCBzb21lIG9mIHRoZSBiYXNpY3MuXFxuICAgICAgVGhlIFwiZm9ybWFsXCIgY2xhc3MgcGFydCB3aWxsIGJlZ2luIHRoZSBzZWNvbmQgd2Vlay5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICBIYWNrLWFuZC10ZWxsIGRheXMgd2lsbCBhbHNvIGJlIG9yZ2FuaXNlZCBhbmQgd2l6YXJkcyB3aWxsIGJlIGFibGUgdG8gc2hhcmUgd2hhdCB0aGV5IGFyZSB3b3JraW5nIG9uIHRoZXJlLiBUaGlzIHdpbGwgYmUgZWFzeSBnb2luZyBldmVudHMgd2hlcmUgbGVhcm5lcnMgd2lsbCBiZSBhYmxlIHRvIGdldCBzb21lIGZlZWRiYWNrIGFuZCB0byBpbnNwaXJlIHRob3NlIHdobyB3YW50IHRvIGpvaW4gd2l6YXJkIGFtaWdvcy5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICBGb3IgYWxsIHdobyB3YW50IHRvIGRvIG1vcmUgdGhlcmUgd2lsbCBhbHNvIGJlIGhvbWV3b3JrIHNvIGxlYXJuZXJzIHdpbGwgYmUgYWJsZSB0byBwcmFjdGljZSB0aGVpciBzcGVsbHMuXFxuICAgICAgV2UgYWxzbyBlbmNvdXJhZ2UgYWxsIHRoZSBwYXJ0aWNpcGFudHMgdG8gaGF2ZSBzb21lIHByb2plY3QgdGhleSB3YW50IHRvIHdvcmsgb24uPGJyPlxcbiAgICAgIDxpPihidXQgaWYgdGhleSBkb25cXCd0LCBubyB3b3JyaWVzLCB3aWxsIGhlbHAgdGhlbSBmaW5kIG9uZSkuPC9pPlxcbiAgICA8L3A+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3JlcXVpcmVtZW50c1wiPlxcbiAgPCEtLSBAVE9ETzogY29udmVydCB0ZXh0IGNvbnRlbnQgbGF5b3V0IHRvIG1hcmtkb3duIC0tPlxcbiAgICA8aDEgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3RpdGxlXCI+VW5sb2NraW5nIENoYXJtPC9oMT5cXG5cXG4gICAgPHAgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3N1YnRpdGxlXCI+XFxuICAgICAgVGhlcmUgYXJlIHNvbWUgcmVxdWlyZW1lbnRzIGZvciBDbGFzc2VzIG9mIE1hZ2ljLlxcbiAgICA8L3A+XFxuICAgIDx1bD5cXG4gICAgICA8bGk+WW91IG5lZWQgdG8gaGF2ZSB5b3VyIG93biBjb21wdXRlci4gSXQgZG9lc25cXCd0IGhhdmUgdG8gYmUgc3VwZXIgcG93ZXJmdWwsIGJ1dCB5b3UgbmVlZCBvbmUuPGJyPjxicj48L2xpPlxcbiAgICAgIDxsaT5JdCBuZWVkcyB0byBydW4gb24gTWFjIE9TWCBvciBMaW51eC4gSWYgeW91IGhhdmUgV2luZG93cywgd2Ugd2lsbCBoZWxwIHlvdSBpbnN0YWxsIExpbnV4Ljxicj48YnI+PC9saT5cXG4gICAgICA8bGk+WW91IGFsc28gc2hvdWxkIHVuZGVyc3RhbmQgc29tZSBiYXNpYyBFbmdsaXNoLiBNb3N0IG9mIHRoZSBwcm9ncmFtbWluZyBtYXRlcmlhbHMsIHR1dG9yaWFscyBhbmQgZ2FtZXMgYXJlIGluIEVuZ2xpc2guXFxuICAgICAgICA8dWw+PGxpIGNsYXNzPVwid2l6YXJkYW1pZ29zX19idWxsZXRzXCI+PGk+XFxuICAgICAgICBNZW50b3JzIGRvIHNwZWFrIEdlcm1hbiAoYW5kIEVuZ2xpc2ggaXMgdGhlaXIgc2Vjb25kIGxhbmd1YWdlKSwgc28geW91IHdpbGwgYmUgYWJsZSB0byBzcGVhayBHZXJtYW4sXFxuICAgICAgICBidXQgeW91IHJlYWxseSBoYXZlIHRvIGJlIGFibGUgdG8gdW5kZXJzdGFuZCBFbmdsaXNoLjwvaT48L2xpPjwvdWw+XFxuICAgICAgPC9saT5cXG4gICAgPC91bD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIndpemFyZGFtaWdvc19fYWJvdXRcIj5cXG4gIDwhLS0gQFRPRE86IGNvbnZlcnQgdGV4dCBjb250ZW50IGxheW91dCB0byBtYXJrZG93biAtLT5cXG4gICAgPGgxIGNsYXNzPVwid2l6YXJkYW1pZ29zX190aXRsZVwiPldobyBpcyBXaXphcmQgQW1pZ29zIEluc3RpdHV0ZSBmb3I8L2gxPlxcbiAgICA8cD5cXG4gICAgICBJdCBpcyBmb3IgZ2lybHMgYW5kIGd1eXMgd2hvIHdhbnQgdG8gbGVhcm4gc3BlY2lhbCBtYWdpYyBwcm9ncmFtbWluZyB3aXphcmRyeS5cXG4gICAgICBZb3UgaGF2ZSB0byBiZSBhdCBsZWFzdCA4eXJzIG9sZCBhbmQgeW91IHNob3VsZCBoYXZlIHNvbWUgYmFzaWMgY29tcHV0ZXIgc2tpbGxzLlxcbiAgICA8L3A+XFxuICAgIDxwPlxcbiAgICAgIFRoaXMgaXMgbm90IGEgdHlwaWNhbCBzY2hvb2wuIEl0IGlzIGEgV2l6YXJkIGluc3RpdHV0ZSB0aGF0IGVuY291cmFnZXMgc2VsZi1sZWFybmluZyxcXG4gICAgICBjb2xsYWJvcmF0aW9uIGFuZCBsZWFybmluZy1ieS1kb2luZyBhcHByb2FjaC4gV2Ugd2lsbCBoZWxwIHlvdSBnZXQgdG8ga25vdyB0aGVcXG4gICAgICByaWdodCBtYWdpYyBzcGVsbHMgYW5kIHByZXBhcmUgeW91IHRvIGJlY29tZSBhbiBhY3RpdmUgcHJvYmxlbSBzb2x2ZXIuXFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgSWYgeW91IGFyZSBub3Qgc3VyZSB3aGV0aGVyIHlvdSBzaG91bGQgYXBwbHksXFxuICAgICAgPGEgaHJlZj1cIm1haWx0bzp3aXphcmRAYW1pZ29zLmluc3RpdHV0ZUBcIj5jb250YWN0IHVzPC9hPlxcbiAgICAgIGFuZCB3ZSB3aWxsIHF1aWNrbHkgc2VuZCB5b3UgYSByZXBseS5cXG4gICAgPC9wPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zX19qb2luXCI+XFxuICA8IS0tIEBUT0RPOiBjb252ZXJ0IHRleHQgY29udGVudCBsYXlvdXQgdG8gbWFya2Rvd24gLS0+XFxuICAgIDxoMSBjbGFzcz1cIndpemFyZGFtaWdvc19fdGl0bGVcIj5NYWQgU2NpZW5jZTwvaDE+XFxuICAgIDxwPjxiPldhbnQgdG8gam9pbiB1cz88L2I+PC9wPlxcbiAgICBEbyB5b3UgaGFwcGVuIHRvIGJlIGEgV2l6YXJkIHlvdXJzZWxmIGFuZCB3b3VsZCBsaWtlIHRvIGhlbHAgYXMgYSB0ZWFjaGVyIG9yIHNwZWFrZXI/XFxuICAgIDxwPkdvIHRvIG91ciA8YSBocmVmPVwiaHR0cDovL3dpemFyZGFtaWdvc2luc3RpdHV0ZS5naXRodWIuY29tXCI+R2l0aHViIG9yZ2FuaXphdGlvbi48L2E+PC9wPlxcbiAgICA8cD5PciBjaGF0IHdpdGggdXMgb24gPGEgaHJlZj1cImh0dHBzOi8vZ2l0dGVyLmltL3dpemFyZGFtaWdvc2luc3RpdHV0ZS9jaGF0XCI+R2l0dGVyPC9hPjwvcD5cXG4gIDwvZGl2PlxcbjwvZGl2Plxcbic7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBERVBFTkRFTkNJRVNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBwa2cgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpO1xuLy8gdmFyIHBhcmFtcyAgICAgID0gcmVxdWlyZSgnJykgdHJ5IGxvYWQgZmlsZXMgaW4gaWZyYW1lIGFuZCBzY3JhcGUgaXQgdG8gY2lyY3VtdmVudCBDT1JTXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9pZnJhbWUtYXBpXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaSB0b29sXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIE1PRFVMRSBJTlRFUk5BTFMgJiBIRUxQRVJTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX2NvbmZpZyAgICAgPSB7XG4gIHRpdGxlICAgICAgIDogJ1dpemFyZCBBbWlnb3MgSW5zdGl0dXRlJyxcbiAgZGVzY3JpcHRpb24gOiBwa2cuZGVzY3JpcHRpb24sXG4gIHZlcnNpb24gICAgIDogcGtnLnZlcnNpb24sXG4gIGtleXdvcmRzICAgIDogcGtnLmtleXdvcmRzLmpvaW4oJywgJyksXG4gIGF1dGhvciAgICAgIDogcGtnLmF1dGhvci5uYW1lLFxuICB3ZWJzaXRlICAgICA6IHBrZy5ob21lcGFnZSxcbiAgc3R5bGUgICAgICAgOiBwa2cuYXRvbWlmeS5jc3Mub3V0cHV0XG59O1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWFBPUlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbm1vZHVsZS5leHBvcnRzICA9IGNvbmZpZztcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhFQ1VUSU9OXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBjb25maWcgKGtleSkge1xuICByZXR1cm4ga2V5ID8gX2NvbmZpZ1trZXldIDogX2NvbmZpZztcbn1cbiIsIi8qKlxuICogRmFzdERvbVxuICpcbiAqIEVsaW1pbmF0ZXMgbGF5b3V0IHRocmFzaGluZ1xuICogYnkgYmF0Y2hpbmcgRE9NIHJlYWQvd3JpdGVcbiAqIGludGVyYWN0aW9ucy5cbiAqXG4gKiBAYXV0aG9yIFdpbHNvbiBQYWdlIDx3aWxzb25wYWdlQG1lLmNvbT5cbiAqL1xuXG47KGZ1bmN0aW9uKGZhc3Rkb20pe1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBOb3JtYWxpemUgckFGXG4gIHZhciByYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCBmdW5jdGlvbihjYikgeyByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoY2IsIDEwMDAgLyA2MCk7IH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmcmVzaFxuICAgKiBGYXN0RG9tIGluc3RhbmNlLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIEZhc3REb20oKSB7XG4gICAgdGhpcy5mcmFtZXMgPSBbXTtcbiAgICB0aGlzLmxhc3RJZCA9IDA7XG5cbiAgICAvLyBQbGFjaW5nIHRoZSByQUYgbWV0aG9kXG4gICAgLy8gb24gdGhlIGluc3RhbmNlIGFsbG93c1xuICAgIC8vIHVzIHRvIHJlcGxhY2UgaXQgd2l0aFxuICAgIC8vIGEgc3R1YiBmb3IgdGVzdGluZy5cbiAgICB0aGlzLnJhZiA9IHJhZjtcblxuICAgIHRoaXMuYmF0Y2ggPSB7XG4gICAgICBoYXNoOiB7fSxcbiAgICAgIHJlYWQ6IFtdLFxuICAgICAgd3JpdGU6IFtdLFxuICAgICAgbW9kZTogbnVsbFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGpvYiB0byB0aGVcbiAgICogcmVhZCBiYXRjaCBhbmQgc2NoZWR1bGVzXG4gICAqIGEgbmV3IGZyYW1lIGlmIG5lZWQgYmUuXG4gICAqXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICAgKiBAcHVibGljXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24oZm4sIGN0eCkge1xuICAgIHZhciBqb2IgPSB0aGlzLmFkZCgncmVhZCcsIGZuLCBjdHgpO1xuICAgIHZhciBpZCA9IGpvYi5pZDtcblxuICAgIC8vIEFkZCB0aGlzIGpvYiB0byB0aGUgcmVhZCBxdWV1ZVxuICAgIHRoaXMuYmF0Y2gucmVhZC5wdXNoKGpvYi5pZCk7XG5cbiAgICAvLyBXZSBzaG91bGQgKm5vdCogc2NoZWR1bGUgYSBuZXcgZnJhbWUgaWY6XG4gICAgLy8gMS4gV2UncmUgJ3JlYWRpbmcnXG4gICAgLy8gMi4gQSBmcmFtZSBpcyBhbHJlYWR5IHNjaGVkdWxlZFxuICAgIHZhciBkb2VzbnROZWVkRnJhbWUgPSB0aGlzLmJhdGNoLm1vZGUgPT09ICdyZWFkaW5nJ1xuICAgICAgfHwgdGhpcy5iYXRjaC5zY2hlZHVsZWQ7XG5cbiAgICAvLyBJZiBhIGZyYW1lIGlzbid0IG5lZWRlZCwgcmV0dXJuXG4gICAgaWYgKGRvZXNudE5lZWRGcmFtZSkgcmV0dXJuIGlkO1xuXG4gICAgLy8gU2NoZWR1bGUgYSBuZXdcbiAgICAvLyBmcmFtZSwgdGhlbiByZXR1cm5cbiAgICB0aGlzLnNjaGVkdWxlQmF0Y2goKTtcbiAgICByZXR1cm4gaWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBqb2IgdG8gdGhlXG4gICAqIHdyaXRlIGJhdGNoIGFuZCBzY2hlZHVsZXNcbiAgICogYSBuZXcgZnJhbWUgaWYgbmVlZCBiZS5cbiAgICpcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oZm4sIGN0eCkge1xuICAgIHZhciBqb2IgPSB0aGlzLmFkZCgnd3JpdGUnLCBmbiwgY3R4KTtcbiAgICB2YXIgbW9kZSA9IHRoaXMuYmF0Y2gubW9kZTtcbiAgICB2YXIgaWQgPSBqb2IuaWQ7XG5cbiAgICAvLyBQdXNoIHRoZSBqb2IgaWQgaW50byB0aGUgcXVldWVcbiAgICB0aGlzLmJhdGNoLndyaXRlLnB1c2goam9iLmlkKTtcblxuICAgIC8vIFdlIHNob3VsZCAqbm90KiBzY2hlZHVsZSBhIG5ldyBmcmFtZSBpZjpcbiAgICAvLyAxLiBXZSBhcmUgJ3dyaXRpbmcnXG4gICAgLy8gMi4gV2UgYXJlICdyZWFkaW5nJ1xuICAgIC8vIDMuIEEgZnJhbWUgaXMgYWxyZWFkeSBzY2hlZHVsZWQuXG4gICAgdmFyIGRvZXNudE5lZWRGcmFtZSA9IG1vZGUgPT09ICd3cml0aW5nJ1xuICAgICAgfHwgbW9kZSA9PT0gJ3JlYWRpbmcnXG4gICAgICB8fCB0aGlzLmJhdGNoLnNjaGVkdWxlZDtcblxuICAgIC8vIElmIGEgZnJhbWUgaXNuJ3QgbmVlZGVkLCByZXR1cm5cbiAgICBpZiAoZG9lc250TmVlZEZyYW1lKSByZXR1cm4gaWQ7XG5cbiAgICAvLyBTY2hlZHVsZSBhIG5ld1xuICAgIC8vIGZyYW1lLCB0aGVuIHJldHVyblxuICAgIHRoaXMuc2NoZWR1bGVCYXRjaCgpO1xuICAgIHJldHVybiBpZDtcbiAgfTtcblxuICAvKipcbiAgICogRGVmZXJzIHRoZSBnaXZlbiBqb2JcbiAgICogYnkgdGhlIG51bWJlciBvZiBmcmFtZXNcbiAgICogc3BlY2lmaWVkLlxuICAgKlxuICAgKiBJZiBubyBmcmFtZXMgYXJlIGdpdmVuXG4gICAqIHRoZW4gdGhlIGpvYiBpcyBydW4gaW5cbiAgICogdGhlIG5leHQgZnJlZSBmcmFtZS5cbiAgICpcbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIGZyYW1lXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICAgKiBAcHVibGljXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5kZWZlciA9IGZ1bmN0aW9uKGZyYW1lLCBmbiwgY3R4KSB7XG5cbiAgICAvLyBBY2NlcHRzIHR3byBhcmd1bWVudHNcbiAgICBpZiAodHlwZW9mIGZyYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjdHggPSBmbjtcbiAgICAgIGZuID0gZnJhbWU7XG4gICAgICBmcmFtZSA9IDE7XG4gICAgfVxuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBpbmRleCA9IGZyYW1lIC0gMTtcblxuICAgIHJldHVybiB0aGlzLnNjaGVkdWxlKGluZGV4LCBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYucnVuKHtcbiAgICAgICAgZm46IGZuLFxuICAgICAgICBjdHg6IGN0eFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFycyBhIHNjaGVkdWxlZCAncmVhZCcsXG4gICAqICd3cml0ZScgb3IgJ2RlZmVyJyBqb2IuXG4gICAqXG4gICAqIEBwYXJhbSAge051bWJlcnxTdHJpbmd9IGlkXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oaWQpIHtcblxuICAgIC8vIERlZmVyIGpvYnMgYXJlIGNsZWFyZWQgZGlmZmVyZW50bHlcbiAgICBpZiAodHlwZW9mIGlkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy5jbGVhckZyYW1lKGlkKTtcbiAgICB9XG5cbiAgICAvLyBBbGxvdyBpZHMgdG8gYmUgcGFzc2VkIGFzIHN0cmluZ3NcbiAgICBpZCA9IE51bWJlcihpZCk7XG5cbiAgICB2YXIgam9iID0gdGhpcy5iYXRjaC5oYXNoW2lkXTtcbiAgICBpZiAoIWpvYikgcmV0dXJuO1xuXG4gICAgdmFyIGxpc3QgPSB0aGlzLmJhdGNoW2pvYi50eXBlXTtcbiAgICB2YXIgaW5kZXggPSBsaXN0LmluZGV4T2YoaWQpO1xuXG4gICAgLy8gQ2xlYXIgcmVmZXJlbmNlc1xuICAgIGRlbGV0ZSB0aGlzLmJhdGNoLmhhc2hbaWRdO1xuICAgIGlmICh+aW5kZXgpIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXJzIGEgc2NoZWR1bGVkIGZyYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZnJhbWVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLmNsZWFyRnJhbWUgPSBmdW5jdGlvbihmcmFtZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMuZnJhbWVzLmluZGV4T2YoZnJhbWUpO1xuICAgIGlmICh+aW5kZXgpIHRoaXMuZnJhbWVzLnNwbGljZShpbmRleCwgMSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNjaGVkdWxlcyBhIG5ldyByZWFkL3dyaXRlXG4gICAqIGJhdGNoIGlmIG9uZSBpc24ndCBwZW5kaW5nLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuc2NoZWR1bGVCYXRjaCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFNjaGVkdWxlIGJhdGNoIGZvciBuZXh0IGZyYW1lXG4gICAgdGhpcy5zY2hlZHVsZSgwLCBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuYmF0Y2guc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICBzZWxmLnJ1bkJhdGNoKCk7XG4gICAgfSk7XG5cbiAgICAvLyBTZXQgZmxhZyB0byBpbmRpY2F0ZVxuICAgIC8vIGEgZnJhbWUgaGFzIGJlZW4gc2NoZWR1bGVkXG4gICAgdGhpcy5iYXRjaC5zY2hlZHVsZWQgPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSB1bmlxdWVcbiAgICogaWQgZm9yIGEgam9iLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS51bmlxdWVJZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiArK3RoaXMubGFzdElkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxscyBlYWNoIGpvYiBpblxuICAgKiB0aGUgbGlzdCBwYXNzZWQuXG4gICAqXG4gICAqIElmIGEgY29udGV4dCBoYXMgYmVlblxuICAgKiBzdG9yZWQgb24gdGhlIGZ1bmN0aW9uXG4gICAqIHRoZW4gaXQgaXMgdXNlZCwgZWxzZSB0aGVcbiAgICogY3VycmVudCBgdGhpc2AgaXMgdXNlZC5cbiAgICpcbiAgICogQHBhcmFtICB7QXJyYXl9IGxpc3RcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24obGlzdCkge1xuICAgIHZhciBpZDtcblxuICAgIHdoaWxlIChpZCA9IGxpc3Quc2hpZnQoKSkge1xuICAgICAgdGhpcy5ydW4odGhpcy5iYXRjaC5oYXNoW2lkXSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSdW5zIGFueSAncmVhZCcgam9icyBmb2xsb3dlZFxuICAgKiBieSBhbnkgJ3dyaXRlJyBqb2JzLlxuICAgKlxuICAgKiBXZSBydW4gdGhpcyBpbnNpZGUgYSB0cnkgY2F0Y2hcbiAgICogc28gdGhhdCBpZiBhbnkgam9icyBlcnJvciwgd2VcbiAgICogYXJlIGFibGUgdG8gcmVjb3ZlciBhbmQgY29udGludWVcbiAgICogdG8gZmx1c2ggdGhlIGJhdGNoIHVudGlsIGl0J3MgZW1wdHkuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5ydW5CYXRjaCA9IGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG5cbiAgICAgIC8vIFNldCB0aGUgbW9kZSB0byAncmVhZGluZycsXG4gICAgICAvLyB0aGVuIGVtcHR5IGFsbCByZWFkIGpvYnNcbiAgICAgIHRoaXMuYmF0Y2gubW9kZSA9ICdyZWFkaW5nJztcbiAgICAgIHRoaXMuZmx1c2godGhpcy5iYXRjaC5yZWFkKTtcblxuICAgICAgLy8gU2V0IHRoZSBtb2RlIHRvICd3cml0aW5nJ1xuICAgICAgLy8gdGhlbiBlbXB0eSBhbGwgd3JpdGUgam9ic1xuICAgICAgdGhpcy5iYXRjaC5tb2RlID0gJ3dyaXRpbmcnO1xuICAgICAgdGhpcy5mbHVzaCh0aGlzLmJhdGNoLndyaXRlKTtcblxuICAgICAgdGhpcy5iYXRjaC5tb2RlID0gbnVsbDtcblxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMucnVuQmF0Y2goKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IGpvYiB0b1xuICAgKiB0aGUgZ2l2ZW4gYmF0Y2guXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9ICAgbGlzdFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcGFyYW0ge09iamVjdH0gICBjdHhcbiAgICogQHJldHVybnMge051bWJlcn0gaWRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHR5cGUsIGZuLCBjdHgpIHtcbiAgICB2YXIgaWQgPSB0aGlzLnVuaXF1ZUlkKCk7XG4gICAgcmV0dXJuIHRoaXMuYmF0Y2guaGFzaFtpZF0gPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmbjogZm4sXG4gICAgICBjdHg6IGN0eCxcbiAgICAgIHR5cGU6IHR5cGVcbiAgICB9O1xuICB9O1xuXG4gIC8qKlxuICAgKiBSdW5zIGEgZ2l2ZW4gam9iLlxuICAgKlxuICAgKiBBcHBsaWNhdGlvbnMgdXNpbmcgRmFzdERvbVxuICAgKiBoYXZlIHRoZSBvcHRpb25zIG9mIHNldHRpbmdcbiAgICogYGZhc3Rkb20ub25FcnJvcmAuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBjYXRjaCBhbnlcbiAgICogZXJyb3JzIHRoYXQgbWF5IHRocm93XG4gICAqIGluc2lkZSBjYWxsYmFja3MsIHdoaWNoXG4gICAqIGlzIHVzZWZ1bCBhcyBvZnRlbiBET01cbiAgICogbm9kZXMgaGF2ZSBiZWVuIHJlbW92ZWRcbiAgICogc2luY2UgYSBqb2Igd2FzIHNjaGVkdWxlZC5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICpcbiAgICogICBmYXN0ZG9tLm9uRXJyb3IgPSBmdW5jdGlvbihlKSB7XG4gICAqICAgICAvLyBSdW5zIHdoZW4gam9icyBlcnJvclxuICAgKiAgIH07XG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gam9iXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbihqb2Ipe1xuICAgIHZhciBjdHggPSBqb2IuY3R4IHx8IHRoaXM7XG4gICAgdmFyIGZuID0gam9iLmZuO1xuXG4gICAgLy8gQ2xlYXIgcmVmZXJlbmNlIHRvIHRoZSBqb2JcbiAgICBkZWxldGUgdGhpcy5iYXRjaC5oYXNoW2pvYi5pZF07XG5cbiAgICAvLyBJZiBubyBgb25FcnJvcmAgaGFuZGxlclxuICAgIC8vIGhhcyBiZWVuIHJlZ2lzdGVyZWQsIGp1c3RcbiAgICAvLyBydW4gdGhlIGpvYiBub3JtYWxseS5cbiAgICBpZiAoIXRoaXMub25FcnJvcikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwoY3R4KTtcbiAgICB9XG5cbiAgICAvLyBJZiBhbiBgb25FcnJvcmAgaGFuZGxlclxuICAgIC8vIGhhcyBiZWVuIHJlZ2lzdGVyZWQsIGNhdGNoXG4gICAgLy8gZXJyb3JzIHRoYXQgdGhyb3cgaW5zaWRlXG4gICAgLy8gY2FsbGJhY2tzLCBhbmQgcnVuIHRoZVxuICAgIC8vIGhhbmRsZXIgaW5zdGVhZC5cbiAgICB0cnkgeyBmbi5jYWxsKGN0eCk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMub25FcnJvcihlKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIHJBRiBsb29wXG4gICAqIHRvIGVtcHR5IHRoZSBmcmFtZSBxdWV1ZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHJhZiA9IHRoaXMucmFmO1xuXG4gICAgLy8gRG9uJ3Qgc3RhcnQgbW9yZSB0aGFuIG9uZSBsb29wXG4gICAgaWYgKHRoaXMubG9vcGluZykgcmV0dXJuO1xuXG4gICAgcmFmKGZ1bmN0aW9uIGZyYW1lKCkge1xuICAgICAgdmFyIGZuID0gc2VsZi5mcmFtZXMuc2hpZnQoKTtcblxuICAgICAgLy8gSWYgbm8gbW9yZSBmcmFtZXMsXG4gICAgICAvLyBzdG9wIGxvb3BpbmdcbiAgICAgIGlmICghc2VsZi5mcmFtZXMubGVuZ3RoKSB7XG4gICAgICAgIHNlbGYubG9vcGluZyA9IGZhbHNlO1xuXG4gICAgICAvLyBPdGhlcndpc2UsIHNjaGVkdWxlIHRoZVxuICAgICAgLy8gbmV4dCBmcmFtZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmFmKGZyYW1lKTtcbiAgICAgIH1cblxuICAgICAgLy8gUnVuIHRoZSBmcmFtZS4gIE5vdGUgdGhhdFxuICAgICAgLy8gdGhpcyBtYXkgdGhyb3cgYW4gZXJyb3JcbiAgICAgIC8vIGluIHVzZXIgY29kZSwgYnV0IGFsbFxuICAgICAgLy8gZmFzdGRvbSB0YXNrcyBhcmUgZGVhbHRcbiAgICAgIC8vIHdpdGggYWxyZWFkeSBzbyB0aGUgY29kZVxuICAgICAgLy8gd2lsbCBjb250aW51ZSB0byBpdGVyYXRlXG4gICAgICBpZiAoZm4pIGZuKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxvb3BpbmcgPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgZnVuY3Rpb24gdG9cbiAgICogYSBzcGVjaWZpZWQgaW5kZXhcbiAgICogb2YgdGhlIGZyYW1lIHF1ZXVlLlxuICAgKlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgaW5kZXhcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbihpbmRleCwgZm4pIHtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGlzIHNsb3RcbiAgICAvLyBoYXNuJ3QgYWxyZWFkeSBiZWVuXG4gICAgLy8gdGFrZW4uIElmIGl0IGhhcywgdHJ5XG4gICAgLy8gcmUtc2NoZWR1bGluZyBmb3IgdGhlIG5leHQgc2xvdFxuICAgIGlmICh0aGlzLmZyYW1lc1tpbmRleF0pIHtcbiAgICAgIHJldHVybiB0aGlzLnNjaGVkdWxlKGluZGV4ICsgMSwgZm4pO1xuICAgIH1cblxuICAgIC8vIFN0YXJ0IHRoZSByQUZcbiAgICAvLyBsb29wIHRvIGVtcHR5XG4gICAgLy8gdGhlIGZyYW1lIHF1ZXVlXG4gICAgdGhpcy5sb29wKCk7XG5cbiAgICAvLyBJbnNlcnQgdGhpcyBmdW5jdGlvbiBpbnRvXG4gICAgLy8gdGhlIGZyYW1lcyBxdWV1ZSBhbmQgcmV0dXJuXG4gICAgcmV0dXJuIHRoaXMuZnJhbWVzW2luZGV4XSA9IGZuO1xuICB9O1xuXG4gIC8vIFdlIG9ubHkgZXZlciB3YW50IHRoZXJlIHRvIGJlXG4gIC8vIG9uZSBpbnN0YW5jZSBvZiBGYXN0RG9tIGluIGFuIGFwcFxuICBmYXN0ZG9tID0gZmFzdGRvbSB8fCBuZXcgRmFzdERvbSgpO1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgJ2Zhc3Rkb20nXG4gICAqL1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFzdGRvbTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKXsgcmV0dXJuIGZhc3Rkb207IH0pO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvd1snZmFzdGRvbSddID0gZmFzdGRvbTtcbiAgfVxuXG59KSh3aW5kb3cuZmFzdGRvbSk7XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9jb25maWcgICA9IHJlcXVpcmUoJ19jb25maWcnKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSBib2lsZXJwbGF0ZTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhFQ1VUSU9OXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgY29uZmlnICAgICAgPSBfY29uZmlnKCk7XG5mdW5jdGlvbiBib2lsZXJwbGF0ZSAocGFyYW1ldGVyKSB7XG4gIHZhciAkdGl0bGUgICAgICAgICAgICAgID0gY29uZmlnWyd0aXRsZSddO1xuICB2YXIgJGRlc2NyaXB0aW9uICAgICAgICA9IGNvbmZpZ1snZGVzY3JpcHRpb24nXTtcbiAgdmFyICRrZXl3b3JkcyAgICAgICAgICAgPSBjb25maWdbJ2tleXdvcmRzJ107XG4gIHZhciAkYXV0aG9yICAgICAgICAgICAgID0gY29uZmlnWydhdXRob3InXTtcbiAgdmFyICR3ZWJzaXRlICAgICAgICAgICAgPSBjb25maWdbJ3dlYnNpdGUnXTtcbiAgdmFyICRzdHlsZSAgICAgICAgICAgICAgPSBjb25maWdbJ3N0eWxlJ107XG5cbiAgaWYgKHBhcmFtZXRlcikge1xuICAgICR0aXRsZSAgICAgICAgICAgICAgICA9IHBhcmFtZXRlci50aXRsZSAgICAgICB8fCAkdGl0bGU7XG4gICAgJGRlc2NyaXB0aW9uICAgICAgICAgID0gcGFyYW1ldGVyLmRlc2NyaXB0aW9uIHx8ICRkZXNjcmlwdGlvbjtcbiAgICAka2V5d29yZHMgICAgICAgICAgICAgPSBwYXJhbWV0ZXIua2V5d29yZHMgICAgfHwgJGtleXdvcmRzO1xuICAgICRhdXRob3IgICAgICAgICAgICAgICA9IHBhcmFtZXRlci5hdXRob3IgICAgICB8fCAkYXV0aG9yO1xuICAgICR3ZWJzaXRlICAgICAgICAgICAgICA9IHBhcmFtZXRlci53ZWJzaXRlICAgICB8fCAkd2Vic2l0ZTtcbiAgICAkc3R5bGUgICAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIuc3R5bGUgICAgICAgfHwgJHN0eWxlO1xuICB9XG5cbiAgdmFyIHRpdGxlICAgICAgICAgICAgICAgPSBbJzx0aXRsZT4nKyR0aXRsZSsnPC90aXRsZT4nXTtcbiAgdmFyIG1ldGEgICAgICAgICAgICAgICAgPSBbXG4gICAgJzxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJmb3JtYXQtZGV0ZWN0aW9uXCIgY29udGVudD1cInRlbGVwaG9uZT1ub1wiIC8+JyxcbiAgICAnPG1ldGEgbmFtZT1cIm1zYXBwbGljYXRpb24tdGFwLWhpZ2hsaWdodFwiIGNvbnRlbnQ9XCJub1wiIC8+JyxcbiAgICAnPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIicrJGRlc2NyaXB0aW9uKydcIj4nLFxuICAgICc8bWV0YSBuYW1lPVwia2V5d29yZHNcIiBjb250ZW50PVwiJyska2V5d29yZHMrJ1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJhdXRob3JcIiBjb250ZW50PVwiJyskYXV0aG9yKydcIj4nLFxuICAgICc8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlID0gMS4wLCB1c2VyLXNjYWxhYmxlPW5vXCI+J1xuICBdO1xuICB2YXIgb2cgICAgICAgICAgICAgICAgICA9IFtcbiAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzp0aXRsZVwiIGNvbnRlbnQ9XCInKyR0aXRsZSsnXCIgLz4nLFxuICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOnNpdGVfbmFtZVwiIGNvbnRlbnQ9XCInKyR0aXRsZSsnXCIgLz4nLFxuICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOnVybFwiIGNvbnRlbnQ9XCInKyR3ZWJzaXRlKydcIiAvPicsXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIiBjb250ZW50PVwiJyskZGVzY3JpcHRpb24rJ1wiIC8+JyxcbiAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzppbWFnZVwiIGNvbnRlbnQ9XCJwaWMvaXNzdWluZ19hbl9hc3NldC5naWZcIiAvPicsXG4gIF07XG4gIHZhciBpY29uICAgICAgICAgICAgICAgID0gWyAvLyBjaGVjayBpdGVtIGdlbmVyYXRvclxuICAgICc8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgc2l6ZXM9XCI1N3g1N1wiIGhyZWY9XCJsb2dvL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi01N3g1Ny5wbmdcIj4nLFxuICAgICc8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgc2l6ZXM9XCI2MHg2MFwiIGhyZWY9XCJsb2dvL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi02MHg2MC5wbmdcIj4nLFxuICAgICc8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgc2l6ZXM9XCI3Mng3MlwiIGhyZWY9XCJsb2dvL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi03Mng3Mi5wbmdcIj4nLFxuICAgICc8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgc2l6ZXM9XCI3Nng3NlwiIGhyZWY9XCJsb2dvL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi03Nng3Ni5wbmdcIj4nLFxuICAgICc8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgc2l6ZXM9XCIxMTR4MTE0XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTExNHgxMTQucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiMTIweDEyMFwiIGhyZWY9XCJsb2dvL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi0xMjB4MTIwLnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjE0NHgxNDRcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tMTQ0eDE0NC5wbmdcIj4nLFxuICAgICc8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCJsb2dvL2Zhdmljb24vZmF2aWNvbi0zMngzMi5wbmdcIiBzaXplcz1cIjMyeDMyXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9wbmdcIiBocmVmPVwibG9nby9mYXZpY29uL2Zhdmljb24tOTZ4OTYucG5nXCIgc2l6ZXM9XCI5Nng5NlwiPicsXG4gICAgJzxsaW5rIHJlbD1cImljb25cIiB0eXBlPVwiaW1hZ2UvcG5nXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9mYXZpY29uLTE2eDE2LnBuZ1wiIHNpemVzPVwiMTZ4MTZcIj4nLFxuICAgICc8bGluayByZWw9XCJtYW5pZmVzdFwiIGhyZWY9XCJsb2dvL2Zhdmljb24vbWFuaWZlc3QuanNvblwiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJtc2FwcGxpY2F0aW9uLVRpbGVDb2xvclwiIGNvbnRlbnQ9XCIjYjkxZDQ3XCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cIm1zYXBwbGljYXRpb24tVGlsZUltYWdlXCIgY29udGVudD1cImxvZ28vZmF2aWNvbi9tc3RpbGUtMTQ0eDE0NC5wbmdcIj4nLFxuICAgICc8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiI2ZmZmZmZlwiPicsXG4gICAgJzxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiB0eXBlPVwiaW1hZ2UveC1pY29uXCIgaHJlZj1cIlNPVVJDRS9mYXZpY29uLmljb1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImljb25cIiB0eXBlPVwiaW1hZ2UvcG5nXCIgaHJlZj1cIlNPVVJDRS9yZWludmVudGluZ2VuZ2FnZW1lbnQucG5nXCI+J1xuICBdO1xuICB2YXIgc3R5bGUgICAgICAgICAgICAgICA9IFtcbiAgICAnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCInICsgJHN0eWxlICsgJ1wiIC8+J1xuICBdO1xuICB2YXIgaGVhZCA9IHRpdGxlLmNvbmNhdChtZXRhKS8qLmNvbmNhdChvZykuY29uY2F0KGljb24pKi8uY29uY2F0KHN0eWxlKTtcblxuICB2YXIgaHRtbFRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcbiAgdmFyIGhlYWRUYWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XG4gIGh0bWxUYWcuc2V0QXR0cmlidXRlKCdsYW5nJywnZW4nKTtcbiAgaGVhZFRhZy5pbm5lckhUTUwgPSBoZWFkLmpvaW4oJycpO1xuXG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG59O1xuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBERVBFTkRFTkNJRVNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBwa2cgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBQQVJBTUVURVIgPSBBUkdVTUVOVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBubyBjbGkgdG9vbFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWFBPUlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbm1vZHVsZS5leHBvcnRzICA9IGNvbmZpZztcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhFQ1VUSU9OXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX2NvbmZpZyAgICAgPSB7XG4gIHRpdGxlICAgICAgIDogJycsXG4gIGRlc2NyaXB0aW9uIDogcGtnLmRlc2NyaXB0aW9uLFxuICB2ZXJzaW9uICAgICA6IHBrZy52ZXJzaW9uLFxuICBrZXl3b3JkcyAgICA6IHBrZy5rZXl3b3Jkcy5qb2luKCcsICcpLFxuICBhdXRob3IgICAgICA6IHBrZy5hdXRob3IubmFtZSxcbiAgd2Vic2l0ZSAgICAgOiAnaHR0cDovL25wbWpzLm9yZy93ZWJwYWdlJyxcbiAgc3R5bGUgICAgICAgOiAnQlVORExFL2J1bmRsZS5jc3MnXG59O1xuZnVuY3Rpb24gY29uZmlnIChrZXkpIHtcbiAgcmV0dXJuIGtleSA/IF9jb25maWdba2V5XSA6IF9jb25maWc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcIndlYnBhZ2VcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4yLjBcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIldlYnBhZ2UgQm9pbGVycGxhdGUgQ29tcG9uZW50XCIsXG4gIFwibWFpblwiOiBcIlNPVVJDRS9pbmRleC5qc1wiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwidGVzdFwiOiBcImVjaG8gXFxcIkVycm9yOiBubyB0ZXN0IHNwZWNpZmllZFxcXCIgJiYgZXhpdCAxXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJib2lsZXJwbGF0ZVwiLFxuICAgIFwid2VicGFnZVwiLFxuICAgIFwiY29tcG9uZW50XCJcbiAgXSxcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcInNlcmFwYXRoXCIsXG4gICAgXCJlbWFpbFwiOiBcImRldkBzZXJhcGF0aC5kZVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cDovL3d3dy5naXRodWIuY29tL3NlcmFwYXRoXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwicmVhZG1lXCI6IFwiIyB3ZWJwYWdlXFxuV2VicGFnZSBCb2lsZXJwbGF0ZSBDb21wb25lbnRcXG5cXG5gYGBqc1xcbnZhciB3ZWJwYWdlID0gcmVxdWlyZSgnd2VicGFnZScpO1xcbnZhciBib2R5ICAgID0gd2VicGFnZSh7XFxuICAvLyBPUFRJT05BTFxcbiAgLy8gLi4uIGFuZCBtb3JlIGluIHRoZSBmdXR1cmUgKGUuZy4gaWNvbiwgb2csIC4uLilcXG4gIHRpdGxlICAgICAgIDogJ0Zvb2JhcicsXFxuICBkZXNjcmlwdGlvbiA6ICdmb28gYmFyIGJheicsXFxuICBrZXl3b3JkcyAgICA6ICdmb28sIGJhciwgYmF6JyxcXG4gIGF1dGhvciAgICAgIDogJ3F1dXggYmF6JyxcXG4gIHdlYnNpdGUgICAgIDogJ2h0dHA6Ly9mb28uYmFyLmJheidcXG59KTtcXG5cIixcbiAgXCJyZWFkbWVGaWxlbmFtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcImdpdEhlYWRcIjogXCI4ZTY1MmYyY2VkOTQxNTU2ZTNiNjIzMThmM2Q1ZDk1OTkwNzBiYThkXCIsXG4gIFwiX2lkXCI6IFwid2VicGFnZUAwLjIuMFwiLFxuICBcIl9zaGFzdW1cIjogXCJiMTIyYzNlNzk2ZDc0ZTE2ZWMxYmMxZTVjMWNmNDc4NGRmMGVjMTVhXCIsXG4gIFwiX2Zyb21cIjogXCJ3ZWJwYWdlQDAuMi4wXCJcbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwid2l6YXJkYW1pZ29zaW5zdGl0dXRlXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUgV2Vic2l0ZVwiLFxuICBcIm1haW5cIjogXCJTT1VSQ0UvaW5kZXguanNcIixcbiAgXCJzdHlsZVwiOiBcIlNPVVJDRS9pbmRleC5jc3NcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZmFzdGRvbVwiOiBcIl4wLjguNlwiLFxuICAgIFwibWluaXhoclwiOiBcIl4xLjEuMFwiLFxuICAgIFwicmVzcmNpZnlcIjogXCJeMS4xLjNcIixcbiAgICBcIndlYnBhZ2VcIjogXCJeMC4yLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJhdG9taWZ5XCI6IFwiXjcuMS4wXCIsXG4gICAgXCJiYWJlbGlmeVwiOiBcIl42LjAuMlwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJhdG9taWZ5XCI6IFwiYXRvbWlmeVwiLFxuICAgIFwidGVzdFwiOiBcImVjaG8gXFxcIkVycm9yOiBubyB0ZXN0IHNwZWNpZmllZFxcXCIgJiYgZXhpdCAxICN0ZXN0ZW0gc3RhcnQgLS1zaW5nbGVSdW5cIixcbiAgICBcIi0tLVwiOiBcIiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIsXG4gICAgXCJidWlsZDpzY3JpcHRzXCI6IFwiI2Jyb3dzZXJpZnkgLWQgYXNzZXRzL3NjcmlwdHMvbWFpbi5qcyAtcCBbbWluaWZ5aWZ5IC0tY29tcHJlc3NQYXRoIC4gLS1tYXAgbWFpbi5qcy5tYXAgLS1vdXRwdXQgZGlzdC9tYWluLmpzLm1hcF0gfCBoYXNobWFyayAtbiBkaXN0L21haW4uanMgLXMgLWwgOCAtbSBhc3NldHMuanNvbiAnZGlzdC97bmFtZX17aGFzaH17ZXh0fSdcIixcbiAgICBcImpzY3NcIjogXCIjanNjcyBlc2hpbnQgZXNsaW50Li4uXCIsXG4gICAgXCJ1Z2xpZnlcIjogXCIjdWdsaWZ5XCIsXG4gICAgXCJwbmdcIjogXCIjb3B0aW1nXCIsXG4gICAgXCJqcGdcIjogXCIjanBnb1wiLFxuICAgIFwiY3NzbVwiOiBcIiN5Y3NzbWluICoqLmNzcyAjY3NzbWluXCIsXG4gICAgXCJjc3N2XCI6IFwiI2Nzcy12YWxpZGF0b3IgKiouY3NzXCIsXG4gICAgXCJjc3NwXCI6IFwiI2Nzcy1wcmV0dGlmaWVyICoqLmNzc1wiLFxuICAgIFwiaHRtbFwiOiBcIiNodG1sNS1saW50ICoqLmh0bWxcIixcbiAgICBcImJ1aWxkVlwiOiBcIiNybSAtcmYgUkVMRUFTRSAmJiBta2RpciBSRUxFQVNFICYmIG5vZGUgbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvYmluL2NtZC5qcyBTT1VSQ0UvaW5kZXguanMgLWQgLW8gUkVMRUFTRS9pbmRleC52JChjYXQgcGFja2FnZS5qc29uIHwgZ3JlcCB2ZXJzaW9uIHwgZ3JlcCAtUG8gJyg/PD12ZXJzaW9uXFxcIjogXFxcIikuKig/PVxcXCIpJykuYnVuZGxlLmpzXCIsXG4gICAgXCJ3YXRjaFZcIjogXCIjcm0gLXJmIFJFTEVBU0UgJiYgbWtkaXIgUkVMRUFTRSAmJiBub2RlIG5vZGVfbW9kdWxlcy93YXRjaGlmeS9iaW4vY21kLmpzIFNPVVJDRS9pbmRleC5qcyAtbyBSRUxFQVNFL2luZGV4LnYkKGNhdCBwYWNrYWdlLmpzb24gfCBncmVwIHZlcnNpb24gfCBncmVwIC1QbyAnKD88PXZlcnNpb25cXFwiOiBcXFwiKS4qKD89XFxcIiknKS5idW5kbGUuanNcIixcbiAgICBcIm9wZW46cHJvZFwiOiBcIiNvcGVuZXIgaHR0cDovL2V4YW1wbGUuY29tXCIsXG4gICAgXCJvcGVuOnN0YWdlXCI6IFwiI29wZW5lciBodHRwOi8vc3RhZ2luZy5leGFtcGxlLmludGVybmFsXCIsXG4gICAgXCJvcGVuOmRldlwiOiBcIiNvcGVuZXIgaHR0cDovL2xvY2FsaG9zdDo5MDkwXCIsXG4gICAgXCJkZXBsb3k6cHJvZFwiOiBcIiNzMy1jbGkgc3luYyAuL2Rpc3QvIHMzOi8vZXhhbXBsZS1jb20vcHJvZC1zaXRlL1wiLFxuICAgIFwiZGVwbG95OnN0YWdlXCI6IFwiI3MzLWNsaSBzeW5jIC4vZGlzdC8gczM6Ly9leGFtcGxlLWNvbS9zdGFnZS1zaXRlL1wiXG4gIH0sXG4gIFwiYXRvbWlmeVwiOiB7XG4gICAgXCJzZXJ2ZXJcIjoge1xuICAgICAgXCJvcGVuXCI6IHRydWUsXG4gICAgICBcInBhdGhcIjogXCJpbmRleC5odG1sXCIsXG4gICAgICBcImxyXCI6IHtcbiAgICAgICAgXCJ2ZXJib3NlXCI6IHRydWUsXG4gICAgICAgIFwicXVpZXRcIjogZmFsc2UsXG4gICAgICAgIFwicG9ydFwiOiAzMTMzNyxcbiAgICAgICAgXCJzeW5jXCI6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIFwianNcIjoge1xuICAgICAgXCJlbnRyeVwiOiBcIlNPVVJDRS9pbmRleC5qc1wiLFxuICAgICAgXCJhbGlhc1wiOiBcIkJVTkRMRS9idW5kbGUuanNcIixcbiAgICAgIFwib3V0cHV0XCI6IFwiQlVORExFL2J1bmRsZS5qc1wiLFxuICAgICAgXCJkZWJ1Z1wiOiB0cnVlLFxuICAgICAgXCJ3YXRjaFwiOiB0cnVlLFxuICAgICAgXCJ0cmFuc2Zvcm1cIjogW1xuICAgICAgICBcImJhYmVsaWZ5XCJcbiAgICAgIF0sXG4gICAgICBcInN0YW5kYWxvbmVcIjogXCJBUElcIlxuICAgIH0sXG4gICAgXCJjc3NcIjoge1xuICAgICAgXCJlbnRyeVwiOiBcIlNPVVJDRS9pbmRleC5jc3NcIixcbiAgICAgIFwiYWxpYXNcIjogXCJCVU5ETEUvYnVuZGxlLmNzc1wiLFxuICAgICAgXCJvdXRwdXRcIjogXCJCVU5ETEUvYnVuZGxlLmNzc1wiLFxuICAgICAgXCJkZWJ1Z1wiOiB0cnVlLFxuICAgICAgXCJ3YXRjaFwiOiB0cnVlLFxuICAgICAgXCJhdXRvcHJlZml4ZXJcIjoge1xuICAgICAgICBcImJyb3dzZXJzXCI6IFtcbiAgICAgICAgICBcIj4gMSVcIixcbiAgICAgICAgICBcIklFIDdcIlxuICAgICAgICBdLFxuICAgICAgICBcImNhc2NhZGVcIjogZmFsc2VcbiAgICAgIH0sXG4gICAgICBcImNvbXByZXNzXCI6IGZhbHNlLFxuICAgICAgXCJwbHVnaW5cIjogW11cbiAgICB9LFxuICAgIFwiYXNzZXRzXCI6IHtcbiAgICAgIFwiZGVzdFwiOiBcIkJVTkRMRS9hc3NldHMvXCIsXG4gICAgICBcInByZWZpeFwiOiBcIi9CVU5ETEUvYXNzZXRzL1wiLFxuICAgICAgXCJyZXRhaW5OYW1lXCI6IGZhbHNlXG4gICAgfVxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3dpemFyZGFtaWdvc2luc3RpdHV0ZS93aXphcmRhbWlnb3NpbnN0aXR1dGUuZ2l0aHViLmlvLmdpdFwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwidGVhY2hpbmdcIixcbiAgICBcInRlYWNoZXJcIixcbiAgICBcImxlYXJuaW5nXCIsXG4gICAgXCJqYXZhc2NyaXB0XCIsXG4gICAgXCJiZXJsaW5cIixcbiAgICBcImxlYXJuZXJcIixcbiAgICBcInByb2dyYW1taW5nXCIsXG4gICAgXCJzY2hvb2xcIixcbiAgICBcInVuaXZlcnNpdHlcIixcbiAgICBcImFjYWRlbXlcIixcbiAgICBcImluc3RpdHV0ZVwiLFxuICAgIFwid2l6YXJkXCIsXG4gICAgXCJhbWlnb3NcIixcbiAgICBcIm5vZGVcIixcbiAgICBcIm5vZGVqc1wiLFxuICAgIFwiaHRtbFwiLFxuICAgIFwiY3NzXCJcbiAgXSxcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcInNlcmFwYXRoXCIsXG4gICAgXCJlbWFpbFwiOiBcImRldkBzZXJhcGF0aC5kZVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cDovL3d3dy5naXRodWIuY29tL3NlcmFwYXRoXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiR05VIEFHUExcIixcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS93aXphcmRhbWlnb3NpbnN0aXR1dGUvd2l6YXJkYW1pZ29zaW5zdGl0dXRlLmdpdGh1Yi5pby9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cDovL3dpemFyZC5hbWlnb3MuaW5zdGl0dXRlXCJcbn1cbiJdfQ==
