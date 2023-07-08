import Role from "./role";

export default interface DecodedJwtToken {
    sub: string,
    iat: number,
    exp: number,
    roles: string[]
}