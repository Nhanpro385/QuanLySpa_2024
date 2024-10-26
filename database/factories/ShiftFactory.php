<?php

namespace Database\Factories;

use App\Models\Staff;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shift>
 */
class ShiftFactory extends Factory
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
            'shift_date' => $this->faker->unique()->dateTimeBetween('now', '+10 days')->format('Y-m-d'),
            'note' => $this->faker->text(),
            'created_by' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'updated_by' => $this->faker->randomElement(User::pluck('id')->toArray()),
        ];
    }
}
