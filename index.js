var score = 0, missed = 0;
var width = window.innerWidth, height = window.innerHeight;
let currentIndex = 0;
var quiz = [
  { question: 'Whats is the meaning of life?', answer: '42' },
  { question: 'Who invented the telephone?', answer: 'alexander' },
  { question: 'What is the tallest mammal on Earth?', answer: 'giraffe' },
  { question: 'Which bone is the longest and strongest bone in the human body?', answer: 'femur' },
  { question: 'What is the symbol for the chemical element gold on the periodic table?', answer: 'Au' },
  { question: 'What is the name of the largest moon of Saturn?', answer: 'titan' },
  { question: 'What is the name of the device that was used to detonate the first man-made nuclear explosion?', answer: 'The Trinity Device' }
];
document.getElementById("que").textContent = quiz[0].question;

let winScreen=document.querySelector('#win');
let player = $('.player');
let fig = document.querySelector('.player');
let body = fig.querySelectorAll('div');//variable that we'll use to target and change color of abebes body parts when damage is done.

let btns = document.querySelectorAll('button');
let arm = $('.right_arm');

const leftLeg = document.querySelector('.left_leg')
const rightLeg = document.querySelector('.right_leg')

const leftArm = document.querySelector('.left_arm')
const rightArm = document.querySelector('.right_arm')

let health = document.querySelector('.health')
let healthVal = 100     //this value is used to decrease the width of the healthbar div when abebe is hurt(AKA when some dumb mf gets a question wrong).

let screen = document.querySelector('.screen')//using this to hide the game screen when game over.

// these are the rotation angles for each limbs ,ik its stupid but i rly wanted 2 add them to make the legs and arms move;)
let RightLegAngle = -17
let LeftLegAngle = 17
let RightArmAngle = -9
let LeftArmAngle = 15

//Declaring variables for each page

var menuPage=$('#menu');
var back=$('.back');
var credits=$('#cred');
var creditPage=$('#credit');
var quit=$('#quit');
var dead=$('#death');

//Event listener functions

$('#start').click(function(){  
     //Checks if the start button in the menu is clicked then changes the display property to show the quiz game
    screen.style.display='grid';
    menuPage.css({'display':'none'});
});

back.click(function () {    //Checks if back button is clicked
  if(dead.css('display') ==='block'){
    dead.css({'display':'none'});
    // score = 0;
    // missed = 0;
    // healthVal=100;
    // currentIndex=0;
  }
  else{
    creditPage.css({'display':'none'});
  }
  menuPage.css({'display':'flex'});

});

quit.click(function(){
  window.close();
})

credits.click(function(){   //Checks if the credits button in the menu is clicked then changes the display property to show the credits page
  creditPage.css({'display':'block'});
  menuPage.css({'display':'none'});
});


function showDamage() {//colors all parts of abebe div to red to show damage.
  moveUp()
  body.forEach(
    bdy => { bdy.style.backgroundColor = 'red'; }
  )
  setTimeout(() => {
    body.forEach(bdy => {
      bdy.style.backgroundColor = 'black';
    });
  }, 150);
  healthVal -= 20
  health.style.width = `${healthVal}%`
}


function moveForward() {
  player.animate({ left: "+=100" }, "fast")
  player.animate({ left: "+=100" }, "fast")
  moveFeetForward();
}



// function moveBack() {
//   player.animate({ left: "-=100" }, "fast")
//   moveFeetBack()
// }


function moveFeetForward() {
  let initialRightLegAngle = RightLegAngle;
  let initialLeftLegAngle = LeftLegAngle;

  let initialRightArmAngle = RightArmAngle;
  let initialLeftArmAngle = LeftArmAngle;

  RightLegAngle += 30;
  LeftLegAngle -= 30;

  RightArmAngle += 30;
  LeftArmAngle -= 30;

  // wrote this part so  the angles don't exceed the initial angles of one another and make the character look weird nerds :)
  if ((RightLegAngle > initialLeftLegAngle) && (RightArmAngle > initialLeftArmAngle)) {
    RightLegAngle = initialLeftLegAngle;
    RightArmAngle = initialLeftArmAngle;
  }
  if ((LeftLegAngle < initialRightLegAngle) && (LeftArmAngle < initialRightArmAngle)) {
    LeftLegAngle = initialRightLegAngle;
    LeftArmAngle = initialRightArmAngle;
  }
  rightLeg.style.transform = `rotate(${RightLegAngle}deg)`;
  leftLeg.style.transform = `rotate(${LeftLegAngle}deg)`;

  rightArm.style.transform = `rotate(${RightArmAngle}deg)`;
  leftArm.style.transform = `rotate(${LeftArmAngle}deg)`;
}


function moveUp() {
  player.animate({ top: "-=15" }, "fast")
  player.animate({ top: "+=15" }, "fast")
}

// document.addEventListener('keydown', function (e) {//this part is just me making it easy to check how abebe moves when i press keys.
//   if (e.key == "d" || e.key == "D") { moveForward() }
//   else if (e.key == "A" || e.key == "a") { moveBack() }
//   else if (e.key == "W" || e.key == "w") { moveUp() }
// })

//---------------- Quiz js -----------------------------


$('#ans').click(checkAnswer);


function checkAnswer() {
  let answer = $('#question').val();
  document.getElementById("que").textContent = quiz[currentIndex].question;

  if (answer === quiz[currentIndex].answer) {
    correct();
    setTimeout(function () {
      $('#image').attr('src', 'images/nerdNormal.png');
      $('#tag').text("Answer the question or Abebe wont make it!!");
    }, 2000);
    currentIndex++;
  }
  else {
    if (missed>4) {//changed this to cause game over when abebe has no life,kinda like ur boy:(
      $('#image').attr('src', 'images/mad.jpg');
      setTimeout(death, 1100);
    }
    else {
      wrong();
      setTimeout(function () {
        $('#image').attr('src', "images/nerdNormal.png");
        $('#tag').text("Answer the question!!");
      }, 1200);
    }

  }
  document.getElementById("que").textContent = quiz[currentIndex].question;
}

function showWin() {
  $(".screen").css({ 'display': 'none' });
  $("#win").css({ 'display': 'flex', 'flexDirection': 'column', 'position': 'relative', 'margin-left': '25%' });
  $('body').css({ 'backgroundColor': 'white' });
  div.css({ 'position': 'relative' })
  screen.style.display = 'none'
}
function correct() {
  score++;
  $('#score').text(score);
  $('#image').attr('src', 'images/nerdSmiling.jpg');
  $('#tag').text("That's correct!!");
  moveForward()

  if (score >= 6) {//if 6 questions are answered correctly player wins and abebe moves out of forest.
   moveForward()
    setTimeout(showWin(),3000)
  }
}

function wrong() {
  $('#image').attr('src', 'images/nerdSad.png');
  $('#tag').text("That's wrong!!");
  missed++;
  $('#missed').text(missed);
  showDamage()
}



function death() {
  dead.css({'display':'block'})
  screen.style.display='none';
  winScreen.style.display='none';
};


