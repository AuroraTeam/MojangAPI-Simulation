import Router from "../../index"

Router.addRoute('post', '/session/session/minecraft/join', (request, response) => {
    // Принимаю данные и завожу serverId в строку юзера
    const data = request.body

    // console.log(data.accessToken)
    // console.log(data.selectedProfile)
    // console.log(data.serverId)

    // возвращаю HTTP/1.1 204 No Content
    response.sendStatus(204)

    // Проверять наличие юзера в бд и корректность данных (+ интеграцию внешних проверок (напр. через коллбек (для авроры)))
    // Возвращать 403 в случае ошибки
})
