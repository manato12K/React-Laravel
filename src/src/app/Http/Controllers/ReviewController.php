<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Shop;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function create($id) 
    {
        $shop = Shop::find($id);
        return Inertia::render('Review/Create', [
            'shop' => $shop,
        ]);
    }

    public function store(Request $request) 
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:255',
            'shop_id' => 'required|integer',
           'user_id' =>'required|integer',
        ]);
        try {
            $review = new Review();
            $review->saveReview($request);
            return redirect()
                ->route('shop.detail', ['id' => $request->shop_id])
                ->with('success', 'レビューを投稿しました。');
        } catch (\Exception $e) {
            return redirect()
                ->route('review.create')->with('error', 'レビュー投稿に失敗しました。');
        }
    }
}
