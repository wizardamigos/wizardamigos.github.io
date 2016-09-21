// ---------------------------------------------------------------------------------------------------------------------------
// Initialize Firebase
// ---------------------------------------------------------------------------------------------------------------------------
var config = {
  apiKey: 'AIzaSyB6yBDZDm5CrTfSyB1ZZLtTcvim2kBCfYU',
  authDomain: 'wizard-amigos.firebaseapp.com',
  databaseURL: 'https://wizard-amigos.firebaseio.com/'
}

firebase.initializeApp(config)
var ref = firebase.database().ref()

// ---------------------------------------------------------------------------------------------------------------------------
// LOGIN
// ---------------------------------------------------------------------------------------------------------------------------
/*
document.getElementById('login-form').addEventListener('keydown', function (e) {
  if (e.keyCode == 13) {
    login(document.getElementById('login-mail').value, document.getElementById('login-pw').value)
  }
}, false)
*/
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log('// User is signed in.')
  } else {
    console.log('// No user is signed in.')
  }
})

function login (email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    console.log(errorCode + ' - ' + errorMessage)
  })
}

function register (email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    console.log(errorCode + ' - ' + errorMessage)
  })
}

function getCurrentUser () {
  var user = firebase.auth().currentUser
  console.log(user.displayName)
}

// ---------------------------------------------------------------------------------------------------------------------------
// LOAD LESSON DATA
// ---------------------------------------------------------------------------------------------------------------------------
var lessonData, player
var lessonCursor = 0

ref.child('videos').once('value', function (data) {
  lessonData = data.val()
  var dom = '<ul>'

  // GENERATE INDEX
  for (x in lessonData) {
    dom += '<li onclick="gotoVideo(' + x + ')">' + x + ' &nbsp; - &nbsp; ' + lessonData[x].title + '</li>'
  }

  dom += '</ul>'
  $('.modal-index').html(dom)

  // ADD VIDEO METADATA

  updateLessonData()
})

function updateLessonData () {
  $('.title').html('<h1>' + lessonCursor + ' - ' + lessonData[lessonCursor].title + '</h1>')
  $('.description').html('<p>' + lessonData[lessonCursor].desc + '</p>')
}

// ---------------------------------------------------------------------------------------------------------------------------
// LOAD SKILLTREE DATA
// ---------------------------------------------------------------------------------------------------------------------------
var json
ref.child('skills').once('value', function (data) {
  json = data.val()
  init()
})

// ---------------------------------------------------------------------------------------------------------------------------
// YOUTUBE PLAYER
// ---------------------------------------------------------------------------------------------------------------------------
function onYouTubePlayerAPIReady () {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  })
}

function onPlayerReady (event) {
  loadVideo()
}

function onPlayerStateChange (event) {
  if (event.data === 0) {
    nextVideo()
  }
}

function loadVideo () {
  player.cueVideoById(lessonData[lessonCursor].videoID)
  updateLessonData()
}

function nextVideo () {
  if (lessonCursor < lessonData.length - 1) {
    lessonCursor++
    loadVideo()
  }
}

function prevVideo () {
  if (lessonCursor >= 1) {
    lessonCursor--
    loadVideo()
  }
}

function gotoVideo (target) {
  lessonCursor = target
  loadVideo()
  closeIndex()
}

// ---------------------------------------------------------------------------------------------------------------------------
// INIT ANIMSITION
// ---------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
  $('.animsition').animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', // animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'body',
    transition: function (url) { window.location.href = url; }
  })
})

// -----------------------------------------------------------------------------------------------------------------------
// ANIMATION TOGGLES
// -----------------------------------------------------------------------------------------------------------------------
function toggleChat () {
  document.querySelector('#chat').classList.toggle('disabled-chat')
  document.querySelector('#content').classList.toggle('disabled-chat')
  document.querySelector('#toggle-chat').classList.toggle('disabled-chat')
}

function toggleNav () {
  document.querySelector('#nav').classList.toggle('disabled-nav')
  document.querySelector('#content').classList.toggle('disabled-nav')
  document.querySelector('#map').classList.toggle('disabled-nav')
  document.querySelector('#toggle-nav').classList.toggle('disabled-nav')
}

function toggleIndex () {
  document.querySelector('.modal-index').classList.toggle('modal-index-active')
  document.querySelector('.modal-bg').classList.toggle('modal-index-active')
}

function openMap () {
  document.querySelector('#map').classList.add('open-map')
  document.querySelector('#map-modal-bg').classList.add('open-map')
}

function closeMap () {
  document.querySelector('#map').classList.remove('open-map')
  document.querySelector('#map-modal-bg').classList.remove('open-map')
}

