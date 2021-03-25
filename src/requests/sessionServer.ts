/* 
    =================================================
    Запрос от клиента при подключении клиента к серверу
    =================================================
    Доки:
    - https://wiki.vg/Protocol_Encryption#Client
    Эмуляция: 
    - https://sessionserver.mojang.com/session/minecraft/join
*/
import "./sessionServer/join"

/* 
    =================================================
    Запрос от сервера при подключении клиента к серверу
    =================================================
    Доки:
    - https://wiki.vg/Protocol_Encryption#Server
    Эмуляция:
    - https://sessionserver.mojang.com/session/minecraft/hasJoined?username=username&serverId=hash&ip=ip
*/
import "./sessionServer/hasJoined"

/* 
    =================================================
    Запрос от клиента после подключения клиента к серверу
    =================================================
    Доки:
    - https://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape
    Эмуляция:
    - https://sessionserver.mojang.com/session/minecraft/profile/<uuid>
*/
import "./sessionServer/profile"
