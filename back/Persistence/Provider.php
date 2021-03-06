<?php
declare(strict_types=1);

namespace App\Persistence;

use App\Config\Env;
use League\Container\ServiceProvider\AbstractServiceProvider;
use PDO;

class Provider extends AbstractServiceProvider
{
    protected $provides = [
        PDO::class,
    ];

    public function register(): void
    {
        $this->container->share(
            PDO::class,
            function () {
                $driver = Env::getDbDriver();
                $host = Env::getDbHost();
                $port = Env::getDbPort();
                $schema = Env::getDbSchema();
                $user = Env::getDbUser();
                $pass = Env::getDbPassword();

                $dsn = "$driver:host=$host;port=$port;dbname=$schema";
                return new PDO($dsn, $user, $pass);
            }
        );

    }
}