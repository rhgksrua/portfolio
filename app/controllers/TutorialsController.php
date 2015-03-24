<?php

class TutorialsController extends BaseController 
{
    protected $tutorial;
    protected $using;
    protected $user;

    public function __construct(Using $using, Tutorial $tutorial, User $user)
    {
        $this->tutorial = $tutorial;
        $this->using = $using;
        $this->user = $user;
    }

    public function index()
    {
        $tutorials = $this->tutorial->all();

        return View::make('tutorials.index')
            ->with('loggedIn', Auth::check() ? true : false)
            ->with('tutorials', $tutorials);
    }

    public function showAddTutorial()
    {
        //return "Add tutorial page";
        return View::make('tutorials.showAdd')
            ->with('added', false)
            ->with('success', false);
            
    }

    public function addTutorial()
    {
        $added = false;
        $success = false;

        $validationRules = array (
            'title' => 'required',
            'link' => 'required',
            'sitename' => 'required',
            'uses' => 'required',
            'difficulty' => 'required',
            'prerequisites' => 'required',
            'demo' => 'required',
            'summary' => 'required'
        );

        // Validation
        $validator = Validator::make(
            Input::all(),
            $validationRules
        );

        if ($validator->fails()) {

            return Redirect::back()
                ->with('added', $added)
                ->with('success', $success)
                ->withErrors($validator)
                ->withInput();
        }

        // Convert date to MM-DD-YYYY
        $date = date("Y-m-d", mktime(0, 0, 0, Input::get('date_month'), Input::get('date_day'), Input::get('date_year')));
       

        // parse uses
        $uses = array_map('trim', explode(',', Input::get('uses')));
      


        $tutorial = $this->tutorial;
        $this->tutorial->title = Input::get('title');
        $this->tutorial->link = Input::get('link');
        $this->tutorial->site_name = Input::get('sitename');
        $this->tutorial->tutorial_created_at = $date;
        $this->tutorial->uses = Input::get('uses');
        $this->tutorial->demo = Input::get('demo');
        $this->tutorial->difficulty = Input::get('difficulty');
        $this->tutorial->prerequisites = Input::get('prerequisites');
        $this->tutorial->summary = Input::get('summary');
        if ($this->tutorial->save()) {
            $added = true;
            $success = true;
        }

        // Save usings
        foreach($uses as $use) {
            $this->tutorial->usings()->save(new Using(array('using' => $use)));
        }

        return View::make('tutorials.showAdd')
            ->with('added', true)
            ->with('success', $success)
            ->with('usings', $uses)
            ->with('inputs', Input::all());
        
    }

    public function removeTutorial($id)
    {


        $tutorial = Tutorial::find($id);
        $tutorial->delete();
        return Redirect::to('/tutorials')->with('message', "Removed Tutorial ID: $id");

        return "Remove id: $id";

        return View::make('tutorials.removeTutorial');
    }


    public function showLogin()
    {
        return View::make('tutorials.showLogin');
    }

    public function doLogin()
    {
        $cred = array(
            'username' => Input::get('username'),
            'password' => Input::get('password')
        );
        if (Auth::attempt($cred))
        {
            return Redirect::intended('/');
        }

        return "Failed Log In";

        $hashedPassword = User::where('username', '=', Input::get('username'))->first()->password;
        if (Hash::check(Input::get('password'), $hashedPassword))
        {
            return "PW correct";
        }
        return "Password Incorect";

        return "Do login stuff here";
    }

    public function doLogout()
    {
        Auth::logout();
        return Redirect::to('/');
    }
}