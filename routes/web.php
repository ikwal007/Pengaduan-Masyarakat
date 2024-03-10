<?php

use App\Http\Controllers\General\PasswordController;
use App\Http\Controllers\General\ProfileController as GeneralProfileController;
use App\Http\Controllers\Masyarakat\DashboardComplaintController;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::post('/complaint-user', [ComplaintController::class, 'store'])->name('complaint.store');


Route::middleware('auth')->group(function () {

    // Super Admin
    Route::middleware('role:Super_Admin')->group(function () {
        Route::prefix('super-admin')->group(function () {
            Route::controller(DashboardManagesWorkerAccountsController::class)->group(function () {
                Route::get('/dashboard-manages-worker-accounts', 'index')->name('super-admin.dashboard-manages-worker-accounts-index');
                Route::get('/dashboard-manages-worker-accounts/{id}', 'show')->name('super-admin.dashboard-manages-worker-accounts-show');
                Route::get('/dashboard-manages-worker-accounts/{id}/edit-password', 'edit')->name('super-admin.dashboard-manages-worker-accounts-edit-password');
                Route::patch('/dashboard-manages-worker-accounts/{id}', 'update')->name('super-admin.dashboard-manages-worker-accounts-update');
            });
        });
    });

    // Pelayanan
    Route::middleware('role:Pelayanan_Publik')->group(function () {
        Route::prefix('pelayanan-publik')->group(function () {
            Route::controller(DashboardPengaduanController::class)->group(function () {
                Route::get('/dashboard-pengaduan', 'index')->name('pelayanan.dashboard-complaints-index');
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
    });

    // Seksi
    Route::middleware('role:Seksi')->group(function () {
        Route::prefix('seksi')->group(function () {
            Route::resource('complaint-handling', ComplaintHandlingController::class);
        });
    });

    // Masyarakat
    Route::middleware('role:Masyarakat')->group(function () {
        Route::prefix('masyarakat')->group(function () {
            Route::resource('complaint', DashboardComplaintController::class);
        });
    });

    // General
    Route::controller(GeneralProfileController::class)->group(function () {
        Route::get('/profile/{id}', 'show')->name('profile.show');
        Route::get('/profile/{id}/edit', 'edit')->name('profile.edit');
        Route::post('/profile/{id}', 'update')->name('profile.update');
    });

    Route::patch('/profile/change-password/{id}', [PasswordController::class, 'update'])->name('profile.update-password');


    Route::redirect('/', '/login');


    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';
