'use strict';
/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
const webpage     = require('webpage');
const fastdom     = require('fastdom');
const minixhr     = require('minixhr');
const eventstopper= require('eventstopper');
const jmm         = require('json-meta-marked');
const markdownbox = require('holon-markdownbox');
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli tool
  // $paramName = process.argv[2];
  var env         = {
    backend         : process.env.BACKEND_CONTENT
  };
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
const config      = require('_config')();
const githubLevel = require('_githubLevel');
const template    = require('./index.template.html');
let __            = document.createElement('div');

function wizardamigosinstitute (dom, data) { // 'data' maybe also to use for event delegation pattern
  const COMPONENT = (__.innerHTML=template,__.childNodes[0]);
  const __logo    = COMPONENT.querySelectorAll('.wizardamigos__logo')[0];
  const __menu    = COMPONENT.querySelectorAll('.wizardamigos__menu')[0];
  const __news    = COMPONENT.querySelectorAll('.wizardamigos__news')[0];
  const __content = COMPONENT.querySelectorAll('.wizardamigos__content')[0];


  var SEMAPHORE   = null;
  var CONTENT     = [];
  var LANGUAGES   = {};

  // STATE
  var __Menu__activeLanguage  = null;
  var currentLanguage         = config.language;

  // USAGE
  githubLevel({ url: env.backend }, function (error, data, version) {
    if (error) { console.error(error); throw error; }

    var temp    = {};
    var CONTENT = undefined;

    data.forEach(function (item) {
      githubLevel({ url:item.url }, function (error, data, version) {
        var jsonmarked  = b64_to_utf8(data.content);
        var name        = data.name.split('.')[0];
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
    // ADD CONTENT TO PAGE
    CONTENT.forEach(function (x, idx) {
      if (x.name === 'news') {
        var API = (function (languages) {
          return {
            changeLanguage(lang) {
              __news.innerHTML = x.lang[currentLanguage];
            }
          };
        })(x.lang);
        __news.innerHTML = x.lang[config.language];
        CONTENT[idx] = API;
      } else {
        var item = '<div class="wizardamigos__infobox"></div>';
        var tmp = (__.innerHTML=item,__.childNodes[0]);
        CONTENT[idx] = markdownbox({
          container : tmp,
          options   : { defaultLanguage: config.language },
          data      : x
        });
        __content.appendChild(tmp);
      }
    });
    // ADD LANGUAGE TO MENU
    for (var lang in LANGUAGES) {
      (function (lang) {
        var isCurrentLanguage = (lang === currentLanguage);
        var item = '<a class="wizardamigos__lang' +
          '  wizardamigos__lang--STATE_' +
          (isCurrentLanguage ? 'active' : 'inactive') + '">'+lang+'</a>';
        var tmp  = (__.innerHTML=item,__.childNodes[0]);
        __Menu__activeLanguage = tmp;
        __menu.appendChild(tmp);
      })(lang);
    }

    /******** WIRE UP ********/
    // @TODO: should use delegator pattern instead
    __menu.addEventListener('click', function onclick (event) {
      eventstopper(event);
      var el          = event.target;
      var isLang      = el.classList.contains('wizardamigos__lang');
      var lang        = el.innerHTML;
      var isInactive  = el !== __Menu__activeLanguage;
      if (isLang && isInactive) {
        var ON = 'wizardamigos__lang--STATE_active';
        var OFF = 'wizardamigos__lang--STATE_inactive';
        el.classList.add(ON);
        el.classList.remove(OFF);
        __Menu__activeLanguage.classList.add(OFF);
        __Menu__activeLanguage.classList.remove(ON);
        __Menu__activeLanguage = el;
        currentLanguage = lang;
        CONTENT.forEach(function switchLanguage (api) {
          api.changeLanguage(currentLanguage);
        });
      }
    });
  }
  /****** INITIALIZE *******/
  function INIT () {
    fastdom.write(function () {
      prepare();
      dom.appendChild(COMPONENT);
    });
  }
  /******** RETURN *********/
  var API = {}; // should be an event emitter too
  return API;
}

function b64_to_utf8( str ) {
  str = str.replace(/(\r\n|\n|\r)/gm,"");
  return decodeURIComponent(escape(window.atob( str )));
}
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports    = wizardamigosinstitute(webpage(config), config);



      // // <div id="fb-root"></div>
      // // <div class="fb-share-button"
      // //   data-href="http://wizard.amigos.institute/"
      // //   data-layout="button">
      // // </div><br>
      // // <a style="display:block" class="twitter-share-button"
      // //   href="https://twitter.com/share"
      // //   data-url="http://bit.ly/wizardamigosinstitute"
      // //   data-counturl="http://wizard.amigos.institute"
      // //   data-text="Coding for kids in berlin :-)"
      // //   data-hashtags="#berlin #programming #school"
      // //   data-related="serapath:Wizard Amigos Organizer"
      // //   data-lang="de"
      // //   data-via="wizardamigos"
      // //   data-size="normal"
      // //   data-count="none">
      // // Tweet us :-)
      // // </a>
      // // FACEBOOK
      // (function(d, s, id) {
      //   var js, fjs = d.getElementsByTagName(s)[0];
      //   if (d.getElementById(id)) return;
      //   js = d.createElement(s); js.id = id;
      //   js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.3&appId=322249881240262";
      //   fjs.parentNode.insertBefore(js, fjs);
      // }(document, 'script', 'facebook-jssdk'));
      // // TWITTER
      // (function(d,s,id){
      //   var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};
      //   if(d.getElementById(id))return;js=d.createElement(s);
      //   js.id=id;js.src="https://platform.twitter.com/widgets.js";
      //   fjs.parentNode.insertBefore(js,fjs);t._e=[];
      //   t.ready=function(f){t._e.push(f);};return t;
      // }(document,"script","twitter-wjs"));
