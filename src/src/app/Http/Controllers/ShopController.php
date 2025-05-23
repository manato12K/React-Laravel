<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Review;
use App\Models\ShopImage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $query = Shop::with(['reviews.user']);
    
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where('name', 'like', '%' . $searchTerm . '%');
        }
    
        $shops = $query->get(); // ← get()は最後に呼ぶ
    
        $newReviews = Review::with(['shop', 'user'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
    
        return Inertia::render('Home', [
            'shops' => $shops,
            'newReviews' => $newReviews,
            'search' => $request->input('search', ''),
        ]);
    }

    public function detail($id)
    {
        $shop = Shop::with(['reviews.user', 'shopImages'])->findOrFail($id);
        
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
                    $shopImageModel = new ShopImage();
                    $shopImageModel->saveImage([
                        'shop_id' => $shop->id,
                        'file_name' => $fileName,
                        'file_path' => 'shop_image/' . $fileName,  // 'storage/'を削除
                        'file_type' => $image->getClientMimeType(),
                        'file_size' => $image->getSize(),
                        'file_extension' => $extension,
                        'file_mime' => $image->getClientMimeType(),
                        'file_original_name' => $image->getClientOriginalName(),
                        'file_original_path' => 'N/A', // ← ここを追加または固定値に
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
    public function delete($id)
    {
        $shop = Shop::findOrFail($id);
        $shop->delete();
        return redirect()->route('home')->with('success', '店舗を削除しました。');
    }
}
