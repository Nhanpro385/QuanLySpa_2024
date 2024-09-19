<?php

namespace Database\Factories;

use App\Models\ServiceCategory;
use App\Models\Staff;
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
            'price' => $this->faker->numberBetween(1000, 99999999),
            'description' => $this->faker->text(),
            'image_url' => 'http',
            'duration' => $this->faker->numberBetween(10, 120),
            'created_by' => $this->faker->randomElement(Staff::pluck('id')->toArray())
        ];
    }
}
