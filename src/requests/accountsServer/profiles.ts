import { In, getRepository } from "typeorm";

import { User } from "../../entity/User";
import { returnError } from "../../helpers/errorHelper";
import UUIDHelper from "../../helpers/UUIDHelper";
import App from "../../index";

App.post("/profiles/minecraft", async (request, response) => {
    const data = request.body;

    if ("object" !== typeof data || !Array.isArray(data) || data.length === 0)
        return response.status(400).end();

    if (data.length >= 10) {
        return returnError({
            response,
            error: "IllegalArgumentException",
            errorMessage: "Not more that 10 profile name per call is allowed.",
        });
    }

    const userRepository = getRepository(User);
    const users = await userRepository.find({
        select: ["username", "userUUID"],
        where: {
            username: In(data),
        },
    });

    const result: any = [];
    users.forEach((user) => {
        result.push({
            id: UUIDHelper.getWithoutDashes(user.userUUID),
            name: user.username,
        });
    });

    response.json(result);
});
