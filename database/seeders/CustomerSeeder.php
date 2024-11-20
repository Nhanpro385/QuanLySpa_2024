<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
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
            'full_name' => "Test Customer",
            'password' => Hash::make('password'),
            'email' => "voduyphuong13@gmail.com",
            'phone' => "0388925209",
            'address' => "An Giang",
            'date_of_birth' => "2004-01-06",
            'note' => "",
            'gender' => 0,
            'created_by' => null,
            'updated_by' => null
        ]);
    }
}
