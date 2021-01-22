import Server from "../../index"

Server.addRoute('get', '/sessionserver/join', (request, response) => {
    response.json({test: 123})
})
