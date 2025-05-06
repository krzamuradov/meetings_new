<?php

namespace App\Http\Controllers;

use App\Http\Requests\MeetingStore;
use App\Http\Resources\MeetingResource;
use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MeetingResource::collection(Meeting::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MeetingStore $request)
    {
        $validated = $request->validated();

        $meeting = Meeting::create($validated);

        if ($meeting) {
            return response()->json(["message" => "Сохранено успешно"], 201);
        } else {
            return response()->json(["message" => "Ошибка при сохранении"], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        return new MeetingResource($meeting);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MeetingStore $request, $id)
    {
        $meeting = Meeting::findOrFail($id);
        $validated = $request->validated();


        $updated = $meeting->update($validated);

        if ($updated) {
            return response()->json(["message" => "Обновлено успешно"], 201);
        } else {
            return response()->json(["message" => "Ошибка при обновлении"], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meeting $meeting)
    {
        //
    }
}
