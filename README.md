# Sistem Booking Lapangan Futsal Berbasis Web

Monorepo untuk website booking lapangan futsal. Sistem menyediakan:
- Auth untuk user/admin
- Manajemen lapangan & jadwal (admin)
- Booking lapangan berdasarkan slot waktu
- Riwayat booking & status pembayaran
- Dashboard admin untuk memantau seluruh booking & pembayaran

## Struktur Repo

- `backend/` - Backend API (Laravel) untuk manajemen data, validasi, dan otorisasi berbasis role
- `frontend/` - Frontend Web App (Next.js App Router) untuk UI user/admin
- `docs/` - Dokumentasi arsitektur, relasi data, flow user/admin, dan spesifikasi status

## Tech Stack (saat ini)

- Backend: Laravel API + session-based auth (Laravel Sanctum, cookie)
- Frontend: Next.js (App Router) + Tailwind CSS
- State client: TanStack Query (server-state)
- Database: MySQL (skema disediakan via migration Laravel)

## Skema Data (inti)

Tabel utama:
- `users`
- `lapangan`
- `jadwal`
- `booking`
- `pembayaran`

Relasi:
- `users` -> banyak `booking`
- `lapangan` -> banyak `jadwal`
- `jadwal` -> banyak `booking` (secara data, namun bisnis membatasi slot agar tidak bentrok)
- `booking` -> satu `pembayaran`

Constraint bisnis yang menjadi fokus:
- Tidak boleh double booking untuk slot yang sama (lapangan + tanggal + jam)
- Jadwal yang sudah dibooking otomatis dianggap unavailable untuk booking berikutnya

## Endpoint API yang sudah ada (foundation)

Backend saat ini sudah menyediakan fondasi endpoint:
- `GET /api/ping` - health check
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Endpoint CRUD lapangan/jadwal serta flow booking/pembayaran akan ditambahkan bertahap di fase berikutnya.

## Cara Menjalankan Lokal

### Prasyarat

- PHP 8.3+
- Composer
- MySQL (disarankan) / atau gunakan default sqlite untuk test awal
- Node.js 18+/20+

### 1) Setup Backend

1. Masuk ke folder `backend/`
2. Konfigurasi database di file `.env` (contoh variabel DB):
   - `DB_CONNECTION=mysql`
   - `DB_HOST=127.0.0.1`
   - `DB_PORT=3306`
   - `DB_DATABASE=fullstack_project`
   - `DB_USERNAME=...`
   - `DB_PASSWORD=...`
3. Jalankan migrasi:
   ```bash
   php artisan migrate --force
   ```
4. Jalankan server:
   ```bash
   php artisan serve --port 8000
   ```

### 2) Setup Frontend

1. Masuk ke folder `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variable `NEXT_PUBLIC_API_URL`:
   - contoh: `http://localhost:8000/api`
4. Jalankan:
   ```bash
   npm run dev
   ```

### 3) Catatan Auth (Sanctum)

Untuk request `POST/PUT/PATCH/DELETE` yang memakai session cookie, frontend perlu mengambil CSRF cookie lebih dulu dari:
- `GET /sanctum/csrf-cookie`

## Catatan

Di root repo masih ada kode Express/Node lama (folder `routes/`, `controllers/`, dll). Kode tersebut tidak dipakai oleh monorepo ini. Nanti bisa dibersihkan setelah aplikasi Laravel/Next berjalan penuh end-to-end.

