<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\TreatmentHistory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TreatmentProduct>
 */
class TreatmentProductFactory extends Factory
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
            'treatment_history_id' => $this->faker->randomElement(array: TreatmentHistory::pluck('id')->toArray()),
            'product_id' => $this->faker->randomElement(Product::pluck('id')->toArray()),
            'quantity_used' => 1
        ];
    }
}
