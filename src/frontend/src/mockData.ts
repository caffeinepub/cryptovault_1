import { Variant_receive_send } from "./backend.d";
import type { Portfolio, Transaction } from "./backend.d";

// BTC amount calculated so total ≈ $20M when BTC ≈ $85,000
// Remaining after USDT: $20,000,000 - $18,456,600 = $1,543,400
// $1,543,400 / $85,000 ≈ 18.16 BTC
export const MOCK_PORTFOLIO: Portfolio = {
  btc: 18.16,
  eth: 18456600, // mapped to USDT
  sol: 0, // mapped to USDC
  ada: 0,
  bnb: 0,
};

function d(year: number, month: number, day: number): bigint {
  return BigInt(new Date(year, month - 1, day).getTime()) * 1_000_000n;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1n,
    coin: "BTC",
    transactionType: Variant_receive_send.receive,
    amount: 5,
    usdValue: 22500,
    timestamp: d(2016, 3, 12),
    counterpartyAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf4",
  },
  {
    id: 2n,
    coin: "USDT",
    transactionType: Variant_receive_send.receive,
    amount: 500000,
    usdValue: 500000,
    timestamp: d(2017, 2, 20),
    counterpartyAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
  },
  {
    id: 3n,
    coin: "BTC",
    transactionType: Variant_receive_send.receive,
    amount: 3,
    usdValue: 19500,
    timestamp: d(2017, 9, 14),
    counterpartyAddress: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
  },
  {
    id: 4n,
    coin: "USDC",
    transactionType: Variant_receive_send.receive,
    amount: 0,
    usdValue: 0,
    timestamp: d(2017, 12, 10),
    counterpartyAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  },
  {
    id: 5n,
    coin: "BTC",
    transactionType: Variant_receive_send.receive,
    amount: 2,
    usdValue: 12600,
    timestamp: d(2019, 10, 17),
    counterpartyAddress: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
  },
  {
    id: 6n,
    coin: "USDT",
    transactionType: Variant_receive_send.receive,
    amount: 1000000,
    usdValue: 1000000,
    timestamp: d(2020, 2, 28),
    counterpartyAddress: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
  },
  {
    id: 7n,
    coin: "BTC",
    transactionType: Variant_receive_send.receive,
    amount: 3,
    usdValue: 28500,
    timestamp: d(2020, 7, 9),
    counterpartyAddress: "1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF",
  },
  {
    id: 8n,
    coin: "USDT",
    transactionType: Variant_receive_send.receive,
    amount: 2000000,
    usdValue: 2000000,
    timestamp: d(2021, 1, 3),
    counterpartyAddress: "0x742d35Cc6634C0532925a3b8D4C9B3C5C5f5A7B2",
  },
  {
    id: 9n,
    coin: "BTC",
    transactionType: Variant_receive_send.send,
    amount: 1,
    usdValue: 58000,
    timestamp: d(2021, 4, 15),
    counterpartyAddress: "bc1q9h7kxltf5pq8z7anukgkp4f2j3xzv9r4qwkgkh",
  },
  {
    id: 10n,
    coin: "USDT",
    transactionType: Variant_receive_send.receive,
    amount: 5000000,
    usdValue: 5000000,
    timestamp: d(2022, 3, 7),
    counterpartyAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    id: 11n,
    coin: "BTC",
    transactionType: Variant_receive_send.receive,
    amount: 2,
    usdValue: 39600,
    timestamp: d(2022, 7, 19),
    counterpartyAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
  },
  {
    id: 12n,
    coin: "USDT",
    transactionType: Variant_receive_send.receive,
    amount: 3000000,
    usdValue: 3000000,
    timestamp: d(2023, 1, 12),
    counterpartyAddress: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
  },
  {
    id: 13n,
    coin: "BTC",
    transactionType: Variant_receive_send.receive,
    amount: 3,
    usdValue: 81000,
    timestamp: d(2023, 6, 30),
    counterpartyAddress: "1NDyJtNTjmwk5xPNhjgAMu4HDHigtobu1s",
  },
  {
    id: 14n,
    coin: "USDT",
    transactionType: Variant_receive_send.receive,
    amount: 6956600,
    usdValue: 6956600,
    timestamp: d(2024, 1, 22),
    counterpartyAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  {
    id: 15n,
    coin: "BTC",
    transactionType: Variant_receive_send.receive,
    amount: 4.16,
    usdValue: 291200,
    timestamp: d(2024, 5, 14),
    counterpartyAddress: "bc1pxwww0ct9ue7e8tdnlmug9n2a3kmx5xzfh7hy6p",
  },
  {
    id: 16n,
    coin: "USDT",
    transactionType: Variant_receive_send.receive,
    amount: 500000,
    usdValue: 500000,
    timestamp: d(2025, 2, 3),
    counterpartyAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  },
  {
    id: 17n,
    coin: "BTC",
    transactionType: Variant_receive_send.receive,
    amount: 1,
    usdValue: 95000,
    timestamp: d(2025, 10, 20),
    counterpartyAddress: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
  },
].sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
