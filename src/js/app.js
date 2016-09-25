// ---------------------------------------------------------------------------------------------------------------------------
// Initialize Firebase
// ---------------------------------------------------------------------------------------------------------------------------
var config = {
    apiKey: "AIzaSyBRxFRRmMpXY1RmDSFvf-OOpf76kDK7dw8",
    authDomain: "project-6372607757339212977.firebaseapp.com",
    databaseURL: "https://wizard-amigos.firebaseio.com/",
    storageBucket: "project-6372607757339212977.appspot.com",
};
firebase.initializeApp(config)
var ref = new Firebase('https://wizard-amigos.firebaseio.com/')





// ---------------------------------------------------------------------------------------------------------------------------
// LOAD VIDEO DATA
// ---------------------------------------------------------------------------------------------------------------------------
var playlistMeta = []
var playlistData
var playlist = []
var playlistCursor = 0
var player

ref.child("videos").once('value', function (data) {
    playlistMeta = data.val()
    var dom = "<ul>"

    // GENERATE INDEX
    for (x in playlistMeta){
        dom += "<li onclick='gotoVideo(" + x + ")'>"+ x + " &nbsp; - &nbsp; " + playlistMeta[x].title + "</li>"
    }
    dom += "</ul>"
    $(".modal-index").html(dom)

    // ADD VIDEO METADATA
    $(".title").html("<h1>"+playlistCursor+" - "+playlistMeta[playlistCursor].title+"</h1>")
    $(".description").html("<p>"+playlistMeta[playlistCursor].desc+"</p>")
})



// ---------------------------------------------------------------------------------------------------------------------------
// LOAD SKILLTREE DATA
// ---------------------------------------------------------------------------------------------------------------------------
var json
ref.child("skills").once('value', function (data) {
    json = data.val()
    // console.log(json)
    init();
})


// ---------------------------------------------------------------------------------------------------------------------------
// YOUTUBE PLAYER
// ---------------------------------------------------------------------------------------------------------------------------
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        // height: '390',
        // width: '640',
        // videoId: '-YzMiTUjUZw',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    })
}

function onPlayerReady(event) {
    getYoutubePlaylist()
    loadVideo()
}

function onPlayerStateChange(event) {
    if(event.data === 0) {
        nextVideo();
    }
}

function minixhr (url, cb) {
  var items
  $.get(url, function (data) {
    items = data.items.map(function(x){return x.snippet.resourceId.videoId})
    cb({ items: items, next: data.nextPageToken})
  })
}

function getYoutubePlaylist () {
  minixhr(makeURL(), function response (data) {
    player.cueVideoById(data.items[0])
    addMore(data)
  })
  function addMore (data) {
    playlist = playlist.concat(data.items)
    if (data.next) minixhr(makeURL(data.next), addMore)
  }
}
var counter = 0
function makeURL (next, size) {
  next = "&pageToken=" + (next || '')
  size = size || 50
  var id = "PLbtP2pUMT_hukdtCayfrk592awflW5GEe"
  var key = "AIzaSyB6yBDZDm5CrTfSyB1ZZLtTcvim2kBCfYU"
  var base   = "https://www.googleapis.com/youtube/v3/playlistItems?"
  var params = "part=snippet&maxResults="+size+"&playlistId="+id+"&key="+key
  return base + params + next
}

function loadVideo(){
    player.cueVideoById(playlist[playlistCursor])
    $(".title").html("<h1>"+playlistCursor+" - "+playlistMeta[playlistCursor].title+"</h1>");
    $(".description").html("<p>"+playlistMeta[playlistCursor].desc+"</p>");
}

function nextVideo(){
    if(playlistCursor < playlist.length - 1){
        playlistCursor++
        loadVideo()
    }
}

function prevVideo(){
    if(playlistCursor >= 1){
        playlistCursor--
        loadVideo()
    }
}

function gotoVideo(target){
    playlistCursor = target
    loadVideo()
    closeIndex()
}








$(document).ready(function() {
    /* ANIMSITION INIT */
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body',
        transition: function(url){ window.location.href = url; }
    });
    /* ANIMSITION INIT */
});






// -----------------------------------------------------------------------------------------------------------------------
// ANIMATION TOGGLES
// -----------------------------------------------------------------------------------------------------------------------
function hideChat(){
    $("#chat").toggleClass("disabled-chat")
    $("#content").toggleClass("disabled-chat")
    $("#toggle-chat").toggleClass("disabled-chat")
}

