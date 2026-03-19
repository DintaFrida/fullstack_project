<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('jadwal_id')->constrained('jadwal')->cascadeOnDelete();

            $table->dateTime('tanggal_booking');
            $table->string('status_booking', 20)->default('pending');

            $table->decimal('total_booking', 10, 2)->nullable();

            $table->timestamps();

            $table->index(['user_id', 'status_booking']);
            $table->index(['jadwal_id', 'status_booking']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};

