<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Promotion;
use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
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
            'promotion_id' => $this->faker->randomElement(Promotion::pluck('id')->toArray()),
            'appointment_id' => $this->faker->randomElement(Appointment::pluck('id')->toArray()),
            'pay' => $this->faker->numberBetween(10000, 100000000),
            'reduce' => $this->faker->numberBetween(10000, 100000),
            'total_amount' => $this->faker->numberBetween(10000, 100000000),
            'payment_type' => $this->faker->randomElement(['cash', 'transfer']),
            'created_by' => $this->faker->randomElement(Staff::pluck('id')->toArray())
        ];
    }
}
