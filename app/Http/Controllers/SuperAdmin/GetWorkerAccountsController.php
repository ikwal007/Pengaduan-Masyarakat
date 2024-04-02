<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Queries\UserQuery;
use Illuminate\Http\Request;

class GetWorkerAccountsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->only('keyword')) {
            $userQuery = new UserQuery();
            $result = $userQuery->searchAllAccountWorkerDatas($request->input('keyword'));
            return response()->json($result);
        }
        return response()->json([]);
    }
}
