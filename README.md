# LZ_test_task_2
Вторая часть тестового задания. Api и интерфейс.

Инструкция:
Прежде всего, нужно создать базу данных в Pgsql.
Название: LZ_queue
Таблица: queue
Поля: id_queue (integer), name (character varying), surname ( character varying), date_added (timestamp with time zone)
API настроен на пользователя postgres с паролем 12345678, это можно изменить в файле db.js.

Далее, нужно прописать команду npm i, чтобы скачались пакеты для API, после этого команда npm start dev.
Всё, сервер запущен на порте 8081, порт можно поменять в файле index.js.

Фрондент можно запустить просто через dist - через html, или также ввести npm i и npm run serve, но особой разницы нет.
