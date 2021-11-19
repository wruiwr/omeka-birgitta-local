FROM php:7.3-apache

RUN a2enmod rewrite

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -qq update && apt-get -qq -y upgrade
RUN apt-get -qq update && apt-get -qq -y --no-install-recommends install \
    unzip \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libpng-dev \
    libjpeg-dev \
    libmemcached-dev \
    zlib1g-dev \
    imagemagick \
    libmagickwand-dev

# Install the PHP extensions we need
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install -j$(nproc) iconv pdo pdo_mysql mysqli gd
RUN pecl install mcrypt-1.0.2 && docker-php-ext-enable mcrypt && pecl install imagick && docker-php-ext-enable imagick

# ADD source PHP code
RUN rm -rf /var/www/html && mkdir -p /var/www/html
COPY . /var/www/html/

# Create one volume for files and config
RUN rm -rf /var/www/html/volume/config \
    && rm -rf /var/www/html/volume/files \
    && mkdir -p /var/www/html/volume/config \
    && mkdir -p /var/www/html/volume/files \
    && cp /var/www/html/config/database.ini /var/www/html/volume/config/ \
    && rm /var/www/html/config/database.ini \
    && ln -s /var/www/html/volume/config/database.ini /var/www/html/config/database.ini \
    && rm -Rf /var/www/html/files/ \
    && ln -s /var/www/html/volume/files/ /var/www/html/files \
    && chown -R www-data:www-data /var/www/html/ \
    && chmod 600 /var/www/html/volume/config/database.ini \
    && chmod 600 /var/www/html/.htaccess

VOLUME /var/www/html/volume/

CMD ["apache2-foreground"]
