<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compteur extends Model
{
    use HasFactory;

    // Specify the table if the table name is not the plural form of the model name
    protected $table = 'compteurs';

    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'nombreCompteurs',
        'typeCompteurs',
        'user_id',
        'name_Agency',
    ];

   
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function agence()
    {
        return $this->belongsTo(Agence::class);
    }
}
