<?php
    session_start();
    include "./util/sessionUtil.php";

    if (!isLogged()){
            header('Location: ./../index.php');
            exit;
    }   
?>

<html>
<head>
    <meta charset="utf-8">
    <meta name = "author" content = "Matteo Gambella">
    <meta name = "keywords" content = "game">
    <title> Griglia esagonale </title>
    <link rel="stylesheet" href="./../css/bubblegameproject.css" type="text/css" media="screen" > 
    <link rel="stylesheet" href="./../css/menu.css" type="text/css" media="screen" > 
    <script type="text/javascript" src="./../js/bubbleDOM_object.js" > </script>
    <script type="text/javascript" src="./../js/bubble_sketcher.js" > </script>
    <script type="text/javascript" src="./../js/bubbleDOM_game.js" > </script>
</head>

<body onload=begin() >
    <?php
    include "./layout/menu.php"; 
    ?>
    <div  id="bigplayground" style="width:800px; height:600px;" > 
     <div id ="playground" style="width:378px; height:545px;"> 
      <img id="shooter"  src="./../img/shooter.png" >
      <div id="molla" class="nosqueezed" style="width:16px; height:13px";> </div>
      <img id="sacchetto" src="./../img/sacchetto.png" width="64"  height="34" >
      <div id="bob" style="width:30px; height:30px;"  > </div>
      <div id="bub" style="width:30px; height:30px;" > </div>
      <div id="endline" > </div>
      <div id="end"> END </div>
      <div id="next"> NEXT </div>
      <div id="tabpunteggio"> Score : <br> </br> </div>
     </div>
     <div id="floor" style="width:800px; height:31px;" > </div>
     <img id="bordosinistro" src="./../img/bordolaterale.png"  >
     <img id="bordosinistro1" src="./../img/bordolaterale.png"  >
     <img id="bordosinistro2" src="./../img/bordolaterale.png"  >
     <img id="bordodestro" src="./../img/bordolaterale.png"  >
     <img id="bordodestro1" src="./../img/bordolaterale.png"  >
     <img id="bordodestro2" src="./../img/bordolaterale.png"  >
     <img id="bordosup" src="./../img/bordosup.png"  >
     <img id="bordosup1" src="./../img/bordosup.png"  >
     <img id="bordosup2" src="./../img/bordosup.png"  >
     <img id="bordosup3" src="./../img/bordosup.png"  >
    </div>
</body>
</html>
