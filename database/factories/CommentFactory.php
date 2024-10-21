<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Kra8\Snowflake\Snowflake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
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
            'parent_comment_id' => null,
            'comment' => 'comment',
            'rate' => 5,
            'created_by' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'updated_by' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'type' => $this->faker->boolean()
        ];
    }
}
