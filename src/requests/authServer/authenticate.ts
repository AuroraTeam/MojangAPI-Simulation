import { randomUUID } from "crypto";

import { getRepository } from "typeorm";

import App from "../../core/main";
import { User } from "../../entity/User";
import { isInvalidValue } from "../../helpers/isInvalidValue";

App.post("/authenticate", async (request, reply) => {
    const data: any = request.body;
    reply.code(400);

    if (isInvalidValue(data.username) || isInvalidValue(data.password))
        throw undefined;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        select: ["username", "userUUID", "clientToken", "accessToken"],
        where: {
            username: data.username,
        },
    });

    if (!user) throw undefined;

    const accessToken = randomUUID();

    await userRepository.update(
        {
            userUUID: user.userUUID,
        },
        {
            accessToken,
        }
    );

    reply.code(200);
    return {
        clientToken: user.clientToken,
        accessToken,
        availableProfiles: [
            {
                name: user.username,
                id: user.userUUID,
            },
        ],
        selectedProfile: {
            name: user.username,
            id: user.userUUID,
        },
    };
});
