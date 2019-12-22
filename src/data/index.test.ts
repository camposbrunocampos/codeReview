import { mockRandomForEach } from "jest-mock-random";

import Client from ".";

import stockCategories from "./categories";
import stockTransactions from "./transactions";

jest.setTimeout(30000);

jest.mock("react-native", () => {
  const storage = {};
  return {
    AsyncStorage: {
      setItem(key: string, value: string) {
        return new Promise((resolve) => {
          // @ts-ignore
          storage[key] = value;
          resolve();
        });
      },
      getItem(key: string) {
        // @ts-ignore
        return Promise.resolve(storage[key]);
      },
    },
  };
});

describe("Client", () => {
  const client = new Client();

  describe("When fuzzer condition is NOT met", () => {
    beforeAll(() => {
      mockRandomForEach(0.9);
    });

    beforeEach(async () => {
      await client.resetState();
    });

    test("fetchTransactions", async () => {
      const transactions = await client.fetchTransactions();
      expect(transactions).toEqual(stockTransactions);
    });

    test("fetchUserCategories", async () => {
      const categories = await client.fetchUserCategories();
      expect(categories).toEqual(stockCategories);
    });

    test("fetchTransaction", async () => {
      const transaction = await client.fetchTransaction(
        "ffb73532-f245-4ac7-8f5b-7726ace56c4a",
      );
      expect(transaction).not.toBeFalsy();
    });

    test("fetchUserCategory", async () => {
      const category = await client.fetchUserCategory(
        "9ad2aa52-2b7e-4892-8b28-0f75116cc374",
      );
      expect(category).not.toBeFalsy();
    });

    test("updateTransactionUserCategory", async () => {
      await client.updateTransactionUserCategory(
        "ffb73532-f245-4ac7-8f5b-7726ace56c4a",
        "9ad2aa52-2b7e-4892-8b28-0f75116cc374",
      );

      const transaction = await client.fetchTransaction(
        "ffb73532-f245-4ac7-8f5b-7726ace56c4a",
      );

      expect(transaction).not.toBeFalsy();

      expect(transaction!.integration!.category!.id).toBe(
        "9ad2aa52-2b7e-4892-8b28-0f75116cc374",
      );
    });
  });

  describe("When fuzzer condition is met", () => {
    const error = "A synthetic error happened";
    beforeAll(() => {
      mockRandomForEach(0.001);
    });

    beforeEach(async () => {
      await client.resetState();
    });

    test("fetchTransactions", () => {
      const transactions = client.fetchTransactions();
      return expect(transactions).rejects.toThrow(error);
    });

    test("fetchUserCategories", () => {
      const categories = client.fetchUserCategories();
      return expect(categories).rejects.toThrow(error);
    });

    test("fetchTransaction", () => {
      const transaction = client.fetchTransaction(
        "ffb73532-f245-4ac7-8f5b-7726ace56c4a",
      );
      return expect(transaction).rejects.toThrow(error);
    });

    test("fetchUserCategory", () => {
      const category = client.fetchUserCategory(
        "9ad2aa52-2b7e-4892-8b28-0f75116cc374",
      );
      return expect(category).rejects.toThrow(error);
    });

    test("updateTransactionUserCategory", () => {
      const update = client.updateTransactionUserCategory(
        "ffb73532-f245-4ac7-8f5b-7726ace56c4a",
        "9ad2aa52-2b7e-4892-8b28-0f75116cc374",
      );

      return expect(update).rejects.toThrow(error);
    });
  });
});
