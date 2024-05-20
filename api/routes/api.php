<?php

use App\Http\Controllers\Api\PokemonCardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CollectionController;

// Vos routes...
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Crée un lien qui permettra aux clients de se connecter  que ce sois avec : React , Angullar , Node ...

//Ajouter un post   GET / POST / PUT / DELETE



// Limite de débit spécifique pour l'inscription et la connexion
Route::middleware('throttle:10,1')->group(function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
});

Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    // Limite de débit pour la récupération des posts
    Route::get('posts', [PostController::class, 'index']);

    // Modifier un post 
    Route::put('posts/edit/{post}', [PostController::class, 'update']);

    // Ajouter un post 
    Route::post('posts/create' , [PostController::class , 'store']);

    // Supprimer un post
    Route::delete('posts/{post}', [PostController::class, 'delete']);
});


// Groupe de routes protégées par le middleware d'authentification Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Route pour voir la collection de l'utilisateur
    Route::get('/collections', [CollectionController::class, 'index']);

    // Route pour ajouter une carte à la collection de l'utilisateur
    Route::post('/collections/add', [CollectionController::class, 'addToCollection']);
    
    // Route pour supprimer une carte spécifique de la collection de l'utilisateur
    Route::delete('/collections/{id}', [CollectionController::class, 'destroy']);
});



// Route pour gérer les roles et permissions
Route::post('/users/{user}/assign-role', [UserController::class, 'assignRole'])
    ->middleware(['auth:sanctum', 'role:super modo']);

Route::delete('/users/{user}/remove-role', [UserController::class, 'deleteRole'])
    ->middleware(['auth:sanctum', 'role:super modo']);





Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {

    // Ajouter une carte à la collection d'un utilisateur
    Route::post('/user/add-card/{pokemonCard}', [PokemonCardController::class, 'addCardToUser']);

    // Supprimer une carte de la collection d'un utilisateur
    //A revoir pour la suppression de la carte
    Route::delete('/user/remove-card/{pokemonCard}', [PokemonCardController::class, 'removeCardFromUser']);


    //retourne les infos de l'utilisateur connecté .
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
