<?php

namespace App\Http\Requests\Lapangan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLapanganRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama_lapangan' => ['sometimes', 'required', 'string', 'max:255'],
            'jenis_lapangan' => ['sometimes', 'required', 'string', 'max:255'],
            'harga_per_jam' => ['sometimes', 'required', 'numeric', 'min:0'],
        ];
    }
}

