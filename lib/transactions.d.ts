declare const _default: {
    __typename: string;
    id: string;
    amount: number;
    card: {
        id: string;
        user: string;
        __typename: string;
    };
    merchant: {
        id: string;
        name: string;
        merchantCategory: {
            id: string;
            name: string;
            __typename: string;
        };
        __typename: string;
        website: string;
    };
    purchaseTime: string;
    integration: {
        id: string;
        name: string;
        category: null;
        __typename: string;
    };
}[];
export default _default;
