<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\LapanganController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return response()->json([
        'ok' => true,
        'service' => 'futsal-booking-api',
    ]);
});

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

// Lapangan (public for user)
Route::get('/fields', [LapanganController::class, 'index']);
Route::get('/fields/{id}', [LapanganController::class, 'show']);

// Jadwal tersedia (public for user)
Route::get('/schedules/available', [JadwalController::class, 'available']);

// USER: booking & pembayaran (session auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::put('/bookings/{id}/cancel', [BookingController::class, 'cancel']);

    Route::post('/payments', [PaymentController::class, 'initiate']);
    Route::get('/payments', [PaymentController::class, 'index']);
    Route::get('/payments/{id}', [PaymentController::class, 'show']);
});

// Admin routes
Route::middleware(['auth:sanctum', \App\Http\Middleware\AdminOnly::class])->prefix('admin')->group(function () {
    // Lapangan CRUD
    Route::post('/fields', [LapanganController::class, 'store']);
    Route::put('/fields/{id}', [LapanganController::class, 'update']);
    Route::delete('/fields/{id}', [LapanganController::class, 'destroy']);

    // Jadwal CRUD
    Route::get('/schedules', [JadwalController::class, 'indexAdmin']);
    Route::post('/schedules', [JadwalController::class, 'store']);
    Route::put('/schedules/{id}', [JadwalController::class, 'update']);
    Route::delete('/schedules/{id}', [JadwalController::class, 'destroy']);

    // Booking & pembayaran
    Route::get('/bookings', [BookingController::class, 'indexAdmin']);
    Route::get('/bookings/{id}', [BookingController::class, 'showAdmin']);
    Route::put('/bookings/{id}/status', [BookingController::class, 'updateStatusAdmin']);

    Route::get('/payments', [PaymentController::class, 'indexAdmin']);
    Route::get('/payments/{id}', [PaymentController::class, 'showAdmin']);
    Route::put('/payments/{id}/status', [PaymentController::class, 'updateStatusAdmin']);
});

