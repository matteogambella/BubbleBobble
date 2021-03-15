<?php
	session_start();
    include "./util/sessionUtil.php";

    if (!isLogged()){
		    header('Location: ./../index.php');
		    exit;
    }	
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8"> 
    	<meta name = "author" content = "Matteo Gambella">
    	<meta name = "keywords" content = "game">
    	<link rel="stylesheet" href="./../css/menu.css" type="text/css" media="screen">
		<link rel="stylesheet" href="./../css/rank.css" type="text/css" media="screen">
		<title> Bubble Bobble - Rank </title>
	</head>
	<body>
	   <?php
			include "./layout/menu.php";
			require "./util/bubbleProjectDbManager.php";
	   ?>
       <table class="table-ext">
        <thead>
          <tr>
              <th>Rank</th>
              <th>Username</th > 
              <th>Best Score</th>
	      </tr>		
        </thead>

        <tbody>
	      <tr>	
	          <td colspan="3">
		        <div class="divinterno">		
			      <table class="table-int">
			       <?php
                    $result = getRankScore();
			        showRankTable($result);
			        $result->close();
			       ?>
		         </table>
		        </div>  
              </td>
         </tr>
        </tbody>
       </table>	
			
		?>
	</body>
</html>
	   