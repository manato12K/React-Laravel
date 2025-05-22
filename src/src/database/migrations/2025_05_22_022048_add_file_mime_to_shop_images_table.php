<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('shop_images', function (Blueprint $table) {
        $table->string('file_mime')->nullable(); // MIMEタイプは string で十分
    });
}

public function down(): void
{
    Schema::table('shop_images', function (Blueprint $table) {
        $table->dropColumn('file_mime');
    });
}
};
