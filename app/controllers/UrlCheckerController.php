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
		$url = Input::get("url");
		if (empty($url)) return "false";



		if (strpos($url, 'http') === false) {
			$url = 'http://' . $url;
		}
		//dd($url);

		try {
			$url_headers = get_headers($url);
		} catch (Exception $e) {
			return "false";
		}

		if (
			strpos($url_headers[0], "20") ||
			strpos($url_headers[0], "30")
			) {
			return "true";
		} else {
			return "false";
		}
	}
}