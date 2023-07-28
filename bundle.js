(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
'use strict';

var csjs = require('csjs');
var insertCss = require('insert-css');

function csjsInserter() {
  var args = Array.prototype.slice.call(arguments);
  var result = csjs.apply(null, args);
  if (global.document) {
    insertCss(csjs.getCss(result));
  }
  return result;
}

module.exports = csjsInserter;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"csjs":6,"insert-css":20}],2:[function(require,module,exports){
'use strict';

module.exports = require('csjs/get-css');

},{"csjs/get-css":5}],3:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs;
module.exports.csjs = csjs;
module.exports.getCss = require('./get-css');

},{"./csjs":1,"./get-css":2}],4:[function(require,module,exports){
'use strict';

module.exports = require('./lib/csjs');

},{"./lib/csjs":10}],5:[function(require,module,exports){
'use strict';

module.exports = require('./lib/get-css');

},{"./lib/get-css":14}],6:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs();
module.exports.csjs = csjs;
module.exports.noScope = csjs({ noscope: true });
module.exports.getCss = require('./get-css');

},{"./csjs":4,"./get-css":5}],7:[function(require,module,exports){
'use strict';

/**
 * base62 encode implementation based on base62 module:
 * https://github.com/andrew/base62.js
 */

var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = function encode(integer) {
  if (integer === 0) {
    return '0';
  }
  var str = '';
  while (integer > 0) {
    str = CHARS[integer % 62] + str;
    integer = Math.floor(integer / 62);
  }
  return str;
};

},{}],8:[function(require,module,exports){
'use strict';

var makeComposition = require('./composition').makeComposition;

module.exports = function createExports(classes, keyframes, compositions) {
  var keyframesObj = Object.keys(keyframes).reduce(function(acc, key) {
    var val = keyframes[key];
    acc[val] = makeComposition([key], [val], true);
    return acc;
  }, {});

  var exports = Object.keys(classes).reduce(function(acc, key) {
    var val = classes[key];
    var composition = compositions[key];
    var extended = composition ? getClassChain(composition) : [];
    var allClasses = [key].concat(extended);
    var unscoped = allClasses.map(function(name) {
      return classes[name] ? classes[name] : name;
    });
    acc[val] = makeComposition(allClasses, unscoped);
    return acc;
  }, keyframesObj);

  return exports;
}

function getClassChain(obj) {
  var visited = {}, acc = [];

  function traverse(obj) {
    return Object.keys(obj).forEach(function(key) {
      if (!visited[key]) {
        visited[key] = true;
        acc.push(key);
        traverse(obj[key]);
      }
    });
  }

  traverse(obj);
  return acc;
}

},{"./composition":9}],9:[function(require,module,exports){
'use strict';

module.exports = {
  makeComposition: makeComposition,
  isComposition: isComposition,
  ignoreComposition: ignoreComposition
};

/**
 * Returns an immutable composition object containing the given class names
 * @param  {array} classNames - The input array of class names
 * @return {Composition}      - An immutable object that holds multiple
 *                              representations of the class composition
 */
function makeComposition(classNames, unscoped, isAnimation) {
  var classString = classNames.join(' ');
  return Object.create(Composition.prototype, {
    classNames: { // the original array of class names
      value: Object.freeze(classNames),
      configurable: false,
      writable: false,
      enumerable: true
    },
    unscoped: { // the original array of class names
      value: Object.freeze(unscoped),
      configurable: false,
      writable: false,
      enumerable: true
    },
    className: { // space-separated class string for use in HTML
      value: classString,
      configurable: false,
      writable: false,
      enumerable: true
    },
    selector: { // comma-separated, period-prefixed string for use in CSS
      value: classNames.map(function(name) {
        return isAnimation ? name : '.' + name;
      }).join(', '),
      configurable: false,
      writable: false,
      enumerable: true
    },
    toString: { // toString() method, returns class string for use in HTML
      value: function() {
        return classString;
      },
      configurable: false,
      writeable: false,
      enumerable: false
    }
  });
}

/**
 * Returns whether the input value is a Composition
 * @param value      - value to check
 * @return {boolean} - whether value is a Composition or not
 */
function isComposition(value) {
  return value instanceof Composition;
}

function ignoreComposition(values) {
  return values.reduce(function(acc, val) {
    if (isComposition(val)) {
      val.classNames.forEach(function(name, i) {
        acc[name] = val.unscoped[i];
      });
    }
    return acc;
  }, {});
}

/**
 * Private constructor for use in `instanceof` checks
 */
function Composition() {}

},{}],10:[function(require,module,exports){
'use strict';

var extractExtends = require('./css-extract-extends');
var composition = require('./composition');
var isComposition = composition.isComposition;
var ignoreComposition = composition.ignoreComposition;
var buildExports = require('./build-exports');
var scopify = require('./scopeify');
var cssKey = require('./css-key');
var extractExports = require('./extract-exports');

module.exports = function csjsTemplate(opts) {
  opts = (typeof opts === 'undefined') ? {} : opts;
  var noscope = (typeof opts.noscope === 'undefined') ? false : opts.noscope;

  return function csjsHandler(strings, values) {
    // Fast path to prevent arguments deopt
    var values = Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++) {
      values[i - 1] = arguments[i];
    }
    var css = joiner(strings, values.map(selectorize));
    var ignores = ignoreComposition(values);

    var scope = noscope ? extractExports(css) : scopify(css, ignores);
    var extracted = extractExtends(scope.css);
    var localClasses = without(scope.classes, ignores);
    var localKeyframes = without(scope.keyframes, ignores);
    var compositions = extracted.compositions;

    var exports = buildExports(localClasses, localKeyframes, compositions);

    return Object.defineProperty(exports, cssKey, {
      enumerable: false,
      configurable: false,
      writeable: false,
      value: extracted.css
    });
  }
}

/**
 * Replaces class compositions with comma seperated class selectors
 * @param  value - the potential class composition
 * @return       - the original value or the selectorized class composition
 */
function selectorize(value) {
  return isComposition(value) ? value.selector : value;
}

/**
 * Joins template string literals and values
 * @param  {array} strings - array of strings
 * @param  {array} values  - array of values
 * @return {string}        - strings and values joined
 */
function joiner(strings, values) {
  return strings.map(function(str, i) {
    return (i !== values.length) ? str + values[i] : str;
  }).join('');
}

/**
 * Returns first object without keys of second
 * @param  {object} obj      - source object
 * @param  {object} unwanted - object with unwanted keys
 * @return {object}          - first object without unwanted keys
 */
function without(obj, unwanted) {
  return Object.keys(obj).reduce(function(acc, key) {
    if (!unwanted[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

},{"./build-exports":8,"./composition":9,"./css-extract-extends":11,"./css-key":12,"./extract-exports":13,"./scopeify":19}],11:[function(require,module,exports){
'use strict';

var makeComposition = require('./composition').makeComposition;

var regex = /\.([^\s]+)(\s+)(extends\s+)(\.[^{]+)/g;

module.exports = function extractExtends(css) {
  var found, matches = [];
  while (found = regex.exec(css)) {
    matches.unshift(found);
  }

  function extractCompositions(acc, match) {
    var extendee = getClassName(match[1]);
    var keyword = match[3];
    var extended = match[4];

    // remove from output css
    var index = match.index + match[1].length + match[2].length;
    var len = keyword.length + extended.length;
    acc.css = acc.css.slice(0, index) + " " + acc.css.slice(index + len + 1);

    var extendedClasses = splitter(extended);

    extendedClasses.forEach(function(className) {
      if (!acc.compositions[extendee]) {
        acc.compositions[extendee] = {};
      }
      if (!acc.compositions[className]) {
        acc.compositions[className] = {};
      }
      acc.compositions[extendee][className] = acc.compositions[className];
    });
    return acc;
  }

  return matches.reduce(extractCompositions, {
    css: css,
    compositions: {}
  });

};

function splitter(match) {
  return match.split(',').map(getClassName);
}

function getClassName(str) {
  var trimmed = str.trim();
  return trimmed[0] === '.' ? trimmed.substr(1) : trimmed;
}

},{"./composition":9}],12:[function(require,module,exports){
'use strict';

/**
 * CSS identifiers with whitespace are invalid
 * Hence this key will not cause a collision
 */

module.exports = ' css ';

},{}],13:[function(require,module,exports){
'use strict';

var regex = require('./regex');
var classRegex = regex.classRegex;
var keyframesRegex = regex.keyframesRegex;

module.exports = extractExports;

function extractExports(css) {
  return {
    css: css,
    keyframes: getExport(css, keyframesRegex),
    classes: getExport(css, classRegex)
  };
}

function getExport(css, regex) {
  var prop = {};
  var match;
  while((match = regex.exec(css)) !== null) {
    var name = match[2];
    prop[name] = name;
  }
  return prop;
}

},{"./regex":16}],14:[function(require,module,exports){
'use strict';

var cssKey = require('./css-key');

module.exports = function getCss(csjs) {
  return csjs[cssKey];
};

},{"./css-key":12}],15:[function(require,module,exports){
'use strict';

/**
 * djb2 string hash implementation based on string-hash module:
 * https://github.com/darkskyapp/string-hash
 */

module.exports = function hashStr(str) {
  var hash = 5381;
  var i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return hash >>> 0;
};

},{}],16:[function(require,module,exports){
'use strict';

var findClasses = /(\.)(?!\d)([^\s\.,{\[>+~#:)]*)(?![^{]*})/.source;
var findKeyframes = /(@\S*keyframes\s*)([^{\s]*)/.source;
var ignoreComments = /(?!(?:[^*/]|\*[^/]|\/[^*])*\*+\/)/.source;

var classRegex = new RegExp(findClasses + ignoreComments, 'g');
var keyframesRegex = new RegExp(findKeyframes + ignoreComments, 'g');

module.exports = {
  classRegex: classRegex,
  keyframesRegex: keyframesRegex,
  ignoreComments: ignoreComments,
};

},{}],17:[function(require,module,exports){
var ignoreComments = require('./regex').ignoreComments;

module.exports = replaceAnimations;

function replaceAnimations(result) {
  var animations = Object.keys(result.keyframes).reduce(function(acc, key) {
    acc[result.keyframes[key]] = key;
    return acc;
  }, {});
  var unscoped = Object.keys(animations);

  if (unscoped.length) {
    var regexStr = '((?:animation|animation-name)\\s*:[^};]*)('
      + unscoped.join('|') + ')([;\\s])' + ignoreComments;
    var regex = new RegExp(regexStr, 'g');

    var replaced = result.css.replace(regex, function(match, preamble, name, ending) {
      return preamble + animations[name] + ending;
    });

    return {
      css: replaced,
      keyframes: result.keyframes,
      classes: result.classes
    }
  }

  return result;
}

},{"./regex":16}],18:[function(require,module,exports){
'use strict';

var encode = require('./base62-encode');
var hash = require('./hash-string');

module.exports = function fileScoper(fileSrc) {
  var suffix = encode(hash(fileSrc));

  return function scopedName(name) {
    return name + '_' + suffix;
  }
};

},{"./base62-encode":7,"./hash-string":15}],19:[function(require,module,exports){
'use strict';

var fileScoper = require('./scoped-name');
var replaceAnimations = require('./replace-animations');
var regex = require('./regex');
var classRegex = regex.classRegex;
var keyframesRegex = regex.keyframesRegex;

module.exports = scopify;

function scopify(css, ignores) {
  var makeScopedName = fileScoper(css);
  var replacers = {
    classes: classRegex,
    keyframes: keyframesRegex
  };

  function scopeCss(result, key) {
    var replacer = replacers[key];
    function replaceFn(fullMatch, prefix, name) {
      var scopedName = ignores[name] ? name : makeScopedName(name);
      result[key][scopedName] = name;
      return prefix + scopedName;
    }
    return {
      css: result.css.replace(replacer, replaceFn),
      keyframes: result.keyframes,
      classes: result.classes
    };
  }

  var result = Object.keys(replacers).reduce(scopeCss, {
    css: css,
    keyframes: {},
    classes: {}
  });

  return replaceAnimations(result);
}

},{"./regex":16,"./replace-animations":17,"./scoped-name":18}],20:[function(require,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}],21:[function(require,module,exports){
var csjs = require('csjs-inject')

/********************************************************************
  THEME
********************************************************************/

// WEBSITE COLORS
var violet       = '#4539c5'
var pink         = '#f1a0ff'
var grey         = '#a9a8a8'
var blue         = '#7f70f7'
var lightYellow  = '#f8de96'
var yellow       = '#f5bb71'
var neonGreen    = '#4efc51'
var white        = '#ffffff'
// FONTS
var fontXXS = '10'
var fontXS  = fontXXS*1.3
var fontS   = fontXXS*1.6
var fontM   = fontXXS*2.0
var fontXM  = fontXXS*2
var fontXXM = fontXXS*2.2
var fontL   = fontXXS*3
var fontXL  = fontXXS*8
var fontXXL = fontXXS*11
// var fontfamily = 'https://fonts.googleapis.com/css?family=Noto+Sans'
// var font       = 'Noto Sans, sans-serif'
var fontfamily = '/ubuntu.woff2'
var font       = 'Ubuntu, sans-serif'
/********************************************************************
  INIT
********************************************************************/
csjs`
html { box-sizing: border-box; display: table; min-width: 100%; margin: 0; }
*, *:before, *:after { box-sizing: inherit; }
body { margin: 0; display: flex; flex-flow: column; min-height: 100vh; }
`
let magic_font = new FontFace('Magic School One', 'url("https://fonts.cdnfonts.com/s/56374/MagicSchoolOne.woff")')
document.fonts.add(magic_font)
magic_font.load()

var app = page()
  csjs`
    @font-face {
      font-family: 'Noto Sans';
      font-style: normal;
      font-weight: 400;
      src: local('Noto Sans'), local('NotoSans'), url(${fontfamily}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
    }
  `
  document.body.appendChild(app)
/********************************************************************
  PAGE COMPONENT
********************************************************************/
function page () {
  var css = csjs`
    .page {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: left;
      font-family: ${font};
    }
  `
  var header = headerComponent()
  var pitch = pitchComponent()
  var portfolio = portfolioComponent()
  var call2action = call2actionComponent()
  var testimonials = testimonialsComponent()
  var footer = footerComponent()

  const el = document.createElement('div')
  el.classList.add(css.page)
  el.append(header, pitch, portfolio, call2action, testimonials, footer)
  return el
}
/********************************************************************
  HEADER COMPONENT
********************************************************************/
function headerComponent () {
  var css = csjs`
    .header {
      width               : 100%;
      background-color    : ${violet};
      background-size     : cover;
      background-repeat   : no-repeat;
      background-position : center;
      display             : flex;
      align-items         : center;
      justify-content     : center;
      flex-direction      : column;
      transition          : all 0.5s ease;
      padding             : 50px;
    }
    .header:hover {
      opacity             : 0.9;
      transition          : all 0.5s ease;
    }
    .logo {
      width: 500px;
    }
    .title {
      font-family: 'Magic School One', sans-serif;
      line-height: 0.8;
      font-weight : 100;
      font-size   : ${fontXXL}px;
      white-space : nowrap;
      color       : ${white};
      margin-bottom: 40px;
    }
    .subtitle {
      font-size   : ${fontL}px;
      font-weight : 600;
      white-space : nowrap;
      color       : ${white};
    }
    @media only screen and (max-width: 1270px) {
    }
    @media only screen and (max-width: 1200px) {
    }
    @media only screen and (max-width: 1008px) {
      .title {
        font-size   : ${fontXL}px;
      }
      .subtitle {
        font-size   : ${fontXXM}px;
      }
    }
    @media only screen and (max-width: 768px) {
      .title {
        font-size   : ${fontL}px;
        font-weight : 600;
      }
      .subtitle {
        font-size   : ${fontS}px;
        font-weight : 500;
      }
    }
    @media only screen and (max-width: 660px) {
    }
    @media only screen and (max-width: 600px) {
    }
    @media only screen and (max-width: 480px) {
    }
    @media only screen and (max-width: 320px) {
      .title {
        font-size   : ${fontXXM}px;
      }
      .subtitle {
        font-size   : ${fontXS}px;
        font-weight : 500;
      }
    }
  `
  const el = document.createElement('div')
  el.classList.add(css.header)
  el.innerHTML = `
  <div class=${css.title}>Wizard Amigos</div>
  <div class=${css.subtitle}>Learning the magical literacy of the future</div>
  <img class=${css.logo} src='src/assets/Wizard-Amigos---Stickers---WIZARD-DUO---TRANSPARENT---2022.png'></img>
  ` 
  return el
}
/********************************************************************
  PITCH COMPONENT
********************************************************************/
function pitchComponent () {
  var css = csjs`
    .pitch {
      padding           : 5% 30%;
      flex-grow         : 1;
      display           : flex;
      flex-direction    : column;
      align-items       : center;
      width             : 100%;
      background-color  : ${pink};
      color             : ${violet};
    }
    .title {
      font-size         : ${fontXL}px;
      font-family       : 'Magic School One', sans-serif;
      line-height       : 0.8;
      font-weight       : 100;
    }
    .description {
      padding           : 10px;
      font-size         : ${fontXXM}px;
      font-weight       : 700;
      align-items       : center;
    }
    .action {
      min-width         : 200px;
      width             : 50%;
      margin            : 20px;
      display           : flex;
      flex-direction    : column;
      justify-content   : center;
      align-items       : center;
    }
    .subtitle {
      font-size         : ${fontXXM}px;
      text-align        : center;
    }
    .subdescription {
      margin-top        : 15px;
      font-size         : ${fontS}px;
      text-align        : center;
    }
    .button a {
      display             : flex;
      align-items         : center;
      justify-content     : center;
      margin-top          : 15px;
      padding             : 20px;
      background-color    : ${blue};
      color               : ${neonGreen};
      font-size           : ${fontXS}px;
      font-weight         : 700;
      width               : 150px;
      border-radius       : 50px;
      text-decoration     : none;
      transition          : all 0.5s ease;
    }
    .button:hover a {
      background-color    : ${neonGreen};
      color               : ${violet};
      transition          : all 0.5s ease;
    }
    @media only screen and (max-width: 1270px) {
    }
    @media only screen and (max-width: 1200px) {
      .step {
        min-width         : 300px;
      }
    }
    @media only screen and (max-width: 1008px) {
      .pitch {
        padding           : 5%;
      }
      .step {
        min-width         : 220px;
      }
      .title {
        font-size         : ${fontXL}px;
      }
      .subtitle {
        font-size         : ${fontM}px;
      }
      .description {
        font-size         : ${fontM}px;
      }
      .subdescription {
        font-size         : ${fontS}px;
      }
    }
    @media only screen and (max-width: 768px) {
      .steps {
        flex-direction    : column;
      }
      .step {
        width             : 100%;
        margin            : 10px;
      }
      .title {
        font-size         : ${fontXL}px;
      }
      .subtitle {
        font-size         : ${fontS}px;
      }
      .description {
        font-size         : ${fontS}px;
      }
      .subdescription {
        font-size         : ${fontS}px;
      }
    }
    @media only screen and (max-width: 660px) {
      .pitch {
        padding           : 5%;
      }
    }
    @media only screen and (max-width: 600px) {
      .pitch {
        padding           : 5%;
      }
      .title {
        font-size         : ${fontXL}px;
      }
      .subtitle {
        font-size         : ${fontS}px;
      }
      .description {
        font-size         : ${fontS}px;
      }
      .subdescription {
        font-size         : ${fontXS}px;
      }
    }
    @media only screen and (max-width: 480px) {
    }
    @media only screen and (max-width: 320px) {
    }
  `
  function hover () { this.classList.toggle(css.subtitle_hover) }
  const el = document.createElement('pitch')
  el.classList.add(css.pitch)
  el.innerHTML = `
    <div class=${css.title}>
    JavaScript for nomads
  </div>
  <div class=${css.description}>
    In the early 2014 we started Wizard Amigos in Berlin. We organized over 800 events, co-learning workshops and code camps since then. Before that we participated in several groups in Berlin (Hack and Tell, Open Knowledge, Open Tech School, Rails Girls and more).
  </div>
  <div class=${css.action}>
  <div class=${css.subtitle}> WHO ARE WE </div>
  <div class=${css.subdescription}>
    WizardAmigos learners come from very different backgrounds - from journalists,
    translators, biologists, physicists to activists, students and many other backgrounds. What do we have in common? We are all interested in technology, we
    love to travel and we want to work remote.
  </div>
  <div class=${css.button}> <a href='https://medium.com/nina-developerina/buliding-online-communities-coding-amigos-228fdafc77e7' target='_blank'>More</a> </div>
</div>
<div class=${css.action}>
  <div class=${css.subtitle}> WHAT CAN I LEARN? </div>
  <div class=${css.subdescription}>
    In our community we are focusing on learning digital, financial, sustainability and entrepreneurial literacy. Our tools are native javascript, node modules and open source. We are also active citizens, working for
    more transparency, abolishing discrimination and for in general better collaboration within our society.
  </div>
  <div class=${css.button}>
  <a href='https://github.com/wizardamigos/skilltree/blob/master/README.md' target='_blank'>Resources</a>
  </div>
</div>
  `
  return el
}
/********************************************************************
  PORTFOLIO COMPONENT
********************************************************************/
function portfolioComponent () {
  // var svg = pixelate(b,dB,b)
  // svg.setAttribute('xmlns','http://www.w3.org/2000/svg')
  // svg.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink')
  // svg.setAttribute('version','1.1')
  // background-image  : url('data:image/svg+xml;base64,${btoa(svg.outerHTML)}');
  var css = csjs`
    .portfolio {
      padding           : 5% 30%;
      flex-grow         : 1;
      display           : flex;
      flex-direction    : column;
      align-items       : center;
      width             : 100%;
      background-color  : ${violet};
    }
    .title {
      margin-top        : 50px;
      padding           : 5px;
      font-size         : ${fontXL}px;
      font-family       : 'Magic School One', sans-serif;
      line-height       : 0.8;
      font-weight       : 100;
      color             : ${neonGreen};
    }
    .description {
      padding           : 10px;
      font-size         : ${fontXXM}px;
      font-weight       : 700;
      color             : ${neonGreen};
      text-align        : center;
    }
    .subtitle {
      font-size         : ${fontXXM}px;
      text-align        : center;
      line-height       : 1.4rem;
    }
    .subdescription {
      margin-top        : 15px;
      font-size         : ${fontS}px;
      text-align        : center;
    }
    .image {
      width             : 250px;
    }
    .card {
      flex-grow           : 1;
      display             : flex;
      align-items         : center;
      justify-content     : center;
      background-size     : cover;
      background-repeat   : no-repeat;
      background-position : center;
      text-decoration     : none;
      color               : ${yellow};
      opacity             : 0.9;
      font-size           : ${fontXXL}px;
      color               : ${pink};
      font-weight         : 900;
      text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
      transition          : all 0.5s ease;
    }
    .card_hover {
      position            : relative;
      color               : ${neonGreen};
    }
    .card_hover::after {
      position            : absolute;
      content             : '';
      top                 : 0;
      left                : 0;
      width               : 100%;
      height              : 100%;
      opacity             : 1;
    }
    .button {
      display             : flex;
      align-items         : center;
      background-color    : ${pink};
      color               : ${neonGreen};
      justify-content     : center;
      margin-bottom       : 40px;
      padding             : 20px;
      font-size           : ${fontS}px;
      font-weight         : 700;
      min-width           : 150px;
      border-radius       : 50px;
      text-decoration     : none;
      transition          : all 0.5s ease;
    }
    .button:hover {
      background-color    : ${neonGreen};
      color               : ${violet};
      transition          : all 0.5s ease;
    }
    @media only screen and (max-width: 1270px) {
    }
    @media only screen and (max-width: 1200px) {
    }
    @media only screen and (max-width: 1008px) {
      .portfolio {
        padding           : 5%;
      }
      .title {
        font-size         : ${fontXL}px;
      }
      .subtitle {
        font-size         : ${fontM}px;
      }
      .description {
        font-size         : ${fontM}px;
      }
      .subdescription {
        font-size         : ${fontS}px;
      }
    }
    @media only screen and (max-width: 768px) {
      .portfolio {
        padding           : 5%;
      }
      .image {
        width             : 200px;
      }
      .title {
        font-size         : ${fontXL}px;
      }
      .subtitle {
        font-size         : ${fontS}px;
      }
      .description {
        font-size         : ${fontXS}px;
      }
      .subdescription {
        font-size         : ${fontS}px;
      }
    }
    @media only screen and (max-width: 660px) {
    }
    @media only screen and (max-width: 600px) {
      .title {
        font-size         : ${fontXL}px;
      }
      .subtitle {
        font-size         : ${fontS}px;
      }
      .description {
        font-size         : ${fontS}px;
      }
      .subdescription {
        font-size         : ${fontXS}px;
      }
    }
    @media only screen and (max-width: 480px) {
    }
    @media only screen and (max-width: 320px) {
    }
  `
  function hover () { this.classList.toggle(css.card_hover) }
  const el = document.createElement('div')
  el.classList.add(css.portfolio)
  el.innerHTML = `
      <div class=${css.title}>
        Wizard magic
      </div>
      <div class=${css.description}>
        Programming is the new literacy. Learn it together with transparent, open minded,
        science loving, diverse and nomadic community of individuals with activist streak.
        You can do it on your own or at a code camp nearby.
        <br>
        <br>
        You need to have your own computer. It doesn't have to be super powerful, but you need one and it should run on Linux or Mac OSX. If it runs on Windows, we will help you to install Linux.
        <br>
        <br>
        Modern learning resources online are mostly written in English. It's very helpful if you are able to understand some basic English, but our mentors and community members speak German, English, Slovenian, Spanish, Chinese (and other languages) and they are happy to help you out anytime :-) 
        If you are not sure whether this is for you, contact us and we are happy to talk to you.
        <br>
        <br>
        We promise to make this learning journey exciting for all future Wizard Amigos. Our learning-by-doing approach will help you get to know the right magic spells to become an active problem solver. All our learning materials are open source and under a free license.
      </div>
      <img class=${css.image} src='src/assets/Wizard Amigos - Stickers - WIZARD BALL - CIRCLE - 2022.png'></img>
      <a class=${css.button} href="https://discord.gg/8FzZPHkp44" target='_blank'>Enter</a>
  `
  return el
}
/********************************************************************
  CALL2ACTION COMPONENT
********************************************************************/
function call2actionComponent () {
  var css = csjs`
    .call2action {
      padding           : 5% 30%;
      flex-grow         : 1;
      display           : flex;
      flex-direction    : column;
      align-items       : center;
      width             : 100%;
      background-color  : ${neonGreen};
      color             : ${violet};
    }
    .title {
      font-size         : ${fontXL}px;
      font-family       : 'Magic School One', sans-serif;
      line-height       : 0.8;
      font-weight       : 100;
    }
    .description {
      padding           : 10px;
      font-size         : ${fontXXM}px;
      font-weight       : 700;
      text-align        : center;
    }
    .subtitle {
      font-size         : ${fontXXM}px;
      text-align        : center;
      line-height       : 1.4rem;
    }
    .subdescription {
      margin-top        : 15px;
      font-size         : ${fontS}px;
      text-align        : center;
    }
    .subdescription a {
      cursor            : pointer;
      text-decoration   : underline;
      color             : ${blue};
      transition        : all 0.5s ease;
    }
    .subdescription a:hover {
      opacity           : 0.8;
      transition          : all 0.5s ease;
    }
    .calls {
      margin            : 25px;
      display           : flex;
      justify-content   : center;
      flex-direction    : row;
      width             : 100%;
    }
    .action {
      min-width         : 200px;
      width             : 50%;
      margin            : 20px;
      display           : flex;
      flex-direction    : column;
      justify-content   : center;
      align-items       : center;
    }
    .button a {
      display             : flex;
      align-items         : center;
      justify-content     : center;
      margin-top          : 15px;
      padding             : 20px;
      background-color    : ${blue};
      color               : ${neonGreen};
      font-size           : ${fontXS}px;
      font-weight         : 700;
      width               : 150px;
      border-radius       : 50px;
      text-decoration     : none;
      transition          : all 0.5s ease;
    }
    .button:hover a {
      background-color    : ${neonGreen};
      color               : ${violet};
      transition          : all 0.5s ease;
    }
    .steps {
      display           : flex;
      flex-direction    : row;
      padding           : 20px;
      align-items       : stretch;
      justify-content   : center;
      width             : 100%;
    }
    .subtitle {
      font-size         : ${fontL}px;
      text-align        : center;
    }
    .step {
      display           : flex;
      flex-direction    : column;
      width             : 30%;
      margin            : 35px;
    }
    .icon1 {
      align-self        : center;
      width             : 50px;
    }
    .icon2 {
      align-self        : center;
      width             : 50px;
    }
    .icon3 {
      align-self        : center;
      width             : 50px;
    }

    @media only screen and (max-width: 1270px) {
    }
    @media only screen and (max-width: 1200px) {
      .step {
        min-width         : 300px;
      }
    }
    @media only screen and (max-width: 1008px) {
      .call2action {
        padding           : 5%;
      }
      .title {
        font-size         : ${fontXL}px;
      }
      .subtitle {
        font-size         : ${fontM}px;
      }
      .description {
        font-size         : ${fontM}px;
      }
      .subdescription {
        font-size         : ${fontS}px;
      }
      .step {
        min-width         : 220px;
      }
    }
    @media only screen and (max-width: 768px) {
      .call2action {
        padding           : 5%;
      }
      .title {
        font-size         : ${fontXL}px;
      }
      .subtitle {
        font-size         : ${fontS}px;
      }
      .description {
        font-size         : ${fontS}px;
      }
      .subdescription {
        font-size         : ${fontS}px;
      }
      .steps {
        flex-direction    : column;
      }
      .step {
        width             : 100%;
        margin            : 10px;
      }
    }
    @media only screen and (max-width: 660px) {
      .calls {
        flex-direction    : column;
      }
    }
    @media only screen and (max-width: 600px) {
      .title {
        font-size         : ${fontXL}px;
      }
      .subtitle {
        font-size         : ${fontS}px;
      }
      .description {
        font-size         : ${fontS}px;
      }
      .subdescription {
        font-size         : ${fontXS}px;
      }
    }
    @media only screen and (max-width: 480px) {
    }
    @media only screen and (max-width: 320px) {
    }
  `
  const el = document.createElement('div')
  el.classList.add(css.call2action)
  el.innerHTML = `
    <div class=${css.title}> Why should you join Wizard Amigos? </div>
    <div class=${css.description}>
      Our aim is to give tools and community to everyone who wants to better
      understand the technology and work on their ideas.
      Wizard Amigos was born in Berlin but is now a global, non-profit community.
      Learn with us about the prototyping, how to use programming in science, how to build mobile and desktop apps,
      and what posibilities can technology bring for your future. 
    </div>
    <div class=${css.calls}>

    <div class=${css.steps}>
    <div class=${css.step}>
      <div class=${css.subtitle}>
        Wizardry
      </div>
      <div class=${css.subdescription}>
        We prepared a curriculum with video lessons and a support chat to help you if you get stuck. No coding experiences is neeed. All you need is a computer and internet connection. Try our latest workshop<br>
        <a href='https://www.youtube.com/channel/UC2Mqy2KDqpa1M1iZ_x_KiOQ/playlists' target='_blank'>Try it out, it's fun.</a>
      </div>
    </div>
    <div class=${css.step}>

      <div class=${css.subtitle}>
        Amigos
      </div>
      <div class=${css.subdescription}>
        Visit a local <a href='https://www.meetup.com/wizardamigos' target='_blank'>meetup</a> and get to know other nomadic developers and learners from all over the world. If there is no local meetups
        in your neighbourhood, you can start organizing one yourself.
      </div>
    </div>
    <div class=${css.step}>
      <div class=${css.subtitle}>
        Mana
      </div>
      <div class=${css.subdescription}>
        Once you have the basic knowledge of JavaScript programming language,
        you can join our remote internship program, where you will be able
        to work together with experienced developers on different tasks.
      </div>
    </div>
  </div>
  `
  return el
}
/********************************************************************
  TESTIMONIALS COMPONENT
********************************************************************/
function testimonialsComponent () {
  var css = csjs`
    .testimonials {
      padding             : 50px;
      flex-grow           : 1;
      display             : flex;
      flex-direction      : column;
      align-items         : center;
      justify-content     : center;
      width               : 100%;
      background-size     : cover;
      background-repeat   : no-repeat;
      background-position : center;
      background-color    : ${yellow};
    }
    .quote {
      width               : 50%;
      text-align          : center;
      font-size           : ${fontL}px;
      font-weight         : 700;
      color               : ${lightYellow};
    }
    .nomad {
      width               : 350px;
    }
    .author a {
      font-size           : ${fontM}px;
      font-weight         : 900;
      text-decoration     : underline;
      color               : ${violet};
    }
    .author a:hover {
      cursor              : pointer;
      color               : ${white};
    }
    @media only screen and (max-width: 1270px) {
    }
    @media only screen and (max-width: 1200px) {
    }
    @media only screen and (max-width: 1008px) {
    }
    @media only screen and (max-width: 768px) {
      .quote {
        font-size           : ${fontM}px;
      }
    }
    @media only screen and (max-width: 660px) {
    }
    @media only screen and (max-width: 600px) {
      .quote {
        font-size           : ${fontXXM}px;
      }
      .title {
        font-size         : ${fontL}px;
      }
      .description {
        font-size         : ${fontS}px;
        font-weight       : 600;
      }
    }
    @media only screen and (max-width: 480px) {
      .quote {
        font-size           : ${fontXM}px;
      }
      .author {
        font-size           : ${fontS}px;
      }
    }
    @media only screen and (max-width: 320px) {
    }
  `
  const el = document.createElement('div')
  el.classList.add(css.testimonials)
  el.innerHTML = `
    <div class=${css.testimonials}>
      <div class=${css.quote}>
        We are a commmunity of self employed nomadic developers who collaborate
        on projects, share skills and build awesome products and services.
      </div>
      <img class=${css.nomad} src='src/assets/Wizard-Amigos---Stickers---CAT-NOMAD---TRANSPARENT---2022.png'></img>
      <div class=${css.author}>
        <a href='https://wizardamigos.com/codecamp2022/' target='_blank'> Check out also our Code Camp in Wales. It is happening from Sep 26 until Oct 10 2022 </a>
      </div>
    </div>
  `
  return el
}
/********************************************************************
  FOOTER COMPONENT
********************************************************************/
function footerComponent () {
  var css = csjs`
    .footer {
      flex-grow           : 1;
      width               : 100%;
      background-color    : black;
      color               : white;
      display             : flex;
      align-items         : center;
      justify-content     : center;
      flex-direction      : column;
    }
    .socialmedia {
      display             : flex;
      flex-direction      : row;
      justify-content     : space-around;
      margin-top          : 15px;
      padding             : 10px;
      width               : 300px;
    }
    .iconTwitter {
      width               : 50px;
      height              : 50px;
    }
    .iconFacebook {
      width               : 50px;
      height              : 50px;
    }
    .iconMail {
      width               : 50px;
      height              : 50px;
    }
    @media only screen and (max-width: 1270px) {
    }
    @media only screen and (max-width: 1200px) {
    }
    @media only screen and (max-width: 1008px) {
    }
    @media only screen and (max-width: 768px) {
    }
    @media only screen and (max-width: 660px) {
    }
    @media only screen and (max-width: 600px) {
      .title {
        font-size         : ${fontL}px;
      }
      .description {
        font-size         : ${fontXM}px;
        font-weight       : 600;
      }
    }
    @media only screen and (max-width: 480px) {
    }
    @media only screen and (max-width: 320px) {
    }
  `
  const el = document.createElement('div')
  el.classList.add(css.footer)
  el.innerHTML = `
    <div class=${css.socialmedia}>
    <a href="https://www.facebook.com/groups/369246343421803/" target='_blank' class=${css.iconFacebook}>
      <svg viewBox="-1 -1 114 114">
        <g>
          <circle style="fill:#3B5998;" cx="56.098" cy="56.098" r="56.098"/>
          <path style="fill:#FFFFFF;" d="M70.201,58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34   c0-5.964,2.833-15.303,15.301-15.303L71.56,21.81v12.51h-8.151c-1.337,0-3.217,0.668-3.217,3.513v7.585h11.334L70.201,58.294z"/>
        </g>
      </svg>
    </a>
    <a href="https://twitter.com/wizardamigos" target='_blank' class=${css.iconTwitter}>
      <svg viewBox="-1 -1 412 412">
        <path style="fill:#76A9EA;" d="M403.632,74.18c-9.113,4.041-18.573,7.229-28.28,9.537c10.696-10.164,18.738-22.877,23.275-37.067  l0,0c1.295-4.051-3.105-7.554-6.763-5.385l0,0c-13.504,8.01-28.05,14.019-43.235,17.862c-0.881,0.223-1.79,0.336-2.702,0.336  c-2.766,0-5.455-1.027-7.57-2.891c-16.156-14.239-36.935-22.081-58.508-22.081c-9.335,0-18.76,1.455-28.014,4.325  c-28.672,8.893-50.795,32.544-57.736,61.724c-2.604,10.945-3.309,21.9-2.097,32.56c0.139,1.225-0.44,2.08-0.797,2.481  c-0.627,0.703-1.516,1.106-2.439,1.106c-0.103,0-0.209-0.005-0.314-0.015c-62.762-5.831-119.358-36.068-159.363-85.14l0,0  c-2.04-2.503-5.952-2.196-7.578,0.593l0,0C13.677,65.565,9.537,80.937,9.537,96.579c0,23.972,9.631,46.563,26.36,63.032  c-7.035-1.668-13.844-4.295-20.169-7.808l0,0c-3.06-1.7-6.825,0.485-6.868,3.985l0,0c-0.438,35.612,20.412,67.3,51.646,81.569  c-0.629,0.015-1.258,0.022-1.888,0.022c-4.951,0-9.964-0.478-14.898-1.421l0,0c-3.446-0.658-6.341,2.611-5.271,5.952l0,0  c10.138,31.651,37.39,54.981,70.002,60.278c-27.066,18.169-58.585,27.753-91.39,27.753l-10.227-0.006  c-3.151,0-5.816,2.054-6.619,5.106c-0.791,3.006,0.666,6.177,3.353,7.74c36.966,21.513,79.131,32.883,121.955,32.883  c37.485,0,72.549-7.439,104.219-22.109c29.033-13.449,54.689-32.674,76.255-57.141c20.09-22.792,35.8-49.103,46.692-78.201  c10.383-27.737,15.871-57.333,15.871-85.589v-1.346c-0.001-4.537,2.051-8.806,5.631-11.712c13.585-11.03,25.415-24.014,35.16-38.591  l0,0C411.924,77.126,407.866,72.302,403.632,74.18L403.632,74.18z"/>
      </svg>
    </a>
    <a href="https://discord.gg/8FzZPHkp44" target='_blank' class=${css.iconMail}>
      <svg viewBox="-1 -1 553 553">
        <g>
          <path style="fill:#76A9EA;" d="M501.613,491.782c12.381,0,23.109-4.088,32.229-12.16L377.793,323.567c-3.744,2.681-7.373,5.288-10.801,7.767    c-11.678,8.604-21.156,15.318-28.434,20.129c-7.277,4.822-16.959,9.737-29.045,14.755c-12.094,5.024-23.361,7.528-33.813,7.528    h-0.306h-0.306c-10.453,0-21.72-2.503-33.813-7.528c-12.093-5.018-21.775-9.933-29.045-14.755    c-7.277-4.811-16.75-11.524-28.434-20.129c-3.256-2.387-6.867-5.006-10.771-7.809L16.946,479.622    c9.119,8.072,19.854,12.16,32.234,12.16H501.613z"/>
          <path style="fill:#76A9EA;" d="M31.047,225.299C19.37,217.514,9.015,208.598,0,198.555V435.98l137.541-137.541    C110.025,279.229,74.572,254.877,31.047,225.299z"/>
          <path style="fill:#76A9EA;" d="M520.059,225.299c-41.865,28.336-77.447,52.73-106.75,73.195l137.486,137.492V198.555    C541.98,208.396,531.736,217.306,520.059,225.299z"/>
          <path style="fill:#76A9EA;" d="M501.613,59.013H49.181c-15.784,0-27.919,5.33-36.42,15.979C4.253,85.646,0.006,98.97,0.006,114.949    c0,12.907,5.636,26.892,16.903,41.959c11.267,15.061,23.256,26.891,35.961,35.496c6.965,4.921,27.969,19.523,63.012,43.801    c18.917,13.109,35.368,24.535,49.505,34.395c12.05,8.396,22.442,15.667,31.022,21.701c0.985,0.691,2.534,1.799,4.59,3.269    c2.215,1.591,5.018,3.61,8.476,6.107c6.659,4.816,12.191,8.709,16.597,11.683c4.4,2.975,9.731,6.298,15.985,9.988    c6.249,3.685,12.143,6.456,17.675,8.299c5.533,1.842,10.655,2.766,15.367,2.766h0.306h0.306c4.711,0,9.834-0.924,15.368-2.766    c5.531-1.843,11.42-4.608,17.674-8.299c6.248-3.69,11.572-7.02,15.986-9.988c4.406-2.974,9.938-6.866,16.598-11.683    c3.451-2.497,6.254-4.517,8.469-6.102c2.057-1.476,3.605-2.577,4.596-3.274c6.684-4.651,17.1-11.892,31.104-21.616    c25.482-17.705,63.01-43.764,112.742-78.281c14.957-10.447,27.453-23.054,37.496-37.803c10.025-14.749,15.051-30.22,15.051-46.408    c0-13.525-4.873-25.098-14.598-34.737C526.461,63.829,514.932,59.013,501.613,59.013z"/>
        </g>
      </svg>
    </a>
    </div>
    <hr style="width:50%; border-color: #999999;">
    <br> wizardamigos.com <br><br><br>
  `
  return el
}

},{"csjs-inject":3}]},{},[21]);
