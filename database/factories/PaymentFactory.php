<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Promotion;
use App\Models\Staff;
use App\Models\User;
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
        $product_total = $this->faker->numberBetween(10000, 1000000);
        $service_total = $this->faker->numberBetween(10000, 1000000);
        $reduce = $this->faker->numberBetween(10000, 100000);
        return [
            'id' => app(Snowflake::class)->next(),
            'promotion_id' => $this->faker->randomElement(Promotion::pluck('id')->toArray()),
            'appointment_id' => $this->faker->randomElement(Appointment::pluck('id')->toArray()),
            'service_total' => $service_total,
            'product_total' => $product_total,
            'subtotal' => $service_total + $product_total,
            'reduce' => $reduce,
            'total_amount' => ($service_total + $product_total) - $reduce,
            'payment_type' => $this->faker->numberBetween(0, 1),
            'created_by' => $this->faker->randomElement(User::pluck('id')->toArray())
        ];
    }
}
