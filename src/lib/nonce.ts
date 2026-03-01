// src/lib/nonce.ts
import { headers } from "next/headers";

/**
 * Reads the per-request nonce set by middleware via `x-nonce`.
 * In environments where request headers aren't available (edge cases/tests),
 * it returns an empty string.
 */
export async function getNonce(): Promise<string> {
  try {
    const h = await headers();
    return h.get("x-nonce") ?? "";
  } catch {
    return "";
  }
}
