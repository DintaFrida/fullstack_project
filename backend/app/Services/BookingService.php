<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Jadwal;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BookingService
{
    /**
     * @throws \RuntimeException
     */
    public function createBooking(User $user, int $jadwalId): Booking
    {
        return DB::transaction(function () use ($user, $jadwalId) {
            $jadwal = Jadwal::query()
                ->where('id', $jadwalId)
                ->lockForUpdate()
                ->firstOrFail();

            if ($jadwal->status_ketersediaan !== 'available') {
                throw new \RuntimeException('Jadwal tidak tersedia untuk booking.', 409);
            }

            $hasActiveBooking = Booking::query()
                ->where('jadwal_id', $jadwalId)
                ->whereIn('status_booking', ['pending', 'confirmed', 'completed'])
                ->exists();

            if ($hasActiveBooking) {
                throw new \RuntimeException('Slot sudah dibooking. Coba jadwal lain.', 409);
            }

            $jadwal->load('lapangan');
            $total = $this->calculateTotal($jadwal);

            $booking = Booking::create([
                'user_id' => $user->id,
                'jadwal_id' => $jadwal->id,
                'tanggal_booking' => now(),
                'status_booking' => 'pending',
                'total_booking' => $total,
            ]);

            // Lock slot:jadwal tidak lagi tersedia setelah booking dibuat
            $jadwal->status_ketersediaan = 'unavailable';
            $jadwal->save();

            return $booking->fresh(['jadwal.lapangan', 'pembayaran']);
        });
    }

    /**
     * @throws \RuntimeException
     */
    public function cancelBooking(User $user, int $bookingId): Booking
    {
        return DB::transaction(function () use ($user, $bookingId) {
            $booking = Booking::query()
                ->where('id', $bookingId)
                ->where('user_id', $user->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($booking->status_booking === 'canceled') {
                throw new \RuntimeException('Booking sudah dibatalkan.', 409);
            }

            $payment = $booking->pembayaran()->lockForUpdate()->first();
            if ($payment && $payment->status_pembayaran === 'paid') {
                throw new \RuntimeException('Booking tidak bisa dibatalkan karena pembayaran sudah dibayar.', 409);
            }

            $booking->status_booking = 'canceled';
            $booking->save();

            if ($payment && $payment->status_pembayaran !== 'unpaid') {
                $payment->status_pembayaran = 'unpaid';
                $payment->save();
            }

            $this->refreshJadwalAvailability($booking->jadwal_id);

            return $booking->fresh(['jadwal.lapangan', 'pembayaran']);
        });
    }

    /**
     * @throws \RuntimeException
     */
    public function adminUpdateBookingStatus(User $admin, int $bookingId, string $statusBooking): Booking
    {
        return DB::transaction(function () use ($admin, $bookingId, $statusBooking) {
            $booking = Booking::query()
                ->where('id', $bookingId)
                ->lockForUpdate()
                ->firstOrFail();

            $payment = $booking->pembayaran()->lockForUpdate()->first();

            if (in_array($statusBooking, ['confirmed', 'completed'], true)) {
                if (! $payment || $payment->status_pembayaran !== 'paid') {
                    throw new \RuntimeException('Pembayaran harus `paid` sebelum status booking `confirmed/completed`.', 409);
                }
            }

            if ($statusBooking === 'canceled') {
                if ($payment && $payment->status_pembayaran === 'paid') {
                    throw new \RuntimeException('Tidak bisa membatalkan booking yang pembayarannya sudah paid.', 409);
                }
            }

            $booking->status_booking = $statusBooking;
            $booking->save();

            if ($statusBooking === 'canceled' && $payment) {
                if ($payment->status_pembayaran !== 'unpaid') {
                    $payment->status_pembayaran = 'unpaid';
                    $payment->save();
                }
            }

            if ($statusBooking === 'canceled') {
                $this->refreshJadwalAvailability($booking->jadwal_id);
            }

            return $booking->fresh(['jadwal.lapangan', 'pembayaran']);
        });
    }

    private function calculateTotal(Jadwal $jadwal): float
    {
        $jamMulai = Carbon::createFromFormat('H:i', $jadwal->jam_mulai->format('H:i'));
        $jamSelesai = Carbon::createFromFormat('H:i', $jadwal->jam_selesai->format('H:i'));

        if (! $jamSelesai->gt($jamMulai)) {
            throw new \RuntimeException('Jam selesai harus lebih besar dari jam mulai.', 422);
        }

        $minutes = $jamMulai->diffInMinutes($jamSelesai);
        $hours = $minutes / 60;

        $harga = (float) $jadwal->lapangan->harga_per_jam;
        return round($harga * $hours, 2);
    }

    /**
     * Jadwal kembali `available` jika tidak ada booking non-canceled.
     */
    private function refreshJadwalAvailability(int $jadwalId): void
    {
        $hasActive = Booking::query()
            ->where('jadwal_id', $jadwalId)
            ->whereIn('status_booking', ['pending', 'confirmed', 'completed'])
            ->exists();

        $jadwal = Jadwal::query()->where('id', $jadwalId)->lockForUpdate()->first();
        if (! $jadwal) return;

        $jadwal->status_ketersediaan = $hasActive ? 'unavailable' : 'available';
        $jadwal->save();
    }
}

