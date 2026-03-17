import { useQuery } from "@tanstack/react-query";
import type { Portfolio, Transaction } from "../backend.d";
import { MOCK_PORTFOLIO, MOCK_TRANSACTIONS } from "../mockData";

export function usePortfolio() {
  return useQuery<Portfolio>({
    queryKey: ["portfolio"],
    queryFn: async () => MOCK_PORTFOLIO,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useTransactionHistory() {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => MOCK_TRANSACTIONS,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useLiveBtcPrice() {
  return useQuery<number>({
    queryKey: ["btc-price-live"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
        );
        if (!res.ok) throw new Error("Failed to fetch BTC price");
        const data: { price: string } = await res.json();
        return Number.parseFloat(data.price);
      } catch {
        return 85000;
      }
    },
    refetchInterval: 1000,
    staleTime: 0,
  });
}
