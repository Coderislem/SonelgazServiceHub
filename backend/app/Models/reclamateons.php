<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reclamateons extends Model
{
    use HasFactory;

    // The table associated with the model.
    protected $table = 'reclamateons';

    // The attributes that are mass assignable.
    protected $fillable = [
        'nombreCompteurs',
        'type_reclamation',
        'description',
        'image_Of_Problems',
        'Responce',
        'name_Agency',
        'user_id',

    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($reclamation) {
            $user = $reclamation->user;
            if ($user) {
                $compteur = $user->compteurs()->first();
                if ($compteur) {
                    $reclamation->name_Agency = $compteur->name_Agency;
                }
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}