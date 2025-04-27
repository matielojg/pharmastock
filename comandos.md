
php artisan key:generate
php artisan migrate
composer require laravel/sanctum
php artisan make:model Medicine -mcr
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate

dropar tudo e repopular de novo:
php artisan migrate:fresh --seed
