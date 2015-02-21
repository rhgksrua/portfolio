<?php

class TutorialsController extends BaseController 
{
    protected $tutorial;

    public function __construct(User $user, Tutorial $tutorial)
    {
        $this->tutorial = $tutorial;
    }

    public function index()
    {
        return View::make('tutorials.index');
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

        $tutorial = $this->tutorial;
        $this->tutorial->title = Input::get('title');
        $this->tutorial->link = Input::get('link');
        $this->tutorial->tutorial_created_at = Input::get('date');
        $this->tutorial->uses = Input::get('uses');
        $this->tutorial->demo = Input::get('demo');
        $this->tutorial->difficulty = Input::get('difficulty');
        $this->tutorial->prerequisites = Input::get('prerequisites');
        $this->tutorial->summary = Input::get('summary');
        if ($this->tutorial->save()) {
            $added = true;
            $success = true;
        }

        return View::make('tutorials.showAdd')
            ->with('added', true)
            ->with('success', $success)
            ->with('inputs', Input::all());

        
    }

    public function removeTutorial()
    {
        return "Remove tutorial page";
    }



}