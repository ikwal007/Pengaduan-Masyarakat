<?php

use App\Http\Controllers\ProfileController;
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
    $auth = auth()->user();
    return Inertia::render('Dashboard', [
        'roleSearch' => $auth->roles->first(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/complaint-user', [ComplaintController::class, 'store'])->name('complaint.store');

Route::middleware('auth')->group(function () {

    Route::middleware('role:Super_Admin')->group(function () {
        Route::prefix('super-admin')->group(function () {
            Route::controller(DashboardManagesWorkerAccountsController::class)->group(function () {
                Route::get('/dashboard-manages-worker-accounts', 'index')->name('super-admin.dashboard-manages-worker-accounts-index');     
            });
        });
    });


    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';
