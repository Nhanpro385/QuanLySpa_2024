<?php

namespace Database\Factories;

use App\Models\Staff;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InboundInvoice>
 */
class InboundInvoiceFactory extends Factory
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
            'staff_id' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'supplier_id' => $this->faker->randomElement(Supplier::pluck('id')->toArray()),
            'note' => 'null',
            'total_amount' => $this->faker->numberBetween(100000, 1000000),

        ];
    }
}
