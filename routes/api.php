<?php

use App\Http\Controllers\General\GetNotificationController;
use App\Http\Controllers\Masyarakat\GetComplaintController;
use App\Http\Controllers\Pelayanan\GetComplaintController as PelayananGetComplaintController;
use App\Http\Controllers\Seksi\GetComplaintController as SeksiGetComplaintController;
use App\Http\Controllers\SuperAdmin\GetAllWorkerAccountsController;
use App\Http\Controllers\SuperAdmin\GetWorkerAccountsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Complaints routes
Route::prefix('complaints')->group(function () {
    Route::get('/', [GetComplaintController::class, 'index'])->name('masyarakat.complaints-index');
    Route::prefix('pelayanan')->group(function () {
        Route::get('/search', [PelayananGetComplaintController::class, 'index'])->name('pelayanan.complaints-index');
    });
    Route::prefix('seksi')->group(function () {
        Route::get('/search', [SeksiGetComplaintController::class, 'index'])->name('seksi.complaints-index');
    });
});

// Super Admin routes
Route::prefix('super-admin')->group(function () {
    Route::get('/worker-accounts', [GetWorkerAccountsController::class, 'index'])->name('super-admin.worker-accounts-index');
    Route::get('/all-worker-accounts', [GetAllWorkerAccountsController::class, 'index'])->name('super-admin.get-all-worker-accounts-index');
});

// General routes
Route::prefix('general')->group(function () {
    Route::get('/notification', [GetNotificationController::class, 'index'])->name('general.get-notification-index');
    Route::get('/notification/{id}/{email}', [GetNotificationController::class, 'update'])->name('general.get-notification-update');
});
