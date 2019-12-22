export interface Transaction {
    id: string;
    amount: number;
    purchaseTime: string;
    card: Card;
    merchant: Merchant;
    integration: Integration;
    __typename: "Transaction";
}
export interface Card {
    id: string;
    user: string;
    __typename: "Card";
}
export interface Merchant {
    id: string;
    name: "Docusign";
    merchantCategory: MerchantCategory;
    __typename: "Merchant";
    website: string;
}
export interface MerchantCategory {
    id: string;
    name: string;
    __typename: "MerchantCategory";
}
export interface Integration {
    id: string;
    name: string;
    category: UserCategory | null;
    __typename: "Integration";
}
export interface UserCategory {
    id: string;
    name: string;
    __typename: "UserCategory";
}
export default class Client {
    constructor();
    resetState(): Promise<void>;
    fetchTransactions(): Promise<Transaction[]>;
    fetchUserCategories(): Promise<UserCategory[]>;
    fetchTransaction(id: string): Promise<Transaction | undefined>;
    fetchUserCategory(id: string): Promise<UserCategory | undefined>;
    updateTransactionUserCategory(transactionId: string, userCategoryId: string): Promise<void>;
}
