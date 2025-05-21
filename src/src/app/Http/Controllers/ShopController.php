<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Review;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::with(['reviews.user'])->get();

        $newReviews = Review::with(['shop', 'user'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Home', [
            'shops' => $shops,
            'newReviews' => $newReviews,
        ]);
    }

    public function detail($id)
    {
        $shop = Shop::with(['reviews.user'])->findOrFail($id);
        
        return Inertia::render('Shop/Detail', [
            'shop' => $shop,
        ]);
    }

    public function create(){
        return Inertia::render('Shop/Create');
    }

    public function store(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255', 
            'description' => 'required|string',
        ]);

        DB::beginTransaction();
        try {
            $shop = Shop::create([
                'name' => $request->name,
                'location' => $request->location,
                'description' => $request->description,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ]);

            if ($request->hasFile('images')) {
                $images = $request->file('images');
                foreach ($images as $image) {
                    // Get image extension
                    $extension = $image->getClientOriginalExtension();
                    // Generate random string
                    $random = Str::random(16);
                    // Generate filename
                    $fileName = $shop->id . '_' . $random . '.' . $extension;
                    
                    // Save image metadata
                    $shop->images()->create([
                        'shop_id' => $shop->id,
                        'file_name' => $fileName,
                        'file_path' => 'storage/shop_image/' . $fileName,
                        'file_type' => $image->getClientMimeType(),
                        'file_size' => $image->getSize(),
                        'file_extension' => $extension,
                        'file_mime' => $image->getClientMimeType(),
                        'file_original_name' => $image->getClientOriginalName(),
                        'file_original_extension' => $image->getClientOriginalExtension(),
                    ]);
                    
                    // Store physical file
                    $image->storeAs('public/shop_image', $fileName);
                }
            }

            DB::commit();
            return redirect()->route('home', ['status' => 'shop-created']);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            DB::rollBack();
            throw $e;
        }
    }
}
