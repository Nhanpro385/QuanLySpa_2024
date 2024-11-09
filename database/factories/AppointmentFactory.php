<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Shift;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
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
            'shift_id' => $this->faker->randomElement(Shift::pluck('id')->toArray()),
            'customer_id' => $this->faker->randomElement(Customer::pluck('id')->toArray()),
            'start_time' => $this->faker->time(),
            'note' => $this->faker->text(),
            'status' => $this->faker->numberBetween(0, 3),
            'appointment_date' => $this->faker->unique()->dateTimeBetween('now', '+10 days')->format('Y-m-d'),
            'created_by' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'updated_by' => $this->faker->randomElement(User::pluck('id')->toArray())
        ];
    }
}
