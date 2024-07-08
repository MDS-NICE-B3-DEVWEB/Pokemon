<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\EditPostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;

class PostController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Post::query();
            $perPage = 3; // Nombre d'éléments à récupérer par page de données
            $page = $request->input('page', 1); // Mets par défaut l'utilisateur à la page 1
            $search = $request->input('search');

            if ($search) {
                $query->where('titre', 'LIKE', "%{$search}%");
            }

            if (!Auth::user()->can('manage posts')) {
                $query->where('user_id', Auth::id()); // Limite les résultats aux posts de l'utilisateur si non-admin
            }

            $total = $query->count();
            $result = $query->offset(($page-1) * $perPage)->limit($perPage)->get();

            return response()->json([
                'status_code' => 200,
                'status_message' => 'Les posts ont été récupérés',
                'current_page' => $page,
                'last_page' => ceil($total / $perPage),
                'items' => $result
            ],200);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    public function store(CreatePostRequest $request)
{
    if (!Auth::check()) { // Vérifie si l'utilisateur est connecté
        return response()->json([
            'status_code' => 401,
            'status_message' => 'Non autorisé : Vous devez être connecté pour créer un post',
        ], 401);
    }

    try {
        $post = new Post([
            'titre' => $request->titre,
            'description' => $request->description,
            'user_id' => Auth::id(),
            'created_at' => now(),
            'updated_at' => now()
        ]);
        $post->save();

        return response()->json([
            'status_code' => 201,
            'status_message' => 'Le post a été ajouté',
            'data' => $post
        ], 201);
    } catch (Exception $e) {
        return response()->json($e->getMessage(), 500);
    }
}

    public function update(EditPostRequest $request, Post $post)
    {
        try {
            if ($post->user_id == Auth::id() || Auth::user()->can('manage posts')) {
                $post->update([
                    'titre' => $request->titre,
                    'description' => $request->description
                ]);

                return response()->json([
                    'status_code' => 201,
                    'status_message' => 'Le post a été modifié',
                    'data' => $post
                ], 201);
            } else {
                return response()->json([
                    'status_code' => 403,
                    'status_message' => 'Vous n\'avez pas le droit de modifier ce post',
                ], 403);
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    public function delete(Post $post)
    {
        try {
            if ($post->user_id == Auth::id() || Auth::user()->can('manage posts')) {
                $post->delete();

                return response()->json([
                    'status_code' => 201,
                    'status_message' => 'Le post a été supprimé',
                ], 201);
            } else {
                return response()->json([
                    'status_code' => 403,
                    'status_message' => 'Vous n\'êtes pas l\'auteur de ce post et ne pouvez pas le supprimer',
                ], 403);
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
