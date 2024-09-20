<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AppointmentStaff>
 */
class AppointmentStaffFactory extends Factory
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
            'staff_id' => $this->faker->randomElement(User::pluck('id')->toArray())
        ];
    }
}
