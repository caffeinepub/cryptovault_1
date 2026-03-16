import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
  isLoading: boolean;
}

export function LoginPage({ onLogin, isLoading }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    const ok = await onLogin(username, password);
    if (!ok) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.25 0.12 195 / 0.35), transparent), oklch(0.1 0.012 265)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.72 0.18 195) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.18 195) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "oklch(0.72 0.18 195)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl"
        style={{ background: "oklch(0.82 0.16 80)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center mb-8"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.18 195 / 0.2), oklch(0.82 0.16 80 / 0.15))",
              border: "1px solid oklch(0.72 0.18 195 / 0.4)",
              boxShadow: "0 0 30px oklch(0.72 0.18 195 / 0.3)",
            }}
          >
            <Shield
              className="w-8 h-8"
              style={{ color: "oklch(0.72 0.18 195)" }}
            />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            CryptoVault
          </h1>
          <p className="text-muted-foreground text-sm mt-1 font-mono-data tracking-widest uppercase">
            Secure Portfolio Tracker
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl p-8"
          style={{
            background: "oklch(0.14 0.018 265)",
            border: "1px solid oklch(0.22 0.02 265)",
            boxShadow:
              "0 24px 80px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(0.72 0.18 195 / 0.08) inset",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-muted-foreground uppercase tracking-wider"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                data-ocid="login.username_input"
                className="bg-secondary/50 border-border h-12 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus-visible:ring-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-muted-foreground uppercase tracking-wider"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  data-ocid="login.password_input"
                  className="bg-secondary/50 border-border h-12 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus-visible:ring-primary/30 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="login.error_state"
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
                style={{
                  background: "oklch(0.58 0.22 25 / 0.12)",
                  border: "1px solid oklch(0.58 0.22 25 / 0.3)",
                  color: "oklch(0.75 0.18 25)",
                }}
              >
                <Lock className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              data-ocid="login.submit_button"
              className="w-full h-12 font-display font-semibold text-base tracking-wide"
              style={{
                background: isLoading
                  ? "oklch(0.72 0.18 195 / 0.5)"
                  : "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.65 0.2 210))",
                color: "oklch(0.1 0.012 265)",
                boxShadow: isLoading
                  ? "none"
                  : "0 0 24px oklch(0.72 0.18 195 / 0.4)",
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                "Unlock Vault"
              )}
            </Button>
          </form>
        </motion.div>

        <p className="text-center text-muted-foreground/50 text-xs mt-6">
          Protected by end-to-end encryption
        </p>
      </motion.div>
    </div>
  );
}
