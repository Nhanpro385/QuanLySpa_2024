<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Consulation>
 */
class ConsulationFactory extends Factory
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
            'customer_id' => $this->faker->randomElement(Customer::pluck('id')->toArray()),
            'staff_id' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'consulation' => $this->faker->text(),
            'skin_condition' => $this->faker->text(),
            'treatment_plan' => $this->faker->text(),
            'created_by' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'updated_by' => $this->faker->randomElement(User::pluck('id')->toArray())
        ];
    }
}
