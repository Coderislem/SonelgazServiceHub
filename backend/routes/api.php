<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\demande_C ;
use  App\Http\Controllers\RejisterLoginC ;
use App\Http\Controllers\Admin;
use  App\Http\Controllers\chafiAjance ;
use App\Http\Controllers\ChefAuthController;
use App\Http\Controllers\Reclamtion;
use App\Http\Controllers\ConterTotel;



Route::middleware('auth:api')->post('/storeD', [demande_C::class, 'storeDemonde']);
Route::middleware('auth:api')->get('/indexD', [demande_C::class, 'indexDemmonde']);
Route::post('loginChefajouns', [ChefAuthController::class, 'login']);

Route::post('/register', [RejisterLoginC ::class,'register']);


Route::post('/Login', [RejisterLoginC ::class,'login']);
Route::post('/loginChafeAgenc', [Admin ::class,'loginChafAjence']);

Route::middleware('auth:api')->post('/Logout', [RejisterLoginC::class, 'logout']);
Route::middleware('auth:api')->get('/getuser', [RejisterLoginC::class, 'getuser']);
Route::put('/updateuser/{id}', [RejisterLoginC::class, 'updateUser']);
Route::middleware('auth:api')->put('/updateDemond/{id}', [demande_C::class, 'updaetState_demande']);

Route::get('/user/{id}', [RejisterLoginC::class, 'User']);

Route::post('/createchaf', [Admin ::class,'createChafe']);

Route::post('/createAgenc', [Admin ::class,'createAgence']);

Route::get('/AllAgenc', [Admin ::class,'AllAgence']);

Route::get('/Allchef', [Admin ::class,'Allchafe']);


Route::post('/deleteChafee/{id}', [Admin ::class,'deleteChafe']);
Route::get('/UserrAll', [RejisterLoginC ::class,'UserAll']);
Route::middleware('auth:api')->put('/updateDemond/{id}', [demande_C::class, 'updateStateDemande']);
Route::middleware('auth:api')->get('/AllNC', [demande_C::class, 'AllNemberConteres']);


Route::post('/createTipR', [Admin::class, 'createTipReclamation']);
Route::get('/allTipR', [Admin::class, 'AllTipReclamation']);
Route::get('/deleteTipR', [Admin::class, 'deleteTipReclamation']);
Route::middleware('auth:api')->put('/updateStateResponse/{id}', [Reclamtion::class, 'updateStateResponse
Reclamtion']);
Route::middleware('auth:api')->post('/storeR', [Reclamtion::class, 'storeReclamation']);
Route::middleware('auth:api')->get('/indexR', [Reclamtion::class, 'indexReclamateon']);

Route::get('/indextotell', [ConterTotel::class, 'indextotel']);
