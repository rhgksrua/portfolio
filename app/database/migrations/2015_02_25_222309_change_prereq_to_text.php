<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangePrereqToText extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tutorials', function(Blueprint $table)
		{
			//
			$table->dropColumn('prerequisites');
			
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tutorials', function(Blueprint $table)
		{
			//
			
			$table->integer('prerequisites');
		});
	}

}
