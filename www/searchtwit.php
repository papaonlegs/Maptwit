<?php
    include('TwitterSearch.php');
    require_once("SentimentAdapter.php");

    $search = new TwitterSearch();
    $adapter = new SentimentAdapter();

    $search->with($_POST['hashtag']);
    if(isset($_POST['number']))$search->rpp($_POST['number']);
    
    $results = $search->results();
    
    //print sizeof($results);
    //print '<br>';
    
    foreach($results as $result){
        $lang = $result->iso_language_code;
        if(!($lang == 'en'||$lang == 'es'||$lang == 'fr'||$lang == 'pt'||$lang == 'nl'||$lang == 'de')) continue;
        print $adapter->classifyTweet($result->text, $lang);
        print '<br>';
    }
    
    //print var_dump($results);
    /**
    print '<br><br><br>';
    print $results[1]->text;
    print '<br><br><br>';
    print sizeof($results);
    */
?>