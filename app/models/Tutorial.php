<?php

class Tutorial extends Eloquent
{
    protected $table = 'tutorials';

    public function usings()
    {
        return $this->hasMany('Using', 'tutorial_id');
    }
}