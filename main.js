
let gameContainer = document.querySelector('.gameContainer');
let counter = 0;
let clicked = [];
let points = 0;
let timer = 120;
// 1. Create Grid
makeGrid();

let boxes = document.querySelectorAll('.box');

boxes.forEach(function (el) {
  el.addEventListener('click', flip)
})

function flip() {
this.removeEventListener('click',flip);
counter++;
clicked.push(this);
let front =  this.children[1];
let back =  this.children[0];
front.style.transform = "perspective(900px) rotateY(180deg)";
back.style.transform = "perspective(900px) rotateY(0deg)";



if (counter == 2) {
  removeClicks();
  checkTiles();
}
}

function checkTiles() {
  let back1 = clicked[0].children[0];
  let front1 = clicked[0].children[1];
  let back2 = clicked[1].children[0];
  let front2 = clicked[1].children[1];

  if (back1.innerHTML == back2.innerHTML) {
    //pogodak
    clicked[0].classList.add('checked')  ;                  // dodavanje klase
    clicked[1].classList.add('checked')  ;                  // dodavanje klase
    clicked.length = 0;                                   // brisanje svega iz Arraya
    counter=0;
    points+=2;
    returnClicks();
  }else{
    setTimeout(function () {
      front1.style.transform = "perspective(900px) rotateY(0deg)";
      back1.style.transform = "perspective(900px) rotateY(180deg)";
      front2.style.transform = "perspective(900px) rotateY(0deg)";
      back2.style.transform = "perspective(900px) rotateY(180deg)";

      clicked.length = 0;                                   // brisanje svega iz Arraya
      counter=0;
      returnClicks();
    },700);
  }
}

function removeClicks() {
  boxes.forEach(function (e) {
    e.removeEventListener('click',flip);
  })
}
function returnClicks() {
  let boxes = document.querySelectorAll('.box:not(.checked)')   //vracam klikove samo onim boxovima koji nemaju checked klasu
  boxes.forEach(function (e) {
    e.addEventListener('click',flip);
})
}


function makeGrid() {
  let text = '';

  for (var i = 0; i < 64; i++) {
    var rand = Math.floor(Math.random()*icons.length);
    text+='<div class="box">';
    text+='<div class="back">'+icons[rand]+'</div>';
    text+='<div class="front"><img src="krojac.png" alt="" width="100%"></div>';
    text+='</div>';

    icons.splice(rand,1);

  }
  gameContainer.innerHTML = text;
}

var clocks = document.querySelector('.stopwatch');
var score = document.querySelector('.score');
var start = document.querySelector('.start');
var leak = document.querySelector('.timeleak');
var l = 100;                    //PROCENTI za HEIGHT 100% - TIMELEAK

console.log(leak);
let s = 60;
let m = 4;
let loops;
start.addEventListener('click', function() {
  loops = setInterval(function() {
    leak.style.height=l+`%`;
    leak.style.background= "rgba(94, 165, 177, 0.5)";
     s--;
     l-=0.555555;
     if (s==1){
     setTimeout(function() {
       s=60;
    }, 1000);
  }
     if (s==59) {
      m--;
     };

   (s<10)? s="0"+s: s=s;
   (m<10)? m="0"+m: m=m;
  // document.querySelector('.stopwatch').appendChild =  `<p class="smalltxt">dada</p>`;

       clocks.innerHTML =  m + ":" + s;
   s=parseInt(s);
   m=parseInt(m);
   score.innerHTML = points;

   if (s==01 && m==00){
     stopGame();

     // start.removeEventListener('click', function(){})
     // removeClicks();
   // }, 1000);
   }
  // console.log(s);
}, 1000);
})
 // stop.addEventListener('click', function() {
 //   clearInterval(loops)
 // });


function stopGame () {
  boxes.forEach(function (e) {
    e.removeEventListener('click',flip);
    clocks.innerHTML = "JBG POKUSAJ OPET";
} )
// start.removeEventListener('click', function(){
//   clearInterval(function(){};
};
