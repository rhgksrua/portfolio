<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetailsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('details', function($table) {
			$table->increments('id');
			$table->integer('link_id')->unsigned();
			$table->foreign('link_id')->references('id')->on('links')->onDelete('cascade');
			$table->integer('ip');
			$table->integer('count');


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
		Schema::drop('details');
	}

}
