/**
 * Safe fetch wrapper to avoid direct global fetch mutations.
 */

// Save original fetch
const originalFetch = typeof window !== 'undefined' ? window.fetch.bind(window) : null;

/**
 * Standardized fetch wrapper that uses the browser's original fetch.
 * This avoids issues with getter-only fetch properties on the window object.
 */
export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  // If we are in the browser and have the original fetch bound
  if (originalFetch) {
    return originalFetch(input, init);
  }
  
  // Fallback to global fetch (Node or if window.fetch was already available)
  if (typeof fetch !== 'undefined') {
    return fetch(input, init);
  }
  
  throw new Error('Fetch API is not available in this environment');
}
