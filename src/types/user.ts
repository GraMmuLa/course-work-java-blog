export default interface User {
    username: string,
    password: string,
    email: string,
    roles: string[],
    loggedIn: boolean
}