<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

/**
 * Home
 */
Route::get('/', function()
{
	return View::make('home');
});

/**
 * URL Checker get/post
 * XMLrequest to /urlcheck to check status of a website.
 */

Route::get('/templatetest', function() {
	return View::make('test');
});

/*
 * Test urls
 */

Route::get('/urlchecker', 'UrlCheckerController@index');
Route::post('/urlchecker', 'UrlCheckerController@checkUrl');

Route::get('/urltest', 'UrlCheckerController@checkUrl');
Route::any('/test', function() {

    // USE THIS to return more than true/false back to urlchecker
    $url = 'http://www.google.com';
    $url_headers = get_headers($url);
    return Response::json(['hello', 'world']);
});

Route::get('/jstest', function() {
    return filter_var('http://www.googlem', FILTER_VALIDATE_URL) ? "yup" : "not a url";
});