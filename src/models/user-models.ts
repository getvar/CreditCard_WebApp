export interface User {
    identification: string;
    identificationType: string;
    name: string;
    lastName: string;
    phone: string;
    adrress: string;
    userName: string;
}

export interface UserManage {
    identification: string;
    identificationType: number;
    name: string;
    lastName: string;
    phone: string;
    adrress: string;
    userName: string;
    password: string;
}

export interface UserEdit {
    identification: string;
    identificationType: number;
    name: string;
    lastName: string;
    phone: string;
    adrress: string;
}

