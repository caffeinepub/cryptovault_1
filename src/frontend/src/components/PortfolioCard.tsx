import { motion } from "motion/react";

const COIN_CONFIG: Record<
  string,
  {
    color: string;
    gradient: string;
    icon: string;
    price: number;
    name: string;
    isStable?: boolean;
  }
> = {
  BTC: {
    color: "oklch(0.62 0.16 75)",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.16 80 / 0.1), oklch(0.7 0.15 60 / 0.04))",
    icon: "₿",
    price: 85000,
    name: "Bitcoin",
  },
  USDT: {
    color: "oklch(0.48 0.17 145)",
    gradient:
      "linear-gradient(135deg, oklch(0.55 0.18 145 / 0.1), oklch(0.5 0.14 150 / 0.04))",
    icon: "₮",
    price: 1,
    name: "Tether USD",
    isStable: true,
  },
  USDC: {
    color: "oklch(0.48 0.17 230)",
    gradient:
      "linear-gradient(135deg, oklch(0.55 0.18 230 / 0.1), oklch(0.5 0.14 220 / 0.04))",
    icon: "◎",
    price: 1,
    name: "USD Coin",
    isStable: true,
  },
  DAI: {
    color: "oklch(0.62 0.16 75)",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.16 80 / 0.1), oklch(0.65 0.13 85 / 0.04))",
    icon: "◈",
    price: 1,
    name: "Dai Stablecoin",
    isStable: true,
  },
  BUSD: {
    color: "oklch(0.65 0.17 90)",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.17 95 / 0.1), oklch(0.65 0.14 80 / 0.04))",
    icon: "⬡",
    price: 1,
    name: "Binance USD",
    isStable: true,
  },
};

interface PortfolioCardProps {
  coin: string;
  amount: number;
  index: number;
  liveBtcPrice?: number;
}

export function PortfolioCard({
  coin,
  amount,
  index,
  liveBtcPrice,
}: PortfolioCardProps) {
  const config = COIN_CONFIG[coin] ?? {
    color: "oklch(0.48 0.18 195)",
    gradient:
      "linear-gradient(135deg, oklch(0.55 0.18 195 / 0.1), transparent)",
    icon: "◈",
    price: 1,
    name: coin,
    isStable: true,
  };

  const effectivePrice =
    coin === "BTC" ? (liveBtcPrice ?? config.price) : config.price;
  const usdtValue = amount * effectivePrice;

  const formatUSDT = (val: number) =>
    `${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`;

  const formatAmount = (val: number) => {
    if (config.isStable) {
      return `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
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
        background: "oklch(1 0 0)",
        border: `1px solid ${config.color.replace(")", " / 0.2)")}`,
        boxShadow: `0 4px 24px oklch(0.15 0.015 265 / 0.06), 0 0 0 1px ${config.color.replace(")", " / 0.05)")} inset`,
      }}
    >
      {/* Gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: config.gradient }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
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
              background: config.color.replace(")", " / 0.12)"),
              color: config.color,
              border: `1px solid ${config.color.replace(")", " / 0.25)")}`,
            }}
          >
            {config.icon}
          </div>

          {/* Live / Stable badge */}
          {config.isStable ? (
            <div
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
              style={{
                background: "oklch(0.48 0.17 145 / 0.1)",
                color: "oklch(0.42 0.17 145)",
              }}
            >
              <span className="font-mono-data">Stable</span>
            </div>
          ) : (
            <div
              className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full"
              style={{
                background: "oklch(0.62 0.16 75 / 0.1)",
                color: "oklch(0.55 0.16 75)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "oklch(0.62 0.16 75)" }}
              />
              <span className="font-mono-data">Live</span>
            </div>
          )}
        </div>

        {/* Coin info */}
        <div className="mb-3">
          <div className="font-display font-bold text-lg text-foreground leading-tight">
            {coin}
          </div>
          <div className="text-muted-foreground text-xs font-mono-data mt-0.5">
            {config.name}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-1">
          {config.isStable ? (
            <span className="font-mono-data text-2xl font-semibold text-foreground">
              {formatAmount(amount)}
            </span>
          ) : (
            <>
              <span className="font-mono-data text-2xl font-semibold text-foreground">
                {formatAmount(amount)}
              </span>
              <span className="text-muted-foreground text-sm ml-1">{coin}</span>
            </>
          )}
        </div>

        {/* USDT value */}
        <div
          className="font-mono-data text-sm font-medium"
          style={{ color: config.color }}
        >
          {coin === "BTC" && liveBtcPrice ? (
            <span>
              {formatUSDT(usdtValue)}
              <span
                className="ml-1 text-xs opacity-60"
                style={{ color: "oklch(0.55 0.16 75)" }}
              >
                @ $
                {liveBtcPrice.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </span>
          ) : (
            formatUSDT(usdtValue)
          )}
        </div>
      </div>
    </motion.div>
  );
}
