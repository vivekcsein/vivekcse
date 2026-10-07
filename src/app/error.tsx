"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  console.error(error);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          An unexpected error occurred while loading this page.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 rounded-lg bg-muted p-4 text-left">
            <p className="text-xs font-medium text-muted-foreground">
              Error Details
            </p>
            <pre className="mt-2 overflow-auto text-xs whitespace-pre-wrap wrap-break-word">
              {error.message}
            </pre>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} variant="primary" className="flex-1">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant="secondary"
            className="flex-1"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
    </main>
  );
}
