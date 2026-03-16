import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { LoginPage } from "./components/LoginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

const VALID_CREDENTIALS: Record<string, string> = {
  chanxinsymlanier: "ChanxinMoses1995$",
  admin: "crypto123",
  demo: "demo",
};

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (
    uname: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoggingIn(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoggingIn(false);
    const expected = VALID_CREDENTIALS[uname.toLowerCase()];
    if (!expected || expected !== password) return false;
    setUsername(uname);
    setIsAuthenticated(true);
    return true;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    queryClient.clear();
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} isLoading={isLoggingIn} />;
  }

  return <Dashboard onLogout={handleLogout} username={username} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster />
    </QueryClientProvider>
  );
}
