<?php

namespace App\Utils;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;

class Api
{
    public static function success(mixed $data = null, int $status = 200, mixed $meta = null): JsonResponse
    {
        $payload = ['data' => $data];
        if (! is_null($meta)) $payload['meta'] = $meta;

        return response()->json($payload, $status);
    }

    public static function error(string $message, int $status = 400, mixed $errors = null): JsonResponse
    {
        $payload = ['message' => $message];
        if (! is_null($errors)) $payload['errors'] = $errors;

        return response()->json($payload, $status);
    }

    /**
     * @param  LengthAwarePaginator<mixed>  $paginator
     */
    public static function paginate(LengthAwarePaginator $paginator): array
    {
        return [
            'items' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'last_page' => $paginator->lastPage(),
            ],
        ];
    }
}

