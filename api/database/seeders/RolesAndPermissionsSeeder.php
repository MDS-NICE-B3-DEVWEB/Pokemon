<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Création des permissions
        $permissionViewCollections = Permission::create(['name' => 'view collections']);
        $permissionManageChat = Permission::create(['name' => 'manage chat']);
        $permissionAssignAdmin = Permission::create(['name' => 'assign admin role']);

        // Création des rôles
        $roleAdmin = Role::create(['name' => 'admin normal']);
        $roleSuperModo = Role::create(['name' => 'super modo']);

        // Assignation des permissions aux rôles
        $roleAdmin->givePermissionTo([$permissionViewCollections->name, $permissionManageChat->name]);
        $roleSuperModo->givePermissionTo([$permissionViewCollections->name, $permissionManageChat->name, $permissionAssignAdmin->name]);
    }
}
