<?php  

    require "dbConfig.php";
    $bubbleProjectDb = new BubbleProjectDbManager(); 

	class BubbleProjectDbManager{
		private $mysqli_conn = null;
	
		function BubbleProjectDbManager(){
			$this->openConnection();
		}
    
    	function openConnection(){
    		if (!$this->isOpened()){
    			global $dbHostname;
    			global $dbUsername;
    			global $dbPassword;
    			global $dbName;
    			
    			$this->mysqli_conn = new mysqli($dbHostname, $dbUsername, $dbPassword);
				if ($this->mysqli_conn->connect_error) 
					die('Connect Error (' . $this->mysqli_conn->connect_error . ') ' . $this->mysqli_conn->connect_error);

				$this->mysqli_conn->select_db($dbName) or
					die ('Can\'t use pweb: ' . mysqli_error());
			}
    	}
    
    	function isOpened(){
       		return ($this->mysqli_conn != null);
    	}

		function performQuery($queryText) {
			if (!$this->isOpened())
				$this->openConnection();
			
			return $this->mysqli_conn->query($queryText);
		}
		
		function sqlInjectionFilter($parameter){
			if(!$this->isOpened())
				$this->openConnection();
				
			return $this->mysqli_conn->real_escape_string($parameter);
		}

		function closeConnection(){
 	       	if($this->mysqli_conn !== null)
				$this->mysqli_conn->close();
			
			$this->mysqli_conn = null;
		}
	}

	function getRankScore(){
		global $bubbleProjectDb;

        $queryText='SELECT username,bestScore from user order by bestScore desc,username;'; // rank per punteggio, pari punteggio si guarda l'ordine alfabetico
					
		$result = $bubbleProjectDb->performQuery($queryText);
		$bubbleProjectDb->closeConnection();
		return $result; 
	}

	function showRankTable($result){  
		$rank=0;
		$prec_score=-1;

		while ( $userRow=$result->fetch_assoc()){

			if($userRow['bestScore'] <> $prec_score){
				$rank=$rank+1;
				$prec_score=$userRow['bestScore'];
			}

			echo "<tr>";
			echo "<td>".$rank."</td>";    // rank
			echo "<td>".$userRow['username']."</td>";
			echo "<td>".$userRow['bestScore']."</td>";
			echo "</tr>";
		}
	}

	function getUserScore(){
		global $bubbleProjectDb;
		$username=$_SESSION['username'];

        $queryText="SELECT bestScore from user where username='"  .$username. "';";
					
		$result = $bubbleProjectDb->performQuery($queryText);
		$userRow = $result->fetch_assoc();
		$bubbleProjectDb->closeConnection();
		return $userRow['bestScore']; 
	}

?>