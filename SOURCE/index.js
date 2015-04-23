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
  MODULE INTERNALS
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
  const __a ='';
  
  /******** WIRE UP ********/
      // __Heart.addEventListener('click', function onclick (event) {
      //   eventstop(event);
      //   alert('#sign up');
      //   router('index.html#signup');
      // });
  /****** INITIALIZE *******/
  fastdom.write(function INIT () {
    dom.appendChild(COMPONENT);
  });
  /******** RETURN *********/
  var API = {}; // should be an event emitter too
  return API;
}
