<?php

namespace App\Http\Requests\Lapangan;

use Illuminate\Foundation\Http\FormRequest;

class StoreLapanganRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama_lapangan' => ['required', 'string', 'max:255'],
            'jenis_lapangan' => ['required', 'string', 'max:255'],
            'harga_per_jam' => ['required', 'numeric', 'min:0'],
        ];
    }
}

