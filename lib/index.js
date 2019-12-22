"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const categories_1 = __importDefault(require("./categories"));
const transactions_1 = __importDefault(require("./transactions"));
const randomFuzz = () => new Promise((resolve, reject) => {
    const randomDelay = Math.random() * 3000;
    if (randomDelay < 500) {
        reject(new Error("A synthetic error happened"));
        return;
    }
    setTimeout(resolve, randomDelay);
});
class Client {
    constructor() {
        this.resetState();
    }
    async resetState() {
        react_native_1.AsyncStorage.setItem("transactions", JSON.stringify(transactions_1.default));
        react_native_1.AsyncStorage.setItem("categories", JSON.stringify(categories_1.default));
    }
    async fetchTransactions() {
        await randomFuzz();
        const transactions = await react_native_1.AsyncStorage.getItem("transactions");
        if (!transactions) {
            return [];
        }
        return JSON.parse(transactions);
    }
    async fetchUserCategories() {
        await randomFuzz();
        const categories = await react_native_1.AsyncStorage.getItem("categories");
        if (!categories) {
            return [];
        }
        return JSON.parse(categories);
    }
    async fetchTransaction(id) {
        await randomFuzz();
        const transactions = await this.fetchTransactions();
        return transactions.find(({ id: itemId }) => id === itemId);
    }
    async fetchUserCategory(id) {
        await randomFuzz();
        const categories = await this.fetchUserCategories();
        return categories.find(({ id: itemId }) => id === itemId);
    }
    async updateTransactionUserCategory(transactionId, userCategoryId) {
        await randomFuzz();
        const transactions = await this.fetchTransactions();
        const transaction = await this.fetchTransaction(transactionId);
        const category = await this.fetchUserCategory(userCategoryId);
        if (!transaction) {
            throw new Error("Couldn't find transaction");
        }
        if (!category) {
            throw new Error("Couldn't find category");
        }
        const newTransaction = Object.assign({}, transaction, {
            integration: Object.assign({}, transaction.integration, {
                category,
            }),
        });
        const newTransactions = transactions.map((item) => {
            if (item.id === transactionId) {
                return newTransaction;
            }
            return item;
        });
        const update = JSON.stringify(newTransactions);
        await react_native_1.AsyncStorage.setItem("transactions", update);
    }
}
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGF0YS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtDQUE0QztBQUU1Qyw4REFBMkM7QUFDM0Msa0VBQStDO0FBNkMvQyxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUUsQ0FDdEIsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDOUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQztJQUV6QyxJQUFJLFdBQVcsR0FBRyxHQUFHLEVBQUU7UUFDckIsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztRQUNoRCxPQUFPO0tBQ1I7SUFFRCxVQUFVLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyxDQUFDO0FBRUwsTUFBcUIsTUFBTTtJQUN6QjtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7UUFDZCwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDeEUsMkJBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQWUsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELEtBQUssQ0FBQyxpQkFBaUI7UUFDckIsTUFBTSxVQUFVLEVBQUUsQ0FBQztRQUVuQixNQUFNLFlBQVksR0FBRyxNQUFNLDJCQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMs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