<div id="menu">
	<div id="menu_home" class="menu_single_section">
		<a id="a_home" href="./../php/home.php">
			<div class="user_img"></div>	
		</a>
		<?php
		    
		    echo "User:";
			echo $_SESSION['username'];

		?>
	</div> 

	<div id="game_menu" class="menu_single_section">
	  <a id="a_game" href="./game.php">
	  	<div class="game_img"> </div>
	  </a>
	  <span>Play a match</span>
	</div>

	<div id="rank_menu" class="menu_single_section">
	   <a id="a_rank" href="./rank.php">
	   	   <div class="rank_img"> </div>
	   </a>
	   <span>Ranking</span>
	</div>

	<div id="sign_out_menu" >

				<a id="a_logout" href="./logout.php">
					<div class="menu_item_img sign_out_img"></div>	
				</a>
				<span>Sign out</span>
	</div>
</div>