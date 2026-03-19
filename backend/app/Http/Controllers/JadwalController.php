<?php

namespace App\Http\Controllers;

use App\Http\Requests\Jadwal\StoreJadwalRequest;
use App\Http\Requests\Jadwal\UpdateJadwalRequest;
use App\Models\Jadwal;
use App\Utils\Api;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JadwalController extends Controller
{
    // USER endpoint: daftar slot tersedia
    public function available(Request $request): JsonResponse
    {
        $tanggal = $request->query('tanggal');
        $lapanganId = $request->query('lapangan_id');

        if (! $tanggal) {
            return Api::error('Parameter `tanggal` wajib diisi (format Y-m-d).', 422);
        }

        $perPage = (int) ($request->query('limit') ?? 10);
        $page = (int) ($request->query('page') ?? 1);
        $perPage = max(1, min(50, $perPage));

        $query = Jadwal::query()
            ->where('tanggal', $tanggal)
            ->where('status_ketersediaan', 'available')
            ->with('lapangan');

        if ($lapanganId) {
            $query->where('lapangan_id', $lapanganId);
        }

        $query->orderBy('jam_mulai');

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return Api::success(Api::paginate($paginator));
    }

    // ADMIN endpoints: CRUD
    public function indexAdmin(Request $request): JsonResponse
    {
        $perPage = (int) ($request->query('limit') ?? 10);
        $page = (int) ($request->query('page') ?? 1);
        $perPage = max(1, min(50, $perPage));

        $status = $request->query('status_ketersediaan');
        $lapanganId = $request->query('lapangan_id');
        $tanggal = $request->query('tanggal');

        $query = Jadwal::query()->with('lapangan');

        if ($status) $query->where('status_ketersediaan', $status);
        if ($lapanganId) $query->where('lapangan_id', $lapanganId);
        if ($tanggal) $query->where('tanggal', $tanggal);

        $query->orderByDesc('tanggal')->orderBy('jam_mulai');

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return Api::success(Api::paginate($paginator));
    }

    public function store(StoreJadwalRequest $request): JsonResponse
    {
        try {
            $payload = $request->validated();
            if (! array_key_exists('status_ketersediaan', $payload)) {
                $payload['status_ketersediaan'] = 'available';
            }

            $jadwal = Jadwal::create($payload);

            return Api::success($jadwal, 201);
        } catch (\Throwable $e) {
            Log::error('Jadwal store failed', ['error' => $e->getMessage()]);
            return Api::error('Gagal membuat jadwal.', 500);
        }
    }

    public function update(UpdateJadwalRequest $request, int $id): JsonResponse
    {
        $jadwal = Jadwal::query()->findOrFail($id);

        try {
            $payload = $request->validated();
            $jadwal->fill($payload);
            $jadwal->save();

            return Api::success($jadwal);
        } catch (\Throwable $e) {
            Log::error('Jadwal update failed', ['error' => $e->getMessage()]);
            return Api::error('Gagal memperbarui jadwal.', 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        $jadwal = Jadwal::query()->findOrFail($id);

        // Prevent deletion if there are non-canceled bookings.
        $hasActiveBooking = $jadwal->bookings()
            ->where('status_booking', '!=', 'canceled')
            ->exists();

        if ($hasActiveBooking) {
            return Api::error('Jadwal tidak bisa dihapus karena memiliki booking aktif.', 409);
        }

        $jadwal->delete();

        return Api::success(['message' => 'Jadwal berhasil dihapus.']);
    }
}

