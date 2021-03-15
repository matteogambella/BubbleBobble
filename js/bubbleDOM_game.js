
function begin(){
    playground = document.getElementById('playground');
    
    home=document.getElementById('a_home');
    rank=document.getElementById('a_rank');
    game=document.getElementById('a_game');
    logout=document.getElementById('a_logout');

    score=document.getElementById('tabpunteggio');
    createScore();

    bob=document.getElementById('bob');
    bobTimer=setInterval(animateCharacter,500,"bob",false);

    bub=document.getElementById('bub');
    bubTimer=setInterval(animateCharacter,500,"bub",false);

    spring=document.getElementById('molla');

   
    PLAYGROUND_WIDTH = parseInt(playground.style.width);
    PLAYGROUND_HEIGHT =parseInt(playground.style.height);

    // inizializzo la pallina iniziale del giocatore
    createPlayer("random");
    createNextBubble();
    
    // inizializzo la griglia
    level.grid=new Array(level.rows);

    for(var i=0;i<level.rows;i++){
    level.grid[i]=new Array(level.columns);
    }
    

    for (var j=0; j<level.columns; j++) {
        for (var i=0; i<6; i++) {
                   createTile(i,j,"random");          
        }
    }  

    playground.onmousemove = onMouseMove;
    playground.onmouseup=readytoshoot;
    playground.onmousedown=squeezeSpring;

    setquitcontrol();
}


// setta i controlli per il popup di uscita dal gioco
function setquitcontrol(){
  
  home.addEventListener("mousedown",function(){
  createPopup('home');});
  rank.addEventListener("mousedown",function(){
  createPopup('rank');});
  game.addEventListener("mousedown",function(){
  createPopup('game');});
  logout.addEventListener("mousedown",function(){
  createPopup('logout');});
}

// crea il punteggio
function createScore(){
  textScore = document.createTextNode(0);
  score.appendChild(textScore); 
}



// parte 1 creazione griglia
function getExistingColor(){                // genera un colore casuale 
                                          
  switch(Math.floor(Math.random()*8)) // floor approssima per difetto
  {case 0:
     return "blue";
   case 1:
     return "green";
   case 2:
     return "black";
   case 3:
     return "orange";
   case 4:
     return "purple";
   case 5:
     return "red";
   case 6:
     return "grey";
   case 7:
     return "yellow";
  }
}



function createTile(row, column,colour) {  // crea un oggetto di tipo Tile 
  if (colour=="random")
    colour=getExistingColor();
    
    var tilex = column * level.tilewidth;

    if ((row+clock)%2)
      tilex+=level.tilewidth/2; 

    
    var tiley = row * level.rowheight;
    
    var bubble = new Tile(tilex,tiley,colour,5,90,false);
    level.grid[row][column]=bubble;
    bubble.drawTile(row,column);
    return bubble;
}


function createNextBubble(){
  nextbubble=new Tile(NEXT_BUBBLE_X,NEXT_BUBBLE_Y,getExistingColor(),5,90,false);
  drawNextBubble(); 
}


function createPlayer(colour){
  if (colour=="random"){
  bubble= new Tile(PLAYER_X,PLAYER_Y,getExistingColor(),5,90,false);
  drawPlayer();
  }
  else
    bubble= new Tile(PLAYER_X,PLAYER_Y,colour,5,90,false);
  drawPlayer();
}


// caricamento della pallina
function nextBubbleAndCharge(){

  clearInterval(bubTimer);
  bub.style.backgroundImage="url('./../img/bubcharge1.png')";  // bub prende la palla

  setTimeout(chargingBubble,300);                                                     // bub carica la palla                                                       
}

function chargingBubble(){
  bub.style.backgroundImage="url('./../img/bubcharge2.png')";
    setTimeout(chargedBubble,300);   
}

function chargedBubble(){
  createPlayer(nextbubble.tiletype);
  killNextBubble();
  createNextBubble();
  // bub torna normale e lo sincronizzo con bob
    bub.style.backgroundImage="url('./../img/bub1.png')";
    bubTimer=setInterval(animateCharacter,500,"bub",false);
    bubCount=1;

    clearInterval(bobTimer);
    bob.style.backgroundImage="url('./../img/bob1.png')";
    bobTimer=setInterval(animateCharacter,500,"bob",false);
    bobCount=1;

    playground.onmouseup=readytoshoot;
    playground.onmousedown=squeezeSpring;
}



