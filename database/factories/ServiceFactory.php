<?php

namespace Database\Factories;

use App\Models\ServiceCategory;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
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
            'service_category_id' => $this->faker->randomElement(ServiceCategory::pluck('id')->toArray()),
            'name' => $this->faker->name(),
            'price' => $this->faker->numberBetween(1000, 1000000),
            'description' => $this->faker->text(),
            'priority' => $this->faker->numberBetween(0, 10),
            'duration' => $this->faker->numberBetween(10, 120),
            'created_by' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'updated_by' => $this->faker->randomElement(User::pluck('id')->toArray())
        ];
    }
}
