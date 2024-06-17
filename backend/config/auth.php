<?php

return [

 
    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

   

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
        'api' => [
            'driver' => 'passport',
            'provider' => 'users',
        ],
       
                    'chaf_dagens' => [
                        'driver' => 'passport',
                        'provider' => 'chafe_dagens',
                    ],
    ],

   

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

       
    ],

   

    'password_timeout' => 10800,

];
