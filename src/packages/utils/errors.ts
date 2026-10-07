import axios from "axios";
import { ZodError } from "zod";

/**
 * errors.ts
 * --------------------------------------------------------------
 * One error shape for the whole app. Every thrown/rejected value that
 * passes through `asyncHandler` (see asyncHandler.ts) ends up as an
 * `AppError`, regardless of whether it originated from Axios, a Zod
 * parse failure, a native `Error`, or an arbitrary thrown value.
 *
 * This is pulled forward from Stage 10 (API Layer) because asyncHandler.ts
 * — a Stage 3 file — needs a concrete error type to normalize into. The
 * full Axios instance, interceptors, and typed service layer described in
 * Stage 10 are NOT built here; this file only covers the two pieces every
 * other stage already depends on (AppError, toAppError).
 */

export type AppErrorCode =
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN";

type AppErrorOptions = {
  code: AppErrorCode;
  status?: number;
  cause?: unknown;
  details?: unknown;
};

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status?: number;
  readonly details?: unknown;

  constructor(message: string, options: AppErrorOptions) {
    super(message);
    this.name = "AppError";
    this.code = options.code;
    this.status = options.status;
    this.details = options.details;
    if (options.cause) this.cause = options.cause;
  }
}

/**
 * Normalizes anything that was thrown — an `AxiosError`, a `ZodError`, a
 * native `Error`, or a non-Error value (JS lets you `throw` anything) —
 * into a consistent `AppError`. This is the single place that branches on
 * the error's origin, so nothing downstream has to.
 *
 * Every branch is additive, not exhaustive — if a new error source shows
 * up later (a storage API, a WebSocket), add a branch here rather than
 * teaching every call site to recognize it.
 */
export const toAppError = (error: unknown): AppError => {
  if (error instanceof AppError) return error;

  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return new AppError("Request timed out.", {
        code: "TIMEOUT",
        cause: error,
      });
    }

    if (!error.response) {
      return new AppError("Network error.", {
        code: "NETWORK_ERROR",
        cause: error,
      });
    }

    const { status } = error.response;

    if (status === 401) {
      return new AppError("Unauthorized.", {
        code: "UNAUTHORIZED",
        status,
        cause: error,
      });
    }
    if (status === 403) {
      return new AppError("Forbidden.", {
        code: "FORBIDDEN",
        status,
        cause: error,
      });
    }
    if (status === 404) {
      return new AppError("Not found.", {
        code: "NOT_FOUND",
        status,
        cause: error,
      });
    }
    if (status >= 500) {
      return new AppError("Server error.", {
        code: "SERVER_ERROR",
        status,
        cause: error,
      });
    }

    return new AppError("Request failed.", {
      code: "VALIDATION_ERROR",
      status,
      details: error.response.data,
      cause: error,
    });
  }

  if (error instanceof ZodError) {
    return new AppError("Response failed validation.", {
      code: "VALIDATION_ERROR",
      details: error.issues,
      cause: error,
    });
  }

  if (error instanceof Error) {
    return new AppError(error.message, { code: "UNKNOWN", cause: error });
  }

  return new AppError("An unexpected error occurred.", {
    code: "UNKNOWN",
    cause: error,
  });
};
