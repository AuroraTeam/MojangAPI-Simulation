import { getRepository } from "typeorm"
import { User } from "../../entity/User"
import UUIDHelper from "../../helpers/UUIDHelper"
import App from "../../index"

App.post('/session/minecraft/join', async (request, response) => {
    // Принимаю данные и завожу serverId в строку юзера
    const data = request.body

    if (
        "string" !== typeof data.accessToken     || data.accessToken.length === 0     || 
        "string" !== typeof data.selectedProfile || data.selectedProfile.length === 0 ||
        "string" !== typeof data.serverId        || data.serverId.length === 0
    )
        return response.sendStatus(400)

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: {
        accessToken: data.accessToken,
        userUUID: UUIDHelper.getWithDashes(data.selectedProfile)
    }})

    if (!user) return response.sendStatus(400) // User not found

    user.serverId = data.serverId
    await userRepository.save(user);

    response.sendStatus(204)
})
