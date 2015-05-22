'use strict';
/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
const webpage     = require('webpage');
const fastdom     = require('fastdom');
const minixhr     = require('minixhr');
// const marked      = require('marked');
// const jsonmatter  = require('json-matter');
const jmm         = require('json-meta-marked');
const markdownbox = require('holon-markdownbox');
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli tool
  // $paramName = process.argv[2];
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
const config      = require('_config')();
const template    = require('./index.template.html');
let __            = document.createElement('div');
function wizardamigosinstitute (dom, data) { // 'data' maybe also to use for event delegation pattern
  const COMPONENT = (__.innerHTML=template,__.childNodes[0]);
  const __logo    = COMPONENT.querySelectorAll('.wizardamigos__logo')[0];
  const __menu    = COMPONENT.querySelectorAll('.wizardamigos__menu')[0];
  const __content = COMPONENT.querySelectorAll('.wizardamigos__content')[0];

  var SEMAPHORE   = null;
  var CONTENT     = [];
  var LANGUAGES   = {};

  function getContent() {
    minixhr({ url: config.contentSRC }, function (data, response, xhr, header) {
      // debugger;
      var temp    = {};
      var CONTENT = undefined;
      var array   = JSON.parse(data);
      array.forEach(function (item) {
        minixhr({ url: item.url }, function (data, response, xhr, header) {
          function b64_to_utf8( str ) {
            return decodeURIComponent(escape(window.atob( str )));
          }
          var object      = JSON.parse(data);
          var jsonmarked  = b64_to_utf8(object.content);
          var name        = object.name.split('.')[0];
          if (name === 'index') {
            CONTENT = jmm.parse(jsonmarked).CONTENT;
            prepareArrayContainer(CONTENT);
            CONTENT.forEach(function (title, idx) {
              if(temp[title]) {
                addContent(idx, title, temp[title]);
              }
            });
          } else if (!CONTENT) {
            temp[name] = jsonmarked;
          } else {
            CONTENT.forEach(function (title, idx) {
              if(name === title) {
                addContent(idx, name, jsonmarked);
              }
            });
          }
        });
      });
    });
  }
  getContent();

  function prepareArrayContainer (CONTENT) {
    SEMAPHORE = CONTENT.length;
  }
  function addContent (idx, name, jsonmarked) {
    SEMAPHORE--;
    CONTENT[idx] = {
      name: name,
      lang: {}
    };
    var object = jmm.parse(jsonmarked);
    var html   = object.__content__;
    var langs  = html.split('<hr>').filter(function(x){return x;});
    var reg = /<p><a href="@([\s\S]*)"><\/a><\/p>([\s\S]*)/;
    langs.forEach(function(x){
      var tmp     = x.match(reg);
      var lang    = tmp[1];
      var content = tmp[2];
      CONTENT[idx].lang[lang] = content;
      if (!LANGUAGES[lang]) { LANGUAGES[lang] = true; }
    });

    if (!SEMAPHORE) { INIT(); }

  }
  function prepare () {
    // @TODO: use fastdom
    CONTENT.forEach(function (x, idx) {
      var item = '<div class="wizardamigos__infobox"></div>';
      var tmp = (__.innerHTML=item,__.childNodes[0]);
      CONTENT[idx] = markdownbox({
        container : tmp,
        options   : { defaultLanguage: config.language },
        data      : x
      });
      __content.appendChild(tmp);
    });
    for (var lang in LANGUAGES) {
      (function (lang) {
        var item = '<a class="wizardamigos__lang' +
          '  wizardamigos__lang--STATE_' +
          ((lang === config.language) ? 'active' : 'inactive') +
          '  ">'+lang+'</a>';
        var tmp  = (__.innerHTML=item,__.childNodes[0]);
        // @TODO: should use delegator pattern instead
        /******** WIRE UP ********/
        // @TODO: switch language buttons
        tmp.addEventListener('click', function onclick (event) {
          // eventstop(event);
          CONTENT.forEach(function switchLanguage (api) {
            api.changeLanguage(lang);
          })
        });
        __menu.appendChild(tmp);
      })(lang);
    }
  }
  /****** INITIALIZE *******/
  function INIT () {
    fastdom.write(function () {
      prepare();
      dom.appendChild(COMPONENT);
      // FACEBOOK
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.3&appId=322249881240262";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      // TWITTER
      (function(d,s,id){
        var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};
        if(d.getElementById(id))return;js=d.createElement(s);
        js.id=id;js.src="https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);t._e=[];
        t.ready=function(f){t._e.push(f);};return t;
      }(document,"script","twitter-wjs"));
    });
  }
  /******** RETURN *********/
  var API = {}; // should be an event emitter too
  return API;
}
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports    = wizardamigosinstitute(webpage(config), config);
