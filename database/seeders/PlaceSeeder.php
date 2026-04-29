<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Place;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
{
    Place::create([
        'name' => 'Espace Sobebra',
        'category' => 'Sport',
        'city' => 'Cotonou',
        'latitude' => 6.3686,
        'longitude' => 2.4411,
        'description' => 'Espace de sport et détente.',
    ]);

    Place::create([
        'name' => 'Clinique Bethesda',
        'category' => 'Santé',
        'city' => 'Cotonou',
        'latitude' => 6.3750,
        'longitude' => 2.4250,
        'description' => 'Établissement de soins médicaux.',
    ]);
}
}
