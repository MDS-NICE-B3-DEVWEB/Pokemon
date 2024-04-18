<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class PokemonCard extends Model
{
    use HasFactory;


     //protected $primaryKey = 'your_primary_key';

    // Si vous n'utilisez pas les timestamps (created_at et updated_at)
    // public $timestamps = false;

    // Attributs qui peuvent être assignés en masse
    protected $fillable = [
        'name',
        'type',
        'image_url',
        'generation',
        // Ajoutez d'autres colonnes selon vos besoins
    ];

    public function users()
{
    return $this->belongsToMany(User::class, 'user_pokemon_cards','user_id', 'pokemon_card_id');
}

 /**
     * Supprime cette carte de la collection d'un utilisateur spécifique.
     *
     * @param int $userId L'ID de l'utilisateur.
     * @return bool Renvoie true si la carte a été supprimée avec succès, false sinon.
     */
    public function removeCardFromUser($userId)
    {
        $user = User::find($userId);
        if ($user && $this->users()->where('user_id', $userId)->exists()) {
            $this->users()->detach($userId);
            return true;
        }

        return false;
    }

    // Attributs qui doivent être cachés pour les tableaux
    // protected $hidden = [];

    // Attributs qui doivent être castés dans un type natif
    // protected $casts = [];
}
