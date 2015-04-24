(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.wizardamigosinstitute = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  MODULE INTERNALS
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
module.exports = '<div class="wizardamigos">\n' +
    '  <style>\n' +
    '    body               {\n' +
    '      background-color : #ff00ff;\n' +
    '      margin           : 0;\n' +
    '      padding          : 0;\n' +
    '    }\n' +
    '    .wizardamigos      {\n' +
    '      font-size        : 3vmin;\n' +
    '      width            : 50vw;\n' +
    '      margin           : 0 auto;\n' +
    '    }\n' +
    '    .wizardamigos__intro,\n' +
    '    .wizardamigos__scrolls,\n' +
    '    .wizardamigos__schedule,\n' +
    '    .wizardamigos__requirements,\n' +
    '    .wizardamigos__about,\n' +
    '    .wizardamigos__application,\n' +
    '    .wizardamigos__join {\n' +
    '      background-color : #cc00cc;\n' +
    '      padding          : 2vmin;\n' +
    '      border           : 2vmin solid #990099;\n' +
    '      margin-top       : 2vmin;\n' +
    '      margin-bottom    : 2vmin;\n' +
    '    }\n' +
    '  </style>\n' +
    '  <div class="wizardamigos__logo"></div>\n' +
    '  <div class="wizardamigos__menu"></div>\n' +
    '  <div class="wizardamigos__intro">\n' +
    '    Welcome, amigos. Come, learn to code with us. Wizard Amigos Institute\n' +
    '    designs co-learning programming classes. The idea is to create open,\n' +
    '    friendly & collaborative atmosphere for learners. We are going to try\n' +
    '    hard to make this learning journey exciting for our future wizard amigos.\n' +
    '  </div>\n' +
    '  <div class="wizardamigos__scrolls">\n' +
    '    Magic Scrolls\n' +
    '\n' +
    '    We will be covering all the elements that would interest wizard apprentices.\n' +
    '    Magic spells that we will be covering during our classes:\n' +
    '    <ul>\n' +
    '      <li>Operating System [unix & bash]</li>\n' +
    '      <li>Collaboration [git, github & Co.]</li>\n' +
    '      <li>Markup Languages [markdown, html & css]</li>\n' +
    '      <li>Programming [javascript & regex]</li>\n' +
    '      <li>DevOps [npm & nodejs & browserify]</li>\n' +
    '    </ul>\n' +
    '  </div>\n' +
    '  <div class="wizardamigos__schedule">\n' +
    '    Classes of Magic\n' +
    '\n' +
    '    Wizard Amigos Institute will start running from May 1, 2015 on.\n' +
    '\n' +
    '    Class of Magic (May 4 - Jun 22, 2015)\n' +
    '    8x\n' +
    '    Mondays (16 - 19h)\n' +
    '    Co_up (Adalbertstrasse 8)\n' +
    '\n' +
    '    Class of Magic (May 6 - Jun 24, 2015)\n' +
    '    8x\n' +
    '    Wednesdays (16 - 19h)\n' +
    '    St.Oberholz(Rosenthaler Platz)\n' +
    '\n' +
    '    Class of Magic (May 14 - Jul 2, 2015)\n' +
    '    8x\n' +
    '    Thursdays (16 - 19h)\n' +
    '    C-Base (Rungestrasse)\n' +
    '\n' +
    '    Each class will last 3 full hours. It will accept up to 10 learners and will be run by at least 2 higher-level wizards. For each meetup we will try to prepare short screencasts and other materials with different assignments. For all who want to do more there will also be homework so learners will be able to practice their spells. We also encourage all the participants to have some project they want to work on (but if they don\'t, no worries, will help them find one).\n' +
    '\n' +
    '    First meeting is going to be informal and will include helping learners get set up with Linux and getting started with some of the basics. The "formal" class part will begin the second week.\n' +
    '\n' +
    '    Hack-and-tell days will also be organised and wizards will be able to share what they are working on there. This will be easy going events where learners will be able to get some feedback and to inspire those who want to join wizard amigos.\n' +
    '  </div>\n' +
    '  <div class="wizardamigos__requirements">\n' +
    '    Unlocking Charm\n' +
    '\n' +
    '    There are some requirements for the Classes of Magic.\n' +
    '\n' +
    '    You need to have your own computer. It doesn\'t have to be super powerful, but you need one. It needs to run on Mac OS or Linux. If you have Windows, we will help you install Linux.\n' +
    '\n' +
    '    You also have to be able to understand some basic English. Most of the programming materials, tutorials and games are in English. Mentors do speak German (and English is their second language), so you will be able to speak German, but you really have to be able to understand English.\n' +
    '\n' +
    '  </div>\n' +
    '  <div class="wizardamigos__about">\n' +
    '    Who is Wizard Amigos Institute for\n' +
    '\n' +
    '    It is for girls and guys who want to learn special magic programming wizardry. You have to be at least 8yrs old and have basic computer skills.\n' +
    '\n' +
    '    This is not a typical school. It is a Wizard institute that encourages self-learning, collaboration and learning-by-doing approach. We will help you get to know the right magic spells and prepare you to become an active problem solver.\n' +
    '\n' +
    '    If you are not sure whether you should apply, contact us and we will quickly send you a reply.\n' +
    '  </div>\n' +
    '  <div class="wizardamigos__application">\n' +
    '    Apply\n' +
    '\n' +
    '    Pick the Class you want to apply for. Just click "Apply button" under the class you selected. Price for the 8 week class is 240 EUR. If you can\'t afford the class, we also offer pay-what-you-can program and the difference in price is covered with donations. From each fully paid class we will donate 40 EUR to support pay-what-you-can program. We are also open for outside donations.\n' +
    '\n' +
    '    Class of Magic (May 4 - Jun 22, 2015)\n' +
    '    8x\n' +
    '    Mondays (16 - 19h)\n' +
    '    Co_up (Adalbertstrasse 8)\n' +
    '\n' +
    '    ==> APPLY\n' +
    '\n' +
    '\n' +
    '    Class of Magic (May 6 - Jun 24, 2015)\n' +
    '    8x\n' +
    '    Wednesdays (16 - 19h)\n' +
    '    St.Oberholz\n' +
    '\n' +
    '    ==> APPLY\n' +
    '\n' +
    '\n' +
    '    Class of Magic (May 14 - Jul 2, 2015)\n' +
    '    8x\n' +
    '    Thursdays (16 - 19h)\n' +
    '    C-Base\n' +
    '\n' +
    '    ==> APPLY\n' +
    '  </div>\n' +
    '  <div class="wizardamigos__join">\n' +
    '    Mad Science\n' +
    '\n' +
    '    Want to join us? Do you happen to be a Wizard yourself and would like to help as a teacher or speaker? Go to our Github organization.\n' +
    '  </div>\n' +
    '</div>\n' +
    '';
},{}],3:[function(require,module,exports){
/******************************************************************************
  DEPENDENCIES
******************************************************************************/
var pkg         = require('../../package.json');
// var params      = require('') try load files in iframe and scrape it
// https://www.npmjs.com/package/iframe-api
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
  title       : 'Wizard Amigos Institute',
  description : pkg.description,
  version     : pkg.version,
  keywords    : pkg.keywords.join(', '),
  author      : pkg.author.name,
  website     : pkg.homepage,
};
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
  "dependencies": {
    "fastdom": "^0.8.6",
    "minixhr": "^1.1.0",
    "webpage": "^0.1.0"
  },
  "devDependencies": {
    "babelify": "^6.0.2",
    "browser-sync": "^2.6.4",
    "browserify": "^9.0.8",
    "html2js-browserify": "0.0.2",
    "watchify": "^3.1.2"
  },
  "scripts": {
    "bundle": "mkdir -p BUNDLE && browserify -s $npm_package_name SOURCE/index.js -o BUNDLE/bundle.js",
    "watch": "mkdir -p BUNDLE && watchify -s $npm_package_name SOURCE/index.js -o BUNDLE/bundle.js",
    "sync": "browser-sync start --files 'BUNDLE/bundle.js, BUNDLE/assets/*.*' --server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/wizardamigosinstitute/wizardamigosinstitute.github.io.git"
  },
  "browserify": {
    "transform": [
      "babelify",
      "html2js-browserify"
    ]
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