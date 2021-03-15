<?php
  session_start();
    include "./php/util/sessionUtil.php";
?>



<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name = "author" content = "Matteo Gambella">
    <meta name = "keywords" content = "game">
    <title> Bubble Bobble </title>
    <link rel="stylesheet" href="./css/register.css" type="text/css" media="screen" > 
</head>
<body >

    <section id="sign_in_content">
     <div id="register_form">
      <form name="register" action="./php/register.php" method="post">
        <div>
          <label>Username</label>
          <input type="text" placeholder="Username" name="username" required autofocus>
        </div>
        <div>
          <label>Password1</label>
          <input type="password" placeholder="Password" name="password1" required>
        </div>  
         <div>
          <label>Password2</label>
          <input type="password" placeholder="Password" name="password2" required>
        </div>  
         <div>
          <label>Email</label>
          <input type="email" placeholder="Email" name="email" required>
        </div>  
        <input type="submit" value="Enter">
        <?php
          if (isset($_GET['errorMessage'])){
            echo '<div class="sign_in_error">';
            echo '<span>' . $_GET['errorMessage'] . '</span>';
            echo '</div>';
          }
        ?>
      </form>
     </div>
     <div id="sign_in_footer">
      <a href="./index.php" target="_self">Login</a> 
     </div>
 
    </section>

   
</body>
</html>