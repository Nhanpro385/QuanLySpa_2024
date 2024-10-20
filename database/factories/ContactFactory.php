<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
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
            'name' => $this->faker->name,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->email(),
            'evaluete' => $this->faker->numberBetween(0, 10),
            'note' => $this->faker->text(),
        ];
    }
}
