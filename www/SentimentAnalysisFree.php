<?php
require_once("mashape/MashapeClient.php");

class SentimentAnalysisFree
{
    private $publicKey;
	private $privateKey;
	function __construct($publicKey, $privateKey)
	{
		$this->publicKey = $publicKey;
		$this->privateKey = $privateKey;
	}

	public function classifytext($lang, $text, $exclude = null)
	{
		$parameters = array("lang" => $lang,
		                    "text" => $text,
		                    "exclude" => $exclude);
		$response = HttpClient::doRequest(HttpMethod::POST, "http://free-dev.cbanalytics.co.uk/sentiment/current/classify_text/", $parameters, true, $this->publicKey, $this->privateKey, true);
		return $response;
	}
}
?>