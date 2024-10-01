<?php

namespace Database\Factories;

use App\Models\OutboundInvoice;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OutboundInvoiceDetail>
 */
class OutboundInvoiceDetailFactory extends Factory
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
            'outbound_invoice_id' => $this->faker->randomElement(array: OutboundInvoice::pluck('id')->toArray()),
            'quantity_export' => 3,
            'quantity_olded' => 10,
            'unit_price' => $this->faker->numberBetween(10000, 1000000),
        ];
    }
}
