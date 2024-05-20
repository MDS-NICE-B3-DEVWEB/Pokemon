<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        $user = User::find(4); // Assurez-vous que l'utilisateur existe
        $user->assignRole('super modo'); // Assurez-vous que le rôle existe
    }
}
