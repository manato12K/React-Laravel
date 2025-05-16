<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Shop;
use App\Models\Review;
use App\Models\User;

class ShopTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_displays_shops_and_reviews()
    {
        // ユーザーとショップを作成
        $user = User::factory()->create();
        $shops = Shop::factory()->count(2)->create(['name' => 'TestShop']);
        $reviews = Review::factory()->count(2)->create([
            'user_id' => $user->id,
            'shop_id' => $shops[0]->id,
            'comment' => 'TestComment',
        ]);

        // /home にアクセス
        $response = $this->get('/home');

        // ステータス200を確認
        $response->assertStatus(200);

        // ショップ名が表示されているか確認
        foreach ($shops as $shop) {
            $response->assertSee($shop->name);
        }

        // レビューコメントが表示されているか確認
        foreach ($reviews as $review) {
            $response->assertSee($review->comment);
        }
    }
}
