import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import App from "../../index";

App.get("/privileges", async (requset, response) => {
    const accessToken = requset.headers.authorization;

    if ("string" !== typeof accessToken || accessToken.length === 0)
        return response.status(400).end();

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            accessToken: accessToken.slice(7),
        },
    });
    if (!user) return response.status(400).end(); // User not found

    response.json({
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
        },
    });
});
