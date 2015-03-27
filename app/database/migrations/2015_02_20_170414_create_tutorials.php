<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTutorials extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('tutorials', function($table)
		{
			$table->increments('id');
			$table->string('title');
			$table->string('site_name');
			$table->text('link');
			$table->date('tutorial_created_at')->nullable();
			$table->timestamps();
			$table->integer('uses');
			$table->boolean('demo');
			$table->text('difficulty');
			$table->text('prerequisites');
			$table->text('summary');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
		Schema::drop('tutorials');
	}

}
