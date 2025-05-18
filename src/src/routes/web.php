<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ShopController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/sample', function () {
    return Inertia::render('Sample');
})->name('sample');

Route::get('/shop/{id}', [ShopController::class, 'detail'])->name('shop.detail');


Route::get('/home' ,[ShopController::class, 'index'])->name('shop.index');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
