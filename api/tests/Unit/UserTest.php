<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
Use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanRegister()
    {
        $userData = [
            'name' => 'fred',
            'email' => 'Test2@example.com',
            'password' => 'Password*1', 
        ];

        $response = $this->postJson('/api/register', $userData
);
        $response->dump(); // Ajoutez cette ligne

        $response
    ->assertStatus(200)  ;
    }
}