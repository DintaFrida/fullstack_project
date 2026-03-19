<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * @param  \Illuminate\Http\Request  $request
     */
    public function handle(Request $request, Closure $next): Response
    {
        $origin = $request->headers->get('origin');
        $allowedOrigins = array_values(
            array_filter(
                array_map('trim', explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000'))),
            ),
        );

        // If origin is not allowed, we do nothing (let downstream handle).
        if ($origin && in_array($origin, $allowedOrigins, true)) {
            $headers = [
                'Access-Control-Allow-Origin' => $origin,
                'Access-Control-Allow-Credentials' => 'true',
                'Access-Control-Allow-Methods' => 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN, X-XSRF-TOKEN',
            ];

            if ($request->getMethod() === 'OPTIONS') {
                $response = response('', 204);
                foreach ($headers as $k => $v) {
                    $response->headers->set($k, $v);
                }
                return $response;
            }
        } else {
            $headers = [];
        }

        $response = $next($request);

        foreach ($headers ?? [] as $k => $v) {
            $response->headers->set($k, $v);
        }

        return $response;
    }
}

