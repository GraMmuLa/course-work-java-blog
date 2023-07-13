export default interface User {
    id: number
    username: string,
    password: string | null,
    email: string,
    roles: string[],
    loggedIn: boolean
}