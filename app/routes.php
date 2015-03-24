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

/**************************************************************************
 *
 * PROJECT URLS
 * 
 *
 * ***********************************************************************/


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
Route::get('/urlchecker', 'UrlCheckerController@index');
Route::post('/urlchecker', 'UrlCheckerController@checkUrl');

/**
 *
 * Tutorial summary
 * Links to tutorials with short summary.
 * 
 */
Route::when('tutorials/*', 'auth');

Route::get('/tutorials', 'TutorialsController@index');

// Show add tutorial page
Route::get('/tutorials/add', 'TutorialsController@showAddTutorial');
// Add tutorial
Route::post('/tutorials/add', 'TutorialsController@addTutorial');


// Show login screen
Route::get('/login', 'TutorialsController@showLogin');

// Do login
Route::post('/tutorials', 'TutorialsController@doLogin');

// Remove tutorial based on id
Route::get('/tutorials/remove/{id}', 'TutorialsController@removeTutorial');


Route::get('/logout', 'TutorialsController@doLogout');


/*************************************************************************
 *
 * 404
 *
 * **********************************************************************/

App::missing(function($exception)
{
    return Response::view('errors.missing', array(), 404);
});

/*************************************************************************
 *
 * TEST URLS
 *
 ************************************************************************/

Route::get('/elotest', function() {

    $tut = Tutorial::find(1)->usings;
    dd($tut);
    

    dd();
    
});


Route::get('/templatetest', function() {
    return View::make('test');
});

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