function killPlayer(){
  var victim=document.getElementById(PLAYER_ID);
    playground.removeChild(victim);
    playerNode=null;
}

function killNextBubble(){
  var victim=document.getElementById(NEXT_BUBBLE_ID);
  playground.removeChild(victim);
  nextBubbleNode=null;
}


function killBubble(i,j,boom){

if(boom){
  var victim=document.getElementById(TILE_ID+i+" "+j);
  var countburst=0;
  var burst=setInterval(animateBurst,50);

  function animateBurst(){
  countburst=countburst+1;
  victim.style.backgroundImage = "url('./../img/" + level.grid[i][j].tiletype + "burst"+countburst+".png')";
  if(countburst==3){
    delete level.grid[i][j];
    playground.removeChild(victim);
    clearInterval(burst);
    return; 
  }
 }
}

else{

 var victim=document.getElementById(TILE_ID+i+" "+j);
 delete level.grid[i][j];
 playground.removeChild(victim);
 return;
 }
} 



function radToDeg(angle) {            // converte radianti in gradi
    return angle * (180 / Math.PI);
}



function degToRad(angle) {            // converte gradi in radianti
    return angle * (Math.PI / 180);
}



function getMousePos(e) {  // posizione del mouse all'interno del campo da gioco
        var rect = playground.getBoundingClientRect(); 
        return {
            x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*PLAYGROUND_WIDTH), 
            y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*PLAYGROUND_HEIGHT)
        };
}



function onMouseMove(e) {
    // Prende la posizione del mouse
    mouse = getMousePos(e);
 
    // Prende l'angolo del mouse
    var mouseangle = radToDeg(Math.atan2((PLAYER_Y+level.tilewidth/2) - mouse.y, mouse.x - (PLAYER_X+level.tileheight/2)));
 
    // Converte l'intervallo tra 0 e 360 gradi
    if (mouseangle < 0) {
        mouseangle = 180 + (180 + mouseangle);
    }
 
       // Restringe l'intervallo tra 8 e 172 gradi
    var lbound = 8;
    var ubound = 172;
    if (mouseangle > 90 && mouseangle < 270) {
        // Left
        if (mouseangle > ubound) {
            mouseangle = ubound;
        }
    } else {
        // Right
        if (mouseangle < lbound || mouseangle >= 270) {
            mouseangle = lbound;
        }
    }
 
    // Setta l'angolo del player
    PLAYER_ANGLE = mouseangle;
}




function checkGameOver() {
    
    for (var j=0; j<level.columns; j++) {
        
        if (typeof level.grid[level.rows-1][j]== "object") {
            gameOver();
            break;
        }
    }
}

function gameOver(){
  
            clearInterval(bobTimer);
            bobCount=1;
            bobTimer=setInterval(animateCharacter,500,"bob",true);   // bob piange


            clearInterval(bubTimer);
            bubCount=1;
            bubTimer=setInterval(animateCharacter,500,"bub",true);   // bub piange

            playground.onmouseup=null; // toglie l'evento on mouseup

            createPopup("gameover");  // lancia il popup di gameover
            
            updateScore(); // AjaxRequest

}



function addBubbles() {
    clock=clock+1;
    // trasla le palline
    for (var i=level.rows-1; i>0; i--) {
        for (var j=0; j<level.columns; j++) {
          if((typeof level.grid[i][j] != "object") && (typeof level.grid[i-1][j] != "object"))
            continue;
          if((typeof level.grid[i][j] == "object") && (typeof level.grid[i-1][j] == "object")){
            killBubble(i,j,false);
            createTile(i,j,level.grid[i-1][j].tiletype);
            continue;
          }
          if((typeof level.grid[i][j] == "object") && (typeof level.grid[i-1][j] != "object")){
            killBubble(i,j,false);
            continue;
          }
          if((typeof level.grid[i][j] != "object") && (typeof level.grid[i-1][j] == "object")){
            createTile(i,j,level.grid[i-1][j].tiletype);
          }
        }
    }  

   // Aggiunge una nuova riga di palline in cima
    for (var i=0; i<level.columns; i++) {
        
        if (typeof level.grid[0][i]=="object"){
          killBubble(0,i,false);
          createTile(0,i,"random");
        }
        else
          createTile(0,i,"random");
    }

      checkGameOver();
}



