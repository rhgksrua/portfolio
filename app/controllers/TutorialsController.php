<?php

class TutorialsController extends BaseController 
{
    public function index()
    {
        return View::make('tutorials.index');
    }

    public function showAddTutorial()
    {
        return "Add tutorial page";
    }

    public function removeTutorial()
    {
        return "Remove tutorial page";
    }



}