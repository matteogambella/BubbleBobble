function drawTile(row,column)  {
    var tileNodeId = '' + TILE_ID + row + " " + column ;
	var tileNode = document.getElementById(tileNodeId);
	if (tileNode === null){
		tileNode = document.createElement('div');
		tileNode.id = tileNodeId;
		tileNode.setAttribute('class', 'tile');
		tileNode.style.backgroundImage = "url('./../img/" + this.tiletype + ".png')";
		playground.appendChild(tileNode);
	}
	
	tileNode.style.left = level.grid[row][column].tilex + 'px';
	tileNode.style.top = level.grid[row][column].tiley + 'px';
}


function drawPlayer(){
	if (playerNode === null){
		playerNode = document.createElement('div');
		playerNode.setAttribute('id', PLAYER_ID);
		playerNode.setAttribute('class', 'tile');
		playerNode.style.backgroundImage = "url('./../img/" + bubble.tiletype + ".png')";
		playground.appendChild(playerNode);
	}
	playerNode.style.left = bubble.tilex+ 'px';
	playerNode.style.top = bubble.tiley + 'px';
	
} 

function drawNextBubble(){
	if (nextBubbleNode === null){
		nextBubbleNode = document.createElement('div');
		nextBubbleNode.setAttribute('id', NEXT_BUBBLE_ID);
		nextBubbleNode.setAttribute('class', 'tile');
		nextBubbleNode.style.backgroundImage = "url('./../img/" + nextbubble.tiletype + ".png')";
		playground.appendChild(nextBubbleNode);
	}
	nextBubbleNode.style.left = nextbubble.tilex+ 'px';
	nextBubbleNode.style.top = nextbubble.tiley + 'px';
 }