function hideNav(){
    $("#nav").toggleClass("disabled-nav")
    $("#content").toggleClass("disabled-nav")
    $("#map").toggleClass("disabled-nav")
    $("#toggle-nav").toggleClass("disabled-nav")
}

function openIndex(){
    $(".modal-index").toggleClass("modal-index-active")
    $(".modal-bg").toggleClass("modal-index-active")
}

function closeIndex(){
    $(".modal-index").toggleClass("modal-index-active")
    $(".modal-bg").toggleClass("modal-index-active")
}

function openMap(){
    $("#map").addClass("open-map")
    $("#map-modal-bg").addClass("open-map")
}

function closeMap(){
    $("#map").removeClass("open-map");
    $("#map-modal-bg").removeClass("open-map")
}

// TODO REPLACE INLINE ONCLICK WITH JQUERY LISTENERS
$( ".close-btn" ).on("click", function( event ) {
  event.stopPropagation();
  $("#map").removeClass("open-map");
  $("#map-modal-bg").removeClass("open-map")
});

function toggleChat(){
    $("#chat").toggleClass("disabled-chat")
    $("#content").toggleClass("disabled-chat")
    $("#toggle-chat").toggleClass("disabled-chat")
}

function toggleNav(){
    $("#nav").toggleClass("disabled-nav")
    $("#content").toggleClass("disabled-nav")
    $("#map").toggleClass("disabled-nav")
    $("#toggle-nav").toggleClass("disabled-nav")
}




var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem)
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data

    //end
    //init Spacetree
    //Create a new ST instance
    var st = new $jit.ST({
        //id of viz container element
        injectInto: 'infovis',
        //set duration for the animation
        duration: 300,
        //set animation transition type
        transition: $jit.Trans.Quart.easeInOut,
        //set distance between node and its children
        levelDistance: 50,
        //enable panning
        Navigation: {
          enable:true,
          panning:true
        },
        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
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

        onBeforeCompute: function(node){
            Log.write("loading " + node.name);
        },

        onAfterCompute: function(){
            Log.write("done");
        },

        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function(label, node){
            label.id = node.id;
            label.innerHTML = node.name;
            label.onclick = function(){
            	if(normal.checked) {
            	  st.onClick(node.id);
            	} else {
                st.setRoot(node.id, 'animate');
            	}
            };
            //set label styles
            var style = label.style;
            style.width = 60 + 'px';
            style.height = 17 + 'px';
            style.cursor = 'pointer';
            style.color = '#333';
            style.fontSize = '0.8em';
            style.textAlign= 'center';
            style.paddingTop = '3px';
        },

        //This method is called right before plotting
        //a node. It's useful for changing an individual node
        //style properties before plotting it.
        //The data properties prefixed with a dollar
        //sign will override the global node style properties.
        onBeforePlotNode: function(node){
            //add some color to the nodes in the path between the
            //root node and the selected node.
            if (node.selected) {
                node.data.$color = "#ff7";
            }
            else {
                delete node.data.$color;
                //if the node belongs to the last plotted level
                if(!node.anySubnode("exist")) {
                    //count children number
                    var count = 0;
                    node.eachSubnode(function(n) { count++; });
                    //assign a node color based on
                    //how many children it has
                    node.data.$color = ['#aaa', '#baa', '#caa', '#daa', '#eaa', '#faa'][count];
                }
            }
        },

        //This method is called right before plotting
        //an edge. It's useful for changing an individual edge
        //style properties before plotting it.
        //Edge data proprties prefixed with a dollar sign will
        //override the Edge global style properties.
        onBeforePlotLine: function(adj){
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                adj.data.$color = "#eed";
                adj.data.$lineWidth = 3;
            }
            else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        }
    });
    //load json data
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //emulate a click on the root node.
    st.onClick(st.root);
    //end
    //Add event handlers to switch spacetree orientation.
    var top = $jit.id('r-top'),
        left = $jit.id('r-left'),
        bottom = $jit.id('r-bottom'),
        right = $jit.id('r-right'),
        normal = $jit.id('s-normal');


    function changeHandler() {
        if(this.checked) {
            top.disabled = bottom.disabled = right.disabled = left.disabled = true;
            st.switchPosition(this.value, "animate", {
                onComplete: function(){
                    top.disabled = bottom.disabled = right.disabled = left.disabled = false;
                }
            });
        }
    };

    top.onchange = left.onchange = bottom.onchange = right.onchange = changeHandler;
    //end

}











// ---------------------------------------------------------------------------------------------------------------------------
// INITIALIZE ANIMSITION
// ---------------------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body',
        transition: function(url){
            window.location.href = url
        }
    })

})
