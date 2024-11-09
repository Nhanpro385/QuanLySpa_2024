<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Position>
 */
class PositionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => app(Snowflake::class)->next(),
            'name' => $this->faker->name(),
            'wage' => $this->faker->randomFloat(2, 1000, 10000000),
            'note' => $this->faker->sentence(),
        ];
    }
}
