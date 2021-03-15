//oggetti e variabili

var level = {
        width: 378,         
        x:0,
        y: 0,         
        columns: 15,     
        rows: 23,      
        tilewidth: 24.38,  
        tileheight: 24.38, 
        rowheight:21,
        radius:12.19,
        grid: [],  
    };


function Tile(tilex,tiley,tiletype,speed,angle,processed){     // oggettoTile
  this.tilex=tilex;
  this.tiley=tiley;
  this.tiletype=tiletype;
  this.speed=speed;
  this.angle=angle;
  this.processed=processed;
  this.drawTile=drawTile;
}

var bubble;

var clock=0;
var numshoot=0;

var PLAYER_ID = 'player';   // player
var playerNode = null;
var PLAYER_X=177;
var PLAYER_Y=500;  
var PLAYER_ANGLE=0;

var NEXT_BUBBLE_ID= 'nextBubble';
var nextBubbleNode= null;
var nextBubble;
var NEXT_BUBBLE_X=115;
var NEXT_BUBBLE_Y=520;

var PLAYGROUND_WIDTH;       // playground
var PLAYGROUND_HEIGHT;
var playground = null;
var bigplayground=null;

var TILE_ID='tile' ; // tile
     

var score= null;
var textScore=null;

POPUP_ID = 'popup';
POPUP_CONTENT_ID= 'popupContent' ;
CLOSE_BUTTON_ID= 'closeButton';
QUIT_BUTTON_ID= 'quitButton';



var bob=null;
var bobTimer=null;
var bobCount=1;

var bub=null;
var bubTimer=null;
var bubCount=1;

var spring=null;

var home = null;
var rank = null;
var game= null;
var logout= null;

var TIME_INTERVAL=7;
