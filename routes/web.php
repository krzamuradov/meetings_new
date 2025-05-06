<?php

use Illuminate\Support\Facades\Route;

Route::get("/storage/documents", function () {
    return 1;
});

Route::get('/{any}', function () {
    return view('app');
})->where("any", ".*");
