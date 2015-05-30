<?php

class UrlShortenerController extends BaseController
{
    public function index()
    {
		return View::make('urlshortener.index');
    }

    public function shorten()
    {
        $url = Input::get('url');
        $url = filter_var($url, FILTER_SANITIZE_URL);
        $link = new Link;
        $link->url = $url;
        $link->short_url = $this->createShortUrl($url);
        $link->visits = 0;
        $link->save();
        return View::make('urlshortener.short')->with('url', $url);
    }

    private function createShortUrl($url)
    {
        return $url;
    }
}
