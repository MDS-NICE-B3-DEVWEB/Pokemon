<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles; // Import Spatie HasRoles trait
use App\Models\PokemonCard;
use App\Models\CardCollection;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles; // Include the HasRoles trait

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Ensure this cast aligns with your hashing strategy
    ];

    /**
     * Get the Pokémon cards associated with the user through a many-to-many relationship.
     */
    public function pokemonCards()
    {
        return $this->belongsToMany(PokemonCard::class, 'user_pokemon_cards', 'user_id', 'pokemon_card_id');
    }

    /**
     * Get the card collections owned by the user.
     */
    public function cardCollections()
    {
        return $this->hasMany(CardCollection::class);
    }
}
