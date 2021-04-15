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

    const userUUID = UUIDHelper.getWithoutDashes(user.userUUID)

    response.json({
        id: userUUID,
        name: user.username,
        properties: [
            {
                name: "textures",
                value: Buffer.from(
                    JSON.stringify({
                        timestamp: Date.now(),
                        profileId: userUUID,
                        profileName: user.username,
                        textures: {
                            SKIN: {
                                url:
                                    "http://textures.minecraft.net/texture/7bc6395501fe9296091d995317d1f0578db073ce0e384b52ecd851c6e955aecf",
                            },
                        },
                    })
                ).toString("base64"),
            },
        ],
    });
});
