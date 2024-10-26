<?php

namespace Database\Factories;

use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceCategory>
 */
class ServiceCategoryFactory extends Factory
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
            'description' => $this->faker->sentence(),
            'created_by' => $this->faker->randomElement(User::pluck('id')->toArray())
        ];
    }
}
