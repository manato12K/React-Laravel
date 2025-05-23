<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ReviewController;

// Basic routes
Route::get('/', [ShopController::class, 'index'])->name('home');

// Shop routes - 詳細表示は認証不要

// Authenticated routes
Route::middleware(['auth'])->group(function () {
    Route::get('/shop/create', [ShopController::class, 'create'])->name('shop.create');
    Route::get('/shop/{id}', [ShopController::class, 'detail'])->name('shop.detail');
    Route::post('/shop/store', [ShopController::class, 'store'])->name('shop.store');
    // 削除用のルートはPOSTまたはDELETEメソッドに変更し、URLパスも変更
    Route::delete('/shop/{id}/delete', [ShopController::class, 'delete'])->name('shop.delete');
});

// Authenticated and verified routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Review routes
Route::get('/review/create/shop/{id}', [ReviewController::class, 'create'])->name('review.create');
Route::post('/review/store', [ReviewController::class, 'store'])->name('review.store');
Route::get('/review/{id}', [ReviewController::class, 'edit'])->name('review.edit');
Route::put('/review/{id}', [ReviewController::class, 'update'])->name('review.update');

// Include additional route files
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
