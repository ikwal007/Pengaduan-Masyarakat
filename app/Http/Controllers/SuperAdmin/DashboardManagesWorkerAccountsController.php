<?php

namespace App\Http\Controllers\SuperAdmin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Queries\UserQuery;

class DashboardManagesWorkerAccountsController extends Controller
{
    /**
     * Display the dashboard for managing worker accounts.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Get count of worker accounts
        $countWorkerAccounts = UserQuery::getCountAccountWorker();

        // Get count of 'Masyarakat' accounts
        $countMasyarakat = UserQuery::getCountAccountMasyarakat();

        // Get all worker account data with roles eager loaded
        $allAccountWorkerDatas = UserQuery::getAllAccountWorkerDatas();

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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // $status = $request->input('status');

        // event(new UserStatusUpdated($userId, $status));

        // return response()->json(['message' => 'User status updated successfully']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
