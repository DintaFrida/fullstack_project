<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();

            $table->foreignId('booking_id')->constrained('booking')->cascadeOnDelete()->unique();

            $table->string('metode_pembayaran', 30);
            $table->decimal('total_bayar', 10, 2);

            $table->string('status_pembayaran', 30)->default('unpaid');
            $table->text('bukti_pembayaran')->nullable();

            $table->timestamps();

            $table->index(['status_pembayaran']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pembayaran');
    }
};

