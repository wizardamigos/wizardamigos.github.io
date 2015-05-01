/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
const webpage   = require('webpage');
const fastdom   = require('fastdom');
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
const config    = require('_config')();
const template  = require('./index.template.html');
let __          = document.createElement('div');
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports  = wizardamigosinstitute(webpage(config), config);
/******************************************************************************
  EXECUTION
******************************************************************************/
function wizardamigosinstitute (dom, data) { // 'data' maybe also to use for event delegation pattern
  const COMPONENT = (__.innerHTML=template,__.childNodes[0]);
  const __logo    = COMPONENT.querySelectorAll('.wizardamigos__logo')[0];
  const __menu    = COMPONENT.querySelectorAll('.wizardamigos__menu')[0];



  /******** WIRE UP ********/
      // __Heart.addEventListener('click', function onclick (event) {
      //   eventstop(event);
      //   alert('#sign up');
      //   router('index.html#signup');
      // });
  /****** INITIALIZE *******/
  fastdom.write(function INIT () {
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
  /******** RETURN *********/
  var API = {}; // should be an event emitter too
  return API;
}
