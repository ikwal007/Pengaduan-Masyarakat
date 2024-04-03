<?php

namespace App\Http\Controllers\SuperAdmin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordRequest;
use App\Models\User;
use App\Queries\UserQuery;
use Illuminate\Support\Facades\Hash;

class DashboardManagesWorkerAccountsController extends Controller
{
    /**
     * Display the dashboard for managing worker accounts.
     *
     * @return \Inertia\Response
     */
    public function index()
    {

        $userQuery = new UserQuery();
        // Get count of worker accounts
        $countWorkerAccounts = $userQuery->getCountAccountWorker();

        // Get count of 'Masyarakat' accounts
        $countMasyarakat = $userQuery->getCountAccountMasyarakat();

        // Get all worker account data with roles eager loaded
        $allAccountWorkerDatas = $userQuery->getAllAccountWorkerDatas();

        // Render the inertia view with the data
        return Inertia::render('SuperAdmin/DashboardManagesWorkerAccounts/Index', [
            'countWorkerAccounts' => $countWorkerAccounts,
            'countMasyarakat' => $countMasyarakat,
            'allAccountWorkerDatas' => $allAccountWorkerDatas,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userQuery = new UserQuery();
        $detailAccountData = $userQuery->getDetailAccount($id);
        return Inertia::render('SuperAdmin/DashboardManagesWorkerAccounts/Show', [
            'detailAccountData' => $detailAccountData
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $userQuery = new UserQuery();
        $detailAccountData = $userQuery->getDetailAccount($id);

        return Inertia::render('SuperAdmin/DashboardManagesWorkerAccounts/Edit', [
            'detailAccountData' => $detailAccountData
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PasswordRequest $request, string $id)
    {
        $getUser = User::find($id);

        $getUser->password = Hash::make($request->newPassword);

        $getUser->save();

        return redirect('/super-admin/dashboard-manages-worker-accounts')->with("message", "Ubah Password Berhasil");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
