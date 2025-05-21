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

    public function saveShop($data)
    {
        $this->name = $data->name;
        $this->location = $data->location;
        $this->description = $data->description;
        $this->create_by = $data->created_by;
        $this->updated_by = $data->updated_by;

        $this->save();

        return $this;
    }
}
