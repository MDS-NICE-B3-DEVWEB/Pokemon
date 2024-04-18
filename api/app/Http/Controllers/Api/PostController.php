<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\EditPostRequest;
use App\Models\Post;
use Exception;
use Illuminate\Http\Request;


class PostController extends Controller
{
    public function index(Request $request)
    {  
        try{

            $query = Post::query();
            $perPage = 3; //Nombre d'élèments à recuperer par page  de donnée 
            $page = $request->input('page', 1); // Mets par defaut l'utilisateur a la page 1
            $search = $request->input('search');
    
            if($search){
                $query->whereRaw("titre Like '%". $search ."%'");
            }
    
            $total =$query->count(); 
    
            $result = $query->offset(($page-1) *$perPage)->limit($perPage)->get();
    

            return response()->json([
                'status_code'=>200,
                'status_message'=>'Les posts ont été récupérés',
                'current_page'=>$page,
                'last_page'=>ceil($total / $perPage),
                'items' => $result
            ]);


        }catch (Exception $e) {
            return response()->json($e); 
        }


    }


    public function store(CreatePostRequest $request)
    {

      try{  $post = new Post() ;
        $post->titre = $request-> titre ;
        $post->description= $request-> description ;
        $post->user_id = auth()->user()->id;
        $post->save();

        return response()->json([
                'status_code'=>200,
                'status_message'=>'Le post a été ajouté',
                'data'=>$post
        ]);
      }catch(Exception $e){
            
            return response()->json($e);

      }
    }

    public function update(EditPostRequest $request , Post $post)
    {
     try{

                //$post = Post::find($id); N'est plus utile car directement recupérer dans la fonction au dessus grace a (Post $post)

                 //dd($post) ;  Pour tester rapidement le contenu d'une variable (Dump and Die) Elle permet d'afficher du texte à l'écran et de terminer l'exécution du programme.

            $post->titre = $request-> titre;
            $post->description = $request-> description;
             
            if($post->user_id == auth()->user()->id){
                $post->save();
            }else{

                return response()->json([
                    'status_code'=>422,
                    'status_message'=>'Vous n\'avez pas le droit  de modifier ce post',
                ]);
            }

            return response()->json([
                'status_code'=>200,
                'status_message'=>'Le post a été modifié',
                'data'=>$post
            ]);
         } catch(Exception $e) {
                return response()->json($e); 
            }
    }


    public function delete(Post $post)
    {
            try{
                if($post->user_id == auth()->user()->id){
                    $post->delete();

                }else{

                    return response()->json([
                        'status_code'=>422,
                        'status_message'=>'Vous n\'etes pas l\'auteur de ce post vous ne pouvez pas le supprimer',
                    ]);
                }

                return response()->json([
                    'status_code'=>200,
                    'status_message'=>'Le post a été supprimer',
                    'data'=>$post
                ]);
            }catch(Exception $e){
                return response()->json($e); 
            }

    }


    // Grace a la  fonction (Post $post) pas la peine de faire des if else car elle fait deja la verif 
     /* public function delete(Post $post){
            try{
                if($post){
                    $post->delete(); 

                return response()->json([
                    'status_code'=>200,
                    'status_message'=>'Le post a été supprimer',
                    'data'=>$post
                ]);

                }else{
                    
                    $post->delete(); 

                return response()->json([
                    'status_code'=>422,
                    'status_message'=>'Enregistrement introuvable',
                    'data'=>$post
                 ]);
                    
                }


            }catch(Exception $e){
                return response()->json($e); 
            }

     }*/




}
