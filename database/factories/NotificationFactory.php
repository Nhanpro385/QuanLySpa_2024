<?php

namespace Database\Factories;

use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
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
            'notification_type' => $this->faker->randomElement(['create', 'update', 'destroy']),
            'content' => $this->faker->sentence(),
            'url_notification' => 'http://',
            'pin' => $this->faker->randomElement(['0', '1']),

        ];
    }
}
