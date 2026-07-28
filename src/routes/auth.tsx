import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

type Search = { redirect?: string };

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — The Genesis Moment" },
      { name: "description", content: "Admin sign in for The Genesis Moment." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  const safeRedirect = redirect && redirect.startsWith("/") ? redirect : "/admin";

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted && data.session) navigate({ to: safeRedirect, replace: true });
    });
    return () => {
      mounted = false;
    };
  }, [navigate, safeRedirect]);

  async function onEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: safeRedirect, replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setLoading(true);
    try {
      const res = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (res.error) throw res.error;
      if (!res.redirected) navigate({ to: safeRedirect, replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign in failed");
      setLoading(false);
    }
  }

  return (
    <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-md">
        <div className="eyebrow mb-4 text-ember">Restricted · Admin</div>
        <h1 className="font-serif text-4xl leading-[0.95] tracking-[-0.03em]">Sign in</h1>
        <p className="mt-3 text-ink/70">
          The admin console for The Genesis Moment. Publish new stories, thoughtcasts, and guests.
        </p>

        <form onSubmit={onEmail} className="mt-8 space-y-4">
          <div>
            <label className="mono-tag text-ink/60">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-line bg-paper px-4 py-3 text-ink"
            />
          </div>
          <div>
            <label className="mono-tag text-ink/60">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-line bg-paper px-4 py-3 text-ink"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-cream disabled:opacity-50"
          >
            {loading ? "…" : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-ink/40">
          <div className="h-px flex-1 bg-line" /> or <div className="h-px flex-1 bg-line" />
        </div>

        <button
          onClick={onGoogle}
          disabled={loading}
          className="w-full border border-ink/30 bg-paper px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink hover:border-ember hover:text-ember disabled:opacity-50"
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="mt-6 block w-full text-center text-sm text-ink/60 hover:text-ember"
        >
          {mode === "signin" ? "No account yet? Create one" : "Already have an account? Sign in"}
        </button>
      </div>
    </section>
  );
}
