<?php

class UrlCheckerController extends BaseController {

	public function index()
	{
		return View::make('urlchecker');
	}

	/**
	 * [checkUrl description]
	 * @return [type] [description]
	 */
	public function checkUrl()
	{
		// Returns 
		// array
		// error: explanation
		// url: checked url
		// status: status
		// works: true or false

		$jsonResponse = [];

		
		$url = Input::get("url");


		if (empty($url)) {
			$jsonResponse["error"] = "Url is missing.";
			return Response::json($jsonResponse);
		}

		// add http if not present.
		if (strpos($url, 'http') === false) {
			$url = 'http://' . $url;
		}

		// Validate URL
		if (!filter_var($url, FILTER_VALIDATE_URL)) {
			$jsonResponse["error"] = "Invalid Url.";
			return Response::json($jsonResponse);
		}

        // Check URL
		try {
			$url_headers = get_headers($url);
		} catch (Exception $e) {
			$jsonResponse["error"] = "Header error.";
			return Response::json($jsonResponse);
		}

		if (
			strpos($url_headers[0], "20") ||
			strpos($url_headers[0], "30")
			) {
			$jsonResponse["works"] = true;
			$jsonResponse["statusCode"] = $url_headers[0];
			return Response::json($jsonResponse);
		} else {
			$jsonResponse["error"] = "4XX or 5XX error";
			$jsonResponse["statusCode"] = $url_headers[0];
			return Response::json($jsonResponse);
		}
	}
}