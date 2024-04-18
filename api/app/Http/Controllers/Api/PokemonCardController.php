<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PokemonCard;
use App\Models\User;
use Exception;

class PokemonCardController extends Controller
{
    public function index()
    {
        try {
            $pokemonCards = PokemonCard::all();
            return response()->json([
                'status_code' => 200,
                'pokemon_cards' => $pokemonCards
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status_code' => 500,
                'error' => 'Erreur lors de la récupération des cartes: ' . $e->getMessage()
            ]);
        }
    }

    public function show($id)
    {
        try {
            $pokemonCard = PokemonCard::findOrFail($id);
            return response()->json([
                'status_code' => 200,
                'pokemon_card' => $pokemonCard
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status_code' => 404,
                'error' => 'Carte non trouvée.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status_code' => 500,
                'error' => 'Erreur lors de la récupération de la carte: ' . $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $pokemonCard = new PokemonCard();
            $pokemonCard->name = $request->name;
            $pokemonCard->type = $request->type;
            // Si besoin de plus de champs

            $pokemonCard->save();

            return response()->json([
                'status_code' => 200,
                'message' => 'Carte ajoutée avec succès.',
                'pokemon_card' => $pokemonCard
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status_code' => 500,
                'error' => 'Erreur lors de l\'ajout de la carte: ' . $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $pokemonCard = PokemonCard::findOrFail($id);
            $pokemonCard->name = $request->name;
            $pokemonCard->type = $request->type;
            // Update other fields...

            $pokemonCard->save();

            return response()->json([
                'status_code' => 200,
                'message' => 'Carte mise à jour avec succès.',
                'pokemon_card' => $pokemonCard
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status_code' => 404,
                'error' => 'Carte non trouvée.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status_code' => 500,
                'error' => 'Erreur lors de la mise à jour de la carte: ' . $e->getMessage()
            ]);
        }
    }

    public function addCardToUser(PokemonCard $pokemonCard)
    {
        $user = auth()->user();

        if (!$user || !$pokemonCard) {
            return response()->json(['error' => 'Utilisateur ou carte non trouvé(e).'], 404);
        }

        $cardId = $pokemonCard->id;

        if (!$user->pokemonCards()->where('pokemon_card_id', $cardId)->exists()) {
            $user->pokemonCards()->attach($cardId);

            return response()->json([
                'status_code' => 200,
                'message' => 'Carte ajoutée à l\'utilisateur avec succès.'
            ]);
        } else {
            return response()->json([
                'status_code' => 200,
                'message' => 'L\'utilisateur possède déjà cette carte.'
            ]);
        }
    }

    public function removeCardFromUser(PokemonCard $pokemonCard)
    {
        $user = auth()->user();

        try {
            $cardId = $pokemonCard->id;

            if ($user->pokemonCards()->where('pokemon_card_id', $cardId)->exists()) {
                $user->pokemonCards()->detach($cardId);

                return response()->json([
                    'status_code' => 200,
                    'message' => 'Carte retirée de la collection avec succès.'
                ]);
            } else {
                return response()->json([
                    'status_code' => 404,
                    'error' => 'Carte non trouvée dans la collection de l\'utilisateur.'
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'status_code' => 500,
                'error' => 'Erreur lors de la suppression de la carte de la collection: ' . $e->getMessage()
            ]);
        }
    }
}
