<?php
	
	
	function setSession($username, $userId, $bestScore,$email,$dataRegistrazione){
		$_SESSION['userId'] = $userId;
		$_SESSION['username'] = $username;
		$_SESSION['bestScore'] = $bestScore;
		$_SESSION['email']=$email;
		$_SESSION['dataRegistrazione']=$dataRegistrazione;
	}

	
	function isLogged(){		
		if(isset($_SESSION['userId']))
			return $_SESSION['userId'];
		else
			return false;
	}

?>