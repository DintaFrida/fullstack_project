<?php

namespace App\Http\Controllers;

use App\Http\Requests\Payment\InitiatePaymentRequest;
use App\Http\Requests\Payment\UpdatePaymentStatusRequest;
use App\Models\Pembayaran;
use App\Models\User;
use App\Services\PaymentService;
use App\Utils\Api;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function __construct(private PaymentService $paymentService)
    {
    }

    // USER
    public function initiate(InitiatePaymentRequest $request): JsonResponse
    {
        $user = Auth::user();
        assert($user instanceof User);

        try {
            $payload = $request->validated();
            $payment = $this->paymentService->initiatePayment(
                $user,
                (int) $payload['id_booking'],
                $payload['metode_pembayaran'],
            );

            return Api::success([
                'payment' => $payment,
                'message' => 'Pembayaran berhasil dibuat. Tunggu verifikasi admin (simulasi).',
            ], 201);
        } catch (\RuntimeException $e) {
            $code = (int) ($e->getCode() ?: 409);
            return Api::error($e->getMessage(), $code);
        } catch (\Throwable $e) {
            Log::error('Payment initiate failed', ['error' => $e->getMessage()]);
            return Api::error('Gagal membuat pembayaran.', 500);
        }
    }

    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        assert($user instanceof User);

        $perPage = (int) ($request->query('limit') ?? 10);
        $page = (int) ($request->query('page') ?? 1);
        $perPage = max(1, min(50, $perPage));

        $status = $request->query('status_pembayaran');

        $query = Pembayaran::query()
            ->whereHas('booking', fn ($q) => $q->where('user_id', $user->id))
            ->with(['booking.jadwal.lapangan'])
            ->orderByDesc('created_at');

        if ($status) $query->where('status_pembayaran', $status);

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);
        return Api::success(Api::paginate($paginator));
    }

    public function show(int $id): JsonResponse
    {
        $user = Auth::user();
        assert($user instanceof User);

        $payment = Pembayaran::query()
            ->where('id', $id)
            ->whereHas('booking', fn ($q) => $q->where('user_id', $user->id))
            ->with(['booking.jadwal.lapangan'])
            ->firstOrFail();

        return Api::success([
            'payment' => $payment,
            'message' => 'Ringkasan pembayaran.',
        ]);
    }

    // ADMIN
    public function indexAdmin(Request $request): JsonResponse
    {
        $perPage = (int) ($request->query('limit') ?? 10);
        $page = (int) ($request->query('page') ?? 1);
        $perPage = max(1, min(50, $perPage));

        $status = $request->query('status_pembayaran');
        $metode = $request->query('metode_pembayaran');
        $tanggal = $request->query('tanggal');

        $query = Pembayaran::query()
            ->with(['booking.jadwal.lapangan', 'booking.user'])
            ->orderByDesc('created_at');

        if ($status) $query->where('status_pembayaran', $status);
        if ($metode) $query->where('metode_pembayaran', $metode);
        if ($tanggal) $query->whereDate('created_at', $tanggal);

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return Api::success(Api::paginate($paginator));
    }

    public function updateStatusAdmin(int $id, UpdatePaymentStatusRequest $request): JsonResponse
    {
        try {
            $status = $request->validated()['status_pembayaran'];
            $admin = Auth::user();
            assert($admin instanceof User);

            $payment = $this->paymentService->adminUpdatePaymentStatus($admin, $id, $status);

            return Api::success([
                'payment' => $payment,
                'message' => 'Status pembayaran berhasil diperbarui.',
            ]);
        } catch (\RuntimeException $e) {
            $code = (int) ($e->getCode() ?: 409);
            return Api::error($e->getMessage(), $code);
        } catch (\Throwable $e) {
            Log::error('Payment updateStatusAdmin failed', ['error' => $e->getMessage()]);
            return Api::error('Gagal memperbarui status pembayaran.', 500);
        }
    }

    public function showAdmin(int $id): JsonResponse
    {
        $payment = Pembayaran::query()
            ->where('id', $id)
            ->with(['booking.jadwal.lapangan', 'booking.user'])
            ->firstOrFail();

        return Api::success([
            'payment' => $payment,
            'message' => 'Ringkasan pembayaran (admin).',
        ]);
    }
}

