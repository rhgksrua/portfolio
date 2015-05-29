<?php

class UrlShortenerController extends BaseController
{
    public function index()
    {
		return View::make('urlshortener.index');
    }
}
