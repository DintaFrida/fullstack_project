<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller as BaseController;
use App\Http\Requests\Booking\CancelBookingRequest;
use App\Http\Requests\Booking\CreateBookingRequest;
use App\Http\Requests\Booking\UpdateBookingStatusRequest;
use App\Models\Booking;
use App\Models\User;
use App\Utils\Api;
use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BookingController extends BaseController
{
    public function __construct(private BookingService $bookingService)
    {
    }

    public function store(CreateBookingRequest $request): JsonResponse
    {
        $user = Auth::user();
        assert($user instanceof User);

        try {
            $jadwalId = (int) $request->validated()['id_jadwal'];
            $booking = $this->bookingService->createBooking($user, $jadwalId);

            return Api::success(
                [
                    'booking' => $booking,
                    'message' => 'Booking dibuat. Silakan lanjutkan pembayaran.',
                ],
                201,
            );
        } catch (\RuntimeException $e) {
            $code = (int) ($e->getCode() ?: 409);
            return Api::error($e->getMessage(), $code);
        } catch (\Throwable $e) {
            Log::error('Booking store failed', ['error' => $e->getMessage()]);
            return Api::error('Gagal membuat booking.', 500);
        }
    }

    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        assert($user instanceof User);

        $perPage = (int) ($request->query('limit') ?? 10);
        $page = (int) ($request->query('page') ?? 1);
        $perPage = max(1, min(50, $perPage));

        $status = $request->query('status_booking');

        $query = Booking::query()
            ->where('user_id', $user->id)
            ->with(['jadwal.lapangan', 'pembayaran'])
            ->orderByDesc('tanggal_booking');

        if ($status) {
            $query->where('status_booking', $status);
        }

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return Api::success(Api::paginate($paginator));
    }

    public function show(int $id): JsonResponse
    {
        $user = Auth::user();
        assert($user instanceof User);

        $booking = Booking::query()
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->with(['jadwal.lapangan', 'pembayaran'])
            ->firstOrFail();

        return Api::success([
            'booking' => $booking,
            'message' => 'Ringkasan booking.',
        ]);
    }

    public function cancel(int $id, CancelBookingRequest $request): JsonResponse
    {
        $user = Auth::user();
        assert($user instanceof User);

        try {
            $booking = $this->bookingService->cancelBooking($user, $id);
            return Api::success([
                'booking' => $booking,
                'message' => 'Booking berhasil dibatalkan.',
            ]);
        } catch (\RuntimeException $e) {
            $code = (int) ($e->getCode() ?: 409);
            return Api::error($e->getMessage(), $code);
        } catch (\Throwable $e) {
            Log::error('Booking cancel failed', ['error' => $e->getMessage()]);
            return Api::error('Gagal membatalkan booking.', 500);
        }
    }

    // ADMIN
    public function indexAdmin(Request $request): JsonResponse
    {
        $perPage = (int) ($request->query('limit') ?? 10);
        $page = (int) ($request->query('page') ?? 1);
        $perPage = max(1, min(50, $perPage));

        $status = $request->query('status_booking');
        $tanggal = $request->query('tanggal');
        $lapanganId = $request->query('lapangan_id');
        $userId = $request->query('id_user');

        $query = Booking::query()
            ->with(['jadwal.lapangan', 'pembayaran', 'user'])
            ->orderByDesc('tanggal_booking');

        if ($status) $query->where('status_booking', $status);
        if ($tanggal) $query->whereDate('tanggal_booking', $tanggal);
        if ($userId) $query->where('user_id', $userId);
        if ($lapanganId) $query->whereHas('jadwal', fn ($q) => $q->where('lapangan_id', $lapanganId));

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return Api::success(Api::paginate($paginator));
    }

    public function showAdmin(int $id): JsonResponse
    {
        $booking = Booking::query()
            ->where('id', $id)
            ->with(['jadwal.lapangan', 'pembayaran', 'user'])
            ->firstOrFail();

        return Api::success([
            'booking' => $booking,
            'message' => 'Ringkasan booking (admin).',
        ]);
    }

    public function updateStatusAdmin(int $id, UpdateBookingStatusRequest $request): JsonResponse
    {
        try {
            $status = $request->validated()['status_booking'];
            $admin = Auth::user();
            assert($admin instanceof User);

            $booking = $this->bookingService->adminUpdateBookingStatus($admin, $id, $status);

            return Api::success([
                'booking' => $booking,
                'message' => 'Status booking berhasil diperbarui.',
            ]);
        } catch (\RuntimeException $e) {
            $code = (int) ($e->getCode() ?: 409);
            return Api::error($e->getMessage(), $code);
        } catch (\Throwable $e) {
            Log::error('Booking updateStatusAdmin failed', ['error' => $e->getMessage()]);
            return Api::error('Gagal memperbarui status booking.', 500);
        }
    }
}

