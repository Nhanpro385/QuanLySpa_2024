<?php

namespace Database\Factories;

use App\Models\InboundInvoice;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InboundInvoiceDetail>
 */
class InboundInvoiceDetailFactory extends Factory
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
            'inbound_invoice_id' => $this->faker->randomElement(InboundInvoice::pluck('id')->toArray()),
            'quantity_olded' => 1,
            'quantity_import' => 2,
            'cost_import' => $this->faker->numberBetween(10000, 100000),
            'cost_olded' => $this->faker->numberBetween(10000, 100000),
            'unit_price' => $this->faker->numberBetween(10000, 100000),
        ];
    }
}
