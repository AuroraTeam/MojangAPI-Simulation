import { Response } from "express";

export function returnError({
    response,
    code = 400,
    error,
    errorMessage,
}: {
    response: Response;
    code?: number;
    error: string;
    errorMessage?: string;
}) {
    return response.status(code).json({ error, errorMessage });
}
