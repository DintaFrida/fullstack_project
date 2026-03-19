<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Pembayaran;
use App\Models\User;
use App\Models\Jadwal;
use Illuminate\Support\Facades\DB;

class PaymentService
{
    /**
     * @throws \RuntimeException
     */
    public function initiatePayment(User $user, int $bookingId, string $metodePembayaran): Pembayaran
    {
        return DB::transaction(function () use ($user, $bookingId, $metodePembayaran) {
            $booking = Booking::query()
                ->where('id', $bookingId)
                ->where('user_id', $user->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($booking->status_booking === 'canceled') {
                throw new \RuntimeException('Booking sudah dibatalkan.', 409);
            }

            $existingPayment = $booking->pembayaran()->lockForUpdate()->first();
            if ($existingPayment) {
                throw new \RuntimeException('Pembayaran untuk booking ini sudah ada.', 409);
            }

            // Total berasal dari booking (harga slot saat booking dibuat)
            $total = $booking->total_booking;
            if (is_null($total)) {
                throw new \RuntimeException('Total booking tidak ditemukan.', 422);
            }

            $payment = Pembayaran::create([
                'booking_id' => $booking->id,
                'metode_pembayaran' => $metodePembayaran,
                'total_bayar' => $total,
                'status_pembayaran' => 'pending_verification',
            ]);

            return $payment->fresh(['booking.jadwal.lapangan']);
        });
    }

    /**
     * @throws \RuntimeException
     */
    public function adminUpdatePaymentStatus(User $admin, int $paymentId, string $statusPembayaran): Pembayaran
    {
        return DB::transaction(function () use ($admin, $paymentId, $statusPembayaran) {
            $payment = Pembayaran::query()
                ->where('id', $paymentId)
                ->lockForUpdate()
                ->firstOrFail();

            $booking = $payment->booking()->lockForUpdate()->firstOrFail();

            // Guard: tidak boleh paid untuk booking yang sudah canceled
            if ($booking->status_booking === 'canceled' && $statusPembayaran !== 'failed') {
                throw new \RuntimeException('Booking dibatalkan, tidak bisa mengubah payment menjadi paid.', 409);
            }

            if ($statusPembayaran === 'paid') {
                if ($booking->status_booking !== 'pending' && $booking->status_booking !== 'confirmed') {
                    // Guard untuk status tak terduga
                    throw new \RuntimeException('Status booking tidak valid untuk proses paid.', 409);
                }

                $payment->status_pembayaran = 'paid';
                $payment->save();

                $booking->status_booking = 'confirmed';
                $booking->save();
            } elseif ($statusPembayaran === 'failed') {
                $payment->status_pembayaran = 'failed';
                $payment->save();

                $booking->status_booking = 'canceled';
                $booking->save();

                // Saat booking canceled karena failed payment, jadwal bisa kembali available jika tidak ada booking aktif lain
                $this->refreshJadwalAvailability($booking->jadwal_id);
            } else {
                // pending_verification / unpaid
                // Untuk MVP: perubahan status payment non-paid tidak mengubah booking secara otomatis.
                $payment->status_pembayaran = $statusPembayaran;
                $payment->save();
            }

            return $payment->fresh(['booking.jadwal.lapangan']);
        });
    }

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

