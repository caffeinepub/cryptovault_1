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
      // Try CoinGecko first
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
        );
        if (!res.ok) throw new Error("CoinGecko failed");
        const data: { bitcoin: { usd: number } } = await res.json();
        if (data?.bitcoin?.usd) return data.bitcoin.usd;
        throw new Error("Invalid response");
      } catch {
        // Fallback: try CoinCap
        try {
          const res2 = await fetch("https://api.coincap.io/v2/assets/bitcoin");
          if (!res2.ok) throw new Error("CoinCap failed");
          const data2: { data: { priceUsd: string } } = await res2.json();
          if (data2?.data?.priceUsd)
            return Number.parseFloat(data2.data.priceUsd);
          throw new Error("Invalid response");
        } catch {
          return 85000;
        }
      }
    },
    refetchInterval: 30000,
    staleTime: 0,
  });
}
