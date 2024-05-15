<?php

namespace App\Http\Controllers\Masyarakat;

use App\Http\Controllers\Controller;
use App\Models\Archives;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DeleteImageComplaintController extends Controller
{
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $findArchive = Archives::find($id);
        if (!is_null($findArchive)) {
            Storage::delete($findArchive->resource);
            $findArchive->delete();
            return response()->json(['message' => 'success', 'status' => '200'], 200);
        } else {
            return response()->json(['message' => 'failed', 'status' => '404'], 404);
        }
    }
}
