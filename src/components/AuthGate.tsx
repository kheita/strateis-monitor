import { useState, useEffect, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="font-mono text-[10px] text-text-dim uppercase tracking-wider">Loading...</span>
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSigningIn(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    setSigningIn(false);
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-sm bg-bg-panel border border-border rounded-[5px] overflow-hidden">
        <div
          className="px-4 py-3 bg-bg-card border-b border-border"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
        >
          <h2 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gold">
            Authentication Required
          </h2>
          <p className="font-sans text-[11px] text-text-dim mt-1">
            Sign in with your Strateis account to access this module.
          </p>
        </div>
        <form onSubmit={handleLogin} className="p-4 space-y-3">
          <div>
            <label className="font-mono text-[8px] uppercase tracking-[0.1em] text-text-dim block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-bg-card border border-border rounded px-3 py-2 text-[11px] text-text font-mono outline-none focus:border-gold/50 transition-colors"
              placeholder="ceo@strateis.co"
            />
          </div>
          <div>
            <label className="font-mono text-[8px] uppercase tracking-[0.1em] text-text-dim block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-bg-card border border-border rounded px-3 py-2 text-[11px] text-text font-mono outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          {error && (
            <p className="font-mono text-[9px] text-red">{error}</p>
          )}
          <button
            type="submit"
            disabled={signingIn}
            className="w-full py-2 rounded font-mono text-[10px] font-bold uppercase tracking-wider text-bg-deep transition-colors disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #D4A853, #C5952A)",
              boxShadow: "0 0 8px rgba(212,168,83,0.2)",
            }}
          >
            {signingIn ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
