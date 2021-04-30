import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { isInvalidValue } from "../../helpers/isInvalidValue";
import UUIDHelper from "../../helpers/UUIDHelper";
import App from "../../index";

// TODO signature

App.get("/session/minecraft/hasJoined", async (request, response) => {
    const data = request.query;

    if (
        isInvalidValue(data.username) ||
        isInvalidValue(data.serverId)
    )
        return response.status(400).end();

    // TODO
    // Если IP указан
    if (data.ip && ("string" !== typeof data.ip || data.ip.length === 0)) {
        return response.status(400).end();
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            username: data.username,
            serverId: data.serverId,
        },
    });
    if (!user) return response.status(400).end(); // User not found

    const userUUID = UUIDHelper.getWithoutDashes(user.userUUID);

    const textures: any = {};
    if (user.skinUrl.length > 0) {
        textures.SKIN = {
            url: user.skinUrl,
        };
    }
    if (user.capeUrl.length > 0) {
        textures.CAPE = {
            url: user.capeUrl,
        };
    }

    response.json({
        id: userUUID,
        name: user.username,
        properties: {
            name: "textures",
            value: Buffer.from(
                JSON.stringify({
                    timestamp: Date.now(),
                    profileId: userUUID,
                    profileName: user.username,
                    textures,
                })
            ).toString("base64"),
        }
    });
});
