import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import UUIDHelper from "../../helpers/UUIDHelper";
import App from "../../index";

// TODO проверка unsigned в запросе

App.get("/session/minecraft/profile/:uuid", async (request, response) => {
    const uuid = request.params.uuid;

    if ("string" !== typeof uuid || uuid.length === 0)
        return response.status(400).end();

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

    response.json({
        id: uuid,
        name: user.username,
        properties: {
            name: "textures",
            value: Buffer.from(
                JSON.stringify({
                    timestamp: Date.now(),
                    profileId: uuid,
                    profileName: user.username,
                    textures,
                })
            ).toString("base64"),
        }
    });
});
