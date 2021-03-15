 <?php
    require_once "./util/bubbleProjectDbManager.php"; 
    require_once "./util/sessionUtil.php"; 
    
    $username=$_POST['username'];

    $password1=$_POST['password1'];

    $password2=$_POST['password2'];

    $email=$_POST['email'];

    $registrationMessage;



    $errorMessage = register($username,$password1,$password2,$email);
	if($errorMessage === null)
		header('location: ./../index.php?registrationMessage=You are registered,now you are ready to play!');
	else
		header('location: ./../index_register.php?errorMessage=' . $errorMessage ); 

	function register ($username,$password1,$password2,$email){
		if($username!=null && $password1 !=null && $password2 !=null  && email != null){
			if ($password1 != $password2){
				return 'The value of the passwords must match';
			}
		    else {
		    	  $userId = userExist($username);
    		      if ($userId > 0) return 'A player with the following username already exists';

    		      $userId= emailExist($email);
    		      if($userId > 0 ) return 'A player with the following email already exists';
    		
		    	  $mex=addNewPlayer($username,$password1,$email);
		    	  return $mex;
		    	  }
		}
		else return 'You should insert something';
	}

	function userExist($username){   
		global $bubbleProjectDb;

		$username = $bubbleProjectDb->sqlInjectionFilter($username);

		$queryText = "select * from user where username='" . $username ."'";

		$result = $bubbleProjectDb->performQuery($queryText);
		$numRow = mysqli_num_rows($result);
		if ($numRow != 1)
			return -1;
		
		$bubbleProjectDb->closeConnection();
		$userRow = $result->fetch_assoc();
		$bubbleProjectDb->closeConnection();
		return $userRow['userId'];
	} 

	function emailExist($email){   
		global $bubbleProjectDb;

		$email = $bubbleProjectDb->sqlInjectionFilter($email);

		$queryText = "select * from user where email='" . $email ."'";

		$result = $bubbleProjectDb->performQuery($queryText);
		$numRow = mysqli_num_rows($result);
		if ($numRow != 1)
			return -1;
		
		$bubbleProjectDb->closeConnection();
		$userRow = $result->fetch_assoc();
		$bubbleProjectDb->closeConnection();
		return $userRow['userId'];
	} 


    
    function addNewPlayer($username,$password,$email){
    	global $bubbleProjectDb;

		$username = $bubbleProjectDb->sqlInjectionFilter($username);
		$password = $bubbleProjectDb->sqlInjectionFilter($password);
		$email=$bubbleProjectDb->sqlInjectionFilter($email);

		$queryText = "insert into user (username,email,password,dataRegistrazione,bestScore)
		 values ('" . $username . "','". $email . "','".$password."',current_date,0)";

		$result = $bubbleProjectDb->performQuery($queryText);
		$bubbleProjectDb->closeConnection();
		return null;
    }
?>