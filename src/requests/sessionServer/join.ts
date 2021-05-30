import { getRepository } from "typeorm";

import { User } from "../../entity/User";
import { returnError } from "../../helpers/errorHelper";
import { isInvalidValue } from "../../helpers/isInvalidValue";
import UUIDHelper from "../../helpers/UUIDHelper";
import App from "../../index";

App.post("/session/minecraft/join", async (request, response) => {
    const data = request.body;

    if (
        isInvalidValue(data.accessToken) ||
        isInvalidValue(data.selectedProfile) ||
        isInvalidValue(data.serverId)
    )
        return returnError({
            response,
            error: "Bad Request",
        });

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            accessToken: data.accessToken,
            userUUID: UUIDHelper.getWithDashes(data.selectedProfile),
        },
    });

    if (!user)
        return returnError({
            response,
            error: "ForbiddenOperationException",
            errorMessage: "Invalid credentials. Invalid username or password.",
        });

    user.serverId = data.serverId;
    await userRepository.save(user);

    response.status(204).end();
});
