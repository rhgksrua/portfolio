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

        $short = $this->uniqueId(5);

        $link->short_url = $short;
        $link->visits = 0;
        $link->save();
        return View::make('urlshortener.short')->with('url', $short);
    }

    private function uniqueId($length)
    {
        $id = $this->randomId($length);

        $exists = Link::where('short_url', '=', $id)->first();
        if (!$exists) {
            return $id;
        } else {
            return $this->uniqueId($length);
        }

    }

    /**
     * Returns random id
     * @param  [int]
     * @return [string]
     */
    private function randomId($length)
    {
        $alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $id = '';
        for ($i = 0; $i < $length; $i++) {
            $index = rand(0, strlen($alpha) - 1);
            $id .= $alpha[$index];
        }
        return $id;
    }
}
