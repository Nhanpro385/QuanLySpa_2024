<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AppointmentService>
 */
class AppointmentServiceFactory extends Factory
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
            'appointment_id' => $this->faker->randomElement(Appointment::pluck('id')->toArray()),
            'service_id' => $this->faker->randomElement(Service::pluck('id')->toArray()),
            'quantity' => 1,
            'price' => $this->faker->numberBetween(10000, 1000000)
        ];
    }
}
