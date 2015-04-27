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
 * BlackJack Card Game!!!!!!~~~!!!~~~!!!
 * 
 */
Route::get('/blackjack', 'BlackjackController@index');


/**
 *
 * Arcs
 *
 */
Route::get('/arcs', 'ArcsController@index');

/**
 *
 * Tutorial summary
 * Links to tutorials with short summary.
 * 
 */

Route::get('/tutorials', 'TutorialsController@index');

// Single post per page
Route::get('/tutorials/{id}', 'TutorialsController@showSinglePost')
    ->where('id', '[0-9]+');

//Route::when('tutorials/*', 'auth');
/*****************************************************************************/
// REQUIRE LOGIN
/*****************************************************************************/

Route::group(array('before' => 'auth'), function()
{

    // Show add tutorial page
    Route::get('/tutorials/add', 'TutorialsController@showAddTutorial');
    // Add tutorial
    Route::post('/tutorials/add', 'TutorialsController@addTutorial');

});
/******************************************************************************/

// Search Tutorial
Route::get('/tutorials/search', 'TutorialsController@searchTutorial');

// Show login screen
Route::get('/login', 'TutorialsController@showLogin');

// Do login
Route::post('/tutorials', 'TutorialsController@doLogin');

// Remove tutorial based on id
Route::get('/tutorials/remove/{id}', 'TutorialsController@removeTutorial');


Route::get('/logout', 'TutorialsController@doLogout');

/**********************************************************************
 *
 * Tutorials using AngularJS
 *
 * *********************************************************************/

Route::get('/tutorials/angularjs', 'TutorialsAngularController@index');

/************************************************************************
 *
 * Tutorials API
 *
 * ********************************************************************/

Route::get('/drag', 'DragController@index');

/************************************************************************
 *
 * Tutorials API
 *
 * ********************************************************************/

Route::group(array('prefix' => 'tutorials/api/v1'), function()
{
    Route::resource('tutorials/all', 'TutorialAPIController');
});

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

Route::get('/bower', function() {
    return View::make('test');
});

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

Route::get('/authtest', array('before' => 'auth.basic', function()
{
    return "works";
}));