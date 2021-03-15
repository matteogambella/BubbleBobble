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
    	<link rel="stylesheet" href="./../css/home.css" type="text/css" media="screen">
    	<title>Bubble Bobble - Home</title>
    </head>
    <body>
         <?php
          include "./layout/menu.php"; 
          ?>
        <div id="content">

        <img id="logo" src='./../img/bubble_logo.gif'>
      


        <table class='table_dark'>
          <caption> 
            Info User  
          </caption>
         <?php
           include "./util/bubbleProjectDbManager.php";
           $_SESSION['bestScore']=getUserScore();
          
           echo "<tr>";
             echo "<td>";
               echo "Username";
             echo "</td>";
             echo "<td>";
               echo $_SESSION['username'];
             echo "</td>";
           echo "</tr>";


           echo "<tr>";
             echo "<td>";
               echo "Best score";
             echo "</td>";
             echo "<td>";
               echo $_SESSION['bestScore'];
             echo "</td>";
           echo "</tr>";

        
        echo "<tr>";
          echo "<td>";
            echo "UserId";
          echo "</td>";
          echo "<td>";
          echo $_SESSION['userId'];
          echo "</td>";
        echo "</tr>";


       echo "<tr>";
          echo "<td>";
            echo "Email";
          echo "</td>";
          echo "<td>";
          echo $_SESSION['email'];

          echo "</td>";
       echo "</tr>";  

       echo "<tr>";
          echo "<td>";
            echo "Registration date";
          echo "</td>";
          echo "<td>";
          echo $_SESSION['dataRegistrazione'];
          echo "</td>";
        echo "</tr>"; 

       ?>

        </table>
        <img id="bubbob"  src="./../img/bubbob.gif">
        </div>
    </body>
</html>