export interface Card {
    id: string;
    last4Digits: string;
    franchise: string;
    bank: string;
    expirationDate: string;
    ownerIdentificationType: string;
    ownerIdentification: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    alias: string;
}

export interface CardAdd {
    cardNumber: string;
    securityCode: string;
    expirationDate: Date;
    ownerIdentificationType: number;
    ownerIdentification: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
}

export interface CardEdit {
    id: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    alias: string;
}


