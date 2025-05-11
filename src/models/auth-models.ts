export interface UserLogin {
    userName: string;
    password: string;
}

export interface UserLoginResponse {
    userName: string;
    fullName: string;
    token: string;
}
