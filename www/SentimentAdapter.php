<?php
require_once("SentimentAnalysisFree.php");

class SentimentAdapter{

    private $publicKey = 'PUBr_R#REIO4wosZ8kSWrP3dsQwHaxlT';
	private $privateKey = 'PRI8nbm1kYfGK15qAPdHe37Lq0q507Qc';
	private $obj;
	
	function __construct()
	{
		$this->obj = new SentimentAnalysisFree($this->publicKey, $this->privateKey);
	}
	
	public function classifyTweet($text, $lang, $lat, $lon)
	{
		$classifiedTweet = $this->obj->classifytext($lang, $text);
		
		if(abs((float)$classifiedTweet->value) < 0.25){
			$sentiment = 'neutral';
		}else{
			if ((integer)$classifiedTweet->sent >0){
				$sentiment = 'positive';
			}else{
				$sentiment = 'negative';
			}
		}
		
		$arr = array('text'=>$text, 'sentiment'=>$sentiment, $lat, $lon);
		$response = json_encode($arr);
		
		return $response;
	}
	
}	
?>