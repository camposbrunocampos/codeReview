import { AsyncStorage } from "react-native";

import stockCategories from "./categories";
import stockTransactions from "./transactions";

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

const randomFuzz = () =>
  new Promise((resolve, reject) => {
    const randomDelay = Math.random() * 3000;

    if (randomDelay < 500) {
      reject(new Error("A synthetic error happened"));
      return;
    }

    setTimeout(resolve, randomDelay);
  });

export default class Client {
  constructor() {
    this.resetState();
  }

  async resetState() {
    AsyncStorage.setItem("transactions", JSON.stringify(stockTransactions));
    AsyncStorage.setItem("categories", JSON.stringify(stockCategories));
  }

  async fetchTransactions(): Promise<Transaction[]> {
    await randomFuzz();

    const transactions = await AsyncStorage.getItem("transactions");

    if (!transactions) {
      return [];
    }

    return JSON.parse(transactions);
  }

  async fetchUserCategories(): Promise<UserCategory[]> {
    await randomFuzz();

    const categories = await AsyncStorage.getItem("categories");

    if (!categories) {
      return [];
    }

    return JSON.parse(categories);
  }

  async fetchTransaction(id: string) {
    await randomFuzz();

    const transactions = await this.fetchTransactions();

    return transactions.find(({ id: itemId }) => id === itemId);
  }

  async fetchUserCategory(id: string) {
    await randomFuzz();

    const categories = await this.fetchUserCategories();

    return categories.find(({ id: itemId }) => id === itemId);
  }

  async updateTransactionUserCategory(
    transactionId: string,
    userCategoryId: string,
  ) {
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

    await AsyncStorage.setItem("transactions", update);
  }
}
