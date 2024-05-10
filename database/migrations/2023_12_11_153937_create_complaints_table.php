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
        Schema::create('complaints', function (Blueprint $table) {
            $table->ulid('id')->primary()->unique();
            $table->foreignUlid('complaint_type_id')->constrained(table: 'complaint_types', column: 'id', indexName: 'complaint_type_id');
            $table->foreignUlid('complaint_media_types_id')->constrained(table: 'complaint_media_types', column: 'id', indexName: 'complaint_media_types_id');
            $table->foreignUlid('user_email')->nullable()->constrained(table: 'users', column: 'email', indexName: 'user_email');
            $table->foreignUlid('complaint_village_id')->constrained(table: 'villages', column: 'id', indexName: 'village_id');
            $table->foreignUlid('complaint_subdistrict_id')->constrained(table: 'subdistricts', column: 'id', indexName: 'complaint_subdistrict_id');
            $table->string('certificate_no');
            $table->text('description');
            $table->foreignUlid('complaint_statuses_id')->constrained(table: 'complaint_statuses', column: 'id', indexName: 'complaint_statuses_id');
            $table->boolean('confirmed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
