<?php

namespace App\Http\Controllers;

use App\Http\Requests\DocumentStore;
use App\Http\Requests\UpdateDocumentRequest;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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
            $validated["extension"] = $file->getClientOriginalExtension();
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
        return $document;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        $validated = $request->validated();

        if ($request->hasFile('file')) {
            if ($document->file && Storage::disk('public')->exists($document->file)) {
                Storage::disk('public')->delete($document->file);
            }

            $file = $request->file('file');
            $filename = Str::random(25) . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('documents', $filename, 'public');

            $validated['file'] = $filePath;
            $validated['extension'] = $file->getClientOriginalExtension();
        }

        $updated = $document->update($validated);

        if ($updated) {
            return response()->json(['message' => 'Обновлено успешно'], 200);
        }

        return response()->json(['message' => 'Ошибка при обновлении'], 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        if ($document->file && Storage::disk('public')->exists($document->file)) {
            Storage::disk('public')->delete($document->file);
        }

        $deleted = $document->delete();

        if ($deleted) {
            return response()->json(['message' => 'Удалено успешно'], 200);
        }

        return response()->json(['message' => 'Ошибка при удалении'], 500);
    }
}
