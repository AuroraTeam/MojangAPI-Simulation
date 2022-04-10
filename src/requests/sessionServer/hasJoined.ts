import { getRepository } from "typeorm";

import { getSignature } from "../../core/keys";
import { App } from "../../core/main";
import { User } from "../../entities/User";
import { isInvalidValue } from "../../helpers/isInvalidValue";
import { UUIDHelper } from "../../helpers/UUIDHelper";

App.get("/session/minecraft/hasJoined", async (request, reply) => {
    const data: any = request.query;
    reply.code(400);

    if (isInvalidValue(data.username) || isInvalidValue(data.serverId))
        throw undefined;

    // TODO
    // Если IP указан
    if (data.ip && isInvalidValue(data.ip)) throw undefined;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            username: data.username,
            serverId: data.serverId,
        },
    });
    if (!user) throw undefined; // User not found

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

    const texturesValue = Buffer.from(
        JSON.stringify({
            timestamp: Date.now(),
            profileId: userUUID,
            profileName: user.username,
            signatureRequired: true,
            textures,
        })
    ).toString("base64");

    reply.code(200);
    return {
        id: userUUID,
        name: user.username,
        properties: [
            {
                name: "textures",
                value: texturesValue,
                signature: getSignature(texturesValue),
            },
        ],
    };
});
