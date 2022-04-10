import { getRepository } from "typeorm";

import { getSignature } from "../../core/keys";
import { App } from "../../core/main";
import { User } from "../../entities/User";
import { UUIDHelper } from "../../helpers/UUIDHelper";

App.get("/session/minecraft/profile/:uuid", async (request, reply) => {
    const uuid = (request.params as any).uuid;
    reply.code(400);

    if (uuid.trim().length !== 32)
        throw {
            error: "Bad Request",
        };

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            userUUID: UUIDHelper.getWithDashes(uuid),
        },
    });
    if (!user) {
        reply.code(204);
        throw undefined;
    }

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

    let texturesValue: any = {
        timestamp: Date.now(),
        profileId: uuid,
        profileName: user.username,
        textures,
    };

    const data: any = {
        id: uuid,
        name: user.username,
        properties: [
            {
                name: "textures",
                value: "",
            },
        ],
    };

    const signed = (request.query as any).unsigned === "false";
    if (signed) texturesValue.signatureRequired = true;
    texturesValue = Buffer.from(JSON.stringify(texturesValue)).toString(
        "base64"
    );
    data.properties[0].value = texturesValue;
    if (signed) data.properties[0].signature = getSignature(texturesValue);
    return data;
});
