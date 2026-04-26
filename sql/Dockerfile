FROM postgres:15

# Оновлюємо списки пакетів і встановлюємо pg_cron
RUN apt-get update && apt-get -y install postgresql-15-cron

# Прописуємо налаштування прямо під час збірки образу
RUN echo "shared_preload_libraries='pg_cron'" >> /usr/share/postgresql/postgresql.conf.sample
RUN echo "cron.database_name='artrari'" >> /usr/share/postgresql/postgresql.conf.sample