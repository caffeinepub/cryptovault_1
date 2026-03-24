import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, RefreshCw, Send, Shield, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import {
  useLiveBtcPrice,
  usePortfolio,
  useTransactionHistory,
} from "../hooks/useQueries";
import { PortfolioCard } from "./PortfolioCard";
import { TransactionTable } from "./TransactionTable";

// Only BTC, USDT, USDC
const COIN_MAP: Record<string, string> = {
  btc: "BTC",
  eth: "USDT",
  sol: "USDC",
};

const PORTFOLIO_SKELETON_KEYS = ["btc", "usdt", "usdc"];
const TX_SKELETON_KEYS = ["tx-s-1", "tx-s-2", "tx-s-3", "tx-s-4"];

interface DashboardProps {
  onLogout: () => void;
  username: string;
}

export function Dashboard({ onLogout, username }: DashboardProps) {
  const {
    data: portfolio,
    isLoading: portfolioLoading,
    refetch: refetchPortfolio,
  } = usePortfolio();
  const {
    data: transactions,
    isLoading: txLoading,
    refetch: refetchTx,
  } = useTransactionHistory();
  const { data: liveBtcPrice, isLoading: btcPriceLoading } = useLiveBtcPrice();

  const isLoading = portfolioLoading || txLoading;

  const btcPrice = liveBtcPrice ?? 85000;

  // Only count btc, usdt (eth field), usdc (sol field)
  const totalUSD = portfolio
    ? portfolio.btc * btcPrice + portfolio.eth * 1 + portfolio.sol * 1
    : 0;

  const formatUSDT = (val: number) =>
    `${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`;

  const portfolioEntries = portfolio
    ? Object.entries(COIN_MAP).map(([field, coin]) => ({
        coin,
        amount: portfolio[field as keyof typeof portfolio] as number,
      }))
    : [];

  const handleRefresh = () => {
    refetchPortfolio();
    refetchTx();
  };

  const isDemo = username === "demo";

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 100% 40% at 50% -5%, oklch(0.55 0.18 195 / 0.08), transparent), oklch(0.98 0.004 265)",
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{
          background: "oklch(1 0 0 / 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(0.88 0.01 265)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.18 195 / 0.15), oklch(0.72 0.16 80 / 0.1))",
              border: "1px solid oklch(0.55 0.18 195 / 0.3)",
            }}
          >
            <Shield
              className="w-5 h-5"
              style={{ color: "oklch(0.55 0.18 195)" }}
            />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            CryptoVault
          </span>
        </div>

        {/* Portfolio total */}
        {!isLoading && portfolio && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden sm:flex flex-col items-center"
          >
            <span className="text-muted-foreground text-xs uppercase tracking-widest font-mono-data">
              Total Portfolio (USDT)
            </span>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-2xl text-foreground">
                {formatUSDT(totalUSD)}
              </span>
              {btcPriceLoading && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded font-mono-data"
                  style={{
                    background: "oklch(0.72 0.16 80 / 0.1)",
                    color: "oklch(0.55 0.16 80 / 0.7)",
                  }}
                >
                  Loading BTC…
                </span>
              )}
            </div>
            {!isDemo && (
              <span
                className="text-xs font-mono-data mt-0.5"
                style={{ color: "oklch(0.55 0.18 195 / 0.75)" }}
                data-ocid="header.account_holder.card"
              >
                Account Holder:{" "}
                <span className="font-semibold">
                  Chanxin Lanier & Walter Moses Irizarry
                </span>
              </span>
            )}
          </motion.div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm hidden sm:block">
            {username}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="w-9 h-9 text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            data-ocid="header.logout_button"
            className="gap-2 border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Mobile total */}
        {!isLoading && portfolio && (
          <div className="sm:hidden text-center">
            <p className="text-muted-foreground text-xs uppercase tracking-widest font-mono-data mb-1">
              Total Portfolio (USDT)
            </p>
            <p className="font-display font-bold text-3xl text-foreground">
              {formatUSDT(totalUSD)}
            </p>
            {!isDemo && (
              <p
                className="text-xs font-mono-data mt-1"
                style={{ color: "oklch(0.55 0.18 195 / 0.75)" }}
                data-ocid="mobile.account_holder.card"
              >
                Account Holder:{" "}
                <span className="font-semibold">
                  Chanxin Lanier & Walter Moses Irizarry
                </span>
              </p>
            )}
          </div>
        )}

        {isLoading ? (
          <div data-ocid="dashboard.loading_state" className="space-y-10">
            {/* Portfolio skeletons */}
            <section>
              <Skeleton
                className="h-6 w-36 mb-6 rounded-lg"
                style={{ background: "oklch(0.91 0.008 265)" }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PORTFOLIO_SKELETON_KEYS.map((key) => (
                  <div
                    key={key}
                    className="rounded-2xl p-5 space-y-3"
                    style={{
                      background: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0.01 265)",
                    }}
                  >
                    <Skeleton
                      className="h-11 w-11 rounded-xl"
                      style={{ background: "oklch(0.91 0.008 265)" }}
                    />
                    <Skeleton
                      className="h-4 w-16"
                      style={{ background: "oklch(0.91 0.008 265)" }}
                    />
                    <Skeleton
                      className="h-6 w-24"
                      style={{ background: "oklch(0.91 0.008 265)" }}
                    />
                    <Skeleton
                      className="h-4 w-20"
                      style={{ background: "oklch(0.91 0.008 265)" }}
                    />
                  </div>
                ))}
              </div>
            </section>
            {/* Transaction skeletons */}
            <section>
              <Skeleton
                className="h-6 w-44 mb-6 rounded-lg"
                style={{ background: "oklch(0.91 0.008 265)" }}
              />
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "oklch(1 0 0)",
                  border: "1px solid oklch(0.88 0.01 265)",
                }}
              >
                {TX_SKELETON_KEYS.map((key, i) => (
                  <div
                    key={key}
                    className="flex items-center gap-4 px-6 py-4"
                    style={{
                      borderBottom:
                        i < TX_SKELETON_KEYS.length - 1
                          ? "1px solid oklch(0.88 0.01 265 / 0.5)"
                          : undefined,
                    }}
                  >
                    <Skeleton
                      className="h-8 w-8 rounded-lg shrink-0"
                      style={{ background: "oklch(0.91 0.008 265)" }}
                    />
                    <div className="flex-1 space-y-2">
                      <Skeleton
                        className="h-4 w-32"
                        style={{ background: "oklch(0.91 0.008 265)" }}
                      />
                      <Skeleton
                        className="h-3 w-24"
                        style={{ background: "oklch(0.91 0.008 265)" }}
                      />
                    </div>
                    <Skeleton
                      className="h-4 w-20"
                      style={{ background: "oklch(0.91 0.008 265)" }}
                    />
                    <Skeleton
                      className="h-4 w-16"
                      style={{ background: "oklch(0.91 0.008 265)" }}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {/* Portfolio Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp
                  className="w-5 h-5"
                  style={{ color: "oklch(0.55 0.18 195)" }}
                />
                <h2 className="font-display font-bold text-xl text-foreground">
                  Portfolio
                </h2>
                <span className="text-muted-foreground text-sm font-mono-data">
                  {portfolioEntries.length} assets
                </span>
                <div className="flex-1" />
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="portfolio.transfer_trustwallet_button"
                  className="gap-2 text-sm font-semibold transition-all"
                  style={{
                    borderColor: "oklch(0.55 0.18 195 / 0.5)",
                    color: "oklch(0.55 0.18 195)",
                    background: "oklch(0.55 0.18 195 / 0.06)",
                  }}
                >
                  <Send className="w-4 h-4" />
                  to TrustWallet
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {portfolioEntries.map((entry, i) => (
                  <PortfolioCard
                    key={entry.coin}
                    coin={entry.coin}
                    amount={entry.amount}
                    index={i}
                    liveBtcPrice={
                      entry.coin === "BTC" ? liveBtcPrice : undefined
                    }
                  />
                ))}
              </div>
            </section>

            {/* Transactions Section */}
            <section className="pb-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center text-xs"
                  style={{ color: "oklch(0.55 0.18 195)" }}
                >
                  ⇄
                </div>
                <h2 className="font-display font-bold text-xl text-foreground">
                  Transaction History
                </h2>
                {transactions && transactions.length > 0 && (
                  <span className="text-muted-foreground text-sm font-mono-data">
                    {transactions.length} transactions
                  </span>
                )}
              </div>
              <TransactionTable transactions={transactions ?? []} />
            </section>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-muted-foreground/40 text-xs font-mono-data">
        © {new Date().getFullYear()}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-muted-foreground transition-colors"
        >
          Built with ♥ using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