document.querySelector('.close-btn').addEventListener('click', function (event) {
  event.stopPropagation()
  closeMap()
})

// -----------------------------------------------------------------------------------------------------------------------
// SKILL TREE
// -----------------------------------------------------------------------------------------------------------------------
var labelType, useGradients, nativeTextSupport, animate
;(function () {
  var ua = navigator.userAgent,
    iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
    typeOfCanvas = typeof HTMLCanvasElement,
    nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
    textSupport = nativeCanvasSupport
      && (typeof document.createElement('canvas').getContext('2d').fillText == 'function')
  // I'm setting this based on the fact that ExCanvas provides text support for IE
  // and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML'
  nativeTextSupport = labelType == 'Native'
  useGradients = nativeCanvasSupport
  animate = !(iStuff || !nativeCanvasSupport)
})()

var Log = {
  elem: false,
  write: function (text) {
    if (!this.elem)
      this.elem = document.getElementById('log')
    this.elem.innerHTML = text
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px'
  }
}

function init () {
  // Create a new ST instance
  var st = new $jit.ST({
    // id of viz container element
    injectInto: 'infovis',
    // set duration for the animation
    duration: 300,
    // set animation transition type
    transition: $jit.Trans.Quart.easeInOut,
    // set distance between node and its children
    levelDistance: 50,
    // enable panning
    Navigation: {
      enable: true,
      panning: true
    },
    // set node and edge styles
    // set overridable=true for styling individual
    // nodes or edges
    Node: {
      height: 30,
      width: 90,
      type: 'rectangle',
      color: '#aaa',
      overridable: true
    },

    Edge: {
      type: 'bezier',
      overridable: true
    },

    onBeforeCompute: function (node) {
      Log.write('loading ' + node.name)
    },

    onAfterCompute: function () {
      Log.write('done')
    },

    // This method is called on DOM label creation.
    // Use this method to add event handlers and styles to
    // your node.
    onCreateLabel: function (label, node) {
      label.id = node.id
      label.innerHTML = node.name
      label.onclick = function () {
        if (normal.checked) {
          st.onClick(node.id)
        } else {
          st.setRoot(node.id, 'animate')
        }
      }
      // set label styles
      var style = label.style
      style.width = 60 + 'px'
      style.height = 17 + 'px'
      style.cursor = 'pointer'
      style.color = '#333'
      style.fontSize = '0.8em'
      style.textAlign = 'center'
      style.paddingTop = '3px'
    },

    // This method is called right before plotting
    // a node. It's useful for changing an individual node
    // style properties before plotting it.
    // The data properties prefixed with a dollar
    // sign will override the global node style properties.
    onBeforePlotNode: function (node) {
      // add some color to the nodes in the path between the
      // root node and the selected node.
      if (node.selected) {
        node.data.$color = '#ff7'
      }else {
        delete node.data.$color
        // if the node belongs to the last plotted level
        if (!node.anySubnode('exist')) {
          // count children number
          var count = 0
          node.eachSubnode(function (n) { count++; })
          // assign a node color based on
          // how many children it has
          node.data.$color = ['#aaa', '#baa', '#caa', '#daa', '#eaa', '#faa'][count]
        }
      }
    },

    // This method is called right before plotting
    // an edge. It's useful for changing an individual edge
    // style properties before plotting it.
    // Edge data proprties prefixed with a dollar sign will
    // override the Edge global style properties.
    onBeforePlotLine: function (adj) {
      if (adj.nodeFrom.selected && adj.nodeTo.selected) {
        adj.data.$color = '#eed'
        adj.data.$lineWidth = 3
      }else {
        delete adj.data.$color
        delete adj.data.$lineWidth
      }
    }
  })
  // load json data
  st.loadJSON(json)
  // compute node positions and layout
  st.compute()
  // optional: make a translation of the tree
  st.geom.translate(new $jit.Complex(-200, 0), 'current')
  // emulate a click on the root node.
  st.onClick(st.root)
  // end
  // Add event handlers to switch spacetree orientation.
  var top = $jit.id('r-top'),
    left = $jit.id('r-left'),
    bottom = $jit.id('r-bottom'),
    right = $jit.id('r-right'),
    normal = $jit.id('s-normal')

  function changeHandler () {
    if (this.checked) {
      top.disabled = bottom.disabled = right.disabled = left.disabled = true
      st.switchPosition(this.value, 'animate', {
        onComplete: function () {
          top.disabled = bottom.disabled = right.disabled = left.disabled = false
        }
      })
    }
  }
  top.onchange = left.onchange = bottom.onchange = right.onchange = changeHandler
// end
}
