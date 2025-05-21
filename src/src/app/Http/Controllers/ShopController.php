<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Review;
use Inertia\Inertia;

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

    public function store (Request $request) {

        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $shopModel = new Shop();

        $shop = $shopModel->saveShop([
            'name' => $request->name,
            'location' => $request->location,
            'description' => $request->description,
        ]);

        if($shop) {
            $status = 'shop-created';
        }

        return redirect()->route('home',['status' => $status]);
    }
}
