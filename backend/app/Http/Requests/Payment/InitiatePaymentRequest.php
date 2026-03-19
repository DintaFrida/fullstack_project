<?php

namespace App\Http\Requests\Payment;

use Illuminate\Foundation\Http\FormRequest;

class InitiatePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_booking' => ['required', 'integer', 'exists:booking,id'],
            'metode_pembayaran' => ['required', 'string', 'max:30', 'in:bank_transfer,qris,ewallet,cash'],
        ];
    }
}

