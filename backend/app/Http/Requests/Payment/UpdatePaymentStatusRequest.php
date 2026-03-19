<?php

namespace App\Http\Requests\Payment;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status_pembayaran' => [
                'required',
                'string',
                'in:unpaid,paid,failed,pending_verification',
            ],
        ];
    }
}

