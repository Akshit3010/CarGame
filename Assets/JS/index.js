const score = document.querySelector(".score");
const start_screen = document.querySelector(".start_screen");
const game_area = document.querySelector(".gamearea");

let player={speed:5,score:0};
let interval;
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
//EVENTS
start_screen.addEventListener("click", start_game);
document.addEventListener("keyup", off);
document.addEventListener("keydown", on);


function playGame(){
    let car= document.querySelector(".car");
    moveLines();
    moveEnemy(car);
    let road = game_area.getBoundingClientRect();
    if(player.start){
        if(keys.ArrowUp && player.y>road.top){player.y-= player.speed}
        if(keys.ArrowDown && player.y<road.bottom){player.y+= player.speed}
        if(keys.ArrowLeft && player.x > 0){player.x-= player.speed}
        if(keys.ArrowRight && player.x<(road.width-100)){player.x+= player.speed}
        car.style.top= player.y +"px";
        car.style.left= player.x +"px";
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText="Score : "+player.score;
    }
}
function moveLines(){
    let lines = document.querySelectorAll(".line");
    lines.forEach((item)=>{
        if(item.y > 1500){
            item.y -=1500;
        }
        item.y += player.speed;
        item.style.top =item.y +"px";
    })
}
function moveEnemy(car){
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach((item)=>{
        if(isCollide(car,item)){
            endGame();  
        }
        if(item.y > 1500){
            item.y =-600;
            item.style.left=Math.floor(Math.random()*450)+"px";
            

        }
        item.y += player.speed;
        item.style.top =item.y +"px";
    })
}
function isCollide(a,b){
    let aRect= a.getBoundingClientRect();
    let bRect= b.getBoundingClientRect();

    return !((aRect.bottom<bRect.top)||(aRect.top> bRect.bottom)||(aRect.left>bRect.right)||(aRect.right<bRect.left))
}

function on(e) {
    e.preventDefault();
    keys[e.key] = true;
   
  }
  function off(e) {
    e.preventDefault();
    keys[e.key] = false;
   
  }

//Function to start a game
function start_game() {
    start_screen.classList.add("hide");
    game_area.classList.remove("hide");
    game_area.innerHTML="";
    player.start=true;
    player.score=0;
    for (let i = 0; i < 10; i++) {
        let line =document.createElement("div");
        line.classList.add("line");
        line.y= i*150;
        line.style.top= (i*150) +"px";
        game_area.appendChild(line); 
    }
   
    window.requestAnimationFrame(playGame);
    let car= document.createElement("div");
    car.setAttribute("class","car");
    game_area.appendChild(car);
    player.x = car.offsetLeft;
    player.y =car.offsetTop;
    for (let i = 0; i < 3; i++) {
        let enemy =document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y= ((i+1)*600)*-1;
        enemy.style.top= enemy.y +"px";
        enemy.style.left=Math.floor(Math.random()*450)+"px";
        game_area.appendChild(enemy); 
    }
    interval = setInterval(()=>{
        player.speed+=5;
    },10000)
}

function endGame(){
    player.start=false;
    player.speed=5;
    clearInterval(interval);
    score.innerHTML="GameOver "+"<br/>"+"Your score was "+player.score;
    start_screen.classList.remove("hide");

}

function randomColor(){
    function c(){
        let hex= Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(2);
    }

    return "#"+c()+c()+c();
}

