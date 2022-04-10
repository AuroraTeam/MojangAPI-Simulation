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

Например:

```
-Dminecraft.api.auth.host=https://api.example.ru/
-Dminecraft.api.account.host=https://api.example.ru/
-Dminecraft.api.session.host=https://api.example.ru/
-Dminecraft.api.services.host=https://api.example.ru/
```

## Стек

Node.js, Typescrypt, Fastify, TypeORM
