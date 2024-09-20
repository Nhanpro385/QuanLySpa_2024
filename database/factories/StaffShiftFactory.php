<?php

namespace Database\Factories;

use App\Models\Shift;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StaffShift>
 */
class StaffShiftFactory extends Factory
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
            'shift_id' => $this->faker->randomElement(Shift::pluck('id')->toArray())
        ];
    }
}