function getGridPosition(x, y) {
    var posx = Math.floor(y / level.rowheight);
 
    var xoffset = 0;

    if ((posx+clock) % 2) {
        xoffset = level.tilewidth / 2;
    }
    var posy = Math.floor((x - xoffset) / level.tilewidth);

    if(posy==15){     // posizioni irregolari
     posy=14;  
    }

    if(posy==-1){
     posy=0; 
    }
     
 
    return { x: posx, y: posy };
}



function resetProcessed() {   // checked
    for (var i=0; i<level.rows; i++) {
        for (var j=0; j<level.columns; j++) {
            if ( typeof level.grid[i][j]!="object") 
              continue;
            else 
              level.grid[i][j].processed = false;
        }
    }
}



// Prende i vicini della pallina
function getNeighbors(tile) { 
    var neighborsoffsets = [[[1, -1], [1,0], [0, 1], [-1, 0], [-1, -1], [0, -1]], // Se in riga pari
                        [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, -0], [0, -1]]];  // Se in riga dispari

    var position=getGridPosition(tile.tilex + level.tilewidth/2,tile.tiley+level.tileheight/2);

    var tilerow = (position.x + clock) % 2; // controlla se la riga della pallina è pari o dispari
    var neighbors = []; // vettore poi da ritornare
 
    var n = neighborsoffsets[tilerow]; // n varia se la riga è pari o dispari,è una matrice
 
    // prende i vicini
    for (var i=0; i<n.length; i++) {    //n.length è 6,perchè la griglia è esagonale
        // coordinate dei vicini
        var nx = position.x + n[i][0];
        var ny = position.y + n[i][1];
        // le coordinate son valide? 
        if (ny >= 0 && ny < level.columns && nx >= 0 && nx < level.rows && typeof level.grid[nx][ny]=="object") {
            neighbors.push(level.grid[nx][ny]);
        }
      }
    return neighbors; // ritorna i soli vicini non vuoti
}

     
function findCluster(tx, ty,matchtype,reset) {
    // mette a false il campo processed di tutte le palline della griglia
    if (reset) {
        resetProcessed();
    }
    
    // Prende una pallina dalla griglia
    level.grid[tx][ty].processed=true;
    var targettile = level.grid[tx][ty];
 
    // Inizializza l'array toprocess con la pallina data
    var toprocess = [targettile];
    var foundcluster = [];
 
    while (toprocess.length > 0) { // finchè il toprocess non è vuoto
        // estrai l'ultimo elemento dall'array
        var currenttile = toprocess.pop();

        // Controlla che matchtype sia true e che la pallina corrente sia dello stesso tipo
        if (!matchtype||(currenttile.tiletype == targettile.tiletype)) {
            
            foundcluster.push(currenttile);
 
            // Prende i vicini della currenttile
            var neighbors = getNeighbors(currenttile);
 
            // Controlla il tipo di ogni vicino
            for (var i=0; i<neighbors.length; i++) {
                if (!neighbors[i].processed) {
                    
                    toprocess.push(neighbors[i]);
                    neighbors[i].processed = true;
                }
            }
        }
    }
 
    
    return foundcluster;
}



function findFloatingClusters() {  
    resetProcessed();
 
    var foundclusters = [];
 
    for (var j=0; j<level.columns; j++) {
        for (var i=1; i<level.rows; i++) {
            if(typeof level.grid[i][j]!="object"){ //se la pallina non è vuota
              continue;
            }
            var tile = level.grid[i][j];
            if (!tile.processed){ // se la pallina non è stata processata
                
                var foundcluster = findCluster(i, j, false, false);
              
                var floating = true;
                for (var k=0; k<foundcluster.length; k++) {
                    if (foundcluster[k].tiley == 0) { // palline attaccate al soffitto
                        
                        floating = false;
                        break;    // esco dal for (k)
                    }
                }

                if (floating) {
                    for(var i=0;i<foundcluster.length;i++)
                    foundclusters.push(foundcluster[i]);
                }

            }
        }
    }
    return foundclusters; 
}



