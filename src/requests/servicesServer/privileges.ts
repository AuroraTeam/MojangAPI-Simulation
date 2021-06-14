import { getRepository } from "typeorm";

import { User } from "../../entity/User";
import App from "../../index";

App.get("/privileges", async (requset, reply) => {
    const accessToken = requset.headers.authorization;
    reply.code(400);

    if ("string" !== typeof accessToken || accessToken.length === 0)
        throw undefined;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            accessToken: accessToken.slice(7),
        },
    });
    if (!user) throw undefined; // User not found

    reply.code(200);
    return {
        privileges: {
            onlineChat: {
                enabled: user.onlineChat,
            },
            multiplayerServer: {
                enabled: user.multiplayerServer,
            },
            multiplayerRealms: {
                enabled: user.multiplayerRealms,
            },
            telemetry: {
                enabled: user.telemetry,
            },
        },
    };
});
