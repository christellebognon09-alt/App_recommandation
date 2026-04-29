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
    Schema::create('places', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // Nom du lieu
        $table->string('category'); // Restaurant, Santé, Sport...
        $table->string('city')->default('Cotonou');
        $table->decimal('latitude', 10, 8); // Coordonnées GPS
        $table->decimal('longitude', 11, 8);
        $table->text('description')->nullable();
        $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
