import App from "../../index"

App.get('/session/minecraft/hasJoined', (request, response) => {
    // request.params.username
    // request.params.serverId
    // request.params.ip

    response.sendStatus(400)

    // response.json({
    //     "id": "b61ec822-e3d4-56c4-8b19-b0817b927a10",
    //     // "name": username,
    //     "properties": [
    //         {
    //             "name": "textures",
    //             "value": Buffer.from(JSON.stringify({
    //                 "timestamp": Date.now(),
    //                 "profileId": "b61ec822-e3d4-56c4-8b19-b0817b927a10",
    //                 // "profileName": username,
    //                 "textures": {
    //                     "SKIN": {
    //                         "url": "http://textures.minecraft.net/texture/7bc6395501fe9296091d995317d1f0578db073ce0e384b52ecd851c6e955aecf"
    //                     }
    //                 }
    //             })).toString('base64')
    //         }
    //     ]
    // })
})