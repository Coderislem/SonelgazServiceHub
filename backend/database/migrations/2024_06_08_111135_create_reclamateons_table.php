<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reclamateons', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('nombreCompteurs');
            $table->string('type_reclamation');
            $table->text('description')->nullable();
            $table->string('image_Of_Problems')->nullable();
            $table->string('Responce')->nullable();
          $table->string('name_Agency')->nullable();
            $table->foreignId('user_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reclamateons');
    }
};
