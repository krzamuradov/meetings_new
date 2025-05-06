<?php

namespace App\Http\Controllers;

use App\Http\Requests\DocumentStore;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DocumentStore $request)
    {
        $validated = $request->validated();
        if ($request->hasFile("file")) {
            $file = $request->file('file');
            $filename = Str::random(25) . "." . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('documents', $filename, 'public');

            $validated["file"] = $filePath;

            $created = Document::create($validated);

            if ($created) {
                return response()->json(["message" => "Сохранено успешно"], 201);
            } else {
                return response()->json(["message" => "Ошибка при сохранении"], 500);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
