<?php

class Using extends Eloquent
{
    protected $table = 'usings';

    protected $fillable = array('using');

    public function tutorial()
    {
        return $this->belongsTo('Tutorial');
    }
}