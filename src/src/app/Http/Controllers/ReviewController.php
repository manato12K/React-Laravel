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
                ->route('review.create', ['id' => $request->shop_id])
                ->with('error', 'レビュー投稿に失敗しました。');
        }
    }

    public function edit ($id) 
    {
        $review = Review::find($id);
        return Inertia::render('Review/Edit',
        [
            'review' => $review,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'rating' =>'required|integer|min:1|max:5',
            'comment' =>'required|string|max:255',
        ]);
    
        $review = Review::findOrFail($id);
        $review->updateReview($request);
        return redirect()
            ->route('shop.detail', ['id' => $review->shop_id])
            ->with('success', 'レビューを更新しました。');
    }
    public function destroy(Request $request)
    {
        $reviewModel = new Review();
        $reviewModel->deleteReview($request);
        return redirect()
            ->route('shop.detail', ['id' => $request->shop_id])
            ->with('success', 'レビューを削除しました。');
    }
}
