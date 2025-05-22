<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Review;
use App\Models\User;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'description',
        'created_by',
        'updated_by',
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shopImages()
    {
        return $this->hasMany(ShopImage::class);
    }

    public function saveShop($data)
    {
        $this->fill([
            'name' => $data['name'],
            'location' => $data['location'],
            'description' => $data['description'],
            'created_by' => $data['created_by'],
            'updated_by' => $data['updated_by']
        ]);

        $this->save();

        return $this;
    }
}
