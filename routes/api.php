<?php

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/login", [LoginController::class, "login"]);

Route::middleware("auth:sanctum")->group(function () {
    Route::post("/logout", [LoginController::class, "logout"]);
    Route::apiResource("/meetings", MeetingController::class);
    Route::apiResource("/documents", DocumentController::class)->except(["index"]);
    Route::apiResource("/users", UsersController::class);
});
