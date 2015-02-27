@extends('master')

@section('header')

@stop

@section('content')
    
    <h1>Log In</h1>
    <div class="form-container">
        <form action="/tutorials" method="post">
            <label for="username">Username: </label>
            <br />
            <input id="username" type="text" name="username">
            <br />
            <label for="password">Password </label>
            <br />
            <input id="password" type="password" name="password">
            <br />
            <input type="submit" value="Log In">

        </form>

    </div>

@stop