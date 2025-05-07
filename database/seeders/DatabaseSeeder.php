<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesSeeder::class);
        User::factory()->create([
            'firstname' => 'Admin',
            'lastname' => 'Adminov',
            'login' => 'admin',
            'role_id' => 1
        ]);

        User::factory()->create([
            'firstname' => 'Moderator',
            'lastname' => 'Moderatorov',
            'login' => 'moderator',
            'role_id' => 2
        ]);

        User::factory()->create([
            'firstname' => 'User',
            'lastname' => 'Userov',
            'login' => 'user',
            'role_id' => 3
        ]);

        User::factory()->create([
            'firstname' => 'Alisher',
            'lastname' => 'Fayzullayev',
            'login' => 'a.fayzullayev',
            'role_id' => 3
        ]);


        $this->call(MeetingsSeeder::class);
    }
}
