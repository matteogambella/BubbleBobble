
<?php
  session_start();
    include "./php/util/sessionUtil.php";

    if (isLogged()){
        header('Location: ./php/home.php'); 
        exit;
    } 
?>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name = "author" content = "Matteo Gambella">
    <meta name = "keywords" content = "game">
    <title> Bubble Bobble </title>
    <link rel="stylesheet" href="./css/login.css" type="text/css" media="screen" > 
</head>
<body >

  <section id="login_content">
     <img id="logo" src="./img/bubble_logo.gif"> 
     <div id="login_form">
      <form name="login" action="./php/login.php" method="post">
       <div>
          <label>Username</label>
          <input type="text" placeholder="Username" name="username" required autofocus>
       </div>
       <div>
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" required>
       </div>  
       <input type="submit" value="Enter">
        <?php
          if (isset($_GET['errorMessage'])){
            echo '<div class="login_error">';
            echo '<span>' . $_GET['errorMessage'] . '</span>';
            echo '</div>';
          }
          if (isset($_GET['registrationMessage'])){
            echo '<div class="successful_registration">';
            echo '<span>' . $_GET['registrationMessage'] . '</span>';
            echo '</div>';
          }
        ?>
      </form>
     </div>

    <div id="login_footer">
     <a href="./index_register.php" target="_self">Sign in</a>
     <a href="./html/manuale.html" target="_self">User manual</a>
    </div>

  </section>

   
</body>
</html>