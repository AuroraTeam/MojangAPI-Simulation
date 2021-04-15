import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import UUIDHelper from "../../helpers/UUIDHelper";
import App from "../../index";

App.post("/session/minecraft/join", async (request, response) => {
    const data = request.body;

    if (
        "string" !== typeof data.accessToken ||
        data.accessToken.length === 0 ||
        "string" !== typeof data.selectedProfile ||
        data.selectedProfile.length === 0 ||
        "string" !== typeof data.serverId ||
        data.serverId.length === 0
    )
        return response.status(400).end();

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            accessToken: data.accessToken,
            userUUID: UUIDHelper.getWithDashes(data.selectedProfile),
        },
    });

    if (!user) return response.status(400).end(); // User not found

    user.serverId = data.serverId;
    await userRepository.save(user);

    response.status(204).end();
});
