<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentProducts>
 */
class PaymentProductsFactory extends Factory
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
            'product_id' => $this->faker->randomElement(Product::pluck('id')->toArray()),
            'payment_id' => $this->faker->randomElement(Payment::pluck('id')->toArray()),
            'quantity' => $this->faker->numberBetween(1, 10),
            'unit_price' => $this->faker->numberBetween(10000, 1000000),
            'total_price' => $this->faker->numberBetween(10000, 1000000),
        ];
    }
}
