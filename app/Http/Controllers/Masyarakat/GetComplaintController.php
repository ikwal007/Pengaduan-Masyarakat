<?php

namespace App\Http\Controllers\Masyarakat;

use App\Http\Controllers\Controller;
use App\Queries\ComplaintQuery;
use Illuminate\Http\Request;

class GetComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->only('keyword')) {
            $compalaintQuery = new ComplaintQuery();
            $result = $compalaintQuery->complaintWithPaginationOnSpecificUser($request->input('email'), $request->input('keyword'));
            return response()->json($result);
        }
        return response()->json([]);
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
