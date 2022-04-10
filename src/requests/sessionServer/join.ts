import { getRepository } from "typeorm";

import { App } from "../../core/main";
import { User } from "../../entity/User";
import { isInvalidValue } from "../../helpers/isInvalidValue";
import { UUIDHelper } from "../../helpers/UUIDHelper";

App.post("/session/minecraft/join", async (request, reply) => {
    let data: any = request.body;
    reply.code(400);

    if (
        isInvalidValue(data.accessToken) ||
        isInvalidValue(data.selectedProfile) ||
        isInvalidValue(data.serverId)
    )
        throw { error: "Bad Request" };

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            accessToken: UUIDHelper.getWithDashes(data.accessToken),
            userUUID: UUIDHelper.getWithDashes(data.selectedProfile),
        },
    });

    if (!user)
        throw {
            error: "ForbiddenOperationException",
            errorMessage: "Invalid credentials. Invalid username or password.",
        };

    user.serverId = data.serverId;
    await userRepository.save(user);

    reply.code(204);
});
