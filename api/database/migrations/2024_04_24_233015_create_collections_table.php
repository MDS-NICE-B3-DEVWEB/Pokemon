<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('card_collections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Assurez que la suppression d'un utilisateur entraîne la suppression de ses cartes
            $table->string('pokemon_card_id', 50)->index(); // Taille de champ spécifiée, ajustez selon les données de l'API
            $table->string('name', 255); // Nom de la carte Pokémon
            $table->timestamps(); // Timestamps pour enregistrer la création et la dernière modification des enregistrements

            // Index unique pour empêcher les entrées dupliquées pour le même utilisateur et carte
            $table->unique(['user_id', 'pokemon_card_id'], 'user_pokemon_card_unique');
        });
    }

    public function down()
    {
        Schema::dropIfExists('card_collections');
    }
};
