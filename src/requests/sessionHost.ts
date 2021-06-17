/*
    =================================================
    Запрос от клиента при подключении клиента к серверу
    =================================================
    Доки:
    - https://wiki.vg/Protocol_Encryption#Client
    Эмуляция:
    - https://sessionserver.mojang.com/session/minecraft/join
*/
import "./sessionHost/join";
/*
    =================================================
    Запрос от сервера при подключении клиента к серверу
    =================================================
    Доки:
    - https://wiki.vg/Protocol_Encryption#Server
    Эмуляция:
    - https://sessionserver.mojang.com/session/minecraft/hasJoined?username=username&serverId=hash&ip=ip
*/
import "./sessionHost/hasJoined";
/*
    =================================================
    Запрос от клиента на получение информации о игроке
    (единожды, при первом заходе в одиночку / на сервер (в случае отсутствия signature при запросе hasJoined))
    =================================================
    Доки:
    - https://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape
    Эмуляция:
    - https://sessionserver.mojang.com/session/minecraft/profile/<uuid>
*/
import "./sessionHost/profile";
