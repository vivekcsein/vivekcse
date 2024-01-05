// type AuthenticationError_Name = "email" | "password" | string;
export class AuthenticationError extends Error {
    constructor(message: string = "Auth is required") {
        super(message);
        this.name = "AuthenticationError";
    }
}