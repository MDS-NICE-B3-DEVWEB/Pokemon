<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LogUserRequest;
use App\Http\Requests\RegisterUser;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
//use App\Models\PokemonCard;
use Exception;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Méthode pour l'enregistrement des utilisateurs
    public function register(RegisterUser $request)
    {
        try {
            $user = new User();
            $user->name = e($request->name);
            $user->email = e($request->email);
            $user->password = Hash::make($request->password, ['rounds' => 12]);
            $user->save();

            return response()->json([
                'status_code' => 201,
                'status_message' => 'Utilisateur enregistré avec succès',
                'user' => $user,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status_code' => 500,
                'error' => 'Erreur lors de l\'enregistrement: ' . $e->getMessage()
            ]);
        }
    }

    // Méthode pour la connexion des utilisateurs
    public function login(LogUserRequest $request)
    {
        try {
            if (auth()->attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $token = $user->createToken('clefsecrete')->plainTextToken;
                return response()->json([
                    'status_code' => 200,
                    'status_message' => 'Utilisateur connecté.',
                    'user' => $user,
                    'token' => $token,
                ]);
            } else {
                return response()->json([
                    'status_code' => 403,
                    'status_message' => 'Informations non valides.',
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'status_code' => 500,
                'status_message' => 'Une erreur est survenue',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function assignRole(Request $request, User $user)
{
    $roleName = $request->input('role'); 
    $user->assignRole($roleName);

    return response()->json([
        'message' => "Role '{$roleName}' assigned successfully to user {$user->email}"
    ]);
}


public function deleteRole(Request $request, User $user)
{
    // Assurez-vous que l'utilisateur connecté a le rôle 'supermodo'
    if (!auth()->user()->hasRole('super modo')) {
        return response()->json([
            'status_code' => 403,
            'message' => "Action non autorisée. Vous devez avoir le rôle de supermodo pour effectuer cette action.",
        ], 403);
    }

    // Vérifiez si l'utilisateur à modifier a le rôle spécifié
    $roleName = $request->input('role');
    if (!$roleName) {
        return response()->json([
            'status_code' => 400,
            'message' => 'Aucun rôle spécifié dans la requête.',
        ], 400);
    }

    if ($user->hasRole($roleName)) {
        $user->removeRole($roleName); // Retirer le rôle spécifié
        return response()->json([
            'status_code' => 200,
            'message' => "Rôle '{$roleName}' retiré avec succès de l'utilisateur {$user->email}.",
        ], 200);
    } else {
        return response()->json([
            'status_code' => 404,
            'message' => "L'utilisateur spécifié n'a pas le rôle '{$roleName}'. Vérifiez si le rôle est correctement attribué à cet utilisateur.",
        ], 404);
    }
}

    // Méthode pour ajouter une carte à la collection de l'utilisateur
    // public function addCardToCollection(Request $request)
    // {
    //     try {
    //         $user = auth()->user(); // Assurez-vous que l'utilisateur est authentifié
    //         $cardId = $request->card_id;

    //         // Vérifiez si l'utilisateur a déjà cette carte
    //         if (PokemonCard::contains($cardId, 'pokemon_card_id')::where('pokemon_card_id', $cardId)->exists()) { 
    //             return response()->json(['message' => 'La carte est déjà dans la collection.']);
    //         }

    //         PokemonCard::where('pokemon_card_id', $cardId)->update(['user_id' => $user->id]);
    //         return response()->json(['message' => 'Carte ajoutée à la collection.']);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'status_code' => 500,
    //             'error' => 'Erreur lors de l\'ajout de la carte: ' . $e->getMessage()
    //         ]);
    //     }
    // }
}
