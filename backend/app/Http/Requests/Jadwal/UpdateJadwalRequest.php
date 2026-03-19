<?php

namespace App\Http\Requests\Jadwal;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJadwalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lapangan_id' => ['sometimes', 'required', 'integer', 'exists:lapangan,id'],
            'tanggal' => ['sometimes', 'required', 'date_format:Y-m-d'],
            'jam_mulai' => ['sometimes', 'required', 'date_format:H:i'],
            'jam_selesai' => ['sometimes', 'required', 'date_format:H:i', 'after:jam_mulai'],
            'status_ketersediaan' => ['sometimes', 'required', 'in:available,unavailable'],
        ];
    }
}

