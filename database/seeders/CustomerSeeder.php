<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Kra8\Snowflake\Snowflake;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Customer::create([
            'id' => app(Snowflake::class)->next(),
            'full_name' => 'phuong',
            'phone' => '0388925219'
        ]);
    }
}
