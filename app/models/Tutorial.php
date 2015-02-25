<?php

class Tutorial extends Eloquent
{
    protected $table = 'tutorials';

    public function uses()
    {
        return $this->hasMany('Using', 'tutorial_id');
    }
}