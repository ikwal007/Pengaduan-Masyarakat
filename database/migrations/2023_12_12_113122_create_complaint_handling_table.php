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
        Schema::create('complaint_handling', function (Blueprint $table) {
            $table->foreignUlid('complaint_id')->constrained(table: 'complaints', column: 'id', indexName: 'complaint_id');
            $table->foreignUlid('seksi_id')->constrained(table: 'seksis', column: 'id', indexName: 'seksi_id');
            $table->ulid('id')->primary()->unique();
            $table->foreignUlid('status_id')->constrained(table: 'complaint_statuses', column: 'id', indexName: 'status_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaint_handling');
    }
};
