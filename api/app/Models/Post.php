<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'titre',    // Le titre du post
        'description', // La description du post
        'user_id'   // L'ID de l'utilisateur qui a créé le post
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        // Attributs cachés lors de la conversion du modèle en JSON, par exemple:
        'updated_at',
        'created_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        // Définir les casts pour les champs, si nécessaire
    ];

    // Relations ou méthodes supplémentaires si nécessaire
}
