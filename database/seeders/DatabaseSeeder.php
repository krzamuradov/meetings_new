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

        $this->call(MeetingsSeeder::class);
    }
}
