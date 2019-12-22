# Brex Mobile Coding Challenge

This repository includes the description of Brex's Mobile Code Challenge, the
code for the mock data client that you will need to use, and all the assets
exported from Figma.

It also has a bootstrapped React Native project with Expo and TypeScript but
you are welcome to use your own setup if you prefer. We only ask that you
utilize React Native in some way.

We understand that this is a coding test and time may be limited. Please feel
free to leave comments explaining anything that required compromises.

## Goals

You are working on the Brex mobile app, and you were assigned to implement
the following flows:

1. Display the list of transactions
1. Display details of a specific transaction
1. Change the category of a transaction

The design team handed the mobile team the following designs in Figma:

https://www.figma.com/file/D4DraKVh3JC8fyhormh4gNRm/Mobile-Coding-Challenge

The application should use the default operating system font. The icon assets
are in the `src/icons` directory. If you're using this repo, you can directly
import the SVG files.

Your coworkers created a mock data client to allow for the development of
these screens while they implement the real API. You should use the mock
client for fetching data so that migrating in the future will be easy.

You can import the client from `src/data` if you are using this repo, or copy
the `lib/` directory (and import it) if you are going with your own setup.

The mock client exposes the following interfaces:

```tsx
export default class Client {
  fetchTransactions(): Promise<Transaction[]>;

  fetchUserCategories(): Promise<UserCategory[]>;

  fetchTransaction(id: string): Promise<Transaction | undefined>;

  fetchUserCategory(id: string): Promise<UserCategory | undefined>;

  updateTransactionUserCategory(
    transactionId: string,
    userCategoryId: string,
  ): Promise<void>;
}

export interface Transaction {
  id: string;
  amount: number; // As cents
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
  website: string;
  __typename: "Merchant";
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
```

## Suggested milestones

### Milestone One

- Bootstrap the React Native project in a new Git repo.
- Fetch the list of transactions and categories from the mock data client.
- Print the results of the data fetching using `console.log`.

### Milestone Two

- Create the components needed for the transactions list screen.
- Populate the transactions list on the screen.

### Milestone Three

- Create the components needed for the transaction details screen.
- Populate the transaction data on the screen.

### Milestone Four

- Create the components needed for the category selection screen.
- Populate the categories data on the screen.

### Milestone Five

- Link the touch on a transaction to the details screen.

### Milestone Six

- Link the touch on the "QuickBooks Category" to category selection screen.

### Milestone Seven

- Link the touch on the category to update a transaction category.

## Delivering the results

If you used `git` during the development of the challenge, please bundle the
git repository used to develop the solution:

```sh
git bundle create brex-challenge.gitbundle --all
```

If you didn't create a repository during the develop of the challenge, please
compress the files to a `zip` file. Make sure to _not_ include `node_modules`
in the zip files.

When the final file is ready, send it back to the recruiter through e-mail.
