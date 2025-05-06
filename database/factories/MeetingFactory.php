<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Meeting>
 */
class MeetingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_uz' => $this->faker->sentence(5),
            'name_en' => $this->faker->sentence(5),
            'meeting_at' => $this->faker->dateTimeBetween('+1 week', '+1 year')->format('Y-m-d'),
        ];
    }
}
