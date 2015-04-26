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

  if (parameter) {
    $title                = parameter.title       || $title;
    $description          = parameter.description || $description;
    $keywords             = parameter.keywords    || $keywords;
    $author               = parameter.author      || $author;
    $website              = parameter.website     || $website;
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
    // '<link rel="stylesheet" type="text/css" href="'+$style+'" />'
    '<link rel="stylesheet" type="text/css" href="bundle.css" />'
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
};
function config (key) {
  return key ? _config[key] : _config;
}

},{"../../package.json":7}],7:[function(require,module,exports){
module.exports={
  "name": "webpage",
  "version": "0.1.0",
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
  "gitHead": "15d744f1cc4850ff083f2e75840b17503df24a5d",
  "_id": "webpage@0.1.0",
  "_shasum": "c45b9cf26bad4679f950d5b2a04053b66d259340",
  "_from": "webpage@>=0.1.0 <0.2.0"
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
    "webpage": "^0.1.0"
  },
  "devDependencies": {
    "atomify": "^7.1.0",
    "babelify": "^6.0.2"
  },
  "scripts": {
    "atomify": "atomify",
    "test": "echo \"Error: no test specified\" && exit 1 #testem start --singleRun",
    "---": "----------------------------------------------------------------",
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
      "alias": "bundle.js",
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
      "alias": "bundle.css",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9hdG9taWZ5L25vZGVfbW9kdWxlcy9hdG9taWZ5LWpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zZXJhcGF0aC93b3Jrc3BhY2Uvc2VyYXNlZWQvSE9MRElORy93aXphcmQuYW1pZ29zLmluc3RpdHV0ZS93aXphcmRhbWlnb3NpbnN0aXR1dGUuZ2l0aHViLmlvL1NPVVJDRS9pbmRleC5qcyIsIlNPVVJDRS9pbmRleC50ZW1wbGF0ZS5odG1sIiwiU09VUkNFL25vZGVfbW9kdWxlcy9fY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL2Zhc3Rkb20vaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0Uvbm9kZV9tb2R1bGVzL19jb25maWcuanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9wYWNrYWdlLmpzb24iLCJwYWNrYWdlLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNHQSxZQUFZLENBQUM7O0FBQWIsSUFBTSxPQUFPLEdBQUssT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLElBQU0sT0FBTyxHQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CckMsSUFBTSxNQUFNLEdBQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDdkMsSUFBTSxRQUFRLEdBQUksT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDbkQsSUFBSSxFQUFFLEdBQVksUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OztBQUloRCxNQUFNLENBQUMsT0FBTyxHQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7OztBQUlqRSxTQUFTLHFCQUFxQixDQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBQ3pDLE1BQU0sU0FBUyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRTtBQUMzRCxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLEdBQUcsR0FBRSxFQUFFLENBQUM7Ozs7Ozs7O0FBUWQsU0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksR0FBSTtBQUM3QixPQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzVCLENBQUMsQ0FBQzs7QUFFSCxNQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixTQUFPLEdBQUcsQ0FBQztDQUNaOzs7QUNuREQ7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTID0gQ1VTVE9NIFNESyBbQ3VzdG9tIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdF1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IHdlYnBhZ2UgICA9IHJlcXVpcmUoJ3dlYnBhZ2UnKTtcbmNvbnN0IGZhc3Rkb20gICA9IHJlcXVpcmUoJ2Zhc3Rkb20nKTtcbi8vIHZhciBtaW5peGhyID0gcmVxdWlyZSgnbWluaXhocicpO1xuICAvLyBmdW5jdGlvbiB3aXphcmQgKHBhcmFtZXRlcikgeyB9XG4gIC8vIHRyeSB7XG4gIC8vICAgbWluaXhocih7IHVybDogJ3BhcmFtcy5qc29uJyB9LCBmdW5jdGlvbiAoZXJyb3IsIGRhdGEpIHtcbiAgLy8gICAgIGRlYnVnZ2VyO1xuICAvLyAgICAgYWxlcnQoZXJyb3IpO1xuICAvLyAgICAgYWxlcnQoZGF0YSk7XG4gIC8vICAgfSk7XG4gIC8vIH0gY2F0Y2ggKENPUlNlcnJvcikge1xuICAvLyAgIGFsZXJ0KENPUlNlcnJvcik7XG4gIC8vIH1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgUEFSQU1FVEVSID0gQVJHVU1FTlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gbm8gY2xpIHRvb2xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgTU9EVUxFIElOVEVSTkFMUyAmIEhFTFBFUlNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IGNvbmZpZyAgICA9IHJlcXVpcmUoJ19jb25maWcnKSgpO1xuY29uc3QgdGVtcGxhdGUgID0gcmVxdWlyZSgnLi9pbmRleC50ZW1wbGF0ZS5odG1sJyk7XG5sZXQgX18gICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSB3aXphcmRhbWlnb3NpbnN0aXR1dGUod2VicGFnZShjb25maWcpLCBjb25maWcpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWEVDVVRJT05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIHdpemFyZGFtaWdvc2luc3RpdHV0ZSAoZG9tLCBkYXRhKSB7IC8vICdkYXRhJyBtYXliZSBhbHNvIHRvIHVzZSBmb3IgZXZlbnQgZGVsZWdhdGlvbiBwYXR0ZXJuXG4gIGNvbnN0IENPTVBPTkVOVCA9IChfXy5pbm5lckhUTUw9dGVtcGxhdGUsX18uY2hpbGROb2Rlc1swXSk7XG4gIGNvbnN0IF9fbG9nbyAgICA9IENPTVBPTkVOVC5xdWVyeVNlbGVjdG9yQWxsKCcud2l6YXJkYW1pZ29zX19sb2dvJylbMF07XG4gIGNvbnN0IF9fbWVudSAgICA9IENPTVBPTkVOVC5xdWVyeVNlbGVjdG9yQWxsKCcud2l6YXJkYW1pZ29zX19tZW51JylbMF07XG4gIGNvbnN0IF9fYSA9Jyc7XG4gIC8qKioqKioqKiBXSVJFIFVQICoqKioqKioqL1xuICAgICAgLy8gX19IZWFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIG9uY2xpY2sgKGV2ZW50KSB7XG4gICAgICAvLyAgIGV2ZW50c3RvcChldmVudCk7XG4gICAgICAvLyAgIGFsZXJ0KCcjc2lnbiB1cCcpO1xuICAgICAgLy8gICByb3V0ZXIoJ2luZGV4Lmh0bWwjc2lnbnVwJyk7XG4gICAgICAvLyB9KTtcbiAgLyoqKioqKiBJTklUSUFMSVpFICoqKioqKiovXG4gIGZhc3Rkb20ud3JpdGUoZnVuY3Rpb24gSU5JVCAoKSB7XG4gICAgZG9tLmFwcGVuZENoaWxkKENPTVBPTkVOVCk7XG4gIH0pO1xuICAvKioqKioqKiogUkVUVVJOICoqKioqKioqKi9cbiAgdmFyIEFQSSA9IHt9OyAvLyBzaG91bGQgYmUgYW4gZXZlbnQgZW1pdHRlciB0b29cbiAgcmV0dXJuIEFQSTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gJzxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NcIj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2xvZ29cIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX21lbnVcIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2ludHJvXCI+XFxuICAgIDxoMSBjbGFzcz1cIndpemFyZGFtaWdvc19fdGl0bGVcIj5XZWxjb21lLCBhbWlnb3MuPC9oMT5cXG4gICAgPHAgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3N1YnRpdGxlXCI+Q29tZSwgbGVhcm4gdG8gY29kZSB3aXRoIHVzLjwvcD5cXG4gICAgV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUgZGVzaWducyBjby1sZWFybmluZyBwcm9ncmFtbWluZyBjbGFzc2VzLlxcbiAgICBUaGUgaWRlYSBpcyB0byBjcmVhdGUgb3BlbiwgZnJpZW5kbHkgJiBjb2xsYWJvcmF0aXZlIGF0bW9zcGhlcmUgZm9yIGxlYXJuZXJzLlxcbiAgICBXZSBhcmUgZ29pbmcgdG8gdHJ5IGhhcmQgdG8gbWFrZSB0aGlzIGxlYXJuaW5nIGpvdXJuZXkgZXhjaXRpbmdcXG4gICAgZm9yIG91ciBmdXR1cmUgd2l6YXJkIGFtaWdvcy5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIndpemFyZGFtaWdvc19fc2Nyb2xsc1wiPlxcbiAgPCEtLSBAVE9ETzogY29udmVydCB0ZXh0IGNvbnRlbnQgbGF5b3V0IHRvIG1hcmtkb3duIC0tPlxcbiAgICA8aDEgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3RpdGxlXCI+TWFnaWMgU2Nyb2xsczwvaDE+XFxuICAgIDxwPlxcbiAgICAgIFdlIHdpbGwgYmUgY292ZXJpbmcgYWxsIHRoZSBlbGVtZW50cyB0aGF0IHdvdWxkIGludGVyZXN0IHdpemFyZCBhcHByZW50aWNlcy5cXG4gICAgPC9wPlxcbiAgICBNYWdpYyBzcGVsbHMgdGhhdCB3ZSB3aWxsIGJlIGNvdmVyaW5nIGR1cmluZyBvdXIgY2xhc3NlczpcXG4gICAgPHVsPlxcbiAgICAgIDxsaT5PcGVyYXRpbmcgU3lzdGVtXFxuICAgICAgICA8dWw+PGxpIGNsYXNzPVwid2l6YXJkYW1pZ29zX19idWxsZXRzXCI+dW5peCAmIGJhc2g8L2xpPjwvdWw+XFxuICAgICAgPC9saT5cXG4gICAgICA8bGk+Q29sbGFib3JhdGlvblxcbiAgICAgICAgPHVsPjxsaSBjbGFzcz1cIndpemFyZGFtaWdvc19fYnVsbGV0c1wiPmdpdCwgZ2l0aHViICYgQ28uPC9saT48L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgICAgPGxpPk1hcmt1cCBMYW5ndWFnZXNcXG4gICAgICAgIDx1bD48bGkgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2J1bGxldHNcIj5tYXJrZG93biwgaHRtbCAmIGNzczwvbGk+PC91bD5cXG4gICAgICA8L2xpPlxcbiAgICAgIDxsaT5Qcm9ncmFtbWluZ1xcbiAgICAgICAgPHVsPjxsaSBjbGFzcz1cIndpemFyZGFtaWdvc19fYnVsbGV0c1wiPmphdmFzY3JpcHQgJiByZWdleDwvbGk+PC91bD5cXG4gICAgICA8L2xpPlxcbiAgICAgIDxsaT5EZXZPcHNcXG4gICAgICAgIDx1bD48bGkgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2J1bGxldHNcIj5ucG0gJiBub2RlanMgJiBicm93c2VyaWZ5PC9saT48L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3NjaGVkdWxlXCI+XFxuICA8IS0tIEBUT0RPOiBjb252ZXJ0IHRleHQgY29udGVudCBsYXlvdXQgdG8gbWFya2Rvd24gLS0+XFxuICAgIDxoMSBjbGFzcz1cIndpemFyZGFtaWdvc19fdGl0bGVcIj5DbGFzc2VzIG9mIE1hZ2ljPC9oMT5cXG4gICAgPHA+XFxuICAgICAgV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUgd2lsbCBzdGFydCBydW5uaW5nIGZyb20gPGI+TWF5IDEsIDIwMTU8L2I+IG9uLlxcbiAgICA8L3A+XFxuICAgIDxwPlxcbiAgICAgIFByaWNlIGZvciB0aGUgOCB3ZWVrIGNsYXNzIGlzIDI0MCBFVVIuXFxuICAgICAgRnJvbSBlYWNoIGZ1bGx5IHBhaWQgY2xhc3Mgd2Ugd2lsbCBkb25hdGUgNDAgRVVSIHRvIHN1cHBvcnQgdGhlIHBheS13aGF0LXlvdS1jYW4gcHJvZ3JhbS5cXG4gICAgICBGZWVsIGZyZWUgdG8gZG9uYXRlIG1vcmUgaWYgeW91IHdhbnQgdG8gc3VwcG9ydCB0aGlzIHByb2dyYW0uXFxuICAgICAgSWYgeW91IHdhbnQgdG8gYXBwbHkgZm9yIHRoZSBwYXktd2hhdC15b3UtY2FuLXByb2dyYW0sIHBsZWFzZSBhcHBseSBhbmQgeW91IHdpbGwgYmUgYWRkZWQgdG9cXG4gICAgICB0aGUgcXVldWUgd2hpY2ggaXMgc2VydmVkIGV2ZXJ5IHRpbWUgYSBzbG90IGlzIGNvdmVyZWQuXFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgPGI+Q2xhc3Mgb2YgTWFnaWM8L2I+IChNYXkgNCAtIEp1biAyMiwgMjAxNSk8YnI+XFxuICAgICAgPGI+OHg8L2I+IE1vbmRheXMgKDE2IC0gMTloKTxicj5cXG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLmRlL21hcHMvZGlyLy9jby51cCwrQWRhbGJlcnRzdHJhJUMzJTlGZSs4LCsxMDk5OStCZXJsaW4sK0RldXRzY2hsYW5kL0A1Mi41MDAzMywxMy40MTk3ODYsMTd6L2RhdGE9ITRtMTIhMW0zITNtMiExczB4NDdhODRlMzM3ZTIzZDQxMzoweDJjZmQ2OWU1YTlmNjhmMWEhMnNjby51cCE0bTchMW0wITFtNSExbTEhMXMweDQ3YTg0ZTMzN2UyM2Q0MTM6MHgyY2ZkNjllNWE5ZjY4ZjFhITJtMiExZDEzLjQxOTc4NiEyZDUyLjUwMDMzXCI+Q29fdXAgKEFkYWxiZXJ0c3RyYXNzZSA4KTwvYT5cXG4gICAgICA8YSBjbGFzcz1cIndpemFyZGFtaWdvc19fYXBwbHlcIiBocmVmPVwiI1wiPiBBUFBMWSA8L2E+XFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgPGI+Q2xhc3Mgb2YgTWFnaWM8L2I+IChNYXkgNiAtIEp1biAyNCwgMjAxNSk8YnI+XFxuICAgICAgPGI+OHg8L2I+IFdlZG5lc2RheXMgKDE2IC0gMTloKTxicj5cXG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLmRlL21hcHMvZGlyLy9TdC4rT2JlcmhvbHosK1Jvc2VudGhhbGVyK1N0cmElQzMlOUZlKzcyQSwrMTAxMTkrQmVybGluLCtEZXV0c2NobGFuZC9ANTIuNTI5NTA3LDEzLjQwMTg5NCwxN3ovZGF0YT0hNG0xMiExbTMhM20yITFzMHg0N2E4NTFlNDY0NGE0Yjc1OjB4ZjQ5NDE3MjU2NDg3MTIxYyEyc1N0LitPYmVyaG9seiE0bTchMW0wITFtNSExbTEhMXMweDQ3YTg1MWU0NjQ0YTRiNzU6MHhmNDk0MTcyNTY0ODcxMjFjITJtMiExZDEzLjQwMTg5NCEyZDUyLjUyOTUwN1wiPlN0Lk9iZXJob2x6KFJvc2VudGhhbGVyIFBsYXR6KTwvYT5cXG4gICAgICA8YSBjbGFzcz1cIndpemFyZGFtaWdvc19fYXBwbHlcIiBocmVmPVwiI1wiPiBBUFBMWSA8L2E+XFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgPGI+Q2xhc3Mgb2YgTWFnaWM8L2I+IChNYXkgMTQgLSBKdWwgMiwgMjAxNSk8YnI+XFxuICAgICAgPGI+OHg8L2I+IFRodXJzZGF5cyAoMTYgLSAxOWgpPGJyPlxcbiAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5nb29nbGUuZGUvbWFwcy9kaXIvL1J1bmdlc3RyYSVDMyU5RmUrMjAsKzEwMTc5K0Jlcmxpbi9ANTIuNTEyNDI5MywxMy40MTk1OTM1LDE3ei9kYXRhPSE0bTEzITFtNCEzbTMhMXMweDQ3YTg0ZTNiM2M2Y2MwMDE6MHhlYmQwODI0MmQ4OTNiOTMyITJzUnVuZ2VzdHJhJUMzJTlGZSsyMCwrMTAxNzkrQmVybGluITNiMSE0bTchMW0wITFtNSExbTEhMXMweDQ3YTg0ZTNiM2M2Y2MwMDE6MHhlYmQwODI0MmQ4OTNiOTMyITJtMiExZDEzLjQxOTU5MzUhMmQ1Mi41MTI0MjkzXCI+Qy1CYXNlIChSdW5nZXN0cmFzc2UpPC9hPlxcbiAgICAgIDxhIGNsYXNzPVwid2l6YXJkYW1pZ29zX19hcHBseVwiIGhyZWY9XCIjXCI+IEFQUExZIDwvYT5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICBFYWNoIGNsYXNzIHdpbGwgbGFzdCA8Yj4zIGZ1bGwgaG91cnM8L2I+LiBJdCB3aWxsIGFjY2VwdCA8Yj51cCB0byAxMFxcbiAgICAgIGxlYXJuZXJzPC9iPiBhbmQgd2lsbCBiZSBydW4gYnkgYXQgbGVhc3QgMiBoaWdoZXItbGV2ZWwgd2l6YXJkcy48YnI+PGJyPlxcbiAgICAgIDx1PkZvciBlYWNoIG1lZXR1cDwvdT4gd2Ugd2lsbCB0cnkgdG8gcHJlcGFyZSBzaG9ydCBzY3JlZW5jYXN0cyBhbmQgb3RoZXIgbWF0ZXJpYWxzIHdpdGggZGlmZmVyZW50IGFzc2lnbm1lbnRzLjxicj5cXG4gICAgICA8dT5GaXJzdCBtZWV0aW5nPC91PiBpcyBnb2luZyB0byBiZSBpbmZvcm1hbCBhbmQgd2lsbCBpbmNsdWRlIGhlbHBpbmcgbGVhcm5lcnMgZ2V0IHNldCB1cCB3aXRoIExpbnV4IGFuZCBnZXR0aW5nIHN0YXJ0ZWQgd2l0aCBzb21lIG9mIHRoZSBiYXNpY3MuXFxuICAgICAgVGhlIFwiZm9ybWFsXCIgY2xhc3MgcGFydCB3aWxsIGJlZ2luIHRoZSBzZWNvbmQgd2Vlay5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICBIYWNrLWFuZC10ZWxsIGRheXMgd2lsbCBhbHNvIGJlIG9yZ2FuaXNlZCBhbmQgd2l6YXJkcyB3aWxsIGJlIGFibGUgdG8gc2hhcmUgd2hhdCB0aGV5IGFyZSB3b3JraW5nIG9uIHRoZXJlLiBUaGlzIHdpbGwgYmUgZWFzeSBnb2luZyBldmVudHMgd2hlcmUgbGVhcm5lcnMgd2lsbCBiZSBhYmxlIHRvIGdldCBzb21lIGZlZWRiYWNrIGFuZCB0byBpbnNwaXJlIHRob3NlIHdobyB3YW50IHRvIGpvaW4gd2l6YXJkIGFtaWdvcy5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICBGb3IgYWxsIHdobyB3YW50IHRvIGRvIG1vcmUgdGhlcmUgd2lsbCBhbHNvIGJlIGhvbWV3b3JrIHNvIGxlYXJuZXJzIHdpbGwgYmUgYWJsZSB0byBwcmFjdGljZSB0aGVpciBzcGVsbHMuXFxuICAgICAgV2UgYWxzbyBlbmNvdXJhZ2UgYWxsIHRoZSBwYXJ0aWNpcGFudHMgdG8gaGF2ZSBzb21lIHByb2plY3QgdGhleSB3YW50IHRvIHdvcmsgb24uPGJyPlxcbiAgICAgIDxpPihidXQgaWYgdGhleSBkb25cXCd0LCBubyB3b3JyaWVzLCB3aWxsIGhlbHAgdGhlbSBmaW5kIG9uZSkuPC9pPlxcbiAgICA8L3A+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3JlcXVpcmVtZW50c1wiPlxcbiAgPCEtLSBAVE9ETzogY29udmVydCB0ZXh0IGNvbnRlbnQgbGF5b3V0IHRvIG1hcmtkb3duIC0tPlxcbiAgICA8aDEgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3RpdGxlXCI+VW5sb2NraW5nIENoYXJtPC9oMT5cXG5cXG4gICAgPHAgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3N1YnRpdGxlXCI+XFxuICAgICAgVGhlcmUgYXJlIHNvbWUgcmVxdWlyZW1lbnRzIGZvciBDbGFzc2VzIG9mIE1hZ2ljLlxcbiAgICA8L3A+XFxuICAgIDx1bD5cXG4gICAgICA8bGk+WW91IG5lZWQgdG8gaGF2ZSB5b3VyIG93biBjb21wdXRlci4gSXQgZG9lc25cXCd0IGhhdmUgdG8gYmUgc3VwZXIgcG93ZXJmdWwsIGJ1dCB5b3UgbmVlZCBvbmUuPGJyPjxicj48L2xpPlxcbiAgICAgIDxsaT5JdCBuZWVkcyB0byBydW4gb24gTWFjIE9TWCBvciBMaW51eC4gSWYgeW91IGhhdmUgV2luZG93cywgd2Ugd2lsbCBoZWxwIHlvdSBpbnN0YWxsIExpbnV4Ljxicj48YnI+PC9saT5cXG4gICAgICA8bGk+WW91IGFsc28gc2hvdWxkIHVuZGVyc3RhbmQgc29tZSBiYXNpYyBFbmdsaXNoLiBNb3N0IG9mIHRoZSBwcm9ncmFtbWluZyBtYXRlcmlhbHMsIHR1dG9yaWFscyBhbmQgZ2FtZXMgYXJlIGluIEVuZ2xpc2guXFxuICAgICAgICA8dWw+PGxpIGNsYXNzPVwid2l6YXJkYW1pZ29zX19idWxsZXRzXCI+PGk+XFxuICAgICAgICBNZW50b3JzIGRvIHNwZWFrIEdlcm1hbiAoYW5kIEVuZ2xpc2ggaXMgdGhlaXIgc2Vjb25kIGxhbmd1YWdlKSwgc28geW91IHdpbGwgYmUgYWJsZSB0byBzcGVhayBHZXJtYW4sXFxuICAgICAgICBidXQgeW91IHJlYWxseSBoYXZlIHRvIGJlIGFibGUgdG8gdW5kZXJzdGFuZCBFbmdsaXNoLjwvaT48L2xpPjwvdWw+XFxuICAgICAgPC9saT5cXG4gICAgPC91bD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIndpemFyZGFtaWdvc19fYWJvdXRcIj5cXG4gIDwhLS0gQFRPRE86IGNvbnZlcnQgdGV4dCBjb250ZW50IGxheW91dCB0byBtYXJrZG93biAtLT5cXG4gICAgPGgxIGNsYXNzPVwid2l6YXJkYW1pZ29zX190aXRsZVwiPldobyBpcyBXaXphcmQgQW1pZ29zIEluc3RpdHV0ZSBmb3I8L2gxPlxcbiAgICA8cD5cXG4gICAgICBJdCBpcyBmb3IgZ2lybHMgYW5kIGd1eXMgd2hvIHdhbnQgdG8gbGVhcm4gc3BlY2lhbCBtYWdpYyBwcm9ncmFtbWluZyB3aXphcmRyeS5cXG4gICAgICBZb3UgaGF2ZSB0byBiZSBhdCBsZWFzdCA4eXJzIG9sZCBhbmQgeW91IHNob3VsZCBoYXZlIHNvbWUgYmFzaWMgY29tcHV0ZXIgc2tpbGxzLlxcbiAgICA8L3A+XFxuICAgIDxwPlxcbiAgICAgIFRoaXMgaXMgbm90IGEgdHlwaWNhbCBzY2hvb2wuIEl0IGlzIGEgV2l6YXJkIGluc3RpdHV0ZSB0aGF0IGVuY291cmFnZXMgc2VsZi1sZWFybmluZyxcXG4gICAgICBjb2xsYWJvcmF0aW9uIGFuZCBsZWFybmluZy1ieS1kb2luZyBhcHByb2FjaC4gV2Ugd2lsbCBoZWxwIHlvdSBnZXQgdG8ga25vdyB0aGVcXG4gICAgICByaWdodCBtYWdpYyBzcGVsbHMgYW5kIHByZXBhcmUgeW91IHRvIGJlY29tZSBhbiBhY3RpdmUgcHJvYmxlbSBzb2x2ZXIuXFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgSWYgeW91IGFyZSBub3Qgc3VyZSB3aGV0aGVyIHlvdSBzaG91bGQgYXBwbHksXFxuICAgICAgPGEgaHJlZj1cIm1haWx0bzp3aXphcmRAYW1pZ29zLmluc3RpdHV0ZUBcIj5jb250YWN0IHVzPC9hPlxcbiAgICAgIGFuZCB3ZSB3aWxsIHF1aWNrbHkgc2VuZCB5b3UgYSByZXBseS5cXG4gICAgPC9wPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zX19qb2luXCI+XFxuICA8IS0tIEBUT0RPOiBjb252ZXJ0IHRleHQgY29udGVudCBsYXlvdXQgdG8gbWFya2Rvd24gLS0+XFxuICAgIDxoMSBjbGFzcz1cIndpemFyZGFtaWdvc19fdGl0bGVcIj5NYWQgU2NpZW5jZTwvaDE+XFxuICAgIDxwPjxiPldhbnQgdG8gam9pbiB1cz88L2I+PC9wPlxcbiAgICBEbyB5b3UgaGFwcGVuIHRvIGJlIGEgV2l6YXJkIHlvdXJzZWxmIGFuZCB3b3VsZCBsaWtlIHRvIGhlbHAgYXMgYSB0ZWFjaGVyIG9yIHNwZWFrZXI/XFxuICAgIDxwPkdvIHRvIG91ciA8YSBocmVmPVwiaHR0cDovL3dpemFyZGFtaWdvc2luc3RpdHV0ZS5naXRodWIuY29tXCI+R2l0aHViIG9yZ2FuaXphdGlvbi48L2E+PC9wPlxcbiAgICA8cD5PciBjaGF0IHdpdGggdXMgb24gPGEgaHJlZj1cImh0dHBzOi8vZ2l0dGVyLmltL3dpemFyZGFtaWdvc2luc3RpdHV0ZS9jaGF0XCI+R2l0dGVyPC9hPjwvcD5cXG4gIDwvZGl2PlxcbjwvZGl2Plxcbic7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBERVBFTkRFTkNJRVNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBwa2cgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpO1xuLy8gdmFyIHBhcmFtcyAgICAgID0gcmVxdWlyZSgnJykgdHJ5IGxvYWQgZmlsZXMgaW4gaWZyYW1lIGFuZCBzY3JhcGUgaXQgdG8gY2lyY3VtdmVudCBDT1JTXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9pZnJhbWUtYXBpXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaSB0b29sXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIE1PRFVMRSBJTlRFUk5BTFMgJiBIRUxQRVJTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX2NvbmZpZyAgICAgPSB7XG4gIHRpdGxlICAgICAgIDogJ1dpemFyZCBBbWlnb3MgSW5zdGl0dXRlJyxcbiAgZGVzY3JpcHRpb24gOiBwa2cuZGVzY3JpcHRpb24sXG4gIHZlcnNpb24gICAgIDogcGtnLnZlcnNpb24sXG4gIGtleXdvcmRzICAgIDogcGtnLmtleXdvcmRzLmpvaW4oJywgJyksXG4gIGF1dGhvciAgICAgIDogcGtnLmF1dGhvci5uYW1lLFxuICB3ZWJzaXRlICAgICA6IHBrZy5ob21lcGFnZSxcbn07XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYUE9SVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgID0gY29uZmlnO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWEVDVVRJT05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGNvbmZpZyAoa2V5KSB7XG4gIHJldHVybiBrZXkgPyBfY29uZmlnW2tleV0gOiBfY29uZmlnO1xufVxuIiwiLyoqXG4gKiBGYXN0RG9tXG4gKlxuICogRWxpbWluYXRlcyBsYXlvdXQgdGhyYXNoaW5nXG4gKiBieSBiYXRjaGluZyBET00gcmVhZC93cml0ZVxuICogaW50ZXJhY3Rpb25zLlxuICpcbiAqIEBhdXRob3IgV2lsc29uIFBhZ2UgPHdpbHNvbnBhZ2VAbWUuY29tPlxuICovXG5cbjsoZnVuY3Rpb24oZmFzdGRvbSl7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE5vcm1hbGl6ZSByQUZcbiAgdmFyIHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IGZ1bmN0aW9uKGNiKSB7IHJldHVybiB3aW5kb3cuc2V0VGltZW91dChjYiwgMTAwMCAvIDYwKTsgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZyZXNoXG4gICAqIEZhc3REb20gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gRmFzdERvbSgpIHtcbiAgICB0aGlzLmZyYW1lcyA9IFtdO1xuICAgIHRoaXMubGFzdElkID0gMDtcblxuICAgIC8vIFBsYWNpbmcgdGhlIHJBRiBtZXRob2RcbiAgICAvLyBvbiB0aGUgaW5zdGFuY2UgYWxsb3dzXG4gICAgLy8gdXMgdG8gcmVwbGFjZSBpdCB3aXRoXG4gICAgLy8gYSBzdHViIGZvciB0ZXN0aW5nLlxuICAgIHRoaXMucmFmID0gcmFmO1xuXG4gICAgdGhpcy5iYXRjaCA9IHtcbiAgICAgIGhhc2g6IHt9LFxuICAgICAgcmVhZDogW10sXG4gICAgICB3cml0ZTogW10sXG4gICAgICBtb2RlOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgam9iIHRvIHRoZVxuICAgKiByZWFkIGJhdGNoIGFuZCBzY2hlZHVsZXNcbiAgICogYSBuZXcgZnJhbWUgaWYgbmVlZCBiZS5cbiAgICpcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbihmbiwgY3R4KSB7XG4gICAgdmFyIGpvYiA9IHRoaXMuYWRkKCdyZWFkJywgZm4sIGN0eCk7XG4gICAgdmFyIGlkID0gam9iLmlkO1xuXG4gICAgLy8gQWRkIHRoaXMgam9iIHRvIHRoZSByZWFkIHF1ZXVlXG4gICAgdGhpcy5iYXRjaC5yZWFkLnB1c2goam9iLmlkKTtcblxuICAgIC8vIFdlIHNob3VsZCAqbm90KiBzY2hlZHVsZSBhIG5ldyBmcmFtZSBpZjpcbiAgICAvLyAxLiBXZSdyZSAncmVhZGluZydcbiAgICAvLyAyLiBBIGZyYW1lIGlzIGFscmVhZHkgc2NoZWR1bGVkXG4gICAgdmFyIGRvZXNudE5lZWRGcmFtZSA9IHRoaXMuYmF0Y2gubW9kZSA9PT0gJ3JlYWRpbmcnXG4gICAgICB8fCB0aGlzLmJhdGNoLnNjaGVkdWxlZDtcblxuICAgIC8vIElmIGEgZnJhbWUgaXNuJ3QgbmVlZGVkLCByZXR1cm5cbiAgICBpZiAoZG9lc250TmVlZEZyYW1lKSByZXR1cm4gaWQ7XG5cbiAgICAvLyBTY2hlZHVsZSBhIG5ld1xuICAgIC8vIGZyYW1lLCB0aGVuIHJldHVyblxuICAgIHRoaXMuc2NoZWR1bGVCYXRjaCgpO1xuICAgIHJldHVybiBpZDtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIGpvYiB0byB0aGVcbiAgICogd3JpdGUgYmF0Y2ggYW5kIHNjaGVkdWxlc1xuICAgKiBhIG5ldyBmcmFtZSBpZiBuZWVkIGJlLlxuICAgKlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihmbiwgY3R4KSB7XG4gICAgdmFyIGpvYiA9IHRoaXMuYWRkKCd3cml0ZScsIGZuLCBjdHgpO1xuICAgIHZhciBtb2RlID0gdGhpcy5iYXRjaC5tb2RlO1xuICAgIHZhciBpZCA9IGpvYi5pZDtcblxuICAgIC8vIFB1c2ggdGhlIGpvYiBpZCBpbnRvIHRoZSBxdWV1ZVxuICAgIHRoaXMuYmF0Y2gud3JpdGUucHVzaChqb2IuaWQpO1xuXG4gICAgLy8gV2Ugc2hvdWxkICpub3QqIHNjaGVkdWxlIGEgbmV3IGZyYW1lIGlmOlxuICAgIC8vIDEuIFdlIGFyZSAnd3JpdGluZydcbiAgICAvLyAyLiBXZSBhcmUgJ3JlYWRpbmcnXG4gICAgLy8gMy4gQSBmcmFtZSBpcyBhbHJlYWR5IHNjaGVkdWxlZC5cbiAgICB2YXIgZG9lc250TmVlZEZyYW1lID0gbW9kZSA9PT0gJ3dyaXRpbmcnXG4gICAgICB8fCBtb2RlID09PSAncmVhZGluZydcbiAgICAgIHx8IHRoaXMuYmF0Y2guc2NoZWR1bGVkO1xuXG4gICAgLy8gSWYgYSBmcmFtZSBpc24ndCBuZWVkZWQsIHJldHVyblxuICAgIGlmIChkb2VzbnROZWVkRnJhbWUpIHJldHVybiBpZDtcblxuICAgIC8vIFNjaGVkdWxlIGEgbmV3XG4gICAgLy8gZnJhbWUsIHRoZW4gcmV0dXJuXG4gICAgdGhpcy5zY2hlZHVsZUJhdGNoKCk7XG4gICAgcmV0dXJuIGlkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWZlcnMgdGhlIGdpdmVuIGpvYlxuICAgKiBieSB0aGUgbnVtYmVyIG9mIGZyYW1lc1xuICAgKiBzcGVjaWZpZWQuXG4gICAqXG4gICAqIElmIG5vIGZyYW1lcyBhcmUgZ2l2ZW5cbiAgICogdGhlbiB0aGUgam9iIGlzIHJ1biBpblxuICAgKiB0aGUgbmV4dCBmcmVlIGZyYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgZnJhbWVcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLmRlZmVyID0gZnVuY3Rpb24oZnJhbWUsIGZuLCBjdHgpIHtcblxuICAgIC8vIEFjY2VwdHMgdHdvIGFyZ3VtZW50c1xuICAgIGlmICh0eXBlb2YgZnJhbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN0eCA9IGZuO1xuICAgICAgZm4gPSBmcmFtZTtcbiAgICAgIGZyYW1lID0gMTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGluZGV4ID0gZnJhbWUgLSAxO1xuXG4gICAgcmV0dXJuIHRoaXMuc2NoZWR1bGUoaW5kZXgsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5ydW4oe1xuICAgICAgICBmbjogZm4sXG4gICAgICAgIGN0eDogY3R4XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXJzIGEgc2NoZWR1bGVkICdyZWFkJyxcbiAgICogJ3dyaXRlJyBvciAnZGVmZXInIGpvYi5cbiAgICpcbiAgICogQHBhcmFtICB7TnVtYmVyfFN0cmluZ30gaWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbihpZCkge1xuXG4gICAgLy8gRGVmZXIgam9icyBhcmUgY2xlYXJlZCBkaWZmZXJlbnRseVxuICAgIGlmICh0eXBlb2YgaWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLmNsZWFyRnJhbWUoaWQpO1xuICAgIH1cblxuICAgIC8vIEFsbG93IGlkcyB0byBiZSBwYXNzZWQgYXMgc3RyaW5nc1xuICAgIGlkID0gTnVtYmVyKGlkKTtcblxuICAgIHZhciBqb2IgPSB0aGlzLmJhdGNoLmhhc2hbaWRdO1xuICAgIGlmICgham9iKSByZXR1cm47XG5cbiAgICB2YXIgbGlzdCA9IHRoaXMuYmF0Y2hbam9iLnR5cGVdO1xuICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZihpZCk7XG5cbiAgICAvLyBDbGVhciByZWZlcmVuY2VzXG4gICAgZGVsZXRlIHRoaXMuYmF0Y2guaGFzaFtpZF07XG4gICAgaWYgKH5pbmRleCkgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYSBzY2hlZHVsZWQgZnJhbWUuXG4gICAqXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmcmFtZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuY2xlYXJGcmFtZSA9IGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5mcmFtZXMuaW5kZXhPZihmcmFtZSk7XG4gICAgaWYgKH5pbmRleCkgdGhpcy5mcmFtZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfTtcblxuICAvKipcbiAgICogU2NoZWR1bGVzIGEgbmV3IHJlYWQvd3JpdGVcbiAgICogYmF0Y2ggaWYgb25lIGlzbid0IHBlbmRpbmcuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5zY2hlZHVsZUJhdGNoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gU2NoZWR1bGUgYmF0Y2ggZm9yIG5leHQgZnJhbWVcbiAgICB0aGlzLnNjaGVkdWxlKDAsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5iYXRjaC5zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgIHNlbGYucnVuQmF0Y2goKTtcbiAgICB9KTtcblxuICAgIC8vIFNldCBmbGFnIHRvIGluZGljYXRlXG4gICAgLy8gYSBmcmFtZSBoYXMgYmVlbiBzY2hlZHVsZWRcbiAgICB0aGlzLmJhdGNoLnNjaGVkdWxlZCA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHVuaXF1ZVxuICAgKiBpZCBmb3IgYSBqb2IuXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnVuaXF1ZUlkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICsrdGhpcy5sYXN0SWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIGVhY2ggam9iIGluXG4gICAqIHRoZSBsaXN0IHBhc3NlZC5cbiAgICpcbiAgICogSWYgYSBjb250ZXh0IGhhcyBiZWVuXG4gICAqIHN0b3JlZCBvbiB0aGUgZnVuY3Rpb25cbiAgICogdGhlbiBpdCBpcyB1c2VkLCBlbHNlIHRoZVxuICAgKiBjdXJyZW50IGB0aGlzYCBpcyB1c2VkLlxuICAgKlxuICAgKiBAcGFyYW0gIHtBcnJheX0gbGlzdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbihsaXN0KSB7XG4gICAgdmFyIGlkO1xuXG4gICAgd2hpbGUgKGlkID0gbGlzdC5zaGlmdCgpKSB7XG4gICAgICB0aGlzLnJ1bih0aGlzLmJhdGNoLmhhc2hbaWRdKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJ1bnMgYW55ICdyZWFkJyBqb2JzIGZvbGxvd2VkXG4gICAqIGJ5IGFueSAnd3JpdGUnIGpvYnMuXG4gICAqXG4gICAqIFdlIHJ1biB0aGlzIGluc2lkZSBhIHRyeSBjYXRjaFxuICAgKiBzbyB0aGF0IGlmIGFueSBqb2JzIGVycm9yLCB3ZVxuICAgKiBhcmUgYWJsZSB0byByZWNvdmVyIGFuZCBjb250aW51ZVxuICAgKiB0byBmbHVzaCB0aGUgYmF0Y2ggdW50aWwgaXQncyBlbXB0eS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnJ1bkJhdGNoID0gZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcblxuICAgICAgLy8gU2V0IHRoZSBtb2RlIHRvICdyZWFkaW5nJyxcbiAgICAgIC8vIHRoZW4gZW1wdHkgYWxsIHJlYWQgam9ic1xuICAgICAgdGhpcy5iYXRjaC5tb2RlID0gJ3JlYWRpbmcnO1xuICAgICAgdGhpcy5mbHVzaCh0aGlzLmJhdGNoLnJlYWQpO1xuXG4gICAgICAvLyBTZXQgdGhlIG1vZGUgdG8gJ3dyaXRpbmcnXG4gICAgICAvLyB0aGVuIGVtcHR5IGFsbCB3cml0ZSBqb2JzXG4gICAgICB0aGlzLmJhdGNoLm1vZGUgPSAnd3JpdGluZyc7XG4gICAgICB0aGlzLmZsdXNoKHRoaXMuYmF0Y2gud3JpdGUpO1xuXG4gICAgICB0aGlzLmJhdGNoLm1vZGUgPSBudWxsO1xuXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5ydW5CYXRjaCgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgam9iIHRvXG4gICAqIHRoZSBnaXZlbiBiYXRjaC5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gICBsaXN0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIGN0eFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBpZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24odHlwZSwgZm4sIGN0eCkge1xuICAgIHZhciBpZCA9IHRoaXMudW5pcXVlSWQoKTtcbiAgICByZXR1cm4gdGhpcy5iYXRjaC5oYXNoW2lkXSA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGZuOiBmbixcbiAgICAgIGN0eDogY3R4LFxuICAgICAgdHlwZTogdHlwZVxuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIFJ1bnMgYSBnaXZlbiBqb2IuXG4gICAqXG4gICAqIEFwcGxpY2F0aW9ucyB1c2luZyBGYXN0RG9tXG4gICAqIGhhdmUgdGhlIG9wdGlvbnMgb2Ygc2V0dGluZ1xuICAgKiBgZmFzdGRvbS5vbkVycm9yYC5cbiAgICpcbiAgICogVGhpcyB3aWxsIGNhdGNoIGFueVxuICAgKiBlcnJvcnMgdGhhdCBtYXkgdGhyb3dcbiAgICogaW5zaWRlIGNhbGxiYWNrcywgd2hpY2hcbiAgICogaXMgdXNlZnVsIGFzIG9mdGVuIERPTVxuICAgKiBub2RlcyBoYXZlIGJlZW4gcmVtb3ZlZFxuICAgKiBzaW5jZSBhIGpvYiB3YXMgc2NoZWR1bGVkLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKlxuICAgKiAgIGZhc3Rkb20ub25FcnJvciA9IGZ1bmN0aW9uKGUpIHtcbiAgICogICAgIC8vIFJ1bnMgd2hlbiBqb2JzIGVycm9yXG4gICAqICAgfTtcbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSBqb2JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKGpvYil7XG4gICAgdmFyIGN0eCA9IGpvYi5jdHggfHwgdGhpcztcbiAgICB2YXIgZm4gPSBqb2IuZm47XG5cbiAgICAvLyBDbGVhciByZWZlcmVuY2UgdG8gdGhlIGpvYlxuICAgIGRlbGV0ZSB0aGlzLmJhdGNoLmhhc2hbam9iLmlkXTtcblxuICAgIC8vIElmIG5vIGBvbkVycm9yYCBoYW5kbGVyXG4gICAgLy8gaGFzIGJlZW4gcmVnaXN0ZXJlZCwganVzdFxuICAgIC8vIHJ1biB0aGUgam9iIG5vcm1hbGx5LlxuICAgIGlmICghdGhpcy5vbkVycm9yKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbChjdHgpO1xuICAgIH1cblxuICAgIC8vIElmIGFuIGBvbkVycm9yYCBoYW5kbGVyXG4gICAgLy8gaGFzIGJlZW4gcmVnaXN0ZXJlZCwgY2F0Y2hcbiAgICAvLyBlcnJvcnMgdGhhdCB0aHJvdyBpbnNpZGVcbiAgICAvLyBjYWxsYmFja3MsIGFuZCBydW4gdGhlXG4gICAgLy8gaGFuZGxlciBpbnN0ZWFkLlxuICAgIHRyeSB7IGZuLmNhbGwoY3R4KTsgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5vbkVycm9yKGUpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhcnRzIGEgckFGIGxvb3BcbiAgICogdG8gZW1wdHkgdGhlIGZyYW1lIHF1ZXVlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcmFmID0gdGhpcy5yYWY7XG5cbiAgICAvLyBEb24ndCBzdGFydCBtb3JlIHRoYW4gb25lIGxvb3BcbiAgICBpZiAodGhpcy5sb29waW5nKSByZXR1cm47XG5cbiAgICByYWYoZnVuY3Rpb24gZnJhbWUoKSB7XG4gICAgICB2YXIgZm4gPSBzZWxmLmZyYW1lcy5zaGlmdCgpO1xuXG4gICAgICAvLyBJZiBubyBtb3JlIGZyYW1lcyxcbiAgICAgIC8vIHN0b3AgbG9vcGluZ1xuICAgICAgaWYgKCFzZWxmLmZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgc2VsZi5sb29waW5nID0gZmFsc2U7XG5cbiAgICAgIC8vIE90aGVyd2lzZSwgc2NoZWR1bGUgdGhlXG4gICAgICAvLyBuZXh0IGZyYW1lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYWYoZnJhbWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBSdW4gdGhlIGZyYW1lLiAgTm90ZSB0aGF0XG4gICAgICAvLyB0aGlzIG1heSB0aHJvdyBhbiBlcnJvclxuICAgICAgLy8gaW4gdXNlciBjb2RlLCBidXQgYWxsXG4gICAgICAvLyBmYXN0ZG9tIHRhc2tzIGFyZSBkZWFsdFxuICAgICAgLy8gd2l0aCBhbHJlYWR5IHNvIHRoZSBjb2RlXG4gICAgICAvLyB3aWxsIGNvbnRpbnVlIHRvIGl0ZXJhdGVcbiAgICAgIGlmIChmbikgZm4oKTtcbiAgICB9KTtcblxuICAgIHRoaXMubG9vcGluZyA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBmdW5jdGlvbiB0b1xuICAgKiBhIHNwZWNpZmllZCBpbmRleFxuICAgKiBvZiB0aGUgZnJhbWUgcXVldWUuXG4gICAqXG4gICAqIEBwYXJhbSAge051bWJlcn0gICBpbmRleFxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uKGluZGV4LCBmbikge1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoaXMgc2xvdFxuICAgIC8vIGhhc24ndCBhbHJlYWR5IGJlZW5cbiAgICAvLyB0YWtlbi4gSWYgaXQgaGFzLCB0cnlcbiAgICAvLyByZS1zY2hlZHVsaW5nIGZvciB0aGUgbmV4dCBzbG90XG4gICAgaWYgKHRoaXMuZnJhbWVzW2luZGV4XSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGUoaW5kZXggKyAxLCBmbik7XG4gICAgfVxuXG4gICAgLy8gU3RhcnQgdGhlIHJBRlxuICAgIC8vIGxvb3AgdG8gZW1wdHlcbiAgICAvLyB0aGUgZnJhbWUgcXVldWVcbiAgICB0aGlzLmxvb3AoKTtcblxuICAgIC8vIEluc2VydCB0aGlzIGZ1bmN0aW9uIGludG9cbiAgICAvLyB0aGUgZnJhbWVzIHF1ZXVlIGFuZCByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5mcmFtZXNbaW5kZXhdID0gZm47XG4gIH07XG5cbiAgLy8gV2Ugb25seSBldmVyIHdhbnQgdGhlcmUgdG8gYmVcbiAgLy8gb25lIGluc3RhbmNlIG9mIEZhc3REb20gaW4gYW4gYXBwXG4gIGZhc3Rkb20gPSBmYXN0ZG9tIHx8IG5ldyBGYXN0RG9tKCk7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSAnZmFzdGRvbSdcbiAgICovXG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYXN0ZG9tO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpeyByZXR1cm4gZmFzdGRvbTsgfSk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93WydmYXN0ZG9tJ10gPSBmYXN0ZG9tO1xuICB9XG5cbn0pKHdpbmRvdy5mYXN0ZG9tKTtcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgREVQRU5ERU5DSUVTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX2NvbmZpZyAgID0gcmVxdWlyZSgnX2NvbmZpZycpO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBQQVJBTUVURVIgPSBBUkdVTUVOVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBubyBjbGkgdG9vbFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWFBPUlRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbm1vZHVsZS5leHBvcnRzICA9IGJvaWxlcnBsYXRlO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWEVDVVRJT05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBjb25maWcgICAgICA9IF9jb25maWcoKTtcbmZ1bmN0aW9uIGJvaWxlcnBsYXRlIChwYXJhbWV0ZXIpIHtcbiAgdmFyICR0aXRsZSAgICAgICAgICAgICAgPSBjb25maWdbJ3RpdGxlJ107XG4gIHZhciAkZGVzY3JpcHRpb24gICAgICAgID0gY29uZmlnWydkZXNjcmlwdGlvbiddO1xuICB2YXIgJGtleXdvcmRzICAgICAgICAgICA9IGNvbmZpZ1sna2V5d29yZHMnXTtcbiAgdmFyICRhdXRob3IgICAgICAgICAgICAgPSBjb25maWdbJ2F1dGhvciddO1xuICB2YXIgJHdlYnNpdGUgICAgICAgICAgICA9IGNvbmZpZ1snd2Vic2l0ZSddO1xuXG4gIGlmIChwYXJhbWV0ZXIpIHtcbiAgICAkdGl0bGUgICAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIudGl0bGUgICAgICAgfHwgJHRpdGxlO1xuICAgICRkZXNjcmlwdGlvbiAgICAgICAgICA9IHBhcmFtZXRlci5kZXNjcmlwdGlvbiB8fCAkZGVzY3JpcHRpb247XG4gICAgJGtleXdvcmRzICAgICAgICAgICAgID0gcGFyYW1ldGVyLmtleXdvcmRzICAgIHx8ICRrZXl3b3JkcztcbiAgICAkYXV0aG9yICAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIuYXV0aG9yICAgICAgfHwgJGF1dGhvcjtcbiAgICAkd2Vic2l0ZSAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIud2Vic2l0ZSAgICAgfHwgJHdlYnNpdGU7XG4gIH1cblxuICB2YXIgdGl0bGUgICAgICAgICAgICAgICA9IFsnPHRpdGxlPicrJHRpdGxlKyc8L3RpdGxlPiddO1xuICB2YXIgbWV0YSAgICAgICAgICAgICAgICA9IFtcbiAgICAnPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cImZvcm1hdC1kZXRlY3Rpb25cIiBjb250ZW50PVwidGVsZXBob25lPW5vXCIgLz4nLFxuICAgICc8bWV0YSBuYW1lPVwibXNhcHBsaWNhdGlvbi10YXAtaGlnaGxpZ2h0XCIgY29udGVudD1cIm5vXCIgLz4nLFxuICAgICc8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiJyskZGVzY3JpcHRpb24rJ1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJrZXl3b3Jkc1wiIGNvbnRlbnQ9XCInKyRrZXl3b3JkcysnXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cImF1dGhvclwiIGNvbnRlbnQ9XCInKyRhdXRob3IrJ1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGUgPSAxLjAsIHVzZXItc2NhbGFibGU9bm9cIj4nXG4gIF07XG4gIHZhciBvZyAgICAgICAgICAgICAgICAgID0gW1xuICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD1cIicrJHRpdGxlKydcIiAvPicsXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6c2l0ZV9uYW1lXCIgY29udGVudD1cIicrJHRpdGxlKydcIiAvPicsXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6dXJsXCIgY29udGVudD1cIicrJHdlYnNpdGUrJ1wiIC8+JyxcbiAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCInKyRkZXNjcmlwdGlvbisnXCIgLz4nLFxuICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOmltYWdlXCIgY29udGVudD1cInBpYy9pc3N1aW5nX2FuX2Fzc2V0LmdpZlwiIC8+JyxcbiAgXTtcbiAgdmFyIGljb24gICAgICAgICAgICAgICAgPSBbIC8vIGNoZWNrIGl0ZW0gZ2VuZXJhdG9yXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjU3eDU3XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTU3eDU3LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjYweDYwXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTYweDYwLnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjcyeDcyXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTcyeDcyLnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjc2eDc2XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTc2eDc2LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjExNHgxMTRcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tMTE0eDExNC5wbmdcIj4nLFxuICAgICc8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgc2l6ZXM9XCIxMjB4MTIwXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTEyMHgxMjAucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiMTQ0eDE0NFwiIGhyZWY9XCJsb2dvL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi0xNDR4MTQ0LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImljb25cIiB0eXBlPVwiaW1hZ2UvcG5nXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9mYXZpY29uLTMyeDMyLnBuZ1wiIHNpemVzPVwiMzJ4MzJcIj4nLFxuICAgICc8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCJsb2dvL2Zhdmljb24vZmF2aWNvbi05Nng5Ni5wbmdcIiBzaXplcz1cIjk2eDk2XCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9wbmdcIiBocmVmPVwibG9nby9mYXZpY29uL2Zhdmljb24tMTZ4MTYucG5nXCIgc2l6ZXM9XCIxNngxNlwiPicsXG4gICAgJzxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9tYW5pZmVzdC5qc29uXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cIm1zYXBwbGljYXRpb24tVGlsZUNvbG9yXCIgY29udGVudD1cIiNiOTFkNDdcIj4nLFxuICAgICc8bWV0YSBuYW1lPVwibXNhcHBsaWNhdGlvbi1UaWxlSW1hZ2VcIiBjb250ZW50PVwibG9nby9mYXZpY29uL21zdGlsZS0xNDR4MTQ0LnBuZ1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCIjZmZmZmZmXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwic2hvcnRjdXQgaWNvblwiIHR5cGU9XCJpbWFnZS94LWljb25cIiBocmVmPVwiU09VUkNFL2Zhdmljb24uaWNvXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9wbmdcIiBocmVmPVwiU09VUkNFL3JlaW52ZW50aW5nZW5nYWdlbWVudC5wbmdcIj4nXG4gIF07XG4gIHZhciBzdHlsZSAgICAgICAgICAgICAgID0gW1xuICAgIC8vICc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicrJHN0eWxlKydcIiAvPidcbiAgICAnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJidW5kbGUuY3NzXCIgLz4nXG4gIF07XG4gIHZhciBoZWFkID0gdGl0bGUuY29uY2F0KG1ldGEpLyouY29uY2F0KG9nKS5jb25jYXQoaWNvbikqLy5jb25jYXQoc3R5bGUpO1xuXG4gIHZhciBodG1sVGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpO1xuICB2YXIgaGVhZFRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgaHRtbFRhZy5zZXRBdHRyaWJ1dGUoJ2xhbmcnLCdlbicpO1xuICBoZWFkVGFnLmlubmVySFRNTCA9IGhlYWQuam9pbignJyk7XG5cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbn07XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIHBrZyAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJyk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaSB0b29sXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYUE9SVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgID0gY29uZmlnO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWEVDVVRJT05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfY29uZmlnICAgICA9IHtcbiAgdGl0bGUgICAgICAgOiAnJyxcbiAgZGVzY3JpcHRpb24gOiBwa2cuZGVzY3JpcHRpb24sXG4gIHZlcnNpb24gICAgIDogcGtnLnZlcnNpb24sXG4gIGtleXdvcmRzICAgIDogcGtnLmtleXdvcmRzLmpvaW4oJywgJyksXG4gIGF1dGhvciAgICAgIDogcGtnLmF1dGhvci5uYW1lLFxuICB3ZWJzaXRlICAgICA6ICdodHRwOi8vbnBtanMub3JnL3dlYnBhZ2UnLFxufTtcbmZ1bmN0aW9uIGNvbmZpZyAoa2V5KSB7XG4gIHJldHVybiBrZXkgPyBfY29uZmlnW2tleV0gOiBfY29uZmlnO1xufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJ3ZWJwYWdlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMS4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJXZWJwYWdlIEJvaWxlcnBsYXRlIENvbXBvbmVudFwiLFxuICBcIm1haW5cIjogXCJTT1VSQ0UvaW5kZXguanNcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInRlc3RcIjogXCJlY2hvIFxcXCJFcnJvcjogbm8gdGVzdCBzcGVjaWZpZWRcXFwiICYmIGV4aXQgMVwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiYm9pbGVycGxhdGVcIixcbiAgICBcIndlYnBhZ2VcIixcbiAgICBcImNvbXBvbmVudFwiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJzZXJhcGF0aFwiLFxuICAgIFwiZW1haWxcIjogXCJkZXZAc2VyYXBhdGguZGVcIixcbiAgICBcInVybFwiOiBcImh0dHA6Ly93d3cuZ2l0aHViLmNvbS9zZXJhcGF0aFwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInJlYWRtZVwiOiBcIiMgd2VicGFnZVxcbldlYnBhZ2UgQm9pbGVycGxhdGUgQ29tcG9uZW50XFxuXFxuYGBganNcXG52YXIgd2VicGFnZSA9IHJlcXVpcmUoJ3dlYnBhZ2UnKTtcXG52YXIgYm9keSAgICA9IHdlYnBhZ2Uoe1xcbiAgLy8gT1BUSU9OQUxcXG4gIC8vIC4uLiBhbmQgbW9yZSBpbiB0aGUgZnV0dXJlIChlLmcuIGljb24sIG9nLCAuLi4pXFxuICB0aXRsZSAgICAgICA6ICdGb29iYXInLFxcbiAgZGVzY3JpcHRpb24gOiAnZm9vIGJhciBiYXonLFxcbiAga2V5d29yZHMgICAgOiAnZm9vLCBiYXIsIGJheicsXFxuICBhdXRob3IgICAgICA6ICdxdXV4IGJheicsXFxuICB3ZWJzaXRlICAgICA6ICdodHRwOi8vZm9vLmJhci5iYXonXFxufSk7XFxuXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJnaXRIZWFkXCI6IFwiMTVkNzQ0ZjFjYzQ4NTBmZjA4M2YyZTc1ODQwYjE3NTAzZGYyNGE1ZFwiLFxuICBcIl9pZFwiOiBcIndlYnBhZ2VAMC4xLjBcIixcbiAgXCJfc2hhc3VtXCI6IFwiYzQ1YjljZjI2YmFkNDY3OWY5NTBkNWIyYTA0MDUzYjY2ZDI1OTM0MFwiLFxuICBcIl9mcm9tXCI6IFwid2VicGFnZUA+PTAuMS4wIDwwLjIuMFwiXG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcIndpemFyZGFtaWdvc2luc3RpdHV0ZVwiLFxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJkZXNjcmlwdGlvblwiOiBcIldpemFyZCBBbWlnb3MgSW5zdGl0dXRlIFdlYnNpdGVcIixcbiAgXCJtYWluXCI6IFwiU09VUkNFL2luZGV4LmpzXCIsXG4gIFwic3R5bGVcIjogXCJTT1VSQ0UvaW5kZXguY3NzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImZhc3Rkb21cIjogXCJeMC44LjZcIixcbiAgICBcIm1pbml4aHJcIjogXCJeMS4xLjBcIixcbiAgICBcInJlc3JjaWZ5XCI6IFwiXjEuMS4zXCIsXG4gICAgXCJ3ZWJwYWdlXCI6IFwiXjAuMS4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYXRvbWlmeVwiOiBcIl43LjEuMFwiLFxuICAgIFwiYmFiZWxpZnlcIjogXCJeNi4wLjJcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYXRvbWlmeVwiOiBcImF0b21pZnlcIixcbiAgICBcInRlc3RcIjogXCJlY2hvIFxcXCJFcnJvcjogbm8gdGVzdCBzcGVjaWZpZWRcXFwiICYmIGV4aXQgMSAjdGVzdGVtIHN0YXJ0IC0tc2luZ2xlUnVuXCIsXG4gICAgXCItLS1cIjogXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIsXG4gICAgXCJidWlsZDpzY3JpcHRzXCI6IFwiI2Jyb3dzZXJpZnkgLWQgYXNzZXRzL3NjcmlwdHMvbWFpbi5qcyAtcCBbbWluaWZ5aWZ5IC0tY29tcHJlc3NQYXRoIC4gLS1tYXAgbWFpbi5qcy5tYXAgLS1vdXRwdXQgZGlzdC9tYWluLmpzLm1hcF0gfCBoYXNobWFyayAtbiBkaXN0L21haW4uanMgLXMgLWwgOCAtbSBhc3NldHMuanNvbiAnZGlzdC97bmFtZX17aGFzaH17ZXh0fSdcIixcbiAgICBcImpzY3NcIjogXCIjanNjcyBlc2hpbnQgZXNsaW50Li4uXCIsXG4gICAgXCJ1Z2xpZnlcIjogXCIjdWdsaWZ5XCIsXG4gICAgXCJwbmdcIjogXCIjb3B0aW1nXCIsXG4gICAgXCJqcGdcIjogXCIjanBnb1wiLFxuICAgIFwiY3NzbVwiOiBcIiN5Y3NzbWluICoqLmNzcyAjY3NzbWluXCIsXG4gICAgXCJjc3N2XCI6IFwiI2Nzcy12YWxpZGF0b3IgKiouY3NzXCIsXG4gICAgXCJjc3NwXCI6IFwiI2Nzcy1wcmV0dGlmaWVyICoqLmNzc1wiLFxuICAgIFwiaHRtbFwiOiBcIiNodG1sNS1saW50ICoqLmh0bWxcIixcbiAgICBcImJ1aWxkVlwiOiBcIiNybSAtcmYgUkVMRUFTRSAmJiBta2RpciBSRUxFQVNFICYmIG5vZGUgbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvYmluL2NtZC5qcyBTT1VSQ0UvaW5kZXguanMgLWQgLW8gUkVMRUFTRS9pbmRleC52JChjYXQgcGFja2FnZS5qc29uIHwgZ3JlcCB2ZXJzaW9uIHwgZ3JlcCAtUG8gJyg/PD12ZXJzaW9uXFxcIjogXFxcIikuKig/PVxcXCIpJykuYnVuZGxlLmpzXCIsXG4gICAgXCJ3YXRjaFZcIjogXCIjcm0gLXJmIFJFTEVBU0UgJiYgbWtkaXIgUkVMRUFTRSAmJiBub2RlIG5vZGVfbW9kdWxlcy93YXRjaGlmeS9iaW4vY21kLmpzIFNPVVJDRS9pbmRleC5qcyAtbyBSRUxFQVNFL2luZGV4LnYkKGNhdCBwYWNrYWdlLmpzb24gfCBncmVwIHZlcnNpb24gfCBncmVwIC1QbyAnKD88PXZlcnNpb25cXFwiOiBcXFwiKS4qKD89XFxcIiknKS5idW5kbGUuanNcIixcbiAgICBcIm9wZW46cHJvZFwiOiBcIiNvcGVuZXIgaHR0cDovL2V4YW1wbGUuY29tXCIsXG4gICAgXCJvcGVuOnN0YWdlXCI6IFwiI29wZW5lciBodHRwOi8vc3RhZ2luZy5leGFtcGxlLmludGVybmFsXCIsXG4gICAgXCJvcGVuOmRldlwiOiBcIiNvcGVuZXIgaHR0cDovL2xvY2FsaG9zdDo5MDkwXCIsXG4gICAgXCJkZXBsb3k6cHJvZFwiOiBcIiNzMy1jbGkgc3luYyAuL2Rpc3QvIHMzOi8vZXhhbXBsZS1jb20vcHJvZC1zaXRlL1wiLFxuICAgIFwiZGVwbG95OnN0YWdlXCI6IFwiI3MzLWNsaSBzeW5jIC4vZGlzdC8gczM6Ly9leGFtcGxlLWNvbS9zdGFnZS1zaXRlL1wiXG4gIH0sXG4gIFwiYXRvbWlmeVwiOiB7XG4gICAgXCJzZXJ2ZXJcIjoge1xuICAgICAgXCJvcGVuXCI6IHRydWUsXG4gICAgICBcInBhdGhcIjogXCJpbmRleC5odG1sXCIsXG4gICAgICBcImxyXCI6IHtcbiAgICAgICAgXCJ2ZXJib3NlXCI6IHRydWUsXG4gICAgICAgIFwicXVpZXRcIjogZmFsc2UsXG4gICAgICAgIFwicG9ydFwiOiAzMTMzNyxcbiAgICAgICAgXCJzeW5jXCI6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIFwianNcIjoge1xuICAgICAgXCJlbnRyeVwiOiBcIlNPVVJDRS9pbmRleC5qc1wiLFxuICAgICAgXCJhbGlhc1wiOiBcImJ1bmRsZS5qc1wiLFxuICAgICAgXCJvdXRwdXRcIjogXCJCVU5ETEUvYnVuZGxlLmpzXCIsXG4gICAgICBcImRlYnVnXCI6IHRydWUsXG4gICAgICBcIndhdGNoXCI6IHRydWUsXG4gICAgICBcInRyYW5zZm9ybVwiOiBbXG4gICAgICAgIFwiYmFiZWxpZnlcIlxuICAgICAgXSxcbiAgICAgIFwic3RhbmRhbG9uZVwiOiBcIkFQSVwiXG4gICAgfSxcbiAgICBcImNzc1wiOiB7XG4gICAgICBcImVudHJ5XCI6IFwiU09VUkNFL2luZGV4LmNzc1wiLFxuICAgICAgXCJhbGlhc1wiOiBcImJ1bmRsZS5jc3NcIixcbiAgICAgIFwib3V0cHV0XCI6IFwiQlVORExFL2J1bmRsZS5jc3NcIixcbiAgICAgIFwiZGVidWdcIjogdHJ1ZSxcbiAgICAgIFwid2F0Y2hcIjogdHJ1ZSxcbiAgICAgIFwiYXV0b3ByZWZpeGVyXCI6IHtcbiAgICAgICAgXCJicm93c2Vyc1wiOiBbXG4gICAgICAgICAgXCI+IDElXCIsXG4gICAgICAgICAgXCJJRSA3XCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJjYXNjYWRlXCI6IGZhbHNlXG4gICAgICB9LFxuICAgICAgXCJjb21wcmVzc1wiOiBmYWxzZSxcbiAgICAgIFwicGx1Z2luXCI6IFtdXG4gICAgfSxcbiAgICBcImFzc2V0c1wiOiB7XG4gICAgICBcImRlc3RcIjogXCJCVU5ETEUvYXNzZXRzL1wiLFxuICAgICAgXCJwcmVmaXhcIjogXCIvQlVORExFL2Fzc2V0cy9cIixcbiAgICAgIFwicmV0YWluTmFtZVwiOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS93aXphcmRhbWlnb3NpbnN0aXR1dGUvd2l6YXJkYW1pZ29zaW5zdGl0dXRlLmdpdGh1Yi5pby5naXRcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInRlYWNoaW5nXCIsXG4gICAgXCJ0ZWFjaGVyXCIsXG4gICAgXCJsZWFybmluZ1wiLFxuICAgIFwiamF2YXNjcmlwdFwiLFxuICAgIFwiYmVybGluXCIsXG4gICAgXCJsZWFybmVyXCIsXG4gICAgXCJwcm9ncmFtbWluZ1wiLFxuICAgIFwic2Nob29sXCIsXG4gICAgXCJ1bml2ZXJzaXR5XCIsXG4gICAgXCJhY2FkZW15XCIsXG4gICAgXCJpbnN0aXR1dGVcIixcbiAgICBcIndpemFyZFwiLFxuICAgIFwiYW1pZ29zXCIsXG4gICAgXCJub2RlXCIsXG4gICAgXCJub2RlanNcIixcbiAgICBcImh0bWxcIixcbiAgICBcImNzc1wiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJzZXJhcGF0aFwiLFxuICAgIFwiZW1haWxcIjogXCJkZXZAc2VyYXBhdGguZGVcIixcbiAgICBcInVybFwiOiBcImh0dHA6Ly93d3cuZ2l0aHViLmNvbS9zZXJhcGF0aFwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIkdOVSBBR1BMXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vd2l6YXJkYW1pZ29zaW5zdGl0dXRlL3dpemFyZGFtaWdvc2luc3RpdHV0ZS5naXRodWIuaW8vaXNzdWVzXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHA6Ly93aXphcmQuYW1pZ29zLmluc3RpdHV0ZVwiXG59XG4iXX0=
