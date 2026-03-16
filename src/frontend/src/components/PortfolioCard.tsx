import { TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const COIN_CONFIG: Record<
  string,
  { color: string; gradient: string; icon: string; price: number }
> = {
  BTC: {
    color: "oklch(0.82 0.16 80)",
    gradient:
      "linear-gradient(135deg, oklch(0.82 0.16 80 / 0.2), oklch(0.7 0.15 60 / 0.08))",
    icon: "₿",
    price: 67000,
  },
  ETH: {
    color: "oklch(0.72 0.18 260)",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.18 260 / 0.2), oklch(0.65 0.15 280 / 0.08))",
    icon: "Ξ",
    price: 3500,
  },
  SOL: {
    color: "oklch(0.68 0.22 290)",
    gradient:
      "linear-gradient(135deg, oklch(0.68 0.22 290 / 0.2), oklch(0.72 0.18 195 / 0.1))",
    icon: "◎",
    price: 150,
  },
  ADA: {
    color: "oklch(0.72 0.18 230)",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.18 230 / 0.2), oklch(0.65 0.15 220 / 0.08))",
    icon: "₳",
    price: 0.45,
  },
  BNB: {
    color: "oklch(0.85 0.17 95)",
    gradient:
      "linear-gradient(135deg, oklch(0.85 0.17 95 / 0.2), oklch(0.78 0.14 80 / 0.08))",
    icon: "⬡",
    price: 580,
  },
};

interface PortfolioCardProps {
  coin: string;
  amount: number;
  index: number;
}

export function PortfolioCard({ coin, amount, index }: PortfolioCardProps) {
  const config = COIN_CONFIG[coin] ?? {
    color: "oklch(0.72 0.18 195)",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.18 195 / 0.2), transparent)",
    icon: "◈",
    price: 0,
  };
  const usdValue = amount * config.price;

  const formatUSD = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(val);

  const formatAmount = (val: number, c: string) => {
    if (c === "ADA")
      return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
    return val.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      data-ocid={`portfolio.card.${index + 1}`}
      className="relative rounded-2xl p-5 overflow-hidden cursor-default"
      style={{
        background: "oklch(0.14 0.018 265)",
        border: `1px solid ${config.color.replace(")", " / 0.25)")}`,
        boxShadow: `0 4px 24px oklch(0 0 0 / 0.3), 0 0 0 1px ${config.color.replace(")", " / 0.05)")} inset`,
      }}
    >
      {/* Gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: config.gradient }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${config.color} 1px, transparent 1px), linear-gradient(90deg, ${config.color} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold"
            style={{
              background: config.color.replace(")", " / 0.15)"),
              color: config.color,
              border: `1px solid ${config.color.replace(")", " / 0.3)")}`,
            }}
          >
            {config.icon}
          </div>
          <div
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
            style={{
              background: "oklch(0.65 0.18 145 / 0.12)",
              color: "oklch(0.65 0.18 145)",
            }}
          >
            <TrendingUp className="w-3 h-3" />
            <span className="font-mono-data">Live</span>
          </div>
        </div>

        {/* Coin info */}
        <div className="mb-3">
          <div className="font-display font-bold text-lg text-foreground leading-tight">
            {coin}
          </div>
          <div className="text-muted-foreground text-xs font-mono-data mt-0.5">
            {coin === "BTC" && "Bitcoin"}
            {coin === "ETH" && "Ethereum"}
            {coin === "SOL" && "Solana"}
            {coin === "ADA" && "Cardano"}
            {coin === "BNB" && "BNB Chain"}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-1">
          <span className="font-mono-data text-2xl font-semibold text-foreground">
            {formatAmount(amount, coin)}
          </span>
          <span className="text-muted-foreground text-sm ml-1">{coin}</span>
        </div>

        {/* USD value */}
        <div
          className="font-mono-data text-sm font-medium"
          style={{ color: config.color }}
        >
          {formatUSD(usdValue)}
        </div>
      </div>
    </motion.div>
  );
}
