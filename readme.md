# Portfolio* requires composer and npm### Getting StartedHow to setup on localhost:1. git clone repository. ```/public``` directory is the documentroot. Change all files under ```/storage``` to be writable. Might need to add directives to nginx config file for pretty URL.2. run ```composer install```* Note: When running under vagrant with shared folders ```-no-bin-links``` might be required when executing ```npm install```3. create ```.env.php``` in parent directory and add database credentials for local development.ex.```php<?phpreturn array(    'DB_NAME' => 'dbname',    'DB_USERNAME' => 'username',    'DB_PASSWORD' => 'password');```4. run ```php artisan migrate```5. DONE![SITE](http://www.rhgksrua.pw)