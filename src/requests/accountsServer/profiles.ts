import { In, getRepository } from "typeorm";

import { User } from "../../entity/User";
import UUIDHelper from "../../helpers/UUIDHelper";
import App from "../../index";

App.post("/profiles/minecraft", async (request, reply) => {
    const data = request.body;
    reply.code(400);

    if ("object" !== typeof data || !Array.isArray(data) || data.length === 0)
        throw undefined;

    if (data.length >= 10) {
        throw {
            error: "IllegalArgumentException",
            errorMessage: "Not more that 10 profile name per call is allowed.",
        };
    }

    const userRepository = getRepository(User);
    const users = await userRepository.find({
        select: ["username", "userUUID"],
        where: {
            username: In(data),
        },
    });

    reply.code(200);
    return users.map((user) => ({
        id: UUIDHelper.getWithoutDashes(user.userUUID),
        name: user.username,
    }));
});
