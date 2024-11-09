<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
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
            'category_id' => $this->faker->randomElement(Category::pluck('id')->toArray()),
            'name' => $this->faker->name(),
            'price' => $this->faker->numberBetween(1000, 1000000),
            'cost' => $this->faker->numberBetween(100, 1000000),
            'capacity' => $this->faker->numberBetween(100, 3000),
            'bar_code' => $this->faker->numberBetween(444444444444, 999999999999),
            'priority' => $this->faker->numberBetween(0, 10),
            'date' => $this->faker->dateTime(),
            'description' => $this->faker->text(),
            'created_by' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'updated_by' => $this->faker->randomElement(User::pluck('id')->toArray())
        ];
    }
}
