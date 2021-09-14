# Omeka S with Birgitta configured for running locally

## Clone and get submodules 
1. clone the repo.
2. to get submodules, run: 
```
git submodule init
```
```
git submodule update
```

## To use it with MEMP Pro
1. clone the repo.
2. in MEMP, choose localhost and change its Document Root (under General tab) to cloned repo directoy.
4. Under the Databases tap, create a database called "omeka". This database name is defined in **config/database.ini**. The user name and password of the database "omeka" is also defined in **config/database.ini**
5. import database:
```
/Applications/MAMP/library/bin/mysql -uomeka -pomeka omeka < birgitta.mysqldump-new.sql
```
7. Click start and open localhost.

## To use it with docker containers
1. Launch the containers:
```
docker-compose up -d
```

This will deploy three Docker containers:

Container 1: mariadb (mysql)
Container 2: phpmyadmin (connected to container 1)
Container 3: omeka-s (connected to container 1)

2. import database:

```
docker exec -i <databse-container-ID> mysql -uomeka -pomeka omeka < birgitta.mysqldump-new.sql
```

3. With your browser, go to:

  * Omeka-S: localhost

  * PhpMyAdmin: localhost:8080

4. Stop containers:
```
docker-compose down
```
