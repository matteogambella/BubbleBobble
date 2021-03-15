 <?php
    require_once "./util/bubbleProjectDbManager.php"; 
    require_once "./util/sessionUtil.php"; 
    
    $username=$_POST['username'];
    $password=$_POST['password'];
    $bestScore;


	$errorMessage = login($username, $password);

	if($errorMessage === null)
		header('location: ./home.php'); 
	else
		header('location: ./../index.php?errorMessage=' . $errorMessage ); 


	function login($username, $password){   
		if ($username != null && $password != null){
			$userRow = authenticate($username, $password);
    		if (isset($userRow)){
    			session_start();
    			setSession($username, $userRow['userId'], $userRow['bestScore'],$userRow['email'],$userRow['dataRegistrazione']);
    			return null;
    		}

    	} else
    		return 'You should insert something';
    	
    	return 'Username and password not valid.';
	}
	
	function authenticate ($username, $password){   
		global $bubbleProjectDb;
		global $bestScore;

		$username = $bubbleProjectDb->sqlInjectionFilter($username);
		$password = $bubbleProjectDb->sqlInjectionFilter($password);

		$queryText = "select * from user where username='" . $username . "' AND password='" . $password . "'";

		$result = $bubbleProjectDb->performQuery($queryText);
		$numRow = mysqli_num_rows($result);
		if ($numRow != 1)
			return null;
		
		$bubbleProjectDb->closeConnection();
		$userRow = $result->fetch_assoc();
		$bubbleProjectDb->closeConnection();

		return $userRow;

	} 
?>