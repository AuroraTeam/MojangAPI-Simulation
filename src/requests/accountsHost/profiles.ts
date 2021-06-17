import { In, getRepository } from "typeorm";

import { User } from "../../entity/User";
import UUIDHelper from "../../helpers/UUIDHelper";
import App from "../../index";

const schema = {
    description: "Запрос на получение UUID игроков по их никнеймам",
    tags: ["accountsHost"],
    body: {
        type: "array",
        minItems: 1,
        maxItems: 10,
        items: {
            type: "string",
        },
    },
    response: {
        200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                },
            },
        },
    },
};

App.post(
    "/profiles/minecraft",
    { schema, attachValidation: true },
    async (request, reply) => {
        const data = request.body;

        if (request.validationError) {
            reply.code(400);

            switch (request.validationError.validation[0].keyword) {
                case "type":
                    throw undefined; //TODO
                case "minItems":
                    throw undefined; //TODO
                case "maxItems":
                    throw {
                        error: "IllegalArgumentException",
                        errorMessage:
                            "Not more that 10 profile name per call is allowed.",
                    };

                default:
                    console.error(`UnhandledError: ${request.url}`);
                    console.error(request.validationError.validation);
                    throw undefined;
            }
        }

        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["username", "userUUID"],
            where: {
                username: In(data as string[]),
            },
        });

        return users.map((user) => ({
            id: UUIDHelper.getWithoutDashes(user.userUUID),
            name: user.username,
        }));
    }
);
