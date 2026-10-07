import { type AppError, toAppError } from "./errors";

/**
 * asyncHandler.ts
 * --------------------------------------------------------------
 * Wrap any promise, get back a result tuple instead of a thrown error.
 * `Result<T>` ties both tuple positions to the same value, so narrowing
 * `error` also narrows `data` in the same `if` check — no second check
 * needed.
 *
 * Usage:
 *
 *   const [error, user] = await asyncHandler(usersService.getById(id));
 *
 *   if (error) {
 *     // error: AppError — fully typed, `user` is null here
 *     return;
 *   }
 *
 *   // error is null here — `user` is typed as User, not User | null
 *
 * Works for anything that returns a Promise<T>: a service call, a Zod
 * parse wrapped in Promise.resolve(), a fetch(), a database call in a
 * Server Component, a Server Action.
 */
export type Result<T> = [error: null, data: T] | [error: AppError, data: null];

export const asyncHandler = async <T>(
  promise: Promise<T>,
): Promise<Result<T>> => {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [toAppError(error), null];
  }
};
