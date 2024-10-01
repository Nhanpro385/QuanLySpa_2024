<?php

namespace Database\Factories;

use App\Models\Position;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Staff>
 */
class StaffFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected static ?string $password;
    public function definition(): array
    {

        return [
            'id' => app(Snowflake::class)->next(),
            'position_id' => $this->faker->randomElement(Position::pluck('id')->toArray()),
            'name' => $this->faker->userName(),
            'password' => static::$password ??= Hash::make('password'),
            'role' => 'staff',
            'full_name' => $this->faker->name(),
            'gender' => 'female',
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'address' => $this->faker->address(),
            'date_of_birth' => $this->faker->date(),
            'note' => $this->faker->text(),
        ];
    }
}
