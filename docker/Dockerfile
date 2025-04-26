FROM php:8.2-fpm

# Instalar dependências
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd dom

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Criar usuário e grupo
RUN groupadd -g 1000 appuser && \
    useradd -u 1000 -ms /bin/bash -g appuser appuser

# Definir diretório de trabalho
WORKDIR /var/www

# Comando de startup
CMD ["/bin/sh", "-c", "\
    if [ ! -f artisan ]; then \
        composer create-project laravel/laravel . \"10.*\"; \
    fi && \
    chown -R appuser:appuser /var/www && \
    php artisan serve --host=0.0.0.0 --port=8000"]
