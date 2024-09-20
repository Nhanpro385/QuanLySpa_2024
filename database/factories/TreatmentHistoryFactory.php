<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Service;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TreatmentHistory>
 */
class TreatmentHistoryFactory extends Factory
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
            'service_id' => $this->faker->randomElement(Service::pluck('id')->toArray()),
            'customer_id' => $this->faker->randomElement(Customer::pluck('id')->toArray()),
            'appointment_id' => $this->faker->randomElement(Appointment::pluck('id')->toArray()),
            'staff_id' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'image_before' => 'mau',
            'image_after' => 'mau',
            'feedback' => 'mau',
            'note' => 'mau',
            'created_by' => $this->faker->randomElement(User::pluck('id')->toArray())
        ];
    }
}
