<?php

class Tutorial extends Eloquent
{
    protected $table = 'tutorials';

    public function usings()
    {
        return $this->hasMany('Using', 'tutorial_id');
    }

    public function delete()
    {
        $this->usings()->delete();
        return parent::delete();
    }
}