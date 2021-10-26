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
3. under the Databases tap, create a database called "omeka". This database name is defined in **config/database.ini**. The user name and password of the database "omeka" is also defined in **config/database.ini**
4. import database:
```
/Applications/MAMP/library/bin/mysql -uomeka -pomeka omeka < birgitta.mysqldump-new.sql
```
5. Click start and open localhost.

## To use it with docker containers
1. Launch the containers:
```
docker-compose up -d
```

This will deploy three Docker containers:

Container 1: mariadb (mysql)

Container 2: phpmyadmin (connected to container 1)

Container 3: omeka-s-birgitta (connected to container 1)

2. Automatically dump and load Birgitta database from remote machine

Create a file: **birgitta_database_pass.txt** and put the password of Birgitta
database in the file, such as ```'password'``` (it must has single quotes around
the password).

Then, run the shell script. It gets the password from
**birgitta_database_pass.txt** file, dumps database, and imports to docker
database container.

```
sh database_dump_load_handler.sh
```

3. With your browser, go to:

  * Omeka-S: localhost

  * PhpMyAdmin: localhost:8080

4. Stop containers:
```
docker-compose down
```

5. Stop containers and remove all images and volumes 
```
docker-compose down --rmi all
```
and 
```
docker volume prune
```

## Build your birgitta image (optional)
If you want to modify and build the omeka birgitta image, you will need to build a new image:

eg:
```
docker image build -t foo/omeka-s-birgitta:1.0.1 .
```
```
docker image tag foo/omeka-s-birgitta:1.0.1 foo/omeka-s-birgitta:latest
```

Upload your image to your Docker hub repository:

Login in your account (e.g. foo) on hub.docker.com, and create a repository "omeka-s-birgitta", then upload your customized image:

```
docker login --username=foo
```
```
docker image push foo/omeka-s-birgitta:1.0.1
```
```
docker image push foo/omeka-s-birgitta:latest
```



