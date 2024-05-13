<?php

use App\Http\Controllers\General\PasswordController;
use App\Http\Controllers\General\ProfileController as GeneralProfileController;
use App\Http\Controllers\Masyarakat\DashboardComplaintController;
use App\Http\Controllers\Pelayanan\ComplaintVerificationDashboardController;
use App\Http\Controllers\Pelayanan\CreateComplaintController;
use App\Http\Controllers\Pelayanan\DashboardPengaduanController;
use App\Http\Controllers\Pelayanan\RegisterdUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Seksi\ComplaintHandlingController;
use App\Http\Controllers\SuperAdmin\DashboardManagesWorkerAccountsController;
use App\Http\Controllers\User\ComplaintController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Authenticated Routes
Route::middleware('auth')->group(function () {

     // Super Admin Routes
     Route::middleware('role:Super_Admin')->prefix('super-admin')->group(function () {
        Route::controller(DashboardManagesWorkerAccountsController::class)->group(function () {
            Route::get('/dashboard-manages-worker-accounts', 'index')->name('super-admin.dashboard-manages-worker-accounts-index');
            Route::get('/dashboard-manages-worker-accounts/{id}', 'show')->name('super-admin.dashboard-manages-worker-accounts-show');
            Route::get('/dashboard-manages-worker-accounts/{id}/edit-password', 'edit')->name('super-admin.dashboard-manages-worker-accounts-edit-password');
            Route::patch('/dashboard-manages-worker-accounts/{id}', 'update')->name('super-admin.dashboard-manages-worker-accounts-update');
        });
    });

    // Pelayanan Routes
    Route::middleware('role:Pelayanan_Publik')->prefix('pelayanan-publik')->group(function () {
        Route::controller(DashboardPengaduanController::class)->group(function () {
            Route::get('/dashboard-pengaduan', 'index')->name('pelayanan.dashboard-complaints-index');
        });
        Route::controller(ComplaintVerificationDashboardController::class)->group(function () {
            Route::get('/dashboard-pengaduan-verifikasi', 'index')->name('pelayanan.complaint-verification-dashboard-index');
            Route::get('/dashboard-pengaduan-verifikasi/{id}/edit', 'edit')->name('pelayanan.complaint-verification-dashboard-edit');
            Route::patch('/dashboard-pengaduan-verifikasi/{id}', 'update')->name('pelayanan.complaint-verification-dashboard-update');
        });
        Route::controller(CreateComplaintController::class)->group(function () {
            Route::get('/create-complaint', 'create')->name('pelayanan.create-complaint');
            Route::post('/create-complaint', 'store')->name('pelayanan.store-complaint');
        });
        Route::controller(RegisterdUserController::class)->group(function () {
            Route::get('/create-user', 'create')->name('pelayanan.create_user');
            Route::post('/create-user', 'store')->name('pelayanan.store_user');
        });
    });

    // Seksi Routes
    Route::middleware('role:Seksi')->prefix('seksi')->group(function () {
        Route::resource('complaint-handling', ComplaintHandlingController::class);
    });

    // Masyarakat Routes
    Route::middleware('role:Masyarakat')->prefix('masyarakat')->group(function () {
        Route::resource('complaint', DashboardComplaintController::class);
    });

    // General Routes
    Route::controller(GeneralProfileController::class)->group(function () {
        Route::get('/profile/{id}', 'show')->name('profile.show');
        Route::get('/profile/{id}/edit', 'edit')->name('profile.edit');
        Route::post('/profile/{id}', 'update')->name('profile-avatar.update');
    });

    Route::patch('/profile/change-password/{id}', [PasswordController::class, 'update'])->name('profile.update-password');

    // Redirect to login page
    Route::redirect('/', '/login');


    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';
