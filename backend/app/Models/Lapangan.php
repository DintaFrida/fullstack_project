<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lapangan extends Model
{
    protected $table = 'lapangan';

    protected $fillable = [
        'nama_lapangan',
        'jenis_lapangan',
        'harga_per_jam',
    ];

    public function jadwal(): HasMany
    {
        return $this->hasMany(Jadwal::class, 'lapangan_id');
    }
}

