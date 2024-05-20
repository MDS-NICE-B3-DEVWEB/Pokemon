<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CardCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class CollectionController extends Controller
{
    /**
     * Affiche la collection de cartes de l'utilisateur authentifié.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $collections = Auth::user()->cardCollections;
        return response()->json($collections);
    }

    /**
     * Ajoute une carte à la collection de l'utilisateur authentifié en utilisant l'ID de la carte.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addToCollection(Request $request)
    {
        $validatedData = $request->validate([
            'pokemon_card_id' => 'required|string',
        ]);

        $response = Http::get("https://api.pokemontcg.io/v2/cards/{$validatedData['pokemon_card_id']}");

        if ($response->successful()) {
            $pokemonCard = $response->json('data');
            $tcgplayer = $pokemonCard['tcgplayer']['prices']['holofoil'] ?? null; // Assumption of 'holofoil' prices

            $collection = Auth::user()->cardCollections()->create([
                'pokemon_card_id' => $pokemonCard['id'],
                'name' => $pokemonCard['name'],
                'set_name' => $pokemonCard['set']['name'] ?? null,
                'set_series' => $pokemonCard['set']['series'] ?? null,
                'price_low' => $tcgplayer ? $tcgplayer['low'] : null,
                'price_mid' => $tcgplayer ? $tcgplayer['mid'] : null,
                'price_high' => $tcgplayer ? $tcgplayer['high'] : null,
                'price_market' => $tcgplayer ? $tcgplayer['market'] : null,
            ]);

            return response()->json($collection, 201);
        } else {
            return response()->json(['message' => "La carte Pokémon avec l'ID {$validatedData['pokemon_card_id']} n'a pas été trouvée."], 404);
        }
    }

    /**
     * Supprime une carte de la collection de l'utilisateur authentifié.
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $collection = Auth::user()->cardCollections()->where('id', $id)->first();

        if ($collection) {
            $collection->delete();
            return response()->json(null, 204);
        }

        return response()->json(['message' => 'Carte non trouvée ou non autorisée à supprimer.'], 404);
    }
}
