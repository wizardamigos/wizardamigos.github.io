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
  <p>
    Wizard Amigos is a global community of self-employed nomadic developers, technologists, creators, problem solvers, thinkers, activists, researchers, artists, and individuals from diverse backgrounds who share a common passion for technology and open collaboration. The community was founded in Berlin in 2014 and has since expanded its reach to welcome participants from around the world.
  </p>
  <p>
    At its core, Wizard Amigos is dedicated to promoting open source, open data, and open organizing. The community is focused on fostering digital literacy, financial literacy, sustainability, and entrepreneurial skills. Members come together to learn, collaborate, and work on various projects and initiatives.
  </p>
  <p>
  Wizard Amigos hosts a variety of events, including meetups, co-learning workshops, and code camps that provide opportunities for individuals to learn, share their skills, and collaborate on innovative projects. These events often revolve around topics such as P2P technology, federated systems, co-governance, and care for people and the future.
  </p>
  <p>
  The community's unique approach encourages a hands-on, learning-by-doing style of education. All learning materials are open source and freely available, making knowledge accessible to everyone. Whether you're a seasoned developer or new to the tech world, Wizard Amigos welcomes individuals with a shared interest in technology, travel, and a desire to make a positive impact on society.
  </p>
  <p>
    If you're looking to expand your technical skills, connect with a diverse and supportive community, or embark on a nomadic journey of learning and discovery, Wizard Amigos may be the perfect fit for you. Joining this community offers the opportunity to work with like-minded individuals and explore the exciting world of technology, open source, and collaborative problem-solving.
  </p>
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
        <a href='https://wizardamigos.com/codecamp2023/' target='_blank'> Want to join us for the Code Camp this year in Portugal (October 2023)? </a>
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
