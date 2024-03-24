<?php

use App\Http\Controllers\Masyarakat\GetComplaintController;
use App\Http\Controllers\Pelayanan\GetComplaintController as PelayananGetComplaintController;
use App\Http\Controllers\Seksi\GetComplaintController as SeksiGetComplaintController;
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

Route::get('/complaints', [GetComplaintController::class, 'index'])->name('masyarakat.complaints-index');
Route::get('/pelayanan/search-complaints', [PelayananGetComplaintController::class, 'index'])->name('pelayanan.complaints-index');
Route::get('/seksi/search-complaints', [SeksiGetComplaintController::class, 'index'])->name('seksi.complaints-index');
