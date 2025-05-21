<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ReviewController;


// Route::get('/', function () {
//     return Inertia::render('Home');
// })->name('shop.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::get('/' ,[ShopController::class, 'index'])->name('home');

Route::get('/sample', function () {
    return Inertia::render('Sample');
})->name('sample');




Route::middleware(['auth'])->group(function () {
    Route::get('/shop/create', [ShopController::class, 'create'])->name('shop.create');
    Route::post('/shop/store', [ShopController::class, 'store'])->name('shop.store');
});

Route::get('/shop/{id}', [ShopController::class, 'detail'])->name('shop.detail');



Route::get('/review/create/shop/{id}', [ReviewController::class, 'create'])->name('review.create');
Route::post('/review/store', [ReviewController::class, 'store'])->name('review.store');
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
