"use client";

import { useEffect } from "react";

import { Button, ButtonLink } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the failure for whatever monitoring is wired up in production.
    console.error("[ohx] unhandled route error", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-fine opacity-30 mask-fade-edges"
      />
      <div className="relative container-xl py-32">
        <p className="eyebrow">System fault</p>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Something on this page failed to load
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">
          The rest of the site is unaffected. Try again — if it keeps happening,
          tell us what you were doing and we will fix it.
        </p>
        {error.digest ? (
          <p className="mt-4 font-mono text-xs text-ink-faint">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-9 flex flex-wrap gap-3">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
