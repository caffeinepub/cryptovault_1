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
