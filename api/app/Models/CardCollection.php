<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CardCollection extends Model
{
    use HasFactory;

    /**
     * Les attributs qui peuvent être assignés massivement.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'pokemon_card_id',
        'name',
        'set_name',
        'set_series',
        'price_low',
        'price_mid',
        'price_high',
        'price_market',
    ];
    /**
     * La table associée au modèle.
     *
     * @var string
     */
    protected $table = 'card_collections';

    /**
     * Obtient l'utilisateur propriétaire de la collection.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Vous pouvez ajouter ici d'autres méthodes pour la gestion de votre modèle, telles que des fonctions personnalisées pour formater ou traiter les données de cartes.
}
