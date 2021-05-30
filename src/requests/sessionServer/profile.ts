import { getRepository } from "typeorm";

import { getSignature } from "../../core/keys";
import { User } from "../../entity/User";
import UUIDHelper from "../../helpers/UUIDHelper";
import App from "../../index";

App.get("/session/minecraft/profile/:uuid", async (request, response) => {
    const uuid = request.params.uuid;

    if (uuid.trim().length === 0) return response.status(400).end();

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            userUUID: UUIDHelper.getWithDashes(uuid),
        },
    });
    if (!user) return response.status(400).end(); // User not found

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

    const signed = request.query.unsigned === "false";
    if (signed) texturesValue.signatureRequired = true;
    texturesValue = Buffer.from(JSON.stringify(texturesValue)).toString(
        "base64"
    );
    data.properties[0].value = texturesValue;
    if (signed) data.properties[0].signature = getSignature(texturesValue);
    response.json(data);
});
