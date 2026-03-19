<?php

namespace App\Http\Controllers;

use App\Http\Requests\Lapangan\StoreLapanganRequest;
use App\Http\Requests\Lapangan\UpdateLapanganRequest;
use App\Models\Lapangan;
use App\Utils\Api;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LapanganController extends Controller
{
    // USER endpoints
    public function index(Request $request): JsonResponse
    {
        $search = $request->query('q');
        $jenis = $request->query('jenis_lapangan');
        $perPage = (int) ($request->query('limit') ?? 10);
        $page = (int) ($request->query('page') ?? 1);

        $perPage = max(1, min(50, $perPage));

        $query = Lapangan::query();

        if ($jenis) {
            $query->where('jenis_lapangan', $jenis);
        }

        if ($search) {
            $query->where('nama_lapangan', 'like', '%' . $search . '%');
        }

        $query->orderByDesc('id');

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return Api::success(Api::paginate($paginator));
    }

    public function show(int $id): JsonResponse
    {
        $lapangan = Lapangan::query()->findOrFail($id);

        return Api::success($lapangan);
    }

    // ADMIN endpoints
    public function store(StoreLapanganRequest $request): JsonResponse
    {
        try {
            $payload = $request->validated();
            $lapangan = Lapangan::create($payload);
            return Api::success($lapangan, 201);
        } catch (\Throwable $e) {
            Log::error('Lapangan store failed', ['error' => $e->getMessage()]);
            return Api::error('Gagal membuat lapangan.', 500);
        }
    }

    public function update(UpdateLapanganRequest $request, int $id): JsonResponse
    {
        $lapangan = Lapangan::query()->findOrFail($id);

        try {
            $payload = $request->validated();
            $lapangan->fill($payload);
            $lapangan->save();

            return Api::success($lapangan);
        } catch (\Throwable $e) {
            Log::error('Lapangan update failed', ['error' => $e->getMessage()]);
            return Api::error('Gagal memperbarui lapangan.', 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        // For safety, delete lapangan only if it doesn't have active schedules/bookings.
        // Booking cascade can be dangerous; so we prevent deletion later at booking rules stage.
        $lapangan = Lapangan::query()->findOrFail($id);

        $hasSchedules = $lapangan->jadwal()->exists();
        if ($hasSchedules) {
            return Api::error('Lapangan tidak bisa dihapus karena memiliki jadwal.', 409);
        }

        $lapangan->delete();
        return Api::success(['message' => 'Lapangan berhasil dihapus.']);
    }
}