function snapBubble(){    // checked

        var centerx = bubble.tilex + level.tilewidth/2;
        var centery = bubble.tiley + level.tileheight/2;
        var coord=getGridPosition(centerx,centery);
        createTile(coord.x,coord.y,bubble.tiletype);
        if (coord.x==level.rows-1) {    // controllo GameOver
          killPlayer();
          clearInterval(id);
          gameOver();
          return;
        }
        var cluster=findCluster(coord.x,coord.y,true,true); //trova il cluster   
        if(cluster.length>=3){
         textScore.nodeValue=parseInt(textScore.nodeValue)+80; // aggiorna punteggio
         for(var i=0;i<cluster.length;i++){
          var coord=getGridPosition(cluster[i].tilex+level.tilewidth/2,cluster[i].tiley+level.tileheight/2);
          killBubble(coord.x,coord.y,true);
          }
        setTimeout(function(){
        var floatingcluster=findFloatingClusters();
        if(floatingcluster.length>=1){
        for(var i=0;i<floatingcluster.length;i++){
          textScore.nodeValue=parseInt(textScore.nodeValue)+50; // aggiorna punteggio
          var coord=getGridPosition(floatingcluster[i].tilex+level.tilewidth/2,floatingcluster[i].tiley+level.tileheight/2);
          killBubble(coord.x,coord.y,true);
            }
           }    
          },200);
         }
        killPlayer();
        nextBubbleAndCharge();
        clearInterval(id);
        numshoot=numshoot+1;
        if(!(numshoot%TIME_INTERVAL)) setTimeout(addBubbles,650); 
        return;
} 




function circleIntersection(x1, y1, r1, x2, y2, r2) {
    
    var dx = x1 - x2;
    var dy = y1 - y2;
    var len = Math.sqrt(dx * dx + dy * dy);
 
    if (len < (r1 + r2)) {
        
        return true;
    }
 
    return false;
}



function getTileCoordinate(row, column) {
    var tilex = column * level.tilewidth;
 
    
    if ((row + clock ) % 2) {
        tilex += level.tilewidth/2;
    }
 
    var tiley = row * level.rowheight;
    return { tilex: tilex, tiley: tiley };
} 


function squeezeSpring(){
    spring.style.backgroundImage="url('./../img/molla2.png')";
    spring.style.left=180+'px';
  
}

function readytoshoot(){
    spring.style.backgroundImage="url('./../img/molla1.png')";
    spring.style.left=181+'px';
    bubble.angle=PLAYER_ANGLE;
    id=setInterval(shoot,5);
    playground.onmouseup=null;
    playground.onmousedown=null;
}

function shoot(){

    
    bubble.tilex += bubble.speed * Math.cos(degToRad(bubble.angle));
    bubble.tiley += bubble.speed * -1*Math.sin(degToRad(bubble.angle));

    if (bubble.tilex <= level.x ) {
        // Left 
        bubble.angle = 180 - bubble.angle;
        bubble.tilex = level.x ;
    } else if (bubble.tilex + level.tilewidth >= level.x+level.width) {
        // Right 
        bubble.angle = 180 - bubble.angle;
        bubble.tilex = level.x + level.width - level.tilewidth;
    }
    
 if (bubble.tiley <= level.y) {
        // Collisione con la parete
        bubble.tiley = level.y;
        snapBubble();
        return;
    }
    
    for (var j=0; j<level.columns; j++) {
        for (var i=0; i<level.rows; i++) {
            var tile = level.grid[i][j];
            // Salta palline vuote
            if (typeof tile!="object") {
                continue;
            }

            var coord=getTileCoordinate(i,j);       
          
            if (circleIntersection(bubble.tilex + level.tilewidth/2,
                                   bubble.tiley + level.tileheight/2,
                                   level.radius,
                                   coord.tilex + level.tilewidth/2,
                                   coord.tiley + level.tileheight/2,
                                   level.radius)) {

                // collide con un'altra pallina 
                snapBubble();
                return;
          }
        }
    }
    drawPlayer();
    return;
}


