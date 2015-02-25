<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('usings', function($table) {

			$table->increments('id');
			$table->string('using');
			$table->integer('tutorial_id')->unsigned();
			$table->foreign('tutorial_id')->references('id')->on('tutorials');
			$table->timestamps();

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('usings');
	}

}
