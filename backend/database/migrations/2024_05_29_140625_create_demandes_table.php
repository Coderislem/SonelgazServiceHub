<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::create('demandes', function (Blueprint $table) {
            $table->id();
            $table->string('name_Agency'); 
            $table->string('Energy');
            $table->string('Document');
            $table->string('Address');
            $table->integer('phone');
            $table->string('statistical_identification_number');
            $table->string('the_neture_of_the_place_of_arrest');
            $table->string('state_demande');
            $table->timestamps();
            $table->foreignId('user_id')->constrained('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demandes');
    }
};
