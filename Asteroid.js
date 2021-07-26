//made by Jwolf
//setup environment
movie = image();
movie.source = "space-stars-background_160081-158.jpg";
//make playable
var playable = true;
//create player object
function char(x,y){
 this.body = text('🚀',x,y+50); 
 this.body.rotation = -45;
 this.glow = circle(x+38,y+115,20,'orange','clear');
  this.glow.opacity = 0.7; 
}

//instatiate char @ 240,270 using an object constructor
var player = new char(240,270);

//create falling object that player will catch
var ast = text('🌑',Math.random()*movie.width,10);

//make asteroid fall down and then reset back to top
repeat(function(){
if (ast.y<movie.height){
 ast.y+=15  
}
  else
{ast.y = 0
ast.x = Math.random()*movie.width;
};
},1);


  
  var score = 0;
var scoreDisplay = text("Score = " + score);
var count = 0;


//player input
if(playable){
repeat(function(){
movie.whenKeyDown=function(key){
  //move right
  if (key ==='a'){
    player.body.x -=5;
    player.glow.x -=5.05; 
    }
  //move left
  if (key ==='d'){ 
    player.body.x +=5;
    player.glow.x +=5.05; }  
  //creates projectile
  if (key==='w'){
    var pew = circle(player.glow.x,player.body.y,20,'red')
    log('pew')
    //makes projectile move
    repeat(function(){
      if (pew.y<movie.height){pew.y-=30;}
      //collision between proj. and asteroid
       if(pew.x<ast.x+50 && pew.x>ast.x-50 &&
pew.y<ast.y+50 &&
pew.y>ast.y-50){
         //add to score
         score+=1;
        scoreDisplay.message = "Score = " + score;
         //reset asteroid @ random x 
    ast.y = 0;
    ast.x = Math.random()*movie.width;

  }
    },1);                                          
  }                      
};
},1);}

//keep score


//collision detection for asteroid
repeat(function(){
  if(player.glow.x<ast.x+50 && player.glow.x >ast.x-50 &&
player.glow.y<ast.y+50 &&
player.glow.y>ast.y-50){
    ast.y = 0;
    ast.x = Math.random()*movie.width;
  count += 1;
  }
    
},1);

//HUD
//lives
var livetext = text('Lives',0,400);
livetext.size = 40;
var life = rect(0,450,160,30,'white');
//lives logic
repeat(function(){
  var lives = text('',32,450,'white',25);
  if (count ==0){
    lives.message =  '🤖 🤖 🤖';
  }
  if (count ==1){
    lives.message=''
    lives.message = '🤖 🤖 ❌';
  }
  if (count ==2){
    lives.message=''
    lives.message = '🤖 ❌ ❌';
  }
  if (count ==3){
    lives.message=''
    lives.message ='❌ ❌ ❌ \n Game Over'
    player.body.message = '💥';
    player.glow.opacity = 0;
    player.glow.radius = 45;
    livetext.color = 'red';
    life.color = 'red';
    playable = false;
  }
},1);



  
