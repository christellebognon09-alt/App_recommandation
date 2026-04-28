<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlaceController extends Controller
{
    public function index()
    {
        return Place::with(['category', 'user'])
            ->withCount('reviews')
            ->get()
            ->map(function ($place) {
                $place->average_rating = $place->averageRating();
                return $place;
            });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $validated['user_id'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('places', 'public');
            $validated['image'] = $path;
        }

        $place = Place::create($validated);

        return response()->json($place, 201);
    }

    public function show($id)
    {
        $place = Place::with(['category', 'user', 'reviews.user', 'photos'])->findOrFail($id);
        $place->average_rating = $place->averageRating();
        return $place;
    }

    public function update(Request $request, $id)
    {
        $place = Place::findOrFail($id);

        if ($place->user_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'latitude' => 'sometimes|numeric',
            'longitude' => 'sometimes|numeric',
            'category_id' => 'sometimes|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($place->image) {
                Storage::disk('public')->delete($place->image);
            }
            $path = $request->file('image')->store('places', 'public');
            $validated['image'] = $path;
        }

        $place->update($validated);

        return response()->json($place);
    }

    public function destroy($id)
    {
        $place = Place::findOrFail($id);

        if ($place->user_id !== auth()->user()->id && auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($place->image) {
            Storage::disk('public')->delete($place->image);
        }

        $place->delete();

        return response()->json(['message' => 'Place deleted successfully']);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');
        return Place::where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->with('category')
            ->get();
    }

    public function filterByCategory($categoryId)
    {
        return Place::where('category_id', $categoryId)
            ->with(['category', 'user'])
            ->get();
    }
}
