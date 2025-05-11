export interface Sale {
    id: string;
    saleCode: string;
    creationDate: string;
    totalValue: string;
    state: string;
    productQuantity: string;
    cardAlias: string;
    saleDetails: Array<SaleDetail>;
}

export interface SaleDetail {
    productName: string;
    productImageUrl: string;
    quantity: string;
    unitValue: string;
    totalValue: string;
}

export interface SaleAdd {
    cardId: string;
    SaleDetails: Array<SaleDetailAdd>
}

export interface SaleDetailAdd {
    productId: string;
    quantity: string;
}
