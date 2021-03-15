 <?php

 session_start();

 require_once "./util/bubbleProjectDbManager.php"; 
 require_once "./util/sessionUtil.php"; 

 if (!isLogged()){
 	header("Location:./login.php");
 	exit;
 }
 

if(isset($_POST['valore']) && isset($_SESSION['username'])) {

	$currentScore = $_POST['valore'];
	$username = $_SESSION['username'];
	$queryText = "UPDATE user SET bestScore='$currentScore' where username='$username' AND bestScore<'$currentScore' ";
	$result = $bubbleProjectDb->performQuery($queryText);
	$bubbleProjectDb->closeConnection();

}


?>