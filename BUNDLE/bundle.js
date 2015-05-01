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

  /******** WIRE UP ********/
  // __Heart.addEventListener('click', function onclick (event) {
  //   eventstop(event);
  //   alert('#sign up');
  //   router('index.html#signup');
  // });
  /****** INITIALIZE *******/
  fastdom.write(function INIT() {
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
  /******** RETURN *********/
  var API = {}; // should be an event emitter too
  return API;
}

},{"./index.template.html":2,"_config":3,"fastdom":4,"webpage":5}],2:[function(require,module,exports){
module.exports = '<div class="wizardamigos">\n  <img class="wizardamigos__logo" src="/BUNDLE/assets/061915d010311d6e.svg">\n  <div id="fb-root"></div>\n  <div class="fb-share-button"\n    data-href="http://wizard.amigos.institute/"\n    data-layout="button"\n    >\n  </div><br>\n  <a style="display:block" class="twitter-share-button"\n    href="https://twitter.com/share"\n    data-url="http://bit.ly/wizardamigosinstitute"\n    data-counturl="http://wizard.amigos.institute"\n    data-text="Coding for kids in berlin :-)"\n    data-hashtags="a b c"\n    data-related="serapath:Wizard Amigos Organizer"\n    data-lang="de"\n    data-via="wizardamigos"\n    data-size="normal"\n    data-count="none">\n  Tweet us :-)\n  </a>\n  <div class="wizardamigos__menu">\n    <a href="#intro">Intro</a> |\n    <a href="#scrolls">Scrolls</a> |\n    <a href="#schedule">Schedule</a> |\n    <a href="#requirements">Requirements</a> |\n    <a href="#about">About</a> |\n    <a href="#join">Join</a><br>\n    <a target="_blank" href="https://www.youtube.com/channel/UCf8NkXwmFrhAtZIu0dU7zhg">Screencasts</a> |\n    <a target="_blank" href="https://github.com/wizardamigosinstitute">Github Organisation</a> |\n    <a href="#calender">Calendar</a>\n    <!-- facebook + twitter + googleplus links -->\n  </div>\n  <!-- Calling all wizards! If you are skilled in the ways of coding wizardry already, -->\n  <!-- <a target="_blank" href="">lend your wizardly powers</a> -->\n  <!-- to help teach! -->\n  <div id="intro" class="wizardamigos__intro">\n    <h1 class="wizardamigos__title">Welcome, wizard amigos.</h1>\n    <p class="wizardamigos__subtitle">Come, learn to code with us.</p>\n    <p>\n      Wizard Amigos Institute is a co-learning programming class. It is an open,\n      friendly and collaborative space for girls and boys to learn how to code.\n      Folks from communities that have historically been excluded from tech are very much encouraged to apply!\n    </p>\n  </div>\n  <div id="scrolls" class="wizardamigos__scrolls">\n    <h1 class="wizardamigos__title">Magic Spells</h1>\n    <p>\n      We cover the main elements that every wizard apprentice needs to know:\n    </p>\n    <ul>\n      <li>Operating System\n        <ul><li class="wizardamigos__bullets">unix & bash</li></ul>\n      </li>\n      <li>Markup Languages\n        <ul><li class="wizardamigos__bullets">markdown, html & css</li></ul>\n      </li>\n      <li>Tools\n        <ul><li class="wizardamigos__bullets">chrome dev tools & atom.io</li></ul>\n      </li>\n      <li>Collaboration\n        <ul><li class="wizardamigos__bullets">github, gitter, waffle & co.</li></ul>\n      </li>\n      <li>Programming\n        <ul><li class="wizardamigos__bullets">javascript, nodejs & regex</li></ul>\n      </li>\n      <li>DevOps\n        <ul><li class="wizardamigos__bullets">npm, git & browserify</li></ul>\n      </li>\n    </ul>\n    <p>\n      Magic is serious business.\n      There will be homeworks,\n      so the learners will be able to practice their spells.\n      To help them, we will produce a simple video summary after each session.\n    </p>\n    <p>\n      We also encourage all the participants to have some project they want to work on\n      <i>(but if they don\'t, no worries, will help them find one).</i>\n    </p>\n  </div>\n  <div id="schedule" class="wizardamigos__schedule">\n    <h1 class="wizardamigos__title">Classes of Magic</h1>\n    <p>\n      Wizard Amigos Institute will open its doors in <b>May 2015</b>.\n      Every class will accept <b>up to 10 learners</b>\n      and will be run by at least 2 higher-level wizards.\n    </p>\n    <p>\n      <br>\n      <span style="color:#fff; font-weight:900">Class of Magic</span><br>\n      Mondays or Thursdays (16:00 - 17:30)<br>\n      120 EUR / month<br>\n      <a target="_blank" href="https://www.google.de/maps/dir//co.up,+Adalbertstra%C3%9Fe+8,+10999+Berlin,+Deutschland/@52.50033,13.419786,17z/data=!4m12!1m3!3m2!1s0x47a84e337e23d413:0x2cfd69e5a9f68f1a!2sco.up!4m7!1m0!1m5!1m1!1s0x47a84e337e23d413:0x2cfd69e5a9f68f1a!2m2!1d13.419786!2d52.50033">Co_up (Adalbertstrasse 8)</a>\n      <a class="wizardamigos__apply" href=\'mailto:wizard@amigos.institute?Subject=Application:%20Mondays%20or%20Thursdays%20(16:00%20-%2017.30)&Body=%0D%0A\'>Apply</a><br>\n    </p>\n    <p>\n      <br>\n      <span style="color:#fff; font-weight:900">Class of Magic</span><br>\n      Mondays or Thursdays (16:00 - 19:00)<br>\n      240 EUR / month<br>\n      <a target="_blank" href="https://www.google.de/maps/dir//co.up,+Adalbertstra%C3%9Fe+8,+10999+Berlin,+Deutschland/@52.50033,13.419786,17z/data=!4m12!1m3!3m2!1s0x47a84e337e23d413:0x2cfd69e5a9f68f1a!2sco.up!4m7!1m0!1m5!1m1!1s0x47a84e337e23d413:0x2cfd69e5a9f68f1a!2m2!1d13.419786!2d52.50033">Co_up (Adalbertstrasse 8)</a>\n      <a target="_blank" class="wizardamigos__apply" href=\'mailto:wizard@amigos.institute?Subject=Application:%20Mondays%20or%20Thursdays%20(16:00%20-%2019.00)&Body=%0D%0A\'>Apply</a><br>\n    </p>\n    <p>\n      <br>\n      From each paid class we will donate a certain amount to support the pay-what-you-can program.\n      Those who apply for the pay-what-you-can-program, will be added to\n      the queue and informed when the next free slot is available.\n      We are also open for <a target="_blank" href=\'mailto:wizard@amigos.institute?Subject=I%20would%20like%20to%20donate&Body=%0D%0A\'>donations</a>.\n    </p>\n  </div>\n  <div id="requirements" class="wizardamigos__requirements">\n    <h1 class="wizardamigos__title">Unlocking Charm</h1>\n\n    <span style="color:#fff; font-weight:900">There are some requirements for Classes of Magic:</span>\n    <p>You need to have your own computer. It doesn\'t have to be super powerful, but you need one.</p>\n    <p>It needs to run on Mac OSX or Linux. If you have Windows, we will help you install Linux.</p>\n    <p>\n      You should have basic computer skills and feel comfortable\n      finding information on the internet.\n    </p>\n    <p>\n      Most of the modern programming materials, tutorials and other online resources are written in english,\n      so you should understand the basics. Mentors speak german and english, so they can help you out.\n    </p>\n    <p>\n      You doesn’t need an academic background in computer science or be good at Maths to become a successful developer\n    </p>\n    <p>\n      If you are not sure whether you should apply,\n      <a target="_blank" href="mailto:wizard@amigos.institute">contact us</a>\n      and we will happy to talk to you.\n    </p>\n  </div>\n  <div id="about" class="wizardamigos__about">\n    <h1 class="wizardamigos__title">Who is Wizard Amigos Institute for</h1>\n    <p>\n      It is for girls and boys who want to learn special magic programming wizardry.\n    </p>\n    <p>\n      This is not a typical school. It is a Wizard Institute that promotes\n      collaboration and a learning-by-doing approach. We will help you get to know the\n      right magic spells and prepare you to become an active problem solver.\n    </p>\n    <p>\n      If you want to know more, please checkout\n      <a href="https://github.com/wizardamigosinstitute/organisation/blob/master/README.md">\n        more details\n      </a>\n    </p>\n  </div>\n  <div id="join" class="wizardamigos__join">\n    <h1 class="wizardamigos__title">Mad Science</h1>\n    <p><b>Want to join us?</b></p>\n    Do you happen to be a Wizard yourself and would like to help as a teacher or speaker?\n    <p>Join our <a target="_blank" href="http://meetup.com/codingamigos">Coding Amigos Meetup</a></p>\n    <p>or chat with us on <a target="_blank" href="https://gitter.im/wizardamigosinstitute/chat">Gitter</a>.</p>\n  </div>\n</div>\n';
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
  ga          : 'UA-62310807-1',
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
  "_from": "webpage@0.3.0"
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
    "social-share": "^0.1.0",
    "webpage": "^0.3.0"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9hdG9taWZ5L25vZGVfbW9kdWxlcy9hdG9taWZ5LWpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zZXJhcGF0aC93b3Jrc3BhY2Uvc2VyYXNlZWQvSE9MRElORy93aXphcmQuYW1pZ29zLmluc3RpdHV0ZS93aXphcmRhbWlnb3NpbnN0aXR1dGUuZ2l0aHViLmlvL1NPVVJDRS9pbmRleC5qcyIsIlNPVVJDRS9pbmRleC50ZW1wbGF0ZS5odG1sIiwiU09VUkNFL25vZGVfbW9kdWxlcy9fY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL2Zhc3Rkb20vaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9TT1VSQ0Uvbm9kZV9tb2R1bGVzL19jb25maWcuanMiLCJub2RlX21vZHVsZXMvd2VicGFnZS9wYWNrYWdlLmpzb24iLCJwYWNrYWdlLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNHQSxZQUFZLENBQUM7O0FBQWIsSUFBTSxPQUFPLEdBQUssT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLElBQU0sT0FBTyxHQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CckMsSUFBTSxNQUFNLEdBQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDdkMsSUFBTSxRQUFRLEdBQUksT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDbkQsSUFBSSxFQUFFLEdBQVksUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OztBQUloRCxNQUFNLENBQUMsT0FBTyxHQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7OztBQUlqRSxTQUFTLHFCQUFxQixDQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBQ3pDLE1BQU0sU0FBUyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRTtBQUMzRCxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLE1BQU0sR0FBTSxTQUFTLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7O0FBV3ZFLFNBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEdBQUk7QUFDN0IsT0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFM0IsS0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0FBQ2xCLFVBQUksRUFBRTtVQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0MsVUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU87QUFDakMsUUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDcEMsUUFBRSxDQUFDLEdBQUcsR0FBRyxnRkFBZ0YsQ0FBQztBQUMxRixTQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDdEMsQ0FBQSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBRTs7QUFFekMsS0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDO0FBQ2YsVUFBSSxFQUFFO1VBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLEtBQUssSUFBRSxFQUFFLENBQUM7QUFDM0QsVUFBRyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxHQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckQsUUFBRSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBQyx5Q0FBeUMsQ0FBQztBQUMxRCxTQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUM7QUFDNUMsT0FBQyxDQUFDLEtBQUssR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFNBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQyxDQUFBLENBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxhQUFhLENBQUMsQ0FBRTtHQUV2QyxDQUFDLENBQUM7O0FBRUgsTUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2IsU0FBTyxHQUFHLENBQUM7Q0FDWjs7O0FDdEVEOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFUyA9IENVU1RPTSBTREsgW0N1c3RvbSBTb2Z0d2FyZSBEZXZlbG9wbWVudCBLaXRdXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCB3ZWJwYWdlICAgPSByZXF1aXJlKCd3ZWJwYWdlJyk7XG5jb25zdCBmYXN0ZG9tICAgPSByZXF1aXJlKCdmYXN0ZG9tJyk7XG4vLyB2YXIgbWluaXhociA9IHJlcXVpcmUoJ21pbml4aHInKTtcbiAgLy8gZnVuY3Rpb24gd2l6YXJkIChwYXJhbWV0ZXIpIHsgfVxuICAvLyB0cnkge1xuICAvLyAgIG1pbml4aHIoeyB1cmw6ICdwYXJhbXMuanNvbicgfSwgZnVuY3Rpb24gKGVycm9yLCBkYXRhKSB7XG4gIC8vICAgICBkZWJ1Z2dlcjtcbiAgLy8gICAgIGFsZXJ0KGVycm9yKTtcbiAgLy8gICAgIGFsZXJ0KGRhdGEpO1xuICAvLyAgIH0pO1xuICAvLyB9IGNhdGNoIChDT1JTZXJyb3IpIHtcbiAgLy8gICBhbGVydChDT1JTZXJyb3IpO1xuICAvLyB9XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaSB0b29sXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIE1PRFVMRSBJTlRFUk5BTFMgJiBIRUxQRVJTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBjb25maWcgICAgPSByZXF1aXJlKCdfY29uZmlnJykoKTtcbmNvbnN0IHRlbXBsYXRlICA9IHJlcXVpcmUoJy4vaW5kZXgudGVtcGxhdGUuaHRtbCcpO1xubGV0IF9fICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYUE9SVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgID0gd2l6YXJkYW1pZ29zaW5zdGl0dXRlKHdlYnBhZ2UoY29uZmlnKSwgY29uZmlnKTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhFQ1VUSU9OXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiB3aXphcmRhbWlnb3NpbnN0aXR1dGUgKGRvbSwgZGF0YSkgeyAvLyAnZGF0YScgbWF5YmUgYWxzbyB0byB1c2UgZm9yIGV2ZW50IGRlbGVnYXRpb24gcGF0dGVyblxuICBjb25zdCBDT01QT05FTlQgPSAoX18uaW5uZXJIVE1MPXRlbXBsYXRlLF9fLmNoaWxkTm9kZXNbMF0pO1xuICBjb25zdCBfX2xvZ28gICAgPSBDT01QT05FTlQucXVlcnlTZWxlY3RvckFsbCgnLndpemFyZGFtaWdvc19fbG9nbycpWzBdO1xuICBjb25zdCBfX21lbnUgICAgPSBDT01QT05FTlQucXVlcnlTZWxlY3RvckFsbCgnLndpemFyZGFtaWdvc19fbWVudScpWzBdO1xuXG5cblxuICAvKioqKioqKiogV0lSRSBVUCAqKioqKioqKi9cbiAgICAgIC8vIF9fSGVhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiBvbmNsaWNrIChldmVudCkge1xuICAgICAgLy8gICBldmVudHN0b3AoZXZlbnQpO1xuICAgICAgLy8gICBhbGVydCgnI3NpZ24gdXAnKTtcbiAgICAgIC8vICAgcm91dGVyKCdpbmRleC5odG1sI3NpZ251cCcpO1xuICAgICAgLy8gfSk7XG4gIC8qKioqKiogSU5JVElBTElaRSAqKioqKioqL1xuICBmYXN0ZG9tLndyaXRlKGZ1bmN0aW9uIElOSVQgKCkge1xuICAgIGRvbS5hcHBlbmRDaGlsZChDT01QT05FTlQpO1xuICAgIC8vIEZBQ0VCT09LXG4gICAgKGZ1bmN0aW9uKGQsIHMsIGlkKSB7XG4gICAgICB2YXIganMsIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07XG4gICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHJldHVybjtcbiAgICAgIGpzID0gZC5jcmVhdGVFbGVtZW50KHMpOyBqcy5pZCA9IGlkO1xuICAgICAganMuc3JjID0gXCIvL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX0dCL3Nkay5qcyN4ZmJtbD0xJnZlcnNpb249djIuMyZhcHBJZD0zMjIyNDk4ODEyNDAyNjJcIjtcbiAgICAgIGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcbiAgICB9KGRvY3VtZW50LCAnc2NyaXB0JywgJ2ZhY2Vib29rLWpzc2RrJykpO1xuICAgIC8vIFRXSVRURVJcbiAgICAoZnVuY3Rpb24oZCxzLGlkKXtcbiAgICAgIHZhciBqcyxmanM9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXSx0PXdpbmRvdy50d3R0cnx8e307XG4gICAgICBpZihkLmdldEVsZW1lbnRCeUlkKGlkKSlyZXR1cm47anM9ZC5jcmVhdGVFbGVtZW50KHMpO1xuICAgICAganMuaWQ9aWQ7anMuc3JjPVwiaHR0cHM6Ly9wbGF0Zm9ybS50d2l0dGVyLmNvbS93aWRnZXRzLmpzXCI7XG4gICAgICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsZmpzKTt0Ll9lPVtdO1xuICAgICAgdC5yZWFkeT1mdW5jdGlvbihmKXt0Ll9lLnB1c2goZik7fTtyZXR1cm4gdDtcbiAgICAgIH0oZG9jdW1lbnQsXCJzY3JpcHRcIixcInR3aXR0ZXItd2pzXCIpKTtcblxuICB9KTtcbiAgLyoqKioqKioqIFJFVFVSTiAqKioqKioqKiovXG4gIHZhciBBUEkgPSB7fTsgLy8gc2hvdWxkIGJlIGFuIGV2ZW50IGVtaXR0ZXIgdG9vXG4gIHJldHVybiBBUEk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwid2l6YXJkYW1pZ29zXCI+XFxuICA8aW1nIGNsYXNzPVwid2l6YXJkYW1pZ29zX19sb2dvXCIgc3JjPVwiL0JVTkRMRS9hc3NldHMvMDYxOTE1ZDAxMDMxMWQ2ZS5zdmdcIj5cXG4gIDxkaXYgaWQ9XCJmYi1yb290XCI+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZmItc2hhcmUtYnV0dG9uXCJcXG4gICAgZGF0YS1ocmVmPVwiaHR0cDovL3dpemFyZC5hbWlnb3MuaW5zdGl0dXRlL1wiXFxuICAgIGRhdGEtbGF5b3V0PVwiYnV0dG9uXCJcXG4gICAgPlxcbiAgPC9kaXY+PGJyPlxcbiAgPGEgc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCIgY2xhc3M9XCJ0d2l0dGVyLXNoYXJlLWJ1dHRvblwiXFxuICAgIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tL3NoYXJlXCJcXG4gICAgZGF0YS11cmw9XCJodHRwOi8vYml0Lmx5L3dpemFyZGFtaWdvc2luc3RpdHV0ZVwiXFxuICAgIGRhdGEtY291bnR1cmw9XCJodHRwOi8vd2l6YXJkLmFtaWdvcy5pbnN0aXR1dGVcIlxcbiAgICBkYXRhLXRleHQ9XCJDb2RpbmcgZm9yIGtpZHMgaW4gYmVybGluIDotKVwiXFxuICAgIGRhdGEtaGFzaHRhZ3M9XCJhIGIgY1wiXFxuICAgIGRhdGEtcmVsYXRlZD1cInNlcmFwYXRoOldpemFyZCBBbWlnb3MgT3JnYW5pemVyXCJcXG4gICAgZGF0YS1sYW5nPVwiZGVcIlxcbiAgICBkYXRhLXZpYT1cIndpemFyZGFtaWdvc1wiXFxuICAgIGRhdGEtc2l6ZT1cIm5vcm1hbFwiXFxuICAgIGRhdGEtY291bnQ9XCJub25lXCI+XFxuICBUd2VldCB1cyA6LSlcXG4gIDwvYT5cXG4gIDxkaXYgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX21lbnVcIj5cXG4gICAgPGEgaHJlZj1cIiNpbnRyb1wiPkludHJvPC9hPiB8XFxuICAgIDxhIGhyZWY9XCIjc2Nyb2xsc1wiPlNjcm9sbHM8L2E+IHxcXG4gICAgPGEgaHJlZj1cIiNzY2hlZHVsZVwiPlNjaGVkdWxlPC9hPiB8XFxuICAgIDxhIGhyZWY9XCIjcmVxdWlyZW1lbnRzXCI+UmVxdWlyZW1lbnRzPC9hPiB8XFxuICAgIDxhIGhyZWY9XCIjYWJvdXRcIj5BYm91dDwvYT4gfFxcbiAgICA8YSBocmVmPVwiI2pvaW5cIj5Kb2luPC9hPjxicj5cXG4gICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2NoYW5uZWwvVUNmOE5rWHdtRnJoQXRaSXUwZFU3emhnXCI+U2NyZWVuY2FzdHM8L2E+IHxcXG4gICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS93aXphcmRhbWlnb3NpbnN0aXR1dGVcIj5HaXRodWIgT3JnYW5pc2F0aW9uPC9hPiB8XFxuICAgIDxhIGhyZWY9XCIjY2FsZW5kZXJcIj5DYWxlbmRhcjwvYT5cXG4gICAgPCEtLSBmYWNlYm9vayArIHR3aXR0ZXIgKyBnb29nbGVwbHVzIGxpbmtzIC0tPlxcbiAgPC9kaXY+XFxuICA8IS0tIENhbGxpbmcgYWxsIHdpemFyZHMhIElmIHlvdSBhcmUgc2tpbGxlZCBpbiB0aGUgd2F5cyBvZiBjb2Rpbmcgd2l6YXJkcnkgYWxyZWFkeSwgLS0+XFxuICA8IS0tIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJcIj5sZW5kIHlvdXIgd2l6YXJkbHkgcG93ZXJzPC9hPiAtLT5cXG4gIDwhLS0gdG8gaGVscCB0ZWFjaCEgLS0+XFxuICA8ZGl2IGlkPVwiaW50cm9cIiBjbGFzcz1cIndpemFyZGFtaWdvc19faW50cm9cIj5cXG4gICAgPGgxIGNsYXNzPVwid2l6YXJkYW1pZ29zX190aXRsZVwiPldlbGNvbWUsIHdpemFyZCBhbWlnb3MuPC9oMT5cXG4gICAgPHAgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3N1YnRpdGxlXCI+Q29tZSwgbGVhcm4gdG8gY29kZSB3aXRoIHVzLjwvcD5cXG4gICAgPHA+XFxuICAgICAgV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUgaXMgYSBjby1sZWFybmluZyBwcm9ncmFtbWluZyBjbGFzcy4gSXQgaXMgYW4gb3BlbixcXG4gICAgICBmcmllbmRseSBhbmQgY29sbGFib3JhdGl2ZSBzcGFjZSBmb3IgZ2lybHMgYW5kIGJveXMgdG8gbGVhcm4gaG93IHRvIGNvZGUuXFxuICAgICAgRm9sa3MgZnJvbSBjb21tdW5pdGllcyB0aGF0IGhhdmUgaGlzdG9yaWNhbGx5IGJlZW4gZXhjbHVkZWQgZnJvbSB0ZWNoIGFyZSB2ZXJ5IG11Y2ggZW5jb3VyYWdlZCB0byBhcHBseSFcXG4gICAgPC9wPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGlkPVwic2Nyb2xsc1wiIGNsYXNzPVwid2l6YXJkYW1pZ29zX19zY3JvbGxzXCI+XFxuICAgIDxoMSBjbGFzcz1cIndpemFyZGFtaWdvc19fdGl0bGVcIj5NYWdpYyBTcGVsbHM8L2gxPlxcbiAgICA8cD5cXG4gICAgICBXZSBjb3ZlciB0aGUgbWFpbiBlbGVtZW50cyB0aGF0IGV2ZXJ5IHdpemFyZCBhcHByZW50aWNlIG5lZWRzIHRvIGtub3c6XFxuICAgIDwvcD5cXG4gICAgPHVsPlxcbiAgICAgIDxsaT5PcGVyYXRpbmcgU3lzdGVtXFxuICAgICAgICA8dWw+PGxpIGNsYXNzPVwid2l6YXJkYW1pZ29zX19idWxsZXRzXCI+dW5peCAmIGJhc2g8L2xpPjwvdWw+XFxuICAgICAgPC9saT5cXG4gICAgICA8bGk+TWFya3VwIExhbmd1YWdlc1xcbiAgICAgICAgPHVsPjxsaSBjbGFzcz1cIndpemFyZGFtaWdvc19fYnVsbGV0c1wiPm1hcmtkb3duLCBodG1sICYgY3NzPC9saT48L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgICAgPGxpPlRvb2xzXFxuICAgICAgICA8dWw+PGxpIGNsYXNzPVwid2l6YXJkYW1pZ29zX19idWxsZXRzXCI+Y2hyb21lIGRldiB0b29scyAmIGF0b20uaW88L2xpPjwvdWw+XFxuICAgICAgPC9saT5cXG4gICAgICA8bGk+Q29sbGFib3JhdGlvblxcbiAgICAgICAgPHVsPjxsaSBjbGFzcz1cIndpemFyZGFtaWdvc19fYnVsbGV0c1wiPmdpdGh1YiwgZ2l0dGVyLCB3YWZmbGUgJiBjby48L2xpPjwvdWw+XFxuICAgICAgPC9saT5cXG4gICAgICA8bGk+UHJvZ3JhbW1pbmdcXG4gICAgICAgIDx1bD48bGkgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2J1bGxldHNcIj5qYXZhc2NyaXB0LCBub2RlanMgJiByZWdleDwvbGk+PC91bD5cXG4gICAgICA8L2xpPlxcbiAgICAgIDxsaT5EZXZPcHNcXG4gICAgICAgIDx1bD48bGkgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2J1bGxldHNcIj5ucG0sIGdpdCAmIGJyb3dzZXJpZnk8L2xpPjwvdWw+XFxuICAgICAgPC9saT5cXG4gICAgPC91bD5cXG4gICAgPHA+XFxuICAgICAgTWFnaWMgaXMgc2VyaW91cyBidXNpbmVzcy5cXG4gICAgICBUaGVyZSB3aWxsIGJlIGhvbWV3b3JrcyxcXG4gICAgICBzbyB0aGUgbGVhcm5lcnMgd2lsbCBiZSBhYmxlIHRvIHByYWN0aWNlIHRoZWlyIHNwZWxscy5cXG4gICAgICBUbyBoZWxwIHRoZW0sIHdlIHdpbGwgcHJvZHVjZSBhIHNpbXBsZSB2aWRlbyBzdW1tYXJ5IGFmdGVyIGVhY2ggc2Vzc2lvbi5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICBXZSBhbHNvIGVuY291cmFnZSBhbGwgdGhlIHBhcnRpY2lwYW50cyB0byBoYXZlIHNvbWUgcHJvamVjdCB0aGV5IHdhbnQgdG8gd29yayBvblxcbiAgICAgIDxpPihidXQgaWYgdGhleSBkb25cXCd0LCBubyB3b3JyaWVzLCB3aWxsIGhlbHAgdGhlbSBmaW5kIG9uZSkuPC9pPlxcbiAgICA8L3A+XFxuICA8L2Rpdj5cXG4gIDxkaXYgaWQ9XCJzY2hlZHVsZVwiIGNsYXNzPVwid2l6YXJkYW1pZ29zX19zY2hlZHVsZVwiPlxcbiAgICA8aDEgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3RpdGxlXCI+Q2xhc3NlcyBvZiBNYWdpYzwvaDE+XFxuICAgIDxwPlxcbiAgICAgIFdpemFyZCBBbWlnb3MgSW5zdGl0dXRlIHdpbGwgb3BlbiBpdHMgZG9vcnMgaW4gPGI+TWF5IDIwMTU8L2I+LlxcbiAgICAgIEV2ZXJ5IGNsYXNzIHdpbGwgYWNjZXB0IDxiPnVwIHRvIDEwIGxlYXJuZXJzPC9iPlxcbiAgICAgIGFuZCB3aWxsIGJlIHJ1biBieSBhdCBsZWFzdCAyIGhpZ2hlci1sZXZlbCB3aXphcmRzLlxcbiAgICA8L3A+XFxuICAgIDxwPlxcbiAgICAgIDxicj5cXG4gICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiNmZmY7IGZvbnQtd2VpZ2h0OjkwMFwiPkNsYXNzIG9mIE1hZ2ljPC9zcGFuPjxicj5cXG4gICAgICBNb25kYXlzIG9yIFRodXJzZGF5cyAoMTY6MDAgLSAxNzozMCk8YnI+XFxuICAgICAgMTIwIEVVUiAvIG1vbnRoPGJyPlxcbiAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5nb29nbGUuZGUvbWFwcy9kaXIvL2NvLnVwLCtBZGFsYmVydHN0cmElQzMlOUZlKzgsKzEwOTk5K0JlcmxpbiwrRGV1dHNjaGxhbmQvQDUyLjUwMDMzLDEzLjQxOTc4NiwxN3ovZGF0YT0hNG0xMiExbTMhM20yITFzMHg0N2E4NGUzMzdlMjNkNDEzOjB4MmNmZDY5ZTVhOWY2OGYxYSEyc2NvLnVwITRtNyExbTAhMW01ITFtMSExczB4NDdhODRlMzM3ZTIzZDQxMzoweDJjZmQ2OWU1YTlmNjhmMWEhMm0yITFkMTMuNDE5Nzg2ITJkNTIuNTAwMzNcIj5Db191cCAoQWRhbGJlcnRzdHJhc3NlIDgpPC9hPlxcbiAgICAgIDxhIGNsYXNzPVwid2l6YXJkYW1pZ29zX19hcHBseVwiIGhyZWY9XFwnbWFpbHRvOndpemFyZEBhbWlnb3MuaW5zdGl0dXRlP1N1YmplY3Q9QXBwbGljYXRpb246JTIwTW9uZGF5cyUyMG9yJTIwVGh1cnNkYXlzJTIwKDE2OjAwJTIwLSUyMDE3LjMwKSZCb2R5PSUwRCUwQVxcJz5BcHBseTwvYT48YnI+XFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgPGJyPlxcbiAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6I2ZmZjsgZm9udC13ZWlnaHQ6OTAwXCI+Q2xhc3Mgb2YgTWFnaWM8L3NwYW4+PGJyPlxcbiAgICAgIE1vbmRheXMgb3IgVGh1cnNkYXlzICgxNjowMCAtIDE5OjAwKTxicj5cXG4gICAgICAyNDAgRVVSIC8gbW9udGg8YnI+XFxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lmdvb2dsZS5kZS9tYXBzL2Rpci8vY28udXAsK0FkYWxiZXJ0c3RyYSVDMyU5RmUrOCwrMTA5OTkrQmVybGluLCtEZXV0c2NobGFuZC9ANTIuNTAwMzMsMTMuNDE5Nzg2LDE3ei9kYXRhPSE0bTEyITFtMyEzbTIhMXMweDQ3YTg0ZTMzN2UyM2Q0MTM6MHgyY2ZkNjllNWE5ZjY4ZjFhITJzY28udXAhNG03ITFtMCExbTUhMW0xITFzMHg0N2E4NGUzMzdlMjNkNDEzOjB4MmNmZDY5ZTVhOWY2OGYxYSEybTIhMWQxMy40MTk3ODYhMmQ1Mi41MDAzM1wiPkNvX3VwIChBZGFsYmVydHN0cmFzc2UgOCk8L2E+XFxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2FwcGx5XCIgaHJlZj1cXCdtYWlsdG86d2l6YXJkQGFtaWdvcy5pbnN0aXR1dGU/U3ViamVjdD1BcHBsaWNhdGlvbjolMjBNb25kYXlzJTIwb3IlMjBUaHVyc2RheXMlMjAoMTY6MDAlMjAtJTIwMTkuMDApJkJvZHk9JTBEJTBBXFwnPkFwcGx5PC9hPjxicj5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICA8YnI+XFxuICAgICAgRnJvbSBlYWNoIHBhaWQgY2xhc3Mgd2Ugd2lsbCBkb25hdGUgYSBjZXJ0YWluIGFtb3VudCB0byBzdXBwb3J0IHRoZSBwYXktd2hhdC15b3UtY2FuIHByb2dyYW0uXFxuICAgICAgVGhvc2Ugd2hvIGFwcGx5IGZvciB0aGUgcGF5LXdoYXQteW91LWNhbi1wcm9ncmFtLCB3aWxsIGJlIGFkZGVkIHRvXFxuICAgICAgdGhlIHF1ZXVlIGFuZCBpbmZvcm1lZCB3aGVuIHRoZSBuZXh0IGZyZWUgc2xvdCBpcyBhdmFpbGFibGUuXFxuICAgICAgV2UgYXJlIGFsc28gb3BlbiBmb3IgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cXCdtYWlsdG86d2l6YXJkQGFtaWdvcy5pbnN0aXR1dGU/U3ViamVjdD1JJTIwd291bGQlMjBsaWtlJTIwdG8lMjBkb25hdGUmQm9keT0lMEQlMEFcXCc+ZG9uYXRpb25zPC9hPi5cXG4gICAgPC9wPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGlkPVwicmVxdWlyZW1lbnRzXCIgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3JlcXVpcmVtZW50c1wiPlxcbiAgICA8aDEgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX3RpdGxlXCI+VW5sb2NraW5nIENoYXJtPC9oMT5cXG5cXG4gICAgPHNwYW4gc3R5bGU9XCJjb2xvcjojZmZmOyBmb250LXdlaWdodDo5MDBcIj5UaGVyZSBhcmUgc29tZSByZXF1aXJlbWVudHMgZm9yIENsYXNzZXMgb2YgTWFnaWM6PC9zcGFuPlxcbiAgICA8cD5Zb3UgbmVlZCB0byBoYXZlIHlvdXIgb3duIGNvbXB1dGVyLiBJdCBkb2VzblxcJ3QgaGF2ZSB0byBiZSBzdXBlciBwb3dlcmZ1bCwgYnV0IHlvdSBuZWVkIG9uZS48L3A+XFxuICAgIDxwPkl0IG5lZWRzIHRvIHJ1biBvbiBNYWMgT1NYIG9yIExpbnV4LiBJZiB5b3UgaGF2ZSBXaW5kb3dzLCB3ZSB3aWxsIGhlbHAgeW91IGluc3RhbGwgTGludXguPC9wPlxcbiAgICA8cD5cXG4gICAgICBZb3Ugc2hvdWxkIGhhdmUgYmFzaWMgY29tcHV0ZXIgc2tpbGxzIGFuZCBmZWVsIGNvbWZvcnRhYmxlXFxuICAgICAgZmluZGluZyBpbmZvcm1hdGlvbiBvbiB0aGUgaW50ZXJuZXQuXFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgTW9zdCBvZiB0aGUgbW9kZXJuIHByb2dyYW1taW5nIG1hdGVyaWFscywgdHV0b3JpYWxzIGFuZCBvdGhlciBvbmxpbmUgcmVzb3VyY2VzIGFyZSB3cml0dGVuIGluIGVuZ2xpc2gsXFxuICAgICAgc28geW91IHNob3VsZCB1bmRlcnN0YW5kIHRoZSBiYXNpY3MuIE1lbnRvcnMgc3BlYWsgZ2VybWFuIGFuZCBlbmdsaXNoLCBzbyB0aGV5IGNhbiBoZWxwIHlvdSBvdXQuXFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgWW91IGRvZXNu4oCZdCBuZWVkIGFuIGFjYWRlbWljIGJhY2tncm91bmQgaW4gY29tcHV0ZXIgc2NpZW5jZSBvciBiZSBnb29kIGF0IE1hdGhzIHRvIGJlY29tZSBhIHN1Y2Nlc3NmdWwgZGV2ZWxvcGVyXFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgSWYgeW91IGFyZSBub3Qgc3VyZSB3aGV0aGVyIHlvdSBzaG91bGQgYXBwbHksXFxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIm1haWx0bzp3aXphcmRAYW1pZ29zLmluc3RpdHV0ZVwiPmNvbnRhY3QgdXM8L2E+XFxuICAgICAgYW5kIHdlIHdpbGwgaGFwcHkgdG8gdGFsayB0byB5b3UuXFxuICAgIDwvcD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBpZD1cImFib3V0XCIgY2xhc3M9XCJ3aXphcmRhbWlnb3NfX2Fib3V0XCI+XFxuICAgIDxoMSBjbGFzcz1cIndpemFyZGFtaWdvc19fdGl0bGVcIj5XaG8gaXMgV2l6YXJkIEFtaWdvcyBJbnN0aXR1dGUgZm9yPC9oMT5cXG4gICAgPHA+XFxuICAgICAgSXQgaXMgZm9yIGdpcmxzIGFuZCBib3lzIHdobyB3YW50IHRvIGxlYXJuIHNwZWNpYWwgbWFnaWMgcHJvZ3JhbW1pbmcgd2l6YXJkcnkuXFxuICAgIDwvcD5cXG4gICAgPHA+XFxuICAgICAgVGhpcyBpcyBub3QgYSB0eXBpY2FsIHNjaG9vbC4gSXQgaXMgYSBXaXphcmQgSW5zdGl0dXRlIHRoYXQgcHJvbW90ZXNcXG4gICAgICBjb2xsYWJvcmF0aW9uIGFuZCBhIGxlYXJuaW5nLWJ5LWRvaW5nIGFwcHJvYWNoLiBXZSB3aWxsIGhlbHAgeW91IGdldCB0byBrbm93IHRoZVxcbiAgICAgIHJpZ2h0IG1hZ2ljIHNwZWxscyBhbmQgcHJlcGFyZSB5b3UgdG8gYmVjb21lIGFuIGFjdGl2ZSBwcm9ibGVtIHNvbHZlci5cXG4gICAgPC9wPlxcbiAgICA8cD5cXG4gICAgICBJZiB5b3Ugd2FudCB0byBrbm93IG1vcmUsIHBsZWFzZSBjaGVja291dFxcbiAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vd2l6YXJkYW1pZ29zaW5zdGl0dXRlL29yZ2FuaXNhdGlvbi9ibG9iL21hc3Rlci9SRUFETUUubWRcIj5cXG4gICAgICAgIG1vcmUgZGV0YWlsc1xcbiAgICAgIDwvYT5cXG4gICAgPC9wPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGlkPVwiam9pblwiIGNsYXNzPVwid2l6YXJkYW1pZ29zX19qb2luXCI+XFxuICAgIDxoMSBjbGFzcz1cIndpemFyZGFtaWdvc19fdGl0bGVcIj5NYWQgU2NpZW5jZTwvaDE+XFxuICAgIDxwPjxiPldhbnQgdG8gam9pbiB1cz88L2I+PC9wPlxcbiAgICBEbyB5b3UgaGFwcGVuIHRvIGJlIGEgV2l6YXJkIHlvdXJzZWxmIGFuZCB3b3VsZCBsaWtlIHRvIGhlbHAgYXMgYSB0ZWFjaGVyIG9yIHNwZWFrZXI/XFxuICAgIDxwPkpvaW4gb3VyIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwOi8vbWVldHVwLmNvbS9jb2RpbmdhbWlnb3NcIj5Db2RpbmcgQW1pZ29zIE1lZXR1cDwvYT48L3A+XFxuICAgIDxwPm9yIGNoYXQgd2l0aCB1cyBvbiA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXR0ZXIuaW0vd2l6YXJkYW1pZ29zaW5zdGl0dXRlL2NoYXRcIj5HaXR0ZXI8L2E+LjwvcD5cXG4gIDwvZGl2PlxcbjwvZGl2Plxcbic7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBERVBFTkRFTkNJRVNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBwa2cgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpO1xuLy8gdmFyIHBhcmFtcyAgICAgID0gcmVxdWlyZSgnJykgdHJ5IGxvYWQgZmlsZXMgaW4gaWZyYW1lIGFuZCBzY3JhcGUgaXQgdG8gY2lyY3VtdmVudCBDT1JTXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9pZnJhbWUtYXBpXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaSB0b29sXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIE1PRFVMRSBJTlRFUk5BTFMgJiBIRUxQRVJTXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX2NvbmZpZyAgICAgPSB7XG4gIHRpdGxlICAgICAgIDogJ1dpemFyZCBBbWlnb3MgSW5zdGl0dXRlJyxcbiAgZGVzY3JpcHRpb24gOiBwa2cuZGVzY3JpcHRpb24sXG4gIHZlcnNpb24gICAgIDogcGtnLnZlcnNpb24sXG4gIGtleXdvcmRzICAgIDogcGtnLmtleXdvcmRzLmpvaW4oJywgJyksXG4gIGF1dGhvciAgICAgIDogcGtnLmF1dGhvci5uYW1lLFxuICB3ZWJzaXRlICAgICA6IHBrZy5ob21lcGFnZSxcbiAgZ2EgICAgICAgICAgOiAnVUEtNjIzMTA4MDctMScsXG4gIHN0eWxlICAgICAgIDogcGtnLmF0b21pZnkuY3NzLm91dHB1dFxufTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgRVhQT1JUXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyAgPSBjb25maWc7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYRUNVVElPTlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gY29uZmlnIChrZXkpIHtcbiAgcmV0dXJuIGtleSA/IF9jb25maWdba2V5XSA6IF9jb25maWc7XG59XG4iLCIvKipcbiAqIEZhc3REb21cbiAqXG4gKiBFbGltaW5hdGVzIGxheW91dCB0aHJhc2hpbmdcbiAqIGJ5IGJhdGNoaW5nIERPTSByZWFkL3dyaXRlXG4gKiBpbnRlcmFjdGlvbnMuXG4gKlxuICogQGF1dGhvciBXaWxzb24gUGFnZSA8d2lsc29ucGFnZUBtZS5jb20+XG4gKi9cblxuOyhmdW5jdGlvbihmYXN0ZG9tKXtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gTm9ybWFsaXplIHJBRlxuICB2YXIgcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgZnVuY3Rpb24oY2IpIHsgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGNiLCAxMDAwIC8gNjApOyB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnJlc2hcbiAgICogRmFzdERvbSBpbnN0YW5jZS5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBGYXN0RG9tKCkge1xuICAgIHRoaXMuZnJhbWVzID0gW107XG4gICAgdGhpcy5sYXN0SWQgPSAwO1xuXG4gICAgLy8gUGxhY2luZyB0aGUgckFGIG1ldGhvZFxuICAgIC8vIG9uIHRoZSBpbnN0YW5jZSBhbGxvd3NcbiAgICAvLyB1cyB0byByZXBsYWNlIGl0IHdpdGhcbiAgICAvLyBhIHN0dWIgZm9yIHRlc3RpbmcuXG4gICAgdGhpcy5yYWYgPSByYWY7XG5cbiAgICB0aGlzLmJhdGNoID0ge1xuICAgICAgaGFzaDoge30sXG4gICAgICByZWFkOiBbXSxcbiAgICAgIHdyaXRlOiBbXSxcbiAgICAgIG1vZGU6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBqb2IgdG8gdGhlXG4gICAqIHJlYWQgYmF0Y2ggYW5kIHNjaGVkdWxlc1xuICAgKiBhIG5ldyBmcmFtZSBpZiBuZWVkIGJlLlxuICAgKlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uKGZuLCBjdHgpIHtcbiAgICB2YXIgam9iID0gdGhpcy5hZGQoJ3JlYWQnLCBmbiwgY3R4KTtcbiAgICB2YXIgaWQgPSBqb2IuaWQ7XG5cbiAgICAvLyBBZGQgdGhpcyBqb2IgdG8gdGhlIHJlYWQgcXVldWVcbiAgICB0aGlzLmJhdGNoLnJlYWQucHVzaChqb2IuaWQpO1xuXG4gICAgLy8gV2Ugc2hvdWxkICpub3QqIHNjaGVkdWxlIGEgbmV3IGZyYW1lIGlmOlxuICAgIC8vIDEuIFdlJ3JlICdyZWFkaW5nJ1xuICAgIC8vIDIuIEEgZnJhbWUgaXMgYWxyZWFkeSBzY2hlZHVsZWRcbiAgICB2YXIgZG9lc250TmVlZEZyYW1lID0gdGhpcy5iYXRjaC5tb2RlID09PSAncmVhZGluZydcbiAgICAgIHx8IHRoaXMuYmF0Y2guc2NoZWR1bGVkO1xuXG4gICAgLy8gSWYgYSBmcmFtZSBpc24ndCBuZWVkZWQsIHJldHVyblxuICAgIGlmIChkb2VzbnROZWVkRnJhbWUpIHJldHVybiBpZDtcblxuICAgIC8vIFNjaGVkdWxlIGEgbmV3XG4gICAgLy8gZnJhbWUsIHRoZW4gcmV0dXJuXG4gICAgdGhpcy5zY2hlZHVsZUJhdGNoKCk7XG4gICAgcmV0dXJuIGlkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgam9iIHRvIHRoZVxuICAgKiB3cml0ZSBiYXRjaCBhbmQgc2NoZWR1bGVzXG4gICAqIGEgbmV3IGZyYW1lIGlmIG5lZWQgYmUuXG4gICAqXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICAgKiBAcHVibGljXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKGZuLCBjdHgpIHtcbiAgICB2YXIgam9iID0gdGhpcy5hZGQoJ3dyaXRlJywgZm4sIGN0eCk7XG4gICAgdmFyIG1vZGUgPSB0aGlzLmJhdGNoLm1vZGU7XG4gICAgdmFyIGlkID0gam9iLmlkO1xuXG4gICAgLy8gUHVzaCB0aGUgam9iIGlkIGludG8gdGhlIHF1ZXVlXG4gICAgdGhpcy5iYXRjaC53cml0ZS5wdXNoKGpvYi5pZCk7XG5cbiAgICAvLyBXZSBzaG91bGQgKm5vdCogc2NoZWR1bGUgYSBuZXcgZnJhbWUgaWY6XG4gICAgLy8gMS4gV2UgYXJlICd3cml0aW5nJ1xuICAgIC8vIDIuIFdlIGFyZSAncmVhZGluZydcbiAgICAvLyAzLiBBIGZyYW1lIGlzIGFscmVhZHkgc2NoZWR1bGVkLlxuICAgIHZhciBkb2VzbnROZWVkRnJhbWUgPSBtb2RlID09PSAnd3JpdGluZydcbiAgICAgIHx8IG1vZGUgPT09ICdyZWFkaW5nJ1xuICAgICAgfHwgdGhpcy5iYXRjaC5zY2hlZHVsZWQ7XG5cbiAgICAvLyBJZiBhIGZyYW1lIGlzbid0IG5lZWRlZCwgcmV0dXJuXG4gICAgaWYgKGRvZXNudE5lZWRGcmFtZSkgcmV0dXJuIGlkO1xuXG4gICAgLy8gU2NoZWR1bGUgYSBuZXdcbiAgICAvLyBmcmFtZSwgdGhlbiByZXR1cm5cbiAgICB0aGlzLnNjaGVkdWxlQmF0Y2goKTtcbiAgICByZXR1cm4gaWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlZmVycyB0aGUgZ2l2ZW4gam9iXG4gICAqIGJ5IHRoZSBudW1iZXIgb2YgZnJhbWVzXG4gICAqIHNwZWNpZmllZC5cbiAgICpcbiAgICogSWYgbm8gZnJhbWVzIGFyZSBnaXZlblxuICAgKiB0aGVuIHRoZSBqb2IgaXMgcnVuIGluXG4gICAqIHRoZSBuZXh0IGZyZWUgZnJhbWUuXG4gICAqXG4gICAqIEBwYXJhbSAge051bWJlcn0gICBmcmFtZVxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUuZGVmZXIgPSBmdW5jdGlvbihmcmFtZSwgZm4sIGN0eCkge1xuXG4gICAgLy8gQWNjZXB0cyB0d28gYXJndW1lbnRzXG4gICAgaWYgKHR5cGVvZiBmcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3R4ID0gZm47XG4gICAgICBmbiA9IGZyYW1lO1xuICAgICAgZnJhbWUgPSAxO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgaW5kZXggPSBmcmFtZSAtIDE7XG5cbiAgICByZXR1cm4gdGhpcy5zY2hlZHVsZShpbmRleCwgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnJ1bih7XG4gICAgICAgIGZuOiBmbixcbiAgICAgICAgY3R4OiBjdHhcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYSBzY2hlZHVsZWQgJ3JlYWQnLFxuICAgKiAnd3JpdGUnIG9yICdkZWZlcicgam9iLlxuICAgKlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nfSBpZFxuICAgKiBAcHVibGljXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKGlkKSB7XG5cbiAgICAvLyBEZWZlciBqb2JzIGFyZSBjbGVhcmVkIGRpZmZlcmVudGx5XG4gICAgaWYgKHR5cGVvZiBpZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMuY2xlYXJGcmFtZShpZCk7XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgaWRzIHRvIGJlIHBhc3NlZCBhcyBzdHJpbmdzXG4gICAgaWQgPSBOdW1iZXIoaWQpO1xuXG4gICAgdmFyIGpvYiA9IHRoaXMuYmF0Y2guaGFzaFtpZF07XG4gICAgaWYgKCFqb2IpIHJldHVybjtcblxuICAgIHZhciBsaXN0ID0gdGhpcy5iYXRjaFtqb2IudHlwZV07XG4gICAgdmFyIGluZGV4ID0gbGlzdC5pbmRleE9mKGlkKTtcblxuICAgIC8vIENsZWFyIHJlZmVyZW5jZXNcbiAgICBkZWxldGUgdGhpcy5iYXRjaC5oYXNoW2lkXTtcbiAgICBpZiAofmluZGV4KSBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFycyBhIHNjaGVkdWxlZCBmcmFtZS5cbiAgICpcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZyYW1lXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5jbGVhckZyYW1lID0gZnVuY3Rpb24oZnJhbWUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmZyYW1lcy5pbmRleE9mKGZyYW1lKTtcbiAgICBpZiAofmluZGV4KSB0aGlzLmZyYW1lcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTY2hlZHVsZXMgYSBuZXcgcmVhZC93cml0ZVxuICAgKiBiYXRjaCBpZiBvbmUgaXNuJ3QgcGVuZGluZy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnNjaGVkdWxlQmF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBTY2hlZHVsZSBiYXRjaCBmb3IgbmV4dCBmcmFtZVxuICAgIHRoaXMuc2NoZWR1bGUoMCwgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmJhdGNoLnNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgc2VsZi5ydW5CYXRjaCgpO1xuICAgIH0pO1xuXG4gICAgLy8gU2V0IGZsYWcgdG8gaW5kaWNhdGVcbiAgICAvLyBhIGZyYW1lIGhhcyBiZWVuIHNjaGVkdWxlZFxuICAgIHRoaXMuYmF0Y2guc2NoZWR1bGVkID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgdW5pcXVlXG4gICAqIGlkIGZvciBhIGpvYi5cbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUudW5pcXVlSWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKyt0aGlzLmxhc3RJZDtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgZWFjaCBqb2IgaW5cbiAgICogdGhlIGxpc3QgcGFzc2VkLlxuICAgKlxuICAgKiBJZiBhIGNvbnRleHQgaGFzIGJlZW5cbiAgICogc3RvcmVkIG9uIHRoZSBmdW5jdGlvblxuICAgKiB0aGVuIGl0IGlzIHVzZWQsIGVsc2UgdGhlXG4gICAqIGN1cnJlbnQgYHRoaXNgIGlzIHVzZWQuXG4gICAqXG4gICAqIEBwYXJhbSAge0FycmF5fSBsaXN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgICB2YXIgaWQ7XG5cbiAgICB3aGlsZSAoaWQgPSBsaXN0LnNoaWZ0KCkpIHtcbiAgICAgIHRoaXMucnVuKHRoaXMuYmF0Y2guaGFzaFtpZF0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUnVucyBhbnkgJ3JlYWQnIGpvYnMgZm9sbG93ZWRcbiAgICogYnkgYW55ICd3cml0ZScgam9icy5cbiAgICpcbiAgICogV2UgcnVuIHRoaXMgaW5zaWRlIGEgdHJ5IGNhdGNoXG4gICAqIHNvIHRoYXQgaWYgYW55IGpvYnMgZXJyb3IsIHdlXG4gICAqIGFyZSBhYmxlIHRvIHJlY292ZXIgYW5kIGNvbnRpbnVlXG4gICAqIHRvIGZsdXNoIHRoZSBiYXRjaCB1bnRpbCBpdCdzIGVtcHR5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUucnVuQmF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuXG4gICAgICAvLyBTZXQgdGhlIG1vZGUgdG8gJ3JlYWRpbmcnLFxuICAgICAgLy8gdGhlbiBlbXB0eSBhbGwgcmVhZCBqb2JzXG4gICAgICB0aGlzLmJhdGNoLm1vZGUgPSAncmVhZGluZyc7XG4gICAgICB0aGlzLmZsdXNoKHRoaXMuYmF0Y2gucmVhZCk7XG5cbiAgICAgIC8vIFNldCB0aGUgbW9kZSB0byAnd3JpdGluZydcbiAgICAgIC8vIHRoZW4gZW1wdHkgYWxsIHdyaXRlIGpvYnNcbiAgICAgIHRoaXMuYmF0Y2gubW9kZSA9ICd3cml0aW5nJztcbiAgICAgIHRoaXMuZmx1c2godGhpcy5iYXRjaC53cml0ZSk7XG5cbiAgICAgIHRoaXMuYmF0Y2gubW9kZSA9IG51bGw7XG5cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnJ1bkJhdGNoKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBqb2IgdG9cbiAgICogdGhlIGdpdmVuIGJhdGNoLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSAgIGxpc3RcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHBhcmFtIHtPYmplY3R9ICAgY3R4XG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGlkXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbih0eXBlLCBmbiwgY3R4KSB7XG4gICAgdmFyIGlkID0gdGhpcy51bmlxdWVJZCgpO1xuICAgIHJldHVybiB0aGlzLmJhdGNoLmhhc2hbaWRdID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZm46IGZuLFxuICAgICAgY3R4OiBjdHgsXG4gICAgICB0eXBlOiB0eXBlXG4gICAgfTtcbiAgfTtcblxuICAvKipcbiAgICogUnVucyBhIGdpdmVuIGpvYi5cbiAgICpcbiAgICogQXBwbGljYXRpb25zIHVzaW5nIEZhc3REb21cbiAgICogaGF2ZSB0aGUgb3B0aW9ucyBvZiBzZXR0aW5nXG4gICAqIGBmYXN0ZG9tLm9uRXJyb3JgLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgY2F0Y2ggYW55XG4gICAqIGVycm9ycyB0aGF0IG1heSB0aHJvd1xuICAgKiBpbnNpZGUgY2FsbGJhY2tzLCB3aGljaFxuICAgKiBpcyB1c2VmdWwgYXMgb2Z0ZW4gRE9NXG4gICAqIG5vZGVzIGhhdmUgYmVlbiByZW1vdmVkXG4gICAqIHNpbmNlIGEgam9iIHdhcyBzY2hlZHVsZWQuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqXG4gICAqICAgZmFzdGRvbS5vbkVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgKiAgICAgLy8gUnVucyB3aGVuIGpvYnMgZXJyb3JcbiAgICogICB9O1xuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGpvYlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgRmFzdERvbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oam9iKXtcbiAgICB2YXIgY3R4ID0gam9iLmN0eCB8fCB0aGlzO1xuICAgIHZhciBmbiA9IGpvYi5mbjtcblxuICAgIC8vIENsZWFyIHJlZmVyZW5jZSB0byB0aGUgam9iXG4gICAgZGVsZXRlIHRoaXMuYmF0Y2guaGFzaFtqb2IuaWRdO1xuXG4gICAgLy8gSWYgbm8gYG9uRXJyb3JgIGhhbmRsZXJcbiAgICAvLyBoYXMgYmVlbiByZWdpc3RlcmVkLCBqdXN0XG4gICAgLy8gcnVuIHRoZSBqb2Igbm9ybWFsbHkuXG4gICAgaWYgKCF0aGlzLm9uRXJyb3IpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKGN0eCk7XG4gICAgfVxuXG4gICAgLy8gSWYgYW4gYG9uRXJyb3JgIGhhbmRsZXJcbiAgICAvLyBoYXMgYmVlbiByZWdpc3RlcmVkLCBjYXRjaFxuICAgIC8vIGVycm9ycyB0aGF0IHRocm93IGluc2lkZVxuICAgIC8vIGNhbGxiYWNrcywgYW5kIHJ1biB0aGVcbiAgICAvLyBoYW5kbGVyIGluc3RlYWQuXG4gICAgdHJ5IHsgZm4uY2FsbChjdHgpOyB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLm9uRXJyb3IoZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGFydHMgYSByQUYgbG9vcFxuICAgKiB0byBlbXB0eSB0aGUgZnJhbWUgcXVldWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBGYXN0RG9tLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciByYWYgPSB0aGlzLnJhZjtcblxuICAgIC8vIERvbid0IHN0YXJ0IG1vcmUgdGhhbiBvbmUgbG9vcFxuICAgIGlmICh0aGlzLmxvb3BpbmcpIHJldHVybjtcblxuICAgIHJhZihmdW5jdGlvbiBmcmFtZSgpIHtcbiAgICAgIHZhciBmbiA9IHNlbGYuZnJhbWVzLnNoaWZ0KCk7XG5cbiAgICAgIC8vIElmIG5vIG1vcmUgZnJhbWVzLFxuICAgICAgLy8gc3RvcCBsb29waW5nXG4gICAgICBpZiAoIXNlbGYuZnJhbWVzLmxlbmd0aCkge1xuICAgICAgICBzZWxmLmxvb3BpbmcgPSBmYWxzZTtcblxuICAgICAgLy8gT3RoZXJ3aXNlLCBzY2hlZHVsZSB0aGVcbiAgICAgIC8vIG5leHQgZnJhbWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhZihmcmFtZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biB0aGUgZnJhbWUuICBOb3RlIHRoYXRcbiAgICAgIC8vIHRoaXMgbWF5IHRocm93IGFuIGVycm9yXG4gICAgICAvLyBpbiB1c2VyIGNvZGUsIGJ1dCBhbGxcbiAgICAgIC8vIGZhc3Rkb20gdGFza3MgYXJlIGRlYWx0XG4gICAgICAvLyB3aXRoIGFscmVhZHkgc28gdGhlIGNvZGVcbiAgICAgIC8vIHdpbGwgY29udGludWUgdG8gaXRlcmF0ZVxuICAgICAgaWYgKGZuKSBmbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb29waW5nID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIGZ1bmN0aW9uIHRvXG4gICAqIGEgc3BlY2lmaWVkIGluZGV4XG4gICAqIG9mIHRoZSBmcmFtZSBxdWV1ZS5cbiAgICpcbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIGluZGV4XG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIEZhc3REb20ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24oaW5kZXgsIGZuKSB7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhpcyBzbG90XG4gICAgLy8gaGFzbid0IGFscmVhZHkgYmVlblxuICAgIC8vIHRha2VuLiBJZiBpdCBoYXMsIHRyeVxuICAgIC8vIHJlLXNjaGVkdWxpbmcgZm9yIHRoZSBuZXh0IHNsb3RcbiAgICBpZiAodGhpcy5mcmFtZXNbaW5kZXhdKSB7XG4gICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZShpbmRleCArIDEsIGZuKTtcbiAgICB9XG5cbiAgICAvLyBTdGFydCB0aGUgckFGXG4gICAgLy8gbG9vcCB0byBlbXB0eVxuICAgIC8vIHRoZSBmcmFtZSBxdWV1ZVxuICAgIHRoaXMubG9vcCgpO1xuXG4gICAgLy8gSW5zZXJ0IHRoaXMgZnVuY3Rpb24gaW50b1xuICAgIC8vIHRoZSBmcmFtZXMgcXVldWUgYW5kIHJldHVyblxuICAgIHJldHVybiB0aGlzLmZyYW1lc1tpbmRleF0gPSBmbjtcbiAgfTtcblxuICAvLyBXZSBvbmx5IGV2ZXIgd2FudCB0aGVyZSB0byBiZVxuICAvLyBvbmUgaW5zdGFuY2Ugb2YgRmFzdERvbSBpbiBhbiBhcHBcbiAgZmFzdGRvbSA9IGZhc3Rkb20gfHwgbmV3IEZhc3REb20oKTtcblxuICAvKipcbiAgICogRXhwb3NlICdmYXN0ZG9tJ1xuICAgKi9cblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhc3Rkb207XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCl7IHJldHVybiBmYXN0ZG9tOyB9KTtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3dbJ2Zhc3Rkb20nXSA9IGZhc3Rkb207XG4gIH1cblxufSkod2luZG93LmZhc3Rkb20pO1xuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBERVBFTkRFTkNJRVNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfY29uZmlnICAgPSByZXF1aXJlKCdfY29uZmlnJyk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaSB0b29sXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYUE9SVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgID0gYm9pbGVycGxhdGU7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYRUNVVElPTlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGNvbmZpZyAgICAgID0gX2NvbmZpZygpO1xuZnVuY3Rpb24gYm9pbGVycGxhdGUgKHBhcmFtZXRlcikge1xuICB2YXIgJHRpdGxlICAgICAgICAgICAgICA9IGNvbmZpZ1sndGl0bGUnXTtcbiAgdmFyICRkZXNjcmlwdGlvbiAgICAgICAgPSBjb25maWdbJ2Rlc2NyaXB0aW9uJ107XG4gIHZhciAka2V5d29yZHMgICAgICAgICAgID0gY29uZmlnWydrZXl3b3JkcyddO1xuICB2YXIgJGF1dGhvciAgICAgICAgICAgICA9IGNvbmZpZ1snYXV0aG9yJ107XG4gIHZhciAkd2Vic2l0ZSAgICAgICAgICAgID0gY29uZmlnWyd3ZWJzaXRlJ107XG4gIHZhciAkc3R5bGUgICAgICAgICAgICAgID0gY29uZmlnWydzdHlsZSddO1xuXG4gIHZhciAkbG9nb1VSTCAgICAgICAgICAgID0gdW5kZWZpbmVkO1xuICB2YXIgJGdvb2dsZUFuYWx5dGljcyAgICA9IHVuZGVmaW5lZDtcblxuICBpZiAocGFyYW1ldGVyKSB7XG4gICAgJHRpdGxlICAgICAgICAgICAgICAgID0gcGFyYW1ldGVyLnRpdGxlICAgICAgIHx8ICR0aXRsZTtcbiAgICAkZGVzY3JpcHRpb24gICAgICAgICAgPSBwYXJhbWV0ZXIuZGVzY3JpcHRpb24gfHwgJGRlc2NyaXB0aW9uO1xuICAgICRrZXl3b3JkcyAgICAgICAgICAgICA9IHBhcmFtZXRlci5rZXl3b3JkcyAgICB8fCAka2V5d29yZHM7XG4gICAgJGF1dGhvciAgICAgICAgICAgICAgID0gcGFyYW1ldGVyLmF1dGhvciAgICAgIHx8ICRhdXRob3I7XG4gICAgJHdlYnNpdGUgICAgICAgICAgICAgID0gcGFyYW1ldGVyLndlYnNpdGUgICAgIHx8ICR3ZWJzaXRlO1xuICAgICRzdHlsZSAgICAgICAgICAgICAgICA9IHBhcmFtZXRlci5zdHlsZSAgICAgICB8fCAkc3R5bGU7XG5cbiAgICAkbG9nb1VSTCAgICAgICAgICAgICAgPSBwYXJhbWV0ZXIubG9nb1VSTCAgICAgfHwgJGxvZ29VUkw7XG4gICAgJGdvb2dsZUFuYWx5dGljcyAgICAgID0gcGFyYW1ldGVyLmdhICAgICAgICAgIHx8ICRnb29nbGVBbmFseXRpY3M7XG4gIH1cblxuICB2YXIgdGl0bGUgICAgICAgICAgICAgICA9IFsnPHRpdGxlPicrJHRpdGxlKyc8L3RpdGxlPiddO1xuICB2YXIgbWV0YSAgICAgICAgICAgICAgICA9IFtcbiAgICAnPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cImZvcm1hdC1kZXRlY3Rpb25cIiBjb250ZW50PVwidGVsZXBob25lPW5vXCIgLz4nLFxuICAgICc8bWV0YSBuYW1lPVwibXNhcHBsaWNhdGlvbi10YXAtaGlnaGxpZ2h0XCIgY29udGVudD1cIm5vXCIgLz4nLFxuICAgICc8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiJyskZGVzY3JpcHRpb24rJ1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJrZXl3b3Jkc1wiIGNvbnRlbnQ9XCInKyRrZXl3b3JkcysnXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cImF1dGhvclwiIGNvbnRlbnQ9XCInKyRhdXRob3IrJ1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGUgPSAxLjAsIHVzZXItc2NhbGFibGU9bm9cIj4nXG4gIF07XG4gIHZhciBvZyAgICAgICAgICAgICAgICAgID0gW1xuICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD1cIicrJHRpdGxlKydcIiAvPicsXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6c2l0ZV9uYW1lXCIgY29udGVudD1cIicrJHRpdGxlKydcIiAvPicsXG4gICAgJzxtZXRhIHByb3BlcnR5PVwib2c6dXJsXCIgY29udGVudD1cIicrJHdlYnNpdGUrJ1wiIC8+JyxcbiAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCInKyRkZXNjcmlwdGlvbisnXCIgLz4nLFxuICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOmltYWdlXCIgY29udGVudD1cIicrJGxvZ29VUkwrJ1wiIC8+JyxcbiAgXTtcbiAgdmFyIGljb24gICAgICAgICAgICAgICAgPSBbIC8vIGNoZWNrIGl0ZW0gZ2VuZXJhdG9yXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjU3eDU3XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTU3eDU3LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjYweDYwXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTYweDYwLnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjcyeDcyXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTcyeDcyLnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjc2eDc2XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTc2eDc2LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBzaXplcz1cIjExNHgxMTRcIiBocmVmPVwibG9nby9mYXZpY29uL2FwcGxlLXRvdWNoLWljb24tMTE0eDExNC5wbmdcIj4nLFxuICAgICc8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgc2l6ZXM9XCIxMjB4MTIwXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLTEyMHgxMjAucG5nXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIHNpemVzPVwiMTQ0eDE0NFwiIGhyZWY9XCJsb2dvL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi0xNDR4MTQ0LnBuZ1wiPicsXG4gICAgJzxsaW5rIHJlbD1cImljb25cIiB0eXBlPVwiaW1hZ2UvcG5nXCIgaHJlZj1cImxvZ28vZmF2aWNvbi9mYXZpY29uLTMyeDMyLnBuZ1wiIHNpemVzPVwiMzJ4MzJcIj4nLFxuICAgICc8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCJsb2dvL2Zhdmljb24vZmF2aWNvbi05Nng5Ni5wbmdcIiBzaXplcz1cIjk2eDk2XCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9wbmdcIiBocmVmPVwibG9nby9mYXZpY29uL2Zhdmljb24tMTZ4MTYucG5nXCIgc2l6ZXM9XCIxNngxNlwiPicsXG4gICAgJzxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cImxvZ28vZmF2aWNvbi9tYW5pZmVzdC5qc29uXCI+JyxcbiAgICAnPG1ldGEgbmFtZT1cIm1zYXBwbGljYXRpb24tVGlsZUNvbG9yXCIgY29udGVudD1cIiNiOTFkNDdcIj4nLFxuICAgICc8bWV0YSBuYW1lPVwibXNhcHBsaWNhdGlvbi1UaWxlSW1hZ2VcIiBjb250ZW50PVwibG9nby9mYXZpY29uL21zdGlsZS0xNDR4MTQ0LnBuZ1wiPicsXG4gICAgJzxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCIjZmZmZmZmXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwic2hvcnRjdXQgaWNvblwiIHR5cGU9XCJpbWFnZS94LWljb25cIiBocmVmPVwiU09VUkNFL2Zhdmljb24uaWNvXCI+JyxcbiAgICAnPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9wbmdcIiBocmVmPVwiU09VUkNFL3JlaW52ZW50aW5nZW5nYWdlbWVudC5wbmdcIj4nXG4gIF07XG4gIHZhciBzdHlsZSAgICAgICAgICAgICAgID0gW1xuICAgICc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyAkc3R5bGUgKyAnXCIgLz4nXG4gIF07XG4gIHZhciBnb29nbGUgICAgICAgICAgICAgID0gJGdvb2dsZUFuYWx5dGljcyA/IFtcbiAgICBcIjxzY3JpcHQ+XCIsXG4gICAgICBcIihmdW5jdGlvbihpLHMsbyxnLHIsYSxtKXtpWydHb29nbGVBbmFseXRpY3NPYmplY3QnXT1yO2lbcl09aVtyXXx8ZnVuY3Rpb24oKXtcIixcbiAgICAgIFwiKGlbcl0ucT1pW3JdLnF8fFtdKS5wdXNoKGFyZ3VtZW50cyl9LGlbcl0ubD0xKm5ldyBEYXRlKCk7YT1zLmNyZWF0ZUVsZW1lbnQobyksXCIsXG4gICAgICBcIm09cy5nZXRFbGVtZW50c0J5VGFnTmFtZShvKVswXTthLmFzeW5jPTE7YS5zcmM9ZzttLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEsbSlcIixcbiAgICAgIFwifSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCcvL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanMnLCdnYScpO1wiLFxuICAgICAgXCJnYSgnY3JlYXRlJywgJ1wiICsgJGdvb2dsZUFuYWx5dGljcyArIFwiJywgJ2F1dG8nKTtcIixcbiAgICAgIFwiZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcIixcbiAgICBcIjwvc2NyaXB0PlwiXVxuICAgIDpbXTtcblxuXG4gIHZhciBoZWFkICAgID0gdGl0bGUuY29uY2F0KG1ldGEpLmNvbmNhdChvZykvKi5jb25jYXQoaWNvbikqLy5jb25jYXQoc3R5bGUpO1xuICB2YXIgYm9keSAgICA9IGdvb2dsZS8qLmNvbmNhdCguLi4pKi87XG5cbiAgdmFyIGh0bWxUYWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJyk7XG4gIHZhciBoZWFkVGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xuICB2YXIgYm9keVRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICBodG1sVGFnLnNldEF0dHJpYnV0ZSgnbGFuZycsJ2VuJyk7XG4gIGhlYWRUYWcuaW5uZXJIVE1MID0gaGVhZC5qb2luKCcnKTtcblxuICB2YXIgdG1wLCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRlbXAuaW5uZXJIVE1MID0gYm9keS5qb2luKCcnKTtcbiAgd2hpbGUgKHRtcCA9IHRlbXAuY2hpbGROb2Rlc1swXSkgeyBib2R5VGFnLmFwcGVuZENoaWxkKHRtcCk7IH1cblxuICByZXR1cm4gYm9keVRhZztcbn07XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIERFUEVOREVOQ0lFU1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIHBrZyAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJyk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIFBBUkFNRVRFUiA9IEFSR1VNRU5UXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIG5vIGNsaSB0b29sXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIEVYUE9SVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgID0gY29uZmlnO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBFWEVDVVRJT05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfY29uZmlnICAgICA9IHtcbiAgdGl0bGUgICAgICAgOiAnJyxcbiAgZGVzY3JpcHRpb24gOiBwa2cuZGVzY3JpcHRpb24sXG4gIHZlcnNpb24gICAgIDogcGtnLnZlcnNpb24sXG4gIGtleXdvcmRzICAgIDogcGtnLmtleXdvcmRzLmpvaW4oJywgJyksXG4gIGF1dGhvciAgICAgIDogcGtnLmF1dGhvci5uYW1lLFxuICB3ZWJzaXRlICAgICA6ICdodHRwOi8vbnBtanMub3JnL3dlYnBhZ2UnLFxuICBzdHlsZSAgICAgICA6ICdCVU5ETEUvYnVuZGxlLmNzcydcbn07XG5mdW5jdGlvbiBjb25maWcgKGtleSkge1xuICByZXR1cm4ga2V5ID8gX2NvbmZpZ1trZXldIDogX2NvbmZpZztcbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwid2VicGFnZVwiLFxuICBcInZlcnNpb25cIjogXCIwLjMuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiV2VicGFnZSBCb2lsZXJwbGF0ZSBDb21wb25lbnRcIixcbiAgXCJtYWluXCI6IFwiU09VUkNFL2luZGV4LmpzXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJ0ZXN0XCI6IFwiZWNobyBcXFwiRXJyb3I6IG5vIHRlc3Qgc3BlY2lmaWVkXFxcIiAmJiBleGl0IDFcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImJvaWxlcnBsYXRlXCIsXG4gICAgXCJ3ZWJwYWdlXCIsXG4gICAgXCJjb21wb25lbnRcIlxuICBdLFxuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwic2VyYXBhdGhcIixcbiAgICBcImVtYWlsXCI6IFwiZGV2QHNlcmFwYXRoLmRlXCIsXG4gICAgXCJ1cmxcIjogXCJodHRwOi8vd3d3LmdpdGh1Yi5jb20vc2VyYXBhdGhcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJyZWFkbWVcIjogXCIjIHdlYnBhZ2VcXG5XZWJwYWdlIEJvaWxlcnBsYXRlIENvbXBvbmVudFxcblxcbmBgYGpzXFxudmFyIHdlYnBhZ2UgPSByZXF1aXJlKCd3ZWJwYWdlJyk7XFxudmFyIGJvZHkgICAgPSB3ZWJwYWdlKHtcXG4gIC8vIE9QVElPTkFMXFxuICAvLyAuLi4gYW5kIG1vcmUgaW4gdGhlIGZ1dHVyZSAoZS5nLiBpY29uLCBvZywgLi4uKVxcbiAgdGl0bGUgICAgICAgOiAnRm9vYmFyJyxcXG4gIGRlc2NyaXB0aW9uIDogJ2ZvbyBiYXIgYmF6JyxcXG4gIGtleXdvcmRzICAgIDogJ2ZvbywgYmFyLCBiYXonLFxcbiAgYXV0aG9yICAgICAgOiAncXV1eCBiYXonLFxcbiAgd2Vic2l0ZSAgICAgOiAnaHR0cDovL2Zvby5iYXIuYmF6J1xcbn0pO1xcblwiLFxuICBcInJlYWRtZUZpbGVuYW1lXCI6IFwiUkVBRE1FLm1kXCIsXG4gIFwiZ2l0SGVhZFwiOiBcIjI4MzljNTZhOTViZDQ0N2I3OGRlNTAzYjE1ZDYxOTE4NTc1MGU3YzRcIixcbiAgXCJfaWRcIjogXCJ3ZWJwYWdlQDAuMy4wXCIsXG4gIFwiX3NoYXN1bVwiOiBcIjE1YzhjOTllODIyYjQ5OWU5OTgxYWU2ODc2NTM5YjQyMzQ0OGI4ZTdcIixcbiAgXCJfZnJvbVwiOiBcIndlYnBhZ2VAMC4zLjBcIlxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJ3aXphcmRhbWlnb3NpbnN0aXR1dGVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJXaXphcmQgQW1pZ29zIEluc3RpdHV0ZSBXZWJzaXRlXCIsXG4gIFwibWFpblwiOiBcIlNPVVJDRS9pbmRleC5qc1wiLFxuICBcInN0eWxlXCI6IFwiU09VUkNFL2luZGV4LmNzc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJmYXN0ZG9tXCI6IFwiXjAuOC42XCIsXG4gICAgXCJtaW5peGhyXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJyZXNyY2lmeVwiOiBcIl4xLjEuM1wiLFxuICAgIFwic29jaWFsLXNoYXJlXCI6IFwiXjAuMS4wXCIsXG4gICAgXCJ3ZWJwYWdlXCI6IFwiXjAuMy4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYXRvbWlmeVwiOiBcIl43LjEuMFwiLFxuICAgIFwiYmFiZWxpZnlcIjogXCJeNi4wLjJcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYXRvbWlmeVwiOiBcImF0b21pZnlcIixcbiAgICBcInRlc3RcIjogXCJlY2hvIFxcXCJFcnJvcjogbm8gdGVzdCBzcGVjaWZpZWRcXFwiICYmIGV4aXQgMSAjdGVzdGVtIHN0YXJ0IC0tc2luZ2xlUnVuXCIsXG4gICAgXCItLS1cIjogXCIjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiLFxuICAgIFwiYnVpbGQ6c2NyaXB0c1wiOiBcIiNicm93c2VyaWZ5IC1kIGFzc2V0cy9zY3JpcHRzL21haW4uanMgLXAgW21pbmlmeWlmeSAtLWNvbXByZXNzUGF0aCAuIC0tbWFwIG1haW4uanMubWFwIC0tb3V0cHV0IGRpc3QvbWFpbi5qcy5tYXBdIHwgaGFzaG1hcmsgLW4gZGlzdC9tYWluLmpzIC1zIC1sIDggLW0gYXNzZXRzLmpzb24gJ2Rpc3Qve25hbWV9e2hhc2h9e2V4dH0nXCIsXG4gICAgXCJqc2NzXCI6IFwiI2pzY3MgZXNoaW50IGVzbGludC4uLlwiLFxuICAgIFwidWdsaWZ5XCI6IFwiI3VnbGlmeVwiLFxuICAgIFwicG5nXCI6IFwiI29wdGltZ1wiLFxuICAgIFwianBnXCI6IFwiI2pwZ29cIixcbiAgICBcImNzc21cIjogXCIjeWNzc21pbiAqKi5jc3MgI2Nzc21pblwiLFxuICAgIFwiY3NzdlwiOiBcIiNjc3MtdmFsaWRhdG9yICoqLmNzc1wiLFxuICAgIFwiY3NzcFwiOiBcIiNjc3MtcHJldHRpZmllciAqKi5jc3NcIixcbiAgICBcImh0bWxcIjogXCIjaHRtbDUtbGludCAqKi5odG1sXCIsXG4gICAgXCJidWlsZFZcIjogXCIjcm0gLXJmIFJFTEVBU0UgJiYgbWtkaXIgUkVMRUFTRSAmJiBub2RlIG5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L2Jpbi9jbWQuanMgU09VUkNFL2luZGV4LmpzIC1kIC1vIFJFTEVBU0UvaW5kZXgudiQoY2F0IHBhY2thZ2UuanNvbiB8IGdyZXAgdmVyc2lvbiB8IGdyZXAgLVBvICcoPzw9dmVyc2lvblxcXCI6IFxcXCIpLiooPz1cXFwiKScpLmJ1bmRsZS5qc1wiLFxuICAgIFwid2F0Y2hWXCI6IFwiI3JtIC1yZiBSRUxFQVNFICYmIG1rZGlyIFJFTEVBU0UgJiYgbm9kZSBub2RlX21vZHVsZXMvd2F0Y2hpZnkvYmluL2NtZC5qcyBTT1VSQ0UvaW5kZXguanMgLW8gUkVMRUFTRS9pbmRleC52JChjYXQgcGFja2FnZS5qc29uIHwgZ3JlcCB2ZXJzaW9uIHwgZ3JlcCAtUG8gJyg/PD12ZXJzaW9uXFxcIjogXFxcIikuKig/PVxcXCIpJykuYnVuZGxlLmpzXCIsXG4gICAgXCJvcGVuOnByb2RcIjogXCIjb3BlbmVyIGh0dHA6Ly9leGFtcGxlLmNvbVwiLFxuICAgIFwib3BlbjpzdGFnZVwiOiBcIiNvcGVuZXIgaHR0cDovL3N0YWdpbmcuZXhhbXBsZS5pbnRlcm5hbFwiLFxuICAgIFwib3BlbjpkZXZcIjogXCIjb3BlbmVyIGh0dHA6Ly9sb2NhbGhvc3Q6OTA5MFwiLFxuICAgIFwiZGVwbG95OnByb2RcIjogXCIjczMtY2xpIHN5bmMgLi9kaXN0LyBzMzovL2V4YW1wbGUtY29tL3Byb2Qtc2l0ZS9cIixcbiAgICBcImRlcGxveTpzdGFnZVwiOiBcIiNzMy1jbGkgc3luYyAuL2Rpc3QvIHMzOi8vZXhhbXBsZS1jb20vc3RhZ2Utc2l0ZS9cIlxuICB9LFxuICBcImF0b21pZnlcIjoge1xuICAgIFwic2VydmVyXCI6IHtcbiAgICAgIFwib3BlblwiOiB0cnVlLFxuICAgICAgXCJwYXRoXCI6IFwiaW5kZXguaHRtbFwiLFxuICAgICAgXCJsclwiOiB7XG4gICAgICAgIFwidmVyYm9zZVwiOiB0cnVlLFxuICAgICAgICBcInF1aWV0XCI6IGZhbHNlLFxuICAgICAgICBcInBvcnRcIjogMzEzMzcsXG4gICAgICAgIFwic3luY1wiOiB0cnVlXG4gICAgICB9XG4gICAgfSxcbiAgICBcImpzXCI6IHtcbiAgICAgIFwiZW50cnlcIjogXCJTT1VSQ0UvaW5kZXguanNcIixcbiAgICAgIFwiYWxpYXNcIjogXCJCVU5ETEUvYnVuZGxlLmpzXCIsXG4gICAgICBcIm91dHB1dFwiOiBcIkJVTkRMRS9idW5kbGUuanNcIixcbiAgICAgIFwiZGVidWdcIjogdHJ1ZSxcbiAgICAgIFwid2F0Y2hcIjogdHJ1ZSxcbiAgICAgIFwidHJhbnNmb3JtXCI6IFtcbiAgICAgICAgXCJiYWJlbGlmeVwiXG4gICAgICBdLFxuICAgICAgXCJzdGFuZGFsb25lXCI6IFwiQVBJXCJcbiAgICB9LFxuICAgIFwiY3NzXCI6IHtcbiAgICAgIFwiZW50cnlcIjogXCJTT1VSQ0UvaW5kZXguY3NzXCIsXG4gICAgICBcImFsaWFzXCI6IFwiQlVORExFL2J1bmRsZS5jc3NcIixcbiAgICAgIFwib3V0cHV0XCI6IFwiQlVORExFL2J1bmRsZS5jc3NcIixcbiAgICAgIFwiZGVidWdcIjogdHJ1ZSxcbiAgICAgIFwid2F0Y2hcIjogdHJ1ZSxcbiAgICAgIFwiYXV0b3ByZWZpeGVyXCI6IHtcbiAgICAgICAgXCJicm93c2Vyc1wiOiBbXG4gICAgICAgICAgXCI+IDElXCIsXG4gICAgICAgICAgXCJJRSA3XCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJjYXNjYWRlXCI6IGZhbHNlXG4gICAgICB9LFxuICAgICAgXCJjb21wcmVzc1wiOiBmYWxzZSxcbiAgICAgIFwicGx1Z2luXCI6IFtdXG4gICAgfSxcbiAgICBcImFzc2V0c1wiOiB7XG4gICAgICBcImRlc3RcIjogXCJCVU5ETEUvYXNzZXRzL1wiLFxuICAgICAgXCJwcmVmaXhcIjogXCIvQlVORExFL2Fzc2V0cy9cIixcbiAgICAgIFwicmV0YWluTmFtZVwiOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS93aXphcmRhbWlnb3NpbnN0aXR1dGUvd2l6YXJkYW1pZ29zaW5zdGl0dXRlLmdpdGh1Yi5pby5naXRcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInRlYWNoaW5nXCIsXG4gICAgXCJ0ZWFjaGVyXCIsXG4gICAgXCJsZWFybmluZ1wiLFxuICAgIFwiamF2YXNjcmlwdFwiLFxuICAgIFwiYmVybGluXCIsXG4gICAgXCJsZWFybmVyXCIsXG4gICAgXCJwcm9ncmFtbWluZ1wiLFxuICAgIFwic2Nob29sXCIsXG4gICAgXCJ1bml2ZXJzaXR5XCIsXG4gICAgXCJhY2FkZW15XCIsXG4gICAgXCJpbnN0aXR1dGVcIixcbiAgICBcIndpemFyZFwiLFxuICAgIFwiYW1pZ29zXCIsXG4gICAgXCJub2RlXCIsXG4gICAgXCJub2RlanNcIixcbiAgICBcImh0bWxcIixcbiAgICBcImNzc1wiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJzZXJhcGF0aFwiLFxuICAgIFwiZW1haWxcIjogXCJkZXZAc2VyYXBhdGguZGVcIixcbiAgICBcInVybFwiOiBcImh0dHA6Ly93d3cuZ2l0aHViLmNvbS9zZXJhcGF0aFwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIkdOVSBBR1BMXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vd2l6YXJkYW1pZ29zaW5zdGl0dXRlL3dpemFyZGFtaWdvc2luc3RpdHV0ZS5naXRodWIuaW8vaXNzdWVzXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHA6Ly93aXphcmQuYW1pZ29zLmluc3RpdHV0ZVwiXG59XG4iXX0=
