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
        Schema::create('complaint_types_has_seksis', function (Blueprint $table) {
            $table->ulid('complaint_type_id');
            $table->ulid('seksi_id');
            $table->timestamps();

            $table->foreign('complaint_type_id')->references('id')->on('complaint_types')->onDelete('cascade');
            $table->foreign('seksi_id')->references('id')->on('seksis')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaint_types_has_seksis');
    }
};
