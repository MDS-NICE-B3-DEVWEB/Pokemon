# Pokemon API REST Backend (Laravel)

Bienvenue dans l'API de mon application sur Pokemon ! Cette partie du projet est construite avec Laravel pour fournir une API robuste et sécurisée.Pour voir toutes les fonctionnalitées allez sur la branche V2-Test du projet.

## Configuration initiale

Assurez-vous d'avoir PHP, Composer, et MySQL installés sur votre machine.

# Installation des dépendances
```bash 
composer install
```

# Configuration de l'environnement
```bash 
cp .env.example .env
```

# Génération de la clé d'application
```bash 
php artisan key:generate
```

# Exécution des migrations pour créer la structure de la base de données
```bash
php artisan migrate
```
Scripts disponibles
Dans le répertoire du projet, vous pouvez exécuter les scripts suivants :

# Lancement du serveur de développement
```bash
php artisan serve
```

# Exécution des tests
```bash
php artisan test
```
Structure du projet

app/ : Contient les fichiers source de l'application Laravel.
database/migrations/ : Définit la structure des données de l'application en utilisant les migrations Laravel.
routes/ : Définit les points de terminaison de l'API en associant les routes aux contrôleurs correspondants.

Configuration de l'environnement
```bash 
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=pokemon
DB_USERNAME=Hugo
DB_PASSWORD=1!xjpm$2
```
Utilisation de l'API

Inscription d'un nouvel utilisateur :
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "votre_nom", "email": "votre_email", "password": "votre_mot_de_passe"}' http://159.89.109.88:8000/api/register
```

Connexion d'un utilisateur :
```bash 
curl -X GET -H "Content-Type: application/json" -d '{"email": "votre_email", "password": "votre_mot_de_passe"}' http://159.89.109.88:8000/api/login
```

Liée une Carte à un utilisateur :
```bash
curl -X POST -d  "Authorization: Bearer VOTRE_TOKEN" -H "Content-Type: application/json"'{"pokemoncard_id": "id de la carte liée a l'id de l'user"} http://159.89.109.88:8000/api/user/add-card/{pokemonCard}
```

Supprimer une carte de la collection d'un utilisateur :
```bash
curl -X DELETE -d  "Authorization: Bearer VOTRE_TOKEN" -H "Content-Type: application/json"'{"pokemoncard_id": "id de la carte supprimer a l'id de l'user"} http://159.89.109.88:8000/api/user/remove-card/1

```

Retourner les informations des posts :
```bash
curl -X GET -H '{"{ID} est pour changer de page 4 posts par page"} http://159.89.109.88:8000/api/posts?page={ID}
```

Créer un nouveau post :
```bash
curl -X POST -H "Authorization: Bearer VOTRE_TOKEN" -H "Content-Type: application/json" -d '{"title": "titre_du_post", "content": "contenu_du_post"}' http://159.89.109.88:8000/api/posts/create
```

Supprime un post :
```bash
curl -X DEL -H '"Authorization: Bearer VOTRE_TOKEN" -H "Content-Type: application/json" http://159.89.109.88:8000/api/posts/{post}
```
Modifie un post :
```bash
curl -X PUT -H "Authorization: Bearer VOTRE_TOKEN" -H "Content-Type: application/json" -d '{"title": "nouveau_titre_du_post", "content": "nouveau_contenu_du_post"}' http://159.89.109.88:8000/api/posts/edit/{post}
```

Collection des routes API PostMan/Insomnia ...
[Api_Route_Insomina…] 

Auteur
Hugo Khaled--Brotons

Licence
Ce projet est sous licence MIT