function createScoreLabel(){
  var scorePopup = document.createElement('div'); 
  var textScorePopup = document.createTextNode('Game Over');
  scorePopup.appendChild(textScorePopup);  
  return scorePopup;
}

function createCloseButtonPopup(){   
  var closeButtonPopup = document.createElement("a");
  closeButtonPopup.setAttribute('class',CLOSE_BUTTON_ID);
  closeButtonPopup.setAttribute('onClick', 'closePopup()');
  return closeButtonPopup;
}

function createQuitButtonPopup(action){
  var quitButtonPopup= document.createElement("a");
  quitButtonPopup.setAttribute('class',QUIT_BUTTON_ID);  
  quitButtonPopup.setAttribute('href', './../php/'+action+'.php');
  quitButtonPopup.appendChild(createQuitButtonText());
  return quitButtonPopup;
}

function createQuitText(){
   var quitPopup = document.createElement('div'); 
  
  var textQuitPopup = document.createTextNode('Sure to quit the game?');
  quitPopup.appendChild(textQuitPopup);  
  return quitPopup;
}

function createQuitButtonText(){
  var textQuitButtonPopup= document.createTextNode('Quit');
  return textQuitButtonPopup;
}

function createPopup(action){

  var popup = document.getElementById(POPUP_ID);
  if (popup !== null)
    return;

  var popup = document.createElement('div');    
  popup.setAttribute('id', POPUP_ID);
  
  var content = document.createElement('div');    
  content.setAttribute('id',POPUP_CONTENT_ID);
  
  content.appendChild(createCloseButtonPopup());
  if (action=='gameover'){
    content.appendChild(createScoreLabel());
  }
  else {
    content.appendChild(createQuitText());  
    content.appendChild(createQuitButtonPopup(action));
  }
  
  popup.appendChild(content);
  
  document.body.appendChild(popup);
  }

function closePopup(){
  var popup = document.getElementById(POPUP_ID);
  if (popup === null)
    return;
  
  document.body.removeChild(popup);
}

function animateCharacter(character,crying){ 

if (character=="bob"){
  if (!crying){

    if(bobCount==2) 
      {bobCount=bobCount-1;
       bob.style.backgroundImage="url('./../img/bob"+bobCount+".png')";
      }
    else{
      bobCount=bobCount+1;
      bob.style.backgroundImage="url('./../img/bob"+bobCount+".png')";
    }
  }
  else{
   if(bobCount==2) 
      {bobCount=bobCount-1;
       bob.style.backgroundImage="url('./../img/bobcrying"+bobCount+".png')";
      }
    else{
      bobCount=bobCount+1;
      bob.style.backgroundImage="url('./../img/bobcrying"+bobCount+".png')";
    }
  }
}

if(character=="bub"){

  if (!crying){

    if(bubCount==2) 
      {bubCount=bubCount-1;
       bub.style.backgroundImage="url('./../img/bub"+bubCount+".png')";
      }
    else{
      bubCount=bubCount+1;
      bub.style.backgroundImage="url('./../img/bub"+bubCount+".png')";
    }
  }
  else{
   if(bubCount==2) 
      {bubCount=bubCount-1;
       bub.style.backgroundImage="url('./../img/bubcrying"+bubCount+".png')"; 
      }
    else{
      bubCount=bubCount+1;
      bub.style.backgroundImage="url('./../img/bubcrying"+bubCount+".png')";
    }
  }

}

}

function updateScore(e){
  var currentScore=textScore.nodeValue;
  var hr= new XMLHttpRequest();
  var url="./../php/updateScore.php";
  var vars="valore="+currentScore;
  hr.open("POST",url,true);
  hr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  hr.onreadystatechange = function(){
     if(this.readyState == 4 && this.status == 200){
          //alert(hr.responseText);
     }
  }
  hr.send(vars);
}
