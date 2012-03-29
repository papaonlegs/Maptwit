<?php
    require_once("SentimentAdapter.php");

    $adapter = new SentimentAdapter();
    if(isset($_GET['i'])){
        $qry_str = "?i=".$_GET['i']."&j=".$_GET['j'];
    }else{
        $qry_str = "?i=".$_POST['i']."&j=".$_POST['j'];
    }
    //echo $qry_str."<br>";
    //$i = $_GET['i'];
    //$j = $_GET['j'];
    //$qry_str = "?i="+$i+"&j="+$j+"";
    //echo $qry_str;
    $ch = curl_init();

    // Set query data here with the URL
    curl_setopt($ch, CURLOPT_URL, 'http://webprojects.eecs.qmul.ac.uk/ec09240/twitter/acceleration.php' . $qry_str); 

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, '3');
    $content = trim(curl_exec($ch));
    curl_close($ch);
    //print $content;
    //print '<br><br><br>';
    echo $content;
    $results = explode("<br>",$content);
    //print sizeof($results);
    //print '<br><br><br>';
    
    //print var_dump($results);
    /**
    print '<br><br><br>';
    print $results[1]->text;
    print '<br><br><br>';
    print sizeof($results);
    */
?>