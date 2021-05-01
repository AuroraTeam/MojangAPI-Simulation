export function isInvalidValue(param: any): boolean {
    return typeof param !== "string" || param.trim().length === 0;
}
