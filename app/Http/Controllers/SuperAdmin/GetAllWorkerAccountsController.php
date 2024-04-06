<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Queries\UserQuery;

class GetAllWorkerAccountsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userQuery = new UserQuery();
        $result = $userQuery->getAllAccountWorkerDatas();
        return response()->json($result);
    }
}
