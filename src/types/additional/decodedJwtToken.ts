export type DecodedJwtToken =  {
    sub: string;
    iat: number;
    exp: number;
    roles: string[];
    email: string;
    userId: number;
}