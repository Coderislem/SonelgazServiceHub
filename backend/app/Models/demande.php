<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class demande extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_Agency',
        'Energy',
        'Document',
        'Address',
        'phone',
        'statistical_identification_number',
        'the_neture_of_the_place_of_arrest',
        'state_demande',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}