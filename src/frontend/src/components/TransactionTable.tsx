import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight, ReceiptText } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Transaction } from "../backend.d";
import { Variant_receive_send } from "../backend.d";

function truncateAddress(addr: string): string {
  if (!addr || addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function formatTimestamp(ts: bigint | number): string {
  const ms = typeof ts === "bigint" ? Number(ts / 1_000_000n) : ts;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}

function formatUSD(val: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(val);
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        data-ocid="transactions.empty_state"
        className="flex flex-col items-center justify-center py-16 px-8 rounded-2xl"
        style={{
          background: "oklch(0.14 0.018 265)",
          border: "1px dashed oklch(0.22 0.02 265)",
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{
            background: "oklch(0.72 0.18 195 / 0.1)",
            border: "1px solid oklch(0.72 0.18 195 / 0.2)",
          }}
        >
          <ReceiptText
            className="w-7 h-7"
            style={{ color: "oklch(0.72 0.18 195)" }}
          />
        </div>
        <p className="font-display font-semibold text-foreground text-lg">
          No transactions yet
        </p>
        <p className="text-muted-foreground text-sm mt-1 text-center max-w-xs">
          Your transaction history will appear here once you start sending or
          receiving crypto.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      data-ocid="transactions.table"
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.14 0.018 265)",
        border: "1px solid oklch(0.22 0.02 265)",
      }}
    >
      {/* Table header */}
      <div
        className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-3 text-xs font-mono-data uppercase tracking-widest text-muted-foreground"
        style={{ borderBottom: "1px solid oklch(0.22 0.02 265)" }}
      >
        <span>Type</span>
        <span>Coin / Address</span>
        <span className="text-right hidden md:block">Date</span>
        <span className="text-right">Amount</span>
        <span className="text-right">USD Value</span>
      </div>

      <AnimatePresence>
        {transactions.slice(0, 20).map((tx, i) => {
          const isReceive = tx.transactionType === Variant_receive_send.receive;
          return (
            <motion.div
              key={String(tx.id)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              data-ocid={i < 5 ? `transactions.item.${i + 1}` : undefined}
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors"
              style={{
                borderBottom:
                  i < transactions.length - 1
                    ? "1px solid oklch(0.22 0.02 265 / 0.5)"
                    : undefined,
              }}
            >
              {/* Type icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: isReceive
                    ? "oklch(0.65 0.18 145 / 0.12)"
                    : "oklch(0.58 0.22 25 / 0.12)",
                  border: `1px solid ${
                    isReceive
                      ? "oklch(0.65 0.18 145 / 0.3)"
                      : "oklch(0.58 0.22 25 / 0.3)"
                  }`,
                }}
              >
                {isReceive ? (
                  <ArrowDownLeft
                    className="w-4 h-4"
                    style={{ color: "oklch(0.65 0.18 145)" }}
                  />
                ) : (
                  <ArrowUpRight
                    className="w-4 h-4"
                    style={{ color: "oklch(0.65 0.18 28)" }}
                  />
                )}
              </div>

              {/* Coin + address */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-semibold text-foreground text-sm">
                    {tx.coin}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs font-mono-data px-2 py-0 h-5 border-none"
                    style={{
                      background: isReceive
                        ? "oklch(0.65 0.18 145 / 0.12)"
                        : "oklch(0.58 0.22 25 / 0.12)",
                      color: isReceive
                        ? "oklch(0.72 0.18 145)"
                        : "oklch(0.72 0.18 25)",
                    }}
                  >
                    {isReceive ? "Receive" : "Send"}
                  </Badge>
                </div>
                <div className="text-muted-foreground text-xs font-mono-data mt-0.5 truncate">
                  {truncateAddress(tx.counterpartyAddress)}
                </div>
              </div>

              {/* Date */}
              <div className="text-muted-foreground text-xs font-mono-data text-right hidden md:block whitespace-nowrap">
                {formatTimestamp(tx.timestamp)}
              </div>

              {/* Amount */}
              <div className="text-right">
                <span
                  className="font-mono-data text-sm font-medium"
                  style={{
                    color: isReceive
                      ? "oklch(0.72 0.18 145)"
                      : "oklch(0.72 0.18 25)",
                  }}
                >
                  {isReceive ? "+" : "-"}
                  {tx.amount.toLocaleString("en-US", {
                    maximumFractionDigits: 6,
                  })}
                </span>
              </div>

              {/* USD */}
              <div className="text-right">
                <span className="font-mono-data text-sm text-foreground">
                  {formatUSD(tx.usdValue)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
