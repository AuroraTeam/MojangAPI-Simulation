# MojangAPI-Simulation

Данная имплементация API сервера предназначена для новой версии аучлибы, но вполне можно использовать и на старой, при правильной адаптации.

Для смены API серверов Mojang на свой сервер, нужно передать следующие параметры в строку запуска клиента/сервера:
```
-Dminecraft.api.auth.host={host}
-Dminecraft.api.account.host={host}
-Dminecraft.api.session.host={host}
-Dminecraft.api.services.host={host}
```
где {host} - адрес вашего API сервера.

## Стек
Node.js, Typescrypt, Express, TypeORM

### Возможно в планах
Изучение и переход на Fastify
