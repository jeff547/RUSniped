const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "/backend";

export const API_BASE_URL = configuredBaseUrl.replace(/\/$/, "");

export function backendUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
