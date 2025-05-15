FROM php:8.3-fpm

# Required packages
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libpq-dev \
    zip \
    gnupg \
    procps \
    && docker-php-ext-install pdo pdo_pgsql pcntl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install Node.js & npm (official recommended way)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install Laravel Installer
RUN composer global require laravel/installer \
    && echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.bashrc

WORKDIR /var/www