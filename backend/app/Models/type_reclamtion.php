<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class type_reclamtion extends Model
{
    use HasFactory;

    
    protected $table = 'type_reclamtions'; 

    
    protected $fillable = [
        'energy',
        'type_reclamation',
    ];
}