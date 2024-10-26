<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Product;
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
            'type' => $this->faker->mimeType(),
            'notifiable_id' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'notifiable_type' => 'notifiable',
            'data' => 'Thong bao moi.',
            'read_at' => $this->faker->dateTime(),
        ];
    }
